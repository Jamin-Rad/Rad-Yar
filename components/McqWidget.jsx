'use client'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './McqWidget.module.css'

const CONTENT = {
  de: {
    label: 'Prüfungsvorbereitung',
    title: 'MCQ · Kontrastmittel',
    desc: '9 klinisch relevante Fragen mit ausführlichen Erklärungen und Bewertung',
    cta: 'Quiz starten →',
    count: '9 Fragen',
    badge: 'Interaktiv',
  },
  en: {
    label: 'Exam Preparation',
    title: 'MCQ · Contrast Media',
    desc: '9 clinically relevant questions with detailed explanations and scoring',
    cta: 'Start Quiz →',
    count: '9 Questions',
    badge: 'Interactive',
  },
  fa: {
    label: 'آمادگی آزمون',
    title: 'MCQ · ماده حاجب',
    desc: '۹ سوال مرتبط با کلینیک با توضیحات کامل و نمره‌دهی',
    cta: 'شروع کوئیز ←',
    count: '۹ سوال',
    badge: 'تعاملی',
  },
}

export default function McqWidget() {
  const { lang } = useLanguage()
  const c = CONTENT[lang] || CONTENT.de

  return (
    <Link href="/technik/kontrastmittel/mcq" className={styles.widget}>
      <div className={styles.top}>
        <span className={styles.label}>{c.label}</span>
        <span className={styles.badge}>{c.badge}</span>
      </div>
      <div className={styles.title}>{c.title}</div>
      <div className={styles.desc}>{c.desc}</div>
      <div className={styles.bottom}>
        <span className={styles.count}>
          <span className={styles.countIcon}>🎯</span>
          {c.count}
        </span>
        <span className={styles.cta}>{c.cta}</span>
      </div>
    </Link>
  )
}
