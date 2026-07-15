'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import styles from './AdminPrivateNav.module.css'

export default function AdminPrivateNav() {
  const pathname = usePathname()
  const router = useRouter()

  if (pathname === '/admin/login') return null

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    document.documentElement.classList.remove('admin-copy-enabled')
    router.push('/admin/login')
  }

  return (
    <nav className={styles.nav} aria-label="Admin-Navigation">
      <div className={styles.links}>
        <Link href="/admin" className={`${styles.link} ${pathname === '/admin' ? styles.active : ''}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          Admin-Bereich
        </Link>
        <Link href="/andarun" className={`${styles.link} ${pathname?.startsWith('/andarun') ? styles.active : ''}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3 3 9l9 6 9-6-9-6Z"/><path d="m3 15 9 6 9-6"/><path d="m3 12 9 6 9-6"/></svg>
          Andarun
        </Link>
      </div>
      <button className={styles.logout} onClick={handleLogout}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        Admin abmelden
      </button>
    </nav>
  )
}
