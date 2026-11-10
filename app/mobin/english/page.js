import Link from 'next/link'
import { redirect } from 'next/navigation'
import { hasMobinSession } from '@/lib/mobinAuth'
import { berlinStudyDay } from '@/lib/mobinStudyTime'
import styles from './english.module.css'

export const metadata = {
  title: 'English | Mobin',
  description: 'Englisch üben: Vokabeltests, Bedeutung und Rechtschreibung.',
  robots: { index: false, follow: false },
}

export default async function EnglishPage() {
  if (!(await hasMobinSession())) redirect('/mobin/login?next=/mobin/english')
  const today = berlinStudyDay()
  const examLabel = today === '2026-11-10' ? 'MORGEN IST TESTTAG' : today === '2026-11-11' ? 'HEUTE IST TESTTAG' : 'VOKABELTEST · UNIT 2'
  const examMessage = today === '2026-11-10' ? 'Heute üben, morgen sicherer schreiben.' : 'Trainiere Bedeutung und Schreibweise in deinem Tempo.'
  return (
    <main className={styles.shell}>
      <div className={styles.container}>
        <nav className={styles.breadcrumb} aria-label="Navigation"><Link href="/mobin">← Mobin</Link><span>/</span><strong>English</strong></nav>
        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.kicker}>MOBIN’S ENGLISH STUDIO · LONDON EDITION</span>
            <h1>Ready, set,<br /><em>London!</em></h1>
            <p>Dein Platz zum Üben für den nächsten Vokabeltest. Schritt für Schritt, mit einer Erklärung nach jeder Antwort.</p>
            <Link className={styles.primaryLink} href="/mobin/english/vokabeltest">Jetzt üben <span aria-hidden="true">↗</span></Link>
          </div>
          <div className={styles.heroArt} aria-hidden="true"><div className={styles.orbitOne} /><div className={styles.orbitTwo} /><span className={styles.artWord}>hello<span>.</span></span><span className={styles.artSmall}>LONDON · UNIT 2</span><span className={styles.artSpark}>✳</span><span className={styles.floatWordOne}>bridge</span><span className={styles.floatWordTwo}>view</span></div>
        </header>
        <section className={styles.examBanner} aria-label="Vokabeltest am 11. November"><div className={styles.dateBlock}><strong>11</strong><span>NOV<br />2026</span></div><div className={styles.examCopy}><span>{examLabel}</span><h2>Vokabeltest am 11. November</h2><p>Unit 2 „London: Wow!“ · {examMessage}</p></div><Link href="/mobin/english/vokabeltest" className={styles.examAction}>Training starten <span aria-hidden="true">→</span></Link></section>
        <section className={styles.sectionHead}><span>01 / DEIN TRAINING</span><h2>Vokabeltest</h2></section>
        <Link className={styles.featureCard} href="/mobin/english/vokabeltest">
          <div><span className={styles.cardIndex}>MISSION 01 · VOKABELTEST</span><h3>Wörter, die sitzen.</h3><p>Zwei neue Probetests nach dem Muster deiner bisherigen Arbeiten und 30 knifflige Multiple-Choice-Fragen zu Bedeutung und Schreibweise.</p><div className={styles.pills}><span>✎ 2 Probetests</span><span>✦ 30 Wortfragen</span><span>↺ Fehlertraining</span></div></div>
          <span className={styles.cardArrow} aria-hidden="true">↗</span>
        </Link>
        <p className={styles.sourceNote}>Grundlage: deine Vokabeltests 1–3 und die Fotos zu Unit 2 „London: Wow!“.</p>
      </div>
    </main>
  )
}
