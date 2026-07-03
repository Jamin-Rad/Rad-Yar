'use client'

import { useRef, useState } from 'react'

import styles from './page.module.css'

const tiles = [
  { title: 'Routine', tone: 'amber' },
  { title: 'Planen', tone: 'blue' },
  { title: 'Flashcards', tone: 'violet' },
  { title: 'Finanzen', tone: 'green' },
  { title: 'Gesundheit', tone: 'rose' },
]

export default function AndarunLanding() {
  const pointerRef = useRef({ x: 0, y: 0 })
  const [pointerStyle, setPointerStyle] = useState({ '--mx': '0', '--my': '0' })

  function handlePointerMove(event) {
    const x = (event.clientX / window.innerWidth - 0.5) * 2
    const y = (event.clientY / window.innerHeight - 0.5) * 2
    pointerRef.current = { x, y }
    setPointerStyle({ '--mx': x.toFixed(3), '--my': y.toFixed(3) })
  }

  function handlePointerLeave() {
    pointerRef.current = { x: 0, y: 0 }
    setPointerStyle({ '--mx': '0', '--my': '0' })
  }

  return (
    <main
      className={styles.shell}
      style={pointerStyle}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <section className={styles.hero} aria-labelledby="andarun-title">
        <div className={styles.brandRow}>
          <span className={styles.mark}>A</span>
          <span>Andarun</span>
        </div>

        <div className={styles.copy}>
          <h1 id="andarun-title">Andarun</h1>
        </div>

        <div className={styles.tileGrid} aria-label="Private Bereiche">
          {tiles.map((tile, index) => (
            <article
              className={`${styles.tile} ${styles[tile.tone]}`}
              style={{ '--delay': `${index * 80}ms`, '--depth': `${index + 1}` }}
              key={tile.title}
            >
              <span className={styles.tileIndex}>{String(index + 1).padStart(2, '0')}</span>
              <h2>{tile.title}</h2>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
