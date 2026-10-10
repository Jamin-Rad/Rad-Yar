'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/providers/LanguageProvider'
import { canonicalUserEmail } from '@/lib/emailIdentity'
import {
  isLessonPdfPath,
  LESSON_PDF_EXPORT_EVENT,
  LESSON_PDF_STATE_EVENT,
  LESSON_PDF_STATE_REQUEST_EVENT,
} from '@/lib/lessonPdf'
import styles from './LessonPdfExport.module.css'

const ADMIN_EMAIL = 'drbenjaminzia@gmail.com'

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

export default function LessonPdfExport() {
  const pathname = usePathname()
  const { isLoaded, user } = useUser()
  const { lang } = useLanguage()
  const copy = COPY[lang] || COPY.de
  const [preparing, setPreparing] = useState(false)
  const [lessonReady, setLessonReady] = useState(false)
  const [metadata, setMetadata] = useState({ title: '', date: '', url: '' })
  const cleanupRef = useRef(() => {})
  const isAdmin = isLoaded && canonicalUserEmail(user) === ADMIN_EMAIL
  const enabled = isAdmin && isLessonPdfPath(pathname)

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

  useEffect(() => {
    if (!enabled || !lessonReady || typeof window === 'undefined') return
    const heading = document.querySelector('main h1')
    const title = heading?.textContent?.replace(/\s+/g, ' ').trim() || document.title
    const locale = lang === 'fa' ? 'fa-IR' : lang === 'en' ? 'en-GB' : 'de-DE'
    const date = new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(new Date())
    setMetadata({ title, date, url: window.location.href })
  }, [enabled, lang, lessonReady, pathname])

  const exportPdf = useCallback(async () => {
    if (preparing || !enabled || !lessonReady || typeof window === 'undefined') return

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
    const images = Array.from(main.querySelectorAll('img'))
    await Promise.race([
      Promise.allSettled(images.map(image => {
        if (image.complete) return Promise.resolve()
        return new Promise(resolve => {
          image.addEventListener('load', resolve, { once: true })
          image.addEventListener('error', resolve, { once: true })
        })
      })),
      new Promise(resolve => window.setTimeout(resolve, 5000)),
    ])
    await document.fonts?.ready

    window.setTimeout(() => {
      try {
        window.print()
      } catch {
        cleanup()
      }
    }, 450)
  }, [enabled, lang, lessonReady, preparing])

  useEffect(() => {
    if (!enabled || !lessonReady) return undefined
    const handleExport = () => { void exportPdf() }
    window.addEventListener(LESSON_PDF_EXPORT_EVENT, handleExport)
    return () => window.removeEventListener(LESSON_PDF_EXPORT_EVENT, handleExport)
  }, [enabled, exportPdf, lessonReady])

  useEffect(() => {
    const sendState = () => window.dispatchEvent(new CustomEvent(LESSON_PDF_STATE_EVENT, {
      detail: { available: enabled && lessonReady, preparing },
    }))
    sendState()
    window.addEventListener(LESSON_PDF_STATE_REQUEST_EVENT, sendState)
    return () => window.removeEventListener(LESSON_PDF_STATE_REQUEST_EVENT, sendState)
  }, [enabled, lessonReady, preparing])

  if (!enabled || !lessonReady) return null

  return <>
    <div className={styles.printFrame} aria-hidden="true" />
    <div className={styles.printWatermark} aria-hidden="true" dir="ltr">RADYAR</div>
    <header className={styles.printHeader} data-lesson-print-header aria-hidden="true" dir={lang === 'fa' ? 'rtl' : 'ltr'}>
      <div className={styles.printBrand} dir="ltr"><b>RAD</b><strong>YAR</strong></div>
      <div className={styles.printHeading}>
        <small>{copy.document}</small>
        <h1>{metadata.title}</h1>
        <p>{copy.date}: {metadata.date}</p>
      </div>
    </header>

    <footer className={styles.printFooter} data-lesson-print-footer aria-hidden="true" dir={lang === 'fa' ? 'rtl' : 'ltr'}>
      <span>{copy.note}</span>
      <span dir="ltr">{metadata.url}</span>
    </footer>

    <span className={styles.srOnly} aria-live="polite">{preparing ? copy.preparing : ''}</span>
  </>
}
