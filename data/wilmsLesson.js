const schematicCaption = {
  de: 'Schematische Lernhilfe zum Nierenursprung und Claw sign; keine Patientendarstellung.',
  en: 'Teaching schematic of renal origin and the claw sign; not a patient image.',
  fa: 'شماتیک آموزشی منشأ کلیوی و علامت چنگالی؛ تصویر بیمار نیست.',
}

export const WILMS_LESSON = {
  id: 'abdomen-wilms-tumour',
  title: { de: 'Nephroblastom (Wilms-Tumor)', en: 'Nephroblastoma (Wilms tumour)', fa: 'نفروبلاستوما (تومور ویلمز)' },
  subtitle: {
    de: 'Nierenursprung erkennen und vom Nebennierenursprung abgrenzen.',
    en: 'Recognise renal origin and distinguish it from an adrenal origin.',
    fa: 'منشأ کلیوی را تشخیص دهید و آن را از منشأ آدرنال افتراق دهید.',
  },
  contentTitle: { de: 'Vom Ursprung zur Ausbreitungsübersicht', en: 'From site of origin to metastatic survey', fa: 'از تعیین منشأ تا مرور محل‌های متاستاز' },
  goals: [
    { de: 'Die große, inhomogene solide Nierenraumforderung als Bildmuster benennen.', en: 'Identify the large heterogeneous solid renal mass pattern.', fa: 'الگوی توده جامد بزرگ و ناهمگن کلیه را تشخیص دهید.' },
    { de: 'Mit dem Claw sign den Nierenursprung begründen und vom Nebennierenursprung unterscheiden.', en: 'Use the claw sign to support renal rather than adrenal origin.', fa: 'با علامت چنگالی، منشأ کلیوی را از منشأ آدرنال تفکیک کنید.' },
    { de: 'Die im PDF genannten häufigen Metastasenorte wiedergeben.', en: 'Recall the common metastatic sites listed in the PDF.', fa: 'محل‌های شایع متاستاز ذکرشده در PDF را بیان کنید.' },
  ],
  check: {
    question: { de: 'Eine große inhomogene Raumforderung des Oberbauchs wird von normalem Nierenparenchym beidseits spitzwinklig umgriffen. Was stützt dieses Zeichen am stärksten?', en: 'A large heterogeneous upper-abdominal mass is partly wrapped by normal renal parenchyma with acute margins on both sides. What does this sign most strongly support?', fa: 'توده‌ای بزرگ و ناهمگن در بخش فوقانی شکم دیده می‌شود که پارانشیم طبیعی کلیه از دو طرف با حاشیه‌های نوک‌تیز آن را در بر گرفته است. این علامت بیش از همه چه چیزی را تقویت می‌کند؟' },
    options: [
      { de: 'Ursprung aus dem Nierenparenchym', en: 'Origin from the renal parenchyma', fa: 'منشأ از پارانشیم کلیه' },
      { de: 'Sicherer Ursprung aus der Nebenniere', en: 'Definite origin from the adrenal gland', fa: 'منشأ قطعی از غده فوق کلیوی' },
      { de: 'Beweis für eine bestimmte Histologie', en: 'Proof of a specific histology', fa: 'اثبات یک بافت‌شناسی مشخص' },
    ],
    answer: 0,
    explanation: { de: 'Das Claw sign entsteht, wenn normales Parenchym den Herd sichel- oder klauenförmig umschließt. Es spricht für den Ursprungsort in der Niere, beweist aber keine Histologie.', en: 'The claw sign forms when normal parenchyma curves around the mass. It supports a renal site of origin but does not prove histology.', fa: 'علامت چنگالی زمانی ایجاد می‌شود که پارانشیم طبیعی به شکل هلال یا چنگال دور ضایعه قرار گیرد. این یافته منشأ کلیوی را تقویت می‌کند، اما بافت‌شناسی را ثابت نمی‌کند.' },
    retry: { de: 'Achte darauf, ob normales Nierenparenchym die Raumforderung umgreift.', en: 'Check whether normal renal parenchyma wraps around the mass.', fa: 'بررسی کنید که آیا پارانشیم طبیعی کلیه توده را در بر می‌گیرد یا نه.' },
    diagramCaption: schematicCaption,
  },
  sections: [
    {
      title: { de: 'Welches Bildmuster liegt vor?', en: 'What imaging pattern is present?', fa: 'الگوی تصویربرداری چیست؟' },
      body: { de: 'Das PDF beschreibt das Nephroblastom als meist große, inhomogene, solide Raumforderung, die benachbarte Strukturen verdrängen kann. Zusammen mit dem Claw sign stützt dies den Nierenursprung, ohne eine bestimmte Verdrängungsrichtung festzulegen. Nekrosen und Einblutungen werden als häufig, Verkalkungen als eher selten dargestellt.', en: 'The PDF describes nephroblastoma as usually a large, heterogeneous solid mass that may displace adjacent structures. Together with the claw sign, this supports renal origin without assigning a specific direction of displacement. Necrosis and haemorrhage are common, while calcification is less common.', fa: 'در PDF نفروبلاستوما معمولاً به‌صورت توده‌ای بزرگ، جامد و ناهمگن توصیف شده که می‌تواند ساختارهای مجاور را جابه‌جا کند. این یافته همراه با علامت چنگالی از منشأ کلیوی حمایت می‌کند، بی‌آنکه جهت مشخصی برای جابه‌جایی فرض شود. نکروز و خونریزی شایع و کلسیفیکاسیون نسبتاً نادر ذکر شده‌اند.' },
      implication: { de: 'Diese Merkmale beschreiben das Muster, reichen allein aber nicht zur histologischen Sicherung.', en: 'These features describe the pattern but do not establish histology by themselves.', fa: 'این ویژگی‌ها الگو را توصیف می‌کنند، اما به‌تنهایی برای اثبات بافت‌شناسی کافی نیستند.' },
    },
    {
      title: { de: 'Woher kommt die Raumforderung?', en: 'Where does the mass arise?', fa: 'توده از کجا منشأ می‌گیرد؟' },
      body: { de: 'Suche nach normalem Nierenparenchym, das die Raumforderung sichel- oder klauenförmig umgreift. Dieses Claw sign spricht dafür, dass der Tumor aus der Niere selbst hervorgeht.', en: 'Look for normal renal parenchyma curving around the mass in a crescent or claw shape. This claw sign supports origin within the kidney itself.', fa: 'به‌دنبال پارانشیم طبیعی کلیه باشید که به‌شکل هلال یا چنگال توده را در بر گرفته باشد. این علامت چنگالی از منشأ تومور در خود کلیه حمایت می‌کند.' },
      implication: { de: 'Der Tumor verdrängt benachbarte Strukturen. Zusammen mit dem Claw sign stützt das den Nierenursprung und hilft gegenüber einer benachbarten Nebennierenraumforderung wie einem Neuroblastom; eine Histologie legt es nicht fest.', en: 'The mass displaces adjacent structures. Together with the claw sign, this supports renal origin and helps distinguish it from an adjacent adrenal mass such as neuroblastoma; it does not establish histology.', fa: 'توده ساختارهای مجاور را جابه‌جا می‌کند. این یافته همراه با علامت چنگالی از منشأ کلیوی حمایت می‌کند و به افتراق از توده آدرنال مجاور مانند نوروبلاستوم کمک می‌کند؛ اما بافت‌شناسی را مشخص نمی‌کند.' },
    },
    {
      title: { de: 'Welche Orte gehören zur Metastasensuche?', en: 'Which sites should be considered in a metastatic survey?', fa: 'در بررسی متاستازها چه محل‌هایی را در نظر بگیریم؟' },
      body: { de: 'Die PDF nennt die Lunge als häufigsten Metastasenort; Leber und Lymphknoten werden als seltenere Orte aufgeführt.', en: 'The PDF lists the lungs as the most common metastatic site; liver and lymph nodes are listed less often.', fa: 'در PDF ریه شایع‌ترین محل متاستاز معرفی شده و کبد و غدد لنفاوی به‌عنوان محل‌های کم‌شیوع‌تر آمده‌اند.' },
      implication: { de: 'Die Übersicht gibt die genannten Orte aus der Quelle wieder; sie ist kein vollständiges Staging-Protokoll.', en: 'This is a source-based list of sites, not a complete staging protocol.', fa: 'این فهرست بازتاب محل‌های ذکرشده در منبع است و پروتکل کامل مرحله‌بندی نیست.' },
    },
  ],
  summary: [
    { de: 'Das typische PDF-Muster ist eine große, inhomogene solide Nierenraumforderung.', en: 'The PDF pattern is a large, heterogeneous solid renal mass.', fa: 'الگوی PDF توده‌ای بزرگ، جامد و ناهمگن در کلیه است.' },
    { de: 'Das Claw sign stützt den Nierenursprung gegenüber einem Nebennierentumor.', en: 'The claw sign supports renal rather than adrenal origin.', fa: 'علامت چنگالی منشأ کلیوی را در برابر منشأ آدرنال تقویت می‌کند.' },
    { de: 'Lunge zuerst im Blick behalten; Leber und Lymphknoten sind im PDF seltener genannt.', en: 'Keep the lungs foremost; liver and lymph nodes are listed less often in the PDF.', fa: 'ریه را در اولویت مرور قرار دهید؛ کبد و غدد لنفاوی در PDF کم‌شیوع‌تر ذکر شده‌اند.' },
  ],
  source: { de: 'Quelle und Umfang: Abdomen.pdf, PDF-Seite 52 (gedruckte Seite 51). Die Zahlen zu Epidemiologie, Klinik und Prognose wurden nicht übernommen.', en: 'Source and scope: Abdomen.pdf, PDF page 52 (printed page 51). Epidemiology, clinical presentation and prognosis figures were not carried over.', fa: 'منبع و دامنه: Abdomen.pdf، صفحه ۵۲ فایل (صفحه چاپی ۵۱). اعداد همه‌گیرشناسی، تظاهرات بالینی و پیش‌آگهی وارد درس نشده‌اند.' },
  media: { de: 'Die CT-Abbildungen auf der PDF-Seite sind im sichtbaren Ausschnitt nicht ausreichend attribuiert. Daher verwendet diese Lektion nur eine eigens erstellte, nichtdiagnostische Schemazeichnung.', en: 'The CT images on the PDF page are not sufficiently attributed in the visible material. This lesson therefore uses an original, non-diagnostic schematic only.', fa: 'تصاویر CT در صفحه PDF در بخش قابل مشاهده انتساب کافی ندارند؛ بنابراین این درس فقط از شماتیک اختصاصی و غیرتشخیصی استفاده می‌کند.' },
  sourceReview: { de: 'Die unabhängige Inhaltsprüfung und Korrekturrunde sind abgeschlossen. Klinische Fachprüfung und Browserprüfung stehen noch aus.', en: 'Independent content review and the correction round are complete. Clinician review and browser testing are still pending.', fa: 'بازبینی مستقل محتوا و دور اصلاحات کامل شده است؛ بررسی متخصص بالینی و آزمون مرورگر هنوز باقی است.' },
}

