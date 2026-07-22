'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './AndarunNav.module.css'

export default function AndarunNav() {
  const pathname = usePathname()
  const links = [
    { href: '/andarun', label: 'Andarun', exact: true },
    { href: '/andarun/todo', label: 'ToDos' },
    { href: '/andarun/termine', label: 'Termine' },
  ]

  return (
    <header className={styles.navShell}>
      <nav className={styles.nav} aria-label="Andarun">
        {links.map(link => {
          const active = link.exact ? pathname === link.href : pathname.startsWith(link.href)
          return (
            <Link
              className={`${link.exact ? styles.brand : styles.navLink} ${active ? styles.active : ''}`}
              href={link.href}
              aria-current={active ? 'page' : undefined}
              key={link.href}
            >
              {link.label}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
