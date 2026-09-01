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
  {
    key: 'T2', role: 'T2', accent: 'blue',
    intro: 'Hier schauen wir vor allem auf:',
    points: ['Zysten und Flüssigkeit', 'Ödem', 'Hautverdickung', 'Lymphknoten', 'T2-Signal einer Läsion'],
    followUp: 'T2 hilft uns vor allem dabei, eine Läsion besser zu charakterisieren.',
  },
  {
    key: 'T1', role: 'T1 vor Kontrastmittel', accent: 'violet',
    intro: 'Diese Sequenz ist unsere Ausgangsbasis. Sie hilft unter anderem bei der Erkennung von:',
    points: ['Fett', 'Blutprodukten', 'bereits vorher hohem T1-Signal'],
    note: 'Außerdem brauchen wir sie für die spätere Subtraktion.',
  },
  {
    key: 'T1+', role: 'T1 nach Kontrastmittel', accent: 'rose',
    intro: 'Nach Gadolinium werden mehrere Serien aufgenommen. Hier schauen wir:',
    points: ['Wo nimmt etwas Kontrastmittel auf?', 'Wie sieht das Enhancement aus?', 'Wie schnell kommt es?', 'Bleibt es bestehen oder nimmt es wieder ab?'],
  },
  {
    key: 'SUB', role: 'Subtraktion', accent: 'amber',
    intro: 'Dabei wird vereinfacht das Bild vor Kontrastmittel vom Bild nach Kontrastmittel abgezogen. Dadurch sieht man Enhancement deutlich besser. Sehr hilfreich bei:',
    points: ['kleinen Läsionen', 'Non-Mass Enhancement', 'unübersichtlichem Drüsengewebe'],
  },
  {
    key: 'MIP', role: 'Maximum Intensity Projection', accent: 'cyan',
    intro: 'Die MIP gibt uns einen schnellen Überblick über beide Brüste. Hier sieht man oft sofort:',
    points: ['Verteilung des Drüsengewebes und BPE', 'Symmetrie und Seitenunterschiede', 'auffällige Enhancements', 'Anzahl potenzieller Läsionen'],
  },
  {
    key: 'DWI', role: 'DWI / ADC', accent: 'green',
    intro: 'Viele maligne Tumoren zeigen eine eingeschränkte Diffusion. Typisch ist:',
    points: ['hohes Signal in DWI', 'niedriger ADC'],
    note: 'DWI ist immer nur ein zusätzlicher Baustein.',
  },
]

const WORKFLOW = [
  {
    title: 'Indikation und Voruntersuchungen klären',
    text: 'Warum wurde die MRT durchgeführt: Screening, Staging, Therapiekontrolle oder Implantatdiagnostik? Mammographie, Sonographie, alte MRT und Biopsieergebnisse öffnen und vergleichen.',
  },
  { title: 'Technik prüfen', text: 'Bewegung, Fettsättigung und korrekte Kontrastmittelgabe beurteilen.' },
  {
    title: 'MIP ansehen und FGT bestimmen',
    text: 'Beide Brüste im schnellen Gesamtüberblick vergleichen und bestimmen, wie viel fibroglanduläres Gewebe vorhanden ist.',
  },
  { title: 'BPE beurteilen', text: 'Wie stark enhancet das normale Drüsengewebe?' },
  {
    title: 'Auffällige Enhancements suchen',
    text: 'Nun systematisch beide Brüste durchsuchen.',
    detail: 'Jedes auffällige Enhancement zunächst einer der drei Grundkategorien zuordnen:',
    emphasis: 'Focus → Mass → Non-Mass Enhancement',
    conclusion: 'Erst danach erfolgt die weitere Charakterisierung.',
  },
  { title: 'Sequenzen abgleichen', text: 'Suspekte Läsionen in allen Sequenzen korrelieren.' },
  { title: 'Umgebung prüfen', text: 'Haut, Mamille, Pectoralis, Thoraxwand und Lymphknoten nicht vergessen.' },
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
          </Section>

          <Section id="sequenzen" eyebrow="02 · Protokoll" title="Welche Sequenzen brauchen wir?">
            <p className={styles.lead}>Ein typisches Mamma-MRT-Protokoll besteht aus mehreren Sequenzen. Jede beantwortet eine andere Frage.</p>
            <div className={styles.sequenceGrid}>{SEQUENCES.map(sequence => (
              <article className={`${styles.sequenceCard} ${styles[sequence.accent]}`} key={sequence.key}>
                <div className={styles.sequenceTop}><strong>{sequence.key}</strong><span>{sequence.role}</span></div>
                <p className={styles.sequenceIntro}>{sequence.intro}</p>
                <ul>{sequence.points.map(point => <li key={point}>{point}</li>)}</ul>
                <div className={styles.sequenceNotes}>
                  {sequence.note && <p>{sequence.note}</p>}
                  {sequence.followUp && <p>{sequence.followUp}</p>}
                </div>
              </article>
            ))}</div>
            <div className={styles.sequenceSummary}>
              <span>Merke</span>
              <div>
                <p><strong>T1 nach Kontrastmittel ist einer der wichtigsten Teile der Mamma-MRT.</strong></p>
                <p><strong>Ein niedriger ADC bedeutet nicht automatisch Krebs.</strong></p>
                <p><strong>Die MIP ist perfekt zum Suchen, aber nicht zur endgültigen Beurteilung.</strong></p>
              </div>
            </div>
          </Section>

          <Section id="systematik" eyebrow="03 · Workflow" title="Wie liest man eine Mamma-MRT systematisch?">
            <p className={styles.lead}>Ein fester Ablauf hilft, nichts zu übersehen.</p>
            <ol className={styles.workflow}>{WORKFLOW.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                  {step.detail && <p className={styles.workflowDetail}>{step.detail}</p>}
                  {step.emphasis && <strong className={styles.workflowEmphasis}>{step.emphasis}</strong>}
                  {step.conclusion && <p className={styles.workflowConclusion}>{step.conclusion}</p>}
                </div>
              </li>
            ))}</ol>
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
