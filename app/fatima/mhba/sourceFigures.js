// Numeric placements and authored captions only; original images stay in private storage.
export const sourceFigures={
  "1": [
    {
      "id": "table-1-1",
      "page": 12,
      "file": "lesson-1-table-1-1.webp",
      "title": "مقایسهٔ اقتصاد و مدیریت بنگاه با علم اقتصاد",
      "label": "جدول ۱.۱",
      "width": 1195,
      "height": 730,
      "anchor": 0
    },
    {
      "id": "table-1-2",
      "page": 17,
      "file": "lesson-1-table-1-2.webp",
      "title": "هزینهٔ مطلق تولید پارچه و شراب",
      "label": "جدول ۱.۲",
      "width": 703,
      "height": 214,
      "anchor": 469
    },
    {
      "id": "table-1-3",
      "page": 18,
      "file": "lesson-1-table-1-3.webp",
      "title": "ماتریس هزینهٔ فرصت پارچه و شراب",
      "label": "جدول ۱.۳",
      "width": 736,
      "height": 214,
      "anchor": 48
    },
    {
      "id": "figure-1-1",
      "page": 25,
      "file": "lesson-1-figure-1-1.webp",
      "title": "سازوکار قیمت در بازار آزاد",
      "label": "شکل ۱.۱",
      "width": 903,
      "height": 741,
      "anchor": 1185
    },
    {
      "id": "figure-1-2",
      "page": 27,
      "file": "lesson-1-figure-1-2.webp",
      "title": "رسیدن عرضه و تقاضا به قیمت تعادلی",
      "label": "شکل ۱.۲",
      "width": 953,
      "height": 741,
      "anchor": 0
    },
    {
      "id": "figure-1-3",
      "page": 32,
      "file": "lesson-1-figure-1-3.webp",
      "title": "مدل پنج نیروی پورتر",
      "label": "شکل ۱.۳",
      "width": 1066,
      "height": 654,
      "anchor": 1324
    },
    {
      "id": "figure-1-4",
      "page": 34,
      "file": "lesson-1-figure-1-4.webp",
      "title": "ساختار غیربازاری در نظام سلامت آلمان",
      "label": "شکل ۱.۴",
      "width": 1066,
      "height": 768,
      "anchor": 0
    },
    {
      "id": "figure-1-5",
      "page": 43,
      "file": "lesson-1-figure-1-5.webp",
      "title": "تعامل رویکردهای نظری اقتصادی",
      "label": "شکل ۱.۵",
      "width": 1184,
      "height": 486,
      "anchor": 667
    }
  ],
  "5": [
    {
      "id": "intro-5",
      "file": "lesson-5-intro.webp",
      "page": 3,
      "anchor": 0,
      "label": "تصویر مقدمه",
      "title": "تصویر آغازین جزوهٔ اشکال حقوقی",
      "de": "Illustration im Originallehrtext",
      "width": 493,
      "height": 803
    },
    {
      "id": "table-5-1",
      "page": 13,
      "file": "lesson-5-table-5-1.webp",
      "label": "جدول ۵.۱",
      "title": "تقسیم سود سالانه میان شرکا",
      "de": "Gewinnverteilung der OHG",
      "width": 1189,
      "height": 165,
      "anchor": 916
    },
    {
      "id": "table-5-2",
      "page": 30,
      "file": "lesson-5-table-5-2.webp",
      "label": "جدول ۵.۲",
      "title": "مقایسهٔ شرکت سهامی آلمان با شرکت اروپایی",
      "de": "AG und SE im Vergleich",
      "width": 1189,
      "height": 324,
      "anchor": 1338
    }
  ]
};
export const answerFigures={"5.9": {"id": "table-answer-9", "file": "lesson-5-table-answer-9.webp", "page": 4, "width": 1189, "height": 195, "label": "جدول پاسخ سؤال ۵.۹", "title": "تقسیم سود OHG با حقوق مدیران", "pdf": "Text_05_Loesungen_Kontrollfragen_2026.pdf"}};
export const sourceFigureFiles=new Set([...Object.values(sourceFigures).flat(),...Object.values(answerFigures)].map(f=>f.file));
export function figuresForRow(lessonId,page,row){return (sourceFigures[lessonId]||[]).filter(f=>f.page===page&&f.anchor>=row.de.start&&f.anchor<row.de.end);}
