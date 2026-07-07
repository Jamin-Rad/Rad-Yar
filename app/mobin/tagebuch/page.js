import Link from 'next/link'
import styles from '../mobin.module.css'

export const metadata = {
  title: 'Mobin | Tagebuch',
}

export default function TagebuchPage() {
  return (
    <main className={styles.shell}>
      <div className={styles.wrap}>
        <header className={styles.topbar}>
          <Link className={styles.brand} href="/mobin">
            <span className={styles.mark}>M</span>
            <span className={styles.brandText}>
              <span className={styles.brandName}>Mobin</span>
              <span className={styles.brandSub}>Tagebuch</span>
            </span>
          </Link>
        </header>

        <section className={styles.main}>
          <div className={styles.wideCard}>
            <h1 className={styles.sectionTitle}>Tagebuch</h1>
            <p className={styles.sectionText}>
              Ein Ort fuer kleine Erinnerungen: Was war schoen, was war schwer,
              was soll morgen besser werden?
            </p>
          </div>

          <nav className={styles.buttonField} aria-label="Weitere Seiten">
            <Link className={styles.glassButton} href="/mobin/routine" style={{ '--tilt': '1.8deg', '--speed': '7.2s' }}>
              <span className={styles.buttonTitle}>Routine</span>
              <span className={styles.buttonMeta}>Heute anfangen</span>
            </Link>
            <Link className={styles.glassButton} href="/mobin/bildschirmzeit" style={{ '--tilt': '-1.3deg', '--speed': '8s' }}>
              <span className={styles.buttonTitle}>Bildschirmzeit</span>
              <span className={styles.buttonMeta}>Balance finden</span>
            </Link>
          </nav>
        </section>

        <footer className={styles.footer}>Zurueck zu <Link href="/mobin">Mobin</Link></footer>
      </div>
    </main>
  )
}
