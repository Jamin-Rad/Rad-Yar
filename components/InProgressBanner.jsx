'use client'

import Link from 'next/link'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { PRIVACY_CHOICE_EVENT, readPrivacyChoice } from './LegalNotice'
import { useLanguage } from '@/providers/LanguageProvider'
import { isLessonInProgress } from '@/data/lessonStatus'
import styles from './InProgressBanner.module.css'

const NOTICE_VERSION = '2026-09-05'
const NOTICE_PREFIX = 'radyar_in_progress_notice:'
const LessonProgressContext = createContext(false)

const COPY = {
  de: {
    title: 'Kapitel in Bearbeitung',
    text: 'Dieses Kapitel wird noch vervollständigt und laufend verbessert.',
    dialogTitle: 'Diese Lektion wird noch bearbeitet',
    dialogText: 'Einzelne Inhalte können unvollständig, vorläufig oder noch nicht fachlich abschließend geprüft sein. Diese Lektion dient ausschließlich der Fortbildung und darf nicht als alleinige Grundlage klinischer Entscheidungen verwendet werden.',
    legal: 'Medizinischen Hinweis ansehen',
    confirm: 'Verstanden',
  },
  en: {
    title: 'Work in Progress',
    text: 'This chapter is not yet complete and will be updated continuously.',
    dialogTitle: 'This lesson is still being developed',
    dialogText: 'Some content may be incomplete, preliminary or not yet finally reviewed. This lesson is intended solely for professional education and must not be used as the sole basis for clinical decisions.',
    legal: 'View medical notice',
    confirm: 'Understood',
  },
  fa: {
    title: 'در حال تکمیل',
    text: 'این فصل هنوز در حال تکمیل است و به‌تدریج بهبود می‌یابد.',
    dialogTitle: 'این درس هنوز در حال تکمیل است',
    dialogText: 'ممکن است برخی مطالب ناقص، موقت یا هنوز از نظر تخصصی نهایی نشده باشند. این درس فقط برای آموزش حرفه‌ای است و نباید تنها مبنای تصمیم‌های بالینی قرار گیرد.',
    legal: 'مشاهده راهنمای پزشکی',
    confirm: 'متوجه شدم',
  },
}

function InProgressNotice({ lang: requestedLang, belowNavbar = false }) {
  const { lang: currentLang } = useLanguage()
  const lang = requestedLang || currentLang || 'de'
  const c = COPY[lang] || COPY.de
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const confirmRef = useRef(null)
  const storageKey = `${NOTICE_PREFIX}${NOTICE_VERSION}:${pathname}`

  useEffect(() => {
    const showIfNeeded = () => {
      if (!window.localStorage.getItem(storageKey) && readPrivacyChoice()) setOpen(true)
    }
    showIfNeeded()
    window.addEventListener(PRIVACY_CHOICE_EVENT, showIfNeeded)
    return () => window.removeEventListener(PRIVACY_CHOICE_EVENT, showIfNeeded)
  }, [storageKey])

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    confirmRef.current?.focus()
    return () => { document.body.style.overflow = previousOverflow }
  }, [open])

  const confirm = () => {
    window.localStorage.setItem(storageKey, '1')
    setOpen(false)
  }

  return (
    <>
      <div className={`${styles.banner} ${belowNavbar ? styles.belowNavbar : ''}`} role="status">
        <span className={styles.icon}>🚧</span>
        <div className={styles.text}>
          <strong>{c.title}</strong>
          <span>{c.text}</span>
        </div>
      </div>
      {open ? (
        <div className={styles.overlay} role="presentation">
          <section className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="in-progress-title" dir={lang === 'fa' ? 'rtl' : 'ltr'}>
            <span className={styles.dialogIcon} aria-hidden="true">🚧</span>
            <h2 id="in-progress-title">{c.dialogTitle}</h2>
            <p>{c.dialogText}</p>
            <Link href="/ueber-radyar#medical-notice" className={styles.legalLink}>{c.legal}</Link>
            <button ref={confirmRef} type="button" onClick={confirm}>{c.confirm}</button>
          </section>
        </div>
      ) : null}
    </>
  )
}

export default function InProgressBanner(props) {
  const managedByLayout = useContext(LessonProgressContext)
  return managedByLayout ? null : <InProgressNotice {...props} />
}

export function LessonInProgressGate({ children }) {
  const pathname = usePathname()
  const showNotice = isLessonInProgress(pathname)

  return (
    <LessonProgressContext.Provider value={true}>
      {showNotice ? <InProgressNotice belowNavbar /> : null}
      {children}
    </LessonProgressContext.Provider>
  )
}
