'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './AndarunNav.module.css'

const SECTIONS = [
  ['/andarun/finanz', 'Finanzen'], ['/andarun/urlaub', 'Urlaub'],
  ['/andarun/routine', 'Routine'], ['/andarun/todo', 'ToDos'],
  ['/andarun/termine', 'Termine'], ['/andarun/deutsch', 'Deutsch'],
  ['/andarun/gesundheit', 'Gesundheit'], ['/andarun/dienste', 'Dienste'],
  ['/andarun/befunde', 'Befunde'], ['/andarun/medikamente', 'Medikamente'],
  ['/andarun/test2', 'Test 2'], ['/andarun/test', 'Test'],
]

export default function AndarunNav() {
  const pathname = usePathname() || ''
  // The finance workspace has its own navigation and home link.
  if (pathname === '/andarun/finanz') return null
  const section = SECTIONS.find(([prefix]) => pathname === prefix || pathname.startsWith(`${prefix}/`))?.[1]
  return (
    <div className={styles.navSlot}>
      <header className={styles.navShell} dir="ltr">
        <nav className={styles.nav} aria-label="Jaminova">
          <Link className={styles.brand} href="/andarun" aria-label="Jaminova Startseite">
            <span className={styles.brandName}>Jaminova</span>
            <svg className={styles.sparkle} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0c1.3 9 3 10.7 12 12-9 1.3-10.7 3-12 12C10.7 15 9 13.3 0 12c9-1.3 10.7-3 12-12Z" /></svg>
          </Link>
          {section ? <span className={styles.context} aria-label={`Aktueller Bereich: ${section}`}>{section}</span> : null}
          <Link className={styles.homeLink} href="/andarun" aria-label="Jaminova Übersicht" aria-current={pathname === '/andarun' ? 'page' : undefined}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 10h14v11h-5v-7h-4v7H5Z" fill="#e8cc8f"/><path d="m12 2 11 10h-4l-7-6-7 6H1Z" fill="#f4dca4"/></svg>
            <span>Übersicht</span>
          </Link>
        </nav>
      </header>
    </div>
  )
}
