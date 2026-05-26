# Markdown Viewer Ultra — ਫੀਚਰ ਸ਼ੋਅਕੇਸ

ਜੇ ਤੁਸੀਂ ਇਸਨੂੰ ਸਿਰਲੇਖਾਂ, ਕੋਡ ਦੇ ਰੰਗਾਂ, ਟੇਬਲਾਂ ਅਤੇ ਕਾਰਜ ਸੂਚੀਆਂ ਨਾਲ ਦੇਖ ਸਕਦੇ ਹੋ, ਨਾ ਕਿ ਕੱਚੇ ਟੈਕਸਟ ਵਿੱਚ — ਤਾਂ ਐਕਸਟੈਨਸ਼ਨ ਠੀਕ ਕੰਮ ਕਰ ਰਿਹਾ ਹੈ।

---

## ਟੈਕਸਟ ਫਾਰਮੈਟਿੰਗ

ਇਸ ਪੈਰੇ ਵਿੱਚ **ਮੋਟਾ**, _ਇਟਾਲਿਕ_, ***ਮੋਟਾ ਇਟਾਲਿਕ***, ~~ਸਟਰਾਈਕਥਰੂ~~, `ਇਨਲਾਈਨ ਕੋਡ`, ਅਤੇ ਇੱਕ [ਪ੍ਰੋਜੈਕਟ ਲਿੰਕ](https://github.com/danarrib/markdown-viewer-ultra) ਮਿਲਾਏ ਗਏ ਹਨ।

ਇਨਲਾਈਨ HTML ਨਾਲ ਤੁਸੀਂ H<sub>2</sub>O ਅਤੇ E = mc<sup>2</sup> ਵੀ ਲਿਖ ਸਕਦੇ ਹੋ, ਅਤੇ ਕੀਬੋਰਡ ਸੰਕੇਤ ਲਈ <kbd>Ctrl</kbd> + <kbd>C</kbd> ਵੀ।

---

## ਸਿਰਲੇਖ

# H1 — ਦਸਤਾਵੇਜ਼ ਦਾ ਸਿਰਲੇਖ
## H2 — ਭਾਗ
### H3 — ਉਪ-ਭਾਗ
#### H4 — ਸਮੂਹ
##### H5 — ਵੇਰਵਾ
###### H6 — ਪਾਦਟਿੱਪਣੀ ਪੱਧਰ

---

## ਸੂਚੀਆਂ

### ਬਿਨਾਂ ਕ੍ਰਮ (ਨੈਸਟਡ)

- ਪਹਿਲਾ ਆਈਟਮ
- ਦੂਜਾ ਆਈਟਮ
  - ਨੈਸਟਡ A
  - ਨੈਸਟਡ B
    - ਡੂੰਘਾ ਨੈਸਟਡ
- ਤੀਜਾ ਆਈਟਮ

### ਕ੍ਰਮਬੱਧ

1. ਟੋਸਟਰ ਚਾਲੂ ਕਰੋ
2. ਡਬਲਰੋਟੀ ਪਾਓ
3. ਕਲਿੱਕ ਦੀ ਉਡੀਕ ਕਰੋ
4. ਮੱਖਣ ਲਾਓ

### ਕਾਰਜ ਸੂਚੀ

- [x] ਸਮੱਗਰੀ ਕਿਸਮ ਪਛਾਣੋ
- [x] markdown ਰੈਂਡਰ ਕਰੋ
- [x] HTML ਨੂੰ ਸੁਰੱਖਿਅਤ ਕਰੋ
- [x] ਇੰਟਰਫੇਸ ਲੋਕਲਾਈਜ਼ ਕਰੋ
- [x] ਸਿੰਟੈਕਸ ਹਾਈਲਾਈਟਿੰਗ ਜੋੜੋ
- [ ] ਸੈਟਿੰਗਜ਼ ਪੰਨਾ ਜੋੜੋ

---

## ਕੋਡ ਬਲਾਕ

### JavaScript

```js
// ਮੈਮੋਇਜ਼ੇਸ਼ਨ ਨਾਲ ਫਿਬੋਨਾਚੀ
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

# 1 KB ਤੋਂ ਵੱਡੀ ਹਰ .md ਫਾਈਲ ਲੱਭੋ ਅਤੇ ਇਸਦੀਆਂ ਲਾਈਨਾਂ ਗਿਣੋ
find . -name '*.md' -size +1k -print0 \
  | while IFS= read -r -d '' file; do
      lines=$(wc -l < "$file")
      printf '%6d  %s\n' "$lines" "$file"
    done \
  | sort -rn \
  | head -10
```

### ਭਾਸ਼ਾ ਤੋਂ ਬਿਨਾਂ ਬਲਾਕ

```
ਸਾਦਾ ਬਲਾਕ — ਕੋਈ ਸਿੰਟੈਕਸ ਹਾਈਲਾਈਟਿੰਗ ਨਹੀਂ।
ਡਾਇਰੈਕਟਰੀ ਟਰੀ, ਚਿੱਤਰ ਜਾਂ ਕਾਪੀ-ਪੇਸਟ ਨਮੂਨਿਆਂ ਲਈ ਲਾਭਦਾਇਕ।
```

---

## ਟੇਬਲ

| ਵਿਸ਼ੇਸ਼ਤਾ              | ਸਥਿਤੀ | ਨੋਟਸ                                  |
| --------------------- | :---: | ------------------------------------- |
| MIME ਪਛਾਣ             |  ✅   | `text/markdown` ਅਤੇ `text/x-markdown` |
| `.md` ਫਾਲਬੈਕ          |  ✅   | ਜਦੋਂ ਸਰਵਰ `text/plain` ਭੇਜਦਾ ਹੈ        |
| ਸੈਨੇਟਾਈਜ਼ੇਸ਼ਨ           |  ✅   | DOMPurify                             |
| ਡਾਰਕ ਮੋਡ              |  ✅   | ਆਟੋ / ਹਲਕਾ / ਗੂੜਾ                     |
| ਲੋਕਲਾਈਜ਼ੇਸ਼ਨ           |  ✅   | 17 ਭਾਸ਼ਾਵਾਂ                            |
| ਸਿੰਟੈਕਸ ਹਾਈਲਾਈਟਿੰਗ    |  ✅   | highlight.js Common ਬਿਲਡ              |

ਸੱਜੇ ਪਾਸੇ ਸਿੱਧੇ ਨੰਬਰ ਵੀ ਕੰਮ ਕਰਦੇ ਹਨ:

| ਆਈਟਮ      | ਮੁੱਲ |
| ---------- | ---: |
| ਕੌਫੀ       | 4.50 |
| ਕਰੋਸਾਂ      | 3.25 |
| ਉਪ-ਜੋੜ    | 7.75 |

---

## ਉਦਾਹਰਣਾਂ

> "ਪ੍ਰੋਗਰਾਮ ਲੋਕਾਂ ਦੇ ਪੜ੍ਹਨ ਲਈ ਲਿਖੇ ਜਾਣੇ ਚਾਹੀਦੇ ਹਨ, ਅਤੇ ਸਿਰਫ਼ ਮਸ਼ੀਨਾਂ ਦੇ ਚਲਾਉਣ ਲਈ ਅਨੁਸੂਚੀ ਨਾਲ।"
>
> — Harold Abelson, _Structure and Interpretation of Computer Programs_

ਨੈਸਟਡ:

> ਬਾਹਰੀ ਵਿਚਾਰ।
>
> > ਅੰਦਰੂਨੀ ਜਵਾਬ, **ਜ਼ੋਰ** ਅਤੇ `ਕੋਡ` ਨਾਲ।
> >
> > > ਅਤੇ ਤੀਜਾ ਪੱਧਰ, ਅਸਲ ਵਿੱਚ ਪੁਨਰਾਵਰਤੀ ਲੋਕਾਂ ਲਈ।

---

## ਚਿੱਤਰ

ਇਨਲਾਈਨ ਪਲੇਸਹੋਲਡਰ:

![placeholder](https://placehold.co/600x120/png?text=Markdown+Viewer+Ultra)

---

## ਖਿਤਿਜੀ ਰੇਖਾਵਾਂ

ਇਸ ਲਾਈਨ ਦੇ ਹੇਠਾਂ ਇੱਕ ਖਿਤਿਜੀ ਰੇਖਾ ਹੈ।

---

…ਅਤੇ ਇੱਕ ਹੋਰ। ਲੰਬੇ ਦਸਤਾਵੇਜ਼ਾਂ ਵਿੱਚ ਭਾਗ ਵੱਖ ਕਰਨ ਲਈ ਲਾਭਦਾਇਕ।

---

## ਲਿੰਕ ਅਤੇ ਹਵਾਲੇ

ਇੱਕ ਸਾਧਾਰਨ [ਲਿੰਕ](https://example.com), ਇੱਕ ਆਟੋ-ਲਿੰਕ <https://example.com>, ਅਤੇ ਇੱਕ [ਟਾਈਟਲ ਵਿਸ਼ੇਸ਼ਤਾ](https://example.com "ਹੋਵਰ ਕਰੋ") ਵਾਲਾ ਲਿੰਕ।

ਇਹ ਸੀ ਟੂਰ — ਜੇ ਉੱਪਰ ਸਭ ਕੁਝ ਸੁੰਦਰ ਦਿਖਾਈ ਦੇ ਰਿਹਾ ਹੈ, ਤਾਂ ਤੁਸੀਂ ਪੂਰਾ ਫੀਚਰ ਸੈੱਟ ਦੇਖ ਰਹੇ ਹੋ: ਟਾਈਪੋਗ੍ਰਾਫੀ, ਸੂਚੀਆਂ, ਕੋਡ ਹਾਈਲਾਈਟਿੰਗ, ਟੇਬਲ, ਉਦਾਹਰਣਾਂ ਅਤੇ ਥੀਮ-ਅਨੁਸਾਰੀ ਰੰਗ।
