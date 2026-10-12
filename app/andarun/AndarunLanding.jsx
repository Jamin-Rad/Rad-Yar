'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { ANDARUN_HOME_GROUPS, ANDARUN_DAILY_ACTIONS } from '@/data/andarunHome'
import styles from './page.module.css'

const financeSpaces = [
  { title: 'Monatliche Ausgaben', description: 'Einnahmen, Fixkosten und Budgets im Blick.', href: '/andarun/finanz', icon: 'monthly' },
  { title: 'کمک به زندانیان', description: 'نیازها، کمک‌های ثبت‌شده و تأیید واریز.', href: '/andarun/finanz/gefangene', icon: 'help' },
  { title: 'Urlaub', description: 'Reisen, Kosten und Erinnerungen verwalten.', href: '/andarun/urlaub', icon: 'holiday' },
  { title: 'حساب‌های مالی دوستان', description: 'بدهکاری، بستانکاری و گردش حساب مشترک.', href: '/andarun/finanz/freunde', icon: 'family' },
  { title: 'DigitDA Unternehmen', description: 'Umsatz, Kosten und Gewinn des Unternehmens.', href: '/digitda', icon: 'company' },
]

function SpaceIcon({ name }) {
  if (name === 'sun') return <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="7"/><path d="M24 4v8M24 36v8M4 24h8M36 24h8M10 10l6 6M32 32l6 6M38 10l-6 6M16 32l-6 6"/></svg>
  if (name === 'check') return <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="17"/><path d="m15 24 6 6 13-14"/></svg>
  if (name === 'calendar') return <svg viewBox="0 0 48 48" aria-hidden="true"><rect x="7" y="10" width="34" height="31" rx="4"/><path d="M15 6v8M33 6v8M7 19h34"/></svg>
  if (name === 'book') return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 11c-5-5-13-5-19-2v30c6-3 14-3 19 2 5-5 13-5 19-2V9c-6-3-14-3-19 2Zm0 0v30"/></svg>
  if (name === 'heart') return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 39S9 30 9 18a8 8 0 0 1 14-5 8 8 0 0 1 14 5c0 12-13 21-13 21Z"/></svg>
  if (name === 'pill') return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M13 35a9 9 0 0 1 0-13L24 11a9 9 0 0 1 13 13L26 35a9 9 0 0 1-13 0Z"/><path d="m18 17 13 13"/></svg>
  if (name === 'coins') return <svg viewBox="0 0 48 48" aria-hidden="true"><ellipse cx="18" cy="18" rx="12" ry="5"/><path d="M6 18v18c0 7 24 7 24 0V18M6 24c0 7 24 7 24 0M6 30c0 7 24 7 24 0"/><path d="M24 9c0-7 18-7 18 0v19c0 4-7 6-12 5M24 9c0 6 18 6 18 0M30 17c5 1 12-1 12-4M30 25c5 1 12-1 12-4"/></svg>
  if (name === 'briefcase') return <svg viewBox="0 0 48 48" aria-hidden="true"><rect x="7" y="14" width="34" height="25" rx="3"/><path d="M18 14v-3a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v3M7 24h34M21 24v4h6v-4"/></svg>
  if (name === 'file') return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M14 6h14l8 8v28H14Z"/><path d="M28 6v9h8M19 24h12M19 31h12M19 17h5"/></svg>
  if (name === 'test') return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M18 6h12M21 6v11L10 36a4 4 0 0 0 3.5 6h21a4 4 0 0 0 3.5-6L27 17V6"/><path d="M15 31h18M19 26h10"/></svg>
  return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 40V27h8v13M20 40V18h8v22M32 40V8h8v32M5 40h38"/></svg>
}

function FinanceIcon({ name }) {
  if (name === 'help') return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 39S9 30 9 18a8 8 0 0 1 14-5 8 8 0 0 1 14 5c0 12-13 21-13 21Z"/><path d="M17 24h14M24 17v14"/></svg>
  if (name === 'monthly') return <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="17"/><path d="M24 7v17h17M14 35c3-4 7-7 10-11"/></svg>
  if (name === 'holiday') return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M7 24c5-11 29-11 34 0M24 13v22M13 24l3 11M35 24l-3 11M8 39h32"/><path d="M24 13c-5 2-8 6-8 11M24 13c5 2 8 6 8 11"/></svg>
  if (name === 'family') return <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="15" r="6"/><circle cx="10" cy="20" r="4"/><circle cx="38" cy="20" r="4"/><path d="M13 39v-5c0-6 5-10 11-10s11 4 11 10v5M3 39v-4c0-5 4-8 9-8M45 39v-4c0-5-4-8-9-8"/></svg>
  return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M7 41h34M11 41V18h10v23M27 41V7h10v34M15 23h2M15 29h2M15 35h2M31 13h2M31 19h2M31 25h2M31 31h2M31 37h2"/></svg>
}

export default function AndarunLanding() {
  const [financeOpen, setFinanceOpen] = useState(false)
  const financeRef = useRef(null)

  useEffect(() => {
    if (!financeOpen) return
    const previousOverflow = document.body.style.overflow
    const previousFocus = document.activeElement
    const handleKey = event => {
      if (event.key === 'Escape') setFinanceOpen(false)
      if (event.key !== 'Tab') return
      const elements = financeRef.current?.querySelectorAll('button, a[href]')
      if (!elements?.length) return
      const first = elements[0]
      const last = elements[elements.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    document.body.style.overflow = 'hidden'
    financeRef.current?.querySelector('button')?.focus()
    document.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKey)
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus()
    }
  }, [financeOpen])

  return (
    <main className={styles.page} lang="de" dir="ltr" data-andarun-home>
      <div className={styles.galaxyArtwork} aria-hidden="true"><Image src="/andarun-galaxy-dashboard.png" alt="" fill sizes="100vw" priority /></div>
      <div className={styles.shell}>
        <header className={styles.homeHeader}><Link href="/andarun" aria-label="Andarun Startseite">ANDARUN</Link></header>
        <section className={styles.welcome} aria-labelledby="andarun-title">
          <h1 id="andarun-title">Dein persönlicher Raum.</h1>
          <p>Alles, was dir wichtig ist, an einem Ort.</p>
        </section>
        <div className={styles.dashboard}>
          <section className={styles.dailyPanel} aria-labelledby="today-title">
            <header className={styles.dailyHeading}><h2 id="today-title">Heute</h2><p>Dein Tag, in deinem Tempo.</p></header>
            <div className={styles.dailyActions}>
              {ANDARUN_DAILY_ACTIONS.map(action => <Link key={action.href} href={action.href} aria-label={action.label} className={`${styles.dailyAction} ${styles[action.tone]}`}>
                <span className={styles.dailyIcon}><SpaceIcon name={action.icon} /></span>
                <span className={styles.dailyCopy}><h3>{action.title}</h3><p>{action.description}</p></span>
                <span className={styles.dailyButton}>{action.label}<ChevronIcon /></span>
              </Link>)}
            </div>
          </section>
          <aside className={styles.directory} aria-labelledby="all-sections-title">
            <header className={styles.directoryHeading}><h2 id="all-sections-title">Alle Bereiche</h2><p>Deine Module in ANDARUN.</p></header>
            {ANDARUN_HOME_GROUPS.map(group => <nav key={group.id} className={`${styles.group} ${styles[group.tone]}`} aria-labelledby={`group-${group.id}`}>
              <h3 id={`group-${group.id}`}>{group.title}</h3>
              <ul>{group.items.map(item => <li key={item.title}>
                {item.action === 'finance' ? <button type="button" className={styles.directoryLink} onClick={() => setFinanceOpen(true)} aria-haspopup="dialog" aria-expanded={financeOpen}>
                  <SpaceIcon name={item.icon}/><span>{item.title}</span><ChevronIcon />
                </button> : <Link href={item.href} className={`${styles.directoryLink} ${item.tone ? styles[item.tone] : ''}`}>
                  <SpaceIcon name={item.icon}/><span>{item.title}</span><ChevronIcon />
                </Link>}
              </li>)}</ul>
            </nav>)}
          </aside>
        </div>
        <footer className={styles.footer}>ANDARUN · PERSONAL SPACE</footer>
      </div>

      {financeOpen ? (
        <div className={styles.financeOverlay} role="presentation" onMouseDown={event => event.target === event.currentTarget && setFinanceOpen(false)}>
          <section ref={financeRef} className={styles.financeModal} role="dialog" aria-modal="true" aria-labelledby="finance-dialog-title">
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
                  <span className={styles.financeChoiceCopy} lang={/[\u0600-\u06ff]/.test(item.title) ? 'fa' : 'de'}>
                    <strong>{item.title}</strong>
                    <small>{item.description}</small>
                  </span>
                  <span className={styles.financeChoiceArrow}><ChevronIcon /></span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      ) : null}

    </main>
  )
}

function ChevronIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg>
}
