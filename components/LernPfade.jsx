'use client'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './LernPfade.module.css'

const COLORS = [
  { bg: '#fff5eb', border: '#fed7aa', num: '#f97316', icon: '#fff5eb', iconBorder: '#fdba74' },
  { bg: '#f0f9ff', border: '#bae6fd', num: '#0ea5e9', icon: '#f0f9ff', iconBorder: '#7dd3fc' },
  { bg: '#f0fdf4', border: '#bbf7d0', num: '#10b981', icon: '#f0fdf4', iconBorder: '#6ee7b7' },
]

// Link per Karte: Lernen → /lernen/fachauswahl, Üben → /ueben/fachauswahl, Prüfung → /pruefung
const CARD_LINKS = [
  '/lernen',
  '/ueben',
  '/pruefung',
]

export default function LernPfade() {
  const { texts, lang } = useLanguage()
  return (
    <section className={styles.section} id="lernpfade">
      <div className="sLabel">{texts.section1Label}</div>
      <h2 className="sTitle">{texts.section1Title}</h2>
      <p className="sSub">{texts.section1Sub}</p>
      <div className={styles.grid}>
        {texts.pillars.map((p, i) => {
          const c = COLORS[i]
          return (
            <Link key={i} href={CARD_LINKS[i]} className={styles.card}
              style={{ background: c.bg, borderColor: c.border, textDecoration: 'none' }}>
              <div className={styles.icon}
                style={{ background: c.icon, border: `1.5px solid ${c.iconBorder}` }}>
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

            </Link>
          )
        })}
      </div>
    </section>
  )
}
