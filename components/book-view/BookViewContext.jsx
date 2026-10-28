'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import styles from './BookView.module.css'

const Context = createContext(null)
export const BOOK_COPY = {
  de: { classic: 'Klassische Ansicht', book: 'Buchansicht', view: 'Leseansicht', contents: 'Inhalt', previous: 'Vorherige Seiten', next: 'Nächste Seiten', page: 'Seite', of: 'von', progress: 'Leseposition', hint: 'Mit Pfeiltasten oder Wischen blättern', checkpoint: 'Wissenscheck', check: 'Antwort prüfen', correct: 'Richtig', incorrect: 'Noch nicht richtig', answer: 'Richtige Antwort', scroll: 'Großes Element · zum vollständigen Lesen innerhalb des Elements scrollen', preparing: 'Seiten werden gesetzt …' },
  en: { classic: 'Classic View', book: 'Book View', view: 'Reading view', contents: 'Contents', previous: 'Previous pages', next: 'Next pages', page: 'Page', of: 'of', progress: 'Reading position', hint: 'Turn pages with arrow keys or a swipe', checkpoint: 'Knowledge check', check: 'Check answer', correct: 'Correct', incorrect: 'Not quite', answer: 'Correct answer', scroll: 'Large element · scroll within it to read everything', preparing: 'Setting the pages …' },
  fa: { classic: 'نمای کلاسیک', book: 'نمای کتاب', view: 'نمای مطالعه', contents: 'فهرست', previous: 'صفحات قبلی', next: 'صفحات بعدی', page: 'صفحه', of: 'از', progress: 'موقعیت مطالعه', hint: 'با کلیدهای جهت یا کشیدن انگشت ورق بزنید', checkpoint: 'سنجش دانش', check: 'بررسی پاسخ', correct: 'درست', incorrect: 'هنوز درست نیست', answer: 'پاسخ درست', scroll: 'عنصر بزرگ · برای خواندن کامل درون آن پیمایش کنید', preparing: 'در حال صفحه‌بندی …' },
}

export function LessonViewProvider({ lessonId, enabled = true, children }) {
  const [mode, setMode] = useState('classic')
  const reader = useRef(null)
  const anchor = useRef(null)
  const key = `radyar:lesson-view:v1:${lessonId}`
  useEffect(() => {
    const read = () => {
      const query = new URLSearchParams(window.location.search).get('view')
      let saved
      try { saved = localStorage.getItem(key) } catch {}
      setMode(enabled && (query === 'book' || (!query && saved === 'book')) ? 'book' : 'classic')
    }
    read()
    window.addEventListener('popstate', read)
    return () => window.removeEventListener('popstate', read)
  }, [key, enabled])
  const changeMode = useCallback(next => {
    if (!enabled) return
    const candidate = reader.current?.getAnchor() || anchor.current
    anchor.current = candidate?.closest('[data-book-checkpoint]') ? candidate.closest('[data-book-section]') : candidate
    setMode(next)
    try { localStorage.setItem(key, next) } catch {}
    const url = new URL(window.location.href)
    const section = anchor.current?.closest('[data-book-section]')
    if (section?.id) url.hash = section.id
    if (next === 'book') url.searchParams.set('view', 'book')
    else url.searchParams.delete('view')
    window.history.replaceState(null, '', url)
  }, [key, enabled])
  const navigate = useCallback(id => reader.current?.goToId(id), [])
  const value = useMemo(() => ({ mode, changeMode, reader, anchor, navigate, lessonId, enabled }), [mode, changeMode, navigate, lessonId, enabled])
  return <Context.Provider value={value}>{children}</Context.Provider>
}
export const useLessonView = () => useContext(Context)
export function LessonViewToggle({ lang = 'de' }) {
  const { mode, changeMode } = useLessonView()
  const copy = BOOK_COPY[lang] || BOOK_COPY.de
  return <div className={styles.switch} role="group" aria-label={copy.view}>
    <button type="button" aria-pressed={mode === 'classic'} onClick={() => changeMode('classic')}><span aria-hidden="true">☷</span>{copy.classic}</button>
    <button type="button" aria-pressed={mode === 'book'} onClick={() => changeMode('book')}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M12 5v16M12 5C9 3 5 3 2 4v15c3-1 7-1 10 2 3-3 7-3 10-2V4c-3-1-7-1-10 1Z"/></svg>{copy.book}</button>
  </div>
}
