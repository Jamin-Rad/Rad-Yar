'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useMobileLearningLayout } from '@/hooks/useMobileLearningLayout'
import InProgressBanner from '@/components/InProgressBanner'
import base from '@/app/abdomen/gi/divertikulitis/page.module.css'
import styles from './page.module.css'

const SECTIONS = [
  { id: 'indikationen', label: 'Indikationen', icon: '01' },
  { id: 'sequenzen', label: 'Sequenzen', icon: '02' },
  { id: 'systematik', label: 'Systematisch lesen', icon: '03' },
  { id: 'fgt-bpe', label: 'FGT & BPE', icon: '04' },
  { id: 'enhancement', label: 'Enhancement-Typen', icon: '05' },
  { id: 'prinzip', label: 'Das wichtigste Prinzip', icon: '06' },
]

const READ_COPY = {
  de: { mark: 'Als gelesen markieren', read: 'Als gelesen markiert', error: 'Bitte melde dich an, um deinen Lernfortschritt zu speichern.', signIn: 'Anmelden' },
  en: { mark: 'Mark as read', read: 'Marked as read', error: 'Please sign in to save your learning progress.', signIn: 'Sign in' },
  fa: { mark: 'علامت‌گذاری به‌عنوان خوانده‌شده', read: 'به‌عنوان خوانده‌شده علامت‌گذاری شد', error: 'برای ذخیره پیشرفت یادگیری لطفاً وارد شوید.', signIn: 'ورود' },
}

const INDICATIONS = [
  { tag: 'Screening', title: 'Hochrisiko-Screening', text: 'Die kontrastmittelgestützte Mamma-MRT ist besonders wichtig bei Frauen mit deutlich erhöhtem Lebenszeitrisiko für ein Mammakarzinom.' },
  { tag: 'Staging', title: 'Präoperatives Staging', text: 'Bei histologisch gesichertem Mammakarzinom kann die MRT helfen, die tatsächliche Tumorausdehnung besser einzuschätzen.' },
  { tag: 'Response', title: 'Neoadjuvante Therapie', text: 'Die MRT dient zur Verlaufskontrolle des Tumoransprechens und zur Einschätzung eines möglichen Residualtumors.' },
  { tag: 'Suche', title: 'Okkultes Mammakarzinom', text: 'Bei axillärer Lymphknotenmetastase, aber fehlendem Primärtumornachweis in Mammographie und Sonographie, kann die MRT nach dem okkulten Primärtumor suchen.' },
  { tag: 'Klärung', title: 'Problem Solving', text: 'Ausgewählte, trotz vollständiger konventioneller Diagnostik unklar gebliebene Befunde können weiter abgeklärt werden.' },
  { tag: 'Implantat', title: 'Implantatdiagnostik', text: 'Silikon-sensitive Sequenzen beurteilen die Implantatintegrität. Für die reine Rupturdiagnostik ist kein intravenöses Gadolinium erforderlich.' },
]

const SEQUENCES = [
  { key: 'T2', role: 'Charakterisierung', accent: 'blue', points: ['Zysten & Flüssigkeit', 'Ödem & Hautverdickung', 'Lymphknoten', 'T2-Signal der Läsion'], note: 'Flüssigkeit ist typischerweise hell.' },
  { key: 'T1', role: 'Vor Kontrastmittel', accent: 'violet', points: ['Ausgangsbasis', 'Fett', 'Blutprodukte', 'Basis für die Subtraktion'], note: 'Vorher hohes T1-Signal erkennen.' },
  { key: 'DCE', role: 'T1 nach Gadolinium', accent: 'rose', points: ['Ort des Enhancements', 'Morphologie', 'Frühe Aufnahme', 'Persistenz oder Abnahme'], note: 'Mehrere dynamische Serien sind zentral.' },
  { key: 'SUB', role: 'Subtraktion', accent: 'amber', points: ['Kleine Läsionen', 'Non-Mass Enhancement', 'Dichtes Drüsengewebe'], note: 'Bewegung kann falsche Signale erzeugen.' },
  { key: 'MIP', role: 'Schneller Überblick', accent: 'cyan', points: ['Starke Enhancements', 'Multifokalität', 'Seitenunterschiede', 'Background Enhancement'], note: 'Perfekt zum Suchen, nicht zur Endbeurteilung.' },
  { key: 'DWI', role: 'Diffusion / ADC', accent: 'green', points: ['Hohes DWI-Signal', 'Niedriger ADC', 'Zusätzlicher Baustein'], note: 'Ein niedriger ADC bedeutet nicht automatisch Krebs.' },
]

const WORKFLOW = [
  ['Indikation klären', 'Screening, Staging, Therapiekontrolle oder Implantatdiagnostik?'],
  ['Voruntersuchungen öffnen', 'Mammographie, Sonographie, alte MRT und Biopsieergebnisse vergleichen.'],
  ['Technik prüfen', 'Bewegung, Fettsättigung und korrekte Kontrastmittelgabe beurteilen.'],
  ['MIP ansehen', 'Beide Brüste im schnellen Gesamtüberblick vergleichen.'],
  ['FGT bestimmen', 'Wie viel fibroglanduläres Gewebe ist vorhanden?'],
  ['BPE beurteilen', 'Wie stark enhancet das normale Drüsengewebe?'],
  ['Enhancement einordnen', 'Zuerst zwischen Focus, Mass und NME unterscheiden.'],
  ['Sequenzen abgleichen', 'T2, DWI, ADC und dynamische Serien zusammenführen.'],
  ['Umgebung prüfen', 'Haut, Mamille, Pectoralis, Thoraxwand und Lymphknoten nicht vergessen.'],
]

function ReadButton({ isRead, onClick, authError }) {
  const { lang } = useLanguage()
  const copy = READ_COPY[lang] || READ_COPY.de
  return (
    <div className={base.readControl}>
      <button type="button" className={`${base.readButton} ${styles.readButton} ${isRead ? `${base.readButtonActive} ${styles.readButtonActive}` : ''}`} onClick={onClick}>
        <span className={`${base.readCheck} ${styles.readCheck}`} aria-hidden="true">{isRead ? '✓' : ''}</span>
        <span>{isRead ? copy.read : copy.mark}</span>
      </button>
      {authError && <div className={base.readError} role="alert"><span>{copy.error}</span><Link href="/sign-in">{copy.signIn}</Link></div>}
    </div>
  )
}

function Section({ id, title, eyebrow, children }) {
  const isMobile = useMobileLearningLayout()
  const [open, setOpen] = useState(true)
  useEffect(() => setOpen(!isMobile), [isMobile, id])
  return (
    <section id={id} className={`${base.section} ${styles.section}`}>
      <button className={`${base.sectionHeader} ${styles.sectionHeader}`} type="button" onClick={() => setOpen(value => !value)} aria-expanded={open}>
        <span className={styles.sectionHeading}><small>{eyebrow}</small><h2>{title}</h2></span>
        <span className={styles.sectionToggle}>{open ? '−' : '+'}</span>
      </button>
      {open && <div className={`${base.sectionBody} ${styles.sectionBody}`}>{children}</div>}
    </section>
  )
}

function Callout({ cave = false, label, children }) {
  return <div className={`${base.callout} ${styles.callout} ${cave ? styles.cave : ''}`}><strong>{label}</strong><p>{children}</p></div>
}

export default function MammaMrtBasicsPage() {
  const { lang } = useLanguage()
  const [activeId, setActiveId] = useState(SECTIONS[0].id)
  const { isRead, toggleRead, authError } = useLessonReadStatus('mamma-mrt-basics')
  const withLang = href => lang === 'de' ? href : `${href}${href.includes('?') ? '&' : '?'}lang=${lang}`
  const lessonPath = '/mamma/bildgebung/mrt/basics'
  const sectionIds = useMemo(() => SECTIONS.map(section => section.id), [])

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
    <main className={`${base.page} ${styles.page}`} dir="ltr" lang="de">
      <InProgressBanner lang={lang} />
      <header className={base.header}>
        <nav className={`${base.breadcrumb} ${styles.breadcrumb}`} aria-label="Brotkrümelnavigation">
          <Link href={withLang('/')}>RadYar</Link><span>›</span>
          <Link href={withLang('/lernen/mamma')}>Mamma</Link><span>›</span>
          <Link href={withLang('/lernen/mamma')}>Bildgebung</Link><span>›</span>
          <span>Mamma-MRT</span><span>›</span><strong>Basics</strong>
        </nav>

        <div className={base.hero}>
          <div className={`${base.heroText} ${styles.heroText}`}>
            <span className={`${base.sourceBadge} ${styles.sourceBadge}`}>Dr. Zia</span>
            <h1>Mamma-MRT:<br />Basics</h1>
            <p>Indikationen, Sequenzen und ein systematischer Einstieg in die Befundung.</p>
            <div className={base.actions}>
              <Link className={`${base.actionBtn} ${styles.actionBtn}`} href={withLang(`/ueben/quiz?fach=mamma&n=10&themen=mamma-mrt-basics&from=${encodeURIComponent(withLang(lessonPath))}`)}>🎯 MCQ</Link>
              <Link className={`${base.actionBtn} ${styles.actionBtn}`} href={withLang(`/flashcards/mamma-mrt-basics?from=${encodeURIComponent(withLang(lessonPath))}`)}>🧠 Flashcards</Link>
            </div>
          </div>
          <div className={base.heroStats}>
            <div className={`${base.heroStat} ${styles.heroStat}`}><strong>DCE-MRT</strong><span>Höchste Sensitivität</span><small>Tumorvaskularisation und Kontrastmittelaufnahme sichtbar machen.</small></div>
            <div className={`${base.heroStat} ${styles.heroStat}`}><strong>T2 · T1 · DWI</strong><span>Multiparametrisch</span><small>Jede Sequenz beantwortet eine andere diagnostische Frage.</small></div>
            <div className={`${base.heroStat} ${styles.heroStat}`}><strong>Focus · Mass · NME</strong><span>Erst klassifizieren</span><small>Dann Morphologie, Diffusion und Kinetik bewerten.</small></div>
          </div>
        </div>
      </header>

      <div className={base.readBar}><ReadButton isRead={isRead} onClick={toggleRead} authError={authError} /></div>

      <div className={base.layout}>
        <aside className={`${base.sidebar} ${styles.sidebar}`}>
          <div className={base.sideTitle}>Inhaltsverzeichnis</div>
          {SECTIONS.map(section => (
            <button key={section.id} type="button" className={`${base.sideItem} ${styles.sideItem} ${activeId === section.id ? `${base.sideItemActive} ${styles.sideItemActive}` : ''}`} onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
              <span className={styles.sideNumber}>{section.icon}</span><strong>{section.label}</strong>
            </button>
          ))}
        </aside>

        <div className={base.main}>
          <Section id="indikationen" eyebrow="01 · Wann einsetzen?" title="Indikationen">
            <p className={styles.lead}>Die Mamma-MRT ist die <strong>sensitivste bildgebende Methode</strong> zum Nachweis eines Mammakarzinoms. Ihre hohe Sensitivität beruht vor allem auf der Darstellung der <strong>Tumorvaskularisation und Kontrastmittelaufnahme</strong>. Gleichzeitig ist die Spezifität begrenzt: Auch zahlreiche benigne Veränderungen können Kontrastmittel aufnehmen.</p>
            <div className={styles.indicationGrid}>{INDICATIONS.map(item => <article className={styles.indicationCard} key={item.title}><span>{item.tag}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
            <div className={styles.problemBox}><div><span>Problem Solving · Beispiele</span><h3>Wenn die konventionelle Diagnostik unklar bleibt</h3></div><ul><li>nicht sicher erklärbare Asymmetrie</li><li>unklare Architekturstörung</li><li>diskrepante Befunde zwischen Mammographie und Sonographie</li><li>schwer beurteilbare postoperative Veränderungen</li></ul></div>
            <Callout cave label="Wichtig">Die MRT sollte nicht dazu verwendet werden, eine indizierte Biopsie eines suspekten Befundes zu vermeiden. Ein klar suspekter und bioptisch zugänglicher Befund sollte in der Regel histologisch abgeklärt werden.</Callout>
            <Callout label="Implantatdiagnostik">Für die reine Beurteilung einer möglichen Implantatruptur ist keine intravenöse Gadoliniumgabe erforderlich. Soll gleichzeitig das Brustparenchym hinsichtlich eines Tumors beurteilt werden, ist eine kontrastmittelgestützte Untersuchung erforderlich.</Callout>
          </Section>

          <Section id="sequenzen" eyebrow="02 · Protokoll" title="Welche Sequenzen brauchen wir?">
            <p className={styles.lead}>Ein typisches Mamma-MRT-Protokoll besteht aus mehreren Sequenzen. Jede beantwortet eine andere Frage.</p>
            <div className={styles.sequenceGrid}>{SEQUENCES.map(sequence => <article className={`${styles.sequenceCard} ${styles[sequence.accent]}`} key={sequence.key}><div className={styles.sequenceTop}><strong>{sequence.key}</strong><span>{sequence.role}</span></div><ul>{sequence.points.map(point => <li key={point}>{point}</li>)}</ul><p>{sequence.note}</p></article>)}</div>
          </Section>

          <Section id="systematik" eyebrow="03 · Workflow" title="Wie liest man eine Mamma-MRT systematisch?">
            <p className={styles.lead}>Ein fester Ablauf hilft, nichts zu übersehen.</p>
            <ol className={styles.workflow}>{WORKFLOW.map(([title, text], index) => <li key={title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol>
          </Section>

          <Section id="fgt-bpe" eyebrow="04 · Nicht verwechseln" title="FGT und BPE">
            <div className={styles.compareGrid}>
              <article><span className={styles.term}>FGT</span><h3>Fibroglandular Tissue</h3><p className={styles.question}>Wie viel Drüsengewebe ist überhaupt vorhanden?</p><div className={styles.pillList}><span>almost entirely fatty</span><span>scattered</span><span>heterogeneous</span><span>extreme</span></div></article>
              <article><span className={`${styles.term} ${styles.termBpe}`}>BPE</span><h3>Background Parenchymal Enhancement</h3><p className={styles.question}>Wie stark nimmt normales Drüsengewebe Kontrastmittel auf?</p><div className={styles.pillList}><span>minimal</span><span>mild</span><span>moderate</span><span>marked</span></div></article>
            </div>
            <div className={styles.memoryLine}><strong>FGT</strong><span>= Menge des Drüsengewebes</span><i>≠</i><strong>BPE</strong><span>= Aktivität nach Kontrastmittel</span></div>
            <p className={styles.centerNote}>Man kann viel FGT und trotzdem wenig BPE haben.</p>
          </Section>

          <Section id="enhancement" eyebrow="05 · BI-RADS-Logik" title="Die drei wichtigsten Enhancement-Typen">
            <div className={styles.enhancementGrid}>
              <article><div className={`${styles.enhancementSketch} ${styles.focusSketch}`}><i /></div><span>01</span><h3>Focus</h3><p>Ein sehr kleiner Punkt mit Enhancement. Er ist zu klein, um seine Form zuverlässig zu beurteilen.</p></article>
              <article><div className={`${styles.enhancementSketch} ${styles.massSketch}`}><i /></div><span>02</span><h3>Mass</h3><p>Eine echte dreidimensionale Läsion. Form, Rand und internes Enhancement können beurteilt werden.</p></article>
              <article><div className={`${styles.enhancementSketch} ${styles.nmeSketch}`}><i /><i /><i /><i /><i /></div><span>03</span><h3>Non-Mass Enhancement</h3><p>Enhancement ohne klare dreidimensionale Raumforderung, etwa regional oder entlang eines Gangsystems. Wichtig bei DCIS, aber nicht automatisch maligne.</p></article>
            </div>
          </Section>

          <Section id="prinzip" eyebrow="06 · Take home" title="Das wichtigste Prinzip">
            <div className={styles.dontAsk}><span>Nicht sofort fragen</span><p>„Ist das Krebs?“</p></div>
            <div className={styles.decisionFlow}><div><small>Schritt 1</small><strong>BPE oder echter Befund?</strong></div><b>→</b><div><small>Schritt 2</small><strong>Focus, Mass oder NME?</strong></div><b>→</b><div><small>Schritt 3</small><strong>Morphologie · T2 · DWI · Kinetik · Begleitbefunde</strong></div></div>
          </Section>

          <div className={base.readBarBottom}><ReadButton isRead={isRead} onClick={toggleRead} authError={authError} /></div>
        </div>
      </div>
    </main>
  )
}
