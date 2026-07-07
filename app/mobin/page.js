import Link from 'next/link'
import styles from './mobin.module.css'

const pages = [
  {
    href: '/mobin/routine',
    title: 'Routine',
    meta: 'Mathe, Englisch, Radfahren',
    tilt: '-2.5deg',
    speed: '6.8s',
  },
  {
    href: '/mobin/bildschirmzeit',
    title: 'Bildschirmzeit',
    meta: 'Ruhe, Regeln, gute Pausen',
    tilt: '1.7deg',
    speed: '7.4s',
  },
  {
    href: '/mobin/tagebuch',
    title: 'Tagebuch',
    meta: 'Gedanken, Sterne, kleine Siege',
    tilt: '-1.2deg',
    speed: '8.1s',
  },
]

export const metadata = {
  title: 'Mobin',
  description: 'Private Seite für Mobin mit Routine, Bildschirmzeit und Tagebuch.',
}

export default function MobinPage() {
  return (
    <main className={styles.shell}>
      <div className={styles.wrap}>
        <header className={styles.topbar}>
          <Link className={styles.brand} href="/mobin" aria-label="Mobin Startseite">
            <span className={styles.mark}>M</span>
          </Link>
        </header>

        <section className={styles.main}>
          <div className={styles.hero}>
            <span className={styles.eyebrow}>Milchstraße und Andromeda</span>
            <h1 className={styles.title}>Mobin</h1>
            <p className={styles.lead}>
              Ein kleiner Raum im Universum für Alltag, Lernen, Pausen und Geschichten.
            </p>
          </div>

          <nav className={styles.buttonField} aria-label="Mobin Seiten">
            {pages.map((page) => (
              <Link
                className={styles.glassButton}
                href={page.href}
                key={page.href}
                style={{ '--tilt': page.tilt, '--speed': page.speed }}
              >
                <span className={styles.buttonTitle}>{page.title}</span>
                <span className={styles.buttonMeta}>{page.meta}</span>
              </Link>
            ))}
          </nav>
        </section>

        <footer className={styles.footer}>Für Mobin gemacht.</footer>
      </div>
    </main>
  )
}
