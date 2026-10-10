'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './LessonPdfExport.module.css'

const LESSON_PREFIXES = [
  '/abdomen/', '/gehirn/', '/lunge/', '/mamma/bildgebung/',
  '/msk/', '/technik/', '/thorax/', '/wirbelsaeule/',
]

const COPY = {
  de: {
    button: 'Als PDF speichern', preparing: 'Druckansicht wird vorbereitet …',
    document: 'Lernskript', date: 'Erstellt am', note: 'Lehrmaterial · Nicht als medizinischer Befund verwenden',
  },
  en: {
    button: 'Save as PDF', preparing: 'Preparing print view …',
    document: 'Learning handout', date: 'Created on', note: 'Educational material · Not for use as a medical report',
  },
  fa: {
    button: 'دریافت PDF', preparing: 'در حال آماده‌سازی نسخهٔ چاپی…',
    document: 'جزوهٔ آموزشی', date: 'تاریخ تهیه', note: 'محتوای آموزشی · قابل استفاده به‌عنوان گزارش پزشکی نیست',
  },
}

function isLessonPath(pathname) {
  if (!pathname || pathname.includes('/rechner') || pathname.endsWith('/mcq')) return false
  return LESSON_PREFIXES.some(prefix => pathname.startsWith(prefix))
}

function PdfIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M7.5 3.5h6.8l3.7 3.8v13.2H7.5z" />
    <path d="M14 3.8v4h3.7M9.7 12.4h5.8M9.7 15.2h5.8M9.7 18h3.6" />
  </svg>
}

export default function LessonPdfExport() {
  const pathname = usePathname()
  const { lang } = useLanguage()
  const copy = COPY[lang] || COPY.de
  const [preparing, setPreparing] = useState(false)
  const [lessonReady, setLessonReady] = useState(false)
  const [metadata, setMetadata] = useState({ title: '', date: '', url: '' })
  const cleanupRef = useRef(() => {})
  const enabled = isLessonPath(pathname)

  useEffect(() => () => cleanupRef.current(), [])

  useEffect(() => {
    if (!enabled) {
      setLessonReady(false)
      return undefined
    }
    const detectLesson = () => setLessonReady(Boolean(document.querySelector('main h1') && document.querySelector('main section[id]')))
    detectLesson()
    const observer = new MutationObserver(detectLesson)
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [enabled, pathname])

  const exportPdf = useCallback(() => {
    if (preparing || typeof window === 'undefined') return

    const main = document.querySelector('main')
    const heading = main?.querySelector('h1')
    if (!main || !heading) return

    setPreparing(true)
    const title = heading.textContent?.replace(/\s+/g, ' ').trim() || document.title
    const locale = lang === 'fa' ? 'fa-IR' : lang === 'en' ? 'en-GB' : 'de-DE'
    const date = new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(new Date())
    const oldTitle = document.title
    const root = document.documentElement

    setMetadata({ title, date, url: window.location.href })
    root.dataset.lessonPrint = 'true'
    document.title = `RadYar – ${title}`

    let cleaned = false
    const cleanup = () => {
      if (cleaned) return
      cleaned = true
      delete root.dataset.lessonPrint
      document.title = oldTitle
      setPreparing(false)
      window.removeEventListener('afterprint', cleanup)
    }

    cleanupRef.current = cleanup
    window.addEventListener('afterprint', cleanup)
    window.setTimeout(() => {
      try {
        window.print()
      } catch {
        cleanup()
      }
    }, 450)
  }, [lang, preparing])

  if (!enabled || !lessonReady) return null

  return <>
    <button
      type="button"
      className={styles.exportButton}
      onClick={exportPdf}
      disabled={preparing}
      data-print-exclude
      aria-label={copy.button}
      title={copy.button}
      dir={lang === 'fa' ? 'rtl' : 'ltr'}
    >
      <PdfIcon />
      <span>{preparing ? copy.preparing : copy.button}</span>
    </button>

    <header className={styles.printHeader} aria-hidden="true" dir={lang === 'fa' ? 'rtl' : 'ltr'}>
      <div className={styles.printBrand} dir="ltr"><b>RAD</b><strong>YAR</strong></div>
      <div className={styles.printHeading}>
        <small>{copy.document}</small>
        <h1>{metadata.title}</h1>
        <p>{copy.date}: {metadata.date}</p>
      </div>
    </header>

    <footer className={styles.printFooter} aria-hidden="true" dir={lang === 'fa' ? 'rtl' : 'ltr'}>
      <span>{copy.note}</span>
      <span dir="ltr">{metadata.url}</span>
    </footer>

    <span className={styles.srOnly} aria-live="polite">{preparing ? copy.preparing : ''}</span>
  </>
}
