import Link from 'next/link'
import styles from './mobin.module.css'
import MobinStudyDashboard from './MobinStudyDashboard'

const pages = [
  {
    href: '/mobin/kaenguru',
    title: 'Känguru',
    icon: '🦘',
    tone: 'kangarooCard',
  },
  {
    href: '/mobin/tagesplan',
    title: 'Tagesplan',
    icon: '▣',
    tone: 'planCard',
  },
  {
    href: '/mobin/mathepruefung',
    title: 'Matheprüfung',
    icon: '▦',
    tone: 'mathCard',
  },
  {
    href: '/mobin/english',
    title: 'English',
    icon: '🇬🇧',
    tone: 'englishCard',
  },
]

export const metadata = {
  title: 'Mobin',
  description: 'Mobins privater Bereich für Tagesplan, Ziele und die Vorbereitung auf die Matheprüfung.',
}

export default function MobinPage() {
  return (
    <main className={styles.shell}>
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
                <span className={styles.homeIcon} aria-hidden="true">{page.icon}</span>
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
