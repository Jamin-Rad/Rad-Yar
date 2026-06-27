'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './TwoPillars.module.css'
import { AnatomieModal, MesswerteModal, KlassifikationenModal, RechnerModal } from './WichtigeReferenzen'
import { REF_COPY } from '@/data/referenzen'

const COPY = {
  de: {
    eyebrow: 'Dein Einstieg bei RadYar',
    lern: {
      badge: 'Lernen',
      title: 'Lernbereich',
      sub: 'Strukturiert · Bildgebung · Fallbasiert',
      desc: 'Alle Lernmaterialien nach Körperregion – von Grundlagen bis zur interaktiven Fallprüfung.',
      cta: 'Lernbereich öffnen',
      ctaHref: '/lernen',
      items: [
        { icon: '📖', label: 'Lektionen',     desc: 'Texte & Bilder nach Organ',     href: '/lernen' },
        { icon: '🩻', label: 'Fallbeispiele', desc: 'Kommentierte Bildgebung',        href: '/faelle' },
        { icon: '🧪', label: 'Fallprüfung',   desc: 'Interaktive Diagnostik',         href: '/faelle' },
        { icon: '🎯', label: 'MCQ',           desc: 'Multiple-Choice-Fragen',         href: '/ueben' },
        { icon: '🃏', label: 'Flashcards',    desc: 'Gezieltes Wiederholen',          href: '/flashcards' },
      ],
    },
    ref: {
      badge: 'Referenz',
      title: 'Schnellzugriff',
      sub: 'Klassifikationen · Messwerte · Rechner',
      desc: 'Klinische Referenzen auf einen Blick – sofort verfügbar, ohne langes Suchen.',
      cta: 'Referenzen öffnen',
      items: [
        { icon: '🏷️', label: 'Klassifikationen', desc: 'BI-RADS · TI-RADS · PI-RADS',  modal: 'klassifikationen' },
        { icon: '🫁', label: 'Anatomie',          desc: 'Befundrelevante Strukturen',    modal: 'anatomie' },
        { icon: '📏', label: 'Messwerte',         desc: 'Normalwerte & Schwellenwerte',  modal: 'messwerte' },
        { icon: '🧮', label: 'Rechner',           desc: 'Klinische Kalkulatoren',        modal: 'rechner' },
      ],
    },
  },
  en: {
    eyebrow: 'Your entry point at RadYar',
    lern: {
      badge: 'Learn',
      title: 'Learning Hub',
      sub: 'Structured · Imaging · Case-based',
      desc: 'All learning materials by body region – from basics to interactive case exams.',
      cta: 'Open Learning Hub',
      ctaHref: '/lernen',
      items: [
        { icon: '📖', label: 'Lessons',       desc: 'Texts & images by organ',        href: '/lernen' },
        { icon: '🩻', label: 'Case Examples', desc: 'Annotated imaging findings',      href: '/faelle' },
        { icon: '🧪', label: 'Case Exam',     desc: 'Interactive diagnostics',         href: '/faelle' },
        { icon: '🎯', label: 'MCQ',           desc: 'Multiple-choice questions',       href: '/ueben' },
        { icon: '🃏', label: 'Flashcards',    desc: 'Targeted review',                 href: '/flashcards' },
      ],
    },
    ref: {
      badge: 'Reference',
      title: 'Quick Access',
      sub: 'Classifications · Measurements · Calculators',
      desc: 'Clinical references at a glance – always available, no searching needed.',
      cta: 'Open References',
      items: [
        { icon: '🏷️', label: 'Classifications', desc: 'BI-RADS · TI-RADS · PI-RADS',   modal: 'klassifikationen' },
        { icon: '🫁', label: 'Anatomy',          desc: 'Relevant anatomical structures',  modal: 'anatomie' },
        { icon: '📏', label: 'Measurements',     desc: 'Normal values & thresholds',      modal: 'messwerte' },
        { icon: '🧮', label: 'Calculators',      desc: 'Clinical calculators',            modal: 'rechner' },
      ],
    },
  },
  fa: {
    eyebrow: 'نقطه ورود شما در رادیار',
    lern: {
      badge: 'آموزش',
      title: 'بخش آموزشی',
      sub: 'ساختاریافته · تصویربرداری · موردمحور',
      desc: 'تمام مطالب آموزشی بر اساس ناحیه بدن – از مبانی تا آزمون بالینی تعاملی.',
      cta: 'ورود به بخش آموزشی',
      ctaHref: '/lernen',
      items: [
        { icon: '📖', label: 'درس‌ها',      desc: 'متون و تصاویر بر اساس اندام',   href: '/lernen' },
        { icon: '🩻', label: 'نمونه موارد', desc: 'یافته‌های توضیح‌داده‌شده',       href: '/faelle' },
        { icon: '🧪', label: 'آزمون بالینی',desc: 'تشخیص تعاملی',                  href: '/faelle' },
        { icon: '🎯', label: 'MCQ',         desc: 'سوالات چندگزینه‌ای',            href: '/ueben' },
        { icon: '🃏', label: 'فلش‌کارت',   desc: 'مرور هدفمند',                   href: '/flashcards' },
      ],
    },
    ref: {
      badge: 'مرجع',
      title: 'دسترسی سریع',
      sub: 'طبقه‌بندی‌ها · مقادیر · ماشین‌حساب',
      desc: 'مراجع بالینی در یک نگاه – همیشه در دسترس، بدون جستجو.',
      cta: 'باز کردن مراجع',
      items: [
        { icon: '🏷️', label: 'طبقه‌بندی‌ها', desc: 'BI-RADS · TI-RADS · PI-RADS', modal: 'klassifikationen' },
        { icon: '🫁', label: 'آناتومی',        desc: 'ساختارهای مرتبط با یافته',   modal: 'anatomie' },
        { icon: '📏', label: 'مقادیر',         desc: 'مقادیر طبیعی و آستانه‌ها',  modal: 'messwerte' },
        { icon: '🧮', label: 'ماشین‌حساب',    desc: 'ماشین‌حساب‌های بالینی',      modal: 'rechner' },
      ],
    },
  },
}

function BookIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M5 5C5 3.9 5.9 3 7 3h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5z"
        stroke="currentColor" strokeWidth="1.6" fill="none"/>
      <path d="M21 3c1.5 0 4 1.2 4 4.5v13c0 2-1 2.5-2.5 2.5H8"
        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
      <path d="M9 8h8M9 12h8M9 16h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  )
}

function BoltIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M15.5 3L5 16h9.5L12 25 23 12h-9.5L15.5 3z"
        stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="none"/>
    </svg>
  )
}

export default function TwoPillars() {
  const { lang } = useLanguage()
  const router = useRouter()
  const [modal, setModal] = useState(null)
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef(null)
  const copy = COPY[lang] || COPY.de
  const refCopy = REF_COPY[lang] || REF_COPY.de

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.06 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    if (params.get('ref') === 'klassifikationen') setModal('klassifikationen')
  }, [])

  useEffect(() => {
    if (!modal) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [modal])

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.bg} />

      <p className={styles.eyebrow}>{copy.eyebrow}</p>

      <div className={styles.pillars}>

        {/* ── LERNBEREICH ── */}
        <div className={`${styles.pillar} ${styles.lernPillar} ${visible ? styles.pillarIn : ''}`}>
          <div className={styles.scanLine} />
          <div className={styles.topGlow} />
          <div className={styles.cornerOrb} />

          <header className={styles.pillarHead}>
            <div className={styles.iconBox}>
              <BookIcon />
            </div>
            <div>
              <div className={styles.badge}>{copy.lern.badge}</div>
              <h2 className={styles.pillarTitle}>{copy.lern.title}</h2>
            </div>
          </header>

          <p className={styles.sub}>{copy.lern.sub}</p>
          <p className={styles.desc}>{copy.lern.desc}</p>

          <ul className={styles.items} role="list">
            {copy.lern.items.map((item, i) => (
              <li key={i} className={visible ? styles.itemVisible : ''} style={{ '--item-delay': `${i * 65 + 180}ms` }}>
                <button className={styles.item} onClick={() => router.push(item.href)}>
                  <span className={styles.itemIconBox}>{item.icon}</span>
                  <span className={styles.itemBody}>
                    <strong className={styles.itemLabel}>{item.label}</strong>
                    <small className={styles.itemDesc}>{item.desc}</small>
                  </span>
                  <span className={styles.itemArr} aria-hidden>→</span>
                </button>
              </li>
            ))}
          </ul>

          <button className={`${styles.cta} ${styles.ctaOrange}`} onClick={() => router.push(copy.lern.ctaHref)}>
            <span>{copy.lern.cta}</span>
            <span className={styles.ctaArr}>→</span>
          </button>
        </div>

        {/* ── SCHNELLZUGRIFF ── */}
        <div className={`${styles.pillar} ${styles.refPillar} ${visible ? styles.pillarIn : ''}`}>
          <div className={styles.scanLine} />
          <div className={styles.topGlow} />
          <div className={styles.cornerOrb} />

          <header className={styles.pillarHead}>
            <div className={styles.iconBox}>
              <BoltIcon />
            </div>
            <div>
              <div className={styles.badge}>{copy.ref.badge}</div>
              <h2 className={styles.pillarTitle}>{copy.ref.title}</h2>
            </div>
          </header>

          <p className={styles.sub}>{copy.ref.sub}</p>
          <p className={styles.desc}>{copy.ref.desc}</p>

          <ul className={styles.items} role="list">
            {copy.ref.items.map((item, i) => (
              <li key={i} className={visible ? styles.itemVisible : ''} style={{ '--item-delay': `${i * 65 + 320}ms` }}>
                <button className={styles.item} onClick={() => setModal(item.modal)}>
                  <span className={styles.itemIconBox}>{item.icon}</span>
                  <span className={styles.itemBody}>
                    <strong className={styles.itemLabel}>{item.label}</strong>
                    <small className={styles.itemDesc}>{item.desc}</small>
                  </span>
                  <span className={styles.itemArr} aria-hidden>→</span>
                </button>
              </li>
            ))}
          </ul>

          <button className={`${styles.cta} ${styles.ctaCyan}`} onClick={() => setModal('klassifikationen')}>
            <span>{copy.ref.cta}</span>
            <span className={styles.ctaArr}>→</span>
          </button>
        </div>

      </div>

      {modal === 'anatomie'         && <AnatomieModal         copy={refCopy} lang={lang} onClose={() => setModal(null)} />}
      {modal === 'messwerte'        && <MesswerteModal        copy={refCopy} lang={lang} onClose={() => setModal(null)} />}
      {modal === 'klassifikationen' && <KlassifikationenModal copy={refCopy} lang={lang} onClose={() => setModal(null)} />}
      {modal === 'rechner'          && <RechnerModal          copy={refCopy} lang={lang} onClose={() => setModal(null)} />}
    </section>
  )
}
