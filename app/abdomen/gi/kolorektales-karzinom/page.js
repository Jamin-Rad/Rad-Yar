'use client'

import { useLanguage } from '@/providers/LanguageProvider'
import LessonReferenceShell from '@/components/LessonReferenceShell'
import styles from '../divertikulitis/page.module.css'

const C = {
  de: {
    title: 'Kolorektales Karzinom: CT und Rektum-MRT', subtitle: 'Fernmetastasen und lokoregionäre Rektumbeurteilung als getrennte Bildgebungsaufgaben behandeln.',
    intro: 'Kolonkarzinom und Rektumkarzinom erfordern unterschiedliche radiologische Fragen. Die CT von Thorax, Abdomen und Becken dient der Suche nach Fernmetastasen; für die lokale Ausdehnung eines Rektumtumors liefert die hochauflösende Becken-MRT die entscheidenden anatomischen Beziehungen.',
    colonTitle: 'Kolonkarzinom: CT für Fernmetastasen', colon: [
      ['Untersuchungsfeld', 'Thorax, Abdomen und Becken auf Fernmetastasen und relevante Begleitbefunde prüfen.'],
      ['Lokaler Tumor', 'Wandverdickung, Länge, Stenose und mögliche Nachbarorganbeziehung beschreiben. CT kann die histologische und endoskopische Diagnose nicht ersetzen.'],
      ['Lymphknoten', 'Größe, Form, Rand und innere Struktur beschreiben; CT kann mikroskopische Lymphknotenmetastasen nicht sicher ausschließen.'],
    ],
    rectalTitle: 'Rektumkarzinom: lokale Ausdehnung in der MRT', rectal: [
      ['Primärtumor', 'Höhe, Ausdehnung und Beziehung zu Muscularis propria und mesorektalem Fett erfassen. Die MRT ist für die lokale Ausbreitung zentral.'],
      ['Mesorektale Faszie', 'Abstand des Tumors und suspekter Strukturen zur mesorektalen Faszie gezielt messen; die aktuelle Terminologie/Schwelle der verwendeten Leitlinie benennen.'],
      ['Extramurale Gefäßinvasion', 'Extramurale Gefäße auf tumorverdächtige Kontur und Signalveränderung prüfen und bei positiver Einschätzung ausdrücklich berichten.'],
      ['DWI', 'Diffusionsbilder gemeinsam mit hochauflösenden T2-Sequenzen beurteilen, nicht isoliert.'],
    ],
    workflowTitle: 'Strukturierte Befundfolge', workflow: [
      'Fragestellung trennen: lokoregionäre Rektumdiagnostik oder Fernmetastasensuche.',
      'Bei Rektum-MRT Tumorhöhe, zirkumferentielle Lage, Tiefenausdehnung und Mesorektum dokumentieren.',
      'Mesorektale Faszie, extramurale Gefäßinvasion und regionale Lymphknoten systematisch angeben.',
      'Die TNM-Version und den verwendeten Reporting-Standard nennen; Stufengrenzen aus der PDF nicht ungeprüft übernehmen.',
    ],
    cave: 'Die PDF zeigt TNM-Begriffe und Kriterien, deren Version aktualitätsabhängig ist. Diese Lektion kopiert keine TNM-Grenzwerte und ersetzt weder Histologie noch Tumorboardentscheidung. Für lokales Staging bezieht sie sich auf aktuelle ACR- und SAR-Empfehlungen.',
    source: 'Quellabdeckung: Abdomen.pdf, S. 88–89 (beide Seiten visuell geprüft). Primärquellen: ACR Appropriateness Criteria: Staging and Disease Monitoring of Rectal Cancer (2025); Society of Abdominal Radiology, Rectal Cancer Lexicon (2023), DOI 10.1007/s00261-023-03893-2.',
  },
  en: {
    title: 'Colorectal cancer: CT and rectal MRI', subtitle: 'Treat distant-metastasis assessment and local rectal staging as separate imaging tasks.',
    intro: 'Colon and rectal cancer raise different radiological questions. CT of the chest, abdomen and pelvis assesses distant metastases; high-resolution pelvic MRI provides the key anatomic relationships for local extension of rectal cancer.',
    colonTitle: 'Colon cancer: CT for distant metastases', colon: [
      ['Coverage', 'Assess chest, abdomen and pelvis for distant metastases and relevant associated findings.'],
      ['Primary tumour', 'Describe wall thickening, length, stenosis and possible adjacent-organ relationships. CT does not replace histologic or endoscopic diagnosis.'],
      ['Lymph nodes', 'Describe size, shape, margin and internal structure; CT cannot reliably exclude microscopic nodal metastases.'],
    ],
    rectalTitle: 'Rectal cancer: local extension on MRI', rectal: [
      ['Primary tumour', 'Assess height, extent and relationship to the muscularis propria and mesorectal fat. MRI is central to local staging.'],
      ['Mesorectal fascia', 'Measure the distance of the tumour and suspicious structures to the mesorectal fascia; state the terminology/threshold used by the current guideline.'],
      ['Extramural venous invasion', 'Assess extramural vessels for tumour-suspicious contour and signal changes, and explicitly report a positive assessment.'],
      ['DWI', 'Interpret diffusion-weighted images together with high-resolution T2 sequences, not in isolation.'],
    ],
    workflowTitle: 'Structured reporting sequence', workflow: [
      'Separate the question: locoregional rectal staging or distant-metastasis assessment.',
      'For rectal MRI, document tumour height, circumferential position, depth and mesorectum.',
      'Systematically report mesorectal fascia, extramural venous invasion and regional nodes.',
      'Name the TNM version and reporting standard; do not copy stage thresholds from the PDF without verification.',
    ],
    cave: 'The PDF presents TNM terms and criteria whose version can change. This lesson does not reproduce TNM cut-offs and does not replace histology or a multidisciplinary decision. Local staging references current ACR and SAR recommendations.',
    source: 'Coverage: Abdomen.pdf, pp. 88–89 (both pages visually checked). Primary sources: ACR Appropriateness Criteria: Staging and Disease Monitoring of Rectal Cancer (2025); Society of Abdominal Radiology, Rectal Cancer Lexicon (2023), DOI 10.1007/s00261-023-03893-2.',
  },
  fa: {
    title: 'سرطان کولورکتال: CT و MRI رکتوم', subtitle: 'ارزیابی متاستاز دوردست را از مرحله‌بندی موضعی رکتوم جدا کنید.',
    intro: 'سرطان کولون و رکتوم پرسش‌های تصویربرداری متفاوتی دارند. CT قفسه سینه، شکم و لگن برای جست‌وجوی متاستاز دوردست است؛ MRI پرتفکیک لگن روابط آناتومیک مهم را برای گسترش موضعی سرطان رکتوم نشان می‌دهد.',
    colonTitle: 'سرطان کولون: CT برای متاستاز دوردست', colon: [
      ['محدوده بررسی', 'قفسه سینه، شکم و لگن را از نظر متاستاز دوردست و یافته‌های همراه مهم ارزیابی کنید.'],
      ['تومور اولیه', 'ضخیم‌شدن دیواره، طول، تنگی و ارتباط احتمالی با اندام مجاور را توصیف کنید. CT جایگزین تشخیص بافت‌شناسی یا اندوسکوپی نیست.'],
      ['غدد لنفاوی', 'اندازه، شکل، حاشیه و ساختار داخلی را توصیف کنید؛ CT نمی‌تواند متاستاز میکروسکوپی غدد را با اطمینان رد کند.'],
    ],
    rectalTitle: 'سرطان رکتوم: گسترش موضعی در MRI', rectal: [
      ['تومور اولیه', 'ارتفاع، وسعت و ارتباط با muscularis propria و چربی مزورکتال را بررسی کنید. MRI برای مرحله‌بندی موضعی محوری است.'],
      ['فاسیای مزورکتال', 'فاصله تومور و ساختارهای مشکوک تا فاسیای مزورکتال را اندازه بگیرید؛ اصطلاح و آستانه راهنمای جاری را ذکر کنید.'],
      ['تهاجم وریدی خارج دیواره', 'عروق خارج دیواره را از نظر شکل و سیگنال مشکوک به تومور بررسی و ارزیابی مثبت را صریح گزارش کنید.'],
      ['DWI', 'تصاویر انتشار را همراه با توالی‌های T2 پرتفکیک ارزیابی کنید، نه به‌تنهایی.'],
    ],
    workflowTitle: 'توالی گزارش ساختارمند', workflow: [
      'پرسش را جدا کنید: مرحله‌بندی موضعی رکتوم یا جست‌وجوی متاستاز دوردست.',
      'در MRI رکتوم، ارتفاع تومور، موقعیت محیطی، عمق گسترش و مزورکتوم را ثبت کنید.',
      'فاسیای مزورکتال، تهاجم وریدی خارج دیواره و غدد لنفاوی منطقه‌ای را نظام‌مند گزارش کنید.',
      'نسخه TNM و استاندارد گزارش را ذکر کنید؛ آستانه‌های PDF را بدون راستی‌آزمایی کپی نکنید.',
    ],
    cave: 'PDF اصطلاحات و معیارهای TNM را با نسخه‌ای وابسته به زمان ارائه می‌کند. این درس حدهای TNM را بازتولید نمی‌کند و جایگزین بافت‌شناسی یا تصمیم تیم چندتخصصی نیست. برای مرحله‌بندی موضعی به توصیه‌های جاری ACR و SAR ارجاع می‌دهد.',
    source: 'پوشش منبع: Abdomen.pdf صفحات ۸۸ تا ۸۹ (هر دو صفحه دیداری بررسی شدند). منابع اولیه: معیارهای تناسب ACR برای مرحله‌بندی و پایش سرطان رکتوم (۲۰۲۵)؛ واژه‌نامه سرطان رکتوم انجمن رادیولوژی شکم (SAR، ۲۰۲۳)، DOI 10.1007/s00261-023-03893-2.',
  },
}

export default function ColorectalCancerPage() {
  const { lang } = useLanguage()
  const c = C[lang] || C.de
  return <LessonReferenceShell lessonId="abdomen-kolorektales-karzinom" lang={lang} title={c.title} diagram="rectal-mri" copy={c}>
    <main className={styles.page} lang={lang} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
      <header className={styles.header}><div className={styles.hero}><div className={styles.heroText}><h1>{c.title}</h1><p>{c.subtitle}</p></div></div></header>
      <div className={styles.main} style={{ maxWidth: 1080, margin: '2rem auto', padding: '0 1rem' }}>
        <section className={styles.section}><p className={styles.lead}>{c.intro}</p><h2>{c.colonTitle}</h2><div className={styles.cardsGrid}>{c.colon.map(([title, text]) => <article className={styles.infoCard} key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></section>
        <section className={styles.section}><h2>{c.rectalTitle}</h2><div className={styles.cardsGrid}>{c.rectal.map(([title, text]) => <article className={styles.infoCard} key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></section>
        <section className={styles.section}><h2>{c.workflowTitle}</h2><ol>{c.workflow.map(item => <li key={item}>{item}</li>)}</ol><div className={styles.callout}><strong>⚠</strong><p>{c.cave}</p></div><small>{c.source}</small><p><a href="https://acsearch.acr.org/docs/3195870/Narrative/" target="_blank" rel="noreferrer">ACR Rectal Cancer Staging and Monitoring Criteria (2025) ↗</a></p><p><a href="https://doi.org/10.1007/s00261-023-03893-2" target="_blank" rel="noreferrer">SAR Rectal Cancer Lexicon (2023) ↗</a></p></section>
      </div>
    </main>
  </LessonReferenceShell>
}
