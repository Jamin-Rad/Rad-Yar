import Link from 'next/link'
import styles from './mobin.module.css'
import { ArrowIcon } from './mathepruefung/MathQuestion'

export default function PlaceholderPage({ title, description = 'Dieser Bereich wird gerade vorbereitet.' }) {
  return (
    <main className={`${styles.shell} ${styles.homeShell}`}>
      <div className={`${styles.wrap} ${styles.homeWrap}`}>
        <section className={styles.placeholderPage}>
          <Link className={styles.placeholderBack} href="/mobin?bereich=1"><ArrowIcon back /> Zurück</Link>
          <div className={styles.placeholderContent}>
            <span className={styles.placeholderMark} aria-hidden="true" />
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
        </section>
      </div>
    </main>
  )
}
