# Markdown Viewer Ultra — Özellik Vitrini

Bunu ham metin yerine başlıklar, kod renkleri, tablolar ve görev listeleriyle render edilmiş görüyorsanız uzantı çalışıyor demektir.

---

## Metin biçimlendirme

Bu paragrafta **kalın**, _italik_, ***kalın italik***, ~~üstü çizili~~, `satır içi kod` ve [projeye bağlantı](https://github.com/danarrib/markdown-viewer-ultra) bir arada bulunur.

Satır içi HTML ile H<sub>2</sub>O ve E = mc<sup>2</sup> yazabilir, hatta klavye ipuçları için <kbd>Ctrl</kbd> + <kbd>C</kbd> kullanabilirsiniz.

---

## Başlıklar

# H1 — Belge başlığı
## H2 — Bölüm
### H3 — Alt bölüm
#### H4 — Grup
##### H5 — Ayrıntı
###### H6 — Dipnot düzeyi

---

## Listeler

### Sırasız (iç içe)

- Birinci öge
- İkinci öge
  - İç içe A
  - İç içe B
    - Derinden iç içe
- Üçüncü öge

### Sıralı

1. Tost makinesini açın
2. Ekmeği yerleştirin
3. Klik sesini bekleyin
4. Tereyağı sürün

### Görev listesi

- [x] İçerik türünü algıla
- [x] markdown'u render et
- [x] HTML'i temizle
- [x] Arayüzü yerelleştir
- [x] Sözdizimi vurgusu ekle
- [ ] Ayarlar sayfası ekle

---

## Kod blokları

### JavaScript

```js
// Memoization'lı Fibonacci
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

# 1 KB'den büyük her .md dosyasını bul ve satırlarını say
find . -name '*.md' -size +1k -print0 \
  | while IFS= read -r -d '' file; do
      lines=$(wc -l < "$file")
      printf '%6d  %s\n' "$lines" "$file"
    done \
  | sort -rn \
  | head -10
```

### Dil belirtmeden blok

```
Düz blok — sözdizimi vurgusu uygulanmaz.
Dizin ağaçları, diyagramlar veya kopyala-yapıştır örnekleri için yararlı.
```

---

## Tablolar

| Özellik              | Durum | Notlar                                |
| -------------------- | :---: | ------------------------------------- |
| MIME algılama        |  ✅   | `text/markdown` ve `text/x-markdown`  |
| `.md` yedek          |  ✅   | sunucu `text/plain` gönderdiğinde     |
| Temizleme            |  ✅   | DOMPurify                             |
| Koyu mod             |  ✅   | otomatik / açık / koyu                |
| Yerelleştirme        |  ✅   | 17 dil                                |
| Sözdizimi vurgusu    |  ✅   | highlight.js Common build             |

Sağa hizalı sayılar da çalışır:

| Öge        |  Fiyat |
| ---------- | -----: |
| Kahve      |   4,50 |
| Kruvasan   |   3,25 |
| Ara toplam |   7,75 |

---

## Alıntılar

> "Programlar insanların okuması için yazılmalı, makinelerin çalıştırması yalnızca yan etkidir."
>
> — Harold Abelson, _Structure and Interpretation of Computer Programs_

İç içe:

> Dış düşünce.
>
> > İç yanıt, **vurgu** ve `kod` ile.
> >
> > > Ve gerçekten özyinelemeli olanlar için üçüncü bir seviye.

---

## Görseller

Satır içi yer tutucu:

![placeholder](https://placehold.co/600x120/png?text=Markdown+Viewer+Ultra)

---

## Yatay çizgiler

Bu satırın altında yatay bir çizgi var.

---

…ve bir tane daha. Uzun belgelerde bölümleri ayırmak için yararlı.

---

## Bağlantılar ve referanslar

Sade bir [bağlantı](https://example.com), otomatik bağlantı <https://example.com> ve [başlık özniteliği](https://example.com "Üzerine gel") olan bir bağlantı.

İşte tur — yukarıdakilerin hepsi düzgün görünüyorsa tüm özellik setini görüyorsunuz: tipografi, listeler, kod vurgusu, tablolar, alıntılar ve temaya uyan renkler.
