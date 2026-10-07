'use client'

import Link from 'next/link'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { usePersistedSectionProgress } from '@/hooks/usePersistedSectionProgress'
import styles from './StandardLessonShell.module.css'

const LessonShellContext = createContext(null)

function replaceLessonHash(id) {
  const baseUrl = `${window.location.pathname}${window.location.search}`
  window.history.replaceState(null, '', id ? `${baseUrl}#${id}` : baseUrl)
}

function scrollToLessonSection(id) {
  requestAnimationFrame(() => requestAnimationFrame(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }))
}

function Icon({ name }) {
  const paths = {
    check: 'M4 12.5l5 5L20 6.5',
    arrow: 'M5 12h14 M14 7l5 5-5 5',
    down: 'M12 5v14 M7 14l5 5 5-5',
    external: 'M14 4h6v6 M20 4l-9 9 M18 14v6H4V6h6',
    chevron: 'M7 9l5 5 5-5',
    close: 'M6 6l12 12 M18 6L6 18',
  }
  const actionIcons = {
    summary: <><path d="M12 2l1.5 5.1L19 9l-5.5 1.9L12 16l-1.5-5.1L5 9l5.5-1.9z"/><path d="m18.5 15 .8 2.7 2.7.8-2.7.8-.8 2.7-.8-2.7-2.7-.8 2.7-.8z"/></>,
    quiz: <><rect x="3.5" y="3.5" width="17" height="17" rx="2.5"/><path d="M7.2 9.1a2 2 0 1 1 2.8 1.8c-.9.4-1.4.9-1.4 1.8"/><circle cx="8.6" cy="16" r=".55" fill="currentColor" stroke="none"/><path d="M13.5 8.5h3.5M13.5 12h3.5M13.5 15.5h2.5"/></>,
    cards: <><rect x="7" y="5" width="13" height="15" rx="2"/><path d="M7 18H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2"/><path d="M10 9h7M10 13h5"/></>,
  }
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{actionIcons[name] || <path d={paths[name]} />}</svg>
}

function Action({ action, className, icon }) {
  if (!action) return null
  const content = <><Icon name={icon} /><span>{action.label}</span>{action.trailingIcon ? <Icon name={action.trailingIcon} /> : null}</>
  if (action.href) return <Link className={className} href={action.href}>{content}</Link>
  return <button type="button" className={className} onClick={action.onClick} aria-disabled={action.disabled || undefined} disabled={action.nativeDisabled}>{content}</button>
}

function MobileLearningPath() {
  const context = useContext(LessonShellContext)
  const [panelOpen, setPanelOpen] = useState(false)
  if (!context) return null

  const { labels, openId, readSections, trackedSections, openSection, renderIcon } = context
  const activeSection = trackedSections.find(section => section.id === openId) || trackedSections[0]
  const progress = trackedSections.length ? (readSections.size / trackedSections.length) * 360 : 0
  const selectFromPanel = id => {
    openSection(id)
    setPanelOpen(false)
  }

  return <div className={styles.mobileLearningPath}>
    {panelOpen ? <section id="standard-mobile-learning-path-panel" className={styles.mobilePathPanel} role="dialog" aria-label={labels.path}>
      <header><div><small>{labels.progress}</small><strong>{readSections.size} / {trackedSections.length}</strong></div><button type="button" onClick={() => setPanelOpen(false)} aria-label={labels.close}><Icon name="close" /></button></header>
      <nav>{trackedSections.map(section => <button type="button" key={section.id} className={openId === section.id ? styles.mobilePathCurrent : ''} onClick={() => selectFromPanel(section.id)} aria-current={openId === section.id ? 'location' : undefined}>
        <span className={styles.mobilePathItemIcon}>{renderIcon(section.icon || section.id)}</span>
        <span><strong>{section.label}</strong></span>
        <i aria-hidden="true">{readSections.has(section.id) ? '✓' : ''}</i>
      </button>)}</nav>
    </section> : null}
    <button type="button" className={styles.mobilePathButton} onClick={() => setPanelOpen(value => !value)} aria-expanded={panelOpen} aria-controls="standard-mobile-learning-path-panel">
      <span className={styles.mobileProgressRing} style={{ '--mobile-progress': `${progress}deg` }}><b>{readSections.size}</b><small>/{trackedSections.length}</small></span>
      <span className={styles.mobileCurrentIcon}>{renderIcon(activeSection?.icon || activeSection?.id)}</span>
      <span className={styles.mobilePathLabel}><strong>{labels.path}</strong><small>{activeSection?.label}</small></span>
    </button>
  </div>
}

export function LessonSection({ id, title, icon, children, bodyClassName = '' }) {
  const context = useContext(LessonShellContext)
  if (!context) throw new Error('LessonSection must be rendered inside StandardLessonShell')

  const { labels, openId, openSection, summaryOpen, toggleSummary, readSections, toggleSectionRead, sections, renderIcon } = context
  const section = sections.find(item => item.id === id)
  const emphasis = Boolean(section?.emphasis)
  const open = emphasis ? summaryOpen : openId === id
  const isRead = readSections.has(id)

  return <section id={id} className={`${styles.section} ${open ? styles.sectionOpen : ''} ${emphasis ? styles.takeHomeSection : ''}`}>
    <button type="button" className={styles.sectionHeader} onClick={() => emphasis ? toggleSummary() : openSection(id)} aria-expanded={open} aria-controls={`${id}-panel`}>
      <span className={styles.sectionIcon}>{renderIcon(icon || section?.icon || id)}</span>
      <span><strong>{title || section?.label}</strong></span>
      <span className={`${styles.toggle} ${open ? styles.toggleOpen : ''}`} aria-hidden="true"><Icon name="chevron" /></span>
    </button>
    <div id={`${id}-panel`} hidden={!open} className={`${styles.sectionBody} ${bodyClassName}`}>
      {children}
      {!emphasis ? <button type="button" className={`${styles.readButton} ${isRead ? styles.readButtonDone : ''}`} aria-pressed={isRead} onClick={() => toggleSectionRead(id)}><Icon name="check" />{isRead ? labels.completed : labels.complete}</button> : null}
    </div>
  </section>
}

export function TakeHomeList({ items }) {
  const [openItems, setOpenItems] = useState(() => new Set())
  const toggle = index => setOpenItems(previous => {
    const next = new Set(previous)
    if (next.has(index)) next.delete(index)
    else next.add(index)
    return next
  })

  return <ol className={styles.takeHomeList}>{items.map((item, index) => {
    const open = openItems.has(index)
    return <li key={`${index}-${item.title}`} className={open ? styles.takeHomeItemOpen : ''}>
      <button type="button" onClick={() => toggle(index)} aria-expanded={open} aria-controls={`take-home-detail-${index}`}>
        <span className={styles.takeHomeNumber}>{String(index + 1).padStart(2, '0')}</span>
        <strong>{item.title}</strong>
        <span className={`${styles.takeHomeChevron} ${open ? styles.takeHomeChevronOpen : ''}`}><Icon name="chevron" /></span>
      </button>
      <div id={`take-home-detail-${index}`} className={styles.takeHomeDetail} hidden={!open}><p>{item.detail}</p></div>
    </li>
  })}</ol>
}

export function LessonSources({ title, items, note }) {
  const [open, setOpen] = useState(false)
  return <aside className={styles.sources}>
    <button type="button" className={styles.sourcesToggle} onClick={() => setOpen(value => !value)} aria-expanded={open} aria-controls="lesson-sources-panel"><span>{title}</span><span className={open ? styles.sourcesChevronOpen : ''}><Icon name="chevron" /></span></button>
    <div id="lesson-sources-panel" className={styles.sourcesPanel} hidden={!open}>
      <ol>{items.map((item, index) => <li key={item.href}>
        <span className={styles.sourceNumber}>{String(index + 1).padStart(2, '0')}</span>
        <div><small>{item.tag}</small><a href={item.href} target="_blank" rel="noreferrer"><strong>{item.title}</strong><Icon name="external" /></a><p>{item.citation}</p>{item.scope ? <em>{item.scope}</em> : null}</div>
      </li>)}</ol>
      {note ? <p className={styles.sourcesNote}>{note}</p> : null}
    </div>
  </aside>
}

export default function StandardLessonShell({
  lessonId,
  lang,
  title,
  author,
  breadcrumbs,
  sections,
  labels,
  actions,
  renderIcon,
  theme,
  className = '',
  children,
  sources,
}) {
  const trackedSections = useMemo(() => sections.filter(section => !section.emphasis), [sections])
  const trackedIds = useMemo(() => trackedSections.map(section => section.id), [trackedSections])
  const [openId, setOpenId] = useState(trackedSections[0]?.id || sections[0]?.id || null)
  const [summaryOpen, setSummaryOpen] = useState(false)
  const [readSections, setReadSections] = usePersistedSectionProgress(lessonId, trackedIds)
  const activeIndex = trackedSections.findIndex(section => section.id === openId)
  const summarySection = sections.find(section => section.emphasis)

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash === summarySection?.id) setSummaryOpen(true)
    else if (trackedSections.some(section => section.id === hash)) setOpenId(hash)
  }, [summarySection?.id, trackedSections])

  const openSection = id => {
    if (!trackedIds.includes(id)) return
    setOpenId(id)
    replaceLessonHash(id)
    scrollToLessonSection(id)
  }

  const openSummary = () => {
    if (!summarySection) return
    setSummaryOpen(true)
    replaceLessonHash(summarySection.id)
    scrollToLessonSection(summarySection.id)
  }

  const toggleSummary = () => {
    if (!summarySection) return
    setSummaryOpen(previous => {
      const next = !previous
      replaceLessonHash(next ? summarySection.id : openId)
      if (next) scrollToLessonSection(summarySection.id)
      return next
    })
  }

  const advance = () => {
    const nextIndex = activeIndex < 0 ? 0 : Math.min(activeIndex + 1, trackedSections.length - 1)
    openSection(trackedSections[nextIndex].id)
  }

  const toggleSectionRead = id => setReadSections(previous => {
    const next = new Set(previous)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    return next
  })

  const lessonComplete = trackedIds.length > 0 && readSections.size === trackedIds.length
  const toggleLessonComplete = () => setReadSections(lessonComplete ? new Set() : new Set(trackedIds))
  const progress = trackedIds.length ? (readSections.size / trackedIds.length) * 100 : 0
  const context = { labels, openId, openSection, summaryOpen, toggleSummary, readSections, toggleSectionRead, sections, trackedSections, renderIcon }
  const shellStyle = {
    '--lesson-background-image': `url("${theme.backgroundImage}")`,
    '--lesson-hero-image': theme.heroImage ? `url("${theme.heroImage}")` : 'none',
    '--lesson-hero-image-opacity': theme.heroImageOpacity ?? .42,
    '--lesson-accent': theme.accent,
    '--lesson-accent-strong': theme.accentStrong,
    '--lesson-accent-soft': theme.accentSoft,
    '--lesson-secondary': theme.secondary,
    '--lesson-secondary-strong': theme.secondaryStrong,
    '--lesson-hero-base': theme.heroBase,
  }

  const summaryAction = summarySection ? { label: labels.takeHome, onClick: openSummary, trailingIcon: 'down' } : null
  const isAtLastTrackedSection = activeIndex === trackedSections.length - 1

  return <main className={`${styles.page} ${className}`} style={shellStyle} data-lesson-progress-managed="true" dir={lang === 'fa' ? 'rtl' : 'ltr'} lang={lang}>
    <header className={styles.header}>
      <div className={styles.topline}>
        <nav className={styles.breadcrumb} aria-label={labels.contents}>{breadcrumbs.map((item, index) => <span key={`${item.label}-${index}`}>{index ? <i aria-hidden="true">/</i> : null}{item.href ? <Link href={item.href}>{item.label}</Link> : <strong>{item.label}</strong>}</span>)}</nav>
        <span className={styles.author}>{author}</span>
      </div>
      <div className={styles.hero}>
        <div className={styles.heroCopy}><h1>{title}</h1></div>
        <div className={styles.heroVisual} aria-hidden="true" />
      </div>
      <div className={styles.actions}>
        <Action action={summaryAction} className={styles.takeHomeJump} icon="summary" />
        <Action action={actions.mcq} className={styles.primaryAction} icon="quiz" />
        <Action action={actions.flashcards} className={styles.secondaryAction} icon="cards" />
      </div>
      <div className={styles.progressBar}>
        <div className={styles.progressTrack} role="progressbar" aria-label={labels.progress} aria-valuemin={0} aria-valuemax={trackedIds.length} aria-valuenow={readSections.size}><i style={{ width: `${progress}%` }} /></div>
        <span>{readSections.size} / {trackedIds.length} {labels.progress}</span>
        <div className={styles.progressActions}>
          <button type="button" className={styles.continueButton} onClick={advance} disabled={isAtLastTrackedSection}>{labels.continue}<Icon name="arrow" /></button>
          <button type="button" className={`${styles.lessonCompleteButton} ${lessonComplete ? styles.lessonCompleteButtonDone : ''}`} aria-pressed={lessonComplete} onClick={toggleLessonComplete}><Icon name="check" />{lessonComplete ? labels.lessonCompleted : labels.completeLesson}</button>
        </div>
      </div>
    </header>

    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <h2>{labels.path}</h2>
        <nav>{trackedSections.map(section => <button type="button" key={section.id} className={openId === section.id ? styles.activeSideItem : ''} onClick={() => openSection(section.id)} aria-current={openId === section.id ? 'location' : undefined} aria-label={`${labels.open}: ${section.label}`}><span className={styles.sideIcon}>{renderIcon(section.icon || section.id)}</span><strong>{section.label}</strong></button>)}</nav>
      </aside>
      <div className={styles.lessonColumn}>
        <article className={styles.lesson}><LessonShellContext.Provider value={context}>{children}</LessonShellContext.Provider></article>
        {sources}
      </div>
    </div>
    <LessonShellContext.Provider value={context}><MobileLearningPath /></LessonShellContext.Provider>
  </main>
}
