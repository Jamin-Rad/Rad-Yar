// Authored checks against the supplied source; official wording and figures remain available.
export const lesson9Notes=[
  {
    "id": "actual-market-share",
    "pages": [
      12,
      13,
      44
    ],
    "questions": [
      "9.7"
    ],
    "title": "سهم بازار با فروش واقعی محاسبه می‌شود",
    "de": "Der inländische Absatz beträgt 80.000 − 10.000 = 70.000 Paare. Das Marktvolumen beträgt 70.000 + (340.000 − 100.000) + 20.000 = 330.000 Paare. Der Marktanteil ist damit 21,21 Prozent. Das Potenzial von 350.000 Paaren ist eine andere Größe und gehört nicht in diesen Nenner.",
    "fa": "فروش داخلی بنگاه ۷۰هزار و حجم واقعی بازار ۳۳۰هزار جفت است؛ سهم بازار برابر ۷۰هزار تقسیم بر ۳۳۰هزار، یعنی ۲۱٫۲۱ درصد می‌شود. ظرفیت بالقوهٔ ۳۵۰هزار جفت اندازه‌ای دیگر است و در مخرج سهم بازار واقعی قرار نمی‌گیرد.",
    "sources": []
  },
  {
    "id": "market-structure-and-perfection",
    "pages": [
      6,
      25,
      26
    ],
    "questions": [
      "9.9"
    ],
    "title": "ساختار بازار با کامل بودن بازار متفاوت است",
    "de": "Viele Anbieter und Nachfrager kennzeichnen ein Polypol. Vollkommenheit betrifft dagegen Homogenität, Transparenz, Reaktionsgeschwindigkeit und das Fehlen von Präferenzen. Die Klammer auf Seite 25 verkürzt diese Unterscheidung; die vollständigen Merkmale stehen auf Seite 6.",
    "fa": "بسیار بودن عرضه‌کننده و متقاضی، ساختار Polypol را بیان می‌کند. کامل بودن بازار به همگنی، شفافیت، سرعت واکنش و نبود ترجیح مربوط است. عبارت داخل پرانتز صفحهٔ ۲۵ این تمایز را ساده کرده؛ معیارهای کامل‌تر در صفحهٔ ۶ آمده‌اند.",
    "sources": []
  }
];
export const lesson9PageNotes=page=>lesson9Notes.filter(note=>note.pages.includes(page));
export const lesson9QuestionNotes=id=>lesson9Notes.filter(note=>note.questions.includes(id));
