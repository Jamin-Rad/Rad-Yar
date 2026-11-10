'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from './english.module.css'

export default function EnglishHome() {
  const [open, setOpen] = useState(null)
  useEffect(() => {
    if (!open) return undefined
    const closeOnEscape = event => { if (event.key === 'Escape') setOpen(null) }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [open])

  return <main className={styles.shell}>
    <div className={styles.page}>
      <nav className={styles.topbar} aria-label="Navigation"><Link href="/mobin" className={styles.backLink}>← Mobin</Link><span className={styles.brand}>M<span>.</span> Mobin</span><span className={styles.overviewUnit}>ENGLISH · KLASSE 6</span></nav>
      <header className={styles.hero}>
        <div className={styles.heroCopy}><h1>English<span>.</span></h1><p>Wähle aus, wofür du lernen möchtest.</p></div>
        <div className={styles.skyline} aria-hidden="true" />
      </header>
      <section className={styles.categorySection} aria-label="Englisch lernen">
        <button type="button" className={styles.categoryCard} onClick={() => setOpen('vocabulary')}>
          <span className={styles.categoryIndex}>01 / WÖRTER</span><strong>Vokabeltest</strong><span>Wörter üben, Schreibweise prüfen und Probetests schreiben.</span><b aria-hidden="true">→</b>
        </button>
        <button type="button" className={styles.categoryCard} onClick={() => setOpen('classwork')}>
          <span className={styles.categoryIndex}>02 / UNTERRICHT</span><strong>Klassenarbeit</strong><span>Bereite dich auf die nächste Englischarbeit vor.</span><b aria-hidden="true">→</b>
        </button>
      </section>
    </div>
    {open && <div className={styles.modalBackdrop} onMouseDown={event => { if (event.target === event.currentTarget) setOpen(null) }}>
      <div className={styles.dateModal} role="dialog" aria-modal="true" aria-labelledby="english-dates-title">
        <button type="button" className={styles.modalClose} onClick={() => setOpen(null)} aria-label="Schließen">×</button>
        <span className={styles.modalLabel}>{open === 'vocabulary' ? 'VOKABELTESTS' : 'KLASSENARBEITEN'}</span>
        <h2 id="english-dates-title">{open === 'vocabulary' ? 'Wähle deinen Test.' : 'Termine'}</h2>
        {open === 'vocabulary' ? <Link className={styles.dateRow} href="/mobin/english/vokabeltest/11-november"><span className={styles.dateBlock}><strong>11</strong><small>NOV 2026</small></span><span><b>Vokabeltest · Unit 2 London</b><small>30 Übungen und zwei Probetests</small></span><span className={styles.dateArrow} aria-hidden="true">→</span></Link>
          : <p className={styles.emptyDates}>Für die nächste Klassenarbeit ist noch kein Termin eingetragen.</p>}
      </div>
    </div>}
  </main>
}
