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
        <Link href="/admin/health" className={`${styles.link} ${pathname === '/admin/health' ? styles.active : ''}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          Gesundheit
        </Link>
        <Link href="/admin/budget" className={`${styles.link} ${pathname === '/admin/budget' ? styles.active : ''}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 10h12M4 14h12M19.5 9a7.5 7.5 0 1 0 0 6"/></svg>
          Finanzen
        </Link>
<Link href="/admin" className={`${styles.link} ${pathname === '/admin' ? styles.active : ''}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          Dashboard
        </Link>
      </div>
      <button className={styles.logout} onClick={handleLogout}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        Admin abmelden
      </button>
    </nav>
  )
}
