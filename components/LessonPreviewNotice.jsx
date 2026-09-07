'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './LessonPreviewNotice.module.css'

const COPY = {
  de: {
    bannerTitle: 'Lektion in Bearbeitung',
    bannerText: 'Diese Lektion ist eine erste Vorschau und noch nicht vollständig.',
    modalEyebrow: 'Vorschau',
    modalTitle: 'Diese Lektion ist noch in Bearbeitung',
    modalText: 'Du siehst eine erste Vorschau. Inhalte, Abbildungen sowie MCQs und Flashcards können noch ergänzt oder überarbeitet werden.',
    continue: 'Vorschau öffnen',
  },
  en: {
    bannerTitle: 'Lesson in progress',
    bannerText: 'This lesson is an early preview and is not yet complete.',
    modalEyebrow: 'Preview',
    modalTitle: 'This lesson is still in progress',
    modalText: 'You are viewing an early preview. Content, images, MCQs and flashcards may still be added or revised.',
    continue: 'Open preview',
  },
  fa: {
    bannerTitle: 'درس در حال تکمیل است',
    bannerText: 'این درس یک پیش‌نمایش اولیه است و هنوز کامل نشده است.',
    modalEyebrow: 'پیش‌نمایش',
    modalTitle: 'این درس هنوز در حال تکمیل است',
    modalText: 'نسخه‌ای که می‌بینید پیش‌نمایش اولیه است. ممکن است محتوا، تصاویر، سؤال‌های MCQ و فلش‌کارت‌ها تکمیل یا بازبینی شوند.',
    continue: 'مشاهده پیش‌نمایش',
  },
}

// Add a pathname here only after the lesson has been explicitly approved as complete.
export const COMPLETED_LESSON_PATHS = new Set([])

const LESSON_ROOTS = [
  '/abdomen',
  '/becken-f',
  '/becken-m',
  '/gefaesse-ir',
  '/gehirn',
  '/hals',
  '/lunge',
  '/mamma',
  '/msk',
  '/notfall',
  '/onkologie',
  '/paediatrie',
  '/technik',
  '/thorax',
  '/wirbelsaeule',
]

const EXCLUDED_PATH_PREFIXES = [
  '/mamma/rechner',
  '/msk/knie/meniskus/mcq',
]

const EXCLUDED_EXACT_PATHS = new Set([
  '/technik/kontrastmittel',
])

function normalizePath(pathname) {
  if (!pathname) return '/'
  return pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
}

export function isPreviewLessonPath(pathname) {
  const path = normalizePath(pathname)
  if (COMPLETED_LESSON_PATHS.has(path) || EXCLUDED_EXACT_PATHS.has(path)) return false
  if (EXCLUDED_PATH_PREFIXES.some(prefix => path === prefix || path.startsWith(`${prefix}/`))) return false
  return LESSON_ROOTS.some(root => path.startsWith(`${root}/`))
}

export default function LessonPreviewNotice() {
  const pathname = usePathname()
  const { lang } = useLanguage()
  const [modalOpen, setModalOpen] = useState(true)
  const continueButtonRef = useRef(null)
  const isPreview = isPreviewLessonPath(pathname)
  const copy = COPY[lang] || COPY.de

  useEffect(() => {
    setModalOpen(isPreview)
  }, [isPreview, pathname])

  useEffect(() => {
    if (!isPreview || !modalOpen) return undefined

    const previousOverflow = document.body.style.overflow
    const closeOnEscape = event => {
      if (event.key === 'Escape') setModalOpen(false)
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', closeOnEscape)
    continueButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [isPreview, modalOpen])

  if (!isPreview) return null

  return (
    <>
      <div className={styles.bannerSlot}>
        <aside className={styles.banner} role="status" dir={lang === 'fa' ? 'rtl' : 'ltr'} data-lesson-preview-banner>
          <span className={styles.bannerIcon} aria-hidden="true">🚧</span>
          <div>
            <strong>{copy.bannerTitle}</strong>
            <span>{copy.bannerText}</span>
          </div>
        </aside>
      </div>

      {modalOpen ? (
        <div className={styles.backdrop} role="presentation" onMouseDown={() => setModalOpen(false)}>
          <section
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lesson-preview-title"
            dir={lang === 'fa' ? 'rtl' : 'ltr'}
            onMouseDown={event => event.stopPropagation()}
            data-lesson-preview-modal
          >
            <div className={styles.modalIcon} aria-hidden="true">🚧</div>
            <span className={styles.eyebrow}>{copy.modalEyebrow}</span>
            <h2 id="lesson-preview-title">{copy.modalTitle}</h2>
            <p>{copy.modalText}</p>
            <button ref={continueButtonRef} type="button" onClick={() => setModalOpen(false)}>
              {copy.continue}
              <span aria-hidden="true">→</span>
            </button>
          </section>
        </div>
      ) : null}
    </>
  )
}
