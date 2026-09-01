const L = (de, en, fa) => ({ de, en, fa })

const QUESTION_CONTENT = [
  {
    id: 'sensitivity',
    question: L('Was erklärt hauptsächlich die hohe Sensitivität der Mamma-MRT?', 'What mainly explains the high sensitivity of breast MRI?', 'علت اصلی حساسیت بالای MRI پستان چیست؟'),
    options: [
      L('Darstellung von Tumorvaskularisation und Kontrastmittelaufnahme', 'Visualisation of tumour vascularity and contrast enhancement', 'نمایش عروق تومور و جذب ماده حاجب'),
      L('Ausschließliche Darstellung von Verkalkungen', 'Exclusive depiction of calcifications', 'نمایش انحصاری کلسیفیکاسیون‌ها'),
      L('Messung der Brustdichte ohne Kontrastmittel', 'Measurement of breast density without contrast', 'اندازه‌گیری دانسیته پستان بدون کنتراست'),
      L('Beurteilung nur der Implantathülle', 'Assessment of the implant shell only', 'ارزیابی فقط پوشش ایمپلنت'),
    ],
    correct: 'A',
    explanation: L('Die hohe Sensitivität beruht vor allem auf der Darstellung von Tumorvaskularisation und Kontrastmittelaufnahme; die Spezifität ist jedoch begrenzt.', 'Its high sensitivity is mainly based on depicting tumour vascularity and contrast enhancement, while specificity remains limited.', 'حساسیت بالا عمدتاً بر نمایش عروق تومور و جذب ماده حاجب استوار است، اما ویژگی محدود باقی می‌ماند.'),
  },
  {
    id: 'indication',
    question: L('Welche Situation ist eine typische Indikation für die Mamma-MRT?', 'Which situation is a typical indication for breast MRI?', 'کدام وضعیت یک اندیکاسیون تیپیک برای MRI پستان است؟'),
    options: [
      L('Hochrisiko-Screening', 'High-risk screening', 'غربالگری پرخطر'),
      L('Ersatz jeder Mammographie bei Durchschnittsrisiko', 'Replacement of every mammogram in average-risk women', 'جایگزینی تمام ماموگرافی‌ها در افراد با خطر متوسط'),
      L('Vermeidung einer indizierten Biopsie', 'Avoidance of an indicated biopsy', 'اجتناب از بیوپسی اندیکاسیون‌دار'),
      L('Routineuntersuchung ohne klinische Fragestellung', 'Routine examination without a clinical question', 'بررسی روتین بدون سؤال بالینی'),
    ],
    correct: 'A',
    explanation: L('Die kontrastmittelgestützte MRT ist besonders wichtig beim Hochrisiko-Screening und wird gezielt ergänzend eingesetzt.', 'Contrast-enhanced MRI is particularly important for high-risk screening and is used as a targeted adjunct.', 'MRI با کنتراست به‌ویژه در غربالگری افراد پرخطر اهمیت دارد و به‌صورت هدفمند و تکمیلی استفاده می‌شود.'),
  },
  {
    id: 'subtraction',
    question: L('Wozu dient die Subtraktion in der Mamma-MRT?', 'What is subtraction used for in breast MRI?', 'ساب‌ترکشن در MRI پستان چه کاربردی دارد؟'),
    options: [
      L('Enhancement deutlicher sichtbar zu machen', 'To make enhancement more conspicuous', 'واضح‌تر کردن نواحی جذب کنتراست'),
      L('Den ADC automatisch zu erhöhen', 'To automatically increase the ADC', 'افزایش خودکار ADC'),
      L('Verkalkungen zu quantifizieren', 'To quantify calcifications', 'اندازه‌گیری کلسیفیکاسیون‌ها'),
      L('Die T2-Sequenz zu ersetzen', 'To replace the T2 sequence', 'جایگزینی سکانس T2'),
    ],
    correct: 'A',
    explanation: L('Das Präkontrastbild wird vom Postkontrastbild abgezogen. Dadurch lässt sich echtes Enhancement leichter erkennen.', 'The pre-contrast image is subtracted from the post-contrast image, making true enhancement easier to detect.', 'تصویر پیش از کنتراست از تصویر پس از کنتراست کم می‌شود و جذب واقعی کنتراست بهتر دیده می‌شود.'),
  },
  {
    id: 'mip',
    question: L('Welche Aussage zur MIP ist richtig?', 'Which statement about the MIP is correct?', 'کدام عبارت درباره MIP صحیح است؟'),
    options: [
      L('Sie eignet sich zum schnellen Suchen, nicht zur endgültigen Beurteilung.', 'It is excellent for a rapid search, but not for final assessment.', 'برای جست‌وجوی سریع عالی است، اما برای قضاوت نهایی کافی نیست.'),
      L('Sie ersetzt alle Einzelsequenzen.', 'It replaces all source sequences.', 'جایگزین همه سکانس‌های اصلی می‌شود.'),
      L('Sie zeigt ausschließlich den ADC.', 'It displays only the ADC.', 'فقط ADC را نشان می‌دهد.'),
      L('Sie ist nur für Implantate geeignet.', 'It is useful only for implants.', 'فقط برای ایمپلنت‌ها کاربرد دارد.'),
    ],
    correct: 'A',
    explanation: L('Die MIP liefert einen schnellen Überblick über Symmetrie, BPE und potenzielle Läsionen. Die endgültige Beurteilung erfolgt in den Quellbildern.', 'The MIP provides a rapid overview of symmetry, BPE and potential lesions. Final assessment requires the source images.', 'MIP نمای سریعی از تقارن، BPE و ضایعات احتمالی می‌دهد؛ ارزیابی نهایی باید در تصاویر اصلی انجام شود.'),
  },
  {
    id: 'adc',
    question: L('Wie ist ein niedriger ADC in einer Brustläsion zu interpretieren?', 'How should a low ADC in a breast lesion be interpreted?', 'ADC پایین در یک ضایعه پستان چگونه تفسیر می‌شود؟'),
    options: [
      L('Als zusätzlicher Hinweis, nicht als alleiniger Krebsnachweis', 'As an additional clue, not proof of cancer by itself', 'به‌عنوان نشانه تکمیلی، نه اثبات مستقل سرطان'),
      L('Immer als sicher maligne', 'Always as definitely malignant', 'همیشه قطعاً بدخیم'),
      L('Immer als benigne', 'Always as benign', 'همیشه خوش‌خیم'),
      L('Nur zusammen mit Implantatruptur', 'Only together with implant rupture', 'فقط همراه پارگی ایمپلنت'),
    ],
    correct: 'A',
    explanation: L('DWI und ADC sind zusätzliche Bausteine. Auch benigne Läsionen können niedrige ADC-Werte zeigen.', 'DWI and ADC are adjuncts. Benign lesions can also show low ADC values.', 'DWI و ADC ابزارهای تکمیلی‌اند و ضایعات خوش‌خیم نیز می‌توانند ADC پایین داشته باشند.'),
  },
  {
    id: 'fgt-bpe',
    question: L('Welche Zuordnung von FGT und BPE ist korrekt?', 'Which pairing of FGT and BPE is correct?', 'کدام تطبیق FGT و BPE درست است؟'),
    options: [
      L('FGT = Gewebemenge; BPE = Anreicherung des normalen Gewebes', 'FGT = amount of tissue; BPE = enhancement of normal tissue', 'FGT = مقدار بافت؛ BPE = میزان جذب کنتراست بافت طبیعی'),
      L('FGT = Kinetik; BPE = Diffusion', 'FGT = kinetics; BPE = diffusion', 'FGT = کینتیک؛ BPE = دیفیوژن'),
      L('FGT und BPE sind identisch', 'FGT and BPE are identical', 'FGT و BPE یکسان‌اند'),
      L('FGT beschreibt nur Läsionen', 'FGT describes lesions only', 'FGT فقط ضایعات را توصیف می‌کند'),
    ],
    correct: 'A',
    explanation: L('FGT beschreibt die Menge fibroglandulären Gewebes. BPE beschreibt dessen normale Kontrastmittelanreicherung.', 'FGT describes the amount of fibroglandular tissue; BPE describes its normal contrast enhancement.', 'FGT مقدار بافت فیبروگلاندولار و BPE میزان جذب طبیعی کنتراست در آن را توصیف می‌کند.'),
  },
  {
    id: 'focus',
    question: L('Wie ist ein Focus nach BI-RADS in der Mamma-MRT definiert?', 'How is a focus defined in BI-RADS breast MRI?', 'Focus در BI-RADS MRI پستان چگونه تعریف می‌شود؟'),
    options: [
      L('Enhancement < 5 mm, zu klein für sichere Morphologie', 'Enhancement < 5 mm, too small for reliable morphology', 'ناحیه جذب کنتراست کمتر از ۵ میلی‌متر و کوچک‌تر از حد ارزیابی مطمئن مورفولوژی'),
      L('Jede Läsion über 5 cm', 'Any lesion larger than 5 cm', 'هر ضایعه بزرگ‌تر از ۵ سانتی‌متر'),
      L('Diffuse Hautverdickung', 'Diffuse skin thickening', 'ضخیم‌شدگی منتشر پوست'),
      L('Jede Läsion mit niedrigem ADC', 'Any lesion with a low ADC', 'هر ضایعه با ADC پایین'),
    ],
    correct: 'A',
    explanation: L('Ein Focus ist kleiner als 5 mm und daher zu klein für eine zuverlässige morphologische Charakterisierung.', 'A focus is smaller than 5 mm and therefore too small for reliable morphological characterisation.', 'Focus کوچک‌تر از ۵ میلی‌متر است و برای توصیف قابل اعتماد مورفولوژیک بیش از حد کوچک است.'),
  },
  {
    id: 'nme',
    question: L('Was kennzeichnet ein Non-Mass Enhancement?', 'What characterises non-mass enhancement?', 'ویژگی Non-Mass Enhancement چیست؟'),
    options: [
      L('Enhancement ohne dreidimensionale Raumforderung, abgrenzbar vom BPE', 'Enhancement without a three-dimensional mass, distinguishable from BPE', 'جذب کنتراست بدون توده سه‌بعدی که از BPE قابل تفکیک است'),
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
      L('Eine indizierte Biopsie darf durch MRT nicht umgangen werden.', 'MRI must not be used to avoid an indicated biopsy.', 'نباید از MRI برای اجتناب از بیوپسی اندیکاسیون‌دار استفاده کرد.'),
      L('MRT ersetzt immer die Histologie.', 'MRI always replaces histology.', 'MRI همیشه جایگزین پاتولوژی است.'),
      L('Jeder suspekte Befund wird nur kontrolliert.', 'Every suspicious finding is followed only.', 'هر یافته مشکوک فقط پیگیری می‌شود.'),
      L('Sonographie ist vor MRT nie erforderlich.', 'Ultrasound is never required before MRI.', 'سونوگرافی پیش از MRI هرگز لازم نیست.'),
    ],
    correct: 'A',
    explanation: L('Ein klar suspekter und bioptisch zugänglicher Befund sollte in der Regel histologisch abgeklärt werden.', 'A clearly suspicious and biopsy-accessible finding should generally undergo histological assessment.', 'یافته واضحاً مشکوک و قابل بیوپسی معمولاً باید از نظر بافت‌شناسی بررسی شود.'),
  },
  {
    id: 'workflow',
    question: L('Was ist der erste Schritt bei einem auffälligen Enhancement?', 'What is the first step when an abnormal enhancement is found?', 'اولین گام در برخورد با جذب کنتراست غیرطبیعی چیست؟'),
    options: [
      L('Zuerst Focus, Mass oder NME zuordnen', 'First classify it as focus, mass or NME', 'ابتدا آن را به Focus، Mass یا NME طبقه‌بندی کنید'),
      L('Sofort die Diagnose Krebs stellen', 'Immediately diagnose cancer', 'فوراً تشخیص سرطان بدهید'),
      L('Nur die MIP beurteilen', 'Assess only the MIP', 'فقط MIP را ارزیابی کنید'),
      L('FGT und BPE ignorieren', 'Ignore FGT and BPE', 'FGT و BPE را نادیده بگیرید'),
    ],
    correct: 'A',
    explanation: L('Vor Morphologie, Diffusion und Kinetik wird das Enhancement zunächst als Focus, Mass oder NME eingeordnet.', 'Before assessing morphology, diffusion and kinetics, enhancement is first classified as a focus, mass or NME.', 'پیش از بررسی مورفولوژی، دیفیوژن و کینتیک، جذب کنتراست ابتدا به Focus، Mass یا NME طبقه‌بندی می‌شود.'),
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
  ['Grundprinzip', 'Warum ist die Mamma-MRT besonders sensitiv?', 'Sie zeigt Tumorvaskularisation und Kontrastmittelaufnahme.', 'Die Spezifität bleibt begrenzt, weil auch benigne Veränderungen enhancen.', 'Principle', 'Why is breast MRI particularly sensitive?', 'It depicts tumour vascularity and contrast enhancement.', 'Specificity remains limited because benign findings can also enhance.', 'اصل', 'چرا MRI پستان حساسیت بالایی دارد؟', 'عروق تومور و جذب ماده حاجب را نشان می‌دهد.', 'ویژگی محدود است چون ضایعات خوش‌خیم نیز می‌توانند کنتراست بگیرند.'],
  ['Indikation', 'Nenne eine zentrale Screening-Indikation.', 'Deutlich erhöhtes Lebenszeitrisiko für ein Mammakarzinom.', 'Die MRT ergänzt Mammographie und Sonographie gezielt.', 'Indication', 'Name a key screening indication.', 'A markedly increased lifetime risk of breast cancer.', 'MRI is used as a targeted adjunct to mammography and ultrasound.', 'اندیکاسیون', 'یک اندیکاسیون مهم غربالگری را نام ببرید.', 'افزایش واضح خطر مادام‌العمر سرطان پستان.', 'MRI به‌صورت هدفمند مکمل ماموگرافی و سونوگرافی است.'],
  ['Protokoll', 'Wozu dient T1 vor Kontrastmittel?', 'Als Ausgangsbasis und für die spätere Subtraktion.', 'Sie hilft zudem, Fett, Blutprodukte und vorbestehend hohes T1-Signal zu erkennen.', 'Protocol', 'What is pre-contrast T1 used for?', 'As a baseline and for later subtraction.', 'It also helps identify fat, blood products and pre-existing high T1 signal.', 'پروتکل', 'T1 پیش از کنتراست چه کاربردی دارد؟', 'به‌عنوان خط پایه و برای ساب‌ترکشن بعدی.', 'همچنین به تشخیص چربی، محصولات خونی و سیگنال بالای قبلی در T1 کمک می‌کند.'],
  ['Subtraktion', 'Was zeigt die Subtraktion?', 'Sie macht Kontrastmittel-Enhancement deutlich besser sichtbar.', 'Das Präkontrastbild wird vereinfacht vom Postkontrastbild abgezogen.', 'Subtraction', 'What does subtraction show?', 'It makes contrast enhancement much more conspicuous.', 'The pre-contrast image is subtracted from the post-contrast image.', 'ساب‌ترکشن', 'ساب‌ترکشن چه چیزی را نشان می‌دهد؟', 'جذب ماده حاجب را بسیار واضح‌تر می‌کند.', 'تصویر پیش از کنتراست از تصویر پس از کنتراست کم می‌شود.'],
  ['MIP', 'Wofür ist die MIP geeignet?', 'Für einen schnellen Überblick und zum Suchen.', 'Sie ist nicht für die endgültige Beurteilung geeignet.', 'MIP', 'What is the MIP useful for?', 'For a rapid overview and lesion search.', 'It is not suitable for final assessment.', 'MIP', 'MIP برای چه کاری مناسب است؟', 'برای نمای سریع و جست‌وجوی ضایعه.', 'برای ارزیابی نهایی کافی نیست.'],
  ['Diffusion', 'Bedeutet ein niedriger ADC automatisch Krebs?', 'Nein.', 'DWI/ADC ist nur ein zusätzlicher Baustein und muss mit den übrigen Sequenzen korreliert werden.', 'Diffusion', 'Does a low ADC automatically mean cancer?', 'No.', 'DWI/ADC is an adjunct and must be correlated with the other sequences.', 'دیفیوژن', 'آیا ADC پایین خودبه‌خود به معنی سرطان است؟', 'خیر.', 'DWI/ADC یک ابزار تکمیلی است و باید با سایر سکانس‌ها تطبیق داده شود.'],
  ['FGT', 'Was beschreibt FGT?', 'Die Menge des fibroglandulären Brustgewebes.', 'FGT ist unabhängig davon, wie stark das Gewebe nach Kontrastmittelgabe anreichert.', 'FGT', 'What does FGT describe?', 'The amount of fibroglandular breast tissue.', 'FGT is independent of how strongly that tissue enhances after contrast.', 'FGT', 'FGT چه چیزی را توصیف می‌کند؟', 'مقدار بافت فیبروگلاندولار پستان.', 'FGT مستقل از میزان جذب کنتراست توسط این بافت است.'],
  ['BPE', 'Was beschreibt BPE?', 'Die Kontrastmittelanreicherung des normalen fibroglandulären Gewebes.', 'Die Kategorien sind minimal, mild, moderate und marked.', 'BPE', 'What does BPE describe?', 'Contrast enhancement of normal fibroglandular tissue.', 'The categories are minimal, mild, moderate and marked.', 'BPE', 'BPE چه چیزی را توصیف می‌کند؟', 'جذب ماده حاجب در بافت طبیعی فیبروگلاندولار.', 'دسته‌ها شامل minimal، mild، moderate و marked هستند.'],
  ['Focus', 'Wie groß ist ein Focus?', 'Kleiner als 5 mm.', 'Er ist zu klein für eine zuverlässige morphologische Charakterisierung.', 'Focus', 'How large is a focus?', 'Smaller than 5 mm.', 'It is too small for reliable morphological characterisation.', 'Focus', 'اندازه Focus چقدر است؟', 'کمتر از ۵ میلی‌متر.', 'برای توصیف مطمئن مورفولوژیک بیش از حد کوچک است.'],
  ['Mass', 'Was ist eine Mass?', 'Eine echte dreidimensionale Läsion.', 'Form, Rand und internes Enhancement können beurteilt werden.', 'Mass', 'What is a mass?', 'A true three-dimensional lesion.', 'Shape, margin and internal enhancement can be assessed.', 'Mass', 'Mass چیست؟', 'یک ضایعه واقعی سه‌بعدی.', 'شکل، حاشیه و الگوی جذب داخلی آن قابل ارزیابی است.'],
  ['NME', 'Was ist Non-Mass Enhancement?', 'Enhancement ohne dreidimensionale Mass, das vom normalen BPE abgrenzbar ist.', 'Es ist weder eine Mass noch lediglich ein kleiner Focus.', 'NME', 'What is non-mass enhancement?', 'Enhancement without a three-dimensional mass that is distinguishable from normal BPE.', 'It is neither a mass nor merely a small focus.', 'NME', 'Non-Mass Enhancement چیست؟', 'جذب کنتراست بدون توده سه‌بعدی که از BPE طبیعی قابل تفکیک است.', 'نه Mass است و نه صرفاً یک Focus کوچک.'],
  ['Workflow', 'Welche drei Grundkategorien werden zuerst unterschieden?', 'Focus, Mass und Non-Mass Enhancement.', 'Erst danach folgen Morphologie, T2, DWI, Kinetik und Begleitbefunde.', 'Workflow', 'Which three basic categories are distinguished first?', 'Focus, mass and non-mass enhancement.', 'Only then are morphology, T2, DWI, kinetics and associated findings assessed.', 'روند بررسی', 'ابتدا کدام سه دسته اصلی از هم تفکیک می‌شوند؟', 'Focus، Mass و Non-Mass Enhancement.', 'سپس مورفولوژی، T2، DWI، کینتیک و یافته‌های همراه بررسی می‌شوند.'],
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
  subtitle: L('Indikationen · Sequenzen · FGT/BPE · Enhancement-Typen', 'Indications · sequences · FGT/BPE · enhancement types', 'اندیکاسیون‌ها · سکانس‌ها · FGT/BPE · انواع جذب کنتراست'),
}
