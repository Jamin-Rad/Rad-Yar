'use client'

import { useLanguage } from '@/providers/LanguageProvider'
import LessonReferenceShell from '@/components/LessonReferenceShell'
import styles from '../divertikulitis/page.module.css'

const C = {
  de: {
    title: 'Kolorektales Karzinom: CT und Rektum-MRT', subtitle: 'Fernmetastasen und lokoregionäre Rektumbeurteilung als getrennte Bildgebungsaufgaben behandeln.',
    goals: ['Kolon- und Rektumkarzinom nach der Bildgebungsfrage trennen.', 'Die lokalen MRT-Beziehungen des Rektumtumors systematisch erfassen.', 'Grenzen der Lymphknotenbildgebung und DWI berücksichtigen.'],
    check: { question: 'Welche Beziehung ist für die lokale MRT-Beurteilung des Rektumkarzinoms besonders wichtig?', options: ['Der Abstand zur mesorektalen Faszie', 'Nur der maximale Tumordurchmesser', 'Allein die DWI-Signalintensität'], answer: 0, explanation: 'Die Beziehung zur mesorektalen Faszie gehört zur gezielten lokalen MRT-Beurteilung.' },
    summary: ['Kolon-CT und lokales Rektum-MRT beantworten unterschiedliche Fragen.', 'Im Rektum-MRT Tiefe, MRF, EMVI und regionale Lymphknoten strukturiert beurteilen.', 'Grenzwerte nur zusammen mit der benannten aktuellen TNM- und Reporting-Version verwenden.'],
    intro: 'Kolonkarzinom und Rektumkarzinom erfordern unterschiedliche radiologische Fragen. Die CT von Thorax, Abdomen und Becken dient der Suche nach Fernmetastasen; für die lokale Ausdehnung eines Rektumtumors liefert die hochauflösende Becken-MRT die entscheidenden anatomischen Beziehungen.',
    colonTitle: 'Kolonkarzinom: CT für Fernmetastasen', colon: [
      ['Untersuchungsfeld', 'Thorax, Abdomen und Becken auf Fernmetastasen und relevante Begleitbefunde prüfen.'],
      ['Lokaler Tumor', 'Wandverdickung, Länge, Stenose und mögliche Nachbarorganbeziehung beschreiben. CT kann die histologische und endoskopische Diagnose nicht ersetzen.'],
      ['Lymphknoten', 'Größe, Form, Rand und innere Struktur beschreiben; CT kann mikroskopische Lymphknotenmetastasen nicht sicher ausschließen.'],
      ['Fernmetastasen', 'Leber und Lunge gezielt beurteilen; zusätzlich Peritoneum und weitere Organe prüfen. Das obere/mittlere Rektum drainiert überwiegend portalvenös in Richtung Leber; das untere Rektum drainiert systemisch in Richtung Lunge. Das ist eine anatomische Tendenz, keine sichere Vorhersage im Einzelfall.'],
    ],
    rectalTitle: 'Rektumkarzinom: lokale Ausdehnung in der MRT', rectal: [
      ['Wandschichten und T-Kategorie', 'Tis bleibt auf die Mukosa begrenzt; T1 dringt in die Submukosa ein, T2 in die Muscularis propria und T3 durch die Muscularis propria in das perikolorektale Gewebe. T4a durchsetzt das viszerale Peritoneum; T4b infiltriert Nachbarorgane/-strukturen oder ist mit ihnen verwachsen. Endorektaler Ultraschall kann bei ausgewählten frühen Tumoren ergänzen.'],
      ['Tumorhöhe und extramurale Ausdehnung', 'Tumorhöhe, zirkumferentielle Lage und Tiefenausdehnung erfassen. T3-Untergruppen und Zahlenwerte aus der PDF nicht ohne Prüfung der benannten TNM-Version übernehmen.'],
      ['Mesorektale Faszie (MRF)', 'Den kleinsten Abstand des Tumors sowie relevanter Tumoranteile, EMVI oder unregelmäßiger Knoten zur MRF messen. Nach ESGAR 2026 gilt ≤1 mm als MRF-Beteiligung; glattrandige Lymphknoten allein machen die MRF nicht positiv.'],
      ['Extramurale Gefäßinvasion (EMVI)', 'Tumorsignal und expansionistische Kontur in extramuralen Venen suchen; bei positivem Befund explizit angeben und den Abstand zur MRF mitbeurteilen.'],
      ['Regionale Lymphknoten', 'Nicht allein die Größe verwenden: Form, Rand, Signalstruktur und Gesamtmuster berücksichtigen. Keine Bildgebung kann mikroskopischen Befall sicher ausschließen.'],
      ['DWI als Ergänzung', 'DWI zusammen mit hochauflösendem T2 und ADC beurteilen. Sie kann die Läsion lokalisieren helfen, ist aber kein alleiniger Ersatz für anatomische T-, MRF- oder EMVI-Beurteilung.'],
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
    check: { question: 'Which relationship is particularly important in local MRI assessment of rectal cancer?', options: ['The distance to the mesorectal fascia', 'Maximum tumour diameter alone', 'DWI signal intensity alone'], answer: 0, explanation: 'The relationship to the mesorectal fascia is part of focused local MRI assessment.' },
    summary: ['Colon CT and local rectal MRI answer different questions.', 'On rectal MRI, assess depth, MRF, EMVI and regional nodes systematically.', 'Use thresholds only with a named current TNM and reporting version.'],
    intro: 'Colon and rectal cancer raise different radiological questions. CT of the chest, abdomen and pelvis assesses distant metastases; high-resolution pelvic MRI provides the key anatomic relationships for local extension of rectal cancer.',
    colonTitle: 'Colon cancer: CT for distant metastases', colon: [
      ['Coverage', 'Assess chest, abdomen and pelvis for distant metastases and relevant associated findings.'],
      ['Primary tumour', 'Describe wall thickening, length, stenosis and possible adjacent-organ relationships. CT does not replace histologic or endoscopic diagnosis.'],
      ['Lymph nodes', 'Describe size, shape, margin and internal structure; CT cannot reliably exclude microscopic nodal metastases.'],
      ['Distant metastases', 'Assess the liver and lungs, and inspect the peritoneum and other organs. The upper/middle rectum drains mainly through the portal system toward the liver; the lower rectum drains systemically toward the lungs. This is an anatomic tendency, not a reliable prediction for an individual patient.'],
    ],
    rectalTitle: 'Rectal cancer: local extension on MRI', rectal: [
      ['Wall layers and T category', 'Tis is confined to the mucosa; T1 invades the submucosa, T2 the muscularis propria, and T3 extends through the muscularis propria into pericolorectal tissue. T4a penetrates the visceral peritoneum; T4b invades or adheres to adjacent organs/structures. Endorectal ultrasound can complement MRI for selected early tumours.'],
      ['Tumour height and extramural extent', 'Record tumour height, circumferential position and depth. Do not apply T3 subgroups or numeric cut-offs from the PDF without checking the named TNM version.'],
      ['Mesorectal fascia (MRF)', 'Measure the shortest distance from tumour and relevant tumour deposits, EMVI or irregular nodes to the MRF. ESGAR 2026 defines ≤1 mm as MRF involvement; smooth-bordered nodes alone do not make the MRF positive.'],
      ['Extramural venous invasion (EMVI)', 'Look for tumour signal and expansion of extramural veins; report a positive finding explicitly and assess its distance to the MRF.'],
      ['Regional nodes', 'Do not rely on size alone: consider shape, border, internal signal and the overall pattern. Imaging cannot reliably exclude microscopic disease.'],
      ['DWI as an adjunct', 'Read DWI with high-resolution T2 and ADC. It can help localise disease but cannot replace anatomic T, MRF or EMVI assessment.'],
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
    check: { question: 'کدام رابطه در ارزیابی موضعی MRI سرطان رکتوم اهمیت ویژه دارد؟', options: ['فاصله تا فاسیای مزورکتال', 'فقط بیشترین قطر تومور', 'فقط شدت سیگنال DWI'], answer: 0, explanation: 'رابطه با فاسیای مزورکتال بخشی از ارزیابی هدفمند MRI موضعی است.' },
    summary: ['CT کولون و MRI موضعی رکتوم به پرسش‌های متفاوتی پاسخ می‌دهند.', 'در MRI رکتوم، عمق گسترش، MRF، EMVI و غدد لنفاوی منطقه‌ای را نظام‌مند ارزیابی کنید.', 'آستانه‌ها را فقط با ذکر نسخه جاری TNM و استاندارد گزارش‌دهی به‌کار ببرید.'],
    intro: 'سرطان کولون و رکتوم پرسش‌های تصویربرداری متفاوتی دارند. CT قفسه سینه، شکم و لگن برای جست‌وجوی متاستاز دوردست است؛ MRI پرتفکیک لگن روابط آناتومیک مهم را برای گسترش موضعی سرطان رکتوم نشان می‌دهد.',
    colonTitle: 'سرطان کولون: CT برای متاستاز دوردست', colon: [
      ['محدوده بررسی', 'قفسه سینه، شکم و لگن را از نظر متاستاز دوردست و یافته‌های همراه مهم ارزیابی کنید.'],
      ['تومور اولیه', 'ضخیم‌شدن دیواره، طول، تنگی و ارتباط احتمالی با اندام مجاور را توصیف کنید. CT جایگزین تشخیص بافت‌شناسی یا اندوسکوپی نیست.'],
      ['غدد لنفاوی', 'اندازه، شکل، حاشیه و ساختار داخلی را توصیف کنید؛ CT نمی‌تواند متاستاز میکروسکوپی غدد را با اطمینان رد کند.'],
      ['متاستازهای دوردست', 'کبد و ریه‌ها را به‌دقت بررسی کنید؛ صفاق و سایر اندام‌ها را نیز ارزیابی کنید. تخلیه وریدی بخش فوقانی و میانی رکتوم عمدتاً پورتال و به‌سوی کبد است؛ بخش تحتانی رکتوم به‌صورت سیستمیک به‌سوی ریه تخلیه می‌شود. این یک گرایش آناتومیک است و الگوی هر بیمار را با اطمینان پیش‌بینی نمی‌کند.'],
    ],
    rectalTitle: 'سرطان رکتوم: گسترش موضعی در MRI', rectal: [
      ['لایه‌های دیواره و دسته T', 'در Tis تومور به مخاط محدود است؛ T1 به زیرمخاط نفوذ می‌کند، T2 به muscularis propria و T3 از muscularis propria عبور کرده و به بافت پری‌کولورکتال می‌رسد. T4a صفاق احشایی را درگیر می‌کند؛ T4b به اندام یا ساختار مجاور نفوذ می‌کند یا به آن چسبیده است. در برخی تومورهای زودرس، سونوگرافی اندورکتال می‌تواند مکمل MRI باشد.'],
      ['ارتفاع و گسترش خارج‌دیواره‌ای', 'ارتفاع، موقعیت محیطی و عمق گسترش را ثبت کنید. زیرگروه‌های T3 و حدهای عددی PDF را بدون بررسی نسخه مشخص TNM به‌کار نبرید.'],
      ['فاسیای مزورکتال (MRF)', 'کمترین فاصله تومور و کانون‌های مرتبط، EMVI یا غدد نامنظم تا MRF را بسنجید. طبق ESGAR 2026 فاصله ≤۱ میلی‌متر به معنی درگیری MRF است؛ غده با حاشیه صاف به‌تنهایی MRF را مثبت نمی‌کند.'],
      ['تهاجم وریدی خارج‌دیواره‌ای (EMVI)', 'به سیگنال تومور و اتساع وریدهای خارج دیواره توجه کنید؛ یافته مثبت را صریح گزارش و فاصله آن تا MRF را نیز ارزیابی کنید.'],
      ['غدد لنفاوی منطقه‌ای', 'فقط به اندازه تکیه نکنید؛ شکل، حاشیه، سیگنال داخلی و الگوی کلی را بسنجید. تصویربرداری نمی‌تواند درگیری میکروسکوپی را با اطمینان رد کند.'],
      ['DWI به‌عنوان مکمل', 'DWI را همراه با T2 پرتفکیک و ADC بخوانید. این توالی می‌تواند به مکان‌یابی کمک کند، اما جای ارزیابی آناتومیک T، MRF یا EMVI را نمی‌گیرد.'],
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
        <section className={styles.section}><h2>{c.rectalTitle}</h2><div className={styles.cardsGrid}>{c.rectal.map(([title, text]) => <article className={styles.infoCard} key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></section>
        <section className={styles.section}><h2>{c.workflowTitle}</h2><ol>{c.workflow.map(item => <li key={item}>{item}</li>)}</ol><div className={styles.callout}><strong>⚠</strong><p>{c.cave}</p></div><small>{c.source}</small><p><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC13212678/" target="_blank" rel="noreferrer">ESGAR rectal MRI primary-staging consensus (2026) ↗</a></p><p><a href="https://www.cancer.gov/types/colorectal/hp/rectal-treatment-pdq" target="_blank" rel="noreferrer">NCI rectal cancer staging definitions ↗</a></p><p><a href="https://doi.org/10.1007/s00261-023-03893-2" target="_blank" rel="noreferrer">SAR Rectal Cancer Lexicon (2023) ↗</a></p></section>
      </div>
    </main>
  </LessonReferenceShell>
}
