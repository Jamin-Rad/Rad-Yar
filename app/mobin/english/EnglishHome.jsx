'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from './english.module.css'
import WordPractice from '../WordPractice'

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
      <nav className={styles.topbar} aria-label="Navigation"><Link href="/mobin?bereich=1" className={styles.backLink}>← Mobin</Link><span className={styles.brand}>M<span>.</span> Mobin</span><span className={styles.overviewUnit}>ENGLISH · KLASSE 6</span></nav>
      <header className={styles.hero}>
        <div className={styles.heroCopy}><span className={styles.heroEyebrow}>DEIN ENGLISCH-STUDIO</span><h1>English<span>.</span></h1><p>Wähle aus, wofür du lernen möchtest.</p></div>
        <div className={styles.skyline} aria-hidden="true" />
      </header>
      <div className={styles.sectionIntro}><h2>Was möchtest du üben?</h2><p>Bereich auswählen · Testtermin öffnen · Loslegen</p></div>
      <section className={styles.categorySection} aria-label="Englisch lernen">
        <button type="button" className={styles.categoryCard} onClick={() => setOpen('vocabulary')}>
          <span className={styles.categoryTop}><span className={styles.categoryIndex}>01 / WÖRTER</span><span className={styles.categoryBadge}>1 Test</span></span><span className={styles.categoryArt} aria-hidden="true"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2"><path d="M24 12C17 7 9 8 5 10v28c6-3 13-2 19 2 6-4 13-5 19-2V10c-4-2-12-3-19 2v28"/><path d="M11 17l7 1m-7 6 7 1m12-7 7-1m-7 8 7-1"/></svg></span><strong>Vokabeltest</strong><span>Wörter üben, Schreibweise prüfen und Probetests schreiben.</span><span className={styles.categoryFooter}>Test auswählen <b aria-hidden="true">→</b></span>
        </button>
        <button type="button" className={styles.categoryCard} onClick={() => setOpen('classwork')}>
          <span className={styles.categoryTop}><span className={styles.categoryIndex}>02 / UNTERRICHT</span><span className={styles.categoryBadge}>Termine</span></span><span className={styles.categoryArt} aria-hidden="true"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="5" width="30" height="38" rx="4"/><path d="M17 15h14M17 23h14M17 31h8"/></svg></span><strong>Klassenarbeit</strong><span>Bereite dich auf die nächste Englischarbeit vor.</span><span className={styles.categoryFooter}>Test auswählen <b aria-hidden="true">→</b></span>
        </button>
      </section>
      <WordPractice language="Englisch" />
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
