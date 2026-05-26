# Markdown Viewer Ultra — 功能展示

如果你能看到带有标题、代码颜色、表格和任务列表的渲染效果，而不是原始文本，说明扩展正常工作。

---

## 文本格式

本段落混合了**粗体**、_斜体_、***粗斜体***、~~删除线~~、`内联代码`，以及一个[项目链接](https://github.com/danarrib/markdown-viewer-ultra)。

也可以用内联 HTML 写 H<sub>2</sub>O 和 E = mc<sup>2</sup>，甚至用 <kbd>Ctrl</kbd> + <kbd>C</kbd> 来表示键盘提示。

---

## 标题

# H1 — 文档标题
## H2 — 章节
### H3 — 子章节
#### H4 — 分组
##### H5 — 详细
###### H6 — 脚注级

---

## 列表

### 无序（带嵌套）

- 第一项
- 第二项
  - 嵌套 A
  - 嵌套 B
    - 深层嵌套
- 第三项

### 有序

1. 启动烤面包机
2. 放入面包
3. 等待"咔嚓"声
4. 涂抹黄油

### 任务列表

- [x] 检测内容类型
- [x] 渲染 markdown
- [x] 净化 HTML
- [x] 本地化界面
- [x] 添加语法高亮
- [ ] 添加设置页面

---

## 代码块

### JavaScript

```js
// 带记忆化的斐波那契
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

# 查找所有大于 1 KB 的 .md 文件并统计行数
find . -name '*.md' -size +1k -print0 \
  | while IFS= read -r -d '' file; do
      lines=$(wc -l < "$file")
      printf '%6d  %s\n' "$lines" "$file"
    done \
  | sort -rn \
  | head -10
```

### 未指定语言的内联代码

```
普通代码块 — 不应用语法高亮。
适用于目录树、示意图或粘贴示例。
```

---

## 表格

| 功能         | 状态  | 备注                                  |
| ------------ | :---: | ------------------------------------- |
| MIME 检测    |  ✅   | `text/markdown` 和 `text/x-markdown`  |
| `.md` 回退   |  ✅   | 当服务器返回 `text/plain` 时          |
| 净化         |  ✅   | DOMPurify                             |
| 暗色模式     |  ✅   | 自动 / 亮色 / 暗色                    |
| 本地化       |  ✅   | 17 种语言                             |
| 语法高亮     |  ✅   | highlight.js Common 构建              |

右对齐的数字也可以使用：

| 项目     | 价格 |
| -------- | ---: |
| 咖啡     | 4.50 |
| 牛角包   | 3.25 |
| 小计     | 7.75 |

---

## 引用

> "程序应该为人阅读而写，机器执行只是顺带的。"
>
> — Harold Abelson, _Structure and Interpretation of Computer Programs_

嵌套：

> 外层想法。
>
> > 内层回复，含**强调**和`代码`。
> >
> > > 还有第三层，献给真正递归的人。

---

## 图片

内联占位符：

![placeholder](https://placehold.co/600x120/png?text=Markdown+Viewer+Ultra)

---

## 水平线

下方是一条水平线。

---

…再来一条。在长文档中分隔段落很有用。

---

## 链接和引用

一个普通的[链接](https://example.com)，一个自动链接 <https://example.com>，以及一个带[标题属性的链接](https://example.com "悬停查看")。

游览结束 — 如果上面一切都显示得很精致，那么你正在体验完整的功能集：排版、列表、代码高亮、表格、引用，以及随主题变化的颜色。
