'use client'

import Link from 'next/link'
import { ClerkLoaded, useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import {
  isLessonPdfPath,
  LESSON_PDF_EXPORT_EVENT,
  LESSON_PDF_STATE_EVENT,
  LESSON_PDF_STATE_REQUEST_EVENT,
} from '@/lib/lessonPdf'
import styles from './Navbar.module.css'

const ICONS = {
  control: (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <rect x="2.5" y="3" width="6" height="5.5" rx="1.4" />
      <rect x="11.5" y="3" width="6" height="5.5" rx="1.4" />
      <rect x="2.5" y="11.5" width="6" height="5.5" rx="1.4" />
      <path d="M12.2 14.25h4.6M14.5 11.95v4.6" />
    </svg>
  ),
  quiz: (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M6.25 3.25h7.5A2.25 2.25 0 0 1 16 5.5v9A2.25 2.25 0 0 1 13.75 16.75h-7.5A2.25 2.25 0 0 1 4 14.5v-9a2.25 2.25 0 0 1 2.25-2.25Z" />
      <path d="m7 7.2 1.25 1.25L10.7 6M7 12h6" />
    </svg>
  ),
  pdf: (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M5 2.75h6.8l3.2 3.3v11.2H5z" />
      <path d="M11.5 3v3.5h3.25M7.4 13.8v-4h1.4a1.2 1.2 0 0 1 0 2.4H7.4m4.05 1.6v-4h1.1c1.2 0 2 .75 2 2s-.8 2-2 2h-1.1Z" />
    </svg>
  ),
  teach: (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="m4 15.75.6-3.2L13.75 3.4a1.7 1.7 0 0 1 2.4 0l.45.45a1.7 1.7 0 0 1 0 2.4L7.45 15.4 4 15.75Z" />
      <path d="m12.45 4.7 2.85 2.85M4.6 12.55l2.85 2.85" />
    </svg>
  ),
  andarun: (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="m3 9 7-5.75L17 9v7.25a.75.75 0 0 1-.75.75H3.75a.75.75 0 0 1-.75-.75V9Z" />
      <path d="M7.5 17v-5.25h5V17" />
    </svg>
  ),
}

function LoadedAdminLinks() {
  const { user, isSignedIn } = useUser()
  const pathname = usePathname()
  const isAdmin = isSignedIn && user?.primaryEmailAddress?.emailAddress === 'dr.benjaminzia@gmail.com'
  const [lehrActive, setLehrActive] = useState(false)
  const [pdfState, setPdfState] = useState({ available: false, preparing: false })
  const pdfPath = isLessonPdfPath(pathname)

  useEffect(() => {
    setLehrActive(document.documentElement.classList.contains('lehr-mode-active'))
    const handleState = event => setLehrActive(!!event.detail?.active)
    window.addEventListener('radyar:lehr-mode-state', handleState)
    return () => window.removeEventListener('radyar:lehr-mode-state', handleState)
  }, [])

  useEffect(() => {
    const handleState = event => setPdfState({
      available: !!event.detail?.available,
      preparing: !!event.detail?.preparing,
    })
    window.addEventListener(LESSON_PDF_STATE_EVENT, handleState)
    window.dispatchEvent(new Event(LESSON_PDF_STATE_REQUEST_EVENT))
    return () => window.removeEventListener(LESSON_PDF_STATE_EVENT, handleState)
  }, [pathname])

  if (!isAdmin) return null

  return (
    <nav className={styles.adminPortals} aria-label="Admin-Navigation" dir="ltr">
      <Link
        href="/admin"
        className={styles.portalAdmin}
        aria-current={pathname?.startsWith('/admin') ? 'page' : undefined}
        title="Radyar-Kontrolle"
      >
        <span className={styles.portalIcon}>{ICONS.control}</span>
        <span className={styles.portalLabel}>Radyar-Kontrolle</span>
      </Link>
      <Link
        href="/admin/exams"
        className={styles.portalAdmin}
        aria-current={pathname?.startsWith('/admin/exams') ? 'page' : undefined}
        title="Prüfungen verwalten"
      >
        <span className={styles.portalIcon}>{ICONS.quiz}</span>
        <span className={styles.portalLabel}>Quiz</span>
      </Link>
      {pdfPath ? (
        <button
          type="button"
          className={styles.portalAdmin}
          onClick={() => window.dispatchEvent(new Event(LESSON_PDF_EXPORT_EVENT))}
          disabled={!pdfState.available || pdfState.preparing}
          aria-busy={pdfState.preparing}
          title={pdfState.preparing ? 'PDF wird vorbereitet …' : 'Lernskript als PDF'}
        >
          <span className={styles.portalIcon}>{ICONS.pdf}</span>
          <span className={styles.portalLabel}>{pdfState.preparing ? 'PDF …' : 'PDF'}</span>
        </button>
      ) : null}
      {!pathname?.startsWith('/andarun') ? (
        <button
          type="button"
          className={styles.portalAdmin}
          onClick={() => window.dispatchEvent(new Event('radyar:lehr-mode-toggle'))}
          aria-pressed={lehrActive}
          title={lehrActive ? 'Lehr-Mode beenden' : 'Lehr-Mode starten'}
        >
          <span className={styles.portalIcon}>{ICONS.teach}</span>
          <span className={styles.portalLabel}>{lehrActive ? 'Lehr-Mode aktiv' : 'Lehr-Mode'}</span>
        </button>
      ) : null}
      <Link
        href="/andarun"
        className={styles.portalAndarun}
        aria-current={pathname?.startsWith('/andarun') ? 'page' : undefined}
        title="Andarun"
      >
        <span className={styles.portalIcon}>{ICONS.andarun}</span>
        <span className={styles.portalLabel}>Andarun</span>
      </Link>
    </nav>
  )
}

export default function AdminHeaderLinks() {
  return <ClerkLoaded><LoadedAdminLinks /></ClerkLoaded>
}
