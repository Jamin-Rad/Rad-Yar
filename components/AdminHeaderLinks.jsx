'use client'

import Link from 'next/link'
import { ClerkLoaded, useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import styles from './Navbar.module.css'

function LoadedAdminLinks() {
  const { user, isSignedIn } = useUser()
  const pathname = usePathname()
  const isAdmin = isSignedIn && user?.primaryEmailAddress?.emailAddress === 'dr.benjaminzia@gmail.com'
  const [lehrActive, setLehrActive] = useState(false)

  useEffect(() => {
    setLehrActive(document.documentElement.classList.contains('lehr-mode-active'))
    const handleState = event => setLehrActive(!!event.detail?.active)
    window.addEventListener('radyar:lehr-mode-state', handleState)
    return () => window.removeEventListener('radyar:lehr-mode-state', handleState)
  }, [])

  if (!isAdmin) return null

  return (
    <div className={styles.adminPortals} aria-label="Admin-Navigation" dir="ltr">
      <Link href="/admin" className={styles.portalAdmin} aria-current={pathname?.startsWith('/admin') ? 'page' : undefined}>
        Radyar-Kontrolle
      </Link>
      <Link href="/ueben/quiz" className={styles.portalAdmin} aria-current={pathname?.startsWith('/ueben/quiz') ? 'page' : undefined}>
        Quiz
      </Link>
      {!pathname?.startsWith('/andarun') ? (
        <button
          type="button"
          className={styles.portalAdmin}
          onClick={() => window.dispatchEvent(new Event('radyar:lehr-mode-toggle'))}
          aria-pressed={lehrActive}
          title={lehrActive ? 'Lehr-Mode beenden' : 'Lehr-Mode starten'}
        >
          {lehrActive ? 'Lehr-Mode aktiv' : 'Lehr-Mode'}
        </button>
      ) : null}
      <Link href="/andarun" className={styles.portalAndarun} aria-current={pathname?.startsWith('/andarun') ? 'page' : undefined}>
        Andarun
      </Link>
    </div>
  )
}

export default function AdminHeaderLinks() {
  return <ClerkLoaded><LoadedAdminLinks /></ClerkLoaded>
}
