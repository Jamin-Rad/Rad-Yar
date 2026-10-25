import { KNEE_BICEPS_COMPLETION, KNEE_BICEPS_CORRECT_INDEX } from './kneeBicepsCompletion'

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

const q = (id, question, options, correct, explanation, metadata = {}) => ({ id, question, options, correct, explanation, ...metadata })

const CONTENT = [
  q("grading",
{
  "de": "Welche Beobachtung am medialen Kollateralband beschreibt das gezeigte Bildpaar am treffendsten?",
  "en": "Which observation of the medial collateral ligament best describes the displayed image pair?",
  "fa": "کدام مشاهده دربارهٔ رباط جانبی داخلی، جفت تصاویر نشان‌داده‌شده را بهتر توصیف می‌کند؟"
},
[
  {
    "de": "Initial deutliches Umgebungsödem bei erhaltener Bandkontinuität; im zweiten Bild rückläufig.",
    "en": "Initially prominent surrounding oedema with preserved ligament continuity; reduced on the second image.",
    "fa": "ادم واضح اولیه در اطراف رباط با حفظ پیوستگی آن؛ کاهش ادم در تصویر دوم."
  },
  {
    "de": "Initial flüssigkeitsgefüllte vollständige Bandlücke; im zweiten Bild weiterhin fehlende Kontinuität.",
    "en": "Initially a fluid-filled complete ligament gap, with persistent discontinuity on the second image.",
    "fa": "شکاف کامل رباط با محتوای مایع در ابتدا و تداوم گسستگی در تصویر دوم."
  },
  {
    "de": "Initial knöcherner Bandausriss; im zweiten Bild überbrückender Kallus.",
    "en": "Initially an osseous ligament avulsion, with bridging callus on the second image.",
    "fa": "کندگی استخوانی محل اتصال رباط در ابتدا و کالوس پل‌زننده در تصویر دوم."
  },
  {
    "de": "In beiden Bildern unauffälliges Band ohne sichtbare Umgebungsreaktion.",
    "en": "An unremarkable ligament without visible surrounding reaction on either image.",
    "fa": "رباط بدون تغییر و بدون واکنش قابل مشاهدهٔ اطراف، در هر دو تصویر."
  }
],
"A",
{
  "de": "Links ist periligamentäres Ödem bei kontinuierlich dargestelltem MCL sichtbar, rechts nimmt die Umgebungsreaktion ab. Die Quelle bezeichnet dies als Grad-I-Zerrung. Die eingeblendeten zwei Wochen beschreiben diesen Quellverlauf, keine allgemeine Heilungsfrist oder Freigabe zur Belastung.",
  "en": "The left image shows periligamentous oedema around a continuously depicted MCL; the surrounding reaction decreases on the right. The source labels this a grade-I sprain. The displayed two weeks describe this source follow-up, not a universal healing or return-to-load deadline.",
  "fa": "در تصویر چپ ادم پیرارباطی در اطراف MCL با پیوستگی قابل مشاهده وجود دارد و در سمت راست واکنش اطراف کاهش یافته است. منبع این وضعیت را کشیدگی درجهٔ I می‌نامد. فاصلهٔ دو هفتهٔ درج‌شده مربوط به پیگیری همین منبع است، نه مهلت همگانی ترمیم یا بازگشت به بارگذاری."
},
{
  "wrongExplanations": {
    "B": {
      "de": "Ein vollständiger flüssigkeitsgefüllter Defekt mit getrennten Bandstümpfen ist in diesem Quellpaar nicht das gezeigte Leitmuster.",
      "en": "A complete fluid-filled gap with separated ligament ends is not the predominant pattern in this source pair.",
      "fa": "نقص کامل پر از مایع با انتهای جداشدهٔ رباط، الگوی اصلیِ نشان‌داده‌شده در این جفت تصاویر منبع نیست."
    },
    "C": {
      "de": "Das Paar demonstriert eine Weichteilreaktion um das Band, nicht einen knöchernen Ausriss mit Kallusverlauf.",
      "en": "The pair demonstrates a soft-tissue reaction around the ligament, not an osseous avulsion with callus evolution.",
      "fa": "این جفت تصاویر واکنش بافت نرم اطراف رباط را نشان می‌دهد، نه کندگی استخوانی با سیر تشکیل کالوس."
    },
    "D": {
      "de": "Im linken Bild ist eine deutliche helle Umgebungsreaktion sichtbar; beide Bilder sind daher nicht gleichermaßen unauffällig.",
      "en": "The left image shows a prominent bright surrounding reaction; the two images are not both unremarkable.",
      "fa": "در تصویر چپ واکنش پرسیگنال واضح اطراف دیده می‌شود؛ بنابراین هر دو تصویر به یکسان طبیعی نیستند."
    }
  },
  "source": "MSK.pdf physical61 /printed60; original page and retained MRI pair actually visually inspected2026-10-25",
  "image": {
    "src": "/knieligamente/mcl-sprain-followup.png",
    "alt": {
      "de": "Koronares MRT-Bildpaar des Knies aus MSK.pdf Seite61; links „Trauma“, rechts „nach2Wochen“.",
      "en": "Coronal knee MRI pair from MSK.pdf page61; left labelled “Trauma”, right “after2weeks”.",
      "fa": "جفت تصاویر کرونال MRI زانو از صفحهٔ ۶۱ MSK.pdf؛ برچسب چپ «تروما» و راست «پس از دو هفته»."
    },
    "caption": {
      "de": "Originales Quellpaar ohne zusätzliche Markierungen.",
      "en": "Original source pair without added overlays.",
      "fa": "جفت تصاویر اصلی منبع، بدون علامت‌گذاری افزوده."
    },
    "credit": {
      "de": "MSK.pdf · PDF-Seite61 /Druck60 · Beitragender auf der Seite nicht genannt.",
      "en": "MSK.pdf · PDF page61 /printed60 · no contributor named on the page.",
      "fa": "MSK.pdf · صفحهٔ PDF۶۱ /چاپی۶۰ · نام مشارکت‌کننده در صفحه ذکر نشده است."
    }
  }
}),
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
  q("arcuate-sign",
{
  "de": "Nach Knietrauma zeigt sich ein knöcherner Ausriss am Fibulastyloid (Arcuate Sign). Welcher Verletzungskomplex muss gezielt mitbeurteilt werden?",
  "en": "After knee trauma, a fibular styloid avulsion (arcuate sign) is seen. Which injury complex requires targeted assessment?",
  "fa": "پس از ترومای زانو، کندگی استخوانی زائدهٔ استیلوئید فیبولا (علامت آرکوات) دیده می‌شود. کدام مجموعهٔ آسیب باید هدفمند ارزیابی شود؟"
},
[
  {
    "de": "Posterolaterale Stabilisatoren und Kreuzbänder.",
    "en": "Posterolateral stabilizers and cruciate ligaments.",
    "fa": "پایدارکننده‌های خلفی‌ـ‌خارجی و رباط‌های صلیبی."
  },
  {
    "de": "Medialer patellofemoraler Halteapparat.",
    "en": "Medial patellofemoral restraints.",
    "fa": "ساختارهای مهارکنندهٔ کشککی‌ـ‌رانی داخلی."
  },
  {
    "de": "Distaler Streckapparat an der Tuberositas tibiae.",
    "en": "Distal extensor mechanism at the tibial tuberosity.",
    "fa": "مکانیسم اکستانسور دیستال در برجستگی درشت‌نی."
  },
  {
    "de": "Posteromediale Kapsel und Semimembranosusansatz.",
    "en": "Posteromedial capsule and semimembranosus insertion.",
    "fa": "کپسول خلفی‌ـ‌داخلی و اتصال نیم‌غشایی."
  }
],
"A",
{
  "de": "Das Arcuate Sign weist auf eine Verletzung von Strukturen hin, die am Fibulakopf/-styloid ansetzen. Posterolaterale Strukturen und Kreuzbänder gezielt prüfen; das Zeichen allein bestimmt nicht den gesamten Verletzungsumfang oder eine Therapie.",
  "en": "The arcuate sign indicates injury to structures inserting at the fibular head/styloid. Assess posterolateral structures and cruciate ligaments; the sign alone does not determine the entire injury extent or treatment.",
  "fa": "علامت آرکوات به آسیب ساختارهای متصل به سر/استیلوئید فیبولا اشاره دارد. ساختارهای خلفی‌ـ‌خارجی و رباط‌های صلیبی را هدفمند بررسی کنید؛ این علامت به‌تنهایی وسعت کامل آسیب یا درمان را تعیین نمی‌کند."
},
{
  "wrongExplanations": {
    "B": {
      "de": "Ein fibulärer Ausriss liegt nicht am patellaren oder femoralen Ansatz des MPFL.",
      "en": "A fibular avulsion is not at a patellar or femoral MPFL attachment.",
      "fa": "کندگی فیبولا در محل اتصال کشککی یا رانی MPFL نیست."
    },
    "C": {
      "de": "Die Tuberositas tibiae ist der Patellarsehnenansatz; sie liegt nicht am Fibulastyloid.",
      "en": "The tibial tuberosity is the patellar tendon attachment, not the fibular styloid.",
      "fa": "برجستگی درشت‌نی محل اتصال تاندون کشککی است، نه استیلوئید فیبولا."
    },
    "D": {
      "de": "Diese Strukturen gehören zur posteromedialen Seite; der fibuläre Ausriss lenkt zunächst auf den posterolateralen Komplex.",
      "en": "These structures are posteromedial; fibular avulsion first directs attention to the posterolateral complex.",
      "fa": "این ساختارها در سمت خلفی‌ـ‌داخلی‌اند؛ کندگی فیبولا ابتدا توجه را به مجموعهٔ خلفی‌ـ‌خارجی معطوف می‌کند."
    }
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/12540438/; https://pubmed.ncbi.nlm.nih.gov/14520502/"
}),
  q("mcl-pol",
{
  "de": "Bei einer akuten MCL-Verletzung soll auch die posteromediale Stabilisierung beurteilt werden. Welche Bandstruktur gehört gezielt zu dieser Beurteilung?",
  "en": "An acute MCL injury also requires assessment of posteromedial stabilization. Which ligament belongs in this targeted assessment?",
  "fa": "در آسیب حاد MCL، پایداری خلفی‌ـ‌داخلی نیز باید ارزیابی شود. کدام رباط باید در این ارزیابی هدفمند بررسی شود؟"
},
[
  {
    "de": "Posterior Oblique Ligament (POL).",
    "en": "Posterior oblique ligament (POL).",
    "fa": "رباط مایل خلفی (POL)."
  },
  {
    "de": "Popliteofibulares Ligament.",
    "en": "Popliteofibular ligament.",
    "fa": "رباط پوپلیته‌ـ‌فیبولار."
  },
  {
    "de": "Mediales patellofemorales Ligament (MPFL).",
    "en": "Medial patellofemoral ligament (MPFL).",
    "fa": "رباط کشککی‌ـ‌رانی داخلی (MPFL)."
  },
  {
    "de": "Vorderes Kreuzband (VKB).",
    "en": "Anterior cruciate ligament (ACL).",
    "fa": "رباط صلیبی قدامی (ACL)."
  }
],
"A",
{
  "de": "Das POL ist ein eigenständig beurteilbarer Teil des posteromedialen Komplexes. Die primäre MRT-Studie zeigte eine Assoziation mit MCL- und weiteren posteromedialen Verletzungen; eine MCL-Verletzung beweist aber keine POL-Ruptur.",
  "en": "The POL is an independently assessable part of the posteromedial complex. The primary MRI study found association with MCL and other posteromedial injuries; an MCL injury does not itself prove a POL tear.",
  "fa": "POL جزء قابل ارزیابیِ مستقلِ مجموعهٔ خلفی‌ـ‌داخلی است. مطالعهٔ اولیهٔ MRI ارتباط آن را با آسیب MCL و دیگر ساختارهای خلفی‌ـ‌داخلی نشان داد؛ اما آسیب MCL به‌خودی‌خود پارگی POL را ثابت نمی‌کند."
},
{
  "wrongExplanations": {
    "B": {
      "de": "Das popliteofibulare Ligament gehört zum posterolateralen, nicht zum gesuchten posteromedialen Komplex.",
      "en": "The popliteofibular ligament is posterolateral rather than part of the requested posteromedial complex.",
      "fa": "رباط پوپلیته‌ـ‌فیبولار مربوط به مجموعهٔ خلفی‌ـ‌خارجی است، نه خلفی‌ـ‌داخلی مورد سؤال."
    },
    "C": {
      "de": "Das MPFL stabilisiert die Patella medial; es ist nicht das hier gesuchte POL der posteromedialen Kapselregion.",
      "en": "The MPFL restrains the patella medially; it is not the requested POL of the posteromedial capsular region.",
      "fa": "MPFL کشکک را از سمت داخلی مهار می‌کند؛ این رباط، POL ناحیهٔ کپسولی خلفی‌ـ‌داخلی مورد سؤال نیست."
    },
    "D": {
      "de": "Das VKB ist intraartikulär und kein Ersatz für die gezielte POL-Beurteilung; Begleitverletzungen werden zusätzlich geprüft.",
      "en": "The ACL is intra-articular and does not replace targeted POL assessment; associated injuries are assessed separately.",
      "fa": "ACL داخل‌مفصلی است و جای بررسی هدفمند POL را نمی‌گیرد؛ آسیب‌های همراه جداگانه ارزیابی می‌شوند."
    }
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/34626207/"
}),
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
    'acl-xray',
    {
      de: 'Welcher Röntgenbefund ist ein wichtiger Hinweis auf eine VKB-Verletzung?',
      en: 'Which radiographic finding is an important clue to ACL injury?',
      fa: 'کدام یافتهٔ رادیوگرافی سرنخ مهمی برای آسیب ACL است؟',
    },
    [
      { de: 'Segond-Fraktur am lateralen Tibiaplateau', en: 'Segond fracture at the lateral tibial plateau', fa: 'شکستگی Segond در پلاتوی لترال تیبیا' },
      { de: 'Osteophyten am medialen Femurkondylus', en: 'Osteophytes at the medial femoral condyle', fa: 'استئوفیت در کندیل مدیال فمور' },
      { de: 'Patella alta ohne Erguss', en: 'Patella alta without an effusion', fa: 'پاتلا آلتا بدون افیوژن' },
      { de: 'Chondrocalcinose im Meniskus', en: 'Meniscal chondrocalcinosis', fa: 'کندروکلسینوز منیسک' },
    ],
    'A',
    {
      de: 'Die Segond-Fraktur ist im PDF als pathognomonischer Hinweis genannt; im Lerntext bleibt sie als wichtiger Hinweis auf eine VKB-Verletzung formuliert.',
      en: 'The PDF calls the Segond fracture pathognomonic; the lesson phrases it as an important clue to ACL injury.',
      fa: 'PDF شکستگی Segond را پاتوگنومونیک می‌داند؛ متن آموزشی آن را به‌صورت سرنخ مهمی برای آسیب ACL بیان می‌کند.',
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

CONTENT.push(q(
  'biceps-tendon-versus-avulsion',
  Object.fromEntries(['de', 'en', 'fa'].map(lang => [lang, KNEE_BICEPS_COMPLETION[lang].question])),
  [0, 1, 2, 3].map(index => Object.fromEntries(['de', 'en', 'fa'].map(lang => [lang, KNEE_BICEPS_COMPLETION[lang].options[index]]))),
  String.fromCharCode(65 + KNEE_BICEPS_CORRECT_INDEX),
  Object.fromEntries(['de', 'en', 'fa'].map(lang => [lang, KNEE_BICEPS_COMPLETION[lang].feedback[KNEE_BICEPS_CORRECT_INDEX]])),
))

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
      ...(item.wrongExplanations ? { wrongExplanations: Object.fromEntries(Object.entries(item.wrongExplanations).map(([id, text]) => [id, text[lang]])) } : {}),
      ...(item.source ? { source: item.source } : {}),
      ...(item.image ? { image: Object.fromEntries(Object.entries(item.image).map(([key, value]) => [key, typeof value === 'object' ? value[lang] : value])) } : {}),
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
      fa: "علامت آرکوات (Arcuate sign) به چه معناست؟",
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

KNIE_LIGAMENTE_FLASHCARDS.push({
  id: 'kreuzbaender-07',
  topicId: 'kreuzbaender',
  category: { de: 'Biceps femoris / PLC', en: 'Biceps femoris / PLC', fa: 'بایسپس فموریس / PLC' },
  front: {
    de: 'Ist eine distale Biceps-femoris-Ruptur ohne Knochenfragment ein Arcuate Sign?',
    en: 'Is a distal biceps femoris tear without a bone fragment an arcuate sign?',
    fa: 'آیا پارگی دیستال بایسپس فموریس بدون قطعهٔ استخوانی، علامت آرکوات محسوب می‌شود؟',
  },
  answer: {
    de: 'Nein. Das Arcuate Sign bezeichnet eine knöcherne Avulsion am Fibulaköpfchen.',
    en: 'No. The arcuate sign denotes a bony avulsion at the fibular head.',
    fa: 'خیر. علامت آرکوات به آولسیون استخوانی در سر فیبولا اشاره دارد.',
  },
  explanation: Object.fromEntries(['de', 'en', 'fa'].map(lang => [lang, KNEE_BICEPS_COMPLETION[lang].feedback[1]])),
})
