# Markdown Viewer Ultra — Demonstração de Recursos

Se você consegue ler isso renderizado com títulos, cores de código, tabelas e listas de tarefas em vez de texto bruto, a extensão está funcionando.

---

## Formatação de texto

Este parágrafo combina **negrito**, _itálico_, ***negrito itálico***, ~~tachado~~, `código inline` e um [link para o projeto](https://github.com/danarrib/markdown-viewer-ultra).

Você também pode escrever H<sub>2</sub>O e E = mc<sup>2</sup> com HTML inline, e ainda <kbd>Ctrl</kbd> + <kbd>C</kbd> para dicas de teclado.

---

## Títulos

# H1 — Título do documento
## H2 — Seção
### H3 — Subseção
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
3. Espere o clique
4. Passe manteiga

### Lista de tarefas

- [x] Detectar tipo de conteúdo
- [x] Renderizar markdown
- [x] Sanitizar HTML
- [x] Localizar a interface
- [x] Adicionar realce de sintaxe
- [ ] Adicionar página de configurações

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

# Encontra todos os arquivos .md maiores que 1 KB e conta suas linhas
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
Útil para árvores de diretórios, diagramas ou exemplos copiáveis.
```

---

## Tabelas

| Recurso             | Status | Notas                                 |
| ------------------- | :----: | ------------------------------------- |
| Detecção de MIME    |   ✅   | `text/markdown` e `text/x-markdown`   |
| Fallback `.md`      |   ✅   | quando o servidor envia `text/plain`  |
| Sanitização         |   ✅   | DOMPurify                             |
| Modo escuro         |   ✅   | auto / claro / escuro                 |
| Localização         |   ✅   | 17 idiomas                            |
| Realce de sintaxe   |   ✅   | highlight.js (build Common)           |

Números alinhados à direita também funcionam:

| Item       | Preço |
| ---------- | ----: |
| Café       |  4,50 |
| Croissant  |  3,25 |
| Subtotal   |  7,75 |

---

## Citações em bloco

> "Programas devem ser escritos para pessoas lerem, e apenas incidentalmente para máquinas executarem."
>
> — Harold Abelson, _Structure and Interpretation of Computer Programs_

Aninhada:

> Pensamento externo.
>
> > Resposta interna, com **ênfase** e `código`.
> >
> > > E um terceiro nível, para os verdadeiramente recursivos.

---

## Imagens

Espaço reservado inline:

![placeholder](https://placehold.co/600x120/png?text=Markdown+Viewer+Ultra)

---

## Linhas horizontais

Abaixo desta linha há uma régua horizontal.

---

…e mais uma. Útil para separar seções em documentos longos.

---

## Links e referências

Um [link](https://example.com) simples, um auto-link <https://example.com>, e um link com [atributo de título](https://example.com "Passe o mouse aqui").

Esse é o tour — se tudo acima parece elegante, você está vendo o conjunto completo de recursos: tipografia, listas, realce de código, tabelas, citações e cores que seguem o tema.
