'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './LessonEnhancer.module.css'

const LESSON_PREFIXES = [
  '/abdomen/', '/gehirn/', '/lunge/', '/mamma/bildgebung/',
  '/msk/', '/technik/', '/thorax/', '/wirbelsaeule/',
]

const COPY = {
  de: { sections: 'Abschnitte', progress: 'Lektionsfortschritt', read: 'gelesen', close: 'Schließen', recall: 'Kurztest', concepts: 'Begriffe', think: 'Erst selbst beantworten', reveal: 'Antwort anzeigen', next: 'Nächste Frage', restart: 'Neu starten', done: 'Test abgeschlossen' },
  en: { sections: 'Sections', progress: 'Lesson progress', read: 'read', close: 'Close', recall: 'Quick check', concepts: 'concepts', think: 'Answer from memory first', reveal: 'Show answer', next: 'Next question', restart: 'Restart', done: 'Check completed' },
  fa: { sections: 'بخش‌ها', progress: 'پیشرفت درس', read: 'خوانده‌شده', close: 'بستن', recall: 'مرور فعال', concepts: 'مفهوم', think: 'ابتدا از حافظه پاسخ بدهید', reveal: 'نمایش پاسخ', next: 'پرسش بعدی', restart: 'شروع دوباره', done: 'مرور کامل شد' },
}

function isLessonPath(pathname) {
  if (!pathname || pathname.includes('/rechner') || pathname.endsWith('/mcq')) return false
  return LESSON_PREFIXES.some(prefix => pathname.startsWith(prefix))
}

function findHeading(section) {
  return section.querySelector(':scope > button h2, :scope > header h2, :scope > div:first-child h2, :scope > h2')
}

function isNumberMarker(element) {
  return /^(?:0?[1-9]|[1-9][0-9])(?:\s*[·.)].*)?$/.test(element?.textContent?.trim() || '')
}

function menuEntries(aside) {
  return Array.from(aside.querySelectorAll('button, a[href^="#"]'))
    .filter(entry => !entry.closest('[data-lesson-progress-ui]'))
}

function findSidebar(main, sectionCount) {
  const candidates = Array.from(main.querySelectorAll('aside'))
    .map(aside => ({ aside, entries: menuEntries(aside) }))
    .filter(candidate => candidate.entries.length >= Math.min(2, sectionCount))
  if (!candidates.length) return null
  candidates.sort((a, b) => {
    const aVisible = a.aside.getClientRects().length ? 1 : 0
    const bVisible = b.aside.getClientRects().length ? 1 : 0
    if (aVisible !== bVisible) return bVisible - aVisible
    return Math.abs(a.entries.length - sectionCount) - Math.abs(b.entries.length - sectionCount)
  })
  return candidates[0]
}

function sourceIcon(entry) {
  if (!entry) return null
  const first = entry.querySelector(':scope > span:first-child, :scope > svg:first-child')
  if (!first || (first.tagName !== 'SVG' && isNumberMarker(first))) return null
  return first
}

function headerAlreadyHasIcon(heading) {
  const siblings = Array.from(heading.parentElement?.children || [])
  const headingIndex = siblings.indexOf(heading)
  return siblings.slice(0, headingIndex).some(element => {
    if (element.matches('[data-lesson-section-icon], small') || isNumberMarker(element)) return false
    return Boolean(element.matches('svg') || element.querySelector('svg') || (element.textContent?.trim() || '').length <= 4)
  })
}

function IconMarkup({ html }) {
  if (!html) return <span className={styles.iconPlaceholder} aria-hidden="true" />
  return <span className={styles.menuIcon} aria-hidden="true" dangerouslySetInnerHTML={{ __html: html }} />
}

function cleanText(value) {
  return (value || '').replace(/\s+/g, ' ').trim()
}

function extractRecall(section) {
  const target = section.querySelector(':scope > button[aria-expanded] + div, :scope > div:last-child')
  if (!target || target.closest('[data-lesson-recall]')) return null
  const cards = []
  const seen = new Set()
  const add = (prompt, answer) => {
    const question = cleanText(prompt)
    const response = cleanText(answer)
    const key = `${question}|${response}`
    if (question.length < 2 || question.length > 150 || response.length < 18 || response.length > 900 || seen.has(key)) return
    seen.add(key)
    cards.push({ prompt: question, answer: response })
  }

  target.querySelectorAll('article, li, div').forEach(item => {
    if (item.closest('section[id]') !== section || item.closest('[data-lesson-recall]')) return
    if (item.querySelector('button, input, select, textarea')) return
    const prompt = item.querySelector(':scope > h3, :scope > h4, :scope > strong, :scope > b')
    const answer = item.querySelector(':scope > p')
    if (prompt && answer) add(prompt.textContent, answer.textContent)
  })

  if (cards.length < 2) {
    target.querySelectorAll('tbody tr').forEach(row => {
      if (row.closest('section[id]') !== section || row.querySelector('button, input, select, textarea')) return
      const cells = Array.from(row.querySelectorAll(':scope > th, :scope > td'))
      if (cells.length >= 2) add(cells[0].textContent, cells.slice(1).map(cell => cell.textContent).join(' · '))
    })
  }

  return cards.length >= 2 ? { target, cards: cards.slice(0, 12) } : null
}

function RecallIcon() {
  return <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 5a3 3 0 0 0-3 3v1a3 3 0 0 0 1 5v1a3 3 0 0 0 3 3c1.3 0 2.4-.8 3-1.8.6 1 1.7 1.8 3 1.8a3 3 0 0 0 3-3v-1a3 3 0 0 0 1-5V8a3 3 0 0 0-3-3c-1.3 0-2.4.8-3 1.8C10.4 5.8 9.3 5 8 5Z M12 7v9 M7 10h2 M15 13h2" /></svg>
}

function RecallExercise({ cards, copy, sectionTitle }) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const complete = index === cards.length - 1 && revealed
  const advance = () => {
    if (complete) {
      setIndex(0)
      setRevealed(false)
      return
    }
    setIndex(value => Math.min(cards.length - 1, value + 1))
    setRevealed(false)
  }
  const current = cards[index]

  return <div className={`${styles.recall} ${open ? styles.recallOpen : ''}`} data-lesson-recall data-lesson-progress-ui>
    <button type="button" className={styles.recallLaunch} onClick={() => setOpen(value => !value)} aria-expanded={open}>
      <span><RecallIcon /></span><strong>{copy.recall}</strong><small>{cards.length} {copy.concepts}</small><i aria-hidden="true">{open ? '−' : '+'}</i>
    </button>
    {open && <div className={styles.recallBody}>
      <div className={styles.recallMeta}><span>{sectionTitle}</span><strong>{index + 1} / {cards.length}</strong></div>
      <div className={styles.recallSteps} aria-hidden="true">{cards.map((_, step) => <i key={step} className={step <= index ? styles.recallStepActive : ''} />)}</div>
      <small className={styles.recallHint}>{copy.think}</small>
      <h3>{current.prompt}</h3>
      {!revealed ? <button type="button" className={styles.revealButton} onClick={() => setRevealed(true)}>{copy.reveal}</button> : <>
        <div className={styles.recallAnswer}><RecallIcon /><p>{current.answer}</p></div>
        <button type="button" className={styles.nextButton} onClick={advance}>{complete ? copy.restart : copy.next}<span aria-hidden="true">→</span></button>
        {complete && <small className={styles.recallDone}>{copy.done}</small>}
      </>}
    </div>}
  </div>
}

export default function LessonEnhancer() {
  const pathname = usePathname()
  const { lang } = useLanguage()
  const copy = COPY[lang] || COPY.de
  const enabled = isLessonPath(pathname)
  const storageKey = `radyar-lesson-sections:${pathname}`
  const [sections, setSections] = useState([])
  const [activeId, setActiveId] = useState('')
  const [readIds, setReadIds] = useState(() => new Set())
  const [loadedKey, setLoadedKey] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const [mobile, setMobile] = useState(false)
  const [sidebarTarget, setSidebarTarget] = useState(null)
  const [navbarTarget, setNavbarTarget] = useState(null)
  const [recallSets, setRecallSets] = useState([])

  useEffect(() => {
    const query = window.matchMedia('(max-width: 760px)')
    const update = () => setMobile(query.matches)
    update()
    query.addEventListener?.('change', update)
    return () => query.removeEventListener?.('change', update)
  }, [])

  useEffect(() => {
    if (!enabled) return
    try {
      const saved = JSON.parse(window.localStorage.getItem(storageKey) || '[]')
      setReadIds(new Set(Array.isArray(saved) ? saved : []))
    } catch {
      setReadIds(new Set())
    }
    setLoadedKey(storageKey)
  }, [enabled, storageKey])

  useEffect(() => {
    if (!enabled || loadedKey !== storageKey) return
    window.localStorage.setItem(storageKey, JSON.stringify(Array.from(readIds)))
  }, [enabled, loadedKey, readIds, storageKey])

  const discover = useCallback(() => {
    if (!enabled) return
    const main = document.querySelector('main')
    if (!main) return
    const foundSections = Array.from(main.querySelectorAll('section[id]')).flatMap(section => {
      const heading = findHeading(section)
      return heading ? [{ heading, id: section.id, title: heading.textContent?.trim() || section.id }] : []
    })
    const sidebar = findSidebar(main, foundSections.length)
    const entries = sidebar?.entries || []
    let progressHost = sidebar?.aside.querySelector('[data-lesson-desktop-progress-host]') || null
    if (sidebar?.aside && !progressHost) {
      progressHost = document.createElement('div')
      progressHost.dataset.lessonDesktopProgressHost = 'true'
      progressHost.dataset.lessonProgressUi = 'true'
      progressHost.className = styles.desktopProgressHost
      const firstEntry = entries[0]
      if (firstEntry) sidebar.aside.insertBefore(progressHost, firstEntry)
      else sidebar.aside.appendChild(progressHost)
    }

    document.querySelectorAll('[data-lesson-section-icon]').forEach(icon => icon.remove())
    document.querySelectorAll('[data-lesson-target-id]').forEach(entry => delete entry.dataset.lessonTargetId)
    document.querySelectorAll('[data-lesson-number-marker]').forEach(marker => {
      marker.classList.remove(styles.hiddenNumber)
      delete marker.dataset.lessonNumberMarker
    })

    const found = foundSections.map((item, index) => {
      const entry = entries[index]
      if (entry) entry.dataset.lessonTargetId = item.id
      const icon = sourceIcon(entry)
      const numericMarker = Array.from(item.heading.parentElement?.children || [])
        .find(element => element !== item.heading && element.matches('small') && isNumberMarker(element))
      if (numericMarker) {
        numericMarker.dataset.lessonNumberMarker = 'true'
        numericMarker.classList.add(styles.hiddenNumber)
      }
      if (icon && !headerAlreadyHasIcon(item.heading)) {
        const clone = icon.cloneNode(true)
        clone.dataset.lessonSectionIcon = 'true'
        clone.classList.add(styles.headerIcon)
        clone.setAttribute('aria-hidden', 'true')
        item.heading.parentElement?.insertBefore(clone, item.heading)
      }
      return { id: item.id, title: item.title, iconHtml: icon?.outerHTML || '' }
    })
    const recalls = foundSections.flatMap((item, index) => {
      const recall = extractRecall(document.getElementById(item.id))
      return recall ? [{ id: item.id, title: found[index].title, ...recall }] : []
    })

    setSections(current => {
      const before = current.map(item => `${item.id}:${item.title}:${item.iconHtml}`).join('|')
      const after = found.map(item => `${item.id}:${item.title}:${item.iconHtml}`).join('|')
      return before === after ? current : found
    })
    setActiveId(current => found.some(item => item.id === current) ? current : (found[0]?.id || ''))
    setSidebarTarget(progressHost)
    setNavbarTarget(document.querySelector('[data-radyar-navbar]'))
    setRecallSets(current => {
      const before = current.map(item => `${item.id}:${item.cards.map(card => `${card.prompt}:${card.answer}`).join('|')}`).join('||')
      const after = recalls.map(item => `${item.id}:${item.cards.map(card => `${card.prompt}:${card.answer}`).join('|')}`).join('||')
      return before === after ? current : recalls
    })
  }, [enabled])

  useEffect(() => {
    if (!enabled) return undefined
    const firstTimer = window.setTimeout(discover, 0)
    const secondTimer = window.setTimeout(discover, 350)
    window.addEventListener('load', discover)
    return () => {
      window.clearTimeout(firstTimer)
      window.clearTimeout(secondTimer)
      window.removeEventListener('load', discover)
      document.querySelectorAll('[data-lesson-section-icon]').forEach(icon => icon.remove())
      document.querySelectorAll('[data-lesson-target-id]').forEach(entry => delete entry.dataset.lessonTargetId)
      document.querySelectorAll('[data-lesson-number-marker]').forEach(marker => {
        marker.classList.remove(styles.hiddenNumber)
        delete marker.dataset.lessonNumberMarker
      })
      document.querySelectorAll('[data-lesson-desktop-progress-host]').forEach(host => host.remove())
    }
  }, [discover, enabled, lang, pathname])

  const markRead = useCallback(id => {
    if (!id) return
    setReadIds(current => {
      if (current.has(id)) return current
      const next = new Set(current)
      next.add(id)
      return next
    })
  }, [])

  useEffect(() => {
    if (!enabled || !sections.length) return undefined
    const update = () => {
      const pivot = window.innerHeight * .38
      let current = sections[0]?.id || ''
      let nearest = Number.POSITIVE_INFINITY
      sections.forEach(item => {
        const element = document.getElementById(item.id)
        if (!element) return
        const rect = element.getBoundingClientRect()
        const distance = Math.abs(rect.top - pivot)
        if (distance < nearest && rect.bottom > 80) {
          nearest = distance
          current = item.id
        }
      })
      setActiveId(current)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [enabled, sections])

  useEffect(() => {
    if (!enabled || !activeId || readIds.has(activeId)) return undefined
    const section = document.getElementById(activeId)
    const toggle = section?.querySelector(':scope > button[aria-expanded]')
    if (toggle && toggle.getAttribute('aria-expanded') !== 'true') return undefined
    const timer = window.setTimeout(() => markRead(activeId), 2500)
    return () => window.clearTimeout(timer)
  }, [activeId, enabled, markRead, readIds])

  useEffect(() => {
    if (!enabled) return undefined
    const handleClick = event => {
      const menuEntry = event.target.closest?.('[data-lesson-target-id]')
      if (event.isTrusted && menuEntry) {
        markRead(menuEntry.dataset.lessonTargetId)
        return
      }
      const toggle = event.target.closest?.('main section[id] > button[aria-expanded]')
      if (!toggle) return
      if (event.isTrusted && toggle.getAttribute('aria-expanded') === 'false') markRead(toggle.parentElement?.id)
      window.setTimeout(discover, 120)
      window.setTimeout(discover, 420)
    }
    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [discover, enabled, markRead])

  useEffect(() => {
    if (!panelOpen) return undefined
    const close = event => { if (event.key === 'Escape') setPanelOpen(false) }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [panelOpen])

  const validReadCount = useMemo(() => sections.filter(section => readIds.has(section.id)).length, [readIds, sections])
  const progress = sections.length ? Math.round(validReadCount / sections.length * 100) : 0
  const active = useMemo(() => sections.find(section => section.id === activeId), [activeId, sections])

  if (!enabled || sections.length < 2) return null

  const scrollTo = id => {
    const element = document.getElementById(id)
    const toggle = element?.querySelector(':scope > button[aria-expanded]')
    if (toggle?.getAttribute('aria-expanded') === 'false') toggle.click()
    markRead(id)
    window.setTimeout(() => element?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 30)
    setPanelOpen(false)
  }

  const navProgress = <div className={styles.navProgress} data-lesson-progress-ui aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>
  const desktopProgress = <div className={styles.desktopProgress} data-lesson-progress-ui role="progressbar" aria-label={copy.progress} aria-valuemin="0" aria-valuemax="100" aria-valuenow={progress}>
    <div className={styles.desktopProgressMeta}>
      <span>{copy.progress}</span>
      <strong>{progress}%</strong>
    </div>
    <div className={styles.desktopSegments} style={{ '--segment-count': sections.length }} aria-hidden="true">
      {sections.map(section => <span key={section.id} className={`${readIds.has(section.id) ? styles.desktopSegmentDone : ''} ${section.id === activeId ? styles.desktopSegmentActive : ''}`} />)}
    </div>
    <small className={styles.desktopProgressCaption}>{validReadCount} / {sections.length} {copy.read}</small>
  </div>

  return <div className={styles.root} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
    {navbarTarget ? createPortal(navProgress, navbarTarget) : null}
    {!mobile && sidebarTarget ? createPortal(desktopProgress, sidebarTarget) : null}
    {recallSets.map(recall => createPortal(<RecallExercise key={recall.id} cards={recall.cards} copy={copy} sectionTitle={recall.title} />, recall.target))}
    {mobile && panelOpen && <div className={styles.panel} role="dialog" aria-label={copy.sections} data-lesson-progress-ui>
      <header><div><small>{copy.progress}</small><strong>{validReadCount} / {sections.length} · {progress}%</strong></div><button type="button" onClick={() => setPanelOpen(false)} aria-label={copy.close}>×</button></header>
      <nav>{sections.map(section => <button type="button" key={section.id} className={section.id === activeId ? styles.current : ''} onClick={() => scrollTo(section.id)}><IconMarkup html={section.iconHtml} /><strong>{section.title}</strong><i aria-hidden="true">{readIds.has(section.id) ? '✓' : ''}</i></button>)}</nav>
    </div>}
    {mobile && <div className={styles.toolbar} aria-label={copy.progress} data-lesson-progress-ui>
      <button type="button" className={styles.progressButton} onClick={() => setPanelOpen(value => !value)} aria-expanded={panelOpen} aria-label={`${copy.progress}: ${progress}%. ${copy.sections}`}>
        <span style={{ '--progress': `${progress * 3.6}deg` }}><b>{progress}</b><small>%</small></span>
        <IconMarkup html={active?.iconHtml} /><strong>{active?.title}</strong>
      </button>
    </div>}
    <span className={styles.srOnly} aria-live="polite">{copy.progress}: {progress}%</span>
  </div>
}
