import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { hasMobinSession } from '@/lib/mobinAuth'
import styles from './mobin.module.css'
import MobinStudyDashboard from './MobinStudyDashboard'
import MobinStudyGoal from './MobinStudyGoal'

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
  ['NWT', '/mobin/fach/nwt', 'subjectBlueGreen'],
  ['Physik', '/mobin/fach/physik', 'subjectBlue'],
  ['Biologie', '/mobin/fach/biologie', 'subjectGreen'],
  ['Geographie', '/mobin/fach/geographie', 'subjectAmber'],
  ['Sport', '/mobin/fach/sport', 'subjectCoral'],
  ['Spanisch', '/mobin/fach/spanisch', 'subjectRose'],
  ['Latein', '/mobin/fach/latein', 'subjectRoyal'],
  ['Französisch', '/mobin/fach/franzoesisch', 'subjectBlue'],
  ['Englisch', '/mobin/english', 'subjectTeal'],
  ['Mathe', '/mobin/mathepruefung', 'subjectBlueGreen'],
  ['Reli', '/mobin/fach/religion', 'subjectPink'],
]

export const metadata = {
  title: 'Mobin',
  description: 'Mobins privater Bereich für Tagesplan, Ziele und die Vorbereitung auf die Matheprüfung.',
}

const goalCookie = 'mobin_study_goal_100_confirmed'

async function confirmStudyGoal() {
  'use server'

  if (!(await hasMobinSession())) redirect('/mobin/login')
  const cookieStore = await cookies()
  cookieStore.set(goalCookie, '1', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/mobin',
    maxAge: 365 * 24 * 60 * 60,
  })
  redirect('/mobin')
}

export default async function MobinPage({ searchParams }) {
  const [cookieStore, params] = await Promise.all([cookies(), searchParams])
  const confirmed = cookieStore.get(goalCookie)?.value === '1'
  if (!confirmed || params?.lernziel === '1') {
    return (
      <MobinStudyGoal>
        {confirmed ? <Link href="/mobin">Zu Mobin</Link> : (
          <form action={confirmStudyGoal}>
            <button type="submit">Ziel bestätigen <span aria-hidden="true">→</span></button>
          </form>
        )}
      </MobinStudyGoal>
    )
  }

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

        <footer className={styles.footer}>Für Mobin gemacht. · <Link href="/mobin?lernziel=1">Lernfortschritt</Link></footer>
      </div>
    </main>
  )
}
