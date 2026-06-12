'use client'

import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { CONTRAST_LESSON, CONTRAST_TOPICS } from '@/data/contrastMedia'
import styles from './page.module.css'

const UI = {
  de: {
    breadcrumb: 'Technik',
    chapter: '9. Kontrastmittel',
    overview: 'Kapitelübersicht',
    key: 'Klinischer Leitgedanke',
    takeHome: 'Merksatz',
    mcq: 'MCQ üben',
    flashcards: 'Flashcards',
    mark: 'Kapitel als gelesen markieren',
    read: 'Kapitel gelesen',
    auth: 'Bitte melde dich an, um deinen Lernfortschritt zu speichern.',
    signIn: 'Anmelden',
    sources: 'Leitlinien & Quellen',
    sourceNote: 'Für klinische Entscheidungen gelten die aktuelle Fachinformation und lokale Standards.',
  },
  en: {
    breadcrumb: 'Technology',
    chapter: '9. Contrast Media',
    overview: 'Chapter overview',
    key: 'Clinical principle',
    takeHome: 'Take-home point',
    mcq: 'Practice MCQs',
    flashcards: 'Flashcards',
    mark: 'Mark chapter as read',
    read: 'Chapter completed',
    auth: 'Please sign in to save your learning progress.',
    signIn: 'Sign in',
    sources: 'Guidelines & sources',
    sourceNote: 'For clinical decisions, follow current product information and local standards.',
  },
  fa: {
    breadcrumb: 'تکنیک',
    chapter: '۹. مواد حاجب',
    overview: 'مرور فصل',
    key: 'اصل بالینی',
    takeHome: 'نکته کلیدی',
    mcq: 'تمرین MCQ',
    flashcards: 'فلش‌کارت',
    mark: 'علامت‌گذاری فصل به‌عنوان خوانده‌شده',
    read: 'فصل مطالعه شد',
    auth: 'برای ذخیره پیشرفت یادگیری لطفاً وارد شوید.',
    signIn: 'ورود',
    sources: 'راهنماها و منابع',
    sourceNote: 'برای تصمیم بالینی، اطلاعات فعلی دارو و استانداردهای محلی را رعایت کنید.',
  },
}

const SOURCES = [
  { label: 'ESUR Guidelines on Contrast Agents', href: 'https://www.esur.org/esur-guidelines-on-contrast-agents/' },
  { label: 'ACR Manual on Contrast Media', href: 'https://www.acr.org/Clinical-Resources/Clinical-Tools-and-Reference/Contrast-Manual' },
  { label: 'EMA: Gadolinium contrast agents', href: 'https://www.ema.europa.eu/en/medicines/human/referrals/gadolinium-containing-contrast-agents' },
]

const CONTRAST_TOPIC_IDS = CONTRAST_TOPICS.map(topic => topic.id).join(',')

export default function ContrastMediaPage() {
  const { lang } = useLanguage()
  const ui = UI[lang] || UI.de
  const copy = CONTRAST_LESSON[lang] || CONTRAST_LESSON.de
  const isRTL = lang === 'fa'
  const { isRead, toggleRead, authError } = useLessonReadStatus('kontrastmittel')
  const withLang = href => lang === 'de' ? href : (href.includes('?') ? `${href}&lang=${lang}` : `${href}?lang=${lang}`)

  return (
    <main className={styles.page} dir={isRTL ? 'rtl' : 'ltr'} lang={lang}>
      <header className={styles.header}>
        <nav className={styles.breadcrumb}>
          <Link href={withLang('/')}>RadYar</Link><span>›</span>
          <Link href={withLang('/lernen/technik')}>{ui.breadcrumb}</Link><span>›</span>
          <span>{ui.chapter}</span>
        </nav>
        <div className={styles.hero}>
          <div>
            <span className={styles.eyebrow}>{ui.chapter}</span>
            <h1>{copy.title}</h1>
            <p className={styles.subtitle}>{copy.subtitle}</p>
            <p className={styles.intro}>{copy.intro}</p>
            <div className={styles.heroActions}>
              <Link href={withLang(`/ueben/quiz?fach=technik&n=10&themen=${CONTRAST_TOPIC_IDS}&from=${encodeURIComponent('/technik/kontrastmittel')}`)}>
                🎯 {ui.mcq}
              </Link>
              <Link href={withLang(`/flashcards/kontrastmittel?from=${encodeURIComponent('/technik/kontrastmittel')}`)}>
                🧠 {ui.flashcards}
              </Link>
            </div>
          </div>
          <div className={styles.heroNumber}>
            <strong>9</strong>
            <span>{CONTRAST_TOPICS.length} Topics</span>
          </div>
        </div>
        <div className={styles.keyBox}>
          <span>{ui.key}</span>
          <p>{copy.key}</p>
        </div>
      </header>

      <div className={styles.readArea}>
        <button type="button" onClick={toggleRead} className={`${styles.readButton} ${isRead ? styles.readButtonActive : ''}`}>
          <span className={styles.readCheck}>{isRead ? '✓' : ''}</span>
          {isRead ? ui.read : ui.mark}
        </button>
        {authError && <p className={styles.authError}>{ui.auth} <Link href={withLang('/sign-in')}>{ui.signIn}</Link></p>}
      </div>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <h2>{ui.overview}</h2>
          {CONTRAST_TOPICS.map(topic => (
            <a key={topic.id} href={`#${topic.id}`}>
              <span>{topic.icon}</span>
              <span><small>{topic.group[lang] || topic.group.de}</small>{topic.title[lang] || topic.title.de}</span>
            </a>
          ))}
        </aside>

        <article className={styles.content}>
          {CONTRAST_TOPICS.map((topic, index) => {
            const section = copy.sections[topic.id]
            const title = topic.title[lang] || topic.title.de
            const group = topic.group[lang] || topic.group.de
            return (
              <section id={topic.id} className={styles.section} key={topic.id}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionIcon}>{topic.icon}</div>
                  <div>
                    <small>{String(index + 1).padStart(2, '0')} · {group}</small>
                    <h2>{title}</h2>
                    <p>{section.lead}</p>
                  </div>
                </div>
                <div className={styles.pointGrid}>
                  {section.points.map(([label, text]) => (
                    <div className={styles.point} key={label}>
                      <h3>{label}</h3>
                      <p>{text}</p>
                    </div>
                  ))}
                </div>
                <div className={styles.takeHome}>
                  <strong>{ui.takeHome}</strong>
                  <span>{section.takeHome}</span>
                </div>
              </section>
            )
          })}

          <section className={styles.sources}>
            <h2>{ui.sources}</h2>
            <p>{ui.sourceNote}</p>
            <div>
              {SOURCES.map(source => <a key={source.href} href={source.href} target="_blank" rel="noreferrer">{source.label} ↗</a>)}
            </div>
          </section>
        </article>
      </div>
    </main>
  )
}
