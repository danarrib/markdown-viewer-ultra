# Markdown Viewer Ultra — Démonstration des fonctionnalités

Si vous pouvez lire ceci avec des titres, des couleurs de code, des tableaux et des listes de tâches au lieu de texte brut, l'extension fonctionne.

---

## Mise en forme du texte

Ce paragraphe combine **gras**, _italique_, ***gras italique***, ~~barré~~, `code en ligne` et un [lien vers le projet](https://github.com/danarrib/markdown-viewer-ultra).

Vous pouvez aussi écrire H<sub>2</sub>O et E = mc<sup>2</sup> avec du HTML en ligne, et même <kbd>Ctrl</kbd> + <kbd>C</kbd> pour les raccourcis clavier.

---

## Titres

# H1 — Titre du document
## H2 — Section
### H3 — Sous-section
#### H4 — Groupe
##### H5 — Détail
###### H6 — Note de bas

---

## Listes

### Non ordonnée (avec imbrication)

- Premier élément
- Deuxième élément
  - Imbriqué A
  - Imbriqué B
    - Profondément imbriqué
- Troisième élément

### Ordonnée

1. Allumez le grille-pain
2. Insérez le pain
3. Attendez le clic
4. Étalez le beurre

### Liste de tâches

- [x] Détecter le type de contenu
- [x] Rendre le markdown
- [x] Désinfecter le HTML
- [x] Localiser l'interface
- [x] Ajouter la coloration syntaxique
- [ ] Ajouter une page de réglages

---

## Blocs de code

### JavaScript

```js
// Fibonacci avec mémoïsation
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

# Trouve chaque fichier .md de plus de 1 Ko et compte ses lignes
find . -name '*.md' -size +1k -print0 \
  | while IFS= read -r -d '' file; do
      lines=$(wc -l < "$file")
      printf '%6d  %s\n' "$lines" "$file"
    done \
  | sort -rn \
  | head -10
```

### Bloc sans langage

```
Bloc simple — pas de coloration syntaxique.
Utile pour les arborescences, diagrammes ou exemples à copier.
```

---

## Tableaux

| Fonctionnalité           | Statut | Notes                                 |
| ------------------------ | :----: | ------------------------------------- |
| Détection du type MIME   |   ✅   | `text/markdown` et `text/x-markdown`  |
| Repli `.md`              |   ✅   | quand le serveur envoie `text/plain`  |
| Désinfection             |   ✅   | DOMPurify                             |
| Mode sombre              |   ✅   | auto / clair / sombre                 |
| Localisation             |   ✅   | 17 langues                            |
| Coloration syntaxique    |   ✅   | highlight.js (build Common)           |

Les nombres alignés à droite fonctionnent aussi :

| Article    |  Prix |
| ---------- | ----: |
| Café       |  4,50 |
| Croissant  |  3,25 |
| Sous-total |  7,75 |

---

## Citations en bloc

> « Les programmes doivent être écrits pour être lus par des humains, et seulement incidemment pour être exécutés par des machines. »
>
> — Harold Abelson, _Structure and Interpretation of Computer Programs_

Imbriquée :

> Pensée extérieure.
>
> > Réponse intérieure, avec **emphase** et `code`.
> >
> > > Et un troisième niveau, pour les vraiment récursifs.

---

## Images

Image en ligne :

![placeholder](https://placehold.co/600x120/png?text=Markdown+Viewer+Ultra)

---

## Règles horizontales

Sous cette ligne se trouve une règle horizontale.

---

…et une autre. Utile pour séparer les sections dans les longs documents.

---

## Liens et références

Un [lien](https://example.com) simple, un auto-lien <https://example.com>, et un lien avec [attribut titre](https://example.com "Survolez-moi").

C'est la visite — si tout ci-dessus semble soigné, vous voyez l'ensemble complet : typographie, listes, coloration de code, tableaux, citations et couleurs adaptées au thème.
