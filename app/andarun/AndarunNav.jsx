'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './AndarunNav.module.css'

const SECTIONS = [
  ['/andarun/finanz/freunde', 'Konten mit Freunden'],
  ['/andarun/finanz/gefangene', 'Hilfe'],
  ['/andarun/finanz', 'Finanzen'], ['/andarun/urlaub', 'Urlaub'],
  ['/andarun/routine', 'Routine'], ['/andarun/todo', 'ToDos'],
  ['/andarun/termine', 'Termine'], ['/andarun/deutsch', 'Deutsch'],
  ['/andarun/gesundheit', 'Gesundheit'], ['/andarun/dienste', 'Dienste'],
  ['/andarun/befundtimer', 'Befundtimer'], ['/andarun/befunde', 'Fallsammlung'], ['/andarun/medikamente', 'Medikamente'],
  ['/andarun/test2', 'Test 2'], ['/andarun/test', 'Test'],
]

const SURFACES = [
  ['/andarun/finanz/freunde', 'friends'],
  ['/andarun/finanz/gefangene', 'aid'],
  ['/andarun/finanz', 'finance'],
  ['/andarun/medikamente', 'medication'],
  ['/andarun/urlaub', 'vacation'],
  ['/andarun/gesundheit', 'health'],
  ['/andarun/deutsch', 'german'],
  ['/andarun/dienste', 'work'],
  ['/andarun/befundtimer', 'work'], ['/andarun/befunde', 'collection'],
  ['/andarun/test', 'learning'],
]

const matchesPath = (pathname, prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)

export default function AndarunNav() {
  const pathname = usePathname() || ''
  // The learning preview belongs to RadYar and uses its original site navbar.
  if (matchesPath(pathname, '/andarun/test')) return null
  // The English app provides its own navigation and return link.
  if (matchesPath(pathname, '/andarun/english')) return null
  const isHome = pathname === '/andarun'
  const section = SECTIONS.find(([prefix]) => matchesPath(pathname, prefix))?.[1]
  const surface = SURFACES.find(([prefix]) => matchesPath(pathname, prefix))?.[1] || 'home'
  return (
    <header className={styles.navShell} data-jaminova-header data-surface={surface} dir="ltr">
      <nav className={styles.nav} aria-label="Jaminova">
        <div className={styles.brandGroup}>
          <Link className={styles.brand} href="/andarun" aria-label="Jaminova Startseite" aria-current={isHome ? 'page' : undefined}>
            <span className={styles.brandName}>Jaminova</span>
            <svg className={styles.sparkle} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0c1.3 9 3 10.7 12 12-9 1.3-10.7 3-12 12C10.7 15 9 13.3 0 12c9-1.3 10.7-3 12-12Z" /></svg>
          </Link>
          {section ? <><span className={styles.separator} aria-hidden="true">/</span><span className={styles.context} aria-label={`Aktueller Bereich: ${section}`}>{section}</span></> : null}
        </div>
        {!isHome && <Link className={styles.homeLink} href="/andarun" aria-label="Jaminova Übersicht">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 10h14v11h-5v-7h-4v7H5Z" fill="currentColor"/><path d="m12 2 11 10h-4l-7-6-7 6H1Z" fill="currentColor"/></svg>
          <span>Übersicht</span>
        </Link>}
      </nav>
    </header>
  )
}
