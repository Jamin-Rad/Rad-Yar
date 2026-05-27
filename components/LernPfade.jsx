'use client'
import { useLanguage } from '@/providers/LanguageProvider'
import styles from './LernPfade.module.css'

const colorIds = ['c1', 'c2', 'c3']

export default function LernPfade() {
  const { texts } = useLanguage()
  return (
    <section className={styles.section} id="lernpfade">
      <div className="sLabel">{texts.section1Label}</div>
      <h2 className="sTitle">{texts.section1Title}</h2>
      <p className="sSub">{texts.section1Sub}</p>
      <div className={styles.grid}>
        {texts.pillars.map((p, i) => (
          <div key={i} className={`${styles.card} ${styles[colorIds[i]]}`} style={{ animationDelay: `${i * 0.12}s` }}>
            <div className={styles.icon}>{p.icon}</div>
            <div className={styles.num}>{p.num}</div>
            <h3 className={styles.title}>{p.title}</h3>
            <p className={styles.desc}>{p.desc}</p>
            <div className={styles.topics}>
              {p.topics.map((t) => <span key={t} className={styles.chip}>{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
