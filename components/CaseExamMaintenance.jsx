'use client'

import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './CaseExamMaintenance.module.css'

const COPY = {
  de: {
    eyebrow: 'Fallprüfung',
    title: 'In Bearbeitung',
    text: 'Die Fallprüfungen werden derzeit vollständig überarbeitet und stehen bald wieder zur Verfügung.',
    back: 'Zur Startseite',
  },
  en: {
    eyebrow: 'Case exam',
    title: 'In progress',
    text: 'The case exams are currently being fully revised and will be available again soon.',
    back: 'Back to home',
  },
  fa: {
    eyebrow: 'آزمون کیس',
    title: 'در حال آماده‌سازی',
    text: 'آزمون‌های کیس در حال بازطراحی کامل هستند و به‌زودی دوباره در دسترس خواهند بود.',
    back: 'بازگشت به صفحه اصلی',
  },
}

export default function CaseExamMaintenance() {
  const { lang } = useLanguage()
  const copy = COPY[lang] || COPY.de

  return (
    <main className={styles.page} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
      <section className={styles.card}>
        <span className={styles.icon} aria-hidden="true">⌁</span>
        <span className={styles.eyebrow}>{copy.eyebrow}</span>
        <h1>{copy.title}</h1>
        <p>{copy.text}</p>
        <Link href="/" className={styles.back}>{copy.back}</Link>
      </section>
    </main>
  )
}
