import Link from 'next/link'
import styles from './deutsch.module.css'

export const metadata = { title: 'Deutsch · Mobin' }

export default function DeutschPage() {
  return (
    <main className={styles.shell} lang="de">
      <div className={styles.frame}>
        <Link className={styles.back} href="/mobin?bereich=1">← Mobin</Link>
        <section className={styles.hero} aria-labelledby="deutsch-title">
          <div>
            <h1 id="deutsch-title">Deutsch</h1>
            <p>Klassenarbeit · <time dateTime="2026-11-20">20. November</time></p>
            <Link className={styles.primary} href="/mobin/fach/deutsch/klassenarbeit">Vorbereitung öffnen <span aria-hidden="true">→</span></Link>
          </div>
        </section>
      </div>
    </main>
  )
}
