# Markdown Viewer Ultra — תצוגת תכונות

אם אתם רואים את זה עם כותרות, צבעי קוד, טבלאות ורשימות משימות במקום טקסט גולמי, התוסף עובד.

---

## עיצוב טקסט

הפסקה הזו משלבת **מודגש**, _נטוי_, ***מודגש נטוי***, ~~קו חוצה~~, `קוד בשורה` וגם [קישור לפרויקט](https://github.com/danarrib/markdown-viewer-ultra).

אפשר גם לכתוב H<sub>2</sub>O ו-E = mc<sup>2</sup> עם HTML בשורה, ואפילו <kbd>Ctrl</kbd> + <kbd>C</kbd> לרמזי מקלדת.

---

## כותרות

# H1 — כותרת מסמך
## H2 — חלק
### H3 — תת-חלק
#### H4 — קבוצה
##### H5 — פרט
###### H6 — רמת הערת שוליים

---

## רשימות

## ללא סדר (עם הזחה)

- פריט ראשון
- פריט שני
  - מקונן A
  - מקונן B
    - מקונן עמוק
- פריט שלישי

### ממוספרת

1. הפעל את הטוסטר
2. הכנס את הלחם
3. חכה לקליק
4. מרח חמאה

### רשימת משימות

- [x] לזהות סוג תוכן
- [x] לעבד markdown
- [x] לחטא HTML
- [x] לתרגם את הממשק
- [x] להוסיף הדגשת תחביר
- [ ] להוסיף עמוד הגדרות

---

## בלוקי קוד

### JavaScript

```js
// פיבונאצ'י עם מיזוג זיכרון
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

# מצא כל קובץ .md הגדול מ-1 ק"ב וספור את השורות שלו
find . -name '*.md' -size +1k -print0 \
  | while IFS= read -r -d '' file; do
      lines=$(wc -l < "$file")
      printf '%6d  %s\n' "$lines" "$file"
    done \
  | sort -rn \
  | head -10
```

### בלוק ללא ציון שפה

```
בלוק רגיל — אין הדגשת תחביר.
שימושי לעצי תיקיות, דיאגרמות או דוגמאות להעתקה.
```

---

## טבלאות

| תכונה               | סטטוס | הערות                                 |
| ------------------- | :---: | ------------------------------------- |
| זיהוי MIME          |  ✅   | `text/markdown` ו-`text/x-markdown`   |
| גיבוי `.md`         |  ✅   | כשהשרת שולח `text/plain`              |
| חיטוי               |  ✅   | DOMPurify                             |
| מצב כהה             |  ✅   | אוטומטי / בהיר / כהה                  |
| לוקליזציה           |  ✅   | 17 שפות                               |
| הדגשת תחביר         |  ✅   | highlight.js Common build             |

מספרים מיושרים לימין גם עובדים:

| פריט       | מחיר  |
| ---------- | ----: |
| קפה        |  4.50 |
| קרואסון     |  3.25 |
| סך הכל     |  7.75 |

---

## ציטוטים בבלוק

> "תוכניות צריכות להיכתב כדי שאנשים יקראו אותן, ורק במקרה כדי שמכונות יבצעו אותן."
>
> — Harold Abelson, _Structure and Interpretation of Computer Programs_

מקונן:

> מחשבה חיצונית.
>
> > תגובה פנימית, עם **הדגשה** ו`קוד`.
> >
> > > ורמה שלישית, לרקורסיביים באמת.

---

## תמונות

מציין מקום בשורה:

![placeholder](https://placehold.co/600x120/png?text=Markdown+Viewer+Ultra)

---

## קווים אופקיים

מתחת לשורה זו יש קו אופקי.

---

…ועוד אחד. שימושי להפרדת חלקים במסמכים ארוכים.

---

## קישורים והפניות

[קישור](https://example.com) רגיל, קישור אוטומטי <https://example.com>, וקישור עם [מאפיין כותרת](https://example.com "רחף עליי").

זה הסיור — אם הכל למעלה נראה מלוטש, אתם רואים את כל סט התכונות: טיפוגרפיה, רשימות, הדגשת קוד, טבלאות, ציטוטים וצבעים שעוקבים אחר ערכת הנושא.
