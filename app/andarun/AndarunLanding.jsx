'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'

import styles from './page.module.css'

const tiles = [
  { title: 'Routine', tone: 'sun', orbit: 'one' },
  { title: 'Planen', tone: 'moon', orbit: 'two' },
  { title: 'Flashcards', tone: 'nova', orbit: 'three' },
  { title: 'Finanzen', tone: 'aurora', orbit: 'four' },
  { title: 'Gesundheit', tone: 'ember', orbit: 'five' },
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
      <section className={styles.stage} aria-labelledby="andarun-title">
        <div className={styles.centerpiece}>
          <h1 id="andarun-title">Andarun</h1>
          <Link className={styles.loginLink} href="/andarun/login">Log in</Link>
        </div>

        <div className={styles.orbit} aria-hidden="true" />

        <div className={styles.tileLayer} aria-label="Private Bereiche">
          {tiles.map((tile, index) => (
            <button
              className={`${styles.tile} ${styles[tile.tone]} ${styles[tile.orbit]}`}
              style={{ '--delay': `${index * 90}ms`, '--depth': `${index + 1}` }}
              type="button"
              key={tile.title}
            >
              {tile.title}
            </button>
          ))}
        </div>
      </section>
    </main>
  )
}
