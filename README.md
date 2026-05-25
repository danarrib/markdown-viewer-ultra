# Markdown Viewer Ultra

Chrome extension that renders pages with MIME type `text/markdown` (and `.md` files served as `text/plain`) as formatted Markdown with GitHub-style CSS. Toolbar popup lets you switch theme and flip between rendered and raw views.

<img width="1280" height="800" alt="screenshot (1)" src="https://github.com/user-attachments/assets/08864e4a-c0b3-40d8-af59-c51eb580c1db" />

## Install (developer mode)

1. Open `chrome://extensions`
2. Toggle **Developer mode** (top-right)
3. Click **Load unpacked** and select this folder
4. (Optional, for local `.md` files) Click **Details** on the loaded extension → enable **Allow access to file URLs**

## Features

- Auto-renders `text/markdown` and `text/x-markdown` responses
- Falls back to URL extension detection (`.md`, `.markdown`, `.mdown`, `.mkd`, `.mkdn`) when the server sends `text/plain`
- GitHub-flavored Markdown via [marked](https://marked.js.org/)
- HTML sanitized with [DOMPurify](https://github.com/cure53/DOMPurify)
- Syntax highlighting via [highlight.js](https://highlightjs.org/) Common build (~30 languages) — code colors follow the active theme
- Theme override: **Auto** (follows OS), **Light**, **Dark** — synced via `chrome.storage.sync`
- Toggle between rendered and raw view per page:
  - Footer link on rendered page: **See original** / **See rendered**
  - Toolbar popup button: same toggle
- Localized UI in 8 languages: English, Português (BR), Español, Français, Deutsch, Italiano, 日本語, 简体中文
- Toolbar icon (16/32/48/128 PNGs)
- Opens the feedback issue when uninstalled

## Test it

- **Local file**: load `sample.md` (after enabling file URL access):
  `file:///C:/Document/DevData/pgp/projects/md-viewer-ultra/sample.md`
- **Live**: any URL serving `Content-Type: text/markdown`, or a raw `.md` URL served as `text/plain` (e.g. `https://raw.githubusercontent.com/markedjs/marked/master/README.md`).

## How it works

- `content.js` runs on every page at `document_end`. Exits unless the response is markdown.
- Reads the raw text (Chrome wraps text/* responses in a single `<pre>`), parses with marked, sanitizes with DOMPurify, swaps the body for `<article class="markdown-body">…</article>` plus a footer.
- Theme override: re-declares the same CSS variables `github-markdown.css` defines inside its `@media (prefers-color-scheme: …)` blocks, but under `html.mvu-force-{dark,light} .markdown-body` selectors. Higher specificity wins, so the override beats the OS preference.
- Popup ↔ content script communication: `chrome.tabs.sendMessage` carries `getState` / `toggleRender` messages. If the active tab isn't a markdown page, the popup shows a "Not a markdown page" notice instead of the toggle button.
- Theme preference lives in `chrome.storage.sync` (`{ darkMode: "auto" | "light" | "dark" }`). The content script listens to `chrome.storage.onChanged` so flipping the popup updates every open markdown tab live.

## File layout

```
md-viewer-ultra/
├── manifest.json         # MV3 declaration (action + content_script + bg)
├── background.js         # Service worker — registers uninstall URL
├── content.js            # Detection, render, raw/render toggle, theme apply, hljs
├── styles.css            # Page chrome, footer, raw view, force-theme vars
├── hljs-theme.css        # Maps hljs token classes to GitHub prettylights vars
├── github-markdown.css   # Vendored github-markdown-css@5.6.1
├── marked.min.js         # Vendored marked@14.1.3
├── purify.min.js         # Vendored dompurify@3.1.7
├── highlight.min.js      # Vendored highlight.js@11.10.0 (Common build)
├── popup.html            # Toolbar popup
├── popup.js              # Popup logic (theme + toggle + i18n + version)
├── popup.css             # Popup styling
├── icons/                # 16/32/48/128 PNGs
├── _locales/             # i18n strings — en (default) + 7 translations
│   ├── en/messages.json
│   ├── pt_BR/messages.json
│   └── …
├── store-assets/         # Web Store promo tile, marquee, screenshots (not shipped)
├── sample.md             # Test fixture covering all formatting
├── PRIVACY.md            # Privacy policy (Chrome Web Store URL)
├── store-listing.md      # Web Store listing copy + submission flow
└── README.md
```

## Known limitations / next steps

- Render/raw toggle state is per-tab and resets on reload (intentional — the page already starts in rendered view).
- Servers that send `text/html` for markdown won't be detected (very rare).
- Syntax highlighting uses the Common build (~30 languages). For rarer languages (Erlang, Nim, Crystal, etc.) you'll get plain-text fallback.

<img width="1280" height="800" alt="screenshot (3)" src="https://github.com/user-attachments/assets/13fa1dcd-add2-4612-8b14-a2d034325683" />

## Updating vendored libs

```bash
curl -sSL -o marked.min.js       https://cdn.jsdelivr.net/npm/marked@14.1.3/marked.min.js
curl -sSL -o github-markdown.css https://cdn.jsdelivr.net/npm/github-markdown-css@5.6.1/github-markdown.css
curl -sSL -o purify.min.js       https://cdn.jsdelivr.net/npm/dompurify@3.1.7/dist/purify.min.js
curl -sSL -o highlight.min.js    https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.10.0/build/highlight.min.js
```
