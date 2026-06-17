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

const PILLAR_ICONS = [
  '/lernbereiche/lektionen.jpg',
  '/lernbereiche/fallpruefung.jpg',
  '/lernbereiche/mcq.jpg',
  '/lernbereiche/flashcards.jpg',
]

const CHEATSHEET_COPY = {
  de: {
    label: 'Spickzettel Radiologie',
    title: 'Schnelle Hilfe am Befundplatz',
    desc: 'Kompakte Klassifikationen, Messwerte und Rechenhilfen für den Alltag in der radiologischen Weiterbildung.',
    action: 'Öffnen',
    items: [
      {
        title: 'Klassifikationen',
        text: 'BI-RADS, LI-RADS, Scores und Staging-Systeme schnell wiederfinden.',
        meta: 'Scores & Kategorien',
        image: '/lernbereiche/klassifikation.png',
        href: '/lernen',
        color: '#f97316',
      },
      {
        title: 'Messwerte',
        text: 'Normwerte, Grenzwerte und typische Messpunkte übersichtlich gesammelt.',
        meta: 'mm, Winkel, Cut-offs',
        image: '/lernbereiche/messwerte.png',
        href: '/lernen',
        color: '#0ea5e9',
      },
      {
        title: 'Rechner',
        text: 'Formeln und kleine Rechenhilfen für Befundung, Protokolle und Verlauf.',
        meta: 'Formeln & Verlauf',
        image: '/lernbereiche/rechen.png',
        href: '/technik/kontrastmittel',
        color: '#10b981',
      },
    ],
  },
  en: {
    label: 'Radiology Cheat Sheet',
    title: 'Fast help at the workstation',
    desc: 'Compact classifications, measurements and calculators for everyday radiology training.',
    action: 'Open',
    items: [
      {
        title: 'Classifications',
        text: 'Quick access to BI-RADS, LI-RADS, scores and staging systems.',
        meta: 'Scores & categories',
        image: '/lernbereiche/klassifikation.png',
        href: '/lernen',
        color: '#f97316',
      },
      {
        title: 'Measurements',
        text: 'Normal values, thresholds and common measurement points in one place.',
        meta: 'mm, angles, cut-offs',
        image: '/lernbereiche/messwerte.png',
        href: '/lernen',
        color: '#0ea5e9',
      },
      {
        title: 'Calculators',
        text: 'Useful formulas and small calculators for reports, protocols and follow-up.',
        meta: 'Formulas & follow-up',
        image: '/lernbereiche/rechen.png',
        href: '/technik/kontrastmittel',
        color: '#10b981',
      },
    ],
  },
  fa: {
    label: 'چک‌لیست رادیولوژی',
    title: 'کمک سریع کنار ایستگاه گزارش',
    desc: 'طبقه‌بندی‌ها، اندازه‌گیری‌ها و محاسبه‌های کوتاه برای کار روزمره رادیولوژی.',
    action: 'باز کردن',
    items: [
      {
        title: 'طبقه‌بندی‌ها',
        text: 'دسترسی سریع به BI-RADS، LI-RADS، اسکور‌ها و سیستم‌های staging.',
        meta: 'اسکور و دسته‌بندی',
        image: '/lernbereiche/klassifikation.png',
        href: '/lernen',
        color: '#f97316',
      },
      {
        title: 'اندازه‌گیری‌ها',
        text: 'مقادیر نرمال، مرزها و نقاط اندازه‌گیری رایج در یک نگاه.',
        meta: 'میلی‌متر، زاویه، cut-off',
        image: '/lernbereiche/messwerte.png',
        href: '/lernen',
        color: '#0ea5e9',
      },
      {
        title: 'محاسبه‌گرها',
        text: 'فرمول‌ها و محاسبه‌های کاربردی برای گزارش، پروتکل و پیگیری.',
        meta: 'فرمول و پیگیری',
        image: '/lernbereiche/rechen.png',
        href: '/technik/kontrastmittel',
        color: '#10b981',
      },
    ],
  },
}

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
  const cheatsheet = CHEATSHEET_COPY[lang] || CHEATSHEET_COPY.de
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

      <div className={styles.cheatSheet}>
        <div className={styles.cheatIntro}>
          <span className={styles.cheatLabel}>{cheatsheet.label}</span>
          <h3>{cheatsheet.title}</h3>
          <p>{cheatsheet.desc}</p>
        </div>
        <div className={styles.cheatGrid}>
          {cheatsheet.items.map(item => (
            <Link
              key={item.title}
              href={withLang(item.href)}
              className={styles.cheatCard}
              style={{ '--accent': item.color }}
            >
              <span className={styles.cheatImageWrap}>
                <Image src={item.image} alt="" width={220} height={220} className={styles.cheatImage} />
              </span>
              <span className={styles.cheatBody}>
                <small>{item.meta}</small>
                <strong>{item.title}</strong>
                <span>{item.text}</span>
              </span>
              <span className={styles.cheatAction}>{cheatsheet.action}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.grid}>
        {texts.pillars.map((p, i) => {
          const c = COLORS[i]
          return (
            <div key={i} className={styles.card}
              style={{ background: c.bg, borderColor: c.border, cursor: 'pointer' }}
              onClick={() => handleCard(i)}>
              <div className={styles.icon} style={{ borderColor: c.iconBorder }}>
                <Image src={PILLAR_ICONS[i]} alt="" width={96} height={96} className={styles.pillarIconImage} />
              </div>
              <h3 className={styles.title} style={{ color: c.num }}>{p.title}</h3>
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
