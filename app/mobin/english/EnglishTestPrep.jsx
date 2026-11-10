'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { challengeAnswered, challengeComplete, readEnglishHistory } from '@/lib/mobinEnglishProgress'
import styles from './english.module.css'

export default function EnglishTestPrep() {
  const [history, setHistory] = useState({})
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const refresh = () => { setHistory(readEnglishHistory()); setReady(true) }
    refresh()
    window.addEventListener('storage', refresh)
    window.addEventListener('mobin-english-progress', refresh)
    return () => { window.removeEventListener('storage', refresh); window.removeEventListener('mobin-english-progress', refresh) }
  }, [])

  const answered = challengeAnswered(history)
  const unlocked = challengeComplete(history)
  const percent = answered / 30 * 100

  return <main className={`${styles.shell} ${styles.prepShell}`}>
    <div className={styles.page}>
      <nav className={styles.topbar} aria-label="Navigation"><Link href="/mobin/english" className={styles.backLink}>← English</Link><span className={styles.brand}>M<span>.</span> Mobin</span><span className={styles.dateTicket}>TEST · 11. NOVEMBER 2026</span></nav>
      <header className={styles.hero}>
        <div className={styles.heroCopy}><span className={styles.heroEyebrow}>UNIT 2 · LONDON</span><h1>Vokabeltest<span>.</span></h1><p>Erst die Wörter meistern. Dann zeigst du in zwei Probetests, was du kannst.</p></div>
        <div className={styles.skyline} aria-hidden="true" />
      </header>

      <section className={styles.path} aria-label="Dein Lernweg">
        <article className={styles.trainingCard}>
          <div className={styles.stageNumber}>01</div>
          <div className={styles.trainingCopy}><span className={styles.stageLabel}>DEIN ERSTER SCHRITT</span><h2>Worttraining</h2><p>30 Fragen zu Bedeutung und Rechtschreibung. Nach jeder Antwort siehst du sofort die Lösung.</p></div>
          <div className={styles.trainingAction}><div className={styles.progressCircle} style={{ '--progress': `${percent}%` }} role="progressbar" aria-label="Worttraining" aria-valuenow={answered} aria-valuemin={0} aria-valuemax={30}><strong>{ready ? answered : '–'}<span>/30</span></strong></div><Link className={styles.actionLink} href="/mobin/english/vokabeltest?mode=word-challenge">{unlocked ? 'Ergebnis & neue Runde' : answered > 0 ? 'Training fortsetzen' : '30 Fragen üben'} <span aria-hidden="true">→</span></Link></div>
        </article>

        <div className={styles.stageTwoHead}><span className={styles.stageNumberSmall}>02</span><div><h2>Probetests</h2><p>{unlocked ? 'Wähle einen Test und schreibe die Antworten selbst.' : 'Nach den 30 Trainingsfragen werden beide Tests freigeschaltet.'}</p></div></div>
        <div className={styles.testGrid}>
          {['a', 'b'].map(letter => {
            const id = `probe-${letter}`
            const test = history[id]
            return <article className={`${styles.testCard} ${!unlocked ? styles.testLocked : ''}`} key={id}>
              <div className={styles.testIcon} aria-hidden="true">{letter.toUpperCase()}</div>
              <div><h3>Probetest {letter.toUpperCase()}</h3><p>10 Aufgaben · Übersetzen, Lückensätze und Verbformen</p>{test?.date && <small>Zuletzt {test.last}/10 richtig</small>}</div>
              {unlocked ? <Link href={`/mobin/english/vokabeltest?mode=${id}`} className={styles.testAction} aria-label={`Probetest ${letter.toUpperCase()} starten`}>→</Link> : <span className={styles.lockLabel}>Nach Schritt 01</span>}
            </article>
          })}
        </div>
      </section>
    </div>
  </main>
}
