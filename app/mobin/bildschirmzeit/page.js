import Link from 'next/link'
import styles from '../mobin.module.css'

export const metadata = {
  title: 'Mobin | Bildschirmzeit',
}

export default function BildschirmzeitPage() {
  return (
    <main className={styles.shell}>
      <div className={styles.wrap}>
        <header className={styles.topbar}>
          <Link className={styles.brand} href="/mobin">
            <span className={styles.mark}>M</span>
            <span className={styles.brandText}>
              <span className={styles.brandName}>Mobin</span>
              <span className={styles.brandSub}>Bildschirmzeit</span>
            </span>
          </Link>
        </header>

        <section className={styles.main}>
          <div className={styles.wideCard}>
            <h1 className={styles.sectionTitle}>Bildschirmzeit</h1>
            <p className={styles.sectionText}>
              Platz fuer Bildschirm-Regeln, Zeiten, Pausen und Belohnungen.
              Die erste Version ist bewusst ruhig und gut erweiterbar.
            </p>
          </div>

          <nav className={styles.buttonField} aria-label="Weitere Seiten">
            <Link className={styles.glassButton} href="/mobin/routine" style={{ '--tilt': '-1.6deg', '--speed': '7.1s' }}>
              <span className={styles.buttonTitle}>Routine</span>
              <span className={styles.buttonMeta}>Lernen und Radfahren</span>
            </Link>
            <Link className={styles.glassButton} href="/mobin/tagebuch" style={{ '--tilt': '1.2deg', '--speed': '7.8s' }}>
              <span className={styles.buttonTitle}>Tagebuch</span>
              <span className={styles.buttonMeta}>Heute merken</span>
            </Link>
          </nav>
        </section>

        <footer className={styles.footer}>Zurueck zu <Link href="/mobin">Mobin</Link></footer>
      </div>
    </main>
  )
}
