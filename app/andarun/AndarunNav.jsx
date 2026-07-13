'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './AndarunNav.module.css'

const navItems = [
  { href: '/andarun/routine', label: 'Routine' },
  { href: '/andarun/todo', label: 'ToDo' },
  { href: '/andarun/deutsch', label: 'Deutsch' },
  { href: '/andarun/gesundheit', label: 'Gesundheit' },
  { href: '/andarun/finanz', label: 'Finanzen' },
  { href: '/andarun/dienste', label: 'Dienste' },
]

export default function AndarunNav() {
  const pathname = usePathname()

  return (
    <header className={styles.navShell}>
      <nav className={styles.nav} aria-label="Andarun Navigation">
        <Link className={styles.brand} href="/andarun" aria-label="Andarun Startseite">
          <span className={styles.brandMark}>A</span>
          <span>
            <strong>Andarun</strong>
            <small>Private Space</small>
          </span>
        </Link>

        <div className={styles.links}>
          {navItems.map(item => {
            const active = pathname === item.href || pathname?.startsWith(`${item.href}/`)
            return (
              <Link className={active ? styles.linkActive : styles.link} href={item.href} key={item.href}>
                {item.label}
              </Link>
            )
          })}
        </div>
      </nav>
    </header>
  )
}
