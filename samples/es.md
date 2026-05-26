# Markdown Viewer Ultra — Demostración de funciones

Si puedes leer esto renderizado con encabezados, colores de código, tablas y listas de tareas en lugar de texto plano, la extensión está funcionando.

---

## Formato de texto

Este párrafo combina **negrita**, _cursiva_, ***negrita cursiva***, ~~tachado~~, `código en línea` y un [enlace al proyecto](https://github.com/danarrib/markdown-viewer-ultra).

También puedes escribir H<sub>2</sub>O y E = mc<sup>2</sup> con HTML en línea, e incluso <kbd>Ctrl</kbd> + <kbd>C</kbd> para sugerencias de teclado.

---

## Encabezados

# H1 — Título del documento
## H2 — Sección
### H3 — Subsección
#### H4 — Grupo
##### H5 — Detalle
###### H6 — Nota al pie

---

## Listas

### Sin orden (con anidamiento)

- Primer elemento
- Segundo elemento
  - Anidado A
  - Anidado B
    - Profundamente anidado
- Tercer elemento

### Ordenada

1. Enciende la tostadora
2. Inserta el pan
3. Espera el clic
4. Aplica mantequilla

### Lista de tareas

- [x] Detectar tipo de contenido
- [x] Renderizar markdown
- [x] Sanear HTML
- [x] Localizar la interfaz
- [x] Añadir resaltado de sintaxis
- [ ] Añadir página de ajustes

---

## Bloques de código

### JavaScript

```js
// Fibonacci con memoización
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

# Encuentra todos los archivos .md mayores de 1 KB y cuenta sus líneas
find . -name '*.md' -size +1k -print0 \
  | while IFS= read -r -d '' file; do
      lines=$(wc -l < "$file")
      printf '%6d  %s\n' "$lines" "$file"
    done \
  | sort -rn \
  | head -10
```

### Bloque sin lenguaje

```
Bloque simple — sin resaltado de sintaxis.
Útil para árboles de directorios, diagramas o muestras para copiar.
```

---

## Tablas

| Característica         | Estado | Notas                                 |
| ---------------------- | :----: | ------------------------------------- |
| Detección de MIME      |   ✅   | `text/markdown` y `text/x-markdown`   |
| Respaldo `.md`         |   ✅   | cuando el servidor envía `text/plain` |
| Saneamiento            |   ✅   | DOMPurify                             |
| Modo oscuro            |   ✅   | auto / claro / oscuro                 |
| Localización           |   ✅   | 17 idiomas                            |
| Resaltado de sintaxis  |   ✅   | highlight.js (build Common)           |

Los números alineados a la derecha también funcionan:

| Artículo   | Precio |
| ---------- | -----: |
| Café       |   4,50 |
| Croissant  |   3,25 |
| Subtotal   |   7,75 |

---

## Citas en bloque

> "Los programas deben escribirse para que las personas los lean, y solo incidentalmente para que las máquinas los ejecuten."
>
> — Harold Abelson, _Structure and Interpretation of Computer Programs_

Anidada:

> Pensamiento externo.
>
> > Respuesta interna, con **énfasis** y `código`.
> >
> > > Y un tercer nivel, para los verdaderamente recursivos.

---

## Imágenes

Marcador en línea:

![placeholder](https://placehold.co/600x120/png?text=Markdown+Viewer+Ultra)

---

## Reglas horizontales

Debajo de esta línea hay una regla horizontal.

---

…y otra más. Útil para separar secciones en documentos largos.

---

## Enlaces y referencias

Un [enlace](https://example.com) simple, un auto-enlace <https://example.com> y un enlace con [atributo de título](https://example.com "Pasa el cursor").

Ese fue el recorrido — si todo lo de arriba se ve cuidado, estás viendo el conjunto completo de funciones: tipografía, listas, resaltado de código, tablas, citas y colores que siguen el tema.
