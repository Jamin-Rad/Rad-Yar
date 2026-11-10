import Link from 'next/link'
import styles from './mobin.module.css'
import MobinStudyDashboard from './MobinStudyDashboard'

const pages = [
  {
    href: '/mobin/kaenguru',
    title: 'Känguru',
    meta: 'Mathe üben, auf Aufgaben schreiben & deine Lernserie wachsen lassen',
    tilt: '2deg',
    speed: '7.2s',
  },
  {
    href: '/mobin/tagesplan',
    title: 'Tagesplan',
    meta: 'Ziele planen, eintragen & auswerten',
    tilt: '-2.5deg',
    speed: '6.8s',
  },
  {
    href: '/mobin/mathepruefung',
    title: 'Matheprüfung',
    meta: 'Klasse 6 · Üben, testen & Fehler verstehen',
    tilt: '1.5deg',
    speed: '7.6s',
  },
  {
    href: '/mobin/english',
    title: 'English',
    meta: 'Vokabeltest am 11. November · Unit 2 London',
    tilt: '-1.5deg',
    speed: '7s',
    featured: true,
  },
]

export const metadata = {
  title: 'Mobin',
  description: 'Mobins privater Bereich für Tagesplan, Ziele und die Vorbereitung auf die Matheprüfung.',
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
            <h1 className={styles.title}>Mobin</h1>
          </div>

          <MobinStudyDashboard />

          <nav className={`${styles.buttonField} ${styles.homePages}`} aria-label="Mobin Seiten">
            {pages.map((page) => (
              <Link
                className={`${styles.glassButton} ${page.featured ? styles.englishButton : ''}`}
                href={page.href}
                key={page.href}
                style={{ '--tilt': page.tilt, '--speed': page.speed }}
              >
                <span className={styles.buttonTitle}>{page.title}</span>
                {page.featured && <span className={styles.examTag}>11 NOV · VOKABELTEST</span>}
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
