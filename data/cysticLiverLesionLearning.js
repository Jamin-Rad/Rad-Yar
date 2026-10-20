const L = (de, en, fa) => ({ de, en, fa })

export const CYSTIC_LIVER_FLASHCARD_TOPIC = {
  id: 'leberzyste',
  area: 'Abdomen',
  chapter: L('Leber', 'Liver', 'کبد'),
  icon: '◉',
  iconImage: '/fach/abdomen.png',
  color: '#1686a0',
  href: '/flashcards/leberzyste',
  title: L('Zystische Leberläsionen', 'Cystic liver lesions', 'ضایعات کیستیک کبد'),
  description: L('Einfache Zyste · Echinokokkenzyste · MRT-Muster · Sicherheitsgrenze', 'Simple cyst · echinococcal cyst · MRI pattern · safety boundary', 'کیست ساده · کیست اکینوکوکی · الگوی MRI · ملاحظات ایمنی'),
}

export const CYSTIC_LIVER_FLASHCARDS = [
  {
    id: 'leberzyste-simple-imaging', topicId: 'leberzyste', category: L('Einfache Zyste', 'Simple cyst', 'کیست ساده'),
    front: L('Welche typischen Bildmerkmale sprechen für eine einfache Leberzyste?', 'Which typical imaging features support a simple hepatic cyst?', 'کدام ویژگی‌های تصویری به نفع کیست ساده کبد هستند؟'),
    answer: L('Anechogen mit dorsaler Schallverstärkung; flüssigkeitsnah und glatt begrenzt im CT ohne messbares Enhancement; T1 niedrig und T2 hoch.', 'Anechoic with posterior acoustic enhancement; near-fluid attenuation and smooth margins without measurable CT enhancement; T1 low and T2 high signal.', 'بدون اکو با تقویت صوتی خلفی؛ دانسیته نزدیک مایع و حدود صاف بدون جذب قابل‌اندازه‌گیری در CT؛ T1 کم‌سیگنال و T2 پرسیگنال.'),
    explanation: L('Die Merkmale aus Sono, CT und MRT ergänzen sich. Eine atypische Wand oder komplexer Inhalt erfordert eine erneute Einordnung.', 'Ultrasound, CT and MRI features complement each other. An atypical wall or complex contents require reassessment.', 'یافته‌های سونوگرافی، CT و MRI مکمل هم‌اند؛ دیوارهٔ غیرمعمول یا محتوای پیچیده نیازمند ارزیابی دوباره است.'),
    source: 'Abdomen.pdf p.5 (printed p.4)',
  },
  {
    id: 'leberzyste-echinococcus-mri', topicId: 'leberzyste', category: L('Echinokokkenzyste · MRT', 'Echinococcal cyst · MRI', 'کیست اکینوکوکی · MRI'),
    front: L('Welche Merkmale zeigt die Echinokokkenzyste im MRT-Beispiel aus Abdomen.pdf?', 'Which features are shown by the echinococcal cyst MRI example in Abdomen.pdf?', 'نمونهٔ MRI کیست اکینوکوکی در Abdomen.pdf چه ویژگی‌هایی دارد؟'),
    answer: L('T2-hyperintense Tochterzysten und Septen; nach Kontrastmittel reichern Wand und Septen an, der Zysteninhalt nicht.', 'T2-hyperintense daughter cysts and septa; after contrast, the wall and septa enhance while the cyst contents do not.', 'کیست‌های دختر و سپتا در T2 پرسیگنال‌اند؛ پس از تزریق دیواره و سپتا جذب دارند، اما محتوا جذب نمی‌کند.'),
    explanation: L('Das ist das im PDF gezeigte Muster und ein bildgebender Hinweis; es ersetzt weder klinische Abklärung noch die Bestimmung des Zystenstadiums.', 'This is the pattern shown in the PDF and an imaging clue; it does not replace clinical assessment or cyst-stage classification.', 'این الگوی نشان‌داده‌شده در PDF و یک سرنخ تصویری است؛ جایگزین ارزیابی بالینی یا تعیین مرحلهٔ کیست نیست.'),
    source: 'Abdomen.pdf p.7 (printed p.6), T2w-FS and T1w post-contrast FS',
  },
  {
    id: 'leberzyste-water-lily', topicId: 'leberzyste', category: L('Echinokokkenzyste · CT', 'Echinococcal cyst · CT', 'کیست اکینوکوکی · CT'),
    front: L('Was beschreibt das Water-lily-Zeichen?', 'What does the water-lily sign describe?', 'علامت Water-lily چه چیزی را توصیف می‌کند؟'),
    answer: L('Eine von der Perizyste abgelöste Endozyste mit frei flottierender Membran.', 'An endocyst detached from the pericyst with a freely floating membrane.', 'اندوسیستی که از پری‌کیست جدا شده و غشای آزادشناور دارد.'),
    explanation: L('Das PDF zeigt das Zeichen im CT-Beispiel. Es ist ein morphologischer Hinweis; Bildgebung allein beweist die Ätiologie nicht.', 'The PDF shows this sign in its CT example. It is a morphological clue; imaging alone does not prove the aetiology.', 'این علامت در نمونهٔ CT منبع دیده می‌شود؛ سرنخ مورفولوژیک است و تصویربرداری به‌تنهایی علت را اثبات نمی‌کند.'),
    source: 'Abdomen.pdf p.6 (printed p.5)',
  },
  {
    id: 'leberzyste-puncture-safety', topicId: 'leberzyste', category: L('Sicherheitsgrenze', 'Safety boundary', 'ملاحظهٔ ایمنی'),
    front: L('Was ist vor einer Punktion bei möglicher Echinokokkose zu beachten?', 'What must be considered before puncture when echinococcosis is possible?', 'اگر اکینوکوکوز مطرح باشد، پیش از نمونه‌گیری چه نکته‌ای باید رعایت شود؟'),
    answer: L('Echinokokkose zuerst abklären und vor einer Intervention spezialisierte Beurteilung veranlassen.', 'Clarify possible echinococcosis first and obtain specialist assessment before intervention.', 'ابتدا احتمال اکینوکوکوز را بررسی و پیش از مداخله ارزیابی تخصصی را پیگیری کنید.'),
    explanation: L('Die PDF warnt vor Anaphylaxie und sekundärer Ausbreitung. Bildgebung allein legt weder Diagnose noch Therapie fest.', 'The PDF warns of anaphylaxis and secondary spread. Imaging alone determines neither diagnosis nor treatment.', 'PDF دربارهٔ آنافیلاکسی و انتشار ثانویه هشدار می‌دهد؛ تصویربرداری به‌تنهایی نه تشخیص را قطعی می‌کند و نه درمان را تعیین می‌کند.'),
    source: 'Abdomen.pdf p.6 (printed p.5); WHO 2025',
  },
]
