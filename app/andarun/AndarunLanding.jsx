'use client'

import { useEffect, useRef, useState } from 'react'

import styles from './page.module.css'

const tiles = [
  {
    title: 'Routine',
    description: 'Tägliche Gewohnheiten, kleine Checks und wiederkehrende private Abläufe.',
    tone: 'amber',
  },
  {
    title: 'Planen',
    description: 'Heute, Woche, Monat und wichtige Entscheidungen an einem ruhigen Ort.',
    tone: 'blue',
  },
  {
    title: 'Flashcards',
    description: 'Eigene Karten für Familie, Sprache, Lernen und persönliche Themen.',
    tone: 'violet',
  },
  {
    title: 'Finanzen',
    description: 'Private Übersicht für Budget, Ausgaben und kommende Fixpunkte.',
    tone: 'green',
  },
  {
    title: 'Gesundheit',
    description: 'Kalorien, Sport, Wohlbefinden und Verlauf als persönliche Spur.',
    tone: 'rose',
  },
]

function Starfield({ pointer }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')
    let animationFrame = 0
    let width = 0
    let height = 0
    let stars = []

    function resize() {
      const scale = window.devicePixelRatio || 1
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * scale)
      canvas.height = Math.floor(height * scale)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(scale, 0, 0, scale, 0, 0)
      stars = Array.from({ length: Math.min(220, Math.floor((width * height) / 5200)) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.7 + 0.25,
        alpha: Math.random() * 0.65 + 0.2,
        speed: Math.random() * 0.18 + 0.04,
      }))
    }

    function render() {
      context.clearRect(0, 0, width, height)
      const driftX = pointer.current.x * 18
      const driftY = pointer.current.y * 12

      stars.forEach(star => {
        star.y += star.speed
        if (star.y > height + 8) {
          star.y = -8
          star.x = Math.random() * width
        }

        const x = star.x + driftX * star.radius
        const y = star.y + driftY * star.radius
        context.beginPath()
        context.arc(x, y, star.radius, 0, Math.PI * 2)
        context.fillStyle = `rgba(255, 255, 255, ${star.alpha})`
        context.fill()
      })

      animationFrame = requestAnimationFrame(render)
    }

    resize()
    render()
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
    }
  }, [pointer])

  return <canvas ref={canvasRef} className={styles.starfield} aria-hidden="true" />
}

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
      <Starfield pointer={pointerRef} />
      <div className={styles.nebula} aria-hidden="true" />
      <section className={styles.hero} aria-labelledby="andarun-title">
        <div className={styles.brandRow}>
          <span className={styles.mark}>A</span>
          <span>Andarun</span>
        </div>

        <div className={styles.copy}>
          <p className={styles.kicker}>Private Space</p>
          <h1 id="andarun-title">Ein stiller Ort für alles, was nur euch gehört.</h1>
          <p className={styles.lead}>
            Routine, Planung, Flashcards, Finanzen und Gesundheit kommen hier später in einen eigenen Familienbereich.
          </p>
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
              <p>{tile.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
