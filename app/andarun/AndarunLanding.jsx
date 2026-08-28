'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import AndarunNav from './AndarunNav'
import styles from './page.module.css'

const spaces = [
  { number: '01', title: 'Routine',    description: 'Dein Rhythmus',     href: '/andarun/routine',    theme: 'cobalt', icon: 'sun'       },
  { number: '02', title: 'ToDos',      description: 'Klar im Blick',       href: '/andarun/todo',       theme: 'coral',  icon: 'check'     },
  { number: '03', title: 'Termine',    description: 'Zeit bewusst planen', href: '/andarun/termine',    theme: 'lemon',  icon: 'calendar'  },
  { number: '04', title: 'Deutsch',    description: 'Jeden Tag weiter',    href: '/andarun/deutsch',    theme: 'lemon',  icon: 'type'      },
  { number: '05', title: 'Gesundheit', description: 'Körper im Blick',     href: '/andarun/gesundheit', theme: 'mint',   icon: 'heart'     },
  { number: '06', title: 'Finanzen',   description: 'Sicher planen',       action: 'finance',            theme: 'cobalt', icon: 'chart'     },
  { number: '07', title: 'Dienste',    description: 'Dienstzeiten planen', href: '/andarun/dienste',    theme: 'mint',   icon: 'briefcase' },
  { number: '08', title: 'Befunde',    description: 'Fälle & Fragen',      href: '/andarun/befunde',    theme: 'coral',  icon: 'file'      },
]

const financeSpaces = [
  { title: 'Monatliche Ausgaben', description: 'Einnahmen, Fixkosten und Budgets im Blick.', href: '/andarun/finanz', icon: 'monthly' },
  { title: 'Urlaub', description: 'Reisekosten und Urlaubsbudget verwalten.', href: '/andarun/finanz?bereich=urlaub', icon: 'holiday' },
  { title: 'Familie Zia', description: 'Gemeinsam planen und den Überblick behalten.', href: '/andarun/finanz?bereich=familie', icon: 'family' },
  { title: 'DigitDA Unternehmen', description: 'Umsatz, Kosten und Gewinn des Unternehmens.', href: '/digitda', icon: 'company' },
]

function SpaceIcon({ name }) {
  if (name === 'sun') return <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="7"/><path d="M24 4v8M24 36v8M4 24h8M36 24h8M10 10l6 6M32 32l6 6M38 10l-6 6M16 32l-6 6"/></svg>
  if (name === 'check') return <svg viewBox="0 0 48 48" aria-hidden="true"><rect x="7" y="7" width="34" height="34" rx="3"/><path d="m15 24 6 6 13-14"/></svg>
  if (name === 'calendar') return <svg viewBox="0 0 48 48" aria-hidden="true"><rect x="7" y="10" width="34" height="31" rx="4"/><path d="M15 6v8M33 6v8M7 19h34M15 27h4M24 27h4M33 27h1M15 34h4M24 34h4"/></svg>
  if (name === 'type') return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M9 12h30M15 36h18M24 12v24"/></svg>
  if (name === 'heart') return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 39S9 30 9 18a8 8 0 0 1 14-5 8 8 0 0 1 14 5c0 12-13 21-13 21Z"/><path d="M15 24h6l3-7 4 13 3-6h4"/></svg>
  if (name === 'briefcase') return <svg viewBox="0 0 48 48" aria-hidden="true"><rect x="7" y="14" width="34" height="25" rx="3"/><path d="M18 14v-3a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v3M7 24h34M21 24v4h6v-4"/></svg>
  if (name === 'file') return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M14 6h14l8 8v28H14Z"/><path d="M28 6v9h8M19 24h12M19 31h12M19 17h5"/></svg>
  return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 40V27h8v13M20 40V18h8v22M32 40V8h8v32M5 40h38"/></svg>
}

function FinanceIcon({ name }) {
  if (name === 'monthly') return <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="17"/><path d="M24 7v17h17M14 35c3-4 7-7 10-11"/></svg>
  if (name === 'holiday') return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M7 24c5-11 29-11 34 0M24 13v22M13 24l3 11M35 24l-3 11M8 39h32"/><path d="M24 13c-5 2-8 6-8 11M24 13c5 2 8 6 8 11"/></svg>
  if (name === 'family') return <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="15" r="6"/><circle cx="10" cy="20" r="4"/><circle cx="38" cy="20" r="4"/><path d="M13 39v-5c0-6 5-10 11-10s11 4 11 10v5M3 39v-4c0-5 4-8 9-8M45 39v-4c0-5-4-8-9-8"/></svg>
  return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M7 41h34M11 41V18h10v23M27 41V7h10v34M15 23h2M15 29h2M15 35h2M31 13h2M31 19h2M31 25h2M31 31h2M31 37h2"/></svg>
}

export default function AndarunLanding() {
  const [revealedCards, setRevealedCards] = useState(new Set())
  const [financeOpen, setFinanceOpen] = useState(false)
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

  useEffect(() => {
    if (!financeOpen) return
    const previousOverflow = document.body.style.overflow
    const closeOnEscape = event => event.key === 'Escape' && setFinanceOpen(false)
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [financeOpen])

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
          {spaces.map((space, i) => {
            const CardTag = space.action === 'finance' ? 'button' : Link
            return <CardTag
              key={space.title}
              data-ci={String(i)}
              className={`${styles.card} ${styles[space.theme]} ${revealedCards.has(String(i)) ? styles.cardVisible : ''}`}
              style={{ '--delay': `${i * 0.08}s` }}
              href={space.href}
              type={space.action === 'finance' ? 'button' : undefined}
              onClick={space.action === 'finance' ? () => setFinanceOpen(true) : undefined}
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
            </CardTag>
          })}
        </div>
      </section>

      {financeOpen ? (
        <div className={styles.financeOverlay} role="presentation" onMouseDown={event => event.target === event.currentTarget && setFinanceOpen(false)}>
          <section className={styles.financeModal} role="dialog" aria-modal="true" aria-labelledby="finance-dialog-title">
            <div className={styles.financeModalHead}>
              <div>
                <p>Finanzen</p>
                <h2 id="finance-dialog-title">Wohin möchtest du?</h2>
              </div>
              <button className={styles.financeClose} type="button" onClick={() => setFinanceOpen(false)} aria-label="Dialog schließen">
                <span aria-hidden="true" />
                <span aria-hidden="true" />
              </button>
            </div>
            <div className={styles.financeChoices}>
              {financeSpaces.map((item, index) => (
                <Link className={styles.financeChoice} href={item.href} key={item.title}>
                  <span className={styles.financeChoiceIndex}>0{index + 1}</span>
                  <span className={styles.financeChoiceIcon}><FinanceIcon name={item.icon} /></span>
                  <span className={styles.financeChoiceCopy}>
                    <strong>{item.title}</strong>
                    <small>{item.description}</small>
                  </span>
                  <span className={styles.financeChoiceArrow} aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      ) : null}

      <footer className={styles.footer}>
        <p>ANDARUN <span>✦</span> PERSONAL SPACE</p>
        <span>2026</span>
      </footer>
    </main>
  )
}
