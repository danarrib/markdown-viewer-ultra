# Markdown Viewer Ultra — Funktionsübersicht

Wenn Sie dies mit Überschriften, Code-Farben, Tabellen und Aufgabenlisten statt als Rohtext lesen können, funktioniert die Erweiterung.

---

## Textformatierung

Dieser Absatz mischt **fett**, _kursiv_, ***fett kursiv***, ~~durchgestrichen~~, `Inline-Code` und einen [Link zum Projekt](https://github.com/danarrib/markdown-viewer-ultra).

Sie können auch H<sub>2</sub>O und E = mc<sup>2</sup> mit Inline-HTML schreiben, sogar <kbd>Strg</kbd> + <kbd>C</kbd> für Tastaturhinweise.

---

## Überschriften

# H1 — Dokumenttitel
## H2 — Abschnitt
### H3 — Unterabschnitt
#### H4 — Gruppe
##### H5 — Detail
###### H6 — Fußnote

---

## Listen

### Unsortiert (mit Verschachtelung)

- Erstes Element
- Zweites Element
  - Verschachtelt A
  - Verschachtelt B
    - Tief verschachtelt
- Drittes Element

### Sortiert

1. Toaster einschalten
2. Brot einlegen
3. Auf den Klick warten
4. Butter auftragen

### Aufgabenliste

- [x] Inhaltstyp erkennen
- [x] Markdown rendern
- [x] HTML bereinigen
- [x] Oberfläche lokalisieren
- [x] Syntax-Hervorhebung hinzufügen
- [ ] Einstellungsseite hinzufügen

---

## Codeblöcke

### JavaScript

```js
// Fibonacci mit Memoisierung
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

# Findet jede .md-Datei größer als 1 KB und zählt ihre Zeilen
find . -name '*.md' -size +1k -print0 \
  | while IFS= read -r -d '' file; do
      lines=$(wc -l < "$file")
      printf '%6d  %s\n' "$lines" "$file"
    done \
  | sort -rn \
  | head -10
```

### Block ohne Sprache

```
Einfacher Block — keine Syntax-Hervorhebung.
Nützlich für Verzeichnisbäume, Diagramme oder Kopier-Beispiele.
```

---

## Tabellen

| Funktion                | Status | Anmerkungen                           |
| ----------------------- | :----: | ------------------------------------- |
| MIME-Erkennung          |   ✅   | `text/markdown` und `text/x-markdown` |
| `.md`-Fallback          |   ✅   | wenn der Server `text/plain` sendet   |
| Bereinigung             |   ✅   | DOMPurify                             |
| Dunkelmodus             |   ✅   | auto / hell / dunkel                  |
| Lokalisierung           |   ✅   | 17 Sprachen                           |
| Syntax-Hervorhebung     |   ✅   | highlight.js (Common-Build)           |

Rechtsbündige Zahlen funktionieren auch:

| Artikel    |  Preis |
| ---------- | -----: |
| Kaffee     |   4,50 |
| Croissant  |   3,25 |
| Zwischensumme | 7,75 |

---

## Zitate

> „Programme müssen für Menschen geschrieben werden, die sie lesen, und nur nebenbei für Maschinen, die sie ausführen."
>
> — Harold Abelson, _Structure and Interpretation of Computer Programs_

Verschachtelt:

> Äußerer Gedanke.
>
> > Innere Antwort, mit **Betonung** und `Code`.
> >
> > > Und eine dritte Ebene, für die wirklich Rekursiven.

---

## Bilder

Inline-Platzhalter:

![placeholder](https://placehold.co/600x120/png?text=Markdown+Viewer+Ultra)

---

## Horizontale Linien

Unter dieser Zeile befindet sich eine horizontale Linie.

---

…und noch eine. Nützlich, um Abschnitte in langen Dokumenten zu trennen.

---

## Links und Referenzen

Ein einfacher [Link](https://example.com), ein Auto-Link <https://example.com> und ein Link mit [Titel-Attribut](https://example.com "Mit der Maus überfahren").

Das war die Tour — wenn alles oben gepflegt aussieht, sehen Sie das volle Funktionsspektrum: Typografie, Listen, Code-Hervorhebung, Tabellen, Zitate und themenabhängige Farben.
