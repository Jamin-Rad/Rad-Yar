'use client'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './page.module.css'

const TOPICS = [
  {
    key: 'kontrastmittel',
    href: '/technik/kontrastmittel/mcq',
    icon: '💉',
    color: '#f97316',
    available: true,
    count: { de: '9 Fragen', en: '9 Questions', fa: '۹ سوال' },
    name: { de: 'Kontrastmittel', en: 'Contrast Media', fa: 'ماده حاجب' },
    desc: { de: 'Röntgen-KM · MRT-KM · Nebenwirkungen · Schwangerschaft', en: 'X-ray CM · MRI CM · Adverse Effects · Pregnancy', fa: 'ماده حاجب رادیولوژی · MRI · عوارض · بارداری' },
  },
  {
    key: 'meniskus',
    href: '/msk/knie/meniskus/mcq',
    icon: '🦴',
    color: '#f97316',
    available: true,
    count: { de: '6 Fragen', en: '6 Questions', fa: '۶ سوال' },
    name: { de: 'Knie · Meniskus', en: 'Knee · Meniscus', fa: 'زانو · منیسک' },
    desc: { de: 'Anatomie · MRT-Grading · Vaskularisation · Rissdiagnostik', en: 'Anatomy · MRI grading · vascular zones · tear diagnosis', fa: 'آناتومی · درجه‌بندی MRI · خون‌رسانی · تشخیص پارگی' },
  },
  { key: 'mrt',    icon: '🧲', color: '#7c3aed', available: false, name: { de: 'MRT-Physik',     en: 'MRI Physics',    fa: 'فیزیک MRI' } },
  { key: 'ct',     icon: '☢️', color: '#0ea5e9', available: false, name: { de: 'CT-Technik',     en: 'CT Technology',  fa: 'تکنولوژی CT' } },
  { key: 'strah',  icon: '🛡️', color: '#d97706', available: false, name: { de: 'Strahlenschutz', en: 'Radiation Protection', fa: 'حفاظت از تابش' } },
  { key: 'neuro',  icon: '🧠', color: '#7c3aed', available: false, name: { de: 'Neuroradiologie',en: 'Neuroradiology', fa: 'نوروراديولوژی' } },
  { key: 'thorax', icon: '🫁', color: '#0ea5e9', available: false, name: { de: 'Thorax',         en: 'Thorax',         fa: 'توراکس' } },
]

const UI = {
  de: { title: 'MCQs · Thema wählen', sub: 'Wähle ein Thema und teste dein Wissen.', available: 'Verfügbar', soon: 'Demnächst', start: 'Quiz starten →' },
  en: { title: 'MCQs · Choose Topic', sub: 'Select a topic and test your knowledge.', available: 'Available', soon: 'Coming soon', start: 'Start Quiz →' },
  fa: { title: 'MCQ · انتخاب موضوع', sub: 'یک موضوع را انتخاب کنید.', available: 'در دسترس', soon: 'به زودی', start: 'شروع ←' },
}

export default function McqSelectPage() {
  const { lang } = useLanguage()
  const ui = UI[lang] || UI.de

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <div className={styles.breadcrumb}>
          <Link href="/" className={styles.breadLink}>RadYar</Link>
          <span className={styles.sep}>›</span>
          <span className={styles.breadCurrent}>MCQ</span>
        </div>
        <h1 className={styles.title}>{ui.title}</h1>
        <p className={styles.sub}>{ui.sub}</p>
      </div>

      <div className={styles.list}>
        {TOPICS.map(t => {
          const name = t.name[lang] || t.name.de
          const desc = t.desc?.[lang] || t.desc?.de
          const count = t.count?.[lang] || t.count?.de

          if (t.available) {
            return (
              <Link key={t.key} href={t.href} className={styles.card}>
                <span className={styles.icon}>{t.icon}</span>
                <div className={styles.info}>
                  <div className={styles.name} style={{ color: t.color }}>{name}</div>
                  {desc && <div className={styles.desc}>{desc}</div>}
                </div>
                <div className={styles.right}>
                  <span className={styles.badge}>{ui.available}</span>
                  {count && <span className={styles.count}>{count}</span>}
                  <span className={styles.arrow} style={{ color: t.color }}>{ui.start}</span>
                </div>
              </Link>
            )
          }
          return (
            <div key={t.key} className={`${styles.card} ${styles.cardLocked}`}>
              <span className={styles.icon} style={{ opacity: 0.4 }}>{t.icon}</span>
              <div className={styles.info}>
                <div className={styles.name} style={{ color: t.color, opacity: 0.4 }}>{name}</div>
              </div>
              <span className={styles.soon}>{ui.soon} 🔒</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
