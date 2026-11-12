import Link from 'next/link'
import styles from '../kalender/calendar.module.css'

export const metadata = { title: 'Stundenplan · Mobin' }

export default function StundenplanPage() {
  return <main className={styles.shell}>
    <div className={styles.wrap}>
      <Link className={styles.back} href="/mobin?bereich=1">← Mobin</Link>
      <header className={styles.header}><h1>Stundenplan</h1></header>
      <p className={styles.status}>Hier ist noch kein Stundenplan hinterlegt.</p>
    </div>
  </main>
}
