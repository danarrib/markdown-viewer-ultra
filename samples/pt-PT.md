# Markdown Viewer Ultra — Demonstração de Funcionalidades

Se consegue ler isto apresentado com cabeçalhos, cores de código, tabelas e listas de tarefas em vez de texto bruto, a extensão está a funcionar.

---

## Formatação de texto

Este parágrafo combina **negrito**, _itálico_, ***negrito itálico***, ~~rasurado~~, `código em linha` e uma [ligação para o projeto](https://github.com/danarrib/markdown-viewer-ultra).

Também pode escrever H<sub>2</sub>O e E = mc<sup>2</sup> com HTML em linha, e até <kbd>Ctrl</kbd> + <kbd>C</kbd> para sugestões de teclado.

---

## Cabeçalhos

# H1 — Título do documento
## H2 — Secção
### H3 — Subsecção
#### H4 — Grupo
##### H5 — Detalhe
###### H6 — Nota de rodapé

---

## Listas

### Não ordenada (com aninhamento)

- Primeiro item
- Segundo item
  - Aninhado A
  - Aninhado B
    - Profundamente aninhado
- Terceiro item

### Ordenada

1. Ligue a torradeira
2. Coloque o pão
3. Espere pelo clique
4. Barre com manteiga

### Lista de tarefas

- [x] Detetar tipo de conteúdo
- [x] Apresentar markdown
- [x] Sanitizar HTML
- [x] Localizar a interface
- [x] Adicionar realce de sintaxe
- [ ] Adicionar página de definições

---

## Blocos de código

### JavaScript

```js
// Fibonacci com memoização
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

# Encontra todos os ficheiros .md maiores que 1 KB e conta as linhas
find . -name '*.md' -size +1k -print0 \
  | while IFS= read -r -d '' file; do
      lines=$(wc -l < "$file")
      printf '%6d  %s\n' "$lines" "$file"
    done \
  | sort -rn \
  | head -10
```

### Bloco sem linguagem

```
Bloco simples — sem realce de sintaxe.
Útil para árvores de diretórios, diagramas ou exemplos para copiar.
```

---

## Tabelas

| Funcionalidade       | Estado | Notas                                 |
| -------------------- | :----: | ------------------------------------- |
| Deteção de MIME      |   ✅   | `text/markdown` e `text/x-markdown`   |
| Fallback `.md`       |   ✅   | quando o servidor envia `text/plain`  |
| Sanitização          |   ✅   | DOMPurify                             |
| Modo escuro          |   ✅   | auto / claro / escuro                 |
| Localização          |   ✅   | 17 idiomas                            |
| Realce de sintaxe    |   ✅   | highlight.js (build Common)           |

Números alinhados à direita também funcionam:

| Item       | Preço |
| ---------- | ----: |
| Café       |  4,50 |
| Croissant  |  3,25 |
| Subtotal   |  7,75 |

---

## Citações em bloco

> "Programas devem ser escritos para as pessoas lerem, e apenas incidentalmente para as máquinas executarem."
>
> — Harold Abelson, _Structure and Interpretation of Computer Programs_

Aninhada:

> Pensamento exterior.
>
> > Resposta interior, com **ênfase** e `código`.
> >
> > > E um terceiro nível, para os verdadeiramente recursivos.

---

## Imagens

Espaço reservado em linha:

![placeholder](https://placehold.co/600x120/png?text=Markdown+Viewer+Ultra)

---

## Linhas horizontais

Abaixo desta linha está uma régua horizontal.

---

…e mais outra. Útil para separar secções em documentos longos.

---

## Ligações e referências

Uma [ligação](https://example.com) simples, uma auto-ligação <https://example.com>, e uma ligação com [atributo de título](https://example.com "Passe aqui").

Esta foi a visita guiada — se tudo o que vê acima parece bem apresentado, está a ver o conjunto completo de funcionalidades: tipografia, listas, realce de código, tabelas, citações e cores que seguem o tema.
