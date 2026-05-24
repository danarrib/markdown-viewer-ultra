# Chrome Web Store Listing — Markdown Viewer Ultra

Paste-ready copy for the [Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole). Update the version line in the changelog block each release.

---

## Submission flow

1. Bump `version` in `manifest.json` if updating (semver fine)
2. ZIP the *contents* of this folder (not the folder itself). Exclude: `.git/`, `store-listing.md`, dev-only files
   ```powershell
   Compress-Archive -Path *.json,*.js,*.css,*.html,icons -DestinationPath md-viewer-ultra-v0.2.0.zip
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
Render text/markdown responses and .md files as GitHub-styled Markdown. Light/dark theme. Toggle raw view anytime.
```

(115 chars — leaves room if you want to tweak.)

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
• "See original" link in the page footer to flip to the raw Markdown source, and "See rendered" to flip back
• Same toggle is available in the popup
• GitHub-style typography and code-block coloring
• Mobile-friendly responsive layout
• Theme preference syncs across your signed-in Chrome browsers

PRIVACY
• No data collection — at all
• No network requests — every render happens locally in your browser
• No analytics, no telemetry, no tracking
• The only thing stored is your theme preference (auto / light / dark), kept in Chrome's local storage

SECURITY
• Output is sanitized with DOMPurify before being inserted into the page
• Manifest V3, no remote code, no eval
• Open source — review the code yourself

HOW TO USE
1. Install the extension
2. (Optional) Enable "Allow access to file URLs" on the extension's details page if you want it to work on local .md files
3. Open any Markdown page — it renders automatically
4. Click the toolbar icon to switch theme or view the original source

PERMISSIONS
• Storage — saves your theme preference
• Access to all sites — needed because Markdown can be served from any domain, and Chrome only exposes the response MIME type after the page loads. The extension exits immediately on every page that isn't Markdown.

Questions, bugs, or feature requests? Open an issue on the project page.
```

---

## Permission justifications

The dashboard asks for a justification per permission. Paste these into the matching fields.

**`storage` permission**
```
Used to persist the user's theme preference (Auto / Light / Dark) across sessions and sync it across the user's signed-in Chrome installations via chrome.storage.sync. No other data is stored.
```

**Host permission — `<all_urls>`**
```
The extension must run on any URL because the response Content-Type (text/markdown) is only known after the page loads, not at request time. The content script checks document.contentType on every page and immediately exits unless the response is Markdown — no inspection, no DOM modification, no network activity on non-Markdown pages. The fallback URL-extension check (.md, .markdown, etc.) only activates on text/plain responses for the same reason: many static file hosts serve Markdown files as text/plain.
```

**Remote code use**
```
No. All libraries (marked, DOMPurify) are vendored locally in the extension package. No code is fetched at runtime.
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
The extension stores a single preference — your selected theme (Auto, Light, or Dark) — using Chrome's built-in storage API. Chrome may sync this preference between your signed-in browsers using chrome.storage.sync. The extension does not store or transmit anything else.

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
| Screenshots           | 1280×800 or 640×400, 1–5 | ⬜ TODO |
| Small promo tile      | 440×280 PNG           | ⬜ TODO |
| Marquee promo (optional) | 1400×560 PNG       | ⬜ TODO |
| Privacy policy URL    | public webpage        | ⬜ TODO (if required) |

**Screenshot ideas** (capture from `sample.md` rendered):
1. Light theme, full article visible (showcase headings + tables)
2. Dark theme, code block visible
3. Toolbar popup open with theme picker
4. Raw view (footer showing "See rendered" link)
5. Side-by-side or annotated "before/after" of a markdown page

---

## Version history

- **0.2.0** — Toolbar popup with theme picker (auto/light/dark) and raw-view toggle. Footer "See original" link. PNG icons.
- **0.1.0** — Initial release. Auto-render `text/markdown` responses and `.md` files with GitHub styling.
