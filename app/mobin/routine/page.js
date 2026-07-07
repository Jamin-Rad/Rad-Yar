import Link from 'next/link'
import styles from '../mobin.module.css'

const tasks = [
  { title: 'Mathe', text: 'Kurze Aufgaben, klare Schritte, jeden Tag ein bisschen.', tilt: '-1.8deg' },
  { title: 'Englisch', text: 'Woerter, Saetze und kleine Geschichten zum Ueben.', tilt: '1.4deg' },
  { title: 'Radfahren', text: 'Bewegung, Gleichgewicht und frische Luft.', tilt: '-.9deg' },
]

export const metadata = {
  title: 'Mobin | Routine',
}

export default function RoutinePage() {
  return (
    <main className={styles.shell}>
      <div className={styles.wrap}>
        <header className={styles.topbar}>
          <Link className={styles.brand} href="/mobin">
            <span className={styles.mark}>M</span>
            <span className={styles.brandText}>
              <span className={styles.brandName}>Mobin</span>
              <span className={styles.brandSub}>Routine</span>
            </span>
          </Link>
          <nav className={styles.nav} aria-label="Mobin Navigation">
            <Link className={styles.glassButton} href="/mobin/bildschirmzeit" style={{ '--tilt': '1.2deg', '--speed': '8s' }}>
              <span className={styles.buttonTitle}>Bildschirmzeit</span>
              <span className={styles.buttonMeta}>Pausen</span>
            </Link>
            <Link className={styles.glassButton} href="/mobin/tagebuch" style={{ '--tilt': '-1.4deg', '--speed': '7.3s' }}>
              <span className={styles.buttonTitle}>Tagebuch</span>
              <span className={styles.buttonMeta}>Notizen</span>
            </Link>
          </nav>
        </header>

        <section className={styles.main}>
          <div className={styles.wideCard}>
            <h1 className={styles.sectionTitle}>Routine</h1>
            <p className={styles.sectionText}>
              Drei kleine Bereiche fuer den Tag. Spaeter koennen hier Checklisten,
              Punkte oder Wochenplaene dazukommen.
            </p>
            <div className={styles.routineGrid}>
              {tasks.map((task) => (
                <article className={styles.task} key={task.title} style={{ '--tilt': task.tilt }}>
                  <h2>{task.title}</h2>
                  <p>{task.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <footer className={styles.footer}>Zurueck zu <Link href="/mobin">Mobin</Link></footer>
      </div>
    </main>
  )
}
