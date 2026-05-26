// Generate Chrome Web Store screenshots for Markdown Viewer Ultra.
//
// Setup (run once from this folder):
//   npm install
// The postinstall hook downloads the Chromium build Playwright drives.
//
// Run:
//   npm run screenshots
//
// All shots are 1280x800 (Web Store spec). Output layout:
//   ../store-assets/screenshots/<locale>/<a|b|c>-*.png
//
// For each supported locale we relaunch Chromium with --lang=<code> so
// chrome.i18n.getMessage resolves to that locale's messages.json.

const path = require('path');
const fs = require('fs');
const { pathToFileURL } = require('url');
const { chromium } = require('playwright');

const EXT_PATH = path.resolve(__dirname, '..');
const OUT_BASE = path.join(EXT_PATH, 'store-assets', 'screenshots');

const VIEWPORT = { width: 1280, height: 800 };

// `code` is what Chrome sees via --lang and what Playwright uses for the
// page locale. `dir` is the output folder name; we mirror Chrome's BCP-47
// hyphen form (pt-BR, zh-CN) for the folder so it lines up with the Web
// Store dashboard, even though `_locales/` on disk uses underscores.
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

// Per-locale sample file. samples/<dir>.md is the translated showcase;
// fall back to the root sample.md if the localized variant is missing.
const sampleUrlFor = (dir) => {
  const localized = path.join(EXT_PATH, 'samples', `${dir}.md`);
  const fallback = path.join(EXT_PATH, 'sample.md');
  return pathToFileURL(fs.existsSync(localized) ? localized : fallback).toString();
};

(async () => {
  for (const locale of LOCALES) {
    const outDir = path.join(OUT_BASE, locale.dir);
    fs.mkdirSync(outDir, { recursive: true });

    console.log(`\n=== ${locale.code} → ${locale.dir}/ ===`);

    const context = await chromium.launchPersistentContext('', {
      headless: false,
      args: [
        `--disable-extensions-except=${EXT_PATH}`,
        `--load-extension=${EXT_PATH}`,
        `--lang=${locale.code}`,
      ],
      viewport: VIEWPORT,
      locale: locale.code,
    });

    let [sw] = context.serviceWorkers();
    if (!sw) sw = await context.waitForEvent('serviceworker');
    const extId = sw.url().split('/')[2];

    async function setPrefs(prefs) {
      const page = await context.newPage();
      await page.goto(`chrome-extension://${extId}/popup.html`);
      await page.evaluate(async (p) => {
        await chrome.storage.sync.set(p);
      }, prefs);
      await page.waitForTimeout(250);
      await page.close();
    }

    async function shot(name, url, prefs, opts = {}) {
      const { waitUntil = 'load', postRender } = opts;
      console.log(`  ${name}`);
      await setPrefs(prefs);
      const page = await context.newPage();
      await page.setViewportSize(VIEWPORT);
      await page.goto(url, { waitUntil });
      await page.waitForTimeout(900);
      if (postRender) await postRender(page);
      await page.screenshot({ path: path.join(outDir, name) });
      await page.close();
    }

    const sampleUrl = sampleUrlFor(locale.dir);

    // a. sample.md rendered, dark theme, narrow
    await shot('a-sample-dark-narrow.png', sampleUrl, {
      darkMode: 'dark',
      contentWidth: 'narrow',
    });

    // b. sample.md rendered, light theme, wide
    await shot('b-sample-light-wide.png', sampleUrl, {
      darkMode: 'light',
      contentWidth: 'wide',
    });

    // c. Raw view of sample.md, light theme, narrow — toggle then scroll
    // to the bottom so the localized footer link is in frame.
    await shot(
      'c-raw-light-narrow.png',
      sampleUrl,
      { darkMode: 'light', contentWidth: 'narrow' },
      {
        postRender: async (page) => {
          await page.click('#mvu-toggle');
          await page.waitForTimeout(250);
          await page.evaluate(() =>
            window.scrollTo(0, document.body.scrollHeight)
          );
          await page.waitForTimeout(100);
        },
      }
    );

    await context.close();
  }

  console.log(
    `\nDone — ${LOCALES.length * 3} screenshots in store-assets/screenshots/`
  );
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
