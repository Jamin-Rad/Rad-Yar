'use client'

import { useMemo, useState } from 'react'
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
    firstTitle: 'Gangbezug und Morphologie führen', first: [
      ['Gangkommunikation', 'Eine erkennbare Verbindung zum Pankreasgang unterstützt IPMN; MRCP hilft, den Gangbezug darzustellen.'],
      ['Entzündung in der Vorgeschichte', 'Eine Pankreatitis oder ein Trauma macht eine Pseudozyste plausibler, beweist sie aber nicht.'],
      ['Wand und Inhalt', 'Septen, Wandknoten, solide Anteile, Verkalkungen und Gangkaliber gezielt beschreiben.'],
    ],
    pseudoTitle: 'Wann passt eine Pseudozyste?', pseudo: 'Eine Pseudozyste besitzt keine epitheliale Auskleidung und entsteht typischerweise nach Entzündung oder Trauma. Im PDF wird eine unilokuläre Läsion beziehungsweise das Vorliegen mehrerer kleiner Zysten sowie eine bekannte Pankreatitis oder ein Bauchtrauma als Hinweis genannt. Verkalkungen und Parenchymatrophie können für chronische Pankreatitis sprechen.',
    pseudoCave: 'Die Anamnese allein schließt eine zystische Neoplasie nicht aus. Bei fehlendem passenden Kontext oder Gangbezug die Läsion nicht vorschnell als Pseudozyste etikettieren.',
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
    quizQ: 'Welche Information ist für die Unterscheidung von IPMN und einer Pseudozyste besonders hilfreich?', quizOptions: ['Die Kommunikation mit dem Pankreasgang zusammen mit dem klinischen Kontext', 'Allein die Lage im Pankreaskopf', 'Eine einzelne unilokuläre Zyste beweist eine Pseudozyste'], quizFeedback: 'Richtig ist die Gangkommunikation im Zusammenspiel mit Anamnese und Morphologie. Keine einzelne Form oder Vorgeschichte beweist die Diagnose.',
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
    firstTitle: 'Start with duct communication and morphology', first: [['Duct communication', 'A visible connection to the pancreatic duct supports IPMN; MRCP helps demonstrate it.'], ['Prior inflammation', 'Previous pancreatitis or trauma makes a pseudocyst more plausible, but does not prove it.'], ['Wall and contents', 'Describe septa, mural nodules, solid components, calcification and duct calibre.']],
    pseudoTitle: 'When does a pseudocyst fit?', pseudo: 'A pseudocyst has no epithelial lining and typically follows inflammation or trauma. The PDF lists a unilocular lesion or multiple small cysts, together with known pancreatitis or abdominal trauma, as clues. Calcification and parenchymal atrophy may suggest chronic pancreatitis.',
    pseudoCave: 'History alone does not exclude a cystic neoplasm. Without a fitting context or when duct communication is present, do not label the lesion a pseudocyst prematurely.',
    ipmnTitle: 'Name the IPMN type by duct distribution', ipmn: [['Main-duct type', 'Dilatation of the main pancreatic duct; the PDF describes a higher malignant potential.'], ['Branch-duct type', 'Cystic lesion(s) communicating with side branches.'], ['Mixed type', 'Features of both main- and branch-duct types.']],
    riskTitle: 'Risk features do not replace current guidance', risk: 'The PDF lists obstructive jaundice with a lesion in the pancreatic head, enhancing mural nodules, main-duct dilatation, growth, elevated CA 19-9 and clinical symptoms. Its management discussion refers to older Fukuoka criteria. Use the 2024 Kyoto guideline for current high-risk stigmata and worrisome features; imaging description alone does not determine surgery.',
    hTitle: 'Kyoto high-risk stigmata (2024)', hRows: [['Obstructive jaundice', 'With a cystic lesion in the pancreatic head'], ['Enhancing mural nodule ≥5 mm or solid component', 'Describe size and enhancement'], ['Main pancreatic duct ≥10 mm', 'State measurement site and duct course'], ['Suspicious or positive cytology', 'If obtained']],
    reportTitle: 'A concise, useful report', report: ['Location and number of lesions', 'Three-dimensional size; septa, mural nodules and solid components', 'Relationship to main or side duct and duct diameter', 'Associated findings: pancreatitis, calcification, parenchymal atrophy, biliary obstruction', 'Relevant risk features and comparison with prior studies'],
    quizQ: 'Which information is especially useful when distinguishing IPMN from a pseudocyst?', quizOptions: ['Duct communication together with clinical context', 'Location in the pancreatic head alone', 'A single unilocular cyst proves pseudocyst'], quizFeedback: 'Duct communication should be considered together with history and morphology. No single shape or historical feature proves the diagnosis.',
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
    firstTitle: 'از ارتباط مجرایی و مورفولوژی شروع کنید', first: [['ارتباط با مجرا', 'ارتباط قابل مشاهده با مجرای پانکراس به نفع IPMN است؛ MRCP به نشان‌دادن آن کمک می‌کند.'], ['سابقه التهاب', 'پانکراتیت یا تروما احتمال پسودوسیست را بیشتر می‌کند، اما آن را اثبات نمی‌کند.'], ['دیواره و محتوا', 'سپتا، ندول دیواره‌ای، جزء جامد، کلسیفیکاسیون و قطر مجرا را توصیف کنید.']],
    pseudoTitle: 'چه زمانی پسودوسیست مطرح است؟', pseudo: 'پسودوسیست پوشش اپی‌تلیالی ندارد و معمولاً پس از التهاب یا تروما ایجاد می‌شود. PDF ضایعه تک‌حفره‌ای یا چند کیست کوچک را همراه با سابقه پانکراتیت یا تروما به‌عنوان سرنخ مطرح می‌کند. کلسیفیکاسیون و آتروفی پارانشیم می‌توانند به نفع پانکراتیت مزمن باشند.',
    pseudoCave: 'شرح‌حال به‌تنهایی نئوپلاسم کیستیک را رد نمی‌کند. اگر زمینه مناسب نیست یا ارتباط مجرایی وجود دارد، زودهنگام ضایعه را پسودوسیست ننامید.',
    ipmnTitle: 'نوع IPMN را بر اساس توزیع مجرا نام‌گذاری کنید', ipmn: [['نوع مجرای اصلی', 'اتساع مجرای اصلی پانکراس؛ در PDF خطر بدخیمی بالاتری برای آن ذکر شده است.'], ['نوع مجاری فرعی', 'ضایعه یا ضایعات کیستیک با ارتباط با شاخه‌های جانبی.'], ['نوع مختلط', 'ویژگی‌های نوع مجرای اصلی و فرعی را با هم دارد.']],
    riskTitle: 'ویژگی‌های خطر جایگزین راهنمای به‌روز نیستند', risk: 'PDF زردی انسدادی همراه ضایعه سر پانکراس، ندول دیواره‌ای تقویت‌شونده، اتساع مجرای اصلی، رشد، افزایش CA 19-9 و علائم بالینی را فهرست می‌کند. بخش مدیریت آن به معیارهای قدیمی‌تر Fukuoka ارجاع می‌دهد. برای طبقه‌بندی امروز، معیارهای High-risk stigmata و worrisome features راهنمای Kyoto سال ۲۰۲۴ را به‌کار ببرید؛ توصیف تصویربرداری به‌تنهایی تصمیم جراحی نیست.',
    hTitle: 'معیارهای High-risk stigmata در Kyoto (۲۰۲۴)', hRows: [['زردی انسدادی', 'در حضور ضایعه کیستیک در سر پانکراس'], ['ندول دیواره‌ای تقویت‌شونده ≥۵ میلی‌متر یا جزء جامد', 'اندازه و تقویت را توصیف کنید'], ['مجرای اصلی پانکراس ≥۱۰ میلی‌متر', 'محل اندازه‌گیری و مسیر مجرا را ذکر کنید'], ['سیتولوژی مشکوک یا مثبت', 'در صورت انجام']],
    reportTitle: 'گزارشی کوتاه و کاربردی', report: ['محل و تعداد ضایعات', 'اندازه در سه محور؛ سپتا، ندول‌های دیواره‌ای و اجزای جامد', 'ارتباط با مجرای اصلی یا فرعی و قطر مجرا', 'یافته‌های همراه: نشانه‌های پانکراتیت، کلسیفیکاسیون، آتروفی پارانشیم، انسداد صفراوی', 'ویژگی‌های خطر مرتبط و مقایسه با بررسی قبلی'],
    quizQ: 'کدام اطلاعات برای افتراق IPMN از پسودوسیست به‌ویژه مفید است؟', quizOptions: ['ارتباط با مجرا همراه با زمینه بالینی', 'فقط قرارگرفتن در سر پانکراس', 'یک کیست تک‌حفره‌ای به‌تنهایی پسودوسیست را ثابت می‌کند'], quizFeedback: 'ارتباط با مجرا را در کنار شرح‌حال و مورفولوژی تفسیر کنید. هیچ شکل یا سابقه منفردی تشخیص را ثابت نمی‌کند.',
    source: 'منبع اصلی پوشش: Abdomen.pdf، صفحات ۴۰ تا ۴۲. معیارهای خطر به‌روز: راهنمای Kyoto سال ۲۰۲۴.',
  },
}

export default function PancreaticCystsPage() {
  const { lang } = useLanguage()
  const copy = COPY[lang] || COPY.de
  const rtl = lang === 'fa'
  const [selected, setSelected] = useState(null)
  const ids = useMemo(() => copy.sections.map(section => section.id), [copy.sections])
  return <LessonReferenceShell lessonId="abdomen-pancreatic-cysts" lang={lang} title={c.title || c.subtitle || c.sub} diagram="cystic-pancreas" copy={c}><main className={styles.page} dir={rtl ? 'rtl' : 'ltr'} lang={lang}>

    <header className={styles.header}><div className={styles.breadcrumb}><Link href="/">RadYar</Link><span>›</span><Link href="/lernen/abdomen">Abdomen</Link><span>›</span><span>{copy.crumb}</span></div><div className={styles.hero}><div className={styles.heroText}><h1>{copy.title}</h1><p>{copy.subtitle}</p></div></div></header>
    <div className={styles.layout}><aside className={styles.sidebar}><div className={styles.sideTitle}>{copy.toc}</div>{copy.sections.map(section => <a className={styles.sideItem} href={`#${section.id}`} key={section.id}><span>{section.icon}</span><strong>{section.label}</strong></a>)}</aside>
      <div className={styles.main}>
        <section id={ids[0]} className={styles.section}><h2>{copy.firstTitle}</h2><p className={styles.lead}>{copy.lead}</p><div className={styles.tableWrap}><table className={styles.table}><tbody>{copy.first.map(([a,b])=><tr key={a}><th>{a}</th><td>{b}</td></tr>)}</tbody></table></div></section>
        <section id={ids[1]} className={styles.section}><h2>{copy.pseudoTitle}</h2><p>{copy.pseudo}</p><div className={styles.callout}><strong>⚠</strong><p>{copy.pseudoCave}</p></div></section>
        <section id={ids[2]} className={styles.section}><h2>{copy.ipmnTitle}</h2><div className={styles.tableWrap}><table className={styles.table}><tbody>{copy.ipmn.map(([a,b])=><tr key={a}><th>{a}</th><td>{b}</td></tr>)}</tbody></table></div></section>
        <section id={ids[3]} className={styles.section}><h2>{copy.riskTitle}</h2><p>{copy.risk}</p><h3>{copy.hTitle}</h3><div className={styles.tableWrap}><table className={styles.table}><tbody>{copy.hRows.map(([a,b])=><tr key={a}><th>{a}</th><td>{b}</td></tr>)}</tbody></table></div></section>
        <section id={ids[4]} className={styles.section}><h2>{copy.reportTitle}</h2><ol>{copy.report.map(row=><li key={row}>{row}</li>)}</ol><h3>{copy.quizQ}</h3><div className={styles.cardsGrid}>{copy.quizOptions.map((option,i)=><button type="button" key={option} onClick={()=>setSelected(i)} aria-pressed={selected===i} style={{textAlign:rtl?'right':'left',padding:'1rem',borderRadius:'0.75rem',border:selected===i?'2px solid #168bb0':'1px solid #cbd5e1',background:selected===i?'#e8f7fb':'white',cursor:'pointer'}}>{option}</button>)}</div>{selected!==null&&<p role="status">{selected===0?copy.quizFeedback:(lang==='fa'?'این گزینه به‌تنهایی تشخیص را ثابت نمی‌کند. ارتباط مجرایی را همراه زمینه بالینی و مورفولوژی بررسی کنید.':lang==='en'?'This feature alone does not establish the diagnosis. Assess duct communication together with clinical context and morphology.':'Dieses Merkmal allein beweist die Diagnose nicht. Beurteile Gangkommunikation zusammen mit klinischem Kontext und Morphologie.')}</p>}<small>{copy.source}</small><p><a href="https://doi.org/10.1016/j.pan.2023.12.009" target="_blank" rel="noreferrer">Kyoto IPMN guidelines 2024</a></p></section>
      </div>
    </div>
  </main></LessonReferenceShell>
}
