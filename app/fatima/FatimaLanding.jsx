'use client'

import Link from 'next/link'
import styles from './page.module.css'

const tiles = [
  { title: 'Gesundheit', text: 'Sanfte Erinnerungen fuer dich', href: '/fatima/gesundheit', tone: 'rose' },
  { title: 'ToDo', text: 'Gemeinsame Aufgaben und kleine Plaene', href: '/fatima/todo', tone: 'peach' },
  { title: 'Deutschlernen', text: 'Lernen in deinem eigenen Tempo', href: '/fatima/deutsch', tone: 'sky' },
]

export default function FatimaLanding() {
  return (
    <main className={styles.shell}>
      <div className={styles.hearts} aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>

      <section className={styles.hero} aria-labelledby="fatima-title">
        <span>Privater Lieblingsort</span>
        <h1 id="fatima-title">Fatima</h1>
        <p>Ein warmer Ort fuer deine Tage, kleine Schritte, Plaene und alles, was dir gut tut.</p>
      </section>

      <section className={styles.tileGrid} aria-label="Fatima Bereiche">
        {tiles.map(tile => (
          <Link className={`${styles.tile} ${styles[tile.tone]}`} href={tile.href} key={tile.title}>
            <small>{tile.text}</small>
            <strong>{tile.title}</strong>
          </Link>
        ))}
      </section>
    </main>
  )
}
