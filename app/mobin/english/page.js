import Link from 'next/link'
import { redirect } from 'next/navigation'
import { hasMobinSession } from '@/lib/mobinAuth'
import styles from './english.module.css'

export const metadata = {
  title: 'English | Mobin',
  description: 'Englisch üben: Vokabeltests, Bedeutung und Rechtschreibung.',
  robots: { index: false, follow: false },
}

export default async function EnglishPage() {
  if (!(await hasMobinSession())) redirect('/mobin/login?next=/mobin/english')
  return (
    <main className={styles.shell}>
      <div className={styles.container}>
        <nav className={styles.breadcrumb} aria-label="Navigation"><Link href="/mobin">← Mobin</Link><span>/</span><strong>English</strong></nav>
        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.kicker}>MOBIN’S ENGLISH STUDIO</span>
            <h1>Words open<br /><em>new worlds.</em></h1>
            <p>Dein Platz zum Üben für den nächsten Vokabeltest. Schritt für Schritt, mit einer Erklärung nach jeder Antwort.</p>
            <Link className={styles.primaryLink} href="/mobin/english/vokabeltest">Jetzt üben <span aria-hidden="true">↗</span></Link>
          </div>
          <div className={styles.heroArt} aria-hidden="true"><div className={styles.orbitOne} /><div className={styles.orbitTwo} /><span className={styles.artWord}>hello<span>.</span></span><span className={styles.artSmall}>LONDON · UNIT 2</span><span className={styles.artSpark}>✳</span></div>
        </header>
        <section className={styles.sectionHead}><span>01 / DEIN TRAINING</span><h2>Vokabeltest</h2></section>
        <Link className={styles.featureCard} href="/mobin/english/vokabeltest">
          <div><span className={styles.cardIndex}>UNIT 02 · LONDON</span><h3>Bereit für den nächsten Test?</h3><p>Zwei neue Probetests nach dem Muster deiner bisherigen Arbeiten und 30 knifflige Multiple-Choice-Fragen zu Bedeutung und Schreibweise.</p><div className={styles.pills}><span>2 Probetests</span><span>30 Wortfragen</span><span>Direktes Feedback</span></div></div>
          <span className={styles.cardArrow} aria-hidden="true">↗</span>
        </Link>
        <p className={styles.sourceNote}>Grundlage: deine Vokabeltests 1–3 und die Fotos zu Unit 2 „London: Wow!“.</p>
      </div>
    </main>
  )
}
