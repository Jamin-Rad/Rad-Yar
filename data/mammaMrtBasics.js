const L = (de, en, fa) => ({ de, en, fa })

const QUESTION_CONTENT = [
  {
    id: 'sensitivity',
    question: L('Was erklärt hauptsächlich die hohe Sensitivität der Mamma-MRT?', 'What mainly explains the high sensitivity of breast MRI?', 'علت اصلی حساسیت بالای MRI پستان چیست؟'),
    options: [
      L('Darstellung von Tumorvaskularisation und Kontrastmittelaufnahme', 'Visualisation of tumour vascularity and contrast enhancement', 'نمایش عروق تومور و الگوی Enhancement پس از تزریق'),
      L('Ausschließliche Darstellung von Verkalkungen', 'Exclusive depiction of calcifications', 'نمایش انحصاری کلسیفیکاسیون‌ها'),
      L('Messung der Brustdichte ohne Kontrastmittel', 'Measurement of breast density without contrast', 'اندازه‌گیری دانسیته پستان بدون کنتراست'),
      L('Beurteilung nur der Implantathülle', 'Assessment of the implant shell only', 'ارزیابی فقط پوشش ایمپلنت'),
    ],
    correct: 'A',
    explanation: L('Die hohe Sensitivität beruht vor allem auf der Darstellung von Tumorvaskularisation und Kontrastmittelaufnahme; die Spezifität ist jedoch begrenzt.', 'Its high sensitivity is mainly based on depicting tumour vascularity and contrast enhancement, while specificity remains limited.', 'حساسیت بالای MRI عمدتاً به نمایش عروق تومور و Enhancement پس از تزریق مربوط می‌شود؛ با این حال اختصاصیت آن محدود است.'),
  },
  {
    id: 'indication',
    question: L('Welche Situation ist eine typische Indikation für die Mamma-MRT?', 'Which situation is a typical indication for breast MRI?', 'کدام مورد، یکی از کاربردهای اصلی MRI پستان است؟'),
    options: [
      L('Hochrisiko-Screening', 'High-risk screening', 'غربالگری پرخطر'),
      L('Ersatz jeder Mammographie bei Durchschnittsrisiko', 'Replacement of every mammogram in average-risk women', 'جایگزینی تمام ماموگرافی‌ها در افراد با خطر متوسط'),
      L('Vermeidung einer indizierten Biopsie', 'Avoidance of an indicated biopsy', 'اجتناب از انجام بیوپسیِ لازم'),
      L('Routineuntersuchung ohne klinische Fragestellung', 'Routine examination without a clinical question', 'بررسی روتین بدون سؤال بالینی'),
    ],
    correct: 'A',
    explanation: L('Die kontrastmittelgestützte MRT ist besonders wichtig beim Hochrisiko-Screening und wird gezielt ergänzend eingesetzt.', 'Contrast-enhanced MRI is particularly important for high-risk screening and is used as a targeted adjunct.', 'MRI با تزریق ماده حاجب، به‌ویژه در غربالگری افراد پرخطر اهمیت دارد و به‌صورت هدفمند در کنار ماموگرافی و سونوگرافی استفاده می‌شود.'),
  },
  {
    id: 'adc',
    question: L('Wie ist ein niedriger ADC in einer Brustläsion zu interpretieren?', 'How should a low ADC in a breast lesion be interpreted?', 'ADC پایین در یک ضایعه پستان چگونه تفسیر می‌شود؟'),
    options: [
      L('Als zusätzlicher Hinweis, nicht als alleiniger Krebsnachweis', 'As an additional clue, not proof of cancer by itself', 'به‌عنوان نشانه تکمیلی، نه اثبات مستقل سرطان'),
      L('Als beweisend für Malignität, wenn gleichzeitig ein hohes DWI-Signal vorliegt', 'As proof of malignancy when high DWI signal is also present', 'اگر هم‌زمان سیگنال DWI بالا باشد، به‌عنوان اثبات بدخیمی'),
      L('Als verlässlich benigne, wenn die Läsion zusätzlich T2-hyperintens ist', 'As reliably benign when the lesion is also T2 hyperintense', 'اگر ضایعه هم‌زمان در T2 پرسیگنال باشد، به‌عنوان یافتهٔ مطمئناً خوش‌خیم'),
      L('Als nicht verwertbar, sofern keine Wash-out-Kinetik vorliegt', 'As non-interpretable unless wash-out kinetics are present', 'در صورت نبود کینتیک Wash-out، به‌عنوان یافتهٔ غیرقابل تفسیر'),
    ],
    correct: 'A',
    explanation: L('DWI und ADC sind zusätzliche Bausteine. Auch benigne Läsionen können niedrige ADC-Werte zeigen.', 'DWI and ADC are adjuncts. Benign lesions can also show low ADC values.', 'DWI و ADC ابزارهای تکمیلی‌اند و ضایعات خوش‌خیم نیز می‌توانند ADC پایین داشته باشند.'),
  },
  {
    id: 'fgt-bpe',
    question: L('Welche Zuordnung von FGT und BPE ist korrekt?', 'Which pairing of FGT and BPE is correct?', 'کدام تطبیق FGT و BPE درست است؟'),
    options: [
      L('FGT = Gewebemenge; BPE = Anreicherung des normalen Gewebes', 'FGT = amount of tissue; BPE = enhancement of normal tissue', 'FGT = مقدار بافت Fibroglandular؛ BPE = میزان Enhancement بافت طبیعی'),
      L('FGT = Anreicherung des normalen Gewebes; BPE = Gewebemenge', 'FGT = enhancement of normal tissue; BPE = amount of tissue', 'FGT = میزان Enhancement بافت طبیعی؛ BPE = مقدار بافت'),
      L('FGT = mammographische Brustdichte; BPE = T2-Signal des Parenchyms', 'FGT = mammographic breast density; BPE = T2 signal of the parenchyma', 'FGT = دانسیتهٔ ماموگرافیک پستان؛ BPE = سیگنال T2 پارانشیم'),
      L('FGT und BPE werden ausschließlich für die Charakterisierung suspekter Läsionen bestimmt', 'FGT and BPE are assessed exclusively to characterise suspicious lesions', 'FGT و BPE فقط برای توصیف ضایعات مشکوک تعیین می‌شوند'),
    ],
    correct: 'A',
    explanation: L('FGT beschreibt die Menge fibroglandulären Gewebes. BPE beschreibt dessen normale Kontrastmittelanreicherung.', 'FGT describes the amount of fibroglandular tissue; BPE describes its normal contrast enhancement.', 'FGT مقدار بافت Fibroglandular را بیان می‌کند؛ BPE نشان می‌دهد این بافت طبیعی پس از تزریق تا چه حد Enhancement دارد.'),
  },
  {
    id: 'focus',
    question: L('Wie ist ein Focus nach BI-RADS in der Mamma-MRT definiert?', 'How is a focus defined in BI-RADS breast MRI?', 'Focus در BI-RADS MRI پستان چگونه تعریف می‌شود؟'),
    options: [
      L('Enhancement < 5 mm, zu klein für sichere Morphologie', 'Enhancement < 5 mm, too small for reliable morphology', 'یک نقطه Enhancement کوچک‌تر از ۵ میلی‌متر که مورفولوژی آن قابل ارزیابی دقیق نیست'),
      L('Jede Läsion über 5 cm', 'Any lesion larger than 5 cm', 'هر ضایعه بزرگ‌تر از ۵ سانتی‌متر'),
      L('Diffuse Hautverdickung', 'Diffuse skin thickening', 'ضخیم‌شدگی منتشر پوست'),
      L('Jede Läsion mit niedrigem ADC', 'Any lesion with a low ADC', 'هر ضایعه با ADC پایین'),
    ],
    correct: 'A',
    explanation: L('Ein Focus ist kleiner als 5 mm und daher zu klein für eine zuverlässige morphologische Charakterisierung.', 'A focus is smaller than 5 mm and therefore too small for reliable morphological characterisation.', 'Focus کوچک‌تر از ۵ میلی‌متر است و برای توصیف قابل اعتماد مورفولوژیک بیش از حد کوچک است.'),
  },
  {
    id: 'nme',
    question: L('Was kennzeichnet ein Non-Mass Enhancement?', 'What characterises non-mass enhancement?', 'کدام تعریف برای Non-Mass Enhancement درست است؟'),
    options: [
      L('Enhancement ohne dreidimensionale Raumforderung, abgrenzbar vom BPE', 'Enhancement without a three-dimensional mass, distinguishable from BPE', 'Enhancement قابل تفکیک از BPE که یک Mass سه‌بعدی تشکیل نمی‌دهد'),
      L('Eine sicher zystische Raumforderung', 'A definitely cystic mass', 'یک توده قطعاً کیستیک'),
      L('Ein Punkt unter 5 mm', 'A dot smaller than 5 mm', 'یک نقطه کمتر از ۵ میلی‌متر'),
      L('Normales symmetrisches BPE', 'Normal symmetric BPE', 'BPE طبیعی و متقارن'),
    ],
    correct: 'A',
    explanation: L('NME ist vom normalen BPE abgrenzbar, bildet aber keine dreidimensionale Mass und ist nicht nur ein kleiner Focus.', 'NME is distinguishable from normal BPE but does not form a three-dimensional mass and is not merely a small focus.', 'NME از BPE طبیعی قابل تفکیک است، اما توده سه‌بعدی ایجاد نمی‌کند و صرفاً یک Focus کوچک نیست.'),
  },
  {
    id: 'biopsy',
    question: L('Welche Aussage zum Problem Solving ist richtig?', 'Which statement about problem solving is correct?', 'کدام عبارت درباره Problem Solving صحیح است؟'),
    options: [
      L('Eine indizierte Biopsie darf durch MRT nicht umgangen werden.', 'MRI must not be used to avoid an indicated biopsy.', 'نباید از MRI برای جلوگیری از انجام بیوپسیِ لازم استفاده کرد.'),
      L('MRT ersetzt immer die Histologie.', 'MRI always replaces histology.', 'MRI همیشه جایگزین نمونه‌برداری و بررسی بافت‌شناسی است.'),
      L('Jeder suspekte Befund wird nur kontrolliert.', 'Every suspicious finding is followed only.', 'هر یافته مشکوک فقط پیگیری می‌شود.'),
      L('Sonographie ist vor MRT nie erforderlich.', 'Ultrasound is never required before MRI.', 'سونوگرافی پیش از MRI هرگز لازم نیست.'),
    ],
    correct: 'A',
    explanation: L('Ein klar suspekter und bioptisch zugänglicher Befund sollte in der Regel histologisch abgeklärt werden.', 'A clearly suspicious and biopsy-accessible finding should generally undergo histological assessment.', 'یافته واضحاً مشکوک و قابل بیوپسی معمولاً باید از نظر بافت‌شناسی بررسی شود.'),
  },
  {
    id: 'workflow',
    question: L('Was ist der erste Schritt bei einem auffälligen Enhancement?', 'What is the first step when an abnormal enhancement is found?', 'اولین گام در برخورد با یک ناحیه دارای Enhancement غیرطبیعی چیست؟'),
    options: [
      L('Zuerst Focus, Mass oder NME zuordnen', 'First classify it as focus, mass or NME', 'ابتدا آن را به Focus، Mass یا NME طبقه‌بندی کنید'),
      L('Zuerst anhand von DWI und ADC zwischen benigne und maligne entscheiden', 'First decide between benign and malignant using DWI and ADC', 'ابتدا فقط بر اساس DWI و ADC دربارهٔ خوش‌خیم یا بدخیم بودن تصمیم بگیرید'),
      L('Zuerst die Kinetikkurve auswerten und die morphologische Kategorie nur bei Wash-out festlegen', 'First assess the kinetic curve and assign a morphological category only if wash-out is present', 'ابتدا منحنی کینتیک را ارزیابی کنید و فقط در صورت وجود Wash-out دستهٔ مورفولوژیک را تعیین کنید'),
      L('Jedes Enhancement isoliert beurteilen, ohne es mit dem umgebenden BPE zu vergleichen', 'Assess each enhancement in isolation without comparing it with the surrounding BPE', 'هر Enhancement را بدون مقایسه با BPE اطراف، به‌صورت جداگانه ارزیابی کنید'),
    ],
    correct: 'A',
    explanation: L('Vor Morphologie, Diffusion und Kinetik wird das Enhancement zunächst als Focus, Mass oder NME eingeordnet.', 'Before assessing morphology, diffusion and kinetics, enhancement is first classified as a focus, mass or NME.', 'پیش از ارزیابی Morphology، Diffusion و Kinetics، یافته را ابتدا به‌عنوان Focus، Mass یا NME طبقه‌بندی می‌کنیم.'),
  },
]

export const MAMMA_MRT_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [lang, QUESTION_CONTENT.map(item => ({
  id: `mamma-mrt-basics-${lang}-${item.id}`,
  tags: ['mamma-mrt-basics', 'mamma', 'mrt'],
  fach: 'mamma',
  question: item.question[lang],
  options: item.options.map((text, index) => ({ id: String.fromCharCode(65 + index), text: text[lang] })),
  correct: item.correct,
  explanation: item.explanation[lang],
}))]))

const FLASHCARD_CONTENT = [
  ['Protokoll', 'Welche Funktionen hat die T1-Sequenz vor Kontrastmittel in einem Mamma-MRT-Protokoll?', 'Sie dient als Ausgangsbasis und ermöglicht die spätere Subtraktion.', 'Zusätzlich hilft sie, Fett, Blutprodukte und vorbestehend hohes T1-Signal zu erkennen.', 'Protocol', 'What are the functions of the pre-contrast T1 sequence in a breast MRI protocol?', 'It provides the baseline and enables subsequent subtraction.', 'It also helps identify fat, blood products and pre-existing high T1 signal.', 'پروتکل', 'سکانس T1 پیش از تزریق در پروتکل MRI پستان چه کاربردهایی دارد؟', 'تصویر پایه را فراهم می‌کند و Subtraction بعدی را امکان‌پذیر می‌سازد.', 'همچنین در تشخیص چربی، محصولات خونی و سیگنال بالای T1 که پیش از تزریق وجود داشته کمک‌کننده است.'],
  ['Subtraktion', 'Welchen diagnostischen Zweck erfüllt die Subtraktion in der kontrastmittelgestützten Mamma-MRT?', 'Sie macht echtes Kontrastmittel-Enhancement deutlich besser sichtbar.', 'Dazu wird das Präkontrastbild vereinfacht vom Postkontrastbild abgezogen.', 'Subtraction', 'What diagnostic purpose does subtraction serve in contrast-enhanced breast MRI?', 'It makes true contrast enhancement much more conspicuous.', 'The pre-contrast image is subtracted from the post-contrast image.', 'Subtraction', 'Subtraction در MRI پستان با تزریق چه هدف تشخیصی دارد؟', 'Enhancement واقعی پس از تزریق را بسیار واضح‌تر می‌کند.', 'برای این کار تصویر پیش از تزریق از تصویر پس از تزریق کم می‌شود.'],
  ['MIP', 'Wofür wird die MIP bei der systematischen Auswertung einer Mamma-MRT eingesetzt?', 'Für einen schnellen Überblick über beide Brüste und zum Suchen auffälliger Enhancements.', 'Die endgültige Beurteilung muss in den Quellbildern erfolgen.', 'MIP', 'How is the MIP used during systematic breast MRI interpretation?', 'For a rapid bilateral overview and to search for suspicious enhancement.', 'Final assessment must be performed on the source images.', 'MIP', 'MIP در ارزیابی سیستماتیک MRI پستان چه کاربردی دارد؟', 'برای مرور سریع هر دو پستان و جست‌وجوی Enhancementهای مشکوک.', 'ارزیابی نهایی باید در تصاویر اصلی انجام شود.'],
  ['Diffusion', 'Bedeutet ein niedriger ADC bei einer Läsion in der Mamma-MRT automatisch Mammakarzinom?', 'Nein.', 'DWI und ADC sind zusätzliche Bausteine und müssen mit Morphologie, T2-Signal und Kinetik korreliert werden.', 'Diffusion', 'Does a low ADC in a breast MRI lesion automatically indicate breast cancer?', 'No.', 'DWI and ADC are adjuncts and must be correlated with morphology, T2 signal and kinetics.', 'Diffusion', 'آیا ADC پایین در یک ضایعه در MRI پستان خودبه‌خود به معنی سرطان پستان است؟', 'خیر.', 'DWI و ADC یافته‌های تکمیلی‌اند و باید با مورفولوژی، سیگنال T2 و کینتیک تطبیق داده شوند.'],
  ['FGT', 'Was beschreibt FGT bei der Befundung einer Mamma-MRT?', 'Die Menge des fibroglandulären Brustgewebes.', 'FGT ist unabhängig davon, wie stark dieses Gewebe nach Kontrastmittelgabe anreichert.', 'FGT', 'What does FGT describe in breast MRI reporting?', 'The amount of fibroglandular breast tissue.', 'FGT is independent of how strongly that tissue enhances after contrast.', 'FGT', 'FGT در گزارش MRI پستان چه چیزی را توصیف می‌کند؟', 'مقدار بافت Fibroglandular پستان.', 'FGT مستقل از میزان Enhancement این بافت پس از تزریق است.'],
  ['BPE', 'Was beschreibt BPE bei der Befundung einer kontrastmittelgestützten Mamma-MRT?', 'Die Kontrastmittelanreicherung des normalen fibroglandulären Gewebes.', 'Die BI-RADS-Kategorien sind minimal, mild, moderate und marked.', 'BPE', 'What does BPE describe in contrast-enhanced breast MRI reporting?', 'Contrast enhancement of normal fibroglandular tissue.', 'The BI-RADS categories are minimal, mild, moderate and marked.', 'BPE', 'BPE در گزارش MRI پستان با تزریق چه چیزی را توصیف می‌کند؟', 'میزان Enhancement بافت طبیعی Fibroglandular پس از تزریق.', 'دسته‌های BI-RADS شامل minimal، mild، moderate و marked هستند.'],
  ['Focus', 'Wie ist ein Focus nach BI-RADS in der Mamma-MRT definiert?', 'Ein punktförmiges Enhancement kleiner als 5 mm.', 'Es ist zu klein für eine zuverlässige morphologische Charakterisierung.', 'Focus', 'How is a focus defined by BI-RADS in breast MRI?', 'A punctate enhancement smaller than 5 mm.', 'It is too small for reliable morphological characterisation.', 'Focus', 'Focus بر اساس BI-RADS در MRI پستان چگونه تعریف می‌شود؟', 'یک Enhancement نقطه‌ای کوچک‌تر از ۵ میلی‌متر.', 'برای توصیف مطمئن مورفولوژیک بیش از حد کوچک است.'],
  ['Mass', 'Wie ist eine Mass in der Mamma-MRT definiert und welche Merkmale werden beurteilt?', 'Eine Mass ist eine echte dreidimensionale Läsion.', 'Beurteilt werden Form, Rand und internes Enhancement.', 'Mass', 'How is a mass defined in breast MRI and which features are assessed?', 'A mass is a true three-dimensional lesion.', 'Shape, margin and internal enhancement are assessed.', 'Mass', 'Mass در MRI پستان چگونه تعریف می‌شود و چه ویژگی‌هایی ارزیابی می‌شوند؟', 'Mass یک ضایعهٔ واقعی و سه‌بعدی است.', 'شکل، حاشیه و الگوی Internal enhancement آن ارزیابی می‌شوند.'],
  ['NME', 'Wie ist ein Non-Mass Enhancement in der Mamma-MRT definiert?', 'Ein vom normalen BPE abgrenzbares Enhancement ohne dreidimensionale Mass.', 'Es bildet keine Mass und ist nicht lediglich ein kleiner Focus.', 'NME', 'How is non-mass enhancement defined in breast MRI?', 'Enhancement distinguishable from normal BPE without a three-dimensional mass.', 'It does not form a mass and is not merely a small focus.', 'NME', 'Non-Mass Enhancement در MRI پستان چگونه تعریف می‌شود؟', 'Enhancement قابل تفکیک از BPE طبیعی که Mass سه‌بعدی تشکیل نمی‌دهد.', 'این یافته Mass نیست و صرفاً یک Focus کوچک نیز محسوب نمی‌شود.'],
]

export const MAMMA_MRT_FLASHCARDS = FLASHCARD_CONTENT.map((item, index) => ({
  id: `mamma-mrt-basics-${String(index + 1).padStart(2, '0')}`,
  topicId: 'mamma-mrt-basics',
  category: L(item[0], item[4], item[8]),
  front: L(item[1], item[5], item[9]),
  answer: L(item[2], item[6], item[10]),
  explanation: L(item[3], item[7], item[11]),
}))

export const MAMMA_MRT_FLASHCARD_TOPIC = {
  id: 'mamma-mrt-basics', area: 'Mamma', chapter: 'Bildgebung · MRT', icon: 'MR', iconImage: '/fach/mamma.png', color: '#db2777', href: '/flashcards/mamma-mrt-basics',
  title: L('Mamma-MRT: Basics', 'Breast MRI: Basics', 'MRI پستان: مبانی'),
  subtitle: L('Indikationen · Sequenzen · FGT/BPE · Enhancement-Typen', 'Indications · sequences · FGT/BPE · enhancement types', 'موارد کاربرد · MRI Sequences · FGT/BPE · انواع Enhancement'),
}
