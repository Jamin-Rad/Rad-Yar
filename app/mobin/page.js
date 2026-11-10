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
    href: '/mobin/kalender',
    title: 'Kalender',
    iconPosition: '66.666667%',
    tone: 'calendarCard',
  },
  {
    href: '/mobin/persisch',
    title: 'Persisch',
    iconPosition: '100%',
    tone: 'persianCard',
  },
]

const subjects = [
  ['NWT', '/mobin/fach/nwt', 'subjectBlue'],
  ['Physik', '/mobin/fach/physik', 'subjectViolet'],
  ['Biologie', '/mobin/fach/biologie', 'subjectGreen'],
  ['Geographie', '/mobin/fach/geographie', 'subjectAmber'],
  ['Sport', '/mobin/fach/sport', 'subjectCoral'],
  ['Spanisch', '/mobin/fach/spanisch', 'subjectRose'],
  ['Latein', '/mobin/fach/latein', 'subjectGold'],
  ['Französisch', '/mobin/fach/franzoesisch', 'subjectBlue'],
  ['Englisch', '/mobin/english', 'subjectTeal'],
  ['Mathe', '/mobin/mathepruefung', 'subjectPurple'],
  ['Reli', '/mobin/fach/religion', 'subjectPink'],
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
            <section className={styles.schoolCard} aria-labelledby="school-title">
              <Link className={styles.schoolTitleLink} href="/mobin/schule" id="school-title">
                <span className={styles.schoolTitle}>Schule</span>
                <span className={styles.homeArrow} aria-hidden="true">›</span>
              </Link>
              <nav className={styles.subjectLinks} aria-label="Schulfächer">
                {subjects.map(([title, href, tone]) => (
                  <Link className={`${styles.subjectLink} ${styles[tone]}`} href={href} key={title}>{title}</Link>
                ))}
              </nav>
            </section>
          </nav>
        </section>

        <footer className={styles.footer}>Für Mobin gemacht.</footer>
      </div>
    </main>
  )
}
