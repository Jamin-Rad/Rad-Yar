'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import LessonTakeHome from '@/components/LessonTakeHome'
import { usePersistedSectionProgress } from '@/hooks/usePersistedSectionProgress'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useLessonSectionScroll } from '@/hooks/useLessonSectionScroll'
import { useLehrModeActive } from '@/hooks/useLehrModeActive'
import CaseAtlas from './CaseAtlas'
import CriteriaOverview from './CriteriaLab'
import { Icon, Note, MrtOverview } from './LessonVisuals'
import { CASES, CORE_SECTION_IDS, SECTIONS, SECTION_IDS, SOURCES, TAKE_HOME } from './lessonContent'
import template from '@/components/LessonTemplate.module.css'
import styles from './page.module.css'

function Definition() {
  return <>
    <p className={styles.lead}>Bei der <strong>arrhythmogenen Kardiomyopathie (ACM)</strong> wird Herzmuskel durch Narbengewebe ersetzt, teilweise auch durch Fett. Das kann gefährliche Herzrhythmusstörungen auslösen – auch wenn die Pumpfunktion noch relativ gut ist.</p>
    <p className={styles.bodyText}>Früher wurde vor allem die rechte Herzkammer beschrieben: daher der Name <strong>ARVC</strong>. Heute weiß man, dass auch die linke Kammer betroffen sein kann, manchmal sogar überwiegend. <strong>ACM ist deshalb der umfassendere Begriff.</strong> Die Erkrankung ist häufig erblich; eine LV-Beteiligung ist auch für die Prognose wichtig.</p>
    <Note title="Für das MRT merken">Immer beide Herzkammern ansehen: Größe, Bewegung, Pumpfunktion und Narben.</Note>
  </>
}

function Mrt() {
  return <>
    <p className={styles.lead}>Im MRT stehen drei Fragen im Vordergrund: <strong>Ist eine Kammer vergrößert? Bewegt sich die Wand richtig? Gibt es Narben?</strong></p>
    <MrtOverview/>
  </>
}

const CONTENT = { definition: Definition, muster: Mrt, kriterien: CriteriaOverview, bilder: CaseAtlas }
const LEGACY_SECTIONS = { mrt: 'muster', tfc: 'kriterien', padua: 'kriterien', differenzialdiagnosen: 'kriterien' }

function Chapter({ section, open, read, onSelect, onRead, children }) {
  return <section id={section.id} className={`${template.section} ${styles.chapter} ${open ? template.sectionOpen : ''}`}><button type="button" className={template.sectionHeader} onClick={() => onSelect(section.id)} aria-expanded={open} aria-controls={`${section.id}-panel`} data-lehr-section-managed="true"><span className={template.sectionIcon}><Icon name={section.icon}/></span><span><strong>{section.title}</strong></span><span className={template.toggle} aria-hidden="true">{open ? '−' : '+'}</span></button><div id={`${section.id}-panel`} hidden={!open} className={`${template.sectionBody} ${styles.chapterBody}`}>{children}{!section.optional ? <button type="button" className={`${template.readButton} ${read ? template.readButtonDone : ''}`} aria-pressed={read} onClick={() => onRead(section.id)}><Icon name="check"/>{read ? 'Als gelesen markiert' : 'Abschnitt als gelesen markieren'}</button> : null}</div></section>
}

function MobilePath({ openId, readSections, onSelect }) {
  const [expanded, setExpanded] = useState(false)
  const current = SECTIONS.find(s => s.id === openId) || SECTIONS[0]
  return <div className={template.mobileLearningPath}>{expanded ? <section className={template.mobilePathPanel} id="acm-mobile-path" aria-label="Lernpfad"><header><div><small>Lernpfad</small><strong>{readSections.size} / {CORE_SECTION_IDS.length} gelesen</strong></div><button type="button" onClick={() => setExpanded(false)} aria-label="Lernpfad schließen">×</button></header><nav>{SECTIONS.map(section => <button type="button" key={section.id} className={openId === section.id ? template.mobilePathCurrent : ''} onClick={() => { onSelect(section.id); setExpanded(false) }} aria-current={openId === section.id ? 'location' : undefined}><span className={template.mobilePathItemIcon}><Icon name={section.icon}/></span><span><strong>{section.short}</strong><small>{section.title}</small></span><i aria-label={readSections.has(section.id) ? 'gelesen' : undefined}>{readSections.has(section.id) ? '✓' : ''}</i></button>)}</nav></section> : null}<button type="button" className={template.mobilePathButton} aria-expanded={expanded} aria-controls="acm-mobile-path" onClick={() => setExpanded(value => !value)}><span className={template.mobileProgressRing} style={{'--mobile-progress':`${readSections.size / CORE_SECTION_IDS.length * 360}deg`}}><b>{readSections.size}</b><small>/{CORE_SECTION_IDS.length}</small></span><span className={template.mobileCurrentIcon}><Icon name={current.icon}/></span><span className={template.mobilePathLabel}><strong>Lernpfad</strong><small>{current.short}</small></span></button></div>
}

export default function ArvcLesson() {
  const [openId, setOpenId] = useState('definition')
  const [summaryOpen, setSummaryOpen] = useState(false)
  const [sourcesOpen, setSourcesOpen] = useState(false)
  const { isRead, toggleRead, authError } = useLessonReadStatus('arvc')
  const [readSections, setReadSections] = usePersistedSectionProgress('arvc-de-v4', CORE_SECTION_IDS, isRead)
  const scrollToSection = useLessonSectionScroll()
  const lehrMode = useLehrModeActive()
  const activeIndex = Math.max(0, SECTIONS.findIndex(s => s.id === openId))
  const allRead = readSections.size === CORE_SECTION_IDS.length

  useEffect(() => {
    const restoreHash = () => {
      const hash = window.location.hash.slice(1)
      const id = LEGACY_SECTIONS[hash] || hash
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
    setReadSections(allRead ? new Set() : new Set(CORE_SECTION_IDS))
    if (isRead !== !allRead) toggleRead()
  }
  return <main className={`${template.page} ${styles.page}`} data-lesson-section-divider="true" data-lesson-progress-managed="true" data-disable-lesson-explorer="true" lang="de" dir="ltr">
    <header className={template.header}>
      <div className={template.topline}><nav className={template.breadcrumb} aria-label="Brotkrumennavigation"><Link href="/lernen">RadYar</Link><span>/</span><Link href="/lernen/thorax">Thorax</Link><span>/</span><strong>ACM / ARVC</strong></nav><span className={template.author}>RadYar</span></div>
      <div className={styles.compactHero}><h1>Arrhythmogene Kardiomyopathie</h1><p>Ein kompakter Überblick mit echten MRT-Aufnahmen.</p></div>
      <div className={`${template.actions} ${styles.actions}`}><button type="button" className={`${template.takeHomeJump} ${styles.takeHomeJump}`} onClick={openSummary}><Icon name="spark"/>Take Home Message<span aria-hidden="true">↓</span></button><Link className={template.primaryAction} href="/ueben/quiz?fach=thorax&n=10&themen=arvc&from=%2Fthorax%2Fkardio%2Farvc"><Icon name="case"/>MCQ starten<Icon name="arrow"/></Link><Link className={template.secondaryAction} href="/flashcards/arvc"><Icon name="layers"/>Flashcards</Link></div>
      <div className={`${template.progressBar} ${styles.progressBox}`}><div className={template.progressTrack} role="progressbar" aria-label="Gelesene Kapitel" aria-valuemin={0} aria-valuemax={CORE_SECTION_IDS.length} aria-valuenow={readSections.size}><i style={{width:`${readSections.size / CORE_SECTION_IDS.length * 100}%`}}/></div><span aria-live="polite">{readSections.size} / {CORE_SECTION_IDS.length} gelesen</span><div className={template.progressActions}><button type="button" className={template.continueButton} disabled={activeIndex === SECTIONS.length - 1} onClick={() => select(SECTIONS[activeIndex + 1].id)} aria-label="Lektion fortsetzen"><span className={styles.continueDesktop}>Lektion fortsetzen</span><span className={styles.continueMobile}>Weiter</span><Icon name="arrow"/></button><button type="button" className={`${template.lessonCompleteButton} ${allRead ? template.lessonCompleteButtonDone : ''}`} aria-pressed={allRead} onClick={toggleAll}><Icon name="check"/>{allRead ? 'Alles gelesen' : 'Alles als gelesen'}</button></div></div>
      {authError ? <p className={styles.authMessage} role="status">Auf diesem Gerät gespeichert. Zum Synchronisieren des Lesefortschritts bitte anmelden.</p> : null}
    </header>
    <div className={template.layout}><aside className={`${template.sidebar} ${styles.sidebar}`}><h2 className={template.learningPathHeading}>Lernpfad</h2><nav aria-label="Lernpfad">{SECTIONS.map(section => <button type="button" key={section.id} className={openId === section.id ? template.activeSideItem : ''} aria-current={openId === section.id ? 'location' : undefined} aria-label={`Abschnitt öffnen: ${section.short}`} onClick={() => select(section.id)}><span className={template.sideIcon}><Icon name={section.icon}/></span><strong>{section.short}{readSections.has(section.id) ? <span className={template.readTick} aria-label="gelesen"> ✓</span> : null}</strong></button>)}</nav></aside>
      <article className={template.lesson}>{SECTIONS.map(section => { const Content = CONTENT[section.id]; return <Chapter key={section.id} section={section} open={lehrMode || openId === section.id} read={readSections.has(section.id)} onSelect={select} onRead={toggleSection}><Content/></Chapter> })}
        <section id="take-home" className={`${template.section} ${template.takeHomeSection} ${styles.takeHome} ${summaryOpen || lehrMode ? template.sectionOpen : ''}`}><button type="button" className={template.sectionHeader} aria-expanded={summaryOpen || lehrMode} aria-controls="take-home-panel" data-lehr-section-managed="true" onClick={() => setSummaryOpen(value => !value)}><span className={template.sectionIcon}><Icon name="spark"/></span><span><strong>Take Home Message</strong></span><span className={template.toggle} aria-hidden="true">{summaryOpen || lehrMode ? '−' : '+'}</span></button><div id="take-home-panel" className={template.sectionBody} hidden={!summaryOpen && !lehrMode}><LessonTakeHome points={TAKE_HOME} lang="de" idPrefix="acm-takehome"/></div></section>
        <section id="quellen" className={styles.sources}><button type="button" aria-expanded={sourcesOpen || lehrMode} aria-controls="acm-sources" onClick={() => setSourcesOpen(v => !v)}><strong>Quellen & Bildnachweise</strong><span aria-hidden="true">{sourcesOpen || lehrMode ? '−' : '+'}</span></button><div id="acm-sources" hidden={!sourcesOpen && !lehrMode}><p>Deutsche Fassung · kompakter Überblick.</p><ul>{SOURCES.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer"><strong>{source.label}</strong><span>{source.title}</span><Icon name="external"/></a></li>)}</ul><h3>Radiopaedia-Originalfälle</h3><ul>{CASES.filter(item => item.id !== '95633').map(item => <li key={item.id}><a href={item.url} target="_blank" rel="noreferrer"><strong>rID {item.id} · {item.creator}</strong><span>{item.title}</span><Icon name="external"/></a></li>)}</ul><p>Die MRT-Bilder und das Cine sind Originalaufnahmen. Einblendbare Orientierungspunkte von RadYar liegen separat über den unveränderten Bildern.</p></div></section>
      </article>
    </div><MobilePath openId={openId} readSections={readSections} onSelect={select}/>
  </main>
}
