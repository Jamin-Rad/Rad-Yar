'use client'

import { useLanguage } from '@/providers/LanguageProvider'
import LessonReferenceShell from '@/components/LessonReferenceShell'
import styles from '../divertikulitis/page.module.css'

const C = {
  de: {
    title: 'Kolorektales Karzinom: CT und Rektum-MRT', subtitle: 'Fernmetastasen und lokoregionäre Rektumbeurteilung als getrennte Bildgebungsaufgaben behandeln.',
    goals: ['Kolon- und Rektumkarzinom nach der Bildgebungsfrage trennen.', 'Die lokalen MRT-Beziehungen des Rektumtumors systematisch erfassen.', 'Grenzen der Lymphknotenbildgebung und DWI berücksichtigen.'],
    check: { question: 'Im MRT liegt der Primärtumor 2 mm von der MRF entfernt. Ein unregelmäßiger tumorverdächtiger Knoten liegt 0,8 mm entfernt; ein glatt berandeter Knoten liegt 0,6 mm entfernt. Wie ist die MRF nach ESGAR 2026 zu beurteilen?', options: ['MRF+ wegen des unregelmäßigen tumorverdächtigen Knotens innerhalb von 1 mm', 'MRF−, weil der Primärtumor selbst mehr als 1 mm entfernt ist', 'MRF+ nur bei direkter Infiltration der Faszie durch den Primärtumor', 'MRF+ allein wegen eines glatt berandeten Lymphknotens innerhalb von 1 mm'], answer: 0, explanation: 'Ein Abstand von ≤1 mm durch einen unregelmäßigen tumorverdächtigen Knoten gilt als MRF-Beteiligung. Ein glatt berandeter Lymphknoten allein macht die MRF nicht positiv.' , diagramCaption: 'Schematische Querschnittsansicht: Tumor, Mesorektum und MRF; nicht maßstabsgetreu.' },
    summary: ['Kolon-CT und lokales Rektum-MRT beantworten unterschiedliche Fragen.', 'Im Rektum-MRT Tiefe, MRF, EMVI und regionale Lymphknoten strukturiert beurteilen.', 'Grenzwerte nur zusammen mit der benannten aktuellen TNM- und Reporting-Version verwenden.'],
    intro: 'Kolonkarzinom und Rektumkarzinom erfordern unterschiedliche radiologische Fragen. Die CT von Thorax, Abdomen und Becken dient der Suche nach Fernmetastasen; für die lokale Ausdehnung eines Rektumtumors liefert die hochauflösende Becken-MRT die entscheidenden anatomischen Beziehungen.',
    colonTitle: 'Kolonkarzinom: CT für Fernmetastasen', colon: [
      ['Untersuchungsfeld', 'Thorax, Abdomen und Becken auf Fernmetastasen und relevante Begleitbefunde prüfen.'],
      ['Lokaler Tumor', 'Wandverdickung, Länge, Stenose und mögliche Nachbarorganbeziehung beschreiben. CT kann die histologische und endoskopische Diagnose nicht ersetzen.'],
      ['Lymphknoten', 'Größe, Form, Rand und innere Struktur beschreiben; CT kann mikroskopische Lymphknotenmetastasen nicht sicher ausschließen.'],
      ['Fernmetastasen', 'Leber und Lunge gezielt beurteilen; zusätzlich Peritoneum und weitere Organe prüfen. Peritoneale Tumoraussaat kann sich unter anderem als Omental cake und Aszites zeigen. Das obere/mittlere Rektum drainiert überwiegend portalvenös in Richtung Leber; das untere Rektum drainiert systemisch in Richtung Lunge. Das ist eine anatomische Tendenz, keine sichere Vorhersage im Einzelfall.'],
    ],
    rectalTitle: 'Rektumkarzinom: lokale Ausdehnung in der MRT', rectal: [
      ['MRT-Protokoll', 'Hochauflösende T2-Sequenzen mit ≤3 mm Schichtdicke und <1 × 1 mm In-Plane-Auflösung sind für das Staging erforderlich. Eine kleinvolumige schräge axiale T2-Sequenz wird senkrecht zur Tumorachse ausgerichtet; eine großflächige Sequenz deckt das gesamte Becken ab. DWI wird in derselben Orientierung wie die schräge axiale T2-Sequenz aufgenommen. T1 nach Kontrastmittel ist für das lokale T-Staging nicht routinemäßig erforderlich, kann aber bei anderen Fragestellungen wie Fisteln oder der Beurteilung weiterer Beckenstrukturen ergänzen.'],
      ['Wandschichten und T-Kategorie', ['Tis: auf Mukosa/Lamina propria begrenzt.', 'T1: Invasion der Submukosa; T2: Invasion der Muscularis propria.', 'T3: durch die Muscularis propria in perikolorektales Gewebe.', 'T4a: Durchbruch des viszeralen Peritoneums; T4b: Invasion oder Adhärenz an Nachbarorgane/-strukturen.', 'Endorektaler Ultraschall kann bei ausgewählten frühen Tumoren ergänzen.']],
      ['Tumorhöhe und extramurale Ausdehnung', 'Tumorhöhe, zirkumferentielle Lage und Tiefenausdehnung erfassen. T3-Untergruppen und Zahlenwerte aus der PDF nicht ohne Prüfung der benannten TNM-Version übernehmen.'],
      ['Mesorektale Faszie (MRF)', 'Den kleinsten Abstand des Tumors sowie relevanter Tumoranteile, EMVI oder unregelmäßiger Knoten zur MRF messen. Nach ESGAR 2026 gilt ≤1 mm als MRF-Beteiligung; glattrandige Lymphknoten allein machen die MRF nicht positiv.'],
      ['Extramurale Gefäßinvasion (EMVI)', 'Tumorsignal und expansionistische Kontur in extramuralen Venen suchen; bei positivem Befund explizit angeben und den Abstand zur MRF mitbeurteilen.'],
      ['Regionale Lymphknoten', 'cN patientenbezogen als cN0, möglicherweise cN+ oder sicher cN+ mit angegebener Sicherheit beurteilen; T-Kategorie, EMVI, Anzahl und Morphologie der Knoten einbeziehen. Größe allein genügt nicht. Für obturatorische und interne iliakale Seitenknoten gilt ein Kurzachsendurchmesser ≥7 mm als verdächtig; Knoten von 5–7 mm können bei suspekter Morphologie ebenfalls auffällig sein. Bildgebung schließt mikroskopischen Befall nicht aus.'],
      ['DWI als Ergänzung', 'DWI visuell zusammen mit T2 und ADC beurteilen. Sie kann kleine oder anderweitig schwer erkennbare Tumoren lokalisieren helfen, bringt für cT, EMVI und MRF beim Primärstaging aber nur begrenzten Zusatznutzen. DWI-Signal allein charakterisiert keine Lymphknoten. Restaging nach neoadjuvanter Therapie ist eine eigene Fragestellung mit separatem Protokoll.'],
    ],
    workflowTitle: 'Strukturierte Befundfolge', workflow: [
      'Fragestellung trennen: lokoregionäre Rektumdiagnostik oder Fernmetastasensuche.',
      'Bei Rektum-MRT Tumorhöhe, zirkumferentielle Lage, Tiefenausdehnung und Mesorektum dokumentieren.',
      'Mesorektale Faszie, extramurale Gefäßinvasion und regionale Lymphknoten systematisch angeben.',
      'Die TNM-Version und den verwendeten Reporting-Standard nennen; Stufengrenzen aus der PDF nicht ungeprüft übernehmen.',
    ],
    cave: 'Die PDF zeigt TNM-Begriffe und Kriterien, deren Version aktualitätsabhängig ist. Diese Lektion kopiert keine TNM-Grenzwerte und ersetzt weder Histologie noch Tumorboardentscheidung. Für die primäre lokale MRT-Beurteilung verwendet sie den ESGAR-Konsens 2026.',
    source: 'Quellabdeckung: Abdomen.pdf, physische S. 88–89 (beide Seiten visuell geprüft). Primärquelle zur lokalen MRT: ESGAR Rectal Imaging Guideline Group, primäres Staging, 2026; ergänzend SAR Rectal Cancer Lexicon 2023.',
  },
  en: {
    title: 'Colorectal cancer: CT and rectal MRI', subtitle: 'Treat distant-metastasis assessment and local rectal staging as separate imaging tasks.',
    goals: ['Separate imaging questions for colon and rectal cancer.', 'Systematically assess key local MRI relationships of a rectal tumour.', 'Account for the limits of nodal imaging and DWI.'],
    check: { question: 'On MRI, the primary tumour is 2 mm from the MRF. An irregular suspicious node is 0.8 mm away; a smooth-bordered node is 0.6 mm away. How should the MRF be assessed under ESGAR 2026?', options: ['MRF+ because of the irregular suspicious node within 1 mm', 'MRF− because the primary tumour itself is more than 1 mm away', 'MRF+ only with direct invasion of the fascia by the primary tumour', 'MRF+ based only on a smooth-bordered lymph node within 1 mm'], answer: 0, explanation: 'A margin of ≤1 mm from an irregular suspicious node indicates MRF involvement. A smooth-bordered lymph node alone does not make the MRF positive.', diagramCaption: 'Schematic cross-section: tumour, mesorectum and MRF; not to scale.' },
    summary: ['Colon CT and local rectal MRI answer different questions.', 'On rectal MRI, assess depth, MRF, EMVI and regional nodes systematically.', 'Use thresholds only with a named current TNM and reporting version.'],
    intro: 'Colon and rectal cancer raise different radiological questions. CT of the chest, abdomen and pelvis assesses distant metastases; high-resolution pelvic MRI provides the key anatomic relationships for local extension of rectal cancer.',
    colonTitle: 'Colon cancer: CT for distant metastases', colon: [
      ['Coverage', 'Assess chest, abdomen and pelvis for distant metastases and relevant associated findings.'],
      ['Primary tumour', 'Describe wall thickening, length, stenosis and possible adjacent-organ relationships. CT does not replace histologic or endoscopic diagnosis.'],
      ['Lymph nodes', 'Describe size, shape, margin and internal structure; CT cannot reliably exclude microscopic nodal metastases.'],
      ['Distant metastases', 'Assess the liver and lungs, and inspect the peritoneum and other organs. Peritoneal spread may appear as omental cake and ascites. The upper/middle rectum drains mainly through the portal system toward the liver; the lower rectum drains systemically toward the lungs. This is an anatomic tendency, not a reliable prediction for an individual patient.'],
    ],
    rectalTitle: 'Rectal cancer: local extension on MRI', rectal: [
      ['MRI protocol', 'High-resolution T2-weighted sequences with ≤3 mm slices and <1 × 1 mm in-plane resolution are required for staging. Acquire a small-field oblique axial T2 sequence perpendicular to the tumour axis; include a large-field sequence covering the whole pelvis. Acquire DWI in the same orientation as oblique axial T2. Post-contrast T1 is not routinely required for local T staging, but may help with other questions such as fistulas or assessment of other pelvic structures.'],
      ['Wall layers and T category', ['Tis: confined to the mucosa/lamina propria.', 'T1: invasion of the submucosa; T2: invasion of the muscularis propria.', 'T3: through the muscularis propria into pericolorectal tissue.', 'T4a: penetration of the visceral peritoneum; T4b: invasion or adherence to adjacent organs/structures.', 'Endorectal ultrasound can complement MRI for selected early tumours.']],
      ['Tumour height and extramural extent', 'Record tumour height, circumferential position and depth. Do not apply T3 subgroups or numeric cut-offs from the PDF without checking the named TNM version.'],
      ['Mesorectal fascia (MRF)', 'Measure the shortest distance from tumour and relevant tumour deposits, EMVI or irregular nodes to the MRF. ESGAR 2026 defines ≤1 mm as MRF involvement; smooth-bordered nodes alone do not make the MRF positive.'],
      ['Extramural venous invasion (EMVI)', 'Look for tumour signal and expansion of extramural veins; report a positive finding explicitly and assess its distance to the MRF.'],
      ['Regional nodes', 'Assess cN per patient as cN0, possibly cN+ or definitely cN+, and state confidence; integrate cT, EMVI, node number and morphology. Size alone is insufficient. For obturator and internal iliac lateral nodes, a short axis ≥7 mm is suspicious; 5–7 mm nodes may also be suspicious when morphology is concerning. Imaging cannot exclude microscopic disease.'],
      ['DWI as an adjunct', 'Assess DWI visually with T2 and ADC. It can help detect small or otherwise difficult-to-see tumours, but adds limited value for cT, EMVI and MRF assessment in primary staging. DWI signal alone does not characterise lymph nodes. Restaging after neoadjuvant therapy is a separate task with a dedicated protocol.'],
    ],
    workflowTitle: 'Structured reporting sequence', workflow: [
      'Separate the question: locoregional rectal staging or distant-metastasis assessment.',
      'For rectal MRI, document tumour height, circumferential position, depth and mesorectum.',
      'Systematically report mesorectal fascia, extramural venous invasion and regional nodes.',
      'Name the TNM version and reporting standard; do not copy stage thresholds from the PDF without verification.',
    ],
    cave: 'The PDF presents TNM terms and criteria whose version can change. This lesson does not reproduce TNM cut-offs and does not replace histology or multidisciplinary decisions. For primary local MRI assessment, it uses the 2026 ESGAR consensus.',
    source: 'Coverage: Abdomen.pdf physical pp. 88–89 (both pages visually checked). Primary source for local MRI: ESGAR Rectal Imaging Guideline Group, primary staging, 2026; supplemented by the 2023 SAR Rectal Cancer Lexicon.',
  },
  fa: {
    title: 'سرطان کولورکتال: CT و MRI رکتوم', subtitle: 'ارزیابی متاستاز دوردست را از مرحله‌بندی موضعی رکتوم جدا کنید.',
    goals: ['پرسش تصویربرداری سرطان کولون و رکتوم را از هم جدا کنید.', 'روابط موضعی تومور رکتوم را در MRI نظام‌مند ارزیابی کنید.', 'محدودیت ارزیابی غدد لنفاوی و DWI را در نظر بگیرید.'],
    check: { question: 'در MRI، تومور اولیه ۲ میلی‌متر از MRF فاصله دارد. یک غدهٔ نامنظم و مشکوک در فاصلهٔ ۰٫۸ میلی‌متری و یک غده با حاشیه صاف در فاصلهٔ ۰٫۶ میلی‌متری قرار دارد. طبق ESGAR 2026، MRF چگونه ارزیابی می‌شود؟', options: ['MRF مثبت است، چون غدهٔ نامنظم و مشکوک در فاصلهٔ حداکثر ۱ میلی‌متر قرار دارد', 'MRF منفی است، چون خود تومور اولیه بیش از ۱ میلی‌متر فاصله دارد', 'MRF فقط در صورت تهاجم مستقیم تومور اولیه به فاسیا مثبت است', 'MRF مثبت فقط به‌دلیل یک غده با حاشیه صاف در فاصلهٔ حداکثر ۱ میلی‌متر'], answer: 0, explanation: 'فاصلهٔ حداکثر ۱ میلی‌متر از غدهٔ نامنظم و مشکوک به معنی درگیری MRF است. غدهٔ لنفاوی با حاشیهٔ صاف به‌تنهایی MRF را مثبت نمی‌کند.', diagramCaption: 'برش شماتیک از تومور، مزورکتوم و MRF؛ ترسیم مقیاس‌دار نیست.' },
    summary: ['CT کولون و MRI موضعی رکتوم به پرسش‌های متفاوتی پاسخ می‌دهند.', 'در MRI رکتوم، عمق گسترش، MRF، EMVI و غدد لنفاوی منطقه‌ای را نظام‌مند ارزیابی کنید.', 'آستانه‌ها را فقط با ذکر نسخه جاری TNM و استاندارد گزارش‌دهی به‌کار ببرید.'],
    intro: 'سرطان کولون و رکتوم پرسش‌های تصویربرداری متفاوتی دارند. CT قفسه سینه، شکم و لگن برای جست‌وجوی متاستاز دوردست است؛ MRI پرتفکیک لگن روابط آناتومیک مهم را برای گسترش موضعی سرطان رکتوم نشان می‌دهد.',
    colonTitle: 'سرطان کولون: CT برای متاستاز دوردست', colon: [
      ['محدوده بررسی', 'قفسه سینه، شکم و لگن را از نظر متاستاز دوردست و یافته‌های همراه مهم ارزیابی کنید.'],
      ['تومور اولیه', 'ضخیم‌شدن دیواره، طول، تنگی و ارتباط احتمالی با اندام مجاور را توصیف کنید. CT جایگزین تشخیص بافت‌شناسی یا اندوسکوپی نیست.'],
      ['غدد لنفاوی', 'اندازه، شکل، حاشیه و ساختار داخلی را توصیف کنید؛ CT نمی‌تواند متاستاز میکروسکوپی غدد را با اطمینان رد کند.'],
      ['متاستازهای دوردست', 'کبد و ریه‌ها را به‌دقت بررسی کنید؛ صفاق و سایر اندام‌ها را نیز ارزیابی کنید. انتشار صفاقی ممکن است با تجمع توده‌مانند امنتوم (omental cake) و آسیت دیده شود. تخلیه وریدی بخش فوقانی و میانی رکتوم عمدتاً پورتال و به‌سوی کبد است؛ بخش تحتانی رکتوم به‌صورت سیستمیک به‌سوی ریه تخلیه می‌شود. این یک گرایش آناتومیک است و الگوی هر بیمار را با اطمینان پیش‌بینی نمی‌کند.'],
    ],
    rectalTitle: 'سرطان رکتوم: گسترش موضعی در MRI', rectal: [
      ['پروتکل MRI', 'برای مرحله‌بندی، توالی‌های T2 پرتفکیک با ضخامت برش ≤۳ میلی‌متر و تفکیک درون‌صفحه‌ای کمتر از ۱×۱ میلی‌متر لازم‌اند. یک توالی اریب اکسیال T2 با میدان دید کوچک را عمود بر محور تومور بگیرید؛ یک توالی با میدان دید بزرگ نیز تمام لگن را پوشش دهد. DWI را در همان جهت صفحهٔ اریب اکسیال T2 تهیه کنید. T1 پس از تزریق به‌طور معمول برای مرحله‌بندی موضعی T لازم نیست، اما ممکن است برای پرسش‌های دیگر مانند فیستول یا ارزیابی سایر ساختارهای لگن کمک‌کننده باشد.'],
      ['لایه‌های دیواره و دسته T', ['Tis: محدود به مخاط/لامینا پروپریا.', 'T1: نفوذ به زیرمخاط؛ T2: نفوذ به muscularis propria.', 'T3: عبور از muscularis propria به بافت پری‌کولورکتال.', 'T4a: عبور از صفاق احشایی؛ T4b: نفوذ یا چسبندگی به اندام/ساختار مجاور.', 'در برخی تومورهای زودرس، سونوگرافی اندورکتال می‌تواند مکمل MRI باشد.']],
      ['ارتفاع و گسترش خارج‌دیواره‌ای', 'ارتفاع، موقعیت محیطی و عمق گسترش را ثبت کنید. زیرگروه‌های T3 و حدهای عددی PDF را بدون بررسی نسخه مشخص TNM به‌کار نبرید.'],
      ['فاسیای مزورکتال (MRF)', 'کمترین فاصله تومور و کانون‌های مرتبط، EMVI یا غدد نامنظم تا MRF را بسنجید. طبق ESGAR 2026 فاصله ≤۱ میلی‌متر به معنی درگیری MRF است؛ غده با حاشیه صاف به‌تنهایی MRF را مثبت نمی‌کند.'],
      ['تهاجم وریدی خارج‌دیواره‌ای (EMVI)', 'به سیگنال تومور و اتساع وریدهای خارج دیواره توجه کنید؛ یافته مثبت را صریح گزارش و فاصله آن تا MRF را نیز ارزیابی کنید.'],
      ['غدد لنفاوی منطقه‌ای', 'cN را برای هر بیمار با دسته‌های cN0، احتمالاً cN+ یا قطعاً cN+ و ذکر میزان اطمینان ارزیابی کنید؛ دسته T، وجود EMVI، تعداد و شکل غدد را در نظر بگیرید. اندازه به‌تنهایی کافی نیست. در غدد لترال ابتوراتور و ایلیاک داخلی، قطر محور کوتاه ≥۷ میلی‌متر مشکوک است؛ غدد ۵ تا ۷ میلی‌متری نیز در صورت مورفولوژی مشکوک می‌توانند نگران‌کننده باشند. تصویربرداری درگیری میکروسکوپی را رد نمی‌کند.'],
      ['DWI به‌عنوان مکمل', 'DWI را همراه با T2 و ADC به‌صورت دیداری ارزیابی کنید. این توالی می‌تواند به یافتن تومورهای کوچک یا دشوار برای مشاهده کمک کند، اما در مرحله‌بندی اولیه برای ارزیابی cT، EMVI و MRF ارزش افزودهٔ محدودی دارد. سیگنال DWI به‌تنهایی غدد لنفاوی را مشخص نمی‌کند. مرحله‌بندی مجدد پس از درمان نئوادجوانت پرسشی جداگانه با پروتکل اختصاصی است.'],
    ],
    workflowTitle: 'توالی گزارش ساختارمند', workflow: [
      'پرسش را جدا کنید: مرحله‌بندی موضعی رکتوم یا جست‌وجوی متاستاز دوردست.',
      'در MRI رکتوم، ارتفاع تومور، موقعیت محیطی، عمق گسترش و مزورکتوم را ثبت کنید.',
      'فاسیای مزورکتال، تهاجم وریدی خارج دیواره و غدد لنفاوی منطقه‌ای را نظام‌مند گزارش کنید.',
      'نسخه TNM و استاندارد گزارش را ذکر کنید؛ آستانه‌های PDF را بدون راستی‌آزمایی کپی نکنید.',
    ],
    cave: 'PDF اصطلاحات و معیارهای TNM را با نسخه‌ای وابسته به زمان ارائه می‌کند. این درس حدهای TNM را بازتولید نمی‌کند و جایگزین بافت‌شناسی یا تصمیم تیم چندتخصصی نیست. برای MRI موضعی اولیه از اجماع ESGAR در سال ۲۰۲۶ استفاده می‌کند.',
    source: 'پوشش منبع: صفحات فیزیکی ۸۸–۸۹ Abdomen.pdf (هر دو صفحه دیداری بررسی شدند). منبع اصلی MRI موضعی: اجماع مرحله‌بندی اولیه ESGAR، ۲۰۲۶؛ با استفاده تکمیلی از واژه‌نامه سرطان رکتوم SAR در ۲۰۲۳.',
  },
}

export default function ColorectalCancerPage() {
  const { lang } = useLanguage()
  const c = C[lang] || C.de
  return <LessonReferenceShell lessonId="abdomen-kolorektales-karzinom" lang={lang} title={c.title} diagram="rectal-mri" copy={c} goals={c.goals} check={c.check} summary={c.summary} quizHref="/ueben/quiz?fach=abdomen&n=1&themen=kolorektales-karzinom" flashcardsHref="/flashcards/kolorektales-karzinom">
    <main className={styles.page} lang={lang} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
      <div className={styles.main} style={{ maxWidth: 1080, margin: '2rem auto', padding: '0 1rem' }}>
        <section className={styles.section}><p className={styles.lead}>{c.intro}</p><h2>{c.colonTitle}</h2><div className={styles.cardsGrid}>{c.colon.map(([title, text]) => <article className={styles.infoCard} key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></section>
        <section className={styles.section}><h2>{c.rectalTitle}</h2><div className={styles.cardsGrid}>{c.rectal.map(([title, text]) => <article className={styles.infoCard} key={title}><h3>{title}</h3>{Array.isArray(text) ? <ul>{text.map((item, index) => <li key={index}>{item}</li>)}</ul> : <p>{text}</p>}</article>)}</div></section>
        <section className={styles.section}><h2>{c.workflowTitle}</h2><ol>{c.workflow.map(item => <li key={item}>{item}</li>)}</ol><div className={styles.callout}><strong>⚠</strong><p>{c.cave}</p></div><small>{c.source}</small><p><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC13212678/" target="_blank" rel="noreferrer">ESGAR rectal MRI primary-staging consensus (2026) ↗</a></p><p><a href="https://pubmed.ncbi.nlm.nih.gov/41609771/" target="_blank" rel="noreferrer">ESGAR rectal MRI restaging consensus (2026) ↗</a></p><p><a href="https://www.cancer.gov/types/colorectal/hp/rectal-treatment-pdq" target="_blank" rel="noreferrer">NCI rectal cancer staging definitions ↗</a></p><p><a href="https://doi.org/10.1007/s00261-023-03893-2" target="_blank" rel="noreferrer">SAR Rectal Cancer Lexicon (2023) ↗</a></p></section>
      </div>
    </main>
  </LessonReferenceShell>
}
