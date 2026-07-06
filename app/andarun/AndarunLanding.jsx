'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'

import styles from './page.module.css'

const tiles = [
  { title: 'Routine', tone: 'sun', orbit: 'one', href: '#' },
  { title: 'ToDo', tone: 'moon', orbit: 'two', href: '/andarun/todo' },
  { title: 'Flashcards', tone: 'nova', orbit: 'three', href: '#' },
  { title: 'Finanzen', tone: 'aurora', orbit: 'four', href: '#' },
  { title: 'Gesundheit', tone: 'ember', orbit: 'five', href: '#' },
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
          <Link className={styles.loginLink} href="/andarun/login">Enter</Link>
        </div>

        <div className={styles.orbit} aria-hidden="true" />

        <div className={styles.tileLayer} aria-label="Private Bereiche">
          {tiles.map((tile, index) => (
            <Link
              className={`${styles.tile} ${styles[tile.tone]} ${styles[tile.orbit]}`}
              href={tile.href}
              style={{ '--delay': `${index * 90}ms`, '--depth': `${index + 1}` }}
              key={tile.title}
            >
              {tile.title}
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
