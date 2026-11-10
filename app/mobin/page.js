import Link from 'next/link'
import styles from './mobin.module.css'
import MobinStudyDashboard from './MobinStudyDashboard'

const pages = [
  {
    href: '/mobin/kaenguru',
    title: 'Känguru',
    iconPosition: '0%',
    tone: 'kangarooCard',
  },
  {
    href: '/mobin/tagesplan',
    title: 'Tagesplan',
    iconPosition: '33.333333%',
    tone: 'planCard',
  },
  {
    href: '/mobin/mathepruefung',
    title: 'Matheprüfung',
    iconPosition: '66.666667%',
    tone: 'mathCard',
  },
  {
    href: '/mobin/english',
    title: 'English',
    iconPosition: '100%',
    tone: 'englishCard',
  },
]

export const metadata = {
  title: 'Mobin',
  description: 'Mobins privater Bereich für Tagesplan, Ziele und die Vorbereitung auf die Matheprüfung.',
}

export default function MobinPage() {
  return (
    <main className={`${styles.shell} ${styles.homeShell}`}>
      <div className={`${styles.wrap} ${styles.homeWrap}`}>
        <section className={`${styles.main} ${styles.homeMain}`}>
          <div className={`${styles.hero} ${styles.homeHero}`}>
            <h1 className={styles.title}>Mobin</h1>
          </div>

          <MobinStudyDashboard />

          <nav className={`${styles.buttonField} ${styles.homePages}`} aria-label="Mobin Seiten">
            {pages.map((page) => (
              <Link
                className={`${styles.homeCard} ${styles[page.tone]}`}
                href={page.href}
                key={page.href}
              >
                <span className={styles.homeIcon} style={{ backgroundPosition: `${page.iconPosition} center` }} aria-hidden="true" />
                <span className={styles.buttonTitle}>{page.title}</span>
                <span className={styles.homeArrow} aria-hidden="true">›</span>
              </Link>
            ))}
          </nav>
        </section>

        <footer className={styles.footer}>Für Mobin gemacht.</footer>
      </div>
    </main>
  )
}
