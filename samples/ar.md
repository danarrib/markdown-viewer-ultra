# Markdown Viewer Ultra — عرض الميزات

إذا كنت تستطيع قراءة هذا مع العناوين وألوان الكود والجداول وقوائم المهام بدلاً من النص الخام، فإن الإضافة تعمل.

---

## تنسيق النص

تجمع هذه الفقرة بين **عريض** و_مائل_ و***عريض مائل*** و~~مشطوب~~ و`كود مضمّن` و[رابط للمشروع](https://github.com/danarrib/markdown-viewer-ultra).

يمكنك أيضًا كتابة H<sub>2</sub>O وE = mc<sup>2</sup> باستخدام HTML مضمّن، وحتى <kbd>Ctrl</kbd> + <kbd>C</kbd> لتلميحات لوحة المفاتيح.

---

## العناوين

# H1 — عنوان المستند
## H2 — قسم
### H3 — قسم فرعي
#### H4 — مجموعة
##### H5 — تفصيل
###### H6 — مستوى الحاشية

---

## القوائم

### غير مرتبة (مع تداخل)

- العنصر الأول
- العنصر الثاني
  - متداخل A
  - متداخل B
    - متداخل عميق
- العنصر الثالث

### مرتبة

1. شغّل المحمصة
2. أدخل الخبز
3. انتظر صوت الطقطقة
4. ضع الزبدة

### قائمة المهام

- [x] الكشف عن نوع المحتوى
- [x] عرض markdown
- [x] تنظيف HTML
- [x] توطين الواجهة
- [x] إضافة تمييز بناء الجملة
- [ ] إضافة صفحة إعدادات

---

## كتل الكود

### JavaScript

```js
// فيبوناتشي مع التحفيظ
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

# ابحث عن كل ملف .md أكبر من 1 كيلوبايت واحسب أسطره
find . -name '*.md' -size +1k -print0 \
  | while IFS= read -r -d '' file; do
      lines=$(wc -l < "$file")
      printf '%6d  %s\n' "$lines" "$file"
    done \
  | sort -rn \
  | head -10
```

### كتلة بدون تحديد لغة

```
كتلة بسيطة — لا يوجد تمييز للبناء.
مفيدة لأشجار الدلائل أو الرسوم البيانية أو عينات النسخ واللصق.
```

---

## الجداول

| الميزة                | الحالة | ملاحظات                               |
| --------------------- | :----: | ------------------------------------- |
| الكشف عن MIME         |   ✅   | `text/markdown` و`text/x-markdown`    |
| احتياطي `.md`         |   ✅   | عندما يرسل الخادم `text/plain`        |
| التنظيف               |   ✅   | DOMPurify                             |
| الوضع الداكن          |   ✅   | تلقائي / فاتح / داكن                  |
| التوطين               |   ✅   | 17 لغة                                |
| تمييز بناء الجملة      |   ✅   | highlight.js Common build             |

الأرقام المحاذاة لليمين تعمل أيضًا:

| العنصر     | السعر |
| ---------- | ----: |
| قهوة       |  4.50 |
| كرواسون    |  3.25 |
| المجموع    |  7.75 |

---

## الاقتباسات

> "يجب أن تُكتب البرامج لكي يقرأها البشر، وعرضًا فقط لكي تُنفّذها الآلات."
>
> — Harold Abelson, _Structure and Interpretation of Computer Programs_

متداخل:

> فكرة خارجية.
>
> > رد داخلي، مع **تشديد** و`كود`.
> >
> > > ومستوى ثالث، للمتكررين حقًا.

---

## الصور

نائب صورة مضمّن:

![placeholder](https://placehold.co/600x120/png?text=Markdown+Viewer+Ultra)

---

## الخطوط الأفقية

تحت هذا السطر يوجد خط أفقي.

---

…وآخر أيضًا. مفيد لفصل الأقسام في المستندات الطويلة.

---

## الروابط والمراجع

[رابط](https://example.com) بسيط، ورابط تلقائي <https://example.com>، ورابط مع [خاصية العنوان](https://example.com "حوّم فوقي").

هذه هي الجولة — إذا بدا كل ما سبق منسّقًا، فأنت ترى مجموعة الميزات الكاملة: الطباعة، القوائم، تمييز الكود، الجداول، الاقتباسات، والألوان التي تتبع السمة.
