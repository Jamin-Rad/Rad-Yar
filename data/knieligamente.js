export const KNIE_LIGAMENTE_FLASHCARD_TOPIC = {
  id: 'kreuzbaender',
  area: 'MSK',
  chapter: 'Knie',
  icon: 'K',
  iconImage: '/fach/msk.png',
  color: '#0f766e',
  href: '/flashcards/kreuzbaender',
  title: {
    de: 'Knie-Ligamente',
    en: 'Knee ligaments',
    fa: 'رباط‌های زانو',
  },
  subtitle: {
    de: 'VKB · HKB · MCL · LCL/PLC · MRT-Grading · Begleitzeichen',
    en: 'ACL · PCL · MCL · LCL/PLC · MRI grading · associated signs',
    fa: 'ACL · PCL · MCL · LCL/PLC · درجه‌بندی MRI · علائم همراه',
  },
}

const q = (id, question, options, correct, explanation) => ({ id, question, options, correct, explanation })

const CONTENT = [
  q(
    'grading',
    {
      de: 'Welcher MRT-Befund passt am besten zu einer Bandverletzung Grad I?',
      en: 'Which MRI finding best matches a grade I ligament injury?',
      fa: 'کدام یافته MRI بیشتر با آسیب رباط درجه I تطابق دارد؟',
    },
    [
      { de: 'Erhaltene Bandkontur mit periligamentösem Ödem', en: 'Preserved ligament contour with periligamentous oedema', fa: 'حفظ کانتور رباط همراه با ادم اطراف رباط' },
      { de: 'Komplette Diskontinuität mit welligen Bandstümpfen', en: 'Complete discontinuity with wavy ligament ends', fa: 'قطع کامل همراه با حالت موج‌دار انتهای رباط' },
      { de: 'Knöcherne Avulsion am Fibulaköpfchen', en: 'Bony avulsion at the fibular head', fa: 'کندگی استخوانی در رأس سر فیبولا' },
      { de: 'Deutliche anteriore Tibiasubluxation über 7 mm', en: 'Marked anterior tibial subluxation over 7 mm', fa: 'سابلوکساسیون قدامی تیبیا بیش از ۷ میلی‌متر' },
    ],
    'A',
    {
      de: 'Grad I entspricht einer Zerrung: Die Bandkontur ist erhalten, das Leitsignal ist ein Flüssigkeitssaum bzw. periligamentöses Ödem.',
      en: 'Grade I is a sprain: the ligament contour remains intact; the key finding is surrounding fluid or periligamentous oedema.',
      fa: 'درجه I همان کشیدگی است: کانتور رباط حفظ می‌شود و یافته اصلی مایع/ادم اطراف رباط است.',
    },
  ),
  q(
    'lcl-v-sign',
    {
      de: 'Welche zwei Strukturen bilden am Fibulaköpfchen sagittal typischerweise ein V?',
      en: 'Which two structures typically form a V at the fibular head on sagittal MRI?',
      fa: 'در MRI ساژیتال، کدام دو ساختار در سر فیبولا معمولاً شکل V می‌سازند؟',
    },
    [
      { de: 'LCL anteromedial und Biceps-femoris-Sehne posterolateral', en: 'LCL anteromedially and biceps femoris tendon posterolaterally', fa: 'LCL در قدام-مدیال و تاندون بایسپس فموریس در خلف-لترال' },
      { de: 'MCL anteromedial und POL posterolateral', en: 'MCL anteromedially and POL posterolaterally', fa: 'MCL در قدام-مدیال و POL در خلف-لترال' },
      { de: 'VKB anterior und HKB posterior', en: 'ACL anteriorly and PCL posteriorly', fa: 'ACL در قدام و PCL در خلف' },
      { de: 'Innenmeniskus und Pes-anserinus-Sehnen', en: 'Medial meniscus and pes anserinus tendons', fa: 'منیسک داخلی و تاندون‌های پس آنسرینوس' },
    ],
    'A',
    {
      de: 'Im lateralen Kollateralbandkomplex liegen am Fibulaköpfchen das LCL eher anteromedial und die Biceps-femoris-Sehne eher posterolateral.',
      en: 'Within the lateral collateral complex, the LCL lies more anteromedially and the biceps femoris tendon more posterolaterally at the fibular head.',
      fa: 'در کمپلکس لترال، در سطح سر فیبولا LCL بیشتر قدام-مدیال و تاندون بایسپس فموریس بیشتر خلف-لترال قرار دارد.',
    },
  ),
  q(
    'arcuate-sign',
    {
      de: 'Wofür ist das Arcuate Sign eine Red Flag?',
      en: 'What is the arcuate sign a red flag for?',
      fa: 'Arcuate sign هشدار مهم برای چیست؟',
    },
    [
      { de: 'Schwere Verletzung des posterolateralen Eckpunkts', en: 'Severe posterolateral corner injury', fa: 'آسیب شدید گوشه خلفی-لترال زانو' },
      { de: 'Isolierte Patellarsehnenruptur', en: 'Isolated patellar tendon rupture', fa: 'پارگی منفرد تاندون پاتلا' },
      { de: 'Chronische mukoide VKB-Degeneration', en: 'Chronic mucoid ACL degeneration', fa: 'دژنراسیون موکوئید مزمن ACL' },
      { de: 'Unkomplizierte Grad-I-MCL-Zerrung', en: 'Uncomplicated grade I MCL sprain', fa: 'کشیدگی ساده MCL درجه I' },
    ],
    'A',
    {
      de: 'Das Arcuate Sign ist eine Avulsionsfraktur am Apex des Fibulaköpfchens und spricht pathognomonisch für eine relevante PLC-Verletzung.',
      en: 'The arcuate sign is an avulsion fracture at the fibular head apex and is highly characteristic of a significant PLC injury.',
      fa: 'Arcuate sign یک شکستگی کندگی در رأس سر فیبولاست و به نفع آسیب مهم کمپلکس PLC است.',
    },
  ),
  q(
    'mcl-pol',
    {
      de: 'Welche Struktur sollte bei jeder MCL-Verletzung gezielt mitbeurteilt werden?',
      en: 'Which structure should be assessed deliberately in every MCL injury?',
      fa: 'در هر آسیب MCL کدام ساختار باید هدفمند ارزیابی شود؟',
    },
    [
      { de: 'Posterior Oblique Ligament (POL)', en: 'Posterior oblique ligament (POL)', fa: 'رباط مایل خلفی (POL)' },
      { de: 'Ligamentum flavum', en: 'Ligamentum flavum', fa: 'لیگامنتوم فلاووم' },
      { de: 'Ligamentum teres', en: 'Ligamentum teres', fa: 'لیگامنتوم ترس' },
      { de: 'Retinaculum extensorum', en: 'Extensor retinaculum', fa: 'رتیناکولوم اکستانسور' },
    ],
    'A',
    {
      de: 'MCL und POL bilden funktionell eine mediale Stabilitätseinheit; kombinierte Läsionen sind häufig und dürfen nicht übersehen werden.',
      en: 'The MCL and POL form a functional medial stabilising unit; combined lesions are common and should not be missed.',
      fa: 'MCL و POL یک واحد پایداری مدیال می‌سازند؛ ضایعات ترکیبی شایع‌اند و نباید نادیده گرفته شوند.',
    },
  ),
  q(
    'acl-indirect',
    {
      de: 'Welche Befundkombination ist ein typisches indirektes Zeichen einer VKB-Ruptur?',
      en: 'Which combination is a typical indirect sign of an ACL tear?',
      fa: 'کدام ترکیب یافته‌ها علامت غیرمستقیم تیپیک پارگی ACL است؟',
    },
    [
      { de: 'Kissing contusions lateral und anteriore Tibiasubluxation', en: 'Lateral kissing contusions and anterior tibial subluxation', fa: 'ادم‌های استخوانی مقابل هم در لترال و سابلوکساسیون قدامی تیبیا' },
      { de: 'Isolierte Baker-Zyste ohne Knochenmarködem', en: 'Isolated Baker cyst without marrow oedema', fa: 'کیست بیکر منفرد بدون ادم مغز استخوان' },
      { de: 'Nur glatte VKB-Verdickung ohne Traumaödem', en: 'Only smooth ACL thickening without traumatic oedema', fa: 'فقط ضخیم‌شدن صاف ACL بدون ادم تروماتیک' },
      { de: 'Kalk in der Quadrizepssehne', en: 'Calcification in the quadriceps tendon', fa: 'کلسیفیکاسیون در تاندون کوادریسپس' },
    ],
    'A',
    {
      de: 'Zu den indirekten VKB-Zeichen gehören laterale Kissing contusions, anteriore Tibiasubluxation und ein entlastet gebogenes HKB.',
      en: 'Indirect ACL signs include lateral kissing contusions, anterior tibial subluxation and a buckled, unloaded PCL.',
      fa: 'علائم غیرمستقیم ACL شامل کوفتگی‌های استخوانی لترال، سابلوکساسیون قدامی تیبیا و حالت خمیده/شل PCL است.',
    },
  ),
  q(
    'pcl-mechanism',
    {
      de: 'Welcher Mechanismus passt klassisch zur HKB-Ruptur?',
      en: 'Which mechanism classically fits a PCL tear?',
      fa: 'کدام مکانیسم به طور کلاسیک با پارگی PCL تطابق دارد؟',
    },
    [
      { de: 'Direkter anteriorer Anprall auf die Tibia bei gebeugtem Knie', en: 'Direct anterior blow to the tibia with the knee flexed', fa: 'ضربه مستقیم از جلو به تیبیا در حالی که زانو خم است' },
      { de: 'Valgus-Rotation ohne Kontakt beim Richtungswechsel', en: 'Non-contact valgus rotation during a pivot', fa: 'چرخش والگوس بدون تماس هنگام تغییر جهت' },
      { de: 'Langsame Überlastung ohne Trauma', en: 'Slow overuse without trauma', fa: 'استفاده بیش از حد تدریجی بدون تروما' },
      { de: 'Direkte Kontusion der Patella bei gestrecktem Knie', en: 'Direct patellar contusion with the knee extended', fa: 'کنتوزیون مستقیم پاتلا در زانوی صاف' },
    ],
    'A',
    {
      de: 'Die klassische Dashboard Injury schiebt die Tibia bei gebeugtem Knie nach posterior und belastet dadurch das HKB.',
      en: 'The classic dashboard injury drives the tibia posteriorly while the knee is flexed, stressing the PCL.',
      fa: 'در dashboard injury، تیبیا در زانوی خم‌شده به عقب رانده می‌شود و PCL تحت کشش قرار می‌گیرد.',
    },
  ),
]

export const KNIE_LIGAMENTE_QUESTIONS = Object.fromEntries(
  ['de', 'en', 'fa'].map(lang => [
    lang,
    CONTENT.map((item, index) => ({
      id: `kreuzbaender-${lang}-${String(index + 1).padStart(2, '0')}`,
      tags: ['kreuzbaender', 'knieligamente', 'knie'],
      fach: 'msk',
      question: item.question[lang],
      options: item.options.map((option, optionIndex) => ({
        id: String.fromCharCode(65 + optionIndex),
        text: option[lang],
      })),
      correct: item.correct,
      explanation: item.explanation[lang],
    })),
  ]),
)

export const KNIE_LIGAMENTE_FLASHCARDS = [
  {
    id: 'kreuzbaender-01',
    topicId: 'kreuzbaender',
    category: { de: 'MRT-Grading', en: 'MRI grading', fa: 'درجه‌بندی MRI' },
    front: {
      de: 'Wie unterscheiden sich Grad I, II und III einer Bandverletzung im MRT?',
      en: 'How do grade I, II and III ligament injuries differ on MRI?',
      fa: 'آسیب رباط درجه I، II و III در MRI چه تفاوتی دارند؟',
    },
    answer: {
      de: 'I: Zerrung, II: Partialruptur, III: Komplettruptur.',
      en: 'I: sprain, II: partial tear, III: complete tear.',
      fa: 'I: کشیدگی، II: پارگی نسبی، III: پارگی کامل.',
    },
    explanation: {
      de: 'Grad I zeigt periligamentöses Ödem bei erhaltener Kontur. Grad II zeigt Verdickung, intraligamentäres Signal und teilweisen Fasererhalt. Grad III zeigt komplette Diskontinuität, oft mit welligem Verlauf.',
      en: 'Grade I shows periligamentous oedema with preserved contour. Grade II shows thickening, intraligamentous signal and some intact fibres. Grade III shows complete discontinuity, often with a wavy course.',
      fa: 'درجه I ادم اطراف رباط با کانتور حفظ‌شده دارد. درجه II ضخیم‌شدن، سیگنال داخل رباط و باقی‌ماندن بخشی از فیبرها را نشان می‌دهد. درجه III قطع کامل و اغلب مسیر موج‌دار دارد.',
    },
    diagram: { de: 'Ödem → Teilruptur → Diskontinuität', en: 'Oedema → partial tear → discontinuity', fa: 'ادم → پارگی نسبی → قطع کامل' },
  },
  {
    id: 'kreuzbaender-02',
    topicId: 'kreuzbaender',
    category: { de: 'LCL/PLC', en: 'LCL/PLC', fa: 'LCL/PLC' },
    front: {
      de: 'Was bedeutet das Arcuate Sign?',
      en: 'What does the arcuate sign mean?',
      fa: 'Arcuate sign به چه معناست؟',
    },
    answer: {
      de: 'Avulsion am Fibulaköpfchen und Red Flag für PLC-Verletzung.',
      en: 'Fibular head avulsion and red flag for PLC injury.',
      fa: 'کندگی سر فیبولا و هشدار برای آسیب PLC.',
    },
    explanation: {
      de: 'Das kleine Fragment oberhalb der Fibula entsteht durch Zug des Arcuate-Ligament-Komplexes und ist für eine relevante posterolaterale Instabilität hoch verdächtig.',
      en: 'The small fragment above the fibula results from traction of the arcuate ligament complex and strongly suggests relevant posterolateral instability.',
      fa: 'قطعه کوچک بالای فیبولا ناشی از کشش کمپلکس لیگامانی آرکوات است و به شدت به نفع ناپایداری خلفی-لترال مهم است.',
    },
    diagram: { de: 'Fibulaköpfchen-Avulsion → PLC prüfen', en: 'Fibular head avulsion → check PLC', fa: 'کندگی سر فیبولا → بررسی PLC' },
  },
  {
    id: 'kreuzbaender-03',
    topicId: 'kreuzbaender',
    category: { de: 'MCL/POL', en: 'MCL/POL', fa: 'MCL/POL' },
    front: {
      de: 'Warum muss bei MCL-Verletzung das POL mitbeurteilt werden?',
      en: 'Why must the POL be assessed in MCL injuries?',
      fa: 'چرا در آسیب MCL باید POL هم بررسی شود؟',
    },
    answer: {
      de: 'Weil MCL und POL eine mediale Stabilitätseinheit bilden.',
      en: 'Because the MCL and POL form a medial stabilising unit.',
      fa: 'چون MCL و POL یک واحد پایداری مدیال می‌سازند.',
    },
    explanation: {
      de: 'Kombinierte Läsionen sind häufig. Eine isolierte Betrachtung des MCL kann die posteromediale Instabilität unterschätzen.',
      en: 'Combined lesions are common. Looking only at the MCL can underestimate posteromedial instability.',
      fa: 'ضایعات ترکیبی شایع‌اند. بررسی فقط MCL می‌تواند ناپایداری خلفی-مدیال را دست‌کم بگیرد.',
    },
  },
  {
    id: 'kreuzbaender-04',
    topicId: 'kreuzbaender',
    category: { de: 'VKB', en: 'ACL', fa: 'ACL' },
    front: {
      de: 'Welche direkten und indirekten Zeichen sprechen für eine VKB-Ruptur?',
      en: 'Which direct and indirect signs suggest an ACL tear?',
      fa: 'کدام علائم مستقیم و غیرمستقیم به نفع پارگی ACL هستند؟',
    },
    answer: {
      de: 'Direkt: Diskontinuität, hohes Signal, flach-welliger Verlauf. Indirekt: Kissing contusions, anteriore Tibiasubluxation, gebogenes HKB.',
      en: 'Direct: discontinuity, high signal, flat-wavy course. Indirect: kissing contusions, anterior tibial subluxation, buckled PCL.',
      fa: 'مستقیم: قطع فیبر، سیگنال بالا، مسیر صاف/موج‌دار. غیرمستقیم: kissing contusions، سابلوکساسیون قدامی تیبیا، PCL خمیده.',
    },
    explanation: {
      de: 'Die Kombination aus Bandbefund und typischem Knochenprellungsmuster erhöht die diagnostische Sicherheit.',
      en: 'Combining the ligament abnormality with the typical bone bruise pattern increases diagnostic confidence.',
      fa: 'ترکیب یافته رباط با الگوی تیپیک کوفتگی استخوانی اطمینان تشخیصی را بالا می‌برد.',
    },
  },
  {
    id: 'kreuzbaender-05',
    topicId: 'kreuzbaender',
    category: { de: 'VKB-Differenzialdiagnose', en: 'ACL differential', fa: 'افتراق ACL' },
    front: {
      de: 'Wie grenzt man mukoide VKB-Degeneration von Ruptur ab?',
      en: 'How do you distinguish mucoid ACL degeneration from rupture?',
      fa: 'دژنراسیون موکوئید ACL را چگونه از پارگی افتراق می‌دهیم؟',
    },
    answer: {
      de: 'Verdicktes, konturglattes Band mit Sellerie-Zeichen, ohne Traumaödem oder Retraktion.',
      en: 'Thickened, smoothly outlined ligament with celery-stalk sign, without traumatic oedema or retraction.',
      fa: 'رباط ضخیم با کانتور صاف و علامت celery stalk، بدون ادم تروماتیک یا رتراکشن.',
    },
    explanation: {
      de: 'Bei der Degeneration bleiben dunkle Fasern im T2-hellen muzinösen Gewebe erhalten; eine akute Ruptur zeigt eher Diskontinuität, Retraktion und Begleitödem.',
      en: 'Degeneration preserves dark fibres within T2-bright mucinous tissue; an acute tear more often shows discontinuity, retraction and associated oedema.',
      fa: 'در دژنراسیون، فیبرهای تیره داخل بافت موکینی روشن در T2 باقی می‌مانند؛ پارگی حاد بیشتر قطع، رتراکشن و ادم همراه دارد.',
    },
  },
  {
    id: 'kreuzbaender-06',
    topicId: 'kreuzbaender',
    category: { de: 'HKB', en: 'PCL', fa: 'PCL' },
    front: {
      de: 'Was ist der typische Mechanismus der HKB-Ruptur?',
      en: 'What is the typical mechanism of a PCL tear?',
      fa: 'مکانیسم تیپیک پارگی PCL چیست؟',
    },
    answer: {
      de: 'Dashboard Injury: anteriorer Anprall auf die Tibia bei gebeugtem Knie; alternativ extreme Hyperflexion.',
      en: 'Dashboard injury: anterior blow to the tibia with the knee flexed; alternatively extreme hyperflexion.',
      fa: 'Dashboard injury: ضربه از جلو به تیبیا در زانوی خم؛ یا هایپرفلکشن شدید.',
    },
    explanation: {
      de: 'HKB-Rupturen sind deutlich seltener als VKB-Rupturen und werden häufig konservativ behandelt, außer bei ausgeprägter Instabilität oder kombinierten Läsionen.',
      en: 'PCL tears are much less common than ACL tears and are often treated conservatively unless instability is severe or injuries are combined.',
      fa: 'پارگی PCL بسیار نادرتر از ACL است و اغلب محافظه‌کارانه درمان می‌شود، مگر در ناپایداری شدید یا آسیب‌های ترکیبی.',
    },
  },
]
