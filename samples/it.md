# Markdown Viewer Ultra — Vetrina delle funzionalità

Se riesci a leggere questo con intestazioni, colori del codice, tabelle e liste di task invece che come testo grezzo, l'estensione sta funzionando.

---

## Formattazione del testo

Questo paragrafo combina **grassetto**, _corsivo_, ***grassetto corsivo***, ~~barrato~~, `codice inline` e un [link al progetto](https://github.com/danarrib/markdown-viewer-ultra).

Puoi anche scrivere H<sub>2</sub>O e E = mc<sup>2</sup> con HTML inline, e perfino <kbd>Ctrl</kbd> + <kbd>C</kbd> per suggerimenti da tastiera.

---

## Intestazioni

# H1 — Titolo del documento
## H2 — Sezione
### H3 — Sottosezione
#### H4 — Gruppo
##### H5 — Dettaglio
###### H6 — Nota a piè di pagina

---

## Liste

### Non ordinata (con annidamento)

- Primo elemento
- Secondo elemento
  - Annidato A
  - Annidato B
    - Profondamente annidato
- Terzo elemento

### Ordinata

1. Accendi il tostapane
2. Inserisci il pane
3. Aspetta il clic
4. Spalma il burro

### Lista di task

- [x] Rilevare il tipo di contenuto
- [x] Renderizzare il markdown
- [x] Sanitizzare l'HTML
- [x] Localizzare l'interfaccia
- [x] Aggiungere l'evidenziazione della sintassi
- [ ] Aggiungere una pagina di impostazioni

---

## Blocchi di codice

### JavaScript

```js
// Fibonacci con memoizzazione
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

# Trova ogni file .md più grande di 1 KB e conta le sue righe
find . -name '*.md' -size +1k -print0 \
  | while IFS= read -r -d '' file; do
      lines=$(wc -l < "$file")
      printf '%6d  %s\n' "$lines" "$file"
    done \
  | sort -rn \
  | head -10
```

### Blocco senza linguaggio

```
Blocco semplice — nessuna evidenziazione della sintassi.
Utile per alberi di directory, diagrammi o esempi da copiare.
```

---

## Tabelle

| Funzionalità            | Stato | Note                                  |
| ----------------------- | :---: | ------------------------------------- |
| Rilevamento MIME        |   ✅  | `text/markdown` e `text/x-markdown`   |
| Fallback `.md`          |   ✅  | quando il server invia `text/plain`   |
| Sanitizzazione          |   ✅  | DOMPurify                             |
| Modalità scura          |   ✅  | auto / chiaro / scuro                 |
| Localizzazione          |   ✅  | 17 lingue                             |
| Evidenziazione sintassi |   ✅  | highlight.js (build Common)           |

Anche i numeri allineati a destra funzionano:

| Articolo   | Prezzo |
| ---------- | -----: |
| Caffè      |   4,50 |
| Cornetto   |   3,25 |
| Subtotale  |   7,75 |

---

## Citazioni

> "I programmi devono essere scritti perché le persone li leggano, e solo incidentalmente perché le macchine li eseguano."
>
> — Harold Abelson, _Structure and Interpretation of Computer Programs_

Annidata:

> Pensiero esterno.
>
> > Risposta interna, con **enfasi** e `codice`.
> >
> > > E un terzo livello, per i veramente ricorsivi.

---

## Immagini

Segnaposto inline:

![placeholder](https://placehold.co/600x120/png?text=Markdown+Viewer+Ultra)

---

## Righe orizzontali

Sotto questa riga c'è un righello orizzontale.

---

…e un altro ancora. Utile per separare sezioni in documenti lunghi.

---

## Link e riferimenti

Un [link](https://example.com) semplice, un auto-link <https://example.com>, e un link con [attributo titolo](https://example.com "Passa qui").

Ecco il tour — se tutto quanto sopra appare ben curato, stai vedendo l'intero set di funzionalità: tipografia, liste, evidenziazione del codice, tabelle, citazioni e colori che seguono il tema.
