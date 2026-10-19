const L = (de, en, fa) => ({ de, en, fa })

export const BRAIN_METASTASES_ID = 'metastasen-meningeosis'
export const BRAIN_METASTASES_PATH = '/gehirn/tumoren/hirnmetastasen'

export const BRAIN_METASTASES_COPY = {
  title: L('Hirnmetastasen: Befundmerkmale und ihre Grenzen', 'Brain metastases: report descriptors and their limits', 'متاستازهای مغزی: توصیف‌های گزارش و محدودیت آن‌ها'),
  heroAlt: L('Konzeptschema zu Befundmerkmalen, kein diagnostisches MRT.', 'Conceptual diagram of report descriptors, not a diagnostic MRI.', 'شماتیک مفهومی از توصیف‌های گزارش، نه MRI تشخیصی.'),
  chapter: L('Tumoren', 'Tumours', 'تومورها'),
  objective: L('Sie interpretieren schriftliche Befundmerkmale einer parenchymalen Hirnmetastase und benennen ihre Grenzen. Eigenständiges Erkennen von Zeichen in MRT-Bildern wird hier weder vermittelt noch geprüft.', 'Interpret written report descriptors for parenchymal brain metastases and state their limits. Independent recognition of MRI signs is neither taught nor assessed here.', 'توصیف‌های مکتوب گزارش متاستاز پارانشیمی مغز را تفسیر و محدودیتشان را بیان کنید. تشخیص مستقل نشانه‌ها از روی تصاویر MRI در این درس آموزش داده یا ارزیابی نمی‌شود.'),
  intro: L('Diese Lektion behandelt parenchymale Metastasen, nicht leptomeningeale Erkrankung, und übt die Interpretation bereits formulierter Befundmerkmale. Ein Befund kann eine oder mehrere gut abgrenzbare, kontrastmittelaufnehmende Läsionen beschreiben, oft an der Mark-Rinden-Grenze oder in vaskulären Grenzzonen, mit möglichem perifokalem vasogenem Ödem. Solche Merkmale lenken die diagnostische Einordnung, beweisen aber weder Metastase noch Primärtumor.', 'This lesson covers parenchymal metastases, not leptomeningeal disease, and practises interpreting descriptors already stated in a report. A report may describe one or more well-demarcated enhancing lesions, often at the grey–white junction or in vascular border zones, with possible surrounding vasogenic oedema. These descriptors guide interpretation but prove neither metastasis nor the primary tumour.', 'این درس متاستازهای پارانشیمی را پوشش می‌دهد، نه بیماری لپتومننژیال، و تفسیر توصیف‌هایی را تمرین می‌کند که از قبل در گزارش آمده‌اند. گزارش ممکن است یک یا چند ضایعه با حدود مشخص و enhancement را توصیف کند که اغلب در مرز مادهٔ سفید و خاکستری یا نواحی مرزی عروقی قرار دارند و ممکن است ادم وازوژنیک پیرامونی داشته باشند. این توصیف‌ها به تفسیر کمک می‌کنند اما نه متاستاز و نه تومور اولیه را ثابت نمی‌کنند.'),
  pattern: L('Der Bericht kann eine solide oder ringförmige Kontrastmittelaufnahme beschreiben; größere Läsionen können zentral nekrotisch sein. T2/FLAIR kann ein umgebendes Signalödem zeigen. Zahl, Größe und Lokalisation sorgfältig dokumentieren; ein solitärer Herd schließt Metastasierung nicht aus und eine einzelne Kontrastform identifiziert keinen Primärtumor.', 'A report may describe solid or ring enhancement; larger lesions may have central necrosis. T2/FLAIR may show surrounding oedema. Document number, size and location. A solitary lesion does not exclude metastasis, and one enhancement pattern does not identify the primary tumour.', 'گزارش ممکن است enhancement جامد یا حلقوی را توصیف کند؛ ضایعات بزرگ‌تر می‌توانند نکروز مرکزی داشته باشند. T2/FLAIR ممکن است ادم پیرامونی را نشان دهد. تعداد، اندازه و محل را دقیق ثبت کنید. منفرد بودن ضایعه متاستاز را رد نمی‌کند و شکل enhancement به‌تنهایی تومور اولیه را مشخص نمی‌کند.'),
  workflow: L('Die EANO–ESMO-Leitlinie nennt als Mindest-MRT T1 vor und nach Kontrastmittel, T2 und/oder FLAIR sowie DWI. Beim Lesen des Berichts achten Sie auf diese Sequenzen und die beschriebenen Befunde zu Aufnahme, Ödem, Anzahl und Lage. Verknüpfen Sie die Angaben mit bekannter Tumoranamnese und klinischem Kontext. Bei atypischen oder unklaren Beschreibungen bleibt die Differenzialdiagnose offen; die weitere Abklärung ist eine klinische Entscheidung.', 'The EANO–ESMO guideline lists pre- and post-contrast T1, T2 and/or FLAIR, and DWI as the minimum MRI work-up. When reading the report, note these sequences and its descriptions of enhancement, oedema, number and location. Relate the statements to known cancer history and clinical context. If descriptors are atypical or indeterminate, keep the differential open; further work-up is a clinical decision.', 'راهنمای EANO–ESMO، T1 پیش و پس از تزریق، T2 و/یا FLAIR و DWI را حداقل بررسی MRI می‌داند. هنگام خواندن گزارش، به این سکانس‌ها و توصیف enhancement، ادم، تعداد و محل توجه کنید. اطلاعات گزارش را با سابقهٔ شناخته‌شدهٔ سرطان و زمینهٔ بالینی مرتبط کنید. اگر توصیف‌ها غیرتیپیک یا نامشخص‌اند، افتراق را باز نگه دارید؛ بررسی بیشتر تصمیمی بالینی است.'),
  visualTitle: L('Konzeptschema zu Befundmerkmalen', 'Conceptual diagram of report descriptors', 'شماتیک مفهومی از توصیف‌های گزارش'),
  visualCaption: L('Die Skizze veranschaulicht nur Begriffe aus dem Befund: eine oder mehrere Läsionen und mögliches perifokales Ödem. Sie ist weder ein anatomisch maßstäbliches Bild noch ein MRT oder eine Häufigkeitskarte.', 'The sketch only illustrates report terms: one or more lesions and possible surrounding oedema. It is not anatomically to scale, not an MRI, and not a frequency map.', 'این طرح فقط اصطلاح‌های گزارش را نشان می‌دهد: یک یا چند ضایعه و ادم احتمالی پیرامونی. تصویر از نظر آناتومی مقیاس‌دار نیست، MRI واقعی نیست و نقشهٔ فراوانی هم نیست.'),
  warning: L('Verteilung und Enhancement sind Hinweise mit Überschneidung zu primären Tumoren und anderen Läsionen. Eine Bildgebung allein ersetzt keine klinische und ggf. histologische Einordnung.', 'Distribution and enhancement are clues that overlap with primary tumours and other lesions. Imaging alone does not replace clinical and, where needed, histological assessment.', 'توزیع و enhancement سرنخ‌هایی با هم‌پوشانی با تومورهای اولیه و ضایعات دیگر هستند. تصویربرداری به‌تنهایی جای ارزیابی بالینی و در صورت نیاز بافت‌شناسی را نمی‌گیرد.'),
  question: L('Ein Befundbericht beschreibt mehrere gut abgrenzbare, kontrastmittelaufnehmende Herde an der Mark-Rinden-Grenze mit perifokalem Ödem. Welche Aussage ist am besten begründet?', 'A radiology report describes several well-demarcated enhancing lesions at the grey–white junction with surrounding oedema. Which statement is best supported?', 'یک گزارش تصویربرداری چند ضایعهٔ مشخص با enhancement در مرز مادهٔ سفید و خاکستری و ادم پیرامونی توصیف می‌کند. کدام برداشت بهتر پشتیبانی می‌شود؟'),
  options: [
    L('Das Muster passt zu Hirnmetastasen, ist aber nicht beweisend; Tumoranamnese und Alternativen müssen einbezogen werden.', 'The pattern is compatible with brain metastases but is not diagnostic; cancer history and alternatives must be considered.', 'این الگو با متاستاز مغزی سازگار است اما تشخیصی نیست؛ سابقهٔ سرطان و احتمال‌های دیگر باید بررسی شوند.'),
    L('Die Läsionen beweisen einen bestimmten Primärtumor.', 'The lesions prove a specific primary tumour.', 'این ضایعات تومور اولیهٔ مشخصی را ثابت می‌کنند.'),
    L('Ein einzelner Herd würde Metastasen ausschließen.', 'A solitary lesion would exclude metastasis.', 'یک ضایعهٔ منفرد متاستاز را رد می‌کند.'),
    L('Das perifokale FLAIR-Signal beweist eine bakterielle Infektion.', 'The surrounding FLAIR signal proves bacterial infection.', 'سیگنال FLAIR پیرامونی عفونت باکتریایی را ثابت می‌کند.'),
  ],
  feedback: [
    L('Richtig. Das Muster ist typisch genug, um Metastasen mitzudenken, aber nicht spezifisch genug, um sie allein zu beweisen.', 'Correct. The pattern is typical enough to consider metastases, but not specific enough to prove them alone.', 'درست است. الگو به‌اندازه‌ای تیپیک است که متاستاز را در نظر بگیریم، اما به‌تنهایی اختصاصی و اثبات‌کننده نیست.'),
    L('Enhancement und Lokalisation legen den Primärtumor nicht fest.', 'Enhancement and location do not identify the primary tumour.', 'enhancement و محل، تومور اولیه را مشخص نمی‌کنند.'),
    L('Auch eine solitäre Läsion kann eine Metastase sein.', 'A solitary lesion can also be a metastasis.', 'یک ضایعهٔ منفرد نیز می‌تواند متاستاز باشد.'),
    L('Perifokales Signalödem ist nicht spezifisch für Infektion.', 'Perilesional signal oedema is not specific for infection.', 'ادم سیگنالی پیرامونی مختص عفونت نیست.'),
  ],
  takeaway: [
    { title: L('Verteilung beschreiben', 'Describe distribution', 'توزیع را توصیف کنید'), detail: L('Metastasen können an der Mark-Rinden-Grenze oder in Grenzzonen liegen.', 'Metastases may occur at the grey–white junction or in border zones.', 'متاستازها ممکن است در مرز مادهٔ سفید و خاکستری یا نواحی مرزی باشند.') },
    { title: L('Muster als Hinweis lesen', 'Treat the pattern as a clue', 'الگو را به‌عنوان سرنخ ببینید'), detail: L('Enhancement und vasogenes Ödem sind typisch, aber nicht spezifisch.', 'Enhancement and vasogenic oedema are typical but non-specific.', 'enhancement و ادم وازوژنیک تیپیک اما غیراختصاصی‌اند.') },
    { title: L('Grenzen benennen', 'State the limits', 'محدودیت را بیان کنید'), detail: L('Zahl, Größe und Lage berichten; keinen Primärtumor aus einem Einzelzeichen ableiten.', 'Report number, size and location; do not infer a primary tumour from one sign.', 'تعداد، اندازه و محل را گزارش کنید؛ از یک نشانه تومور اولیه را نتیجه نگیرید.') },
  ],
  sourcesTitle: L('Quellen und Umfang', 'Sources and scope', 'منابع و دامنه'),
  scopeNote: L('Umfang: Gehirn.pdf, PDF-Seite 47 (gedruckte Seite 46). Die Seite enthält nur die Überschrift „Metastasen“ und die Stichworte „Häufigkeitsverteilung, KM-Verhalten“; Fallbilder, Zahlen oder Kriterien fehlen. Diese Lektion behandelt ausschließlich parenchymale Metastasen. Leptomeningeale Metastasierung ist nicht abgedeckt. Ergänzende Aussagen sind den unten genannten externen Quellen zugeordnet.', 'Scope: Gehirn.pdf, PDF page 47 (printed page 46). The page contains only the heading “Metastases” and the note “frequency distribution, enhancement behaviour”; case images, numbers and criteria are absent. This lesson covers parenchymal metastases only. Leptomeningeal metastasis is not covered. Supplemental claims are attributed to the external sources below.', 'دامنه: Gehirn.pdf، صفحهٔ PDF شمارهٔ ۴۷ (صفحهٔ چاپی ۴۶). این صفحه فقط عنوان «متاستازها» و یادداشت «توزیع فراوانی، رفتار کنتراست» را دارد؛ تصویر موردی، عدد یا معیار ارائه نمی‌کند. این درس فقط متاستاز پارانشیمی را پوشش می‌دهد. متاستاز لپتومننژیال پوشش داده نمی‌شود. مطالب تکمیلی به منابع خارجی زیر نسبت داده شده‌اند.'),
}

export const BRAIN_METASTASES_SECTIONS = [
  { id: 'pattern', icon: 'scan' },
  { id: 'review', icon: 'brain' },
  { id: 'self-check', icon: 'check' },
  { id: 'take-home', icon: 'summary', emphasis: true },
]

export const BRAIN_METASTASES_SOURCES = [
  { tag: 'GUIDELINE · 2021', title: 'EANO–ESMO: brain metastases from solid tumours', href: 'https://www.eano.eu/publications/eano-guidelines/eano-esmo-clinical-practice-guidelines-for-diagnosis-treatment-and-follow-up-of-patients-with-brain-metastasis-from-solid-tumours/', citation: L('EANO–ESMO-Leitlinie. Mindest-MRT-Sequenzen und typische bildgebende Merkmale; diese Lektion übernimmt nur Bildgebung und keine Therapieempfehlungen.', 'EANO–ESMO guideline. Minimum MRI sequences and typical imaging features; this lesson uses imaging content only, not treatment recommendations.', 'راهنمای EANO–ESMO. سکانس‌های حداقلی MRI و ویژگی‌های تیپیک تصویربرداری؛ این درس فقط بخش تصویربرداری را به‌کار می‌برد و توصیهٔ درمانی ندارد.'), scope: L('Die PDF-Seite 47 selbst enthält nur ein Stichwort; externe Ergänzung ist ausgewiesen.', 'PDF page 47 itself contains only a note; external supplementation is explicit.', 'صفحهٔ ۴۷ PDF فقط یادداشت کوتاهی دارد؛ تکمیل خارجی صریحاً مشخص شده است.') },
  { tag: 'CONSENSUS · 2022', title: 'SNO consensus review: brain metastases', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9527527/', citation: L('SNO-Konsensusübersicht: typische Lage am kortikalen Mark-Rinden-Übergang, häufiges perifokales Ödem und mögliche solitäre Präsentation.', 'SNO consensus review: typical cortical grey–white junction, frequent surrounding oedema, and possible solitary presentation.', 'مرور اجماعی SNO: محل تیپیک در مرز قشر و مادهٔ سفید، ادم پیرامونی شایع و امکان تظاهر منفرد.'), scope: L('Gestützt werden nur die knappen Musterbeschreibungen; keine Primärtumorzuordnung oder Häufigkeitszahl.', 'Supports only the brief pattern descriptions; no primary-tumour assignment or frequency estimate is taught.', 'فقط توصیف الگو پشتیبانی می‌شود؛ تومور اولیه یا عدد فراوانی آموزش داده نمی‌شود.') },
]

const brainMetastasisQuestion = {
  id: 'parenchymal-pattern',
  question: BRAIN_METASTASES_COPY.question,
  options: BRAIN_METASTASES_COPY.options,
  correct: 'A',
  explanation: BRAIN_METASTASES_COPY.feedback[0],
  wrong: {
    B: BRAIN_METASTASES_COPY.feedback[1],
    C: BRAIN_METASTASES_COPY.feedback[2],
    D: BRAIN_METASTASES_COPY.feedback[3],
  },
}

export const BRAIN_METASTASES_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [lang, [{
  id: `metastasen-meningeosis-${lang}-${brainMetastasisQuestion.id}`,
  fach: 'gehirn',
  tags: [BRAIN_METASTASES_ID],
  question: brainMetastasisQuestion.question[lang],
  options: brainMetastasisQuestion.options.map((option, index) => ({ id: String.fromCharCode(65 + index), text: option[lang] })),
  correct: brainMetastasisQuestion.correct,
  explanation: brainMetastasisQuestion.explanation[lang],
  wrongExplanations: Object.fromEntries(Object.entries(brainMetastasisQuestion.wrong).map(([id, explanation]) => [id, explanation[lang]])),
  source: 'Gehirn.pdf PDF47 (heading and note only); EANO–ESMO 2021; SNO consensus 2022. Parenchymal pattern only; leptomeningeal disease is not covered.',
}]]))

export const BRAIN_METASTASES_FLASHCARDS = BRAIN_METASTASES_COPY.takeaway.map((item, index) => ({
  id: `metastasen-meningeosis-parenchymal-${index + 1}`,
  topicId: BRAIN_METASTASES_ID,
  category: item.title,
  front: item.title,
  answer: item.detail,
  explanation: item.detail,
  source: 'Gehirn.pdf PDF47 (heading and note only); supplemental descriptors: EANO–ESMO 2021; SNO consensus 2022.',
}))

export const BRAIN_METASTASES_FLASHCARD_TOPIC = {
  id: BRAIN_METASTASES_ID,
  href: `/flashcards/${BRAIN_METASTASES_ID}`,
  title: BRAIN_METASTASES_COPY.title,
  icon: '◉',
  color: '#6b8196',
  description: L('Parenchymale Metastasen · Befundbegriffe · Grenzen', 'Parenchymal metastases · report descriptors · limits', 'متاستاز پارانشیمی · توصیف گزارش · محدودیت‌ها'),
}
