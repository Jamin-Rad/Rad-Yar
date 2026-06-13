'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/providers/LanguageProvider'
import { CURRICULUM, getFachTitle, t } from '@/data/curriculum'
import styles from './LernPfade.module.css'

const COLORS = [
  { bg: '#fff5eb', border: '#fed7aa', num: '#f97316', icon: '#fff5eb', iconBorder: '#fdba74' },
  { bg: '#f0f9ff', border: '#bae6fd', num: '#0ea5e9', icon: '#f0f9ff', iconBorder: '#7dd3fc' },
  { bg: '#f0fdf4', border: '#bbf7d0', num: '#10b981', icon: '#f0fdf4', iconBorder: '#6ee7b7' },
  { bg: '#f8fafc', border: '#c7d2fe', num: '#2563eb', icon: '#eff6ff', iconBorder: '#93c5fd' },
]

const FALL_MODAL = {
  de: { title: 'Fallprüfung', msg: 'Wähle eine Körperregion. Interaktive Fälle werden nach und nach ergänzt.', close: 'Schließen', soon: 'in Arbeit' },
  en: { title: 'Case Exam', msg: 'Choose a body region. Interactive cases will be added step by step.', close: 'Close', soon: 'in progress' },
  fa: { title: 'آزمون بالینی', msg: 'یک ناحیه بدن انتخاب کن. موارد بالینی به‌تدریج اضافه می‌شوند.', close: 'بستن', soon: 'در حال ساخت' },
}

const FALL_REGIONS = [
  { id: 'gehirn', color: '#7c3aed', name: { de: 'Kopf', en: 'Head', fa: 'سر' } },
  { id: 'wirbelsaeule', color: '#0ea5e9', name: { de: 'Wirbelsäule', en: 'Spine', fa: 'ستون فقرات' } },
  { id: 'hals', color: '#10b981', name: { de: 'Hals', en: 'Neck', fa: 'گردن' } },
  { id: 'thorax', color: '#0ea5e9', name: { de: 'Thorax', en: 'Thorax', fa: 'توراکس' } },
  { id: 'mamma', color: '#ec4899', name: { de: 'Mamma', en: 'Breast', fa: 'پستان' } },
  { id: 'abdomen', color: '#f59e0b', name: { de: 'Abdomen', en: 'Abdomen', fa: 'شکم' } },
  { id: 'becken-f', color: '#e11d48', name: { de: 'Becken – Frau', en: 'Pelvis – Female', fa: 'لگن – زنان' } },
  { id: 'becken-m', color: '#2563eb', name: { de: 'Becken – Mann', en: 'Pelvis – Male', fa: 'لگن – مردان' } },
  { id: 'msk', color: '#f97316', name: { de: 'Muskuloskelettales', en: 'Musculoskeletal', fa: 'اسکلتی-عضلانی' } },
  { id: 'technik', color: '#64748b', name: { de: 'Technik & Physik', en: 'Physics & Tech', fa: 'تکنیک و فیزیک' } },
]

const LATEST_COPY = {
  de: {
    label: 'Neu auf RadYar',
    title: 'Zuletzt hinzugefügt',
    desc: 'Zeigt nur neu hinzugefügte Lernkapitel.',
    open: 'Öffnen →',
    learn: 'Lernen',
    mcq: 'MCQ',
    flashcards: 'Flashcards',
    cases: 'Fallprüfung',
    noCases: 'Noch keine Fallprüfung verknüpft.',
  },
  en: {
    label: 'New on RadYar',
    title: 'Recently added',
    desc: 'Shows only newly added learning chapters.',
    open: 'Open →',
    learn: 'Learn',
    mcq: 'MCQ',
    flashcards: 'Flashcards',
    cases: 'Case Exam',
    noCases: 'No case exam links yet.',
  },
  fa: {
    label: 'تازه در RadYar',
    title: 'آخرین موارد اضافه‌شده',
    desc: 'فقط فصل‌های آموزشی تازه اضافه‌شده را نشان می‌دهد.',
    open: 'باز کردن ←',
    learn: 'آموزش',
    mcq: 'MCQ',
    flashcards: 'فلش‌کارت',
    cases: 'آزمون بالینی',
    noCases: 'هنوز لینک آزمون بالینی وجود ندارد.',
  },
}

function localizeTitle(item, lang) {
  return t(item?.title, lang)
}

function LatestLessonIcon({ areaId, chapter }) {
  const common = {
    viewBox: '0 0 48 48',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className: styles.latestIconSvg,
    'aria-hidden': true,
  }

  if (areaId === 'abdomen' && chapter?.id === 'abdomen-leber') {
    return (
      <svg {...common}>
        <path d="M6 20c2-7 8-12 17-13 9-1 16 2 20 8 2 3 1 7-2 9-5 4-12 7-21 8-6 1-11-1-14-5-1-2-1-5 0-7Z" />
        <path d="M23 8c1 6 1 14-3 24M21 21c5-1 10 0 15 4M21 25c-4-2-8-3-13-2" />
      </svg>
    )
  }

  if (areaId === 'technik' && chapter?.id === 'technik-kontrastmittel') {
    return (
      <svg {...common}>
        <path d="m29 6 8 8-20 20-8 2 2-8L29 6Z" />
        <path d="m25 10 8 8M13 27l8 8" />
        <path d="M31 30c4 5 7 8 7 12a6 6 0 0 1-12 0c0-4 2-7 5-12Z" />
      </svg>
    )
  }

  if (areaId === 'thorax' && chapter?.id === 'thorax-lunge') {
    return (
      <svg {...common}>
        <path d="M24 8c-2 3-9 5-11 12-2 8 0 20 7 20 4 0 5-4 5-9V8Z" />
        <path d="M24 8c2 3 9 5 11 12 2 8 0 20-7 20-4 0-5-4-5-9V8Z" />
        <circle cx="18" cy="24" r="1.4" fill="currentColor" stroke="none" />
        <circle cx="29" cy="20" r="1.4" fill="currentColor" stroke="none" />
        <circle cx="30" cy="30" r="1.4" fill="currentColor" stroke="none" />
        <circle cx="17" cy="33" r="1.4" fill="currentColor" stroke="none" />
      </svg>
    )
  }

  if (areaId === 'msk' && chapter?.id === 'msk-knie') {
    return (
      <svg {...common}>
        <path d="M14 5v14c0 6 4 10 10 10h4" />
        <path d="M28 29h4c6 0 10 4 10 10v4" />
        <path d="M19 5v13c0 4 2 6 6 6h3" />
        <path d="M29 34h3c3 0 5 2 5 5v4" />
        <circle cx="22" cy="29" r="4" />
      </svg>
    )
  }

  return <span aria-hidden="true">{chapter?.icon || '✦'}</span>
}

function collectReadyTopics() {
  const rows = []
  const visit = (topic, area, chapter) => {
    if (topic?.ready && topic?.link) rows.push({ topic, area, chapter })
    topic?.sub?.forEach(child => visit(child, area, chapter))
  }

  CURRICULUM.forEach(area => {
    area.kapitel?.forEach(chapter => {
      chapter.themen?.forEach(topic => visit(topic, area, chapter))
    })
  })

  return rows.sort((a, b) => {
    const da = new Date(a.topic.updatedAt || a.topic.addedAt || '2000-01-01')
    const db = new Date(b.topic.updatedAt || b.topic.addedAt || '2000-01-01')
    return db - da
  })
}

function buildLatestItems(lang, copy) {
  return collectReadyTopics()
    .filter(({ topic }) => topic?.ready && topic?.link)
    .slice(0, 6)
    .map(({ topic, area, chapter }) => {
      const title = localizeTitle(topic, lang)
      const chapterTitle = localizeTitle(chapter, lang) || chapter?.title || ''
      const areaTitle = getFachTitle(area, lang) || area?.id || ''
      const metaBase = [areaTitle, chapterTitle].filter(Boolean).join(' · ')

      return {
        areaId: area?.id,
        chapter,
        title,
        meta: `${metaBase} · ${copy.learn}`,
        href: topic.link,
      }
    })
}

function buildFallTopicItems(lang) {
  return collectReadyTopics()
    .filter(({ topic }) => topic.fallLink || topic.link)
    .map(({ topic, area, chapter }) => ({
      id: topic.id,
      icon: area?.icon || '🧪',
      color: area?.color || '#f97316',
      title: localizeTitle(topic, lang),
      meta: [getFachTitle(area, lang), localizeTitle(chapter, lang) || chapter?.title].filter(Boolean).join(' · '),
      href: topic.fallLink || `${topic.link}#fallbeispiele`,
    }))
}

export default function LernPfade() {
  const { texts, lang } = useLanguage()
  const router = useRouter()
  const [modal, setModal] = useState(null) // null | 'fall'
  const fm = FALL_MODAL[lang] || FALL_MODAL.de
  const latest = LATEST_COPY[lang] || LATEST_COPY.de
  const latestItems = buildLatestItems(lang, latest)
  const fallTopicItems = buildFallTopicItems(lang)
  const withLang = (href) => {
    if (lang === 'de') return href
    const [baseAndQuery, hash = ''] = href.split('#')
    const sep = baseAndQuery.includes('?') ? '&' : '?'
    return `${baseAndQuery}${sep}lang=${lang}${hash ? `#${hash}` : ''}`
  }

  const handleCard = (i) => {
    if (i === 0) { router.push('/lernen'); return }
    if (i === 1) { router.push('/faelle'); return }
    if (i === 2) { router.push('/ueben'); return }
    if (i === 3) { router.push('/flashcards'); return }
  }

  return (
    <section className={styles.section} id="lernpfade">
      <div className="sLabel">{texts.section1Label}</div>
      <h2 className="sTitle">{texts.section1Title}</h2>
      <p className="sSub">{texts.section1Sub}</p>

      <div className={styles.grid}>
        {texts.pillars.map((p, i) => {
          const c = COLORS[i]
          return (
            <div key={i} className={styles.card}
              style={{ background: c.bg, borderColor: c.border, cursor: 'pointer' }}
              onClick={() => handleCard(i)}>
              <div className={styles.icon} style={{ background: c.icon, border: `1.5px solid ${c.iconBorder}` }}>
                {p.icon}
              </div>
              <div className={styles.num} style={{ color: c.num }}>{p.num}</div>
              <h3 className={styles.title}>{p.title}</h3>
              <p className={styles.desc}>{p.desc}</p>
              <div className={styles.chips}>
                {p.topics.map(t => (
                  <span key={t} className={styles.chip}
                    style={{ borderColor: c.border, color: c.num }}>{t}</span>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <div className={styles.latestBox}>
        <div className={styles.latestHeader}>
          <div>
            <div className={styles.latestLabel}>✨ {latest.label}</div>
            <h3 className={styles.latestTitle}>{latest.title}</h3>
            <p className={styles.latestDesc}>{latest.desc}</p>
          </div>
        </div>
        <div className={styles.latestGrid}>
          {latestItems.map(item => (
            <Link key={item.href} href={withLang(item.href)} className={styles.latestCard}>
              <span className={styles.latestIcon}>
                <LatestLessonIcon areaId={item.areaId} chapter={item.chapter} />
              </span>
              <span className={styles.latestText}>
                <strong>{item.title}</strong>
                <small>{item.meta}</small>
              </span>
              <span className={styles.latestArrow}>{latest.open}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* ── FALLBEISPIELE MODAL ── */}
      {modal === 'fall' && (
        <div className={styles.overlay} onClick={() => setModal(null)}>
          <div className={`${styles.modal} ${styles.fallModal}`} onClick={e => e.stopPropagation()}>
            <button className={styles.fallModalClose} onClick={() => setModal(null)} aria-label={fm.close}>×</button>
            <div className={styles.modalTitle}>{fm.title}</div>
            <p className={styles.notReadyMsg}>{fm.msg}</p>
            {fallTopicItems.length > 0 ? (
              <div className={styles.fallTopicGrid}>
                {fallTopicItems.map(item => (
                  <Link key={item.id} href={withLang(item.href)} className={styles.fallTopicCard}>
                    <span className={styles.fallTopicIcon} style={{ color: item.color }}>{item.icon}</span>
                    <span>
                      <strong>{item.title}</strong>
                      <small>{item.meta} · {fm.title}</small>
                    </span>
                    <em>{latest.open}</em>
                  </Link>
                ))}
              </div>
            ) : (
              <div className={styles.emptyFallTopics}>{latest.noCases}</div>
            )}

            <div className={styles.fallRegionGrid}>
              {FALL_REGIONS.map(region => (
                <button key={region.id} type="button" className={styles.fallRegionCard} style={{ borderColor: region.color + '44' }}>
                  <span className={styles.fallRegionIcon}>
                    <Image src={`/fach/${region.id}.png`} alt={region.name[lang] || region.name.de} width={58} height={58} style={{ objectFit: 'contain' }} />
                  </span>
                  <strong style={{ color: region.color }}>{region.name[lang] || region.name.de}</strong>
                  <small>{fm.soon}</small>
                </button>
              ))}
            </div>
            <button className={styles.modalClose} onClick={() => setModal(null)}>{fm.close}</button>
          </div>
        </div>
      )}
    </section>
  )
}
