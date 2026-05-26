# Markdown Viewer Ultra — 機能紹介

見出し、コードの色、テーブル、タスクリストがレンダリングされ、生のテキストではなく整形された状態でこれを読めているなら、拡張機能は正常に動作しています。

---

## テキストの書式設定

この段落には、**太字**、_イタリック_、***太字イタリック***、~~取り消し線~~、`インラインコード`、そして[プロジェクトへのリンク](https://github.com/danarrib/markdown-viewer-ultra)が含まれています。

H<sub>2</sub>O や E = mc<sup>2</sup> のようにインライン HTML も使えますし、<kbd>Ctrl</kbd> + <kbd>C</kbd> のようなキーボードヒントも表示できます。

---

## 見出し

# H1 — ドキュメントタイトル
## H2 — セクション
### H3 — サブセクション
#### H4 — グループ
##### H5 — 詳細
###### H6 — 脚注レベル

---

## リスト

### 順序なし(ネスト付き)

- 最初のアイテム
- 2 番目のアイテム
  - ネスト A
  - ネスト B
    - 深くネスト
- 3 番目のアイテム

### 順序付き

1. トースターをオンにする
2. パンを入れる
3. カチッと鳴るまで待つ
4. バターを塗る

### タスクリスト

- [x] コンテンツタイプを検出する
- [x] markdown をレンダリングする
- [x] HTML をサニタイズする
- [x] UI をローカライズする
- [x] シンタックスハイライトを追加する
- [ ] 設定ページを追加する

---

## コードブロック

### JavaScript

```js
// メモ化付きフィボナッチ
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

# 1 KB より大きい .md ファイルをすべて見つけて行数を数える
find . -name '*.md' -size +1k -print0 \
  | while IFS= read -r -d '' file; do
      lines=$(wc -l < "$file")
      printf '%6d  %s\n' "$lines" "$file"
    done \
  | sort -rn \
  | head -10
```

### 言語指定なしのブロック

```
プレーンなブロック — シンタックスハイライトなし。
ディレクトリツリー、図、コピー用サンプルなどに便利。
```

---

## テーブル

| 機能                  | 状態  | 備考                                  |
| --------------------- | :---: | ------------------------------------- |
| MIME 検出             |  ✅   | `text/markdown` と `text/x-markdown`  |
| `.md` フォールバック  |  ✅   | サーバーが `text/plain` を返す場合    |
| サニタイズ            |  ✅   | DOMPurify                             |
| ダークモード          |  ✅   | 自動 / ライト / ダーク                |
| ローカライズ          |  ✅   | 17 言語                               |
| シンタックスハイライト |  ✅   | highlight.js Common ビルド            |

右寄せの数値も使えます:

| 項目        |   価格 |
| ----------- | -----: |
| コーヒー    |   4.50 |
| クロワッサン |  3.25 |
| 小計        |   7.75 |

---

## 引用ブロック

> 「プログラムは、人が読むために書かれるべきであり、機械が実行するためというのは付随的なものに過ぎない。」
>
> — Harold Abelson, _Structure and Interpretation of Computer Programs_

ネスト:

> 外側の考え。
>
> > 内側の返答、**強調**と`コード`を含む。
> >
> > > そして 3 段目、本当に再帰的な人のために。

---

## 画像

インラインのプレースホルダー:

![placeholder](https://placehold.co/600x120/png?text=Markdown+Viewer+Ultra)

---

## 水平線

この行の下に水平線があります。

---

…そしてもう 1 本。長いドキュメントでセクションを区切るのに便利です。

---

## リンクと参照

普通の[リンク](https://example.com)、自動リンク <https://example.com>、そして[タイトル属性付きのリンク](https://example.com "ホバーしてみて")。

これでツアーは終わり — 上のすべてがきれいに見えていれば、フル機能セットが見えています: タイポグラフィ、リスト、コードハイライト、テーブル、引用、テーマに応じた色。
