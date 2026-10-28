'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { BOOK_COPY, useLessonView } from './BookViewContext'
import { pageForRect, spreadStart } from './pagination.mjs'
import styles from './BookView.module.css'

const INTERACTIVE = 'a,button,input,select,textarea,summary,[role="tab"],[role="slider"],[contenteditable="true"],[data-book-keep],dialog,[role="dialog"]'
const ATOMIC = '[data-book-atomic],[data-learning-tool],figure,table,iframe,video,canvas,form,fieldset,details,aside:not([data-book-checkpoint]),[role="tablist"]'

export default function BookView({ children, title, sections = [], lang = 'de' }) {
  const { mode, changeMode, reader, anchor, lessonId } = useLessonView()
  const book = mode === 'book'
  const rtl = lang === 'fa'
  const copy = BOOK_COPY[lang] || BOOK_COPY.de
  const root = useRef(null)
  const viewport = useRef(null)
  const flow = useRef(null)
  const geometry = useRef({ stride: 1, spread: 1, total: 1, page: 0 })
  const pointer = useRef(null)
  const animation = useRef(null)
  const lastAnchor = useRef(null)
  const [layout, setLayout] = useState({ page: 0, spread: 1, total: 1, ready: false })
  const [turn, setTurn] = useState('')
  const [chapter, setChapter] = useState('')

  const elementPage = useCallback(element => {
    const origin = flow.current.getBoundingClientRect()
    const rect = element.getClientRects()[0]
    return rect ? pageForRect(rect, origin, geometry.current.stride, rtl) : 0
  }, [rtl])
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
    const { page, spread } = geometry.current
    const nodes = content.querySelectorAll('h2,h3,p,li,[data-book-keep]')
    for (const element of nodes) {
      if (!element.getClientRects().length || element.closest('[hidden]')) continue
      const index = elementPage(element)
      if (index >= page && index < page + spread) return element
    }
    return content.firstElementChild
  }, [book, elementPage])
  const goToPage = useCallback((target, animate = true) => {
    const info = geometry.current
    const next = spreadStart(target, info.spread, info.total)
    if (animate && next !== info.page) {
      setTurn(next > info.page ? 'forward' : 'backward')
      clearTimeout(animation.current)
      animation.current = setTimeout(() => setTurn(''), 560)
    }
    info.page = next
    if (flow.current) flow.current.style.transform = `translateX(${(rtl ? 1 : -1) * next * info.stride}px)`
    if (viewport.current) viewport.current.scrollLeft = 0
    setLayout(previous => ({ ...previous, page: next }))
    lastAnchor.current = getAnchor()
    const current = lastAnchor.current?.closest('[data-book-section]')?.id
    if (current) setChapter(current)
  }, [getAnchor, rtl])
  const goToId = useCallback(id => {
    const element = document.getElementById(id)
    if (!book || !element || !flow.current?.contains(element)) return false
    // display:contents section boxes have no rect; their heading does.
    const target = element.getClientRects().length ? element : element.querySelector('h2,h3,header,p')
    if (target) {
      goToPage(elementPage(target))
      lastAnchor.current = target
      setChapter(target.closest('[data-book-section]')?.id || '')
    }
    root.current?.scrollIntoView({ block: 'start', behavior: 'instant' })
    return true
  }, [book, elementPage, goToPage])

  useEffect(() => {
    reader.current = { getAnchor: () => book ? lastAnchor.current || getAnchor() : getAnchor(), goToId }
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
    let disposed = false
    let scheduled
    let initial = true
    let frameSize = ''
    const marked = new Map()
    const tag = (element, name, value = '') => {
      if (!marked.has(element)) marked.set(element, new Map())
      if (!marked.get(element).has(name)) marked.get(element).set(name, element.getAttribute(name))
      element.setAttribute(name, value)
    }
    const measure = () => {
      if (disposed) return
      const savedAnchor = initial ? anchor.current : lastAnchor.current
      const width = frame.clientWidth
      const nextFrameSize = `${width}:${frame.clientHeight}`
      const resized = frameSize !== nextFrameSize
      frameSize = nextFrameSize
      const spread = width >= 860 && window.innerWidth > window.innerHeight ? 2 : 1
      const gap = 64
      const column = (width - gap * (spread - 1)) / spread
      content.style.setProperty('--book-columns', String(spread))
      content.style.setProperty('--book-column', `${column}px`)
      const stride = column + gap
      geometry.current = { ...geometry.current, stride, spread }
      // Keep live React components intact. Oversize units scroll inside the page;
      // no cloning, innerHTML, canvas snapshots, text rewriting or DOM reparenting.
      const candidates = [...content.querySelectorAll(ATOMIC)].map(element => {
        if (element.matches('table') && element.parentElement.tagName === 'DIV') return element.parentElement
        if (element.matches('[role="tablist"]') && !element.closest('[data-learning-tool],[data-book-atomic]')) return element.parentElement
        return element
      })
      const unique = [...new Set(candidates)]
      for (const element of unique) {
        if (unique.some(parent => parent !== element && parent.contains(element))) continue
        tag(element, 'data-book-keep')
      }
      for (const element of content.querySelectorAll('div,section,dl')) {
        if (element.closest('[data-book-keep]') || element.matches('[data-book-section],[data-book-body]')) continue
        if (['grid', 'inline-grid', 'flex'].includes(getComputedStyle(element).display)) tag(element, 'data-book-flow')
      }
      for (const element of content.querySelectorAll('[data-book-keep]')) {
        // Keyboard users can reach overflow without making every block a tab stop.
        if (element.scrollHeight > element.clientHeight + 2 || element.scrollWidth > element.clientWidth + 2) {
          tag(element, 'data-book-overflow', copy.scroll)
          if (!element.hasAttribute('tabindex')) tag(element, 'tabindex', '0')
          if (!element.hasAttribute('aria-label')) tag(element, 'aria-label', copy.scroll)
        } else {
          for (const name of ['data-book-overflow', 'tabindex', 'aria-label']) {
            const original = marked.get(element)?.get(name)
            if (original === null) element.removeAttribute(name)
            else if (original !== undefined) element.setAttribute(name, original)
          }
        }
      }
      // Count used fragments, not the container width: a short lesson may use
      // only one page of a two-page spread. Ignore scrolled content inside units.
      const origin = content.getBoundingClientRect()
      let total = 1
      for (const element of content.querySelectorAll('*')) {
        if (element.closest('[hidden]') || element.parentElement.closest('[data-book-keep]')) continue
        for (const rect of element.getClientRects()) {
          if (rect.width > 0 && rect.height > 0) total = Math.max(total, pageForRect(rect, origin, stride, rtl) + 1)
        }
      }
      geometry.current.total = total
      const desired = savedAnchor?.isConnected && content.contains(savedAnchor) ? elementPage(savedAnchor) : geometry.current.page
      setLayout({ page: 0, spread, total, ready: true })
      goToPage(desired, false)
      if (savedAnchor?.isConnected && content.contains(savedAnchor)) lastAnchor.current = savedAnchor
      if (resized) root.current.scrollIntoView({ block: 'start', behavior: 'instant' })
      if (initial) {
        const hash = decodeURIComponent(window.location.hash.slice(1))
        if (hash) goToId(hash)
        root.current.scrollIntoView({ block: 'start', behavior: 'instant' })
        frame.focus({ preventScroll: true })
        initial = false
      }
    }
    const schedule = () => {
      cancelAnimationFrame(scheduled)
      scheduled = requestAnimationFrame(measure)
    }
    const observer = new ResizeObserver(schedule)
    observer.observe(frame)
    const mutations = new MutationObserver(records => {
      if (records.some(record => record.type !== 'attributes' || record.target !== content)) schedule()
    })
    // React state changes (tabs, MCQ feedback, disclosures) may change page count.
    mutations.observe(content, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['hidden', 'open', 'aria-expanded', 'aria-selected', 'class', 'style', 'width', 'height'] })
    content.addEventListener('load', schedule, true)
    content.addEventListener('toggle', schedule, true)
    document.fonts?.ready.then(() => { if (!disposed) schedule() })
    document.fonts?.addEventListener('loadingdone', schedule)
    window.addEventListener('resize', schedule)
    window.visualViewport?.addEventListener('resize', schedule)
    schedule()
    return () => {
      disposed = true
      cancelAnimationFrame(scheduled)
      clearTimeout(animation.current)
      observer.disconnect()
      mutations.disconnect()
      content.removeEventListener('load', schedule, true)
      content.removeEventListener('toggle', schedule, true)
      document.fonts?.removeEventListener('loadingdone', schedule)
      window.removeEventListener('resize', schedule)
      window.visualViewport?.removeEventListener('resize', schedule)
      content.style.removeProperty('transform')
      for (const [element, attributes] of marked) for (const [name, value] of attributes) {
        if (value === null) element.removeAttribute(name)
        else element.setAttribute(name, value)
      }
    }
  }, [book, lang, copy.scroll, anchor, elementPage, goToId, goToPage])

  const handleKey = event => {
    if (!book || event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey
      || event.target.closest('input,select,textarea,[contenteditable="true"]')
      || (flow.current?.contains(event.target) && event.target.closest(INTERACTIVE)) || document.querySelector('dialog[open],[role="dialog"][aria-modal="true"]')) return
    let page
    if (event.key === 'ArrowRight') page = layout.page + (rtl ? -1 : 1) * layout.spread
    else if (event.key === 'ArrowLeft') page = layout.page + (rtl ? 1 : -1) * layout.spread
    else if (event.key === 'PageDown') page = layout.page + layout.spread
    else if (event.key === 'PageUp') page = layout.page - layout.spread
    else if (event.key === 'Home') page = 0
    else if (event.key === 'End') page = layout.total - 1
    else return
    event.preventDefault()
    goToPage(page)
  }
  const pointerDown = event => {
    pointer.current = null
    // Pencil, mouse, controls, image viewers and pinch/zoom retain native input.
    if (event.pointerType !== 'touch' || !event.isPrimary || event.target.closest(INTERACTIVE)) return
    pointer.current = { id: event.pointerId, x: event.clientX, y: event.clientY, time: performance.now() }
  }
  const pointerUp = event => {
    const start = pointer.current
    pointer.current = null
    if (!start || start.id !== event.pointerId || performance.now() - start.time > 850) return
    const dx = event.clientX - start.x
    const dy = event.clientY - start.y
    if (Math.abs(dx) < 65 || Math.abs(dx) < Math.abs(dy) * 1.7 || window.getSelection()?.toString()) return
    goToPage(layout.page + (dx < 0 !== rtl ? 1 : -1) * layout.spread)
  }
  const end = Math.min(layout.total, layout.page + layout.spread)
  const range = end === layout.page + 1 ? String(layout.page + 1) : `${layout.page + 1}–${end}`

  return <div ref={root} className={book ? styles.reader : styles.classic} data-book-mode={book ? 'book' : 'classic'} data-book-lesson={lessonId} dir={rtl ? 'rtl' : 'ltr'} onKeyDown={handleKey}>
    {book ? <div className={styles.toolbar}>
      <div className={styles.runningTitle}><span>RADYAR <i>/</i> {copy.book}</span><strong>{title}</strong></div>
      <div className={styles.toolbarActions}><button className={styles.returnClassic} type="button" onClick={() => changeMode('classic')}>{copy.classic}</button><label className={styles.contents}><span>{copy.contents}</span><select value={chapter} onChange={event => { setChapter(event.target.value); goToId(event.target.value) }}><option value="" disabled>{copy.contents}</option>{sections.map(section => <option key={section.id} value={section.id}>{section.title}</option>)}</select></label></div>
    </div> : null}
    <div className={book ? styles.binding : styles.classic} data-spread={layout.spread} data-turn={turn}>
      <div className={book ? styles.viewport : styles.classic} ref={viewport} tabIndex={book ? 0 : undefined} role={book ? 'region' : undefined} aria-label={book ? `${title} · ${copy.book}` : undefined} aria-busy={book && !layout.ready ? true : undefined}
        onPointerDown={book ? pointerDown : undefined} onPointerUp={book ? pointerUp : undefined} onPointerCancel={() => { pointer.current = null }}
        onFocusCapture={event => {
          if (!book || event.target === event.currentTarget) return
          const target = event.target.closest('[data-book-keep]') || event.target
          const page = elementPage(target)
          if (page < layout.page || page >= layout.page + layout.spread) goToPage(page, false)
          lastAnchor.current = target
          const section = target.closest('[data-book-section]')?.id
          if (section) setChapter(section)
        }}>
        <div ref={flow} className={book ? styles.flow : styles.classic} data-book-content>{children}</div>
      </div>
      {book ? <div className={styles.folios} aria-hidden="true"><span>{layout.page + 1}</span><span>{layout.spread === 2 ? end : 'RADYAR'}</span></div> : null}
    </div>
    {book ? <footer className={styles.navigation}>
      <button type="button" onClick={() => goToPage(layout.page - layout.spread)} disabled={layout.page === 0} aria-label={copy.previous}><span aria-hidden="true">{rtl ? '→' : '←'}</span></button>
      <div className={styles.position}><span role="status" aria-live="polite" aria-atomic="true">{layout.ready ? `${copy.page} ${range} ${copy.of} ${layout.total}` : copy.preparing}</span><input type="range" min="0" max={Math.max(0, Math.ceil(layout.total / layout.spread) - 1)} value={Math.floor(layout.page / layout.spread)} aria-label={copy.progress} aria-valuetext={`${copy.page} ${range} ${copy.of} ${layout.total}`} onChange={event => goToPage(Number(event.target.value) * layout.spread, false)} /><small>{copy.hint}</small></div>
      <button type="button" onClick={() => goToPage(layout.page + layout.spread)} disabled={end >= layout.total} aria-label={copy.next}><span aria-hidden="true">{rtl ? '←' : '→'}</span></button>
    </footer> : null}
  </div>
}
