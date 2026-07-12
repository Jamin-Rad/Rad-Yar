'use client'

import Link from 'next/link'
import styles from './page.module.css'

const spaces = [
  {
    number: '01',
    title: 'Routine',
    description: 'Rituale, die den Alltag leichter machen.',
    href: '/andarun/routine',
    theme: 'cobalt',
    icon: 'sun',
  },
  {
    number: '02',
    title: 'Aufgaben',
    description: 'Klarer Kopf. Alles Wichtige an einem Ort.',
    href: '/andarun/todo',
    theme: 'coral',
    icon: 'check',
  },
  {
    number: '03',
    title: 'Deutsch',
    description: 'Jeden Tag ein kleines Stück sicherer.',
    href: '/andarun/deutsch',
    theme: 'lemon',
    icon: 'type',
  },
  {
    number: '04',
    title: 'Finanzen',
    description: 'Überblick behalten, entspannt vorausplanen.',
    href: '/andarun/finanz',
    theme: 'mint',
    icon: 'chart',
  },
]

function SpaceIcon({ name }) {
  if (name === 'sun') return (
    <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="7"/><path d="M24 4v8M24 36v8M4 24h8M36 24h8M10 10l6 6M32 32l6 6M38 10l-6 6M16 32l-6 6"/></svg>
  )
  if (name === 'check') return (
    <svg viewBox="0 0 48 48" aria-hidden="true"><rect x="7" y="7" width="34" height="34" rx="3"/><path d="m15 24 6 6 13-14"/></svg>
  )
  if (name === 'type') return (
    <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M9 12h30M15 36h18M24 12v24"/></svg>
  )
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 40V27h8v13M20 40V18h8v22M32 40V8h8v32M5 40h38"/></svg>
  )
}

export default function AndarunLanding() {
  return (
    <main className={styles.page}>
      <header className={styles.nav}>
        <Link className={styles.brand} href="/andarun" aria-label="Andarun Startseite">
          <span className={styles.brandMark}>A</span>
          <span>ANDARUN</span>
        </Link>
        <div className={styles.navRight}>
          <span className={styles.privateLabel}><i /> Privater Raum</span>
          <Link className={styles.login} href="/andarun/login">
            Anmelden <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </header>

      <section className={styles.hero} aria-labelledby="andarun-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Dein persönlicher Raum</p>
          <h1 id="andarun-title">Das Leben,<br/><em>gut sortiert.</em></h1>
          <p className={styles.intro}>Ein ruhiger Ort für alles, was deinen Alltag bewegt – von kleinen Gewohnheiten bis zu großen Plänen.</p>
        </div>

        <div className={styles.heroArt} aria-hidden="true">
          <div className={styles.blueShape} />
          <div className={styles.sunShape} />
          <div className={styles.archShape} />
          <span className={styles.sparkOne}>✦</span>
          <span className={styles.sparkTwo}>✦</span>
          <p>MAKE SPACE<br/>FOR WHAT<br/><b>MATTERS</b></p>
        </div>
      </section>

      <section className={styles.workspace} aria-labelledby="spaces-title">
        <div className={styles.sectionHead}>
          <div>
            <p className={styles.eyebrow}>Arbeitsbereiche</p>
            <h2 id="spaces-title">Wo möchtest du anfangen?</h2>
          </div>
          <p>Vier Bereiche.<br/>Ein gutes Gefühl.</p>
        </div>

        <div className={styles.grid}>
          {spaces.map((space) => (
            <Link className={`${styles.card} ${styles[space.theme]}`} href={space.href} key={space.title}>
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
        <p>ANDARUN <span>—</span> DEIN ALLTAG, DEIN RHYTHMUS.</p>
        <span>Mit Ruhe gemacht · 2026</span>
      </footer>
    </main>
  )
}
