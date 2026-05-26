# Chrome Web Store Listing — Markdown Viewer Ultra

Paste-ready copy for the [Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole). Update the version line in the changelog block each release.

---

## Submission flow

1. Bump `version` in `manifest.json` if updating (semver fine)
2. ZIP the *contents* of this folder (not the folder itself). The command below lists every shipping file explicitly — README, sample.md, store-assets, PRIVACY.md, store-listing.md, and `.git/` are intentionally omitted.
   ```powershell
   $version = (Get-Content manifest.json -Raw | ConvertFrom-Json).version
   Compress-Archive `
     -Path manifest.json,background.js,content.js,popup.html,popup.js,popup.css,styles.css,github-markdown.css,hljs-theme.css,marked.min.js,purify.min.js,highlight.min.js,icons,_locales `
     -DestinationPath "md-viewer-ultra-v$version.zip" `
     -CompressionLevel Optimal
   ```
3. Upload at `chrome.google.com/webstore/devconsole` → New item / new version
4. Paste copy from the sections below into the matching fields
5. Set **Visibility: Unlisted** for first release — lets you test the install flow with the public listing URL before going Public
6. Submit. First review can take a few hours to ~3 days; subsequent updates are usually faster.

---

## Listing basics

**Name**
```
Markdown Viewer Ultra
```

**Category**
```
Productivity
```

**Language**
```
English (United States)
```

**Single purpose** (CWS requires one sentence)
```
Render Markdown content as formatted HTML when a page is served with the text/markdown MIME type or has a Markdown file extension.
```

---

## Short description (max 132 characters)

```
Render Markdown files and text/markdown responses with syntax highlighting, light/dark themes, and adjustable width.
```

(116 chars — leaves room if you want to tweak.)

---

## Detailed description

```
Markdown Viewer Ultra turns any page Chrome would otherwise show as raw text into a clean, GitHub-style document — automatically.

If a server responds with Content-Type: text/markdown (or you open a .md / .markdown file served as plain text), the extension parses it with GFM-compatible Markdown, sanitizes the output, and replaces the raw view with formatted HTML: headings, tables, code blocks, task lists, blockquotes, images, and links — exactly as you'd expect them to look on GitHub.

WHAT IT RENDERS
• text/markdown and text/x-markdown responses
• Local and remote .md, .markdown, .mdown, .mkd, .mkdn files served as text/plain
• GitHub-Flavored Markdown: tables, task lists, strikethrough, fenced code, autolinks

FEATURES
• Toolbar popup with three themes: Auto (follows your OS), Light, Dark
• Content-width picker: Narrow (920px), Wide (1440px), or Full (fills the window)
• Syntax highlighting for ~30 common languages (JavaScript, TypeScript, Python, Go, Rust, Ruby, C/C++/C#, Java, SQL, Bash, JSON, YAML, HTML, CSS, and more) — colors follow the active theme
• Localized UI in 8 languages: English, Português (BR), Español, Français, Deutsch, Italiano, 日本語, 简体中文
• "See original" link in the page footer to flip to the raw Markdown source, and "See rendered" to flip back
• Same toggles are available in the popup
• GitHub-style typography and code-block coloring (including light/dark prettylights palette)
• Mobile-friendly responsive layout
• Theme + width preferences sync across your signed-in Chrome browsers

PRIVACY
• No data collection — at all
• No network requests — every render happens locally in your browser
• No analytics, no telemetry, no tracking
• The only things stored are your theme and width preferences, kept in Chrome's built-in storage
• On uninstall, Chrome opens the project's feedback page so you can tell us what to fix

SECURITY
• Output is sanitized with DOMPurify before being inserted into the page
• Manifest V3, no remote code, no eval — all libraries (marked, DOMPurify, highlight.js, github-markdown-css) are bundled locally
• Open source — review the code yourself

HOW TO USE
1. Install the extension
2. (Optional) Enable "Allow access to file URLs" on the extension's details page if you want it to work on local .md files
3. Open any Markdown page — it renders automatically
4. Click the toolbar icon to switch theme, change width, or view the original source

PERMISSIONS
• Storage — saves your theme and width preferences
• Access to all sites — needed because Markdown can be served from any domain, and Chrome only exposes the response MIME type after the page loads. The extension exits immediately on every page that isn't Markdown.

Questions, bugs, or feature requests? Open an issue on the project page.
```

---

## Permission justifications

The dashboard asks for a justification per permission. Paste these into the matching fields.

**`storage` permission**
```
Used to persist the user's display preferences — theme (Auto / Light / Dark) and content width (Narrow / Wide / Full) — across sessions and sync them across the user's signed-in Chrome installations via chrome.storage.sync. No other data is stored.
```

**Host permission — `<all_urls>`**
```
The extension must run on any URL because the response Content-Type (text/markdown) is only known after the page loads, not at request time. The content script checks document.contentType on every page and immediately exits unless the response is Markdown — no inspection, no DOM modification, no network activity on non-Markdown pages. The fallback URL-extension check (.md, .markdown, etc.) only activates on text/plain responses for the same reason: many static file hosts serve Markdown files as text/plain.
```

**Remote code use**
```
No. All libraries (marked, DOMPurify, highlight.js, github-markdown-css) are vendored locally in the extension package. No code is fetched at runtime.
```

---

## Privacy practices (Data usage form)

Tick **No** for all data-collection categories. The single-purpose statement and disclosures:

**Single purpose disclosure**
```
Render Markdown content as formatted HTML when a page is served with the text/markdown MIME type or has a Markdown file extension.
```

**Data usage certifications** (tick all three)
- I do not sell or transfer user data to third parties, outside of approved use cases
- I do not use or transfer user data for purposes that are unrelated to my item's single purpose
- I do not use or transfer user data to determine creditworthiness or for lending purposes

**Data collected**: None of the categories apply. Leave them all unchecked.

If the form requires a privacy policy URL because of the `<all_urls>` host permission, host a one-page policy somewhere (GitHub Pages works). A minimal policy is included below.

---

## Minimal privacy policy (host on GitHub Pages / your site)

```
# Markdown Viewer Ultra — Privacy Policy

Effective: [DATE]

Markdown Viewer Ultra does not collect, store, transmit, or share any personal data.

WHAT THE EXTENSION DOES
The extension reads the content of the page you are currently viewing only when that page's response Content-Type is text/markdown (or the URL ends in a Markdown file extension and is served as text/plain). It renders that content locally in your browser and replaces the page body with formatted HTML.

WHAT IS STORED
The extension stores two preferences — your selected theme (Auto, Light, or Dark) and your selected content width (Narrow, Wide, or Full) — using Chrome's built-in storage API. Chrome may sync these preferences between your signed-in browsers using chrome.storage.sync. The extension does not store or transmit anything else.

WHAT IS NOT DONE
- No analytics, no telemetry, no tracking
- No network requests of any kind
- No reading of pages that are not Markdown
- No sharing of data with third parties

CONTACT
Questions about this policy: [YOUR EMAIL]
```

---

## Assets checklist

Required before submission:

| Asset                 | Spec                  | Status |
| --------------------- | --------------------- | ------ |
| Store icon            | 128×128 PNG           | ✅ `icons/icon-128.png` |
| Screenshots           | 1280×800 or 640×400, 1–5 | ✅ `store-assets/screenshot-*.png` (script: `scripts/take-screenshots.js`) |
| Small promo tile      | 440×280 PNG           | ✅ `store-assets/promo-440x280.png` |
| Marquee promo (optional) | 1400×560 PNG       | ✅ `store-assets/promo-1400x560.png` |
| Privacy policy URL    | public webpage        | ✅ `https://github.com/danarrib/markdown-viewer-ultra/blob/master/PRIVACY.md` |

**Regenerating screenshots** — `scripts/take-screenshots.js` drives a real Chromium with the unpacked extension loaded and saves three 1280×800 PNGs (sample dark/narrow, BulletGCSS light/wide, raw view light/narrow). Run with `cd scripts && npm install && npm run screenshots`. Set `MVU_LANG=pt-BR` (or any other locale) before running to capture a localized variant.

---

## Changelog

Format follows [Keep a Changelog](https://keepachangelog.com/). Versions are git tags on `master`.

### [0.3.0] — 2026-05-26

**Added**
- Localized UI in 8 languages — English (default), Português (BR), Español, Français, Deutsch, Italiano, 日本語, 简体中文 — via `_locales/` and Chrome's `chrome.i18n` API
- Syntax highlighting on fenced code blocks via highlight.js Common build (~30 languages). Token classes mapped to GitHub's `--color-prettylights-syntax-*` variables so code colors follow the active theme
- Content-width picker in the popup: **Narrow** (920px, default), **Wide** (1440px), **Full** (no max — fills the viewport with 1.5rem side margins)
- Background service worker registers a `chrome.runtime.setUninstallURL` pointing at the feedback issue (`/issues/1`) so Chrome opens it when the user removes the extension

**Changed**
- Popup version label reads from `chrome.runtime.getManifest()` instead of being hardcoded
- Manifest description shortened to fit the 132-char Web Store limit and converted to `__MSG_extDescription__` so each locale ships its own copy

**Tooling**
- `scripts/take-screenshots.js` — Playwright-driven generator for the 1280×800 store screenshots, runnable via `npm run screenshots`
- `store-assets/` now contains promo tile (440×280), marquee (1400×560), and the three generated screenshots

### [0.2.0] — 2026-05-23

**Added**
- Toolbar popup with theme picker (Auto / Light / Dark) persisted in `chrome.storage.sync`
- Per-page raw / rendered toggle accessible from both the popup and the footer "See original" link
- PNG icons at 16, 32, 48, 128
- Forced light/dark theme overrides redeclaring the GitHub prettylights variables under `html.mvu-force-{light,dark}`

**Submitted to the Chrome Web Store and approved.**

### [0.1.0] — 2026-05-23

**Added**
- Initial scaffold: auto-render `text/markdown` and `text/x-markdown` responses, plus `.md` / `.markdown` / `.mdown` / `.mkd` / `.mkdn` files served as `text/plain`
- marked@14 for parsing, DOMPurify@3 for sanitization, github-markdown-css@5 for typography
- Auto-theme via `prefers-color-scheme` media query
