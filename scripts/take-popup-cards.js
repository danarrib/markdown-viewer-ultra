// Compose a 1280x800 "popup card" screenshot per locale, suitable for the
// Chrome Web Store screenshot gallery.
//
// Run from the scripts/ folder:
//   npm run popup-cards
//
// Pipeline per locale (single Chromium context, deviceScaleFactor 2):
//   1. Capture the extension popup at 2x density.
//      The popup is rendered as if opened over an active Markdown tab,
//      so the "Current page" section + toggle button are visible.
//   2. Compose a 1280x800 card: soft gradient background, popup centered
//      with a CSS drop-shadow. The captured PNG is embedded as a data URL.
//   3. Screenshot the card.
//
// Output: ../store-assets/screenshots/<locale>/d-popup-card.png

const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');

const EXT_PATH = path.resolve(__dirname, '..');
const OUT_BASE = path.join(EXT_PATH, 'store-assets', 'screenshots');

const LOCALES = [
  { code: 'en-US', dir: 'en'    },
  { code: 'pt-BR', dir: 'pt-BR' },
  { code: 'pt-PT', dir: 'pt-PT' },
  { code: 'es',    dir: 'es'    },
  { code: 'fr',    dir: 'fr'    },
  { code: 'de',    dir: 'de'    },
  { code: 'it',    dir: 'it'    },
  { code: 'ja',    dir: 'ja'    },
  { code: 'zh-CN', dir: 'zh-CN' },
  { code: 'zh-TW', dir: 'zh-TW' },
  { code: 'ru',    dir: 'ru'    },
  { code: 'hi',    dir: 'hi'    },
  { code: 'bn',    dir: 'bn'    },
  { code: 'pa',    dir: 'pa'    },
  { code: 'tr',    dir: 'tr'    },
  { code: 'he',    dir: 'he'    },
  { code: 'ar',    dir: 'ar'    },
];

// Serialized into the page main world before popup.js runs.
const TAB_MOCK = () => {
  const fakeTab = { id: 1, url: 'file:///sample.md' };
  chrome.tabs.query = (_qi, cb) => {
    const result = [fakeTab];
    if (cb) cb(result);
    return Promise.resolve(result);
  };
  chrome.tabs.sendMessage = (_tabId, msg, cb) => {
    const resp =
      msg && msg.type === 'getState'
        ? { isMarkdown: true, isRendered: true }
        : { isRendered: true };
    if (cb) cb(resp);
    return Promise.resolve(resp);
  };
};

const cardHtml = (popupB64) => `<!doctype html>
<html><head><meta charset="utf-8"><style>
  html, body {
    margin: 0;
    padding: 0;
    width: 640px;
    height: 400px;
    background: linear-gradient(135deg, #f6f8fa 0%, #dde4ec 100%);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", sans-serif;
  }
  .stage {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .popup {
    /* Native popup PNG is 560px wide at dsf 2; displaying at 280 CSS px
       keeps it crisp (1 CSS px = 2 device px) and gives it ~44% of the
       card width — clear focal point without dominating. */
    width: 280px;
    border-radius: 10px;
    filter: drop-shadow(0 14px 40px rgba(13, 17, 23, 0.22));
  }
</style></head><body>
  <div class="stage">
    <img class="popup" src="data:image/png;base64,${popupB64}" />
  </div>
</body></html>`;

(async () => {
  for (const locale of LOCALES) {
    const outDir = path.join(OUT_BASE, locale.dir);
    fs.mkdirSync(outDir, { recursive: true });
    console.log(`=== ${locale.code} → ${locale.dir}/d-popup-card.png ===`);

    const context = await chromium.launchPersistentContext('', {
      headless: false,
      args: [
        `--disable-extensions-except=${EXT_PATH}`,
        `--load-extension=${EXT_PATH}`,
        `--lang=${locale.code}`,
      ],
      locale: locale.code,
      colorScheme: 'light',
      deviceScaleFactor: 2,
    });

    let [sw] = context.serviceWorkers();
    if (!sw) sw = await context.waitForEvent('serviceworker');
    const extId = sw.url().split('/')[2];

    // --- 1. Capture popup ---
    const popupPage = await context.newPage();
    await popupPage.addInitScript(TAB_MOCK);
    await popupPage.setViewportSize({ width: 280, height: 600 });
    await popupPage.emulateMedia({ colorScheme: 'light' });
    await popupPage.goto(`chrome-extension://${extId}/popup.html`);
    await popupPage.waitForTimeout(400);
    const popupBuf = await popupPage.locator('body').screenshot();
    const popupB64 = popupBuf.toString('base64');
    await popupPage.close();

    // --- 2. Compose 1280x800 card (viewport 640x400 at dsf 2) ---
    const cardPage = await context.newPage();
    await cardPage.setViewportSize({ width: 640, height: 400 });
    await cardPage.emulateMedia({ colorScheme: 'light' });
    await cardPage.setContent(cardHtml(popupB64), { waitUntil: 'load' });
    await cardPage.waitForTimeout(200);
    await cardPage.screenshot({
      path: path.join(outDir, 'd-popup-card.png'),
    });
    await cardPage.close();

    await context.close();
  }

  console.log(`\nDone — ${LOCALES.length} popup cards in store-assets/screenshots/`);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
