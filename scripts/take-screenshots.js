// Generate Chrome Web Store screenshots for Markdown Viewer Ultra.
//
// Setup (run once from this folder):
//   npm install
// The postinstall hook downloads the Chromium build Playwright drives.
//
// Run:
//   npm run screenshots
//
// All shots are 1280x800 (Web Store spec) and land in ../store-assets/.

const path = require('path');
const fs = require('fs');
const { pathToFileURL } = require('url');
const { chromium } = require('playwright');

const EXT_PATH = path.resolve(__dirname, '..');
const OUT_DIR = path.join(EXT_PATH, 'store-assets');
const SAMPLE_URL = pathToFileURL(path.join(EXT_PATH, 'sample.md')).toString();
const BULLETGCSS_URL =
  'https://raw.githubusercontent.com/danarrib/BulletGCSS/refs/heads/master/README.md';

const VIEWPORT = { width: 1280, height: 800 };

(async () => {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  // Force English UI so chrome.i18n.getMessage resolves to en/messages.json
  // — store listing screenshots should match the default locale unless you
  // explicitly want a localized capture, in which case override --lang below.
  const LANG = process.env.MVU_LANG || 'en-US';

  const context = await chromium.launchPersistentContext('', {
    headless: false,
    args: [
      `--disable-extensions-except=${EXT_PATH}`,
      `--load-extension=${EXT_PATH}`,
      `--lang=${LANG}`,
    ],
    viewport: VIEWPORT,
    locale: LANG,
  });

  // Resolve the extension ID via its service worker URL.
  let [sw] = context.serviceWorkers();
  if (!sw) sw = await context.waitForEvent('serviceworker');
  const extId = sw.url().split('/')[2];
  console.log(`Extension ID: ${extId}`);

  // Apply theme + width prefs by running chrome.storage.sync.set from a page
  // that lives inside the extension's own origin (the popup HTML works fine).
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
    console.log(`Capturing ${name}…`);
    await setPrefs(prefs);
    const page = await context.newPage();
    await page.setViewportSize(VIEWPORT);
    await page.goto(url, { waitUntil });
    // Give the content script time to parse + highlight code blocks.
    await page.waitForTimeout(900);
    if (postRender) await postRender(page);
    const outPath = path.join(OUT_DIR, name);
    await page.screenshot({ path: outPath });
    console.log(`  → ${outPath}`);
    await page.close();
  }

  // a. sample.md rendered, dark theme, narrow
  await shot(
    'screenshot-a-sample-dark-narrow.png',
    SAMPLE_URL,
    { darkMode: 'dark', contentWidth: 'narrow' }
  );

  // b. BulletGCSS README from raw.githubusercontent.com, light theme, wide
  await shot(
    'screenshot-b-bulletgcss-light-wide.png',
    BULLETGCSS_URL,
    { darkMode: 'light', contentWidth: 'wide' },
    { waitUntil: 'networkidle' }
  );

  // c. Raw view of sample.md, light theme, narrow — click footer to flip.
  await shot(
    'screenshot-c-raw-light-narrow.png',
    SAMPLE_URL,
    { darkMode: 'light', contentWidth: 'narrow' },
    {
      postRender: async (page) => {
        await page.click('#mvu-toggle');
        await page.waitForTimeout(250);
        // Scroll to the bottom so the "See rendered" footer link is in frame.
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(100);
      },
    }
  );

  await context.close();
  console.log('Done.');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
