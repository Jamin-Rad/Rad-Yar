const schematicCaption = {
  de: 'Schematische Lernhilfe zum Nierenursprung und Claw sign; keine Patientendarstellung.',
  en: 'Teaching schematic of renal origin and the claw sign; not a patient image.',
  fa: 'شماتیک آموزشی منشأ کلیوی و علامت چنگالی؛ تصویر بیمار نیست.',
}

export const WILMS_LESSON = {
  id: 'nephroblastom-wilms',
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
      { de: 'Neuroblastom ist damit ausgeschlossen', en: 'Neuroblastoma is therefore excluded', fa: 'بنابراین نوروبلاستوما رد می‌شود' },
    ],
    answer: 0,
    explanation: { de: 'Das Claw sign entsteht, wenn normales Parenchym den Herd sichel- oder klauenförmig umschließt. Es spricht für den Ursprungsort in der Niere, beweist aber keine Histologie.', en: 'The claw sign forms when normal parenchyma curves around the mass. It supports a renal site of origin but does not prove histology.', fa: 'علامت چنگالی زمانی ایجاد می‌شود که پارانشیم طبیعی به شکل هلال یا چنگال دور ضایعه قرار گیرد. این یافته منشأ کلیوی را تقویت می‌کند، اما بافت‌شناسی را ثابت نمی‌کند.' },
    retry: { de: 'Achte darauf, ob normales Nierenparenchym die Raumforderung umgreift.', en: 'Check whether normal renal parenchyma wraps around the mass.', fa: 'بررسی کنید که آیا پارانشیم طبیعی کلیه توده را در بر می‌گیرد یا نه.' },
    diagramCaption: schematicCaption,
  },
  images: [
    {
      src: '/educational/wilms/abdomen-p52-coronal.png',
      alt: { de: 'Koronare CT-Ansicht einer großen Nierenraumforderung mit Verdrängung benachbarter Bauchorgane.', en: 'Coronal CT view of a large renal mass displacing adjacent abdominal organs.', fa: 'نمای کرونال CT از تودهٔ بزرگ کلیه با جابه‌جایی اندام‌های مجاور شکم.' },
      caption: { de: 'Koronare Ansicht des Beispiels aus Abdomen.pdf, S. 52. Die Beziehung zum Restparenchym hilft bei der Beurteilung des Ursprungs; die CT-Phase ist nicht angegeben.', en: 'Coronal view from Abdomen.pdf, p. 52. The relationship to residual parenchyma helps assess the site of origin; the CT phase is not stated.', fa: 'نمای کرونال نمونهٔ Abdomen.pdf، صفحهٔ ۵۲. ارتباط با پارانشیم باقی‌مانده به ارزیابی منشأ کمک می‌کند؛ فاز CT مشخص نشده است.' },
    },
    {
      src: '/educational/wilms/abdomen-p52-axial.png',
      alt: { de: 'Axiale CT-Ansicht einer großen inhomogenen Nierenraumforderung; rote Quellenpfeile markieren das anliegende Nierenparenchym.', en: 'Axial CT view of a large heterogeneous renal mass; source red arrows mark adjacent renal parenchyma.', fa: 'نمای آکسیال CT از تودهٔ بزرگ و ناهمگن کلیه؛ پیکان‌های قرمز منبع پارانشیم مجاور را نشان می‌دهند.' },
      caption: { de: 'Axiale Ansicht desselben Beispiels. Das sichel- oder klauenförmig anliegende Restparenchym kann den Nierenursprung stützen; die roten Pfeile stammen aus der Quelle.', en: 'Axial view of the same example. Crescent- or claw-shaped residual parenchyma can support renal origin; the red arrows are from the source.', fa: 'نمای آکسیال همان نمونه. پارانشیم باقی‌مانده به‌شکل هلال یا چنگال می‌تواند منشأ کلیوی را تقویت کند؛ پیکان‌های قرمز متعلق به منبع‌اند.' },
    },
  ],
  sections: [
    {
      title: { de: 'Welches Bildmuster liegt vor?', en: 'What imaging pattern is present?', fa: 'الگوی تصویربرداری چیست؟' },
      body: { de: 'Das PDF beschreibt das Nephroblastom als meist große, inhomogene, solide Raumforderung, die benachbarte Strukturen verdrängen kann. Zusammen mit dem Claw sign stützt dies den Nierenursprung, ohne eine bestimmte Verdrängungsrichtung festzulegen. Nekrosen und Einblutungen werden als häufig, Verkalkungen als eher selten dargestellt.', en: 'The PDF describes nephroblastoma as usually a large, heterogeneous solid mass that may displace adjacent structures. Together with the claw sign, this supports renal origin without assigning a specific direction of displacement. Necrosis and haemorrhage are common, while calcification is less common.', fa: 'در PDF نفروبلاستوما معمولاً به‌صورت توده‌ای بزرگ، جامد و ناهمگن توصیف شده که می‌تواند ساختارهای مجاور را جابه‌جا کند. این یافته همراه با علامت چنگالی از منشأ کلیوی حمایت می‌کند، بی‌آنکه جهت مشخصی برای جابه‌جایی فرض شود. نکروز و خونریزی شایع و کلسیفیکاسیون نسبتاً نادر ذکر شده‌اند.' },
      implication: { de: 'Diese Merkmale beschreiben das Muster, reichen allein aber nicht zur histologischen Sicherung.', en: 'These features describe the pattern but do not establish histology by themselves.', fa: 'این ویژگی‌ها الگو را توصیف می‌کنند، اما به‌تنهایی برای اثبات بافت‌شناسی کافی نیستند.' },
    },
    {
      title: { de: 'Woher kommt die Raumforderung?', en: 'Where does the mass arise?', fa: 'توده از کجا منشأ می‌گیرد؟' },
      body: { de: 'Suche nach normalem Nierenparenchym, das die Raumforderung sichel- oder klauenförmig umgreift. Dieses Claw sign spricht dafür, dass der Tumor aus der Niere selbst hervorgeht.', en: 'Look for normal renal parenchyma curving around the mass in a crescent or claw shape. This claw sign supports origin within the kidney itself.', fa: 'به‌دنبال پارانشیم طبیعی کلیه باشید که به‌شکل هلال یا چنگال توده را در بر گرفته باشد. این علامت چنگالی از منشأ تومور در خود کلیه حمایت می‌کند.' },
      implication: { de: 'Der Tumor verdrängt benachbarte Strukturen. Zusammen mit dem Claw sign stützt das den Nierenursprung und hilft gegenüber einer benachbarten Nebennierenraumforderung wie einem Neuroblastom; eine Histologie legt es nicht fest. Die PDF beschreibt spitzwinklige Übergänge, eine MRI-Studie definiert einen stumpfen äußeren Winkel. Diese Modalitäten sind nicht direkt gleichzusetzen; den Winkel daher nicht isoliert als Regel verwenden.', en: 'The mass displaces adjacent structures. Together with the claw sign, this supports renal origin and helps distinguish it from an adjacent adrenal mass such as neuroblastoma; it does not establish histology. The PDF describes acute transitions, while an MRI study defines an obtuse superficial angle. These modalities should not be treated as directly equivalent; do not use angle alone as a rule.', fa: 'توده ساختارهای مجاور را جابه‌جا می‌کند. این یافته همراه با علامت چنگالی از منشأ کلیوی حمایت می‌کند و به افتراق از توده آدرنال مجاور مانند نوروبلاستوم کمک می‌کند، اما بافت‌شناسی را مشخص نمی‌کند. PDF گذارهای نوک‌تیز را توصیف می‌کند، درحالی‌که یک مطالعهٔ MRI زاویهٔ خارجی باز را تعریف کرده است. این دو روش را نباید مستقیماً معادل دانست؛ زاویه را به‌تنهایی معیار قرار ندهید.' },
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
  media: { de: 'Die beiden CT-Ansichten stammen aus der vom Nutzer bereitgestellten Abdomen.pdf, S. 52; die Seite nennt weder Fall-ID noch CT-Phase. Die Pfeile sind Teil der PDF-Abbildung. Ein ergänzendes Claw-sign-Schema ist ausdrücklich nicht diagnostisch.', en: 'Both CT views are from the user-supplied Abdomen.pdf, p. 52; the page gives neither a case ID nor CT phase. The arrows are part of the PDF figure. The accompanying claw-sign schematic is explicitly non-diagnostic.', fa: 'هر دو نمای CT از Abdomen.pdf ارائه‌شده توسط کاربر، صفحهٔ ۵۲ هستند؛ صفحه شناسهٔ کیس یا فاز CT را ذکر نمی‌کند. پیکان‌ها بخشی از شکل PDF هستند. شماتیک تکمیلی علامت claw تشخیصی نیست.' },
  sourceReview: { de: 'Quellenabgleich und Korrekturrunde sind abgeschlossen. Unabhängige Abschlussprüfung, klinische Fachprüfung und Browserprüfung stehen noch aus.', en: 'Source alignment and the correction round are complete. Independent final review, clinician review and browser testing are still pending.', fa: 'تطبیق منابع و دور اصلاحات انجام شده است؛ بازبینی نهایی مستقل، بررسی متخصص بالینی و آزمون مرورگر هنوز باقی است.' },
}

