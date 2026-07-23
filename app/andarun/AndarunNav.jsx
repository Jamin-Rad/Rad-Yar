'use client'

import Link from 'next/link'
import styles from './AndarunNav.module.css'

export default function AndarunNav() {
  return (
    <header className={styles.navShell}>
      <nav className={styles.nav} aria-label="Andarun">
        <Link className={styles.brand} href="/andarun" aria-label="Andarun Startseite">
          Andarun
        </Link>
      </nav>
    </header>
  )
}
