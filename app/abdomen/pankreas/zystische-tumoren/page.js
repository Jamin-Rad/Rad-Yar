'use client'

import { useMemo } from 'react'
import {newQuestions as cystQuestions} from '@/data/assessmentQuality/atvCysticPancreas'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import LessonReferenceShell from '@/components/LessonReferenceShell'
import styles from '../../gi/divertikulitis/page.module.css'

const COPY = {
  de: {
    crumb: 'Pankreas · Zystische Läsionen', title: 'Zystische Pankreasläsionen',
    subtitle: 'Pseudozyste und IPMN anhand von Wand, Pankreasgang und klinischem Kontext unterscheiden.', toc: 'Lernpfad',
    sections: [
      { id: 'first-look', label: 'Zuerst den Gangbezug prüfen', icon: '🔎' },
      { id: 'pseudo', label: 'Pseudozyste erkennen', icon: '🫧' },
      { id: 'ipmn', label: 'IPMN einordnen', icon: '🧬' },
      { id: 'risk', label: 'Risikomerkmale berichten', icon: '⚠️' },
      { id: 'practice', label: 'Befund strukturieren', icon: '📝' },
    ],
    lead: 'Bei einer zystischen Pankreasläsion ist die entscheidende erste Frage nicht „Wie heißt die Zyste?“, sondern: Gibt es eine Verbindung zum Pankreasgang, und passt die Morphologie zum klinischen Kontext?',
    imageAlt: 'Zwei unveränderte Beispielbilder aus Abdomen.pdf: links eine axiale MRT-Aufnahme mit mehreren hellen zystischen Arealen im Oberbauch, rechts eine MRCP mit hell dargestellten Gangstrukturen und zystischen Arealen. Keine Markierung zeigt eine einzelne Gangverbindung.',
    imageCaption: 'Abdomen.pdf, physische PDF-Seite 41 (Druckseite 40). Die axiale MRT (links) und MRCP (rechts) stehen neben dem Hinweis, Anzahl, Morphologie und Kommunikation mit dem Pankreasgang zu beurteilen. Die Quelle markiert keine einzelne Verbindung; beurteilen Sie diese in der vollständigen Untersuchung, nicht anhand dieses Ausschnitts allein.',
    firstTitle: 'Gangbezug und Morphologie führen', first: [
      ['Gangkommunikation', 'Eine erkennbare Verbindung zum Pankreasgang unterstützt IPMN; MRCP hilft, den Gangbezug darzustellen.'],
      ['Entzündung in der Vorgeschichte', 'Eine Pankreatitis oder ein Trauma macht eine Pseudozyste plausibler, beweist sie aber nicht.'],
      ['Wand und Inhalt', 'Septen, Wandknoten, solide Anteile, Verkalkungen und Gangkaliber gezielt beschreiben.'],
    ],
    pseudoTitle: 'Wann passt eine Pseudozyste?', pseudo: 'Eine Pseudozyste besitzt keine epitheliale Auskleidung und entsteht typischerweise nach Entzündung oder Trauma. Im PDF wird eine unilokuläre Läsion beziehungsweise das Vorliegen mehrerer kleiner Zysten sowie eine bekannte Pankreatitis oder ein Bauchtrauma als Hinweis genannt. Verkalkungen und Parenchymatrophie können für chronische Pankreatitis sprechen.',
    pseudoCave: 'Die Anamnese allein schließt eine zystische Neoplasie nicht aus. Eine Gangkommunikation kann auch bei Pseudozysten vorkommen und trennt sie allein nicht sicher von einer IPMN. Entzündungskontext und gesamte Morphologie gemeinsam beurteilen.',
    ipmnTitle: 'IPMN: Typ nach Gangverteilung benennen', ipmn: [
      ['Hauptgangtyp', 'Dilatation des Ductus pancreaticus; im PDF als mit höherem Entartungsrisiko beschrieben.'],
      ['Seitengangtyp', 'Zystische Läsion(en) mit Kommunikation zu Seitenästen.'],
      ['Gemischter Typ', 'Merkmale von Haupt- und Seitengangtyp.'],
    ],
    riskTitle: 'Risikomerkmale sind kein Ersatz für die aktuelle Leitlinie', risk: 'Das PDF listet obstruktiven Ikterus bei Läsion im Pankreaskopf, kontrastmittelaufnehmende Wandknoten, Hauptgangdilatation, Wachstum, erhöhtes CA 19-9 und klinische Symptome. Seine Managementangaben verweisen auf ältere Fukuoka-Kriterien. Für die aktuelle Einordnung müssen High-risk stigmata und worrisome features nach den Kyoto-Leitlinien 2024 verwendet werden; die radiologische Beschreibung allein entscheidet nicht über eine Operation.',
    hTitle: 'Kyoto-High-risk-stigmata (2024)', hRows: [
      ['Obstruktiver Ikterus', 'Bei zystischer Läsion im Pankreaskopf'],
      ['Kontrastmittelaufnehmender Wandknoten ≥ 5 mm oder solide Komponente', 'Größe und Enhancement beschreiben'],
      ['Hauptgang ≥ 10 mm', 'Messort und Gangverlauf angeben'],
      ['Suspekte oder positive Zytologie', 'Nur falls erhoben'],
    ],
    reportTitle: 'Ein kurzer, nützlicher Befund', report: ['Lokalisation und Zahl der Läsionen', 'Größe in drei Ebenen; Septen, Wandknoten und solide Komponenten', 'Bezug zum Haupt- oder Seitengang und Gangdurchmesser', 'Begleitbefunde: Pankreatitiszeichen, Verkalkungen, Parenchymatrophie, Gallenwegsobstruktion', 'Relevante Risikomerkmale und Vergleich mit Voruntersuchungen'],
    source: 'Primärquelle für die Abdeckung: Abdomen.pdf, S. 40–42. Aktuelle Risikokriterien: Kyoto-Leitlinie 2024.',
  },
  en: {
    crumb: 'Pancreas · Cystic lesions', title: 'Cystic pancreatic lesions',
    subtitle: 'Distinguish pseudocyst from IPMN using the wall, pancreatic duct and clinical context.', toc: 'Learning path',
    sections: [
      { id: 'first-look', label: 'Check duct communication first', icon: '🔎' }, { id: 'pseudo', label: 'Recognise a pseudocyst', icon: '🫧' },
      { id: 'ipmn', label: 'Classify IPMN', icon: '🧬' }, { id: 'risk', label: 'Report risk features', icon: '⚠️' }, { id: 'practice', label: 'Structure the report', icon: '📝' },
    ],
    lead: 'For a cystic pancreatic lesion, the first question is not “What is the cyst called?” but whether it communicates with the pancreatic duct and whether its morphology fits the clinical context.',
    imageAlt: 'Two unaltered examples from Abdomen.pdf: an axial MRI of the upper abdomen with several bright cystic areas on the left, and an MRCP with bright ductal structures and cystic areas on the right. No marker identifies a specific duct connection.',
    imageCaption: 'Abdomen.pdf, physical PDF page 41 (printed page 40). The axial MRI (left) and MRCP (right) accompany the source note to assess lesion number, morphology and communication with the pancreatic duct. The source does not mark a specific connection; assess it on the full examination, not from this crop alone.',
    firstTitle: 'Start with duct communication and morphology', first: [['Duct communication', 'A visible connection to the pancreatic duct supports IPMN; MRCP helps demonstrate it.'], ['Prior inflammation', 'Previous pancreatitis or trauma makes a pseudocyst more plausible, but does not prove it.'], ['Wall and contents', 'Describe septa, mural nodules, solid components, calcification and duct calibre.']],
    pseudoTitle: 'When does a pseudocyst fit?', pseudo: 'A pseudocyst has no epithelial lining and typically follows inflammation or trauma. The PDF lists a unilocular lesion or multiple small cysts, together with known pancreatitis or abdominal trauma, as clues. Calcification and parenchymal atrophy may suggest chronic pancreatitis.',
    pseudoCave: 'History alone does not exclude a cystic neoplasm. Pseudocysts may also communicate with the pancreatic duct, so communication alone does not reliably distinguish them from IPMN. Assess the inflammatory context and the full morphology together.',
    ipmnTitle: 'Name the IPMN type by duct distribution', ipmn: [['Main-duct type', 'Dilatation of the main pancreatic duct; the PDF describes a higher malignant potential.'], ['Branch-duct type', 'Cystic lesion(s) communicating with side branches.'], ['Mixed type', 'Features of both main- and branch-duct types.']],
    riskTitle: 'Risk features do not replace current guidance', risk: 'The PDF lists obstructive jaundice with a lesion in the pancreatic head, enhancing mural nodules, main-duct dilatation, growth, elevated CA 19-9 and clinical symptoms. Its management discussion refers to older Fukuoka criteria. Use the 2024 Kyoto guideline for current high-risk stigmata and worrisome features; imaging description alone does not determine surgery.',
    hTitle: 'Kyoto high-risk stigmata (2024)', hRows: [['Obstructive jaundice', 'With a cystic lesion in the pancreatic head'], ['Enhancing mural nodule ≥5 mm or solid component', 'Describe size and enhancement'], ['Main pancreatic duct ≥10 mm', 'State measurement site and duct course'], ['Suspicious or positive cytology', 'If obtained']],
    reportTitle: 'A concise, useful report', report: ['Location and number of lesions', 'Three-dimensional size; septa, mural nodules and solid components', 'Relationship to main or side duct and duct diameter', 'Associated findings: pancreatitis, calcification, parenchymal atrophy, biliary obstruction', 'Relevant risk features and comparison with prior studies'],
    source: 'Primary coverage source: Abdomen.pdf, pp. 40–42. Current risk criteria: 2024 Kyoto guideline.',
  },
  fa: {
    crumb: 'پانکراس · ضایعات کیستیک', title: 'ضایعات کیستیک پانکراس',
    subtitle: 'پسودوسیست را از IPMN با توجه به دیواره، مجرای پانکراس و زمینه بالینی افتراق دهید.', toc: 'مسیر یادگیری',
    sections: [
      { id: 'first-look', label: 'ابتدا ارتباط با مجرا را بررسی کنید', icon: '🔎' }, { id: 'pseudo', label: 'پسودوسیست را بشناسید', icon: '🫧' },
      { id: 'ipmn', label: 'نوع IPMN را مشخص کنید', icon: '🧬' }, { id: 'risk', label: 'ویژگی‌های خطر را گزارش کنید', icon: '⚠️' }, { id: 'practice', label: 'گزارش را ساختاربندی کنید', icon: '📝' },
    ],
    lead: 'در ضایعه کیستیک پانکراس، پرسش اول این نیست که «نام کیست چیست؟»؛ ابتدا ارتباط با مجرای پانکراس و تناسب مورفولوژی با زمینه بالینی را بررسی کنید.',
    imageAlt: 'دو تصویر نمونه و بدون تغییر از Abdomen.pdf: در سمت چپ MRI آگزیال شکم فوقانی با چند ناحیهٔ کیستیک روشن، و در سمت راست MRCP با ساختارهای مجرایی روشن و نواحی کیستیک. هیچ علامتی یک ارتباط مشخص با مجرا را نشان نمی‌دهد.',
    imageCaption: 'Abdomen.pdf، صفحهٔ فیزیکی ۴۱ (چاپی ۴۰). MRI آگزیال (چپ) و MRCP (راست) در کنار تأکید منبع بر بررسی تعداد ضایعات، مورفولوژی و ارتباط با مجرای پانکراس آمده‌اند. منبع ارتباط مشخصی را علامت‌گذاری نکرده است؛ این ارتباط را در بررسی کامل بسنجید، نه فقط بر اساس این برش.',
    firstTitle: 'از ارتباط مجرایی و مورفولوژی شروع کنید', first: [['ارتباط با مجرا', 'ارتباط قابل مشاهده با مجرای پانکراس به نفع IPMN است؛ MRCP به نشان‌دادن آن کمک می‌کند.'], ['سابقه التهاب', 'پانکراتیت یا تروما احتمال پسودوسیست را بیشتر می‌کند، اما آن را اثبات نمی‌کند.'], ['دیواره و محتوا', 'سپتا، ندول دیواره‌ای، جزء جامد، کلسیفیکاسیون و قطر مجرا را توصیف کنید.']],
    pseudoTitle: 'چه زمانی پسودوسیست مطرح است؟', pseudo: 'پسودوسیست پوشش اپی‌تلیالی ندارد و معمولاً پس از التهاب یا تروما ایجاد می‌شود. PDF ضایعه تک‌حفره‌ای یا چند کیست کوچک را همراه با سابقه پانکراتیت یا تروما به‌عنوان سرنخ مطرح می‌کند. کلسیفیکاسیون و آتروفی پارانشیم می‌توانند به نفع پانکراتیت مزمن باشند.',
    pseudoCave: 'شرح‌حال به‌تنهایی نئوپلاسم کیستیک را رد نمی‌کند. پسودوسیست نیز ممکن است با مجرای پانکراس ارتباط داشته باشد؛ بنابراین ارتباط مجرایی به‌تنهایی آن را با اطمینان از IPMN جدا نمی‌کند. زمینهٔ التهاب و مجموعهٔ ویژگی‌های مورفولوژیک را با هم ارزیابی کنید.',
    ipmnTitle: 'نوع IPMN را بر اساس توزیع مجرا نام‌گذاری کنید', ipmn: [['نوع مجرای اصلی', 'اتساع مجرای اصلی پانکراس؛ در PDF خطر بدخیمی بالاتری برای آن ذکر شده است.'], ['نوع مجاری فرعی', 'ضایعه یا ضایعات کیستیک با ارتباط با شاخه‌های جانبی.'], ['نوع مختلط', 'ویژگی‌های نوع مجرای اصلی و فرعی را با هم دارد.']],
    riskTitle: 'ویژگی‌های خطر جایگزین راهنمای به‌روز نیستند', risk: 'PDF زردی انسدادی همراه ضایعه سر پانکراس، ندول دیواره‌ای تقویت‌شونده، اتساع مجرای اصلی، رشد، افزایش CA 19-9 و علائم بالینی را فهرست می‌کند. بخش مدیریت آن به معیارهای قدیمی‌تر Fukuoka ارجاع می‌دهد. برای طبقه‌بندی امروز، معیارهای High-risk stigmata و worrisome features راهنمای Kyoto سال ۲۰۲۴ را به‌کار ببرید؛ توصیف تصویربرداری به‌تنهایی تصمیم جراحی نیست.',
    hTitle: 'معیارهای High-risk stigmata در Kyoto (۲۰۲۴)', hRows: [['زردی انسدادی', 'در حضور ضایعه کیستیک در سر پانکراس'], ['ندول دیواره‌ای تقویت‌شونده ≥۵ میلی‌متر یا جزء جامد', 'اندازه و تقویت را توصیف کنید'], ['مجرای اصلی پانکراس ≥۱۰ میلی‌متر', 'محل اندازه‌گیری و مسیر مجرا را ذکر کنید'], ['سیتولوژی مشکوک یا مثبت', 'در صورت انجام']],
    reportTitle: 'گزارشی کوتاه و کاربردی', report: ['محل و تعداد ضایعات', 'اندازه در سه محور؛ سپتا، ندول‌های دیواره‌ای و اجزای جامد', 'ارتباط با مجرای اصلی یا فرعی و قطر مجرا', 'یافته‌های همراه: نشانه‌های پانکراتیت، کلسیفیکاسیون، آتروفی پارانشیم، انسداد صفراوی', 'ویژگی‌های خطر مرتبط و مقایسه با بررسی قبلی'],
    source: 'منبع اصلی پوشش: Abdomen.pdf، صفحات ۴۰ تا ۴۲. معیارهای خطر به‌روز: راهنمای Kyoto سال ۲۰۲۴.',
  },
}

export default function PancreaticCystsPage() {
  const { lang } = useLanguage()
  const copy = COPY[lang] || COPY.de
  const rtl = lang === 'fa'
  const ids = useMemo(() => copy.sections.map(section => section.id), [copy.sections])
  const returnTo = lang === 'de' ? '/abdomen/pankreas/zystische-tumoren#first-look' : `/abdomen/pankreas/zystische-tumoren?lang=${lang}#first-look`
  const from = encodeURIComponent(returnTo)
  const language = lang === 'de' ? '' : `&lang=${lang}`
  const quizHref = `/ueben/quiz?fach=abdomen&n=3&themen=ipmn&from=${from}${language}`
  const flashcardsHref = `/flashcards/abdomen-pancreatic-cysts?from=${from}${language}`
  const shellLabels = {
    de: { selfCheck: 'Risikomerkmale einordnen', summary: 'Befund knapp strukturieren' },
    en: { selfCheck: 'Classify risk features', summary: 'Structure the report briefly' },
    fa: { selfCheck: 'ویژگی‌های خطر را طبقه‌بندی کنید', summary: 'گزارش را کوتاه ساختاربندی کنید' },
  }
  const checks = Object.fromEntries(['de','en','fa'].map(l=>[l,cystQuestions(l).find(q=>q.id.endsWith('-nodule-risk'))]))
  const selfCheck = {
    question: Object.fromEntries(['de','en','fa'].map(l=>[l,checks[l].question])),
    options: [0,1,2,3].map(i=>Object.fromEntries(['de','en','fa'].map(l=>[l,checks[l].options[i].text]))),
    answer: 0,
    explanation: Object.fromEntries(['de','en','fa'].map(l=>[l,checks[l].explanation])),
    wrongFeedback: [0,1,2,3].map(i=>Object.fromEntries(['de','en','fa'].map(l=>[l,checks[l].wrongExplanations['ABCD'[i]] || checks[l].explanation])))
  }
  return <LessonReferenceShell lessonId="abdomen-pancreatic-cysts" lang={lang} title={copy.title} diagram="cystic-pancreas" copy={{ ...copy, labels: shellLabels }} check={selfCheck} goals={[{"de":"Gangkommunikation gemeinsam mit Entzündungsverlauf und flüssigem oder nekrotischem Inhalt einordnen.","en":"Interpret duct communication together with the inflammatory course and fluid versus necrotic contents.","fa":"ارتباط مجرایی را همراه سیر التهاب و محتوای مایع یا نکروتیک تفسیر کنید."},{"de":"Seröse mikrozystische Hinweise erkennen und die begrenzte Aussage makrozystischer Kontur benennen.","en":"Recognise serous microcystic clues and state the limitations of macrocystic contour.","fa":"نشانه‌های میکروکیستیک سروزی را بشناسید و محدودیت حاشیهٔ ماکروکیستیک را بیان کنید."},{"de":"Enhancierende Wandknoten nach Kyoto2024 als HRS oder WF klassifizieren, ohne eine Krebsdiagnose oder automatische Operation abzuleiten.","en":"Classify enhancing mural nodules as Kyoto2024 HRS or WF without inferring a cancer diagnosis or automatic surgery.","fa":"ندول دیواره‌ای دارای جذب مادهٔ حاجب را طبق کیوتو۲۰۲۴ به HRS یا WF طبقه‌بندی کنید، بدون استنباط سرطان یا جراحی خودکار."}]} quizHref={quizHref} flashcardsHref={flashcardsHref}><main className={styles.page} dir={rtl ? 'rtl' : 'ltr'} lang={lang}>

    <div className={styles.layout}><aside className={styles.sidebar}><div className={styles.sideTitle}>{copy.toc}</div>{copy.sections.map(section => <a className={styles.sideItem} href={`#${section.id}`} key={section.id}><span>{section.icon}</span><strong>{section.label}</strong></a>)}</aside>
      <div className={styles.main}>
        <section id={ids[0]} className={styles.section}><h2>{copy.firstTitle}</h2><p className={styles.lead}>{copy.lead}</p><div className={styles.tableWrap}><table className={styles.table}><tbody>{copy.first.map(([a,b])=><tr key={a}><th>{a}</th><td>{b}</td></tr>)}</tbody></table></div><figure className={styles.pancreaticMriFigure}><img src="/educational/pancreatic-cysts/mri-mrcp-pdf-p41.jpg" alt={copy.imageAlt} width="2305" height="925" loading="lazy"/><figcaption>{copy.imageCaption}</figcaption></figure></section>
        <section id={ids[1]} className={styles.section}><h2>{copy.pseudoTitle}</h2><p>{copy.pseudo}</p><div className={styles.callout}><strong>⚠</strong><p>{copy.pseudoCave}</p><p>{{"de":"Seröse Differenzialdiagnose: Mikrozystische, schwammartige Binnenstruktur und eine zentrale Narbe können eine seröse zystische Neoplasie stützen. Makrozystische seröse Formen überlappen mit muzinösen Läsionen; Kontur oder Lage allein sind kein sicherer Gewebenachweis.","en":"Serous differential: microcystic sponge-like architecture and a central scar can support a serous cystic neoplasm. Macrocystic serous forms overlap with mucinous lesions; contour or location alone is not secure tissue evidence.","fa":"افتراق سروزی: ساختار داخلی میکروکیستیک و اسفنج‌مانند و اسکار مرکزی می‌توانند از نئوپلاسم کیستیک سروزی حمایت کنند. شکل‌های سروزی ماکروکیستیک با ضایعات موسینوس همپوشانی دارند؛ حاشیه یا محل به‌تنهایی شاهد بافتی مطمئن نیست."}[lang]}</p><p><a href="https://pubmed.ncbi.nlm.nih.gov/19522024/" target="_blank" rel="noreferrer">Shah et al. 2009 ↗</a></p></div></section>
        <section id={ids[2]} className={styles.section}><h2>{copy.ipmnTitle}</h2><div className={styles.tableWrap}><table className={styles.table}><tbody>{copy.ipmn.map(([a,b])=><tr key={a}><th>{a}</th><td>{b}</td></tr>)}</tbody></table></div></section>
        <section id={ids[3]} className={styles.section}><h2>{copy.riskTitle}</h2><p>{copy.risk}</p><h3>{copy.hTitle}</h3><div className={styles.tableWrap}><table className={styles.table}><tbody>{copy.hRows.map(([a,b])=><tr key={a}><th>{a}</th><td>{b}</td></tr>)}</tbody></table></div></section>
        <section id={ids[4]} className={styles.section}><h2>{copy.reportTitle}</h2><ol>{copy.report.map(row=><li key={row}>{row}</li>)}</ol><small>{copy.source}</small><p><a href="https://doi.org/10.1016/j.pan.2023.12.009" target="_blank" rel="noreferrer">Kyoto IPMN guidelines 2024</a></p></section>
      </div>
    </div>
  </main></LessonReferenceShell>
}
