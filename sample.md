# Markdown Viewer Ultra — Feature Showcase

If you can read this rendered with headings, code colors, tables, and task lists instead of raw text, the extension is working.

---

## Text formatting

This paragraph mixes **bold**, _italic_, ***bold italic***, ~~strikethrough~~, `inline code`, and a [link to the project](https://github.com/danarrib/markdown-viewer-ultra).

You can also do H<sub>2</sub>O and E = mc<sup>2</sup> with inline HTML, and even <kbd>Ctrl</kbd> + <kbd>C</kbd> for keyboard hints.

---

## Headings

# H1 — Document title
## H2 — Section
### H3 — Subsection
#### H4 — Group
##### H5 — Detail
###### H6 — Footnote-level

---

## Lists

### Unordered (with nesting)

- First item
- Second item
  - Nested A
  - Nested B
    - Deeply nested
- Third item

### Ordered

1. Boot the toaster
2. Insert the bread
3. Wait for the click
4. Apply butter

### Task list

- [x] Detect content type
- [x] Render markdown
- [x] Sanitize HTML
- [x] Localize the UI
- [x] Add syntax highlighting
- [ ] Add a settings page

---

## Code blocks

### JavaScript

```js
// Fibonacci with memoization
const fib = (() => {
  const cache = new Map([[0, 0], [1, 1]]);
  return function f(n) {
    if (cache.has(n)) return cache.get(n);
    const value = f(n - 1) + f(n - 2);
    cache.set(n, value);
    return value;
  };
})();

console.log(fib(50)); // 12586269025
```

### Python

```python
from dataclasses import dataclass
from typing import Iterable

@dataclass(frozen=True)
class Point:
    x: float
    y: float

    def distance(self, other: "Point") -> float:
        return ((self.x - other.x) ** 2 + (self.y - other.y) ** 2) ** 0.5

def closest_pair(points: Iterable[Point]) -> tuple[Point, Point]:
    pts = list(points)
    return min(
        ((a, b) for i, a in enumerate(pts) for b in pts[i + 1:]),
        key=lambda pair: pair[0].distance(pair[1]),
    )
```

### Bash

```bash
#!/usr/bin/env bash
set -euo pipefail

# Find every .md file larger than 1 KB and count its lines
find . -name '*.md' -size +1k -print0 \
  | while IFS= read -r -d '' file; do
      lines=$(wc -l < "$file")
      printf '%6d  %s\n' "$lines" "$file"
    done \
  | sort -rn \
  | head -10
```

### Inline code without a language

```
Plain block — no syntax highlighting applied.
Useful for tree output, diagrams, or copy-paste samples.
```

---

## Tables

| Feature              | Status | Notes                              |
| -------------------- | :----: | ---------------------------------- |
| MIME detection       |   ✅   | `text/markdown` and `text/x-markdown` |
| `.md` fallback       |   ✅   | when server sends `text/plain`     |
| Sanitization         |   ✅   | DOMPurify                          |
| Dark mode            |   ✅   | auto / light / dark                |
| Localization         |   ✅   | 8 languages                        |
| Syntax highlighting  |   ✅   | highlight.js Common build          |

Right-aligned numbers also work:

| Item       | Price |
| ---------- | ----: |
| Coffee     |  4.50 |
| Croissant  |  3.25 |
| Subtotal   |  7.75 |

---

## Blockquotes

> "Programs must be written for people to read, and only incidentally for machines to execute."
>
> — Harold Abelson, _Structure and Interpretation of Computer Programs_

Nested:

> Outer thought.
>
> > Inner reply, with **emphasis** and `code`.
> >
> > > And a third level, for the truly recursive.

---

## Images

Inline placeholder:

![placeholder](https://placehold.co/600x120/png?text=Markdown+Viewer+Ultra)

---

## Horizontal rules

Below this line is a horizontal rule.

---

…and another one. Useful for separating sections in long docs.

---

## Links and references

A plain [link](https://example.com), an auto-link <https://example.com>, and a link with a [title attribute](https://example.com "Hover me").

That's the tour — if everything above looks polished, you're seeing the full feature set: typography, lists, code highlighting, tables, blockquotes, and theme-aware colors.
