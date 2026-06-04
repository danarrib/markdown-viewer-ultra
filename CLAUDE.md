# CLAUDE.md

Guidance for Claude Code (claude.ai/code) when working in this repository.

## What this is

**Markdown Viewer Ultra** — a Manifest V3 browser extension (Chrome/Edge) that
auto-renders pages served as `text/markdown` (and `.md` files served as
`text/plain`) into GitHub-styled HTML, with theme + width controls, syntax
highlighting, and Mermaid diagrams. Published on the Chrome Web Store.

- **Stack:** plain vanilla JS. **No build step, no bundler, no framework, no
  TypeScript, no npm runtime deps.** All third-party libraries are vendored as
  minified files in the repo root and loaded directly.
- The extension ships exactly what's in the repo root — "build" = zip the folder.

## Architecture

Everything hinges on `content.js`, which runs on every page (`<all_urls>`) at
`document_end` in the **isolated world**:

1. Detect markdown: `document.contentType` is `text/markdown` / `text/x-markdown`,
   or a `text/plain` response whose URL ends in `.md`/`.markdown`/etc. Exit
   immediately otherwise (no DOM touch, no network, on every non-markdown page).
2. Read raw text (Chrome wraps `text/*` in a single `<pre>`), `marked.parse` →
   `DOMPurify.sanitize` → swap `document.body` for `<article class="markdown-body">`.
3. Highlight `pre code` via highlight.js; transform `code.language-mermaid` blocks
   (see Mermaid below).
4. Theme + width are applied as classes on `<html>` (`mvu-force-{dark,light}`,
   `mvu-width-{narrow,wide,full}`), read from `chrome.storage.sync`.

**Theme override mechanism:** `styles.css` re-declares the same CSS variables that
`github-markdown.css` ships inside `@media (prefers-color-scheme)` blocks, but
under higher-specificity `html.mvu-force-* .markdown-body` selectors, so the
manual override beats the OS preference.

**Popup ↔ content:** `popup.js` uses `chrome.tabs.sendMessage` with
`getState` / `toggleRender` messages. If the active tab isn't markdown (no
listener), it shows a "Not a markdown page" note. Messaging + `chrome.tabs.query`
work with **only the `storage` permission** — no `tabs` permission needed.

**Background (`background.js`):** registers `chrome.runtime.setUninstallURL`
(feedback issue), and on `onInstalled` with `reason === 'update'` + a changed
`previousVersion`, opens `CHANGELOG.md` on GitHub via `chrome.tabs.create`
(no `tabs` permission needed). The version guard keeps dev reloads silent.

### Mermaid (lazy-loaded, main world)

Mermaid is ~2.7MB, so it's injected **only on pages that contain a `mermaid`
block**, and to avoid escalating permissions it runs in the page **main world**:

- `content.js` swaps each `<pre><code class="language-mermaid">` for a
  `<div class="mvu-mermaid" data-mvu-src="…">` holding the decoded source, then
  appends `<script src=mermaid.min.js>` followed by `<script src=mermaid-bootstrap.js>`
  (both declared in `web_accessible_resources`).
- `mermaid-bootstrap.js` runs in the main world (where `mermaid.min.js` attaches
  `globalThis.mermaid`), inits with `securityLevel: 'strict'` + theme from the
  `mvu-force-*` classes, and renders. It re-renders on a `mvu-mermaid-render`
  DOM event that `content.js` dispatches on raw/render toggle and theme flip.
- **Gotcha:** a strict page CSP (`script-src 'self'`) blocks the injected
  extension script; the block then falls back to showing the diagram source.
  `file://` and `text/plain` sources are unaffected.

## File layout

See `README.md` "File layout" for the full annotated tree. Key files:
`manifest.json`, `content.js`, `popup.{html,js,css}`, `background.js`,
`styles.css`, `hljs-theme.css`, vendored libs (`marked.min.js`, `purify.min.js`,
`highlight.min.js`, `mermaid.min.js`, `github-markdown.css`), `mermaid-bootstrap.js`,
`_locales/`, `samples/`, `store-assets/`, `scripts/`.

## i18n

- `chrome.i18n` with `_locales/<code>/messages.json`; `default_locale: en`.
- **17 locales.** Popup strings are tagged with `data-i18n` attributes and filled
  by `popup.js`. `manifest.json` uses `__MSG_extDescription__`.
- **Naming mismatch to remember:** `_locales/` dirs use **underscores**
  (`pt_BR`, `zh_CN`), while `samples/` files and screenshot output dirs use
  **hyphens** (`pt-BR`, `zh-CN`). The screenshot script maps between them.

## Dev / test

- **Load unpacked:** `chrome://extensions` → Developer mode → Load unpacked →
  this folder. For local `.md` files, enable "Allow access to file URLs" on the
  details page.
- **Manual test fixtures:** `sample.md` (root) and `samples/<locale>.md` cover all
  formatting incl. Mermaid.
- **No unit tests.** Verification is via a real Chromium with the extension
  loaded (Playwright). Markdown is detected on `http` only when served as
  `text/markdown`; over `file://` it needs file-URL access (the screenshot setup
  has it). To verify rendering ad-hoc, launch `chromium.launchPersistentContext`
  with `--load-extension=<repo>` and assert on `.mvu-mermaid svg` / `article.markdown-body`.

### scripts/ (Playwright tooling — has its own package.json)

```bash
cd scripts && npm install        # postinstall downloads Chromium
npm run screenshots              # 4 store shots × 17 locales → store-assets/screenshots/<locale>/
npm run popup-screenshots        # raw 280px popup PNGs
npm run popup-cards              # 1280×800 popup cards on gradient bg
```

Screenshot shots per locale: `a` sample dark/narrow, `b` sample light/wide,
`c` raw view light/narrow, `d` Mermaid diagram dark/narrow.

## Updating vendored libraries

```bash
curl -sSL -o marked.min.js       https://cdn.jsdelivr.net/npm/marked@14.1.3/marked.min.js
curl -sSL -o github-markdown.css https://cdn.jsdelivr.net/npm/github-markdown-css@5.6.1/github-markdown.css
curl -sSL -o purify.min.js       https://cdn.jsdelivr.net/npm/dompurify@3.1.7/dist/purify.min.js
curl -sSL -o highlight.min.js    https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.10.0/build/highlight.min.js
curl -sSL -o mermaid.min.js      https://cdn.jsdelivr.net/npm/mermaid@11.6.0/dist/mermaid.min.js
```

## Web Store release checklist

1. Bump `version` in `manifest.json` (e.g. 0.4.0).
2. Update `store-listing.md` — add a `### [x.y.z]` Changelog entry; reflect new
   features in the per-locale "Detailed description" blocks. **Those blocks are
   inside ``` fences — never put a literal triple-backtick inside them.**
3. Regenerate screenshots (`npm run screenshots`) if visuals changed.
4. Zip the repo root (excluding `*.zip`, `node_modules/`) and upload.
5. `PRIVACY.md` is the public privacy-policy page; keep its claims accurate
   ("no network requests, no remote code, all libs bundled locally").

## Conventions

- 2-space indent, single quotes, semicolons. IIFE in `content.js`.
- All injected classes/ids/events are namespaced `mvu-` / `mvu-mermaid-*`.
- File names kebab-case. Keep files small; comments sparse (explain *why*, not *what*).
- **Commits:** Conventional Commits with scope, e.g. `feat(i18n): …`,
  `docs(store-listing): …`, `chore(scripts): …`. `master` is the release branch.
- **Security invariants:** MV3, no remote code, no `eval`; sanitize with
  DOMPurify before insertion; Mermaid runs `securityLevel: 'strict'`. Don't add
  host permissions or `scripting` — the lazy-load is deliberately built to need
  only `storage` + `web_accessible_resources`.
