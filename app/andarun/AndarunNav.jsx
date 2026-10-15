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
  const section = SECTIONS.find(([prefix]) => pathname === prefix || pathname.startsWith(`${prefix}/`))?.[1]
  return (
    <div className={styles.navSlot}>
      <header className={styles.navShell}>
        <nav className={styles.nav} aria-label="Jaminova">
          <div className={styles.identity}>
            <Link className={styles.brand} href="/andarun" aria-label="Jaminova Startseite">
              <span className={styles.brandMark} aria-hidden="true">J</span>
              <span className={styles.brandName}>Jaminova<span className={styles.brandDot} aria-hidden="true" /></span>
            </Link>
            {section ? <span className={styles.context} aria-label={`Aktueller Bereich: ${section}`}>{section}</span> : null}
          </div>
          <Link className={styles.homeLink} href="/andarun" aria-label="Jaminova Übersicht" aria-current={pathname === '/andarun' ? 'page' : undefined}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="3" width="6" height="6" rx="1"/><rect x="3" y="15" width="6" height="6" rx="1"/><rect x="15" y="15" width="6" height="6" rx="1"/></svg>
            <span>Übersicht</span>
          </Link>
        </nav>
      </header>
    </div>
  )
}
