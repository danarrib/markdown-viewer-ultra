# Markdown Viewer Ultra — 功能展示

如果您能看到帶有標題、程式碼顏色、表格和任務清單的渲染效果，而不是原始文字，表示擴充功能正常運作。

---

## 文字格式

本段落混合了**粗體**、_斜體_、***粗斜體***、~~刪除線~~、`內嵌程式碼`，以及一個[專案連結](https://github.com/danarrib/markdown-viewer-ultra)。

也可以用內嵌 HTML 寫 H<sub>2</sub>O 和 E = mc<sup>2</sup>，甚至用 <kbd>Ctrl</kbd> + <kbd>C</kbd> 來表示鍵盤提示。

---

## 標題

# H1 — 文件標題
## H2 — 章節
### H3 — 子章節
#### H4 — 群組
##### H5 — 詳細
###### H6 — 註腳級

---

## 清單

### 無序（巢狀）

- 第一項
- 第二項
  - 巢狀 A
  - 巢狀 B
    - 深層巢狀
- 第三項

### 有序

1. 啟動烤麵包機
2. 放入麵包
3. 等待「喀嚓」聲
4. 塗抹奶油

### 任務清單

- [x] 偵測內容類型
- [x] 渲染 markdown
- [x] 淨化 HTML
- [x] 本地化介面
- [x] 加入語法上色
- [ ] 加入設定頁面

---

## 程式碼區塊

### JavaScript

```js
// 帶記憶化的費氏數列
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

# 找出所有大於 1 KB 的 .md 檔案並計算行數
find . -name '*.md' -size +1k -print0 \
  | while IFS= read -r -d '' file; do
      lines=$(wc -l < "$file")
      printf '%6d  %s\n' "$lines" "$file"
    done \
  | sort -rn \
  | head -10
```

### 未指定語言的區塊

```
普通區塊 — 不套用語法上色。
適用於目錄樹、示意圖或可貼上的範例。
```

---

## 表格

| 功能          | 狀態  | 備註                                  |
| ------------- | :---: | ------------------------------------- |
| MIME 偵測     |  ✅   | `text/markdown` 和 `text/x-markdown`  |
| `.md` 回退    |  ✅   | 當伺服器回傳 `text/plain` 時          |
| 淨化          |  ✅   | DOMPurify                             |
| 暗色模式      |  ✅   | 自動 / 亮色 / 暗色                    |
| 本地化        |  ✅   | 17 種語言                             |
| 語法上色      |  ✅   | highlight.js Common 建置版            |

向右對齊的數字也可以使用：

| 項目     | 價格 |
| -------- | ---: |
| 咖啡     | 4.50 |
| 牛角麵包 | 3.25 |
| 小計     | 7.75 |

---

## 引言

> 「程式應該是為了讓人類閱讀而寫的，機器執行只是順帶的。」
>
> — Harold Abelson, _Structure and Interpretation of Computer Programs_

巢狀：

> 外層想法。
>
> > 內層回覆，包含**強調**和`程式碼`。
> >
> > > 還有第三層，獻給真正遞迴的人。

---

## 圖片

內嵌的預留位置：

![placeholder](https://placehold.co/600x120/png?text=Markdown+Viewer+Ultra)

---

## 水平線

此行下方有一條水平線。

---

…再來一條。在長文件中分隔段落很有用。

---

## 連結與參考

一個普通的[連結](https://example.com)、一個自動連結 <https://example.com>，以及一個帶[標題屬性的連結](https://example.com "懸停查看")。

導覽結束 — 如果上面一切都顯示得很精緻，您正在體驗完整的功能集：排版、清單、程式碼上色、表格、引言，以及隨主題變化的色彩。
