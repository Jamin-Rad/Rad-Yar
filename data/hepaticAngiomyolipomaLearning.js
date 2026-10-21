const L = (de, en, fa) => ({ de, en, fa })

const items = [
  {
    id: 'hepatisches-angiomyolipom-fat',
    question: L(
      'Eine Leberläsion zeigt kaum sichtbares Fett. Welche Aussage zum hepatischen Angiomyolipom (HAML) passt am besten?',
      'A liver lesion contains little visible fat. Which statement about hepatic angiomyolipoma (HAML) is most accurate?',
      'در یک ضایعه کبدی چربی قابل مشاهده بسیار کم است. کدام عبارت درباره آنژیومیولیپوم کبدی (HAML) دقیق‌تر است؟'
    ),
    options: [
      L('HAML ist damit ausgeschlossen.', 'This excludes HAML.', 'با این یافته HAML رد می‌شود.'),
      L('Fett kann spärlich oder nicht sichtbar sein; HCC kann ebenfalls Fett enthalten.', 'Fat may be sparse or not visible; HCC can also contain fat.', 'چربی ممکن است کم یا نامشهود باشد؛ HCC نیز می‌تواند چربی داشته باشد.'),
      L('Jede Läsion mit Fett ist sicher HAML.', 'Any lesion containing fat is definitely HAML.', 'هر ضایعه دارای چربی قطعاً HAML است.'),
      L('Ein einzelner negativer HU-Wert beweist HAML.', 'A single negative HU value proves HAML.', 'یک مقدار HU منفی به‌تنهایی HAML را ثابت می‌کند.'),
    ], correct: 'B',
    explanation: L(
      'Der Fettanteil kann klein sein oder fehlen, und auch HCC kann Fett enthalten. Fett ist ein Hinweis, aber kein alleiniger Beweis.',
      'The fat component may be small or absent, and HCC can also contain fat. Fat is a clue, not proof on its own.',
      'مقدار چربی می‌تواند کم یا غایب باشد و HCC نیز ممکن است چربی داشته باشد. چربی سرنخ است، نه اثبات قطعی.'
    ),
  },
  {
    id: 'hepatisches-angiomyolipom-washout',
    question: L(
      'Welche Aussage unterscheidet die PDF-Angaben zu Wash-out korrekt von der externen Wang-Serie?',
      'Which statement correctly distinguishes the PDF discussion of wash-out from the external Wang series?',
      'کدام عبارت بحث wash-out در PDF را به‌درستی از سری مستقل Wang تفکیک می‌کند؟'
    ),
    options: [
      L('Wash-out schließt HAML aus.', 'Wash-out excludes HAML.', 'wash-out، HAML را رد می‌کند.'),
      L('Fehlendes Wash-out bestätigt HAML.', 'Absence of wash-out confirms HAML.', 'نبود wash-out، HAML را تأیید می‌کند.'),
      L('Die PDF selbst berichtet frühes Wash-out in zwei AML-Fällen mit TSC.', 'The PDF itself reports early wash-out in two AML cases with TSC.', 'خود PDF در دو مورد AML همراه TSC، wash-out زودرس گزارش می‌کند.'),
      L('Die PDF beschreibt kein typisches Wash-out; die separate Wang-Serie berichtet frühes Wash-out in zwei TSC-Fällen. Das Muster ist variabel.', 'The PDF describes no typical wash-out; the separate Wang series reports early wash-out in two TSC cases. The pattern is variable.', 'PDF، wash-out تیپیک را توصیف نمی‌کند؛ سری مستقل Wang در دو مورد TSC، wash-out زودرس گزارش کرده است. الگو متغیر است.'),
    ], correct: 'D',
    explanation: L(
      'Die PDF-Seite 12 beschreibt kein typisches Wash-out und eine späte Angleichung; Seite 13 nennt fehlendes Wash-out als Unterschied zu HCC. Die separate Wang-Serie berichtet frühes Wash-out in zwei TSC-Fällen. Diese Angaben stammen aus unterschiedlichen Quellen und zeigen variable Muster.',
      'PDF page 12 describes no typical wash-out and late equalisation; page 13 lists absent wash-out as a difference from HCC. The separate Wang series reports early wash-out in two TSC cases. These are findings from different sources and show variable patterns.',
      'صفحه ۱۲ PDF نبود wash-out تیپیک و هم‌سطح‌شدن تأخیری را شرح می‌دهد؛ صفحه ۱۳ نبود wash-out را تفاوت با HCC می‌داند. سری جداگانه Wang در دو مورد TSC، wash-out زودرس گزارش کرده است. این یافته‌ها از منابع متفاوت‌اند و تنوع الگوها را نشان می‌دهند.'
    ),
  },
  {
    id: 'hepatisches-angiomyolipom-hcc',
    question: L(
      'Welche Aussage zur Differenzialdiagnose HAML versus HCC ist am besten begründet?',
      'Which statement about the HAML versus HCC differential is best supported?',
      'کدام عبارت درباره افتراق HAML از HCC مستندتر است؟'
    ),
    options: [
      L('HCC enthält nie Fett.', 'HCC never contains fat.', 'HCC هرگز چربی ندارد.'),
      L('Arterielle Hypervaskularität allein beweist HAML.', 'Arterial hypervascularity alone proves HAML.', 'پرعروقی شریانی به‌تنهایی HAML را ثابت می‌کند.'),
      L('HCC kann Fett enthalten und HAML imitieren; Kontext, Kapsel, Gefäßmuster und Voraufnahmen gemeinsam beurteilen.', 'HCC can contain fat and mimic HAML; assess context, capsule, vascular pattern and prior studies together.', 'HCC می‌تواند چربی داشته باشد و HAML را تقلید کند؛ زمینه، کپسول، الگوی عروقی و تصاویر قبلی را با هم بسنجید.'),
      L('Ein früher drainierender Venenast schließt HCC sicher aus.', 'An early draining vein branch definitively excludes HCC.', 'ورید تخلیه‌کننده زودرس HCC را قطعاً رد می‌کند.'),
    ], correct: 'C',
    explanation: L(
      'HCC kann makroskopisches oder mikroskopisches Fett enthalten. Die Merkmale und der klinische HCC-Risikokontext müssen gemeinsam gewertet werden; einzelne Zeichen sind nicht beweisend.',
      'HCC can contain macroscopic or microscopic fat. Imaging features and the clinical HCC risk context must be assessed together; no single sign is definitive.',
      'HCC می‌تواند چربی ماکروسکوپیک یا میکروسکوپیک داشته باشد. یافته‌های تصویری و زمینه خطر بالینی HCC باید با هم ارزیابی شوند؛ هیچ علامت منفردی قطعی نیست.'
    ),
  },
  {
    id: 'hepatisches-angiomyolipom-report',
    question: L(
      'Welche Angaben gehören zur strukturierten Beschreibung einer überlappenden Leberläsion mit HAML-Verdacht?',
      'Which details belong in a structured description of an overlapping liver lesion suspicious for HAML?',
      'برای توصیف ساختاریافته ضایعه کبدی همپوشان با شک به HAML، کدام موارد باید ثبت شوند؟'
    ),
    options: [
      L('Nur der vermutete Tumorname.', 'Only the suspected tumour name.', 'فقط نام تومور احتمالی.'),
      L('Segment, Größe/Zahl, Fettmuster, Gefäß- und Phasenmuster, Hintergrundleber/Risikokontext sowie Unsicherheit.', 'Segment, size/count, fat pattern, vascular and phase pattern, background liver/risk context, and uncertainty.', 'سگمان، اندازه/تعداد، الگوی چربی، الگوی عروقی و فازها، پارانشیم زمینه/زمینه خطر و عدم قطعیت.'),
      L('Nur ein HU-Wert und die arterielle Phase.', 'Only one HU value and the arterial phase.', 'فقط یک مقدار HU و فاز شریانی.'),
      L('Eine definitive Diagnose ohne Angabe der Voraufnahmen.', 'A definitive diagnosis without mentioning prior studies.', 'تشخیص قطعی بدون اشاره به تصاویر قبلی.'),
    ], correct: 'B',
    explanation: L(
      'Die Lektion empfiehlt Segment, Größe und Zahl, Fett, Gefäßmuster und Phasen, Hintergrundleber/HCC-Risiko und Voraufnahmen; bei Überlappung soll Unsicherheit benannt werden.',
      'The lesson calls for segment, size and count, fat, vascular pattern and phases, background liver/HCC risk and prior studies; uncertainty should be stated when findings overlap.',
      'درس ثبت سگمان، اندازه و تعداد، چربی، الگوی عروقی و فازها، پارانشیم زمینه/خطر HCC و تصاویر قبلی را توصیه می‌کند؛ در یافته‌های همپوشان باید عدم قطعیت بیان شود.'
    ),
  },
]

export const HEPATIC_ANGIOMYOLIPOMA_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [
  lang,
  items.map((item, index) => ({
    id: `${item.id}-${lang}`,
    topicId: 'hepatisches-angiomyolipom',
    tags: ['hepatisches-angiomyolipom'],
    fach: 'abdomen',
    question: item.question[lang],
    options: item.options.map((option, optionIndex) => ({ id: String.fromCharCode(65 + optionIndex), text: option[lang] })),
    correct: item.correct,
    explanation: item.explanation[lang],
    source: index === 1
      ? `Abdomen.pdf, pp. 12–13; Wang et al., 2009 (PMC2712904); hepatic AML lesson /abdomen/leber/angiomyolipom; question ${index + 1}`
      : `Abdomen.pdf, pp. 12–13; hepatic AML lesson /abdomen/leber/angiomyolipom; question ${index + 1}`,
  }))
]))

export const HEPATIC_ANGIOMYOLIPOMA_FLASHCARD_TOPIC = {
  id: 'hepatisches-angiomyolipom', area: 'Abdomen', chapter: 'Leber', icon: 'CT', iconImage: '/fach/abdomen.png', color: '#0f766e', href: '/flashcards/hepatisches-angiomyolipom',
  title: L('Hepatisches Angiomyolipom', 'Hepatic angiomyolipoma', 'آنژیومیولیپوم کبدی'),
  subtitle: L('Fett · Enhancement-Variabilität · HCC-DD · strukturierter Befund', 'Fat · variable enhancement · HCC differential · structured report', 'چربی · تغییرپذیری جذب · افتراق HCC · گزارش ساختاریافته'),
}

export const HEPATIC_ANGIOMYOLIPOMA_FLASHCARDS = [
  ['fat', L('Beweist sichtbares Fett HAML?', 'Does visible fat prove HAML?', 'آیا چربی قابل مشاهده HAML را ثابت می‌کند؟'), L('Nein. Fett kann spärlich oder nicht sichtbar sein; auch HCC kann Fett enthalten.', 'No. Fat may be sparse or absent; HCC can also contain fat.', 'خیر. چربی ممکن است کم یا غایب باشد؛ HCC نیز می‌تواند چربی داشته باشد.')],
  ['washout', L('Wie unterscheiden sich PDF S. 12–13 und die externe Wang-Serie beim Wash-out?', 'How do PDF pp. 12–13 and the external Wang series differ on wash-out?', 'PDF صفحات ۱۲–۱۳ و سری مستقل Wang درباره wash-out چه تفاوتی دارند؟'), L('Die PDF beschreibt kein typisches Wash-out; Wang et al. berichten frühes Wash-out in zwei TSC-Fällen. Die Muster sind variabel.', 'The PDF describes no typical wash-out; Wang et al. report early wash-out in two TSC cases. Patterns are variable.', 'PDF نبود wash-out تیپیک را توصیف می‌کند؛ Wang و همکاران در دو مورد TSC، wash-out زودرس گزارش کرده‌اند. الگوها متغیرند.')],
  ['hcc', L('Warum bleibt HCC eine wichtige Differenzialdiagnose?', 'Why does HCC remain an important differential?', 'چرا HCC همچنان یک تشخیص افتراقی مهم است؟'), L('HCC kann Fett enthalten und HAML imitieren; deshalb Gefäßmuster und klinischen Risikokontext zusammen beurteilen.', 'HCC can contain fat and mimic HAML; assess vascular pattern and clinical risk context together.', 'HCC می‌تواند چربی داشته باشد و HAML را تقلید کند؛ بنابراین الگوی عروقی و زمینه خطر بالینی را با هم ارزیابی کنید.')],
  ['report', L('Welche Kernpunkte nennt der strukturierte HAML-Befund?', 'Which core items belong in a structured HAML report?', 'گزارش ساختاریافته HAML شامل چه نکات اصلی است؟'), L('Segment, Größe/Zahl, Fett, Gefäßmuster und Phasen, Hintergrundleber/Risikokontext, Voraufnahmen und benannte Unsicherheit.', 'Segment, size/count, fat, vascular pattern and phases, background liver/risk context, prior studies and stated uncertainty.', 'سگمان، اندازه/تعداد، چربی، الگوی عروقی و فازها، پارانشیم زمینه/زمینه خطر، تصاویر قبلی و بیان عدم قطعیت.')],
].map(([id, front, answer]) => ({
  id: `hepatisches-angiomyolipom-${id}`,
  topicId: 'hepatisches-angiomyolipom',
  category: L('Hepatisches AML', 'Hepatic AML', 'AML کبدی'),
  front,
  answer,
  explanation: id === 'washout'
    ? L('PDF S. 12–13: kein typisches Wash-out. Die separate Wang-Serie (2009) beschreibt frühes Wash-out in zwei TSC-Fällen.', 'PDF pp. 12–13: no typical wash-out. The separate Wang series (2009) describes early wash-out in two TSC cases.', 'PDF صفحات ۱۲–۱۳: نبود wash-out تیپیک. سری جداگانه Wang (۲۰۰۹) در دو مورد TSC، wash-out زودرس را شرح می‌دهد.')
    : L('Quelle: Abdomen.pdf, S. 12–13; bestehende dreisprachige HAML-Lektion.', 'Source: Abdomen.pdf, pp. 12–13; existing three-language HAML lesson.', 'منبع: Abdomen.pdf، صفحات ۱۲–۱۳؛ درس سه‌زبانه موجود HAML.'),
}))
