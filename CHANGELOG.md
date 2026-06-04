# Changelog

All notable changes to **Markdown Viewer Ultra**, most recent first.
Format follows [Keep a Changelog](https://keepachangelog.com/).

## [0.4.0] — 2026-06-04

### Added
- **Mermaid diagrams** — fenced `mermaid` code blocks render as SVG charts via Mermaid 11.6.0, themed to match the active light/dark setting and re-rendered when you flip the theme.
- Mermaid is lazy-loaded (~2.7 MB) only on pages that actually contain a diagram, so ordinary pages are unaffected.
- The extension now opens this changelog automatically when Chrome updates it to a new version.

### Notes
- No new permissions — still `storage` only. Mermaid is injected on demand via `web_accessible_resources` and runs with `securityLevel: "strict"`.
- Known limitation: a strict page Content-Security-Policy (`script-src 'self'`) can block the injected diagram script; the block then falls back to showing the diagram source. Local `.md` files and `text/plain` sources are unaffected.

## [0.3.0] — 2026-05-26

### Added
- Localized UI in 17 languages.
- Syntax highlighting on fenced code blocks via highlight.js (~30 languages), with colors that follow the active theme.
- Content-width picker in the popup: Narrow (920px), Wide (1440px), Full.
- Opens the feedback page when the extension is uninstalled.
