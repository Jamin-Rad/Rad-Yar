import Link from 'next/link'
import EndungenQuiz from './EndungenQuiz'
import learning from '../../../learning.module.css'
import styles from './endungen.module.css'

export const metadata = { title: 'Endungen · Latein · Mobin' }

export default function EndungenPage() {
  return (
    <main className={learning.shell} lang="de">
      <div className={styles.wrap}>
        <Link className={learning.subjectBack} href="/mobin/fach/latein">← Latein</Link>
        <header className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>Latein · Cursus A, Lektion 3</p>
            <h1>Endungen im Griff</h1>
            <p>Personalendungen, <i lang="la">esse</i> und Nominativ &amp; Akkusativ</p>
          </div>
          <div className={styles.motif} aria-hidden="true">
            <span>−mus</span><strong>−am</strong><span>−nt</span>
          </div>
        </header>
        <EndungenQuiz />
      </div>
    </main>
  )
}
