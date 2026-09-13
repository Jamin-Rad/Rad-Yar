'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './LessonEnhancer.module.css'

const LESSON_PREFIXES = [
  '/abdomen/', '/gehirn/', '/lunge/', '/mamma/bildgebung/',
  '/msk/', '/technik/', '/thorax/', '/wirbelsaeule/',
]

const COPY = {
  de: { tools: 'Lernwerkzeuge', sections: 'Abschnitte', focus: 'Fokusmodus', expand: 'Alle öffnen', collapse: 'Alle schließen', progress: 'Lesefortschritt', close: 'Schließen' },
  en: { tools: 'Learning tools', sections: 'Sections', focus: 'Focus mode', expand: 'Expand all', collapse: 'Collapse all', progress: 'Reading progress', close: 'Close' },
  fa: { tools: 'ابزارهای یادگیری', sections: 'بخش‌ها', focus: 'حالت تمرکز', expand: 'باز کردن همه', collapse: 'بستن همه', progress: 'پیشرفت مطالعه', close: 'بستن' },
}

const ICON_RULES = [
  [/take.?home|summary|zusammen|merke|fazit|checklist|lernziel|key/, '💡'],
  [/anatom|grundlag|basis|definition|orient|intro|ueberblick|überblick/, '📚'],
  [/composition|dichte|density|gewebe|tissue/, '🧬'],
  [/verkalk|calcification|kalk/, '✦'],
  [/mass|läsion|laesion|lesion|tumou?r|knoten|nodule/, '◉'],
  [/asymmetr|distortion/, '◐'],
  [/mrt|mri|ct|sono|ultraschall|roentgen|röntgen|bildgebung|imaging|sequenz|protokoll/, '🩻'],
  [/patho|histolog|mikro|etiolog|ursache|mechanism/, '🔬'],
  [/klinik|symptom|befund|zeichen|diagnos|assessment/, '🩺'],
  [/differen|vergleich|mimic|fallstrick|pitfall/, '⚖️'],
  [/therap|management|behandlung|intervention|follow|verlauf/, '🛡️'],
  [/klass|grading|staging|score|kriter|algorithm|system/, '🧭'],
  [/komplik|cave|risiko|warning|notfall/, '⚠️'],
  [/fall|case|beispiel|quiz|trainer|praxis/, '🧩'],
  [/gef[aä]ss|vaskul|arter|ven|blut/, '🩸'],
  [/video|film/, '▶️'],
]

function iconFor(id = '', title = '') {
  const value = `${id} ${title}`.toLocaleLowerCase('de-DE')
  return ICON_RULES.find(([pattern]) => pattern.test(value))?.[1] || '◆'
}

function isLessonPath(pathname) {
  if (!pathname || pathname.includes('/rechner') || pathname.endsWith('/mcq')) return false
  return LESSON_PREFIXES.some(prefix => pathname.startsWith(prefix))
}

function findHeading(section) {
  return section.querySelector(':scope > button h2, :scope > header h2, :scope > div:first-child h2, :scope > h2')
}

export default function LessonEnhancer() {
  const pathname = usePathname()
  const { lang } = useLanguage()
  const copy = COPY[lang] || COPY.de
  const enabled = isLessonPath(pathname)
  const [sections, setSections] = useState([])
  const [activeId, setActiveId] = useState('')
  const [progress, setProgress] = useState(0)
  const [panelOpen, setPanelOpen] = useState(false)
  const [focus, setFocus] = useState(false)
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(max-width: 760px)')
    const update = () => setMobile(query.matches)
    update()
    query.addEventListener?.('change', update)
    return () => query.removeEventListener?.('change', update)
  }, [])

  const decorate = useCallback(() => {
    if (!enabled) return []
    const found = Array.from(document.querySelectorAll('main section[id]')).flatMap(section => {
      const heading = findHeading(section)
      if (!heading) return []
      const title = heading.textContent?.trim() || section.id
      const icon = iconFor(section.id, title)
      section.classList.add(styles.enhancedSection)

      const markers = section.querySelectorAll('small, span')
      let hasHeadingMarker = false
      markers.forEach(marker => {
        const value = marker.textContent?.trim() || ''
        const numeric = /^(?:0?[1-9]|1[0-9])(?:\s*[·.)]\s*.*)?$/.test(value)
        const structural = marker.nextElementSibling?.matches('h2, h3')
          || /takeHomeItem|cardNumber|eyebrow|dimensionRail|findingRail/.test(marker.parentElement?.className || marker.className || '')
        if (numeric && structural) {
          if (marker.nextElementSibling?.matches('h2')) hasHeadingMarker = true
          const itemTitle = marker.parentElement?.querySelector('h3, strong')?.textContent || title
          marker.classList.add(styles.iconMarker)
          marker.dataset.lessonIcon = iconFor(section.id, itemTitle)
          marker.setAttribute('aria-hidden', 'true')
        }
      })
      if (hasHeadingMarker) {
        heading.classList.remove(styles.enhancedHeading)
        delete heading.dataset.lessonIcon
      } else {
        heading.classList.add(styles.enhancedHeading)
        heading.dataset.lessonIcon = icon
      }
      return [{ id: section.id, title, icon }]
    })

    document.querySelectorAll('main aside button span:first-child').forEach((marker, index) => {
      if (!/^0?[1-9]$/.test(marker.textContent?.trim() || '')) return
      const title = marker.parentElement?.querySelector('strong')?.textContent || found[index]?.title || ''
      marker.classList.add(styles.iconMarker)
      marker.dataset.lessonIcon = found[index]?.icon || iconFor('', title)
      marker.setAttribute('aria-hidden', 'true')
    })
    return found
  }, [enabled, lang])

  useEffect(() => {
    if (!enabled) return undefined
    let frame = 0
    const sync = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        const found = decorate()
        const signature = found.map(item => `${item.id}:${item.title}`).join('|')
        setSections(current => current.map(item => `${item.id}:${item.title}`).join('|') === signature ? current : found)
        setActiveId(current => current || found[0]?.id || '')
      })
    }
    sync()
    const observer = new MutationObserver(sync)
    observer.observe(document.body, { childList: true, characterData: true, subtree: true })
    return () => { window.cancelAnimationFrame(frame); observer.disconnect() }
  }, [decorate, enabled, pathname])

  useEffect(() => {
    if (!enabled || !sections.length) return undefined
    const update = () => {
      const main = document.querySelector('main')
      if (!main) return
      const start = main.getBoundingClientRect().top + window.scrollY
      const length = Math.max(1, main.scrollHeight - window.innerHeight)
      setProgress(Math.max(0, Math.min(100, Math.round((window.scrollY - start + 120) / length * 100))))
      let current = sections[0].id
      for (const item of sections) {
        const element = document.getElementById(item.id)
        if (element && element.getBoundingClientRect().top <= window.innerHeight * .42) current = item.id
      }
      setActiveId(current)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update) }
  }, [enabled, sections])

  useEffect(() => {
    if (!enabled) return undefined
    document.documentElement.dataset.lessonFocus = focus ? 'true' : 'false'
    return () => { delete document.documentElement.dataset.lessonFocus }
  }, [enabled, focus])

  useEffect(() => {
    if (!enabled) return
    document.querySelectorAll(`main section.${styles.enhancedSection}`).forEach(section => {
      if (section.id === activeId) section.dataset.lessonCurrent = 'true'
      else delete section.dataset.lessonCurrent
    })
  }, [activeId, enabled, sections])

  useEffect(() => {
    if (!panelOpen) return undefined
    const close = event => { if (event.key === 'Escape') setPanelOpen(false) }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [panelOpen])

  const active = useMemo(() => sections.find(section => section.id === activeId), [activeId, sections])
  if (!enabled || sections.length < 2) return null

  const scrollTo = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setPanelOpen(false)
  }
  const setExpanded = open => {
    let attempts = 0
    const updateNext = () => {
      const buttons = Array.from(document.querySelectorAll(`main section.${styles.enhancedSection} > button[aria-expanded]`))
      const next = buttons.find(button => (button.getAttribute('aria-expanded') === 'true') !== open)
      if (!next || attempts >= sections.length + 2) return
      attempts += 1
      next.click()
      window.setTimeout(updateNext, 35)
    }
    updateNext()
  }

  return <div className={styles.root} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
    <div className={styles.progressTrack} aria-hidden="true"><span style={{ width: `${progress}%` }}/></div>
    {panelOpen && <div className={styles.panel} role="dialog" aria-label={copy.sections}>
      <header><div><small>{copy.tools}</small><strong>{copy.sections}</strong></div><button type="button" onClick={() => setPanelOpen(false)} aria-label={copy.close}>×</button></header>
      <nav>{sections.map(section => <button type="button" key={section.id} className={section.id === activeId ? styles.current : ''} onClick={() => scrollTo(section.id)}><span>{section.icon}</span><strong>{section.title}</strong></button>)}</nav>
      {!mobile && <footer><button type="button" onClick={() => setExpanded(true)}>＋ {copy.expand}</button><button type="button" onClick={() => setExpanded(false)}>− {copy.collapse}</button></footer>}
    </div>}
    <div className={styles.toolbar} aria-label={copy.tools}>
      <button type="button" className={styles.progressButton} onClick={() => setPanelOpen(value => !value)} aria-expanded={panelOpen} aria-label={`${copy.progress}: ${progress}%. ${copy.sections}`} title={copy.sections}>
        <span style={{ '--progress': `${progress * 3.6}deg` }}><b>{progress}</b><small>%</small></span>
        <i>{active?.icon}</i><strong>{active?.title}</strong>
      </button>
      <button type="button" className={focus ? styles.focusActive : ''} aria-label={copy.focus} aria-pressed={focus} onClick={() => setFocus(value => !value)} title={copy.focus}>◉</button>
    </div>
    <span className={styles.srOnly} aria-live="polite">{copy.progress}: {progress}%</span>
  </div>
}
