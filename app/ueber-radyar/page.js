'use client'

import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './page.module.css'

const CONTENT = {
  de: {
    breadcrumbCurrent: 'Über RadYar & Rechtliches',
    title: 'Über RadYar & Rechtliches',
    placeholder: 'Diese Seite wird in Kürze mit Informationen zur Plattform, Nutzungsbedingungen, Bildnachweisen und Datenschutz befüllt.',
  },
  en: {
    breadcrumbCurrent: 'About RadYar & Legal',
    title: 'About RadYar & Legal',
    placeholder: 'This page will soon contain information about the platform, terms of use, image credits and privacy.',
  },
  fa: {
    breadcrumbCurrent: 'درباره رادیار و موارد قانونی',
    title: 'درباره رادیار و موارد قانونی',
    placeholder: 'این صفحه به‌زودی با اطلاعاتی درباره پلتفرم، شرایط استفاده، منابع تصاویر و حفظ حریم خصوصی تکمیل خواهد شد.',
  },
}

export default function UeberRadyarPage() {
  const { lang } = useLanguage()
  const copy = CONTENT[lang] || CONTENT.de
  const isRTL = lang === 'fa'

  return (
    <main className={styles.page} dir={isRTL ? 'rtl' : 'ltr'} lang={lang}>
      <header className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link href="/">RadYar</Link>
          <span>›</span>
          <span>{copy.breadcrumbCurrent}</span>
        </div>
        <div className={styles.heroText}>
          <h1>{copy.title}</h1>
          <p>{copy.placeholder}</p>
        </div>
      </header>
    </main>
  )
}
