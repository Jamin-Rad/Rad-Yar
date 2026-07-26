import Link from 'next/link'
import styles from './mobin.module.css'

const pages = [
  {
    href: '/mobin/tagesplan',
    title: 'Tagesplan',
    meta: 'Ziele planen, eintragen & auswerten',
    tilt: '-2.5deg',
    speed: '6.8s',
  },
]

export const metadata = {
  title: 'Mobin',
  description: 'Mobins privater Tagesplan für Ziele, Routinen und Fortschritt.',
}

export default function MobinPage() {
  return (
    <main className={styles.shell}>
      <div className={styles.wrap}>
        <header className={styles.topbar}>
          <Link className={styles.brand} href="/mobin" aria-label="Mobin Startseite">
            <span className={styles.mark}>M</span>
            <span className={styles.brandText}>
              <span className={styles.brandName}>Mobin</span>
              <span className={styles.brandSub}>Privates Sternenbuch</span>
            </span>
          </Link>
        </header>

        <section className={styles.main}>
          <div className={styles.hero}>
            <span className={styles.eyebrow}>Milchstraße und Andromeda</span>
            <h1 className={styles.title}>Mobin</h1>
            <p className={styles.lead}>
              Dein Platz im Universum für Ziele, Routinen und sichtbaren Fortschritt.
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
