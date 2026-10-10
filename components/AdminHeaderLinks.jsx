'use client'

import Link from 'next/link'
import { ClerkLoaded, useUser } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import styles from './Navbar.module.css'

function LoadedAdminLinks() {
  const { user, isSignedIn } = useUser()
  const pathname = usePathname()
  const isAdmin = isSignedIn && user?.primaryEmailAddress?.emailAddress === 'dr.benjaminzia@gmail.com'

  if (!isAdmin) return null

  return (
    <div className={styles.adminPortals} aria-label="Admin-Navigation" dir="ltr">
      <Link href="/admin" className={styles.portalAdmin} aria-current={pathname?.startsWith('/admin') ? 'page' : undefined}>
        Radyar-Kontrolle
      </Link>
      <Link href="/ueben/quiz" className={styles.portalAdmin} aria-current={pathname?.startsWith('/ueben/quiz') ? 'page' : undefined}>
        Quiz
      </Link>
      <button type="button" className={styles.portalAdmin} disabled title="Lehr-Mode wird demnächst verfügbar sein">
        Lehr-Mode
      </button>
      <Link href="/andarun" className={styles.portalAndarun} aria-current={pathname?.startsWith('/andarun') ? 'page' : undefined}>
        Andarun
      </Link>
    </div>
  )
}

export default function AdminHeaderLinks() {
  return <ClerkLoaded><LoadedAdminLinks /></ClerkLoaded>
}
