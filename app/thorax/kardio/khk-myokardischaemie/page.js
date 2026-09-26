'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import InProgressBanner from '@/components/InProgressBanner'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useMobileLearningLayout } from '@/hooks/useMobileLearningLayout'
import shared from '../../../abdomen/gi/divertikulitis/page.module.css'
import styles from './page.module.css'

const LESSON_ID = 'khk-myokardischaemie'

const SECTIONS = [
  { id: 'erstdiagnose', number: '01', label: 'Erstdiagnose' },
  { id: 'akutes-koronarsyndrom', number: '02', label: 'Akutes Koronarsyndrom' },
  { id: 'narbe-infarkt', number: '03', label: 'Narbe & Infarkt' },
  { id: 'gesicherte-khk', number: '04', label: 'Gesicherte KHK' },
  { id: 'behandelte-khk', number: '05', label: 'Behandelte KHK' },
  { id: 'ruheperfusion', number: '06', label: 'Ruheperfusion' },
  { id: 'praktischer-einsatz', number: '07', label: 'Praktischer Einsatz' },
  { id: 'merkschema', number: '→', label: 'Merkschema' },
]

const PATHWAYS = [
  {
    id: 'verdacht',
    label: 'Verdacht auf KHK',
    title: 'Stress-MRT',
    result: 'Ischämienachweis',
    detail: 'Gesucht wird ein reversibles Perfusionsdefizit: unter Stress sichtbar, in Ruhe nicht nachweisbar.',
  },
  {
    id: 'gesichert',
    label: 'Gesicherte KHK',
    title: 'Stress-MRT + Late Enhancement',
    result: 'Relevanz, Vitalität und Narbe',
    detail: 'Stress-MRT prüft die hämodynamische Relevanz; Late Enhancement beurteilt Vitalität und Narbe.',
  },
  {
    id: 'akut',
    label: 'Akutes Koronarsyndrom',
    title: 'Funktion + T2 + Late Enhancement',
    result: 'Differentialdiagnose und Komplikationen',
    detail: 'Die konkrete Indikation hängt von der klinischen Situation und der Stabilität des Patienten ab.',
  },
  {
    id: 'behandelt',
    label: 'Behandelte KHK',
    title: 'MRT bei erneuten Symptomen',
    result: 'Gezielte erneute Abklärung',
    detail: 'Nach PCI oder Bypass steht die Untersuchung symptomatischer Patienten im Vordergrund.',
  },
]

function HeartTraceIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M32 54S9 41.4 9 23.8C9 15.1 14.5 10 21.7 10c4.8 0 8.3 2.7 10.3 6 2-3.3 5.5-6 10.3-6C49.5 10 55 15.1 55 23.8 55 41.4 32 54 32 54Z" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M14 31h10l4.2-9 6.1 19 4.4-10H50" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ReadButton({ isRead, onClick, authError }) {
  return (
    <div className={shared.readControl}>
      <button type="button" className={`${shared.readButton} ${isRead ? shared.readButtonActive : ''}`} onClick={onClick}>
        <span className={shared.readCheck} aria-hidden="true">{isRead ? '✓' : ''}</span>
        <span>{isRead ? 'Als gelesen markiert' : 'Als gelesen markieren'}</span>
      </button>
      {authError && (
        <div className={shared.readError} role="alert">
          <span>Bitte melde dich an, um deinen Lernfortschritt zu speichern.</span>
          <Link href="/sign-in">Anmelden</Link>
        </div>
      )}
    </div>
  )
}

function Section({ id, number, title, lead, children }) {
  const isMobile = useMobileLearningLayout()
  const [open, setOpen] = useState(true)

  useEffect(() => setOpen(!isMobile), [isMobile, id])

  return (
    <section id={id} className={`${shared.section} ${styles.lessonSection}`}>
      <button className={`${shared.sectionHeader} ${styles.sectionHeader}`} type="button" onClick={() => setOpen(value => !value)} aria-expanded={open}>
        <span className={styles.sectionNumber}>{number}</span>
        <h2>{title}</h2>
        <span className={styles.disclosure} aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className={shared.sectionBody}>
          {lead && <p className={shared.lead}>{lead}</p>}
          {children}
        </div>
      )}
    </section>
  )
}

function IndicationBadge({ children, tone = 'blue' }) {
  return <span className={`${styles.indicationBadge} ${styles[tone]}`}>{children}</span>
}

function KeyLine({ label, children }) {
  return (
    <div className={styles.keyLine}>
      <span>{label}</span>
      <strong>{children}</strong>
    </div>
  )
}

function BulletList({ children }) {
  return <ul className={styles.bulletList}>{children}</ul>
}

function ClinicalPathway() {
  const [activeId, setActiveId] = useState(PATHWAYS[0].id)
  const activePath = PATHWAYS.find(path => path.id === activeId) || PATHWAYS[0]

  return (
    <div className={styles.pathway} aria-labelledby="pathway-title">
      <div className={styles.pathwayIntro}>
        <div>
          <span className={styles.eyebrow}>Interaktives Merkschema</span>
          <h2 id="pathway-title">Welche Frage soll die MRT beantworten?</h2>
        </div>
        <p>Wähle die klinische Ausgangssituation.</p>
      </div>
      <div className={styles.pathwayBody}>
        <div className={styles.pathwayTabs} role="tablist" aria-label="Klinische Ausgangssituation">
          {PATHWAYS.map(path => (
            <button
              key={path.id}
              type="button"
              role="tab"
              aria-selected={activeId === path.id}
              className={activeId === path.id ? styles.pathwayTabActive : ''}
              onClick={() => setActiveId(path.id)}
            >
              {path.label}
            </button>
          ))}
        </div>
        <div className={styles.pathwayResult} role="tabpanel" aria-live="polite">
          <div className={styles.resultStep}>
            <span>Untersuchung</span>
            <strong>{activePath.title}</strong>
          </div>
          <svg className={styles.pathArrow} viewBox="0 0 64 24" fill="none" aria-hidden="true">
            <path d="M2 12h55M48 4l9 8-9 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className={`${styles.resultStep} ${styles.resultStepAccent}`}>
            <span>Ziel</span>
            <strong>{activePath.result}</strong>
          </div>
          <p>{activePath.detail}</p>
        </div>
      </div>
    </div>
  )
}

export default function KhkMyokardischaemiePage() {
  const sectionIds = useMemo(() => SECTIONS.map(section => section.id), [])
  const [activeId, setActiveId] = useState(sectionIds[0])
  const { isRead, toggleRead, authError } = useLessonReadStatus(LESSON_ID)

  useEffect(() => {
    const observers = sectionIds.map(id => {
      const element = document.getElementById(id)
      if (!element) return null
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActiveId(id)
      }, { rootMargin: '-20% 0px -70% 0px', threshold: 0.01 })
      observer.observe(element)
      return observer
    })
    return () => observers.forEach(observer => observer?.disconnect())
  }, [sectionIds])

  return (
    <main className={`${shared.page} ${styles.page}`} lang="de">
      <InProgressBanner lang="de" />

      <header className={shared.header}>
        <nav className={`${shared.breadcrumb} ${styles.breadcrumb}`} aria-label="Brotkrümelnavigation">
          <Link href="/">RadYar</Link><span>›</span>
          <Link href="/lernen/thorax">Thorax & Herz</Link><span>›</span>
          <span>Kardio-MRT</span>
        </nav>

        <div className={shared.hero}>
          <div className={`${shared.heroText} ${styles.heroText}`}>
            <span className={`${shared.sourceBadge} ${styles.sourceBadge}`}>Kardio-MRT</span>
            <h1>Indikationen der Herz-MRT bei KHK</h1>
            <p>Die passende Untersuchung richtet sich danach, ob eine KHK vermutet, bereits gesichert oder behandelt ist – und welche konkrete klinische Frage beantwortet werden soll.</p>
          </div>
          <div className={`${shared.heroStats} ${styles.heroStats}`} aria-label="Kernprinzipien">
            <div className={`${shared.heroStat} ${styles.heroStatPrimary}`}>
              <HeartTraceIcon className={styles.heroIcon} />
              <strong>Stress-MRT</strong>
              <span>Ischämie</span>
              <small>Reversibles Perfusionsdefizit</small>
            </div>
            <div className={`${shared.heroStat} ${styles.heroStatDark}`}>
              <strong>LGE</strong>
              <span>Narbe & Vitalität</span>
              <small>Transmuralität beurteilen</small>
            </div>
            <div className={`${shared.heroStat} ${styles.heroStatLight}`}>
              <strong>T2</strong>
              <span>Akute Schädigung</span>
              <small>Differentialdiagnostik unterstützen</small>
            </div>
          </div>
        </div>
      </header>

      <div className={shared.readBar}>
        <ReadButton isRead={isRead} onClick={toggleRead} authError={authError} />
      </div>

      <div className={styles.pathwayWrap}>
        <ClinicalPathway />
      </div>

      <div className={shared.layout}>
        <aside className={`${shared.sidebar} ${styles.sidebar}`}>
          <div className={shared.sideTitle}>Inhaltsverzeichnis</div>
          {SECTIONS.map(section => (
            <button
              type="button"
              key={section.id}
              className={`${shared.sideItem} ${activeId === section.id ? `${shared.sideItemActive} ${styles.sideItemActive}` : ''}`}
              onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              <span className={styles.sideNumber}>{section.number}</span>
              <strong>{section.label}</strong>
            </button>
          ))}
        </aside>

        <div className={shared.main}>
          <Section id="erstdiagnose" number="01" title="Erstdiagnose bei Verdacht auf KHK" lead="Bei symptomatischen Patienten kann die Stress-MRT zum Nachweis einer relevanten Myokardischämie eingesetzt werden.">
            <div className={styles.headingRow}>
              <div><span className={styles.kicker}>Stabile Angina pectoris</span><h3>Ischämie unter Belastung nachweisen</h3></div>
              <IndicationBadge>I2-Indikation</IndicationBadge>
            </div>
            <KeyLine label="Bildgebendes Korrelat">Reversibles Perfusionsdefizit</KeyLine>
            <p className={styles.bodyText}>Ein Perfusionsdefizit, das unter pharmakologischem Stress auftritt und in Ruhe nicht nachweisbar ist, entspricht einer stressinduzierten Ischämie.</p>
            <div className={styles.twoColumn}>
              <div className={styles.contentBlock}>
                <h3>Typische klinische Situation</h3>
                <BulletList>
                  <li>typische Beschwerden</li>
                  <li>KHK-Verdacht</li>
                  <li>Ergometrie nicht möglich oder nicht aussagekräftig</li>
                  <li>andere funktionelle Untersuchungen uneindeutig</li>
                </BulletList>
              </div>
              <div className={`${styles.contentBlock} ${styles.perfusionBlock}`}>
                <h3>Prinzip der Stress-Perfusion</h3>
                <p>Unter Stress wird die myokardiale Perfusion beurteilt. Ein stressinduziertes Perfusionsdefizit zeigt sich typischerweise subendokardial.</p>
                <div className={styles.perfusionVisual} aria-label="Stress zeigt ein reversibles Perfusionsdefizit, Ruhe zeigt kein Defizit">
                  <div><span className={styles.heartRing}><i /></span><strong>Stress</strong><small>Defizit sichtbar</small></div>
                  <span className={styles.comparisonArrow} aria-hidden="true">→</span>
                  <div><span className={`${styles.heartRing} ${styles.heartRingRest}`}><i /></span><strong>Ruhe</strong><small>nicht nachweisbar</small></div>
                </div>
              </div>
            </div>
            <KeyLine label="Merksatz">Ischämiediagnostik = Nachweis eines reversiblen Perfusionsdefizits</KeyLine>
          </Section>

          <Section id="akutes-koronarsyndrom" number="02" title="Akutes Koronarsyndrom" lead="Die Indikation zur Herz-MRT ist abhängig von der klinischen Situation.">
            <div className={styles.acsGrid}>
              <article className={styles.acsCard}>
                <div className={styles.cardTop}><h3>Instabile Angina pectoris</h3><IndicationBadge tone="slate">I3</IndicationBadge></div>
                <p>Grundsätzlich geht es um den Nachweis einer hämodynamisch relevanten Koronarstenose. Für eine Stress-MRT muss der Patient ausreichend stabil sein.</p>
              </article>
              <article className={`${styles.acsCard} ${styles.acsCardFeatured}`}>
                <div className={styles.cardTop}><h3>NSTEMI</h3><IndicationBadge>I2</IndicationBadge></div>
                <p>Die Herz-MRT kann insbesondere zur weiteren Differenzierung der zugrunde liegenden Myokardschädigung eingesetzt werden.</p>
                <div className={styles.sequenceStrip}><span>Funktion</span><span>T2</span><span>Late Enhancement</span></div>
              </article>
              <article className={styles.acsCard}>
                <div className={styles.cardTop}><h3>STEMI</h3><IndicationBadge tone="slate">I3</IndicationBadge></div>
                <p>Im Vordergrund stehen Risikostratifizierung, Darstellung der Infarktausdehnung und Beurteilung von Komplikationen – nicht primär die stressinduzierte Ischämie.</p>
                <div className={styles.sequenceStrip}><span>Funktion</span><span>T2</span><span>Late Enhancement</span></div>
              </article>
            </div>

            <h3 className={styles.subheading}>Differentialdiagnostik beim NSTEMI</h3>
            <div className={styles.patternTable} role="table" aria-label="Differentialdiagnostik beim NSTEMI">
              <div className={styles.patternRow} role="row">
                <strong role="cell">Myokardinfarkt</strong>
                <span role="cell">Typischerweise subendokardiales Late Enhancement</span>
              </div>
              <div className={styles.patternRow} role="row">
                <strong role="cell">Takotsubo-Kardiomyopathie</strong>
                <span role="cell">Ausgeprägte Wandbewegungsstörungen und Myokardödem, jedoch ohne typisches Infarktmuster im Late Enhancement</span>
              </div>
              <div className={styles.patternRow} role="row">
                <strong role="cell">Myokarditis</strong>
                <span role="cell">Wandbewegungsstörungen bzw. Myokardschädigung mit nicht-ischämischem Late-Enhancement-Muster, beispielsweise subepikardial</span>
              </div>
            </div>
          </Section>

          <Section id="narbe-infarkt" number="03" title="Narben- und Infarktbeurteilung" lead="Eine wichtige Stärke der Herz-MRT ist die Beurteilung der Myokardnarbe.">
            <KeyLine label="Entscheidende Frage">Wie transmural ist das Late Enhancement?</KeyLine>
            <p className={styles.bodyText}>Je größer der Anteil des Myokards mit Late Enhancement ist, desto ausgeprägter ist die Narbenbildung. Die MRT ermöglicht außerdem die Darstellung zusätzlicher Befunde und Komplikationen.</p>
            <div className={styles.twoColumn}>
              <article className={styles.complicationCard}>
                <span className={styles.complicationIcon} aria-hidden="true"><i /></span>
                <div><h3>Mikrovaskuläre Obstruktion</h3><p>Eine No-Reflow-Situation: ein dunkles Areal innerhalb des infarzierten Myokards, in das auch in der Spätaufnahme kein Kontrastmittel einströmt. Ihr Vorliegen ist mit einer geringeren funktionellen Erholung verbunden.</p></div>
              </article>
              <article className={styles.complicationCard}>
                <span className={`${styles.complicationIcon} ${styles.thrombusIcon}`} aria-hidden="true"><i /></span>
                <div><h3>Intrakardialer Thrombus</h3><p>Ein Thrombus kann als dunkles, dem Endokard anliegendes Areal dargestellt werden. Die MRT kann auch weitere Komplikationen wie ein Herzspitzenaneurysma erfassen.</p></div>
              </article>
            </div>
          </Section>

          <Section id="gesicherte-khk" number="04" title="Gesicherte KHK" lead="Bei bereits bekannter KHK stellen sich vor allem zwei Fragen.">
            <div className={styles.questionStack}>
              <article className={styles.questionCard}>
                <span className={styles.questionLetter}>A</span>
                <div>
                  <h3>Ist die Koronarstenose ischämierelevant?</h3>
                  <p>Bei unklarer hämodynamischer Relevanz einer bekannten Koronarstenose kann eine Stress-Untersuchung durchgeführt werden. Ziel ist der Nachweis einer stressinduzierten Ischämie. Dies kann beispielsweise bei Patienten mit Mehrgefäßerkrankung relevant sein.</p>
                </div>
              </article>
              <article className={`${styles.questionCard} ${styles.questionCardAccent}`}>
                <span className={styles.questionLetter}>B</span>
                <div>
                  <div className={styles.cardTop}><h3>Ist das versorgte Myokard noch vital?</h3><IndicationBadge tone="green">I1-Indikation</IndicationBadge></div>
                  <p>Die Transmuralität des Late Enhancements wird beurteilt: Je transmuraler der Infarkt, desto geringer ist die zu erwartende funktionelle Erholung nach Revaskularisation.</p>
                  <p>Die Beurteilung erfolgt anhand des Anteils des Myokards mit Late Enhancement im Verhältnis zum nicht vernarbten Myokard.</p>
                </div>
              </article>
            </div>
          </Section>

          <Section id="behandelte-khk" number="05" title="Bereits behandelte KHK" lead="Auch nach perkutaner Koronarintervention oder Bypass-Operation kann eine Herz-MRT sinnvoll sein.">
            <div className={styles.treatmentFlow}>
              <div><span>PCI</span><small>perkutan</small></div>
              <span className={styles.flowJoin} aria-hidden="true">+</span>
              <div><span>Bypass</span><small>operativ</small></div>
              <span className={styles.flowArrow} aria-hidden="true">→</span>
              <div className={styles.flowOutcome}><span>Symptome</span><small>MRT gezielt erwägen</small></div>
            </div>
            <div className={styles.cautionBox}>
              <strong>Keine Routinenachsorge</strong>
              <p>Eine routinemäßige Herz-MRT bei asymptomatischen Patienten allein zur Nachsorge sollte nicht durchgeführt werden.</p>
            </div>
          </Section>

          <Section id="ruheperfusion" number="06" title="Ruheperfusion – notwendig?" lead="Eine Ruheperfusion ist laut den dargestellten Empfehlungen nicht verpflichtend.">
            <div className={styles.restGrid}>
              <div className={styles.restAnswer}><span>Optional</span><p>Sie kann hilfreich sein, um insbesondere Artefakte zu erkennen und mit der Stressperfusion zu vergleichen.</p></div>
              <div className={styles.restNotes}>
                <p>Ein Perfusionsdefizit in Ruhe bedeutet nicht automatisch, dass eine Narbe vorliegt.</p>
                <p>Auch eine fixierte Narbe kann zu einem Perfusionsdefizit führen, dies ist jedoch nicht zuverlässig.</p>
              </div>
            </div>
            <KeyLine label="Daher gilt">Eine Narbe wird nicht zuverlässig über die Ruheperfusion beurteilt.</KeyLine>
          </Section>

          <Section id="praktischer-einsatz" number="07" title="Praktischer Einsatz der Herz-MRT" lead="Die Herz-MRT ist mit einem mittleren bis hohen Untersuchungsaufwand verbunden und die Zahl verfügbarer Untersuchungsplätze kann limitiert sein.">
            <div className={styles.clinicalQuestion}>
              <HeartTraceIcon className={styles.questionIcon} />
              <div><span>Vor jeder Untersuchung klären</span><strong>Welche konkrete klinische Frage soll die MRT beantworten?</strong></div>
            </div>
            <BulletList>
              <li>Eine klinische Stratifizierung ist wichtig.</li>
              <li>Das Untersuchungsprotokoll sollte an die Fragestellung angepasst werden.</li>
              <li>Eine übermäßige Untersuchung asymptomatischer Patienten sollte vermieden werden.</li>
              <li>Auch bei gesicherter Diagnose sollte ein zusätzlicher diagnostischer Mehrwert zu erwarten sein.</li>
            </BulletList>
          </Section>

          <Section id="merkschema" number="→" title="Merkschema" lead="Vier Ausgangssituationen, vier klare Untersuchungsziele.">
            <div className={styles.summaryGrid}>
              {PATHWAYS.map(path => (
                <article key={path.id} className={styles.summaryCard}>
                  <span>{path.label}</span>
                  <strong>{path.title}</strong>
                  <p>{path.result}</p>
                </article>
              ))}
            </div>
            <div className={styles.terms}>
              <h3>Zentrale Begriffe</h3>
              <dl>
                <div><dt>Reversibles Perfusionsdefizit</dt><dd>Ischämie</dd></div>
                <div><dt>Stress-Perfusion</dt><dd>Ischämiediagnostik</dd></div>
                <div><dt>Late Enhancement</dt><dd>Beurteilung von Infarkt und Narbe</dd></div>
                <div><dt>Transmuralität</dt><dd>Abschätzung der Myokardvitalität</dd></div>
              </dl>
            </div>
          </Section>

          <div className={shared.readBarBottom}>
            <ReadButton isRead={isRead} onClick={toggleRead} authError={authError} />
          </div>
        </div>
      </div>
    </main>
  )
}
