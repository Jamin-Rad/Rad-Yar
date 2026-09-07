'use client'

import { usePathname } from 'next/navigation'
import { isPreviewLessonPath } from './LessonPreviewNotice'
import styles from './InProgressBanner.module.css'

const COPY = {
  de: {
    title: 'Kapitel in Bearbeitung',
    text: 'Dieses Kapitel wird noch vervollständigt und laufend verbessert.',
  },
  en: {
    title: 'Work in Progress',
    text: 'This chapter is not yet complete and will be updated continuously.',
  },
  fa: {
    title: 'در حال تکمیل',
    text: 'این فصل هنوز در حال تکمیل است و به‌تدریج بهبود می‌یابد.',
  },
}

export default function InProgressBanner({ lang = 'de' }) {
  const pathname = usePathname()
  if (isPreviewLessonPath(pathname)) return null

  const c = COPY[lang] || COPY.de
  return (
    <div className={styles.banner}>
      <span className={styles.icon}>🚧</span>
      <div className={styles.text}>
        <strong>{c.title}</strong>
        <span>{c.text}</span>
      </div>
    </div>
  )
}
