'use client'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './page.module.css'

const TOPICS = [
  {
    key: 'kontrastmittel',
    href: '/technik/kontrastmittel/mcq',
    icon: '💉',
    color: '#059669',
    bg: 'linear-gradient(135deg,#0a2030,#0a3040)',
    available: true,
  },
]

const CONTENT = {
  de: {
    breadSection: 'Lernen',
    title: 'MCQ · Thema wählen',
    subtitle: 'Wähle ein Thema und teste dein Wissen mit interaktiven Multiple-Choice-Fragen.',
    topicNames: {
      kontrastmittel: 'Kontrastmittel',
    },
    topicDesc: {
      kontrastmittel: '9 Fragen · Röntgen-KM, MRT-KM, Nebenwirkungen, Schwangerschaft',
    },
    startBtn: 'Quiz starten',
    comingSoon: 'In Vorbereitung',
    badge: 'Verfügbar',
  },
  en: {
    breadSection: 'Learning',
    title: 'MCQ · Choose a Topic',
    subtitle: 'Select a topic and test your knowledge with interactive multiple-choice questions.',
    topicNames: {
      kontrastmittel: 'Contrast Media',
    },
    topicDesc: {
      kontrastmittel: '9 questions · X-ray CM, MRI CM, Adverse effects, Pregnancy',
    },
    startBtn: 'Start Quiz',
    comingSoon: 'Coming Soon',
    badge: 'Available',
  },
  fa: {
    breadSection: 'یادگیری',
    title: 'MCQ · انتخاب موضوع',
    subtitle: 'یک موضوع را انتخاب کنید و دانش خود را با سوالات چندگزینه‌ای تعاملی بیازمایید.',
    topicNames: {
      kontrastmittel: 'ماده حاجب',
    },
    topicDesc: {
      kontrastmittel: '۹ سوال · ماده حاجب اشعه X، MRI، عوارض، بارداری',
    },
    startBtn: 'شروع کوئیز',
    comingSoon: 'در حال آماده‌سازی',
    badge: 'در دسترس',
  },
}

// Placeholder topics (coming soon)
const PLACEHOLDER_TOPICS = [
  { key: 'mrt-physik', icon: '🧲', color: '#7c3aed' },
  { key: 'ct-technik', icon: '☢️', color: '#0ea5e9' },
  { key: 'strahlenschutz', icon: '🛡️', color: '#d97706' },
  { key: 'neuroradiologie', icon: '🧠', color: '#7c3aed' },
  { key: 'thorax', icon: '🫁', color: '#0ea5e9' },
]

const PLACEHOLDER_NAMES = {
  de: { 'mrt-physik': 'MRT-Physik', 'ct-technik': 'CT-Technik', 'strahlenschutz': 'Strahlenschutz', neuroradiologie: 'Neuroradiologie', thorax: 'Thorax' },
  en: { 'mrt-physik': 'MRI Physics', 'ct-technik': 'CT Technology', 'strahlenschutz': 'Radiation Protection', neuroradiologie: 'Neuroradiology', thorax: 'Thorax' },
  fa: { 'mrt-physik': 'فیزیک MRI', 'ct-technik': 'تکنولوژی CT', 'strahlenschutz': 'حفاظت از تابش', neuroradiologie: 'نوروراديولوژی', thorax: 'توراکس' },
}

export default function McqSelectPage() {
  const { lang } = useLanguage()
  const c = CONTENT[lang] || CONTENT.de
  const placeholderNames = PLACEHOLDER_NAMES[lang] || PLACEHOLDER_NAMES.de

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <div className={styles.breadcrumb}>
          <Link href="/" className={styles.breadLink}>RadYar</Link>
          <span className={styles.sep}>›</span>
          <span className={styles.breadCurrent}>{c.breadSection}</span>
          <span className={styles.sep}>›</span>
          <span className={styles.breadCurrent}>MCQ</span>
        </div>
        <h1 className={styles.pageTitle}>{c.title}</h1>
        <p className={styles.pageSub}>{c.subtitle}</p>
      </div>

      <div className={styles.body}>
        {/* Available */}
        {TOPICS.map(t => (
          <Link key={t.key} href={t.href} className={`${styles.topicCard} ${styles.topicAvailable}`}>
            <div className={styles.topicIconWrap} style={{ background: t.bg }}>
              <span className={styles.topicIcon}>{t.icon}</span>
            </div>
            <div className={styles.topicInfo}>
              <div className={styles.topicName} style={{ color: t.color }}>{c.topicNames[t.key]}</div>
              <div className={styles.topicDesc}>{c.topicDesc[t.key]}</div>
            </div>
            <div className={styles.topicRight}>
              <span className={styles.availBadge}>{c.badge}</span>
              <span className={styles.startBtn} style={{ background: t.color }}>{c.startBtn} →</span>
            </div>
          </Link>
        ))}

        {/* Coming soon placeholders */}
        <div className={styles.divider}>
          <span className={styles.dividerLabel}>{c.comingSoon}</span>
        </div>

        <div className={styles.placeholderGrid}>
          {PLACEHOLDER_TOPICS.map(t => (
            <div key={t.key} className={styles.placeholderCard}>
              <span className={styles.placeholderIcon}>{t.icon}</span>
              <span className={styles.placeholderName} style={{ color: t.color }}>{placeholderNames[t.key]}</span>
              <span className={styles.lockIcon}>🔒</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
