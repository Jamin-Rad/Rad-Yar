'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import styles from './BookView.module.css'
import { exitPageFullscreen, pageFullscreenElement, requestPageFullscreen } from '@/utils/lehrFullscreen'

const Context = createContext(null)
export const BOOK_COPY = {
  de: { classic: 'Klassische Ansicht', book: 'Präsentation', view: 'Leseansicht', close: 'Zur Lektion', fullscreen: 'Vollbild', windowed: 'Fenstermodus', contents: 'Inhalt', previous: 'Zurück', next: 'Weiter', page: 'Folie', of: 'von', progress: 'Leseposition', hint: 'Mit Pfeiltasten, Leertaste oder Wischen wechseln', checkpoint: 'Wissenscheck', check: 'Antwort prüfen', correct: 'Richtig', incorrect: 'Noch nicht richtig', answer: 'Richtige Antwort', scroll: 'Großes Element · zum vollständigen Lesen innerhalb des Elements scrollen', preparing: 'Seiten werden gesetzt …' },
  en: { classic: 'Classic View', book: 'Presentation', view: 'Reading view', close: 'Back to lesson', fullscreen: 'Fullscreen', windowed: 'Windowed', contents: 'Contents', previous: 'Previous', next: 'Next', page: 'Slide', of: 'of', progress: 'Reading position', hint: 'Use arrow keys, Space or a swipe', checkpoint: 'Knowledge check', check: 'Check answer', correct: 'Correct', incorrect: 'Not quite', answer: 'Correct answer', scroll: 'Large element · scroll within it to read everything', preparing: 'Setting the pages …' },
  fa: { classic: 'نمای کلاسیک', book: 'نمای ارائه', view: 'نمای مطالعه', close: 'بازگشت به درس', fullscreen: 'تمام‌صفحه', windowed: 'حالت پنجره‌ای', contents: 'فهرست', previous: 'قبلی', next: 'بعدی', page: 'اسلاید', of: 'از', progress: 'موقعیت مطالعه', hint: 'با کلیدهای جهت، فاصله یا کشیدن انگشت جابه‌جا شوید', checkpoint: 'سنجش دانش', check: 'بررسی پاسخ', correct: 'درست', incorrect: 'هنوز درست نیست', answer: 'پاسخ درست', scroll: 'عنصر بزرگ · برای خواندن کامل درون آن پیمایش کنید', preparing: 'در حال صفحه‌بندی …' },
}

export function LessonViewProvider({ lessonId, enabled = true, children }) {
  const [mode, setMode] = useState('classic')
  const reader = useRef(null)
  const ownedFullscreen = useRef(false)
  const modeRef = useRef(mode)
  const [fullscreen, setFullscreen] = useState(false)
  const [fullscreenSupported, setFullscreenSupported] = useState(false)
  const enterFullscreen = useCallback(async () => {
    if (pageFullscreenElement()) return true
    try {
      const entered = await requestPageFullscreen()
      ownedFullscreen.current = entered
      if (entered && modeRef.current !== 'book') {
        ownedFullscreen.current = false
        await exitPageFullscreen()
      }
      return entered
    } catch { return false }
  }, [])
  const toggleFullscreen = useCallback(() => {
    if (pageFullscreenElement()) {
      ownedFullscreen.current = false
      exitPageFullscreen().catch(() => {})
    } else enterFullscreen()
  }, [enterFullscreen])
  const anchor = useRef(null)
  const key = `radyar:lesson-view:v1:${lessonId}`
  useEffect(() => {
    const read = () => {
      const query = new URLSearchParams(window.location.search).get('view')
      let saved
      try { saved = localStorage.getItem(key) } catch {}
      const next = enabled && (query === 'book' || query === 'presentation' || (!query && saved === 'book')) ? 'book' : 'classic'
      modeRef.current = next
      setMode(next)
    }
    read()
    window.addEventListener('popstate', read)
    return () => window.removeEventListener('popstate', read)
  }, [key, enabled])
  const changeMode = useCallback(next => {
    if (!enabled) return
    modeRef.current = next
    // Invoke during the click, while the browser still has user activation.
    if (next === 'book') enterFullscreen()
    else if (ownedFullscreen.current) {
      ownedFullscreen.current = false
      exitPageFullscreen().catch(() => {})
    }
    const candidate = reader.current?.getAnchor() || anchor.current
    anchor.current = candidate?.closest('[data-book-checkpoint]') ? candidate.closest('[data-book-section]') : candidate
    setMode(next)
    try { localStorage.setItem(key, next) } catch {}
    const url = new URL(window.location.href)
    const section = anchor.current?.closest('[data-book-section]')
    if (section?.id) url.hash = section.id
    if (next === 'book') url.searchParams.set('view', 'presentation')
    else url.searchParams.delete('view')
    window.history.replaceState(null, '', url)
  }, [key, enabled, enterFullscreen])
  useEffect(() => {
    setFullscreenSupported(Boolean(document.documentElement.requestFullscreen || document.documentElement.webkitRequestFullscreen))
    const sync = () => {
      const active = Boolean(pageFullscreenElement())
      setFullscreen(active)
      if (!active && ownedFullscreen.current) {
        ownedFullscreen.current = false
        if (modeRef.current === 'book') changeMode('classic')
      }
    }
    sync()
    document.addEventListener('fullscreenchange', sync)
    document.addEventListener('webkitfullscreenchange', sync)
    return () => {
      document.removeEventListener('fullscreenchange', sync)
      document.removeEventListener('webkitfullscreenchange', sync)
      if (ownedFullscreen.current) exitPageFullscreen().catch(() => {})
    }
  }, [changeMode])
  const navigate = useCallback(id => reader.current?.goToId(id), [])
  const value = useMemo(() => ({ mode, changeMode, reader, anchor, navigate, lessonId, enabled, fullscreen, fullscreenSupported, toggleFullscreen }), [mode, changeMode, navigate, lessonId, enabled, fullscreen, fullscreenSupported, toggleFullscreen])
  return <Context.Provider value={value}>{children}</Context.Provider>
}
export const useLessonView = () => useContext(Context)
export function LessonViewToggle({ lang = 'de', variant = 'segmented' }) {
  const { mode, changeMode } = useLessonView()
  const copy = BOOK_COPY[lang] || BOOK_COPY.de
  if (variant === 'action') return <button type="button" className={styles.actionToggle} aria-pressed={mode === 'book'} onClick={() => changeMode(mode === 'book' ? 'classic' : 'book')}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="3" y="3" width="18" height="14" rx="2"/><path d="M12 17v4m-4 0h8M7 8h10M7 12h6"/></svg>
    {copy.book}
  </button>
  return <div className={styles.switch} role="group" aria-label={copy.view}>
    <button type="button" aria-pressed={mode === 'classic'} onClick={() => changeMode('classic')}><span aria-hidden="true">☷</span>{copy.classic}</button>
    <button type="button" aria-pressed={mode === 'book'} onClick={() => changeMode('book')}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="3" y="3" width="18" height="14" rx="2"/><path d="M12 17v4m-4 0h8M7 8h10M7 12h6"/></svg>{copy.book}</button>
  </div>
}
