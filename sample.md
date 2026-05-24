# Markdown Viewer Ultra — Sample

If you can see this rendered with headings, code blocks, and tables instead of raw text, the extension is working.

## Features tested

- **Bold** and _italic_ and ~~strikethrough~~
- Inline `code` and links: [marked](https://marked.js.org/)
- Lists, tables, blockquotes, code fences

## Code block

```js
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet('Markdown'));
```

## Table

| Feature        | Status |
| -------------- | ------ |
| MIME detection | OK     |
| .md fallback   | OK     |
| Sanitization   | OK     |
| Dark mode      | OK     |

## Blockquote

> "Any sufficiently advanced rendering is indistinguishable from magic."
> — not Arthur C. Clarke

## Task list

- [x] Detect content type
- [x] Render markdown
- [x] Sanitize HTML
- [ ] Add syntax highlighting

## Image

![placeholder](https://placehold.co/600x120/png?text=Markdown+Viewer+Ultra)
