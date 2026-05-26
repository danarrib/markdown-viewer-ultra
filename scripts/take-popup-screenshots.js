// Capture the extension popup, one screenshot per supported locale.
// Output: ../store-assets/popups/<locale>/popup.png
//
// Run from the scripts/ folder:
//   npm run popup-screenshots
//
// What this does differently from take-screenshots.js:
//   • Forces light color scheme so the popup background is white.
//   • Mocks chrome.tabs.query / chrome.tabs.sendMessage via addInitScript
//     so popup.js believes it was opened on an active Markdown page —
//     this reveals the "Current page" section + render toggle button,
//     which is what a marketing screenshot should show.
//   • Screenshots only the body element (tight crop, no surrounding chrome).

const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');

const EXT_PATH = path.resolve(__dirname, '..');
const OUT_BASE = path.join(EXT_PATH, 'store-assets', 'popups');

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
// Cannot reference any Node.js scope.
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

(async () => {
  for (const locale of LOCALES) {
    const outDir = path.join(OUT_BASE, locale.dir);
    fs.mkdirSync(outDir, { recursive: true });
    console.log(`=== ${locale.code} → ${locale.dir}/popup.png ===`);

    const context = await chromium.launchPersistentContext('', {
      headless: false,
      args: [
        `--disable-extensions-except=${EXT_PATH}`,
        `--load-extension=${EXT_PATH}`,
        `--lang=${locale.code}`,
      ],
      locale: locale.code,
      colorScheme: 'light',
    });

    let [sw] = context.serviceWorkers();
    if (!sw) sw = await context.waitForEvent('serviceworker');
    const extId = sw.url().split('/')[2];

    const page = await context.newPage();
    await page.addInitScript(TAB_MOCK);
    await page.setViewportSize({ width: 280, height: 600 });
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto(`chrome-extension://${extId}/popup.html`);
    // Wait for the i18n pass + the (mocked) tab query to finish updating UI.
    await page.waitForTimeout(400);

    await page.locator('body').screenshot({
      path: path.join(outDir, 'popup.png'),
    });

    await context.close();
  }

  console.log(`\nDone — ${LOCALES.length} popups in store-assets/popups/`);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
