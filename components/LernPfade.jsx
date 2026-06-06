'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './LernPfade.module.css'

const COLORS = [
  { bg: '#fff5eb', border: '#fed7aa', num: '#f97316', icon: '#fff5eb', iconBorder: '#fdba74' },
  { bg: '#f0f9ff', border: '#bae6fd', num: '#0ea5e9', icon: '#f0f9ff', iconBorder: '#7dd3fc' },
  { bg: '#f0fdf4', border: '#bbf7d0', num: '#10b981', icon: '#f0fdf4', iconBorder: '#6ee7b7' },
  { bg: '#f8fafc', border: '#c7d2fe', num: '#2563eb', icon: '#eff6ff', iconBorder: '#93c5fd' },
]

const FALL_MODAL = {
  de: { title: 'Fallbeispiele', msg: 'Wähle eine Körperregion. Interaktive Fälle werden nach und nach ergänzt.', close: 'Schließen', soon: 'in Arbeit' },
  en: { title: 'Case Studies', msg: 'Choose a body region. Interactive cases will be added step by step.', close: 'Close', soon: 'in progress' },
  fa: { title: 'موارد بالینی', msg: 'یک ناحیه بدن انتخاب کن. موارد بالینی به‌تدریج اضافه می‌شوند.', close: 'بستن', soon: 'در حال ساخت' },
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

const PROFILE_CTA = {
  de: { label: 'Dein Lernpfad', title: 'Klug lernen mit gezielter Wiederholung', desc: 'Sieh, welche Kapitel du schon bearbeitet hast, welche Flashcards fällig sind und wo du heute weitermachst.', btn: 'Zum Profil →' },
  en: { label: 'Your Learning Path', title: 'Study smart with targeted repetition', desc: 'See which chapters you have already worked through, which flashcards are due and where to continue today.', btn: 'Go to Profile →' },
  fa: { label: 'مسیر یادگیری شما', title: 'یادگیری هوشمند با تکرار هدفمند', desc: 'ببین کدام فصل‌ها را خوانده‌ای، کدام فلش‌کارت‌ها سررسید شده‌اند و امروز از کجا ادامه می‌دهی.', btn: 'رفتن به پروفایل ←' },
}


const LATEST = {
  de: {
    label: 'Neu auf RadYar',
    title: 'Zuletzt hinzugefügt',
    desc: 'Die neuesten Lern- und MCQ-Bereiche auf einen Blick.',
    open: 'Öffnen →',
    items: [
      { icon:'🦵', title:'Meniskus', meta:'MSK · Knie · Lernen', href:'/msk/knie/meniskus' },
      { icon:'📝', title:'Meniskus MCQs', meta:'6 neue Fragen · DE/EN/FA', href:'/msk/knie/meniskus/mcq' },
      { icon:'🧪', title:'Kontrastmittel MCQs', meta:'Technik · Sicherheit · Nebenwirkungen', href:'/technik/kontrastmittel/mcq' },
      { icon:'🧠', title:'Kopf-Struktur', meta:'Tumoren · Vaskulär · Entzündung', href:'/lernen/gehirn' },
      { icon:'🦴', title:'MSK-Verzeichnis', meta:'Trauma · Gelenke · Tumoren', href:'/lernen/msk' },
      { icon:'🎛️', title:'MCQ-Training nach Themen', meta:'Mehrere Themen kombinieren', href:'/ueben' },
    ],
  },
  en: {
    label: 'New on RadYar',
    title: 'Recently added',
    desc: 'The newest learning and MCQ areas at a glance.',
    open: 'Open →',
    items: [
      { icon:'🦵', title:'Meniscus', meta:'MSK · Knee · Learn', href:'/msk/knie/meniskus' },
      { icon:'📝', title:'Meniscus MCQs', meta:'6 new questions · DE/EN/FA', href:'/msk/knie/meniskus/mcq' },
      { icon:'🧪', title:'Contrast media MCQs', meta:'Technique · safety · side effects', href:'/technik/kontrastmittel/mcq' },
      { icon:'🧠', title:'Head structure', meta:'Tumours · vascular · inflammation', href:'/lernen/gehirn' },
      { icon:'🦴', title:'MSK directory', meta:'Trauma · joints · tumours', href:'/lernen/msk' },
      { icon:'🎛️', title:'Topic-based MCQ training', meta:'Combine multiple topics', href:'/ueben' },
    ],
  },
  fa: {
    label: 'تازه در RadYar',
    title: 'آخرین موارد اضافه‌شده',
    desc: 'جدیدترین بخش‌های آموزشی و MCQ در یک نگاه.',
    open: 'باز کردن ←',
    items: [
      { icon:'🦵', title:'منیسک', meta:'MSK · زانو · آموزش', href:'/msk/knie/meniskus' },
      { icon:'📝', title:'MCQ منیسک', meta:'۶ سؤال جدید · DE/EN/FA', href:'/msk/knie/meniskus/mcq' },
      { icon:'🧪', title:'MCQ ماده حاجب', meta:'تکنیک · ایمنی · عوارض', href:'/technik/kontrastmittel/mcq' },
      { icon:'🧠', title:'ساختار Kopf', meta:'تومورها · عروقی · التهابی', href:'/lernen/gehirn' },
      { icon:'🦴', title:'فهرست MSK', meta:'تروما · مفاصل · تومورها', href:'/lernen/msk' },
      { icon:'🎛️', title:'تمرین MCQ بر اساس موضوع', meta:'ترکیب چند موضوع', href:'/ueben' },
    ],
  },
}

export default function LernPfade() {
  const { texts, lang } = useLanguage()
  const router = useRouter()
  const [modal, setModal] = useState(null) // null | 'fall'
  const fm = FALL_MODAL[lang] || FALL_MODAL.de
  const cta = PROFILE_CTA[lang] || PROFILE_CTA.de
  const latest = LATEST[lang] || LATEST.de
  const withLang = (href) => lang === 'de' ? href : `${href}?lang=${lang}`

  const handleCard = (i) => {
    if (i === 0) { router.push('/lernen'); return }
    if (i === 1) { setModal('fall'); return }
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

      {/* ── PROFIL CTA ── */}
      <Link href="/profil" className={styles.profileCta}>
        <div className={styles.profileCtaIcon}>📊</div>
        <div className={styles.profileCtaBody}>
          <div className={styles.profileCtaLabel}>{cta.label}</div>
          <div className={styles.profileCtaTitle}>{cta.title}</div>
          <div className={styles.profileCtaDesc}>{cta.desc}</div>
        </div>
        <div className={styles.profileCtaBtn}>{cta.btn}</div>
      </Link>

      <div className={styles.latestBox}>
        <div className={styles.latestHeader}>
          <div>
            <div className={styles.latestLabel}>✨ {latest.label}</div>
            <h3 className={styles.latestTitle}>{latest.title}</h3>
            <p className={styles.latestDesc}>{latest.desc}</p>
          </div>
        </div>
        <div className={styles.latestGrid}>
          {latest.items.slice(0, 6).map(item => (
            <Link key={item.href} href={withLang(item.href)} className={styles.latestCard}>
              <span className={styles.latestIcon}>{item.icon}</span>
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
