'use client'

import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { CONTRAST_GROUPS, CONTRAST_LESSON, CONTRAST_TOPICS, getContrastGroup } from '@/data/contrastMedia'
import styles from './page.module.css'

const UI = {
  de: {
    breadcrumb: 'Technik',
    chapter: '9. Kontrastmittel',
    overview: 'Inhaltsverzeichnis',
    mcq: 'MCQ',
    flashcards: 'Flashcards',
    mark: 'Als gelesen markieren',
    read: 'Als gelesen markiert',
    auth: 'Bitte melde dich an, um deinen Lernfortschritt zu speichern.',
    signIn: 'Anmelden',
    takeHome: 'Take-home Messages',
    otherPages: 'Weitere KM-Kapitel',
    sources: 'Leitlinien & Quellen',
    sourceNote: 'Für klinische Entscheidungen gelten die aktuelle Fachinformation und lokale Standards.',
  },
  en: {
    breadcrumb: 'Technology',
    chapter: '9. Contrast Media',
    overview: 'Contents',
    mcq: 'MCQs',
    flashcards: 'Flashcards',
    mark: 'Mark as read',
    read: 'Marked as read',
    auth: 'Please sign in to save your learning progress.',
    signIn: 'Sign in',
    takeHome: 'Take-home messages',
    otherPages: 'Other contrast chapters',
    sources: 'Guidelines & sources',
    sourceNote: 'For clinical decisions, follow current product information and local standards.',
  },
  fa: {
    breadcrumb: 'تکنیک',
    chapter: '۹. مواد حاجب',
    overview: 'فهرست مطالب',
    mcq: 'MCQ',
    flashcards: 'فلش‌کارت',
    mark: 'علامت‌گذاری به‌عنوان خوانده‌شده',
    read: 'به‌عنوان خوانده‌شده علامت‌گذاری شد',
    auth: 'برای ذخیره پیشرفت یادگیری لطفاً وارد شوید.',
    signIn: 'ورود',
    takeHome: 'پیام‌های کلیدی',
    otherPages: 'فصل‌های دیگر مواد حاجب',
    sources: 'راهنماها و منابع',
    sourceNote: 'برای تصمیم بالینی، اطلاعات فعلی دارو و استانداردهای محلی را رعایت کنید.',
  },
}

const SOURCES = [
  { label: 'ESUR Guidelines on Contrast Agents', href: 'https://www.esur.org/esur-guidelines-on-contrast-agents/' },
  { label: 'ACR Manual on Contrast Media', href: 'https://www.acr.org/Clinical-Resources/Clinical-Tools-and-Reference/Contrast-Manual' },
  { label: 'EMA: Gadolinium contrast agents', href: 'https://www.ema.europa.eu/en/medicines/human/referrals/gadolinium-containing-contrast-agents' },
]

export default function ContrastGroupPage({ groupId }) {
  const group = getContrastGroup(groupId)
  const { lang } = useLanguage()
  const ui = UI[lang] || UI.de
  const copy = CONTRAST_LESSON[lang] || CONTRAST_LESSON.de
  const topics = group.topicIds.map(id => CONTRAST_TOPICS.find(topic => topic.id === id)).filter(Boolean)
  const isRTL = lang === 'fa'
  const { isRead, toggleRead, authError } = useLessonReadStatus(group.readId)
  const pagePath = `/technik/kontrastmittel/${group.id}`
  const topicIds = group.topicIds.join(',')
  const withLang = href => lang === 'de' ? href : (href.includes('?') ? `${href}&lang=${lang}` : `${href}?lang=${lang}`)
  const localize = value => value[lang] || value.de

  return (
    <main className={styles.page} dir={isRTL ? 'rtl' : 'ltr'} lang={lang}>
      <header className={styles.header}>
        <nav className={styles.breadcrumb}>
          <Link href={withLang('/')}>RadYar</Link><span>›</span>
          <Link href={withLang('/lernen/technik')}>{ui.breadcrumb}</Link><span>›</span>
          <span>{ui.chapter}</span><span>›</span>
          <span>{localize(group.title)}</span>
        </nav>

        <div className={styles.hero}>
          <div>
            <span className={styles.eyebrow}>{ui.chapter}</span>
            <h1>{localize(group.title)}</h1>
            <p className={styles.subtitle}>{localize(group.subtitle)}</p>
            <div className={styles.heroActions}>
              <Link href={withLang(`/ueben/quiz?fach=technik&n=10&themen=${topicIds}&from=${encodeURIComponent(pagePath)}`)}>
                🎯 {ui.mcq}
              </Link>
              <Link href={withLang(`/flashcards/${group.flashcardId}?from=${encodeURIComponent(pagePath)}`)}>
                🧠 {ui.flashcards}
              </Link>
            </div>
          </div>
          <div className={styles.heroNumber}>
            <strong>{group.icon}</strong>
            <span>{topics.length} {topics.length === 1 ? 'Thema' : 'Themen'}</span>
          </div>
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
          {topics.map(topic => (
            <a key={topic.id} href={`#${topic.id}`}>
              <span>{topic.icon}</span>
              <span>{localize(topic.title)}</span>
            </a>
          ))}
          <div className={styles.otherPages}>
            <h3>{ui.otherPages}</h3>
            {CONTRAST_GROUPS.filter(item => item.id !== group.id).map(item => (
              <Link key={item.id} href={withLang(`/technik/kontrastmittel/${item.id}`)}>
                <span>{item.icon}</span>{localize(item.title)}
              </Link>
            ))}
          </div>
        </aside>

        <article className={styles.content}>
          {topics.map((topic, index) => {
            const section = copy.sections[topic.id]
            return (
              <section id={topic.id} className={styles.section} key={topic.id}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionIcon}>{topic.icon}</div>
                  <div>
                    <small>{String(index + 1).padStart(2, '0')}</small>
                    <h2>{localize(topic.title)}</h2>
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
              </section>
            )
          })}

          <section className={styles.takeHomePage}>
            <h2>{ui.takeHome}</h2>
            <div>
              {topics.map(topic => (
                <p key={topic.id}><span>{topic.icon}</span>{copy.sections[topic.id].takeHome}</p>
              ))}
            </div>
          </section>

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
