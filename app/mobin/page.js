import Link from 'next/link'
import styles from './mobin.module.css'
import MobinStudyDashboard from './MobinStudyDashboard'
import { MobinEntry } from './MobinStudyGoal'

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
  { href: '/mobin/spanisch', title: 'Spanisch', iconPosition: '100%', flag: '/mobin/flag-es.svg', tone: 'spanishCard' },
  { href: '/mobin/stundenplan', title: 'Stundenplan', schedule: true, tone: 'scheduleCard' },
]

const subjects = [
  ['NWT', '/mobin/fach/nwt', 'subjectBlueGreen'],
  ['Physik', '/mobin/fach/physik', 'subjectBlue'],
  ['Biologie', '/mobin/fach/biologie', 'subjectGreen'],
  ['Geographie', '/mobin/fach/geographie', 'subjectAmber'],
  ['Sport', '/mobin/fach/sport', 'subjectCoral'],
  ['Latein', '/mobin/fach/latein', 'subjectRoyal'],
  ['Französisch', '/mobin/fach/franzoesisch', 'subjectBlue'],
  ['Englisch', '/mobin/fach/englisch', 'subjectTeal'],
  ['Mathe', '/mobin/fach/mathe', 'subjectBlueGreen'],
  ['Reli', '/mobin/fach/religion', 'subjectPink'],
]

export const metadata = {
  title: 'Mobin',
  description: 'Mobins privater Bereich für Tagesplan, Ziele und die Vorbereitung auf die Matheprüfung.',
}

export default async function MobinPage({ searchParams }) {
  const query = await searchParams
  return <MobinEntry initiallyEntered={query?.bereich === '1' && query?.lernziel !== '1'}><MobinHome /></MobinEntry>
}

function MobinHome() {
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
                {page.schedule ? <span className={styles.scheduleIcon} aria-hidden="true"><i /><i /><i /><i /><i /><i /></span>
                  : <span className={styles.homeIcon} style={{ backgroundPosition: page.iconPosition + ' center' }} aria-hidden="true">
                    {page.flag && <span className={styles.flagFace}><img src={page.flag} alt="" /></span>}
                  </span>}
                <span className={styles.buttonTitle}>{page.title}</span>
                <span className={styles.homeArrow} aria-hidden="true">›</span>
              </Link>
            ))}
          </nav>
          <section className={styles.schoolCard} aria-labelledby="school-title">
              <Link className={styles.schoolTitleLink} href="/mobin/schule" id="school-title">
                <span className={styles.schoolMark} aria-hidden="true">▤</span><span className={styles.schoolTitle}>Schule</span>
                <span className={styles.homeArrow} aria-hidden="true">›</span>
              </Link>
              <nav className={styles.subjectLinks} aria-label="Schulfächer">
                {subjects.map(([title, href, tone]) => (
                  <Link className={`${styles.subjectLink} ${styles[tone]}`} href={href} key={title}>{title}</Link>
                ))}
              </nav>
          </section>
        </section>

        <footer className={styles.footer}>Für Mobin gemacht. · <a href="/mobin?lernziel=1">Lernfortschritt</a></footer>
      </div>
    </main>
  )
}
