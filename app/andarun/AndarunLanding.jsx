'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import AndarunNav from './AndarunNav'
import styles from './page.module.css'

const spaces = [
  { number: '01', title: 'Routine',    description: 'Dein Rhythmus',     href: '/andarun/routine',    theme: 'cobalt', icon: 'sun'       },
  { number: '02', title: 'Aufgaben',   description: 'Klar im Blick',      href: '/andarun/todo',       theme: 'coral',  icon: 'check'     },
  { number: '03', title: 'Deutsch',    description: 'Jeden Tag weiter',    href: '/andarun/deutsch',    theme: 'lemon',  icon: 'type'      },
  { number: '04', title: 'Gesundheit', description: 'Körper im Blick',     href: '/andarun/gesundheit', theme: 'mint',   icon: 'heart'     },
  { number: '05', title: 'Finanzen',   description: 'Sicher planen',       href: '/andarun/finanz',     theme: 'cobalt', icon: 'chart'     },
  { number: '06', title: 'Dienste',    description: 'Dienstzeiten planen', href: '/andarun/dienste',    theme: 'mint',   icon: 'briefcase' },
  { number: '07', title: 'Befunde',    description: 'Fälle & Fragen',      href: '/andarun/befunde',    theme: 'coral',  icon: 'file'      },
  { number: '08', title: 'Immobilien', description: 'Finden & vergleichen', href: '/andarun/immobilien', theme: 'cobalt', icon: 'home'      },
]

function SpaceIcon({ name }) {
  if (name === 'sun') return <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="7"/><path d="M24 4v8M24 36v8M4 24h8M36 24h8M10 10l6 6M32 32l6 6M38 10l-6 6M16 32l-6 6"/></svg>
  if (name === 'check') return <svg viewBox="0 0 48 48" aria-hidden="true"><rect x="7" y="7" width="34" height="34" rx="3"/><path d="m15 24 6 6 13-14"/></svg>
  if (name === 'type') return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M9 12h30M15 36h18M24 12v24"/></svg>
  if (name === 'heart') return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 39S9 30 9 18a8 8 0 0 1 14-5 8 8 0 0 1 14 5c0 12-13 21-13 21Z"/><path d="M15 24h6l3-7 4 13 3-6h4"/></svg>
  if (name === 'briefcase') return <svg viewBox="0 0 48 48" aria-hidden="true"><rect x="7" y="14" width="34" height="25" rx="3"/><path d="M18 14v-3a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v3M7 24h34M21 24v4h6v-4"/></svg>
  if (name === 'file') return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M14 6h14l8 8v28H14Z"/><path d="M28 6v9h8M19 24h12M19 31h12M19 17h5"/></svg>
  if (name === 'home') return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="m6 23 18-15 18 15"/><path d="M10 20v20h28V20M19 40V28h10v12"/></svg>
  return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 40V27h8v13M20 40V18h8v22M32 40V8h8v32M5 40h38"/></svg>
}

export default function AndarunLanding() {
  const [revealedCards, setRevealedCards] = useState(new Set())
  const gridRef = useRef(null)

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('[data-ci]') || []
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) setRevealedCards(p => new Set([...p, e.target.dataset.ci]))
      }),
      { threshold: 0.1 }
    )
    cards.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <main className={styles.page}>
      <AndarunNav />

      <section className={styles.hero} aria-labelledby="andarun-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Dein Universum</p>
          <h1 id="andarun-title">Alles an<br/><em>einem Ort.</em></h1>
          <Link className={styles.launch} href="#spaces-title">Entdecken <span>↓</span></Link>
        </div>
        <div className={styles.heroArt} aria-hidden="true">
          <span className={styles.orbitOne} />
          <span className={styles.orbitTwo} />
          <span className={styles.coordinate}>47° 22′ 12″</span>
        </div>
      </section>

      <section className={styles.workspace} aria-labelledby="spaces-title">
        <div className={styles.sectionHead}>
          <div>
            <p className={styles.eyebrow}>Deine Welten</p>
            <h2 id="spaces-title">Wähle dein Ziel.</h2>
          </div>
          <p>08 Module</p>
        </div>

        <div className={styles.grid} ref={gridRef}>
          {spaces.map((space, i) => (
            <Link
              key={space.title}
              data-ci={String(i)}
              className={`${styles.card} ${styles[space.theme]} ${revealedCards.has(String(i)) ? styles.cardVisible : ''}`}
              style={{ '--delay': `${i * 0.08}s` }}
              href={space.href}
            >
              <div className={styles.cardTop}>
                <span className={styles.number}>{space.number}</span>
                <span className={styles.arrow} aria-hidden="true">↗</span>
              </div>
              <div className={styles.icon}><SpaceIcon name={space.icon} /></div>
              <div className={styles.cardCopy}>
                <h3>{space.title}</h3>
                <p>{space.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <p>ANDARUN <span>✦</span> PERSONAL SPACE</p>
        <span>2026</span>
      </footer>
    </main>
  )
}
