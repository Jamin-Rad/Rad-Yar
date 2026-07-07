'use client'

import Link from 'next/link'
import styles from './page.module.css'

const tiles = [
  { title: 'Gesundheit', text: 'Kommt später', href: '#', tone: 'rose' },
  { title: 'ToDo', text: 'Gemeinsame Aufgaben und Termine', href: '/fatima/todo', tone: 'leaf' },
  { title: 'Deutschlernen', text: 'Gleiche Lektionen, eigener Fortschritt', href: '/fatima/deutsch', tone: 'sky' },
]

export default function FatimaLanding() {
  return (
    <main className={styles.shell}>
      <section className={styles.hero} aria-labelledby="fatima-title">
        <span>Privater Bereich</span>
        <h1 id="fatima-title">Fatima</h1>
        <p>Ein ruhiger Ort für Alltag, Lernen und Gesundheit.</p>
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
