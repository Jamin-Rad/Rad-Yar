'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import LessonHero from '@/components/LessonHero'
import LessonTakeHome from '@/components/LessonTakeHome'
import { usePersistedSectionProgress } from '@/hooks/usePersistedSectionProgress'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useLessonSectionScroll } from '@/hooks/useLessonSectionScroll'
import { useLehrModeActive } from '@/hooks/useLehrModeActive'
import CaseAtlas from './CaseAtlas'
import { PaduaLesson, TfcLesson } from './CriteriaLab'
import { Icon, Note, PatternExplorer, PhenotypeExplorer, ProtocolExplorer, TeachingTable } from './LessonVisuals'
import { CASES, SECTIONS, SECTION_IDS, SOURCES, TAKE_HOME } from './lessonContent'
import template from '@/components/LessonTemplate.module.css'
import styles from './page.module.css'

function Sources({ indices }) {
  return <p className={styles.sourceLine}>Vertiefen: {indices.map((index, i) => <span key={index}>{i ? ' · ' : ''}<a href={SOURCES[index].url} target="_blank" rel="noreferrer">{SOURCES[index].label}</a></span>)}</p>
}

function Definition() {
  return <>
    <p className={styles.lead}>Bei der <strong>arrhythmogenen Kardiomyopathie (ACM)</strong> geht Herzmuskelgewebe verloren. An seine Stelle tritt Narbengewebe, teilweise auch Fett. Das kann die elektrische Erregung stören und gefährliche Rhythmusstörungen aus den Herzkammern auslösen – auch bevor die Pumpfunktion deutlich abnimmt.</p>
    <PhenotypeExplorer/>
    <div className={styles.definitionBridge}><span>Früher als ARVC beschrieben:<br/><strong>vor allem der rechte Ventrikel</strong></span><Icon name="arrow"/><span>Heute als ACM-Spektrum verstanden:<br/><strong>RV, LV oder beide Kammern</strong></span></div>
    <p className={styles.bodyText}>Die Erkrankung ist häufig erblich. Zunächst stand die rechte Kammer im Mittelpunkt. Heute ist klar: <strong>Auch die linke Kammer kann betroffen sein, bei manchen Formen sogar überwiegend.</strong> Ihre Beteiligung ist für Diagnose und Prognose relevant. Deshalb im MRT immer beide Kammern und das Gewebe beurteilen.</p>
    <Note title="Ein Satz zum Mitnehmen">ACM ist der Oberbegriff. ARVC bezeichnet die klassische rechtsbetonte Form. Ein unauffälliger RV schließt eine linksdominante ACM nicht aus.</Note>
    <Sources indices={[4, 2, 6]}/>
  </>
}

function Mrt() {
  return <><p className={styles.lead}>Vier Bausteine, vier konkrete Fragen. Zuerst Qualität und Bewegung prüfen, dann Volumen und Funktion messen, anschließend die Gewebeveränderungen einordnen.</p><ProtocolExplorer/><Note caution title="Die zweite Ebene ist entscheidend">Der RV ist dünnwandig und geometrisch komplex. Partialvolumen, Trabekel und Bewegung aus der Schicht können eine Ausbuchtung oder ein scheinbares LGE erzeugen. Auffälligkeiten gezielt in einer weiteren Ebene überprüfen.</Note><Sources indices={[3, 4]}/></>
}

function Patterns() {
  return <><p className={styles.lead}>Die beiden Diagramme trennen <strong>Bewegung</strong> und <strong>Gewebe</strong>. Die Schemata erklären das Prinzip; die echten Bilder folgen im Radiopaedia-Atlas.</p><PatternExplorer/><figure className={styles.publishedFigure}><Image unoptimized src="/thorax/kardio/arvc/lv-lge-shen-2019.jpg" width={767} height={246} alt="Publizierte LGE-Aufnahmen bei ARVC mit septaler linksventrikulärer Beteiligung."/><figcaption><strong>Echtes LGE-Beispiel zur LV-Beteiligung.</strong> Shen et al., Scientific Reports 2019 · CC BY 4.0; unveränderte Wiedergabe über Cainap et al., Abb. 7. Septales LGE allein ist nicht spezifisch für ACM. <a href={SOURCES[6].url} target="_blank" rel="noreferrer">Originalstudie</a></figcaption></figure><Sources indices={[1, 4, 6]}/></>
}

const DIFFERENTIALS = [
  ['Sportherz', 'RV-Vergrößerung durch Training', 'Proportionale Anpassung, Funktion, fehlende typische regionale Störung / Narbe und sportbezogene Referenzwerte prüfen.'],
  ['Myokarditis / „Hot Phase“', 'Subepikardiales LGE, gegebenenfalls Ödem', 'Akute Klinik, Troponin, T2, Verlauf und Genetik einbeziehen. Eine ACM kann selbst myocarditisähnliche Episoden verursachen.'],
  ['Kardiale Sarkoidose', 'Fleckige nichtischämische Narben, teils biventrikulär', 'Leitungsstörungen, extrakardiale Zeichen und gegebenenfalls PET / Histologie im klinischen Kontext ergänzen.'],
  ['Shunt / pulmonale Hypertonie', 'Vergrößerter RV, veränderte Funktion', 'Druck- oder Volumenbelastung, Septumform, Gefäße und mögliche Shuntursache untersuchen.'],
  ['Ischämische Narbe', 'Subendokardiales bis transmurales LGE', 'Koronarterritorium und koronare Ursache prüfen; nicht mit nichtischämischen LV-Streifen gleichsetzen.'],
  ['Artefakt / frühere Ablation', 'Scheinbare Ausbuchtung oder lokales Enhancement', 'Zweite Ebene, vollständiger Herzzyklus, Bildqualität und Vorgeschichte; Ablationsnarben berücksichtigen.'],
]
function Differentials() {
  const [selected, setSelected] = useState(0)
  const examples = [
    { label: 'Großer RV beim Sportler', text: 'Nicht am Volumen stehen bleiben. Zuerst nach einer sicheren regionalen Störung suchen, RV und LV vergleichen und geeignete Referenzen verwenden. Ein einzelner erhöhter RVEDVi beweist keine ARVC.', index: 0 },
    { label: 'LV-LGE nach Thoraxschmerz', text: 'Myokarditis ist eine wichtige Möglichkeit. Bei rezidivierenden Episoden, Arrhythmien oder Familienanamnese auch an eine ACM denken. LGE-Verteilung, Ödem, Verlauf und Genetik zusammenführen.', index: 1 },
    { label: 'LGE nach VT-Ablation', text: 'Die Lokalisation mit der Ablationsstelle abgleichen. Eine iatrogene Narbe kann die LGE-Bewertung beeinflussen – wie im Radiopaedia-Fall 39806. Das ursprüngliche Erkrankungsmuster separat einordnen.', index: 5 },
  ]
  return <><p className={styles.lead}>Ein großer RV, Fett oder ein helles LGE-Areal ist jeweils nur ein Teil der Geschichte. Die entscheidende Frage lautet: <strong>Passt das gesamte Muster besser zu ACM oder zu einer anderen Ursache?</strong></p><div className={styles.scenarioRow}>{examples.map((item, index) => <button type="button" key={item.label} aria-pressed={selected === index} onClick={() => setSelected(index)}><Icon name="scan"/>{item.label}</button>)}</div><div className={styles.scenarioExplanation} aria-live="polite"><h3>{examples[selected].label}</h3><p>{examples[selected].text}</p></div><TeachingTable caption="Wichtige Imitatoren und der nächste Denk-Schritt" headers={['Möglichkeit', 'Überschneidung', 'Gezielt unterscheiden']} rows={DIFFERENTIALS}/><Note caution title="Einzelzeichen nicht zur Diagnose machen">Fett allein zählt nicht. Eine scheinbare regionale RV-Störung in nur einer Ebene ist unsicher. LV-LGE allein beweist keine linksdominante ACM.</Note><Sources indices={[4, 2, 7]}/></>
}

const CONTENT = { definition: Definition, mrt: Mrt, muster: Patterns, bilder: CaseAtlas, tfc: TfcLesson, padua: PaduaLesson, differenzialdiagnosen: Differentials }

function Chapter({ section, open, read, onSelect, onRead, children }) {
  return <section id={section.id} className={`${template.section} ${styles.chapter} ${open ? template.sectionOpen : ''}`}><button type="button" className={template.sectionHeader} onClick={() => onSelect(section.id)} aria-expanded={open} aria-controls={`${section.id}-panel`} data-lehr-section-managed="true"><span className={template.sectionIcon}><Icon name={section.icon}/></span><span><strong>{section.title}</strong></span><span className={template.toggle} aria-hidden="true">{open ? '−' : '+'}</span></button><div id={`${section.id}-panel`} hidden={!open} className={`${template.sectionBody} ${styles.chapterBody}`}>{children}<button type="button" className={`${template.readButton} ${read ? template.readButtonDone : ''}`} aria-pressed={read} onClick={() => onRead(section.id)}><Icon name="check"/>{read ? 'Als gelesen markiert' : 'Abschnitt als gelesen markieren'}</button></div></section>
}

function MobilePath({ openId, readSections, onSelect }) {
  const [expanded, setExpanded] = useState(false)
  const current = SECTIONS.find(s => s.id === openId) || SECTIONS[0]
  return <div className={template.mobileLearningPath}>{expanded ? <section className={template.mobilePathPanel} id="acm-mobile-path" aria-label="Lernpfad"><header><div><small>Lernpfad</small><strong>{readSections.size} / {SECTIONS.length} gelesen</strong></div><button type="button" onClick={() => setExpanded(false)} aria-label="Lernpfad schließen">×</button></header><nav>{SECTIONS.map(section => <button type="button" key={section.id} className={openId === section.id ? template.mobilePathCurrent : ''} onClick={() => { onSelect(section.id); setExpanded(false) }} aria-current={openId === section.id ? 'location' : undefined}><span className={template.mobilePathItemIcon}><Icon name={section.icon}/></span><span><strong>{section.short}</strong><small>{section.title}</small></span><i aria-label={readSections.has(section.id) ? 'gelesen' : undefined}>{readSections.has(section.id) ? '✓' : ''}</i></button>)}</nav></section> : null}<button type="button" className={template.mobilePathButton} aria-expanded={expanded} aria-controls="acm-mobile-path" onClick={() => setExpanded(value => !value)}><span className={template.mobileProgressRing} style={{'--mobile-progress':`${readSections.size / SECTIONS.length * 360}deg`}}><b>{readSections.size}</b><small>/{SECTIONS.length}</small></span><span className={template.mobileCurrentIcon}><Icon name={current.icon}/></span><span className={template.mobilePathLabel}><strong>Lernpfad</strong><small>{current.short}</small></span></button></div>
}

export default function ArvcLesson() {
  const [openId, setOpenId] = useState('definition')
  const [summaryOpen, setSummaryOpen] = useState(false)
  const [sourcesOpen, setSourcesOpen] = useState(false)
  const { isRead, toggleRead, authError } = useLessonReadStatus('arvc')
  const [readSections, setReadSections] = usePersistedSectionProgress('arvc-de-v3', SECTION_IDS, isRead)
  const scrollToSection = useLessonSectionScroll()
  const lehrMode = useLehrModeActive()
  const activeIndex = Math.max(0, SECTIONS.findIndex(s => s.id === openId))
  const allRead = readSections.size === SECTION_IDS.length

  useEffect(() => {
    const restoreHash = () => {
      const id = window.location.hash.slice(1)
      if (id === 'take-home' || id === 'merksaetze') { setSummaryOpen(true); scrollToSection('take-home') }
      else if (SECTION_IDS.includes(id)) { setOpenId(id); scrollToSection(id) }
    }
    restoreHash(); window.addEventListener('hashchange', restoreHash)
    return () => window.removeEventListener('hashchange', restoreHash)
  }, [scrollToSection])

  const select = id => {
    if (!SECTION_IDS.includes(id)) return
    setOpenId(id)
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${id}`)
    scrollToSection(id)
  }
  const openSummary = () => { setSummaryOpen(true); window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#take-home`); scrollToSection('take-home') }
  const toggleSection = id => {
    if (isRead && !toggleRead()) return
    setReadSections(previous => { const next = new Set(previous); next.has(id) ? next.delete(id) : next.add(id); return next })
  }
  const toggleAll = () => {
    setReadSections(allRead ? new Set() : new Set(SECTION_IDS))
    if (isRead !== !allRead) toggleRead()
  }
  return <main className={`${template.page} ${styles.page}`} data-lesson-section-divider="true" data-lesson-progress-managed="true" data-disable-lesson-explorer="true" lang="de" dir="ltr">
    <header className={template.header}>
      <div className={template.topline}><nav className={template.breadcrumb} aria-label="Brotkrumennavigation"><Link href="/lernen">RadYar</Link><span>/</span><Link href="/lernen/thorax">Thorax</Link><span>/</span><strong>ACM / ARVC</strong></nav><span className={template.author}>RadYar</span></div>
      <LessonHero title="Arrhythmogene Kardiomyopathie" imageSrc="/thorax/kardio/arvc/acm-heart.png" imageAlt="Illustrativer Herzanschnitt mit rechter und linker Kammer; kein diagnostisches Bild."/>
      <div className={`${template.actions} ${styles.actions}`}><button type="button" className={`${template.takeHomeJump} ${styles.takeHomeJump}`} onClick={openSummary}><Icon name="spark"/>Take Home Message<span aria-hidden="true">↓</span></button><Link className={template.primaryAction} href="/ueben/quiz?fach=thorax&n=10&themen=arvc&from=%2Fthorax%2Fkardio%2Farvc"><Icon name="case"/>MCQ starten<Icon name="arrow"/></Link><Link className={template.secondaryAction} href="/flashcards/arvc"><Icon name="layers"/>Flashcards</Link></div>
      <div className={`${template.progressBar} ${styles.progressBox}`}><div className={template.progressTrack} role="progressbar" aria-label="Gelesene Kapitel" aria-valuemin={0} aria-valuemax={SECTION_IDS.length} aria-valuenow={readSections.size}><i style={{width:`${readSections.size / SECTION_IDS.length * 100}%`}}/></div><span aria-live="polite">{readSections.size} / {SECTION_IDS.length} gelesen</span><div className={template.progressActions}><button type="button" className={template.continueButton} disabled={activeIndex === SECTIONS.length - 1} onClick={() => select(SECTIONS[activeIndex + 1].id)} aria-label="Lektion fortsetzen"><span className={styles.continueDesktop}>Lektion fortsetzen</span><span className={styles.continueMobile}>Weiter</span><Icon name="arrow"/></button><button type="button" className={`${template.lessonCompleteButton} ${allRead ? template.lessonCompleteButtonDone : ''}`} aria-pressed={allRead} onClick={toggleAll}><Icon name="check"/>{allRead ? 'Alles gelesen' : 'Alles als gelesen'}</button></div></div>
      {authError ? <p className={styles.authMessage} role="status">Auf diesem Gerät gespeichert. Zum Synchronisieren des Lesefortschritts bitte anmelden.</p> : null}
    </header>
    <div className={template.layout}><aside className={`${template.sidebar} ${styles.sidebar}`}><h2 className={template.learningPathHeading}>Lernpfad</h2><nav aria-label="Lernpfad">{SECTIONS.map(section => <button type="button" key={section.id} className={openId === section.id ? template.activeSideItem : ''} aria-current={openId === section.id ? 'location' : undefined} aria-label={`Abschnitt öffnen: ${section.short}`} onClick={() => select(section.id)}><span className={template.sideIcon}><Icon name={section.icon}/></span><strong>{section.short}{readSections.has(section.id) ? <span className={template.readTick} aria-label="gelesen"> ✓</span> : null}</strong></button>)}</nav></aside>
      <article className={template.lesson}>{SECTIONS.map(section => { const Content = CONTENT[section.id]; return <Chapter key={section.id} section={section} open={lehrMode || openId === section.id} read={readSections.has(section.id)} onSelect={select} onRead={toggleSection}><Content/>{section.id === 'tfc' ? <Sources indices={[0, 2]}/> : section.id === 'padua' ? <Sources indices={[1, 2, 7]}/> : null}</Chapter> })}
        <section id="take-home" className={`${template.section} ${template.takeHomeSection} ${styles.takeHome} ${summaryOpen || lehrMode ? template.sectionOpen : ''}`}><button type="button" className={template.sectionHeader} aria-expanded={summaryOpen || lehrMode} aria-controls="take-home-panel" data-lehr-section-managed="true" onClick={() => setSummaryOpen(value => !value)}><span className={template.sectionIcon}><Icon name="spark"/></span><span><strong>Take Home Message</strong></span><span className={template.toggle} aria-hidden="true">{summaryOpen || lehrMode ? '−' : '+'}</span></button><div id="take-home-panel" className={template.sectionBody} hidden={!summaryOpen && !lehrMode}><LessonTakeHome points={TAKE_HOME} lang="de" idPrefix="acm-takehome"/></div></section>
        <section id="quellen" className={styles.sources}><button type="button" aria-expanded={sourcesOpen || lehrMode} aria-controls="acm-sources" onClick={() => setSourcesOpen(v => !v)}><strong>Quellen & Bildnachweise</strong><span aria-hidden="true">{sourcesOpen || lehrMode ? '−' : '+'}</span></button><div id="acm-sources" hidden={!sourcesOpen && !lehrMode}><p>Deutsche Fassung · neu aufgebaut am 15. Oktober 2026.</p><ul>{SOURCES.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer"><strong>{source.label}</strong><span>{source.title}</span><Icon name="external"/></a></li>)}</ul><h3>Radiopaedia-Originalfälle</h3><ul>{CASES.map(item => <li key={item.id}><a href={item.url} target="_blank" rel="noreferrer"><strong>rID {item.id} · {item.creator}</strong><span>{item.title}</span><Icon name="external"/></a></li>)}</ul><p>Die klinischen Bilder und das Cine sind Originalaufnahmen. Das Herz im Kopfbereich ist eine generierte Illustration; die interaktiven Diagramme sind vereinfachte Schemata. Beides ist klar von den diagnostischen Aufnahmen getrennt.</p></div></section>
      </article>
    </div><MobilePath openId={openId} readSections={readSections} onSelect={select}/>
  </main>
}
