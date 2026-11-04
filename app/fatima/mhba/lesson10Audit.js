// Authored checks against the supplied source; official wording and figures remain available.
export const lesson10Notes=[
  {
    "id": "capital-base-inconsistency",
    "pages": [
      10,
      16,
      17
    ],
    "questions": [],
    "title": "مبنای سرمایه در مثال یکسان نیست",
    "de": "Seite 10 nennt 50.000 Euro Eigenkapital, Seite 16/17 dagegen 25.000 Euro. Die angegebenen 196 und 144 Prozent folgen aus 49.000/25.000 und 36.000/25.000. Mit 50.000 Euro ergäben sich 98 und 72 Prozent. Die Werte des Skripts bleiben als Quellenangaben erhalten; der jeweilige Nenner muss ausdrücklich genannt werden.",
    "fa": "صفحهٔ ۱۰ سرمایهٔ خودی را ۵۰هزار یورو، ولی صفحه‌های ۱۶ و ۱۷ آن را ۲۵هزار بیان می‌کنند. نسبت‌های ۱۹۶ و ۱۴۴ درصد از تقسیم سودهای ۴۹هزار و ۳۶هزار بر ۲۵هزار به دست می‌آیند؛ با مخرج ۵۰هزار، ۹۸ و ۷۲ درصد حاصل می‌شود. اعداد جزوه حفظ شده‌اند؛ هنگام محاسبه باید مخرج را صریح بیان کرد.",
    "sources": []
  },
  {
    "id": "safety-and-annuity-rounding",
    "pages": [
      15,
      16,
      24,
      25
    ],
    "questions": [],
    "title": "کنترل گرد کردن فرمول‌ها",
    "de": "49.000/(170.000−27.000)×100 ergibt 34,2657 Prozent, gerundet 34,27 statt 34,24 Prozent. Bei der Annuität gilt 75,6713777×0,295228117 = 22,3403 Euro, also 22,34 Euro. Die im Skript genannten 22,32 Euro entstehen bei Verwendung des auf 0,295 verkürzten Faktors. Die vollständige Faktortabelle ergibt 0,295228 für vier Jahre und sieben Prozent.",
    "fa": "حاشیهٔ ایمنی با داده‌های جزوه ۴۹هزار تقسیم بر ۱۴۳هزار، یعنی ۳۴٫۲۷ درصد است؛ در تصویر جزوه ۳۴٫۲۴ آمده است. سالانه‌سازی با ضریب دقیق ۰٫۲۹۵۲۲۸ و ارزش فعلی ۷۵٫۶۷، مبلغ ۲۲٫۳۴ یورو می‌دهد؛ مبلغ ۲۲٫۳۲ جزوه حاصل کوتاه کردن ضریب به ۰٫۲۹۵ است. ضریب دقیق در جدول اصلی حفظ شده است.",
    "sources": []
  },
  {
    "id": "sensitivity-cent-rounding",
    "pages": [
      33,
      34,
      42
    ],
    "questions": [
      "10.7"
    ],
    "title": "اختلاف سنتی در محاسبهٔ حساسیت",
    "de": "Für Kontrollfrage 10.7 ergibt die Rechnung ohne Zwischenrundung 521,621423 Euro im Grundfall und 223,638118 Euro im schwächeren Szenario, gerundet 521,62 und 223,64 Euro. Die Musterlösung summiert gerundete Einzelbarwerte zu 223,65 Euro. Der Rückgang beträgt rund 57,13 Prozent; beide Szenarien haben einen positiven Kapitalwert. Im Zustandsbaum auf Seite 34 sind −38,77 Euro aus gerundeten Eingangswerten und −38,76 Euro mit voller Genauigkeit vereinbar.",
    "fa": "در سؤال ۱۰.۷، محاسبه بدون گرد کردن میانی، ۵۲۱٫۶۲ یورو در حالت پایه و ۲۲۳٫۶۴ یورو در حالت ضعیف‌تر می‌دهد. پاسخ رسمی با جمع ارزش‌های فعلیِ ازپیش‌گردشده، ۲۲۳٫۶۵ به دست آورده است. افت حدود ۵۷٫۱۳ درصد است و هر دو حالت ارزش فعلی خالص مثبت دارند. در درخت وضعیت صفحهٔ ۳۴ نیز −۳۸٫۷۷ با ورودی گرد‌شده و −۳۸٫۷۶ با دقت کامل سازگار است.",
    "sources": []
  },
  {
    "id": "repeated-investment-period",
    "pages": [
      43
    ],
    "questions": [
      "10.10"
    ],
    "title": "بازگشت دو A در دورهٔ دوم است",
    "de": "Die Tabelle von Aufgabe 10.10 enthält Rückflüsse ausschließlich in Periode 2. Der Satz der Musterlösung mit „doppelter Rückfluss in Periode 1“ ist deshalb ein Schreibfehler. Mit 300.000 Euro Budget und unterstellter Wiederholbarkeit ergeben zwei A einen Rückfluss von 420.000 Euro in Periode 2 und einen Kapitalwert von 47.107,44 Euro; B ergibt 23.553,72 Euro.",
    "fa": "جدول سؤال ۱۰.۱۰ بازگشت وجه را فقط در دورهٔ دوم نشان می‌دهد. بنابراین عبارت «بازگشت دو برابر در دورهٔ اول» در متن پاسخ رسمی، خطای نوشتاری است. با بودجهٔ ۳۰۰هزار و فرض امکان تکرار A، بازگشت دورهٔ دوم ۴۲۰هزار و ارزش فعلی خالص ۴۷۱۰۷٫۴۴ یورو می‌شود؛ برای B این مقدار ۲۳۵۵۳٫۷۲ است.",
    "sources": []
  }
];
export const lesson10PageNotes=page=>lesson10Notes.filter(note=>note.pages.includes(page));
export const lesson10QuestionNotes=id=>lesson10Notes.filter(note=>note.questions.includes(id));
