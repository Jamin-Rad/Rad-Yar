'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { BOOK_COPY, useLessonView } from './BookViewContext'
import { spreadStart } from './pagination.mjs'
import { collectSemanticSlides } from './semanticSlides.mjs'
import { swipeAxis, swipeStep } from './touchNavigation.mjs'
import styles from './BookView.module.css'

const INTERACTIVE = 'a,button,input,select,textarea,summary,table,figure,iframe,video,canvas,form,fieldset,details,[role="tab"],[role="slider"],[contenteditable="true"],[data-book-atomic],[data-learning-tool],[data-case-gallery],dialog,[role="dialog"]:not([data-book-mode])'
// Protect actual controls/viewers, rather than disabling entire learning cards.
const TOUCH_CONTROL = 'a,button,input,label,select,textarea,summary,[role="button"],[role="tab"],[role="slider"],[role="application"],[contenteditable="true"],table,figure,img,iframe,video,canvas,[data-no-zoom],[data-case-gallery],[data-lesson-print-case-viewport],[data-book-atomic]:not([data-book-question]),[data-book-gesture-ignore],dialog,[role="dialog"]:not([data-book-mode])'

export default function BookView({ children, title, sections = [], lang = 'de' }) {
  const { mode, changeMode, reader, anchor, lessonId, fullscreen, fullscreenSupported, toggleFullscreen } = useLessonView()
  const book = mode === 'book'
  const rtl = lang === 'fa'
  const copy = BOOK_COPY[lang] || BOOK_COPY.de
  const sectionLabels = useRef(sections)
  sectionLabels.current = sections
  const root = useRef(null)
  const viewport = useRef(null)
  const flow = useRef(null)
  const geometry = useRef({ spread: 1, total: 1, page: 0, slides: [] })
  const pointer = useRef(null)
  const penContact = useRef(null)
  const suppressClickUntil = useRef(0)
  const animation = useRef(null)
  const previousFocus = useRef(null)
  const lastAnchor = useRef(null)
  const [layout, setLayout] = useState({ page: 0, spread: 1, total: 1, ready: false })
  const [turn, setTurn] = useState('')
  const [chapter, setChapter] = useState('')
  const [topic, setTopic] = useState('')

  useEffect(() => {
    if (!book) return
    const host = root.current.closest('main')
    const savedHost = host ? { zIndex: host.style.zIndex, position: host.style.position } : null
    const savedOverflow = document.body.style.overflow
    const savedHtmlOverflow = document.documentElement.style.overflow
    previousFocus.current = document.activeElement
    if (host) {
      host.style.zIndex = '1000'
      if (getComputedStyle(host).position === 'static') host.style.position = 'relative'
    }
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = savedOverflow
      document.documentElement.style.overflow = savedHtmlOverflow
      if (host) {
        host.style.zIndex = savedHost.zIndex
        host.style.position = savedHost.position
      }
      if (previousFocus.current?.isConnected) previousFocus.current.focus({ preventScroll: true })
    }
  }, [book])

  const elementPage = useCallback(element => {
    const slides = geometry.current.slides
    const index = slides.findIndex(slide => slide.some(node => node.element === element || node.element.contains(element) || element.contains(node.element)))
    return index < 0 ? geometry.current.page : index
  }, [])
  const getAnchor = useCallback(() => {
    const content = flow.current
    if (!content) return null
    if (!book) {
      const visible = [...content.querySelectorAll('[data-book-body]:not([hidden]) p')].find(element => {
        const rect = element.getBoundingClientRect()
        return rect.bottom > 80 && rect.top < window.innerHeight
      })
      return visible || content.querySelector('[data-book-body]:not([hidden]) p')
    }
    return geometry.current.slides[geometry.current.page]?.[0]?.element || content.firstElementChild
  }, [book])
  const goToPage = useCallback((target, animate = true, resetScroll = true) => {
    const info = geometry.current
    const next = spreadStart(target, 1, info.total)
    if (animate && next !== info.page) {
      setTurn(next > info.page ? 'forward' : 'backward')
      clearTimeout(animation.current)
      animation.current = setTimeout(() => setTurn(''), 240)
    }
    info.page = next
    info.slides.forEach((slide, index) => slide.forEach(({ element }) => {
      element.toggleAttribute('data-book-visible', index === next)
    }))
    if (viewport.current && resetScroll) viewport.current.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    setLayout(previous => ({ ...previous, page: next }))
    const slide = info.slides[next] || []
    lastAnchor.current = getAnchor()
    const current = lastAnchor.current?.closest('[data-book-section]')?.id
    setChapter(current || '')
    const question = slide.find(node => node.kind === 'question')
    const headings = slide.filter(node => node.kind === 'heading')
    const context = headings.at(-1)?.element || slide.find(node => node.kind === 'tool')?.element.querySelector('h3,h4') || lastAnchor.current?.closest('[data-lesson-print-teaching-group]')?.querySelector('h3')
    const contextText = context?.querySelector('h3,h4,strong')?.textContent || context?.textContent
    setTopic(question ? copy.checkpoint : contextText?.trim() || sectionLabels.current.find(section => section.id === current)?.title || title)
  }, [getAnchor, copy.checkpoint, title])
  const goToId = useCallback(id => {
    const element = document.getElementById(id)
    if (!book || !element || !flow.current?.contains(element)) return false
    goToPage(elementPage(element))
    return true
  }, [book, elementPage, goToPage])

  useEffect(() => {
    reader.current = { getAnchor: () => book ? lastAnchor.current || getAnchor() : getAnchor(), goToId, focus: () => viewport.current?.focus({ preventScroll: true }) }
    return () => { reader.current = null }
  }, [book, getAnchor, goToId, reader])

  useEffect(() => {
    if (!book) {
      // Restore the same chapter through the integration's normal Classic controls.
      if (anchor.current?.isConnected) {
        const section = anchor.current.closest('[data-book-section]')
        if (section) section.dispatchEvent(new CustomEvent('book:restore', { bubbles: true }))
      }
      return
    }
    const content = flow.current
    const frame = viewport.current
    let scheduled
    let disposed = false
    let initial = true
    const marked = new Map()
    const tag = (element, name, value = '') => {
      if (!marked.has(element)) marked.set(element, new Map())
      if (!marked.get(element).has(name)) marked.get(element).set(name, element.getAttribute(name))
      element.setAttribute(name, value)
    }
    const restore = () => {
      for (const [element, attributes] of marked) for (const [name, value] of attributes) {
        if (value === null) element.removeAttribute(name)
        else element.setAttribute(name, value)
      }
    }
    const plan = () => {
      if (disposed) return
      const savedAnchor = initial ? anchor.current : lastAnchor.current
      restore()
      const { slides, shells } = collectSemanticSlides(content)
      shells.forEach(element => tag(element, 'data-book-shell'))
      slides.forEach(slide => slide.forEach(({ element }) => {
        tag(element, 'data-book-page')
        if ((element.matches('table') || element.querySelector(':scope > table')) && !element.hasAttribute('tabindex')) tag(element, 'tabindex', '0')
        if (!marked.get(element).has('data-book-visible')) marked.get(element).set('data-book-visible', element.getAttribute('data-book-visible'))
      }))
      geometry.current.slides = slides
      geometry.current.total = Math.max(1, slides.length)
      setLayout(previous => ({ ...previous, spread: 1, total: geometry.current.total, ready: true }))
      const desired = savedAnchor?.isConnected && content.contains(savedAnchor) ? elementPage(savedAnchor) : geometry.current.page
      goToPage(desired, false, initial || desired !== geometry.current.page)
      if (initial) {
        let hash = window.location.hash.slice(1)
        try { hash = decodeURIComponent(hash) } catch {}
        if (hash) goToId(hash)
        frame.focus({ preventScroll: true })
        initial = false
      }
    }
    const schedule = () => {
      cancelAnimationFrame(scheduled)
      scheduled = requestAnimationFrame(plan)
    }
    const mutations = new MutationObserver(schedule)
    // Re-plan only when React changes source structure; measurement and resizing
    // never split a topic. Interactive state changes remain inside the same slide.
    mutations.observe(content, { childList: true, subtree: true, attributes: true, attributeFilter: ['hidden'] })
    schedule()
    return () => {
      disposed = true
      cancelAnimationFrame(scheduled)
      clearTimeout(animation.current)
      mutations.disconnect()
      restore()
    }
  }, [book, anchor, elementPage, goToId, goToPage])

  const handleKey = event => {
    if (!book || event.defaultPrevented) return
    if (document.querySelector('dialog[open],[role="dialog"][aria-modal="true"]:not([data-book-mode])')) return
    if (event.key === 'Escape') {
      // Let the browser leave native fullscreen first. A later Escape in the
      // windowed presentation remains an explicit way back to Classic.
      if (fullscreen) return
      event.preventDefault()
      changeMode('classic')
      return
    }
    if (event.key === 'Tab') {
      const controls = [...root.current.querySelectorAll('button,a[href],input,select,textarea,[tabindex]')]
        .filter(element => !element.disabled && element.tabIndex >= 0 && !element.closest('[hidden]') && element.getClientRects().length)
      const first = controls[0]
      const last = controls[controls.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
      return
    }
    if (event.altKey || event.ctrlKey || event.metaKey || (event.shiftKey && event.key !== ' ')
      || (event.key === ' ' && event.target.closest('button,a'))
      || event.target.closest('input,select,textarea,[contenteditable="true"]')
      || (flow.current?.contains(event.target) && event.target.closest(INTERACTIVE))) return
    const frame = viewport.current
    const scrollDown = ['ArrowDown', 'PageDown'].includes(event.key) || (event.key === ' ' && !event.shiftKey)
    const scrollUp = ['ArrowUp', 'PageUp'].includes(event.key) || (event.key === ' ' && event.shiftKey)
    if (frame?.contains(event.target) && ((scrollDown && frame.scrollTop + frame.clientHeight < frame.scrollHeight - 2) || (scrollUp && frame.scrollTop > 2))) return
    let page
    if (event.key === 'ArrowRight') page = layout.page + (rtl ? -1 : 1) * layout.spread
    else if (event.key === 'ArrowLeft') page = layout.page + (rtl ? 1 : -1) * layout.spread
    else if (event.key === ' ') page = layout.page + (event.shiftKey ? -1 : 1)
    else if (event.key === 'ArrowDown') page = layout.page + 1
    else if (event.key === 'ArrowUp') page = layout.page - 1
    else if (event.key === 'PageDown') page = layout.page + layout.spread
    else if (event.key === 'PageUp') page = layout.page - layout.spread
    else if (event.key === 'Home') page = 0
    else if (event.key === 'End') page = layout.total - 1
    else return
    event.preventDefault()
    goToPage(page)
  }
  useEffect(() => {
    if (!book) return
    const frame = viewport.current
    const start = event => {
      pointer.current = null
      const touch = event.touches[0]
      if (event.defaultPrevented || event.touches.length !== 1 || penContact.current !== null || touch?.touchType === 'stylus'
        || event.target.closest(TOUCH_CONTROL) || window.getSelection()?.toString()) return
      pointer.current = { id: touch.identifier, x: touch.clientX, y: touch.clientY, time: performance.now(), axis: null }
    }
    const move = event => {
      const gesture = pointer.current
      if (!gesture) return
      if (event.defaultPrevented) { pointer.current = null; return }
      const touch = event.touches[0]
      if (event.touches.length !== 1 || touch.identifier !== gesture.id) { pointer.current = null; return }
      gesture.axis ||= swipeAxis(touch.clientX - gesture.x, touch.clientY - gesture.y)
      if (gesture.axis !== 'horizontal') return
      // A non-passive native listener is needed here: React's delegated touch
      // listener cannot reliably cancel browser horizontal panning in Safari.
      // All vertical, zoom, control and viewer gestures retain native behavior.
      if (event.cancelable) event.preventDefault()
      else pointer.current = null
    }
    const end = event => {
      const gesture = pointer.current
      pointer.current = null
      if (!gesture || gesture.axis !== 'horizontal' || event.touches.length || window.getSelection()?.toString()) return
      const touch = Array.from(event.changedTouches).find(item => item.identifier === gesture.id)
      if (!touch) return
      const step = swipeStep(touch.clientX - gesture.x, touch.clientY - gesture.y, performance.now() - gesture.time, rtl)
      if (!step) return
      suppressClickUntil.current = performance.now() + 350
      const target = geometry.current.page + step
      if (target >= 0 && target < geometry.current.total) goToPage(target)
    }
    const cancel = () => { pointer.current = null }
    frame.addEventListener('touchstart', start, { passive: true })
    frame.addEventListener('touchmove', move, { passive: false })
    frame.addEventListener('touchend', end, { passive: true })
    frame.addEventListener('touchcancel', cancel, { passive: true })
    return () => {
      frame.removeEventListener('touchstart', start)
      frame.removeEventListener('touchmove', move)
      frame.removeEventListener('touchend', end)
      frame.removeEventListener('touchcancel', cancel)
      pointer.current = null
      penContact.current = null
      suppressClickUntil.current = 0
    }
  }, [book, rtl, goToPage])
  const end = Math.min(layout.total, layout.page + layout.spread)
  const range = end === layout.page + 1 ? String(layout.page + 1) : `${layout.page + 1}–${end}`

  return <div ref={root} className={book ? styles.reader : styles.classic} data-book-mode={book ? 'book' : 'classic'} data-book-lesson={lessonId} role={book ? 'dialog' : undefined} aria-modal={book ? true : undefined} aria-label={book ? title : undefined} dir={rtl ? 'rtl' : 'ltr'} onKeyDown={handleKey}>
    {book ? <header className={styles.toolbar}>
      <div className={styles.runningTitle}><strong>{title}</strong><span>{topic || copy.book}</span></div>
      <div className={styles.toolbarActions}>
        <label className={styles.contents}><span>{copy.contents}</span><select aria-label={copy.contents} value={chapter} onChange={event => goToId(event.target.value)}><option value="" disabled>{copy.contents}</option>{sections.map(section => <option key={section.id} value={section.id}>{section.title}</option>)}</select></label>
        {fullscreenSupported ? <button type="button" className={styles.iconButton} onClick={toggleFullscreen} aria-label={fullscreen ? copy.windowed : copy.fullscreen} title={fullscreen ? copy.windowed : copy.fullscreen}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">{fullscreen ? <path d="M9 3v6H3m12-6v6h6M9 21v-6H3m12 6v-6h6"/> : <path d="M3 9V3h6m6 0h6v6M3 15v6h6m6 0h6v-6"/>}</svg></button> : null}
        <button className={styles.iconButton} type="button" onClick={() => changeMode('classic')} aria-label={copy.close} title={copy.close}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg></button>
      </div>
    </header> : null}
    <div className={book ? styles.binding : styles.classic} data-spread={layout.spread} data-turn={turn}>
      {book ? <button type="button" className={`${styles.edgeButton} ${styles.edgePrevious}`} data-book-edge="previous" disabled={layout.page === 0} onClick={() => goToPage(layout.page - 1)} aria-label={copy.previous} title={copy.previous}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d={rtl ? 'm9 6 6 6-6 6' : 'm15 6-6 6 6 6'}/></svg></button> : null}
      <div className={book ? styles.viewport : styles.classic} ref={viewport} tabIndex={book ? 0 : undefined} role={book ? 'region' : undefined} aria-label={book ? `${title} · ${copy.book}` : undefined} aria-busy={book && !layout.ready ? true : undefined}
        onPointerDownCapture={event => {
          if (event.pointerType === 'pen') { penContact.current = event.pointerId; pointer.current = null }
          else if (event.pointerType === 'touch' && !event.isPrimary) pointer.current = null
        }}
        onPointerUpCapture={event => { if (event.pointerId === penContact.current) penContact.current = null }}
        onPointerCancel={event => { if (event.pointerId === penContact.current) penContact.current = null }}
        onClickCapture={event => {
          if (book && event.detail > 0 && performance.now() < suppressClickUntil.current) { event.preventDefault(); event.stopPropagation() }
        }}
        onFocusCapture={event => {
          if (!book || event.target === event.currentTarget) return
          const target = event.target.closest('[data-book-page]') || event.target
          const page = elementPage(target)
          if (page < layout.page || page >= layout.page + layout.spread) goToPage(page, false)
          lastAnchor.current = target
          const section = target.closest('[data-book-section]')?.id
          if (section) setChapter(section)
        }}>
        <div ref={flow} className={book ? styles.flow : styles.classic} data-book-content>{children}</div>
      </div>
      {book ? <button type="button" className={`${styles.edgeButton} ${styles.edgeNext}`} data-book-edge="next" disabled={end >= layout.total} onClick={() => goToPage(layout.page + 1)} aria-label={copy.next} title={copy.next}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d={rtl ? 'm15 6-6 6 6 6' : 'm9 6 6 6-6 6'}/></svg></button> : null}
    </div>
    {book ? <footer className={styles.navigation} aria-label={copy.view}>
      <button type="button" className={styles.iconButton} onClick={() => goToPage(layout.page - 1)} disabled={layout.page === 0} aria-label={copy.previous} title={copy.previous}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d={rtl ? 'm9 6 6 6-6 6' : 'm15 6-6 6 6 6'}/></svg></button>
      <div className={styles.position}><span role="status" aria-live="polite" aria-atomic="true">{layout.ready ? `${copy.page} ${range} ${copy.of} ${layout.total}` : copy.preparing}</span><div className={styles.progress} role="progressbar" aria-label={copy.progress} aria-valuemin={1} aria-valuemax={layout.total} aria-valuenow={layout.page + 1}><span style={{ width: `${100 * (layout.page + 1) / layout.total}%` }} /></div></div>
      <button type="button" className={styles.iconButton} onClick={() => goToPage(layout.page + 1)} disabled={end >= layout.total} aria-label={copy.next} title={copy.next}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d={rtl ? 'm15 6-6 6 6 6' : 'm9 6 6 6-6 6'}/></svg></button>
    </footer> : null}
  </div>
}
