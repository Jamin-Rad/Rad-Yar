const L = (de, en, fa) => ({ de, en, fa })

export const BRAIN_METASTASES_ID = 'metastasen-meningeosis'
export const BRAIN_METASTASES_PATH = '/gehirn/tumoren/hirnmetastasen'

export const BRAIN_METASTASES_COPY = {
  title: L('Hirnmetastasen: Befundmerkmale und ihre Grenzen', 'Brain metastases: report descriptors and their limits', 'متاستازهای مغزی: توصیف‌های گزارش و محدودیت آن‌ها'),
  heroAlt: L('Konzeptschema zu Befundmerkmalen, kein diagnostisches MRT.', 'Conceptual diagram of report descriptors, not a diagnostic MRI.', 'شماتیک مفهومی از توصیف‌های گزارش، نه MRI تشخیصی.'),
  chapter: L('Tumoren', 'Tumours', 'تومورها'),
  objective: L('Sie unterscheiden schriftliche Befundmerkmale parenchymaler und leptomeningealer Metastasen und benennen ihre Grenzen. Eigenständiges Erkennen von Zeichen in MRT-Bildern wird hier weder vermittelt noch geprüft.', 'Distinguish written report descriptors for parenchymal and leptomeningeal metastases and state their limits. Independent recognition of MRI signs is neither taught nor assessed here.', 'توصیف‌های مکتوب گزارش متاستاز پارانشیمی و لپتومننژیال را از هم تفکیک و محدودیت آن‌ها را بیان کنید. تشخیص مستقل نشانه‌ها از روی تصاویر MRI در این درس آموزش داده یا ارزیابی نمی‌شود.'),
  intro: L('Diese Lektion vergleicht zwei Verteilungsmuster: umschriebene parenchymale Herde und Ausbreitung im leptomeningealen Liquorraum. Ein parenchymaler Befund kann eine oder mehrere gut abgrenzbare, kontrastmittelaufnehmende Läsionen beschreiben, oft an der Mark-Rinden-Grenze oder in vaskulären Grenzzonen, mit möglichem perifokalem vasogenem Ödem. Diese Merkmale lenken die diagnostische Einordnung, beweisen aber weder Metastase noch Primärtumor.', 'This lesson compares two distribution patterns: focal parenchymal lesions and spread through the leptomeningeal CSF spaces. A parenchymal report may describe one or more well-demarcated enhancing lesions, often at the grey–white junction or in vascular border zones, with possible surrounding vasogenic oedema. These descriptors guide interpretation but prove neither metastasis nor the primary tumour.', 'این درس دو الگوی توزیع را مقایسه می‌کند: ضایعات موضعی پارانشیمی و گسترش در فضای مایع مغزی‌نخاعی لپتومننژیال. گزارش پارانشیمی ممکن است یک یا چند ضایعهٔ مشخص با enhancement را توصیف کند که اغلب در مرز مادهٔ سفید و خاکستری یا نواحی مرزی عروقی قرار دارند و ممکن است ادم وازوژنیک پیرامونی داشته باشند. این توصیف‌ها به تفسیر کمک می‌کنند اما نه متاستاز و نه تومور اولیه را ثابت نمی‌کنند.'),
  pattern: L('Der Bericht kann eine solide oder ringförmige Kontrastmittelaufnahme beschreiben; größere Läsionen können zentral nekrotisch sein. T2/FLAIR kann ein umgebendes Signalödem zeigen. Zahl, Größe und Lokalisation sorgfältig dokumentieren; ein solitärer Herd schließt Metastasierung nicht aus und eine einzelne Kontrastform identifiziert keinen Primärtumor.', 'A report may describe solid or ring enhancement; larger lesions may have central necrosis. T2/FLAIR may show surrounding oedema. Document number, size and location. A solitary lesion does not exclude metastasis, and one enhancement pattern does not identify the primary tumour.', 'گزارش ممکن است enhancement جامد یا حلقوی را توصیف کند؛ ضایعات بزرگ‌تر می‌توانند نکروز مرکزی داشته باشند. T2/FLAIR ممکن است ادم پیرامونی را نشان دهد. تعداد، اندازه و محل را دقیق ثبت کنید. منفرد بودن ضایعه متاستاز را رد نمی‌کند و شکل enhancement به‌تنهایی تومور اولیه را مشخص نمی‌کند.'),
  leptomeningealTitle: L('Welche Hinweise sprechen für leptomeningeale Ausbreitung?', 'Which findings suggest leptomeningeal spread?', 'چه یافته‌هایی گسترش لپتومننژیال را مطرح می‌کنند؟'),
  leptomeningeal: L('Leptomeningeale Metastasen breiten sich im Subarachnoidalraum und entlang von Liquorräumen aus. Im kontrastverstärkten MRT können lineare oder noduläre Anreicherungen an Hirnoberfläche und Sulci, Kleinhirnfolia, basalen Zisternen, Hirnnerven, Ventrikeloberflächen oder Cauda-equina-Wurzeln auftreten. Muster und Ausdehnung sind variabel; ein unauffälliges MRT schließt die Erkrankung nicht sicher aus.', 'Leptomeningeal metastases spread within the subarachnoid space and along CSF spaces. Contrast-enhanced MRI may show linear or nodular enhancement along the brain surface and sulci, cerebellar folia, basal cisterns, cranial nerves, ventricular surfaces or cauda equina roots. Patterns and extent vary; a normal MRI does not reliably exclude disease.', 'متاستازهای لپتومننژیال در فضای زیرعنکبوتیه و در امتداد فضاهای مایع مغزی‌نخاعی گسترش می‌یابند. MRI پس از تزریق ممکن است enhancement خطی یا ندولار در سطح مغز و سولکوس‌ها، فولیاهای مخچه، سیسترن‌های قاعده، اعصاب جمجمه‌ای، سطح بطن‌ها یا ریشه‌های دم‌اسبی نشان دهد. الگو و وسعت متغیر است؛ MRI طبیعی بیماری را با اطمینان رد نمی‌کند.'),
  leptomeningealWorkflow: L('Bei Verdacht umfasst die neuraxiale Abklärung Gehirn und Wirbelsäule mit und ohne Kontrastmittel. EANO–ESMO empfiehlt neurologische Beurteilung, cerebrospinale MRT und Liquoruntersuchung gemeinsam; MRT-Zeichen allein beweisen die Diagnose nicht. Bildgebung möglichst vor einer Lumbalpunktion planen, da diese durale Anreicherung verursachen kann.', 'When leptomeningeal spread is suspected, neuraxis assessment includes brain and spine MRI with and without contrast. EANO–ESMO recommends integrating neurological examination, cerebrospinal MRI and CSF studies; MRI signs alone do not establish the diagnosis. When possible, perform imaging before lumbar puncture because it can cause dural enhancement.', 'در صورت شک به گسترش لپتومننژیال، ارزیابی محور عصبی شامل MRI مغز و ستون فقرات با و بدون مادهٔ حاجب است. EANO–ESMO ارزیابی عصبی، MRI محور مغزی‌نخاعی و بررسی CSF را در کنار هم توصیه می‌کند؛ نشانه‌های MRI به‌تنهایی تشخیص را ثابت نمی‌کنند. در صورت امکان MRI را پیش از پونکسیون کمری انجام دهید، چون پونکسیون می‌تواند enhancement دورا ایجاد کند.'),
  leptomeningealWarning: L('Enhancement kann auch entzündliche oder infektiöse Ursachen haben. Befund, klinische Situation und Liquor gemeinsam bewerten; Bildgebung allein legt weder Diagnose noch Behandlung fest.', 'Enhancement can also have inflammatory or infectious causes. Interpret imaging with the clinical setting and CSF findings; imaging alone does not determine diagnosis or treatment.', 'علت enhancement می‌تواند التهابی یا عفونی هم باشد. تصویر را همراه با زمینهٔ بالینی و یافته‌های CSF تفسیر کنید؛ تصویربرداری به‌تنهایی تشخیص یا درمان را تعیین نمی‌کند.'),
  leptomeningealVisualTitle: L('Schematische Ausbreitung im Liquorraum', 'Schematic spread through CSF spaces', 'گسترش شماتیک در فضای مایع مغزی‌نخاعی'),
  leptomeningealVisualCaption: L('Konzeptskizze: lineare und noduläre Ablagerungen können Oberflächen und Liquorräume betreffen. Kein anatomisches MRT und kein diagnostischer Patientenscan.', 'Concept sketch: linear and nodular deposits may involve surfaces and CSF spaces. Not an anatomical MRI or a diagnostic patient scan.', 'طرح مفهومی: رسوبات خطی و ندولار می‌توانند سطح‌ها و فضاهای مایع مغزی‌نخاعی را درگیر کنند. MRI آناتومیک یا تصویر تشخیصی بیمار نیست.'),
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
  leptomeningealQuestion: L('Der Bericht beschreibt lineare und noduläre Anreicherung entlang der Kleinhirnfolia und Hirnnerven bei bekannter solider Tumorerkrankung. Welche Einordnung ist am besten begründet?', 'A report describes linear and nodular enhancement along the cerebellar folia and cranial nerves in a patient with known solid cancer. Which interpretation is best supported?', 'گزارش در بیمار مبتلا به سرطان جامد، enhancement خطی و ندولار در امتداد فولیاهای مخچه و اعصاب جمجمه‌ای را توصیف می‌کند. کدام برداشت بهتر پشتیبانی می‌شود؟'),
  leptomeningealOptions: [
    L('Das Muster kann leptomeningeale Ausbreitung nahelegen; MRT-Befunde müssen mit Klinik und Liquorbefund eingeordnet werden.', 'The pattern may suggest leptomeningeal spread; MRI findings must be interpreted with clinical and CSF data.', 'این الگو می‌تواند گسترش لپتومننژیال را مطرح کند؛ یافته‌های MRI باید همراه با بالین و CSF تفسیر شوند.'),
    L('Die Verteilung beweist leptomeningeale Metastasen und macht weitere Diagnostik unnötig.', 'The distribution proves leptomeningeal metastases and makes further work-up unnecessary.', 'این توزیع متاستاز لپتومننژیال را ثابت می‌کند و بررسی بیشتر را غیرضروری می‌سازد.'),
    L('Eine noduläre Anreicherung entlang der Hirnnerven ist typisch für parenchymale Metastasen.', 'Nodular enhancement along cranial nerves is typical of parenchymal metastases.', 'enhancement ندولار در امتداد اعصاب جمجمه‌ای مشخصهٔ متاستاز پارانشیمی است.'),
    L('Ein normales MRT würde eine leptomeningeale Erkrankung sicher ausschließen.', 'A normal MRI would reliably exclude leptomeningeal disease.', 'MRI طبیعی بیماری لپتومننژیال را با اطمینان رد می‌کند.'),
  ],
  leptomeningealFeedback: [
    L('Richtig. Lineare oder noduläre Oberflächenanreicherung ist verdächtig, aber die Diagnose integriert Klinik, cerebrospinale MRT und Liquor.', 'Correct. Linear or nodular surface enhancement is suspicious, but diagnosis integrates clinical assessment, cerebrospinal MRI and CSF.', 'درست است. enhancement خطی یا ندولار سطحی مشکوک است، اما تشخیص با ترکیب ارزیابی بالینی، MRI محور عصبی و CSF انجام می‌شود.'),
    L('Bildgebung allein genügt nicht; alternative entzündliche und infektiöse Ursachen müssen berücksichtigt werden.', 'Imaging alone is insufficient; inflammatory and infectious alternatives must be considered.', 'تصویربرداری به‌تنهایی کافی نیست؛ علت‌های التهابی و عفونی دیگر باید در نظر گرفته شوند.'),
    L('Hirnnerven- und Oberflächenanreicherung betrifft Liquorräume, nicht nur das Hirnparenchym.', 'Cranial-nerve and surface enhancement involves CSF spaces, not only brain parenchyma.', 'enhancement اعصاب جمجمه‌ای و سطح مغز فضاهای CSF را درگیر می‌کند، نه فقط پارانشیم مغز را.'),
    L('Eine normale MRT kann vorkommen und schließt LM nicht sicher aus.', 'MRI may be normal and does not reliably exclude leptomeningeal metastasis.', 'MRI ممکن است طبیعی باشد و متاستاز لپتومننژیال را با اطمینان رد نمی‌کند.'),
  ],
  takeaway: [
    { title: L('Verteilung beschreiben', 'Describe distribution', 'توزیع را توصیف کنید'), detail: L('Metastasen können an der Mark-Rinden-Grenze oder in Grenzzonen liegen.', 'Metastases may occur at the grey–white junction or in border zones.', 'متاستازها ممکن است در مرز مادهٔ سفید و خاکستری یا نواحی مرزی باشند.') },
    { title: L('Muster als Hinweis lesen', 'Treat the pattern as a clue', 'الگو را به‌عنوان سرنخ ببینید'), detail: L('Enhancement und vasogenes Ödem sind typisch, aber nicht spezifisch.', 'Enhancement and vasogenic oedema are typical but non-specific.', 'enhancement و ادم وازوژنیک تیپیک اما غیراختصاصی‌اند.') },
    { title: L('Grenzen benennen', 'State the limits', 'محدودیت را بیان کنید'), detail: L('Zahl, Größe und Lage berichten; keinen Primärtumor aus einem Einzelzeichen ableiten.', 'Report number, size and location; do not infer a primary tumour from one sign.', 'تعداد، اندازه و محل را گزارش کنید؛ از یک نشانه تومور اولیه را نتیجه نگیرید.') },
    { title: L('Liquorräume beachten', 'Consider CSF spaces', 'فضاهای CSF را در نظر بگیرید'), detail: L('Lineare oder noduläre Oberflächenanreicherung kann leptomeningeale Ausbreitung nahelegen.', 'Linear or nodular surface enhancement may suggest leptomeningeal spread.', 'enhancement خطی یا ندولار سطحی می‌تواند گسترش لپتومننژیال را مطرح کند.') },
    { title: L('Befunde integrieren', 'Integrate the findings', 'یافته‌ها را یکپارچه کنید'), detail: L('Ein unauffälliges MRT schließt leptomeningeale Erkrankung nicht sicher aus; Klinik, cerebrospinale MRT und Liquor gemeinsam beurteilen.', 'A normal MRI does not reliably exclude leptomeningeal disease; integrate clinical assessment, cerebrospinal MRI and CSF.', 'MRI طبیعی بیماری لپتومننژیال را با اطمینان رد نمی‌کند؛ ارزیابی بالینی، MRI محور عصبی و CSF را با هم بسنجید.') },
  ],
  sourcesTitle: L('Quellen und Umfang', 'Sources and scope', 'منابع و دامنه'),
  scopeNote: L('Umfang: Gehirn.pdf, PDF-Seite 47 (gedruckte Seite 46). Die Seite nennt „Metastasen“ sowie „Häufigkeitsverteilung, KM-Verhalten“, enthält jedoch keine Zahlen, Kriterien oder Fallbilder. Parenchymale und leptomeningeale Bildverteilung werden deshalb knapp anhand externer Leitlinien ergänzt; Häufigkeitszahlen werden nicht erfunden.', 'Scope: Gehirn.pdf, PDF page 47 (printed page 46). It names “metastases” and “frequency distribution, enhancement behaviour” but gives no numbers, criteria or case images. Parenchymal and leptomeningeal imaging patterns are therefore briefly supplemented from external guidelines; no prevalence figures are invented.', 'دامنه: Gehirn.pdf، صفحهٔ ۴۷ (صفحهٔ چاپی ۴۶) به «متاستازها» و «توزیع فراوانی، رفتار کنتراست» اشاره می‌کند، اما عدد، معیار یا تصویر موردی ندارد. بنابراین الگوهای پارانشیمی و لپتومننژیال به‌اختصار با راهنماهای خارجی تکمیل شده‌اند؛ عدد فراوانی ساخته نشده است.'),
}

export const BRAIN_METASTASES_SECTIONS = [
  { id: 'pattern', icon: 'scan' },
  { id: 'review', icon: 'brain' },
  { id: 'leptomeningeal', icon: 'brain' },
  { id: 'self-check', icon: 'check' },
  { id: 'take-home', icon: 'summary', emphasis: true },
]

export const BRAIN_METASTASES_SOURCES = [
  { tag: 'GUIDELINE · 2021', title: 'EANO–ESMO: brain metastases from solid tumours', href: 'https://www.eano.eu/publications/eano-guidelines/eano-esmo-clinical-practice-guidelines-for-diagnosis-treatment-and-follow-up-of-patients-with-brain-metastasis-from-solid-tumours/', citation: L('EANO–ESMO-Leitlinie. Mindest-MRT-Sequenzen und typische bildgebende Merkmale; diese Lektion übernimmt nur Bildgebung und keine Therapieempfehlungen.', 'EANO–ESMO guideline. Minimum MRI sequences and typical imaging features; this lesson uses imaging content only, not treatment recommendations.', 'راهنمای EANO–ESMO. سکانس‌های حداقلی MRI و ویژگی‌های تیپیک تصویربرداری؛ این درس فقط بخش تصویربرداری را به‌کار می‌برد و توصیهٔ درمانی ندارد.'), scope: L('Die PDF-Seite 47 selbst enthält nur ein Stichwort; externe Ergänzung ist ausgewiesen.', 'PDF page 47 itself contains only a note; external supplementation is explicit.', 'صفحهٔ ۴۷ PDF فقط یادداشت کوتاهی دارد؛ تکمیل خارجی صریحاً مشخص شده است.') },
  { tag: 'GUIDELINE · 2023', title: 'EANO–ESMO: leptomeningeal metastasis from solid tumours', href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10619142/', citation: L('EANO–ESMO 2023; MRI-Verteilungsmuster und integrierte klinische, neuroradiologische und Liquor-Diagnostik. Keine Therapieempfehlungen übernommen.', 'EANO–ESMO 2023; MRI distribution patterns and integrated clinical, neuroradiological and CSF assessment. No treatment recommendations are included.', 'EANO–ESMO 2023؛ الگوهای توزیع MRI و ارزیابی یکپارچهٔ بالینی، تصویربرداری و CSF. توصیهٔ درمانی وارد نشده است.'), scope: L('Ergänzt die knappe PDF-Überschrift; Diagnose bleibt multimodal.', 'Supplements the sparse PDF heading; diagnosis remains multimodal.', 'عنوان کوتاه PDF را تکمیل می‌کند؛ تشخیص همچنان چندوجهی است.') },
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

const leptomeningealQuestion = {
  id: 'leptomeningeal-pattern',
  question: BRAIN_METASTASES_COPY.leptomeningealQuestion,
  options: BRAIN_METASTASES_COPY.leptomeningealOptions,
  correct: 'A',
  explanation: BRAIN_METASTASES_COPY.leptomeningealFeedback[0],
  wrong: {
    B: BRAIN_METASTASES_COPY.leptomeningealFeedback[1],
    C: BRAIN_METASTASES_COPY.leptomeningealFeedback[2],
    D: BRAIN_METASTASES_COPY.leptomeningealFeedback[3],
  },
}

export const BRAIN_METASTASES_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [lang, [brainMetastasisQuestion, leptomeningealQuestion].map(question => ({
  id: `metastasen-meningeosis-${lang}-${question.id}`,
  fach: 'gehirn',
  tags: [BRAIN_METASTASES_ID],
  question: question.question[lang],
  options: question.options.map((option, index) => ({ id: String.fromCharCode(65 + index), text: option[lang] })),
  correct: question.correct,
  explanation: question.explanation[lang],
  wrongExplanations: Object.fromEntries(Object.entries(question.wrong).map(([id, explanation]) => [id, explanation[lang]])),
  source: question.id === 'leptomeningeal-pattern'
    ? 'Gehirn.pdf PDF47 (heading only); EANO–ESMO 2023 leptomeningeal metastasis guideline.'
    : 'Gehirn.pdf PDF47 (heading and note only); EANO–ESMO 2021; SNO consensus 2022.',
}))]))

export const BRAIN_METASTASES_FLASHCARDS = BRAIN_METASTASES_COPY.takeaway.map((item, index) => ({
  id: `metastasen-meningeosis-summary-${index + 1}`,
  topicId: BRAIN_METASTASES_ID,
  category: item.title,
  front: item.title,
  answer: item.detail,
  explanation: item.detail,
  source: index < 3
    ? 'Gehirn.pdf PDF47 (heading and note only); supplemental descriptors: EANO–ESMO 2021; SNO consensus 2022.'
    : 'Gehirn.pdf PDF47 (heading only); supplemental leptomeningeal descriptors: EANO–ESMO 2023.',
}))

export const BRAIN_METASTASES_FLASHCARD_TOPIC = {
  id: BRAIN_METASTASES_ID,
  href: `/flashcards/${BRAIN_METASTASES_ID}`,
  title: BRAIN_METASTASES_COPY.title,
  icon: '◉',
  color: '#6b8196',
  description: L('Parenchymale und leptomeningeale Metastasen · Befundbegriffe · Grenzen', 'Parenchymal and leptomeningeal metastases · report descriptors · limits', 'متاستاز پارانشیمی و لپتومننژیال · توصیف گزارش · محدودیت‌ها'),
}
