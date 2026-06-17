'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useMobileLearningLayout } from '@/hooks/useMobileLearningLayout'
import styles from './page.module.css'

const GUIDELINE_URL = 'https://register.awmf.org/de/leitlinien/detail/021-020'

const LEARNING_CASES = [
  {
    id: 'uncomplicated',
    image: '/divertikulitis/learning-uncomplicated-rid-149797.jpg',
    url: 'https://radiopaedia.org/cases/uncomplicated-sigmoid-diverticulitis-2?lang=us',
    credit: 'Case courtesy of Amr El-Talla, Radiopaedia.org · rID: 149797',
  },
  {
    id: 'abscess',
    image: '/divertikulitis/learning-abscess-rid-29015.jpg',
    url: 'https://radiopaedia.org/cases/acute-sigmoid-diverticulitis-with-abscess?lang=us',
    credit: 'Case courtesy of Frank Gaillard, Radiopaedia.org · rID: 29015',
  },
]

const CONTENT = {
  de: {
    toc: 'Inhaltsverzeichnis',
    breadcrumbAbdomen: 'Abdomen',
    breadcrumbCurrent: 'Gastrointestinaltrakt · Divertikulitis',
    title: 'Divertikulose & Divertikulitis',
    subtitle: 'CT-Diagnostik, CDD-Klassifikation und sichere Erkennung komplizierter Verläufe',
    sourceLabel: 'Dr. Zia',
    actionMcq: 'MCQ',
    actionFlash: 'Flashcards',
    keyLabel: 'Merke',
    caveLabel: 'CAVE',
    openCase: 'Fall in Radiopaedia öffnen',
    guideline: 'S3-Leitlinie öffnen',
    sections: [
      { id: 'grundlagen', label: 'Grundlagen', icon: '🌀' },
      { id: 'ct', label: 'CT-Diagnostik', icon: '🩻' },
      { id: 'cdd', label: 'CDD-Klassifikation', icon: '📋' },
      { id: 'komplikationen', label: 'Komplikationen', icon: '⚠️' },
      { id: 'befundung', label: 'Befundung', icon: '📝' },
      { id: 'faelle', label: 'Fallbeispiele', icon: '🔬' },
      { id: 'takehome', label: 'Take home message', icon: '💡' },
    ],
    heroCards: [
      { value: 'CT C+', label: 'Methode der Wahl', text: 'Ausdehnung und Komplikationen erfassen' },
      { value: '> 4 mm', label: 'Wandverdickung', text: 'segmental, meist im Sigma' },
      { value: 'CDD 1–4', label: 'klinische Einordnung', text: 'unkompliziert bis kompliziert' },
    ],
    basics: {
      title: 'Divertikulose ist nicht Divertikulitis',
      lead: 'Kolondivertikel sind erworbene Ausstülpungen von Mukosa und Submukosa durch Schwachstellen der Muskularis. Erst entzündliche Veränderungen am Divertikel und im umgebenden Fettgewebe begründen eine Divertikulitis.',
      items: [
        { title: 'Divertikulose', text: 'Divertikel ohne entzündliche Begleitreaktion. Häufiger asymptomatischer Zufallsbefund.' },
        { title: 'Prädilektion', text: 'Im westlichen Patientenkollektiv überwiegend im Sigma, wo ein engeres Lumen mit höherem intraluminalem Druck zusammentrifft.' },
        { title: 'Divertikulitis', text: 'Entzündetes Divertikel mit fokaler Darmwandverdickung und perikolischer Fettgewebsreaktion.' },
      ],
      key: 'Die Diagnose stützt sich nicht auf Divertikel allein, sondern auf die Kombination aus entzündetem Divertikel, segmentaler Wandverdickung und perikolischer Reaktion.',
    },
    ct: {
      title: 'CT-Diagnostik',
      lead: 'Bei klinischem Verdacht auf akute Divertikulitis dient die kontrastverstärkte CT zur Diagnosesicherung, Schweregradeinteilung und Suche nach Komplikationen.',
      headers: ['Baustein', 'Typischer CT-Befund', 'Bedeutung'],
      rows: [
        ['Divertikel', 'Fokale Ausstülpung, häufig mit entzündlich verdickter Wand', 'Ausgangspunkt der Entzündung'],
        ['Darmwand', 'Segmentale Verdickung, meist > 4 mm', 'Ausdehnung und Stenose beurteilen'],
        ['Fettgewebe', 'Perikolisches stranding / dirty fat', 'Oft disproportional ausgeprägt zur Wandverdickung'],
        ['Kontrastmittel', 'Mural und peridivertikulär verstärkte Reaktion', 'Entzündungsaktivität und Abszesswand'],
        ['Luft / Flüssigkeit', 'Extraluminale Gasbläschen oder Kollektion', 'Hinweis auf Perforation beziehungsweise Abszess'],
      ],
      protocol: [
        { title: 'Portalvenöse Kontrastphase', text: 'In der Regel ausreichend zur Beurteilung von Darmwand, Fettgewebe, Abszessen und freien Flüssigkeitsansammlungen.' },
        { title: 'Keine routinemäßige enterale Kontrastierung', text: 'Orales oder rektales Kontrastmittel ist für die Standarddiagnostik meist nicht erforderlich.' },
        { title: 'Gezielte rektale Kontrastierung', text: 'Kann bei spezieller Fragestellung, etwa Fistel oder Anastomosenleck, hilfreich sein.' },
      ],
      cave: 'Bei ausgeprägter kurzer asymmetrischer Wandverdickung, abdominellen Lymphknoten oder fehlender typischer peridivertikulärer Reaktion muss ein kolorektales Karzinom mitbedacht werden.',
    },
    cdd: {
      title: 'CDD-Klassifikation',
      lead: 'Die Classification of Diverticular Disease verbindet klinische und bildgebende Befunde. Für den radiologischen Bericht ist vor allem die Trennung zwischen unkompliziert und kompliziert entscheidend.',
      headers: ['Typ', 'Bezeichnung', 'Bildgebung'],
      rows: [
        ['0', 'Asymptomatische Divertikulose', 'Divertikel ohne Entzündung'],
        ['1a', 'Akut unkompliziert', 'Wandverdickung ohne relevante Umgebungsreaktion'],
        ['1b', 'Akut unkompliziert, phlegmonös', 'Perikolische Fettgewebsreaktion, kein Abszess'],
        ['2a', 'Mikroabszess / gedeckte Perforation', 'Kleine perikolische Kollektion bis 3 cm'],
        ['2b', 'Makroabszess', 'Abszess über 3 cm'],
        ['2c', 'Freie Perforation', 'Freie Luft oder Flüssigkeit, Peritonitiszeichen'],
        ['3', 'Chronisch-rezidivierende Divertikelkrankheit', 'Je nach Subtyp ohne oder mit Stenose, Fistel oder Konglomerat'],
        ['4', 'Divertikelblutung', 'Aktive Blutung gegebenenfalls in der CT-Angiografie'],
      ],
      key: 'Abszess, freie Perforation, Fistel oder entzündliche Stenose machen aus der unkomplizierten Divertikulitis eine komplizierte Erkrankung.',
    },
    complications: {
      title: 'Komplikationen gezielt suchen',
      lead: 'Sobald eine Divertikulitis erkannt ist, muss die gesamte Untersuchung nach Komplikationen und deren Ausdehnung durchsucht werden.',
      items: [
        { title: 'Abszess', text: 'Flüssigkeitsdichte Kollektion mit randständigem Enhancement, häufig mit Gaseinschlüssen. Größe und Zugänglichkeit angeben.' },
        { title: 'Perforation', text: 'Perikolische Gasbläschen sprechen für eine gedeckte Perforation; freie intraperitoneale Luft und Flüssigkeit für einen freien Durchbruch.' },
        { title: 'Fistel', text: 'Trakt oder entzündliche Adhärenz zu Nachbarorganen. Gas in der Harnblase ohne vorausgegangene Instrumentierung ist ein wichtiger Hinweis auf eine kolovesikale Fistel.' },
        { title: 'Stenose / Ileus', text: 'Lumeneinengung, prästenotische Dilatation und Länge des betroffenen Segments beschreiben; Tumor differenzialdiagnostisch ausschließen.' },
      ],
      cave: 'Nicht bei der Diagnose „Divertikulitis“ stehen bleiben: Abszessgröße, freie Luft, Fistel, Stenose und Fernkomplikationen verändern das weitere Management.',
    },
    reporting: {
      title: 'Strukturierter CT-Befund',
      lead: 'Ein kurzer, vollständiger Bericht beantwortet die klinisch entscheidenden Fragen.',
      items: [
        { title: '1. Lokalisation', text: 'Betroffenes Kolonsegment und Länge der entzündlichen Veränderung.' },
        { title: '2. Leitbefunde', text: 'Entzündetes Divertikel, maximale Wanddicke und Ausmaß des perikolischen strandings.' },
        { title: '3. Komplikationen', text: 'Abszess mit drei Dimensionen, extraluminale Luft, freie Flüssigkeit, Fistel oder Obstruktion.' },
        { title: '4. Einordnung', text: 'Unkompliziert oder kompliziert; soweit sicher möglich CDD-Typ nennen.' },
        { title: '5. Differenzialdiagnose', text: 'Bei atypischem Muster Karzinom, Kolitis oder epiploische Appendagitis diskutieren.' },
      ],
      key: 'Beispiel: Akute Sigmadivertikulitis mit ausgeprägter perikolischer Fettgewebsreaktion, ohne Abszess oder freie Perforation, vereinbar mit CDD Typ 1b.',
    },
    cases: {
      title: 'Zwei Radiopaedia-Fallbeispiele',
      lead: 'Die Bilder zeigen den entscheidenden Unterschied: lokale Entzündung ohne drainierbare Kollektion versus komplizierter Verlauf mit Abszessen.',
      uncomplicated: {
        label: 'Unkompliziert',
        title: 'Akute unkomplizierte Sigmadivertikulitis',
        text: 'Segmentale Sigmaverdickung, mehrere Divertikel und ausgeprägtes perikolisches stranding. Keine freie Perforation und keine drainierbare Kollektion.',
        alt: 'Axiale CT einer unkomplizierten Sigmadivertikulitis',
      },
      abscess: {
        label: 'Kompliziert',
        title: 'Sigmadivertikulitis mit Abszess',
        text: 'Randständig kontrastierende perikolische Kollektionen mit Gaseinschlüssen am Rektosigmoid, entsprechend einer komplizierten Divertikulitis.',
        alt: 'Axiale kontrastverstärkte CT einer Sigmadivertikulitis mit Abszess',
      },
    },
    takehome: {
      title: 'Take home message',
      lead: 'Die wichtigsten Regeln für die Befundung.',
      items: [
        { title: 'Trias erkennen', text: 'Divertikel, segmentale Wandverdickung und perikolisches stranding ergeben das typische CT-Muster.' },
        { title: 'Komplikationen entscheiden', text: 'Abszess, Perforation, Fistel und Stenose aktiv suchen und präzise beschreiben.' },
        { title: 'CDD sinnvoll einsetzen', text: 'Die Klassifikation ergänzt den Befund; die sichere Trennung unkompliziert versus kompliziert ist zentral.' },
        { title: 'Tumor nicht übersehen', text: 'Atypisch fokale oder asymmetrische Verdickung und Lymphadenopathie verlangen eine onkologische Differenzialdiagnose.' },
      ],
    },
  },
  en: {
    toc: 'Contents',
    breadcrumbAbdomen: 'Abdomen',
    breadcrumbCurrent: 'Gastrointestinal tract · Diverticulitis',
    title: 'Diverticulosis & diverticulitis',
    subtitle: 'CT diagnosis, CDD classification and reliable detection of complicated disease',
    sourceLabel: 'Dr. Zia',
    actionMcq: 'MCQ',
    actionFlash: 'Flashcards',
    keyLabel: 'Key point',
    caveLabel: 'Caution',
    openCase: 'Open case in Radiopaedia',
    guideline: 'Open S3 guideline',
    sections: [
      { id: 'grundlagen', label: 'Basics', icon: '🌀' },
      { id: 'ct', label: 'CT diagnosis', icon: '🩻' },
      { id: 'cdd', label: 'CDD classification', icon: '📋' },
      { id: 'komplikationen', label: 'Complications', icon: '⚠️' },
      { id: 'befundung', label: 'Reporting', icon: '📝' },
      { id: 'faelle', label: 'Cases', icon: '🔬' },
      { id: 'takehome', label: 'Take home message', icon: '💡' },
    ],
    heroCards: [
      { value: 'C+ CT', label: 'method of choice', text: 'define extent and complications' },
      { value: '> 4 mm', label: 'wall thickening', text: 'segmental, usually sigmoid' },
      { value: 'CDD 1–4', label: 'clinical classification', text: 'uncomplicated to complicated' },
    ],
    basics: {
      title: 'Diverticulosis is not diverticulitis',
      lead: 'Colonic diverticula are acquired herniations of mucosa and submucosa through weak points in the muscular wall. Diverticulitis requires inflammatory change involving a diverticulum and the surrounding fat.',
      items: [
        { title: 'Diverticulosis', text: 'Diverticula without surrounding inflammation, commonly an asymptomatic incidental finding.' },
        { title: 'Predilection', text: 'In Western populations, the sigmoid colon is most often affected.' },
        { title: 'Diverticulitis', text: 'An inflamed diverticulum with focal bowel wall thickening and pericolic inflammatory change.' },
      ],
      key: 'Diagnosis rests on the combination of an inflamed diverticulum, segmental wall thickening and pericolic inflammation, not on diverticula alone.',
    },
    ct: {
      title: 'CT diagnosis',
      lead: 'Contrast-enhanced CT confirms the diagnosis, grades severity and identifies complications.',
      headers: ['Feature', 'Typical CT finding', 'Meaning'],
      rows: [
        ['Diverticulum', 'Focal outpouching, often with an inflamed wall', 'Epicentre of inflammation'],
        ['Bowel wall', 'Segmental thickening, usually > 4 mm', 'Assess extent and stenosis'],
        ['Fat', 'Pericolic stranding / dirty fat', 'Often disproportionate to wall thickening'],
        ['Enhancement', 'Mural and peridiverticular inflammatory enhancement', 'Activity and abscess wall'],
        ['Gas / fluid', 'Extraluminal gas bubbles or a collection', 'Perforation or abscess'],
      ],
      protocol: [
        { title: 'Portal venous phase', text: 'Usually sufficient to assess the bowel wall, surrounding fat, abscesses and free fluid.' },
        { title: 'No routine enteric contrast', text: 'Oral or rectal contrast is generally unnecessary for standard assessment.' },
        { title: 'Targeted rectal contrast', text: 'May help when a fistula or anastomotic leak is specifically suspected.' },
      ],
      cave: 'Marked short-segment asymmetric wall thickening, lymphadenopathy or absent typical peridiverticular inflammation should raise concern for colorectal cancer.',
    },
    cdd: {
      title: 'CDD classification',
      lead: 'The Classification of Diverticular Disease combines clinical and imaging findings. The crucial radiological distinction is uncomplicated versus complicated disease.',
      headers: ['Type', 'Category', 'Imaging'],
      rows: [
        ['0', 'Asymptomatic diverticulosis', 'Diverticula without inflammation'],
        ['1a', 'Acute uncomplicated', 'Wall thickening without relevant surrounding reaction'],
        ['1b', 'Acute uncomplicated, phlegmonous', 'Pericolic inflammation without abscess'],
        ['2a', 'Microabscess / contained perforation', 'Pericolic collection up to 3 cm'],
        ['2b', 'Macroabscess', 'Abscess larger than 3 cm'],
        ['2c', 'Free perforation', 'Free gas or fluid and signs of peritonitis'],
        ['3', 'Chronic recurrent disease', 'Depending on subtype, stenosis, fistula or conglomerate may occur'],
        ['4', 'Diverticular bleeding', 'Active bleeding may be shown on CT angiography'],
      ],
      key: 'Abscess, free perforation, fistula or inflammatory stenosis defines complicated disease.',
    },
    complications: {
      title: 'Search actively for complications',
      lead: 'Once diverticulitis is identified, review the entire examination for complications and their extent.',
      items: [
        { title: 'Abscess', text: 'Fluid collection with rim enhancement and often gas. Report size and potential accessibility.' },
        { title: 'Perforation', text: 'Pericolic gas suggests contained perforation; free intraperitoneal gas and fluid indicate free perforation.' },
        { title: 'Fistula', text: 'A tract or inflammatory adherence to an adjacent organ. Bladder gas without instrumentation suggests a colovesical fistula.' },
        { title: 'Stenosis / obstruction', text: 'Describe narrowing, upstream dilatation and segment length; exclude malignancy.' },
      ],
      cave: 'Do not stop after naming diverticulitis: abscess size, free gas, fistula, stenosis and distant complications alter management.',
    },
    reporting: {
      title: 'Structured CT report',
      lead: 'A concise, complete report answers the clinically relevant questions.',
      items: [
        { title: '1. Location', text: 'Affected colonic segment and length of inflammatory change.' },
        { title: '2. Core findings', text: 'Inflamed diverticulum, maximum wall thickness and extent of fat stranding.' },
        { title: '3. Complications', text: 'Abscess in three dimensions, extraluminal gas, free fluid, fistula or obstruction.' },
        { title: '4. Classification', text: 'State uncomplicated or complicated and provide the CDD type when confident.' },
        { title: '5. Differential', text: 'For atypical patterns discuss cancer, colitis or epiploic appendagitis.' },
      ],
      key: 'Example: Acute sigmoid diverticulitis with marked pericolic inflammation, without abscess or free perforation, consistent with CDD type 1b.',
    },
    cases: {
      title: 'Two Radiopaedia cases',
      lead: 'The images demonstrate the key distinction: local inflammation without a drainable collection versus complicated disease with abscesses.',
      uncomplicated: {
        label: 'Uncomplicated',
        title: 'Acute uncomplicated sigmoid diverticulitis',
        text: 'Segmental sigmoid wall thickening, diverticula and marked pericolic stranding without free perforation or a drainable collection.',
        alt: 'Axial CT of uncomplicated sigmoid diverticulitis',
      },
      abscess: {
        label: 'Complicated',
        title: 'Sigmoid diverticulitis with abscess',
        text: 'Rim-enhancing pericolic collections containing gas at the rectosigmoid junction indicate complicated diverticulitis.',
        alt: 'Axial contrast-enhanced CT of sigmoid diverticulitis with abscess',
      },
    },
    takehome: {
      title: 'Take home message',
      lead: 'The essentials for reporting.',
      items: [
        { title: 'Recognise the triad', text: 'Diverticula, segmental wall thickening and pericolic stranding form the typical CT pattern.' },
        { title: 'Complications matter', text: 'Actively search for and precisely describe abscess, perforation, fistula and stenosis.' },
        { title: 'Use CDD purposefully', text: 'Classification supports the report; the key distinction is uncomplicated versus complicated.' },
        { title: 'Do not miss cancer', text: 'Atypical focal or asymmetric thickening and lymphadenopathy require an oncological differential.' },
      ],
    },
  },
}

CONTENT.fa = {
  ...CONTENT.en,
  toc: 'فهرست مطالب',
  breadcrumbAbdomen: 'شکم',
  breadcrumbCurrent: 'دستگاه گوارش · دیورتیکولیت',
  title: 'دیورتیکولوز و دیورتیکولیت',
  subtitle: 'تشخیص CT، طبقه‌بندی CDD و شناسایی بیماری پیچیده',
  keyLabel: 'نکته مهم',
  caveLabel: 'احتیاط',
  actionFlash: 'فلش‌کارت',
}

const READ_COPY = {
  de: { mark: 'Als gelesen markieren', read: 'Als gelesen markiert', error: 'Bitte melde dich an, um deinen Lernfortschritt zu speichern.', signIn: 'Anmelden' },
  en: { mark: 'Mark as read', read: 'Marked as read', error: 'Please sign in to save your learning progress.', signIn: 'Sign in' },
  fa: { mark: 'علامت‌گذاری به‌عنوان خوانده‌شده', read: 'به‌عنوان خوانده‌شده علامت‌گذاری شد', error: 'برای ذخیره پیشرفت یادگیری لطفاً وارد شوید.', signIn: 'ورود' },
}

function ReadButton({ isRead, onClick, authError }) {
  const { lang } = useLanguage()
  const copy = READ_COPY[lang] || READ_COPY.de
  return (
    <div className={styles.readControl}>
      <button type="button" className={`${styles.readButton} ${isRead ? styles.readButtonActive : ''}`} onClick={onClick}>
        <span className={styles.readCheck} aria-hidden="true">{isRead ? '✓' : ''}</span>
        <span>{isRead ? copy.read : copy.mark}</span>
      </button>
      {authError && <div className={styles.readError} role="alert"><span>{copy.error}</span><Link href="/sign-in">{copy.signIn}</Link></div>}
    </div>
  )
}

function Table({ headers, rows }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead><tr>{headers.map(header => <th key={header}>{header}</th>)}</tr></thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Callout({ type = 'note', label, children }) {
  return (
    <div className={`${styles.callout} ${type === 'cave' ? styles.cave : ''}`.trim()}>
      <strong>{label}</strong>
      <p>{children}</p>
    </div>
  )
}

function Section({ id, title, lead, children }) {
  const isMobile = useMobileLearningLayout()
  const [open, setOpen] = useState(true)
  useEffect(() => setOpen(!isMobile), [isMobile, id])
  return (
    <section id={id} className={styles.section}>
      <button className={styles.sectionHeader} type="button" onClick={() => setOpen(value => !value)} aria-expanded={open}>
        <h2>{title}</h2>
        <span>{open ? '−' : '+'}</span>
      </button>
      {open && <div className={styles.sectionBody}>{lead && <p className={styles.lead}>{lead}</p>}{children}</div>}
    </section>
  )
}

function Cards({ items }) {
  return (
    <div className={styles.cardsGrid}>
      {items.map(item => (
        <div className={styles.infoCard} key={item.title}>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </div>
      ))}
    </div>
  )
}

function CaseCard({ item, copy }) {
  const caseCopy = copy.cases[item.id]
  return (
    <article className={styles.caseCardLink}>
      <figure className={styles.caseImage}>
        <Image src={item.image} alt={caseCopy.alt} width={612} height={612} className={styles.caseImageAsset} />
      </figure>
      <div className={styles.caseBody}>
        <div className={styles.caseLabelRow}>
          <span className={styles.caseLabel}>{caseCopy.label}</span>
          <span className={styles.caseLabel}>CT</span>
        </div>
        <h3>{caseCopy.title}</h3>
        <p>{caseCopy.text}</p>
        <small>{item.credit}</small>
        <a href={item.url} target="_blank" rel="noopener noreferrer" className={styles.caseExternalLink}>{copy.openCase} ↗</a>
      </div>
    </article>
  )
}

export default function DivertikulitisPage() {
  const { lang } = useLanguage()
  const copy = CONTENT[lang] || CONTENT.de
  const isRTL = lang === 'fa'
  const [activeId, setActiveId] = useState(copy.sections[0].id)
  const { isRead, toggleRead, authError } = useLessonReadStatus('divertikulitis')
  const withLang = href => lang === 'de' ? href : (href.includes('?') ? `${href}&lang=${lang}` : `${href}?lang=${lang}`)
  const sectionIds = useMemo(() => copy.sections.map(section => section.id), [copy.sections])

  useEffect(() => {
    const observers = sectionIds.map(id => {
      const element = document.getElementById(id)
      if (!element) return null
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActiveId(id)
      }, { rootMargin: '-18% 0px -72% 0px', threshold: 0.01 })
      observer.observe(element)
      return observer
    })
    return () => observers.forEach(observer => observer?.disconnect())
  }, [sectionIds])

  return (
    <main className={styles.page} dir={isRTL ? 'rtl' : 'ltr'} lang={lang}>
      <header className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link href={withLang('/')}>RadYar</Link><span>›</span>
          <Link href={withLang('/lernen/abdomen')}>{copy.breadcrumbAbdomen}</Link><span>›</span>
          <span>{copy.breadcrumbCurrent}</span>
        </div>
        <div className={styles.hero}>
          <div className={styles.heroText}>
            <span className={styles.sourceBadge}>{copy.sourceLabel}</span>
            <h1>{copy.title}</h1>
            <p>{copy.subtitle}</p>
            <div className={styles.actions}>
              <Link href={withLang(`/ueben/quiz?fach=abdomen&n=10&themen=divertikulitis&from=${encodeURIComponent(withLang('/abdomen/gi/divertikulitis'))}`)} className={styles.actionBtn}>{copy.actionMcq}</Link>
              <Link href={withLang(`/flashcards/divertikulitis?from=${encodeURIComponent(withLang('/abdomen/gi/divertikulitis'))}`)} className={styles.actionBtn}>{copy.actionFlash}</Link>
              <a href={GUIDELINE_URL} target="_blank" rel="noopener noreferrer" className={styles.actionBtn}>{copy.guideline} ↗</a>
            </div>
          </div>
          <div className={styles.heroStats}>
            {copy.heroCards.map(card => (
              <div className={styles.heroStat} key={card.label}>
                <strong>{card.value}</strong><span>{card.label}</span><small>{card.text}</small>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className={styles.readBar}><ReadButton isRead={isRead} onClick={toggleRead} authError={authError} /></div>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.sideTitle}>{copy.toc}</div>
          {copy.sections.map(section => (
            <button
              type="button"
              key={section.id}
              data-section-id={section.id}
              className={`${styles.sideItem} ${activeId === section.id ? styles.sideItemActive : ''}`}
              onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              <span>{section.icon}</span><strong>{section.label}</strong>
            </button>
          ))}
        </aside>

        <div className={styles.main}>
          <Section id="grundlagen" title={copy.basics.title} lead={copy.basics.lead}>
            <Cards items={copy.basics.items} />
            <Callout label={copy.keyLabel}>{copy.basics.key}</Callout>
          </Section>

          <Section id="ct" title={copy.ct.title} lead={copy.ct.lead}>
            <Table headers={copy.ct.headers} rows={copy.ct.rows} />
            <Cards items={copy.ct.protocol} />
            <Callout type="cave" label={copy.caveLabel}>{copy.ct.cave}</Callout>
          </Section>

          <Section id="cdd" title={copy.cdd.title} lead={copy.cdd.lead}>
            <Table headers={copy.cdd.headers} rows={copy.cdd.rows} />
            <Callout label={copy.keyLabel}>{copy.cdd.key}</Callout>
          </Section>

          <Section id="komplikationen" title={copy.complications.title} lead={copy.complications.lead}>
            <Cards items={copy.complications.items} />
            <Callout type="cave" label={copy.caveLabel}>{copy.complications.cave}</Callout>
          </Section>

          <Section id="befundung" title={copy.reporting.title} lead={copy.reporting.lead}>
            <Cards items={copy.reporting.items} />
            <Callout label={copy.keyLabel}>{copy.reporting.key}</Callout>
          </Section>

          <Section id="faelle" title={copy.cases.title} lead={copy.cases.lead}>
            <div className={styles.caseGrid}>
              {LEARNING_CASES.map(item => <CaseCard item={item} copy={copy} key={item.id} />)}
            </div>
          </Section>

          <Section id="takehome" title={copy.takehome.title} lead={copy.takehome.lead}>
            <div className={styles.takeHomeGrid}>
              {copy.takehome.items.map((item, index) => (
                <div className={styles.takeHomeItem} key={item.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div><h3>{item.title}</h3><p>{item.text}</p></div>
                </div>
              ))}
            </div>
          </Section>

          <div className={styles.readBarBottom}><ReadButton isRead={isRead} onClick={toggleRead} authError={authError} /></div>
        </div>
      </div>
    </main>
  )
}
