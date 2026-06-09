'use client'

import { useUser, useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from './admin.module.css'

// Deine Admin-E-Mail — nur dieser User sieht die Admin-Seite
const ADMIN_EMAIL = 'dr.benjaminzia@gmail.com'

export default function AdminPage() {
  const { user, isLoaded } = useUser()
  const { signOut } = useAuth()
  const router = useRouter()

  const [users, setUsers] = useState([])
  const [loadingUsers, setLoadingUsers] = useState(true)
  const [error, setError] = useState('')

  const isAdmin = isLoaded && user?.primaryEmailAddress?.emailAddress === ADMIN_EMAIL

  useEffect(() => {
    if (!isLoaded) return
    if (!user) { router.push('/sign-in'); return }
    if (!isAdmin) { router.push('/'); return }

    // User-Liste laden
    fetch('/api/admin/users')
      .then(r => r.json())
      .then(data => { setUsers(data.users ?? []); setLoadingUsers(false) })
      .catch(() => { setError('Fehler beim Laden der User-Liste.'); setLoadingUsers(false) })
  }, [isLoaded, user, isAdmin])

  if (!isLoaded) {
    return <div className={styles.loading}><div className={styles.spinner} /></div>
  }

  if (!isAdmin) return null

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.logo}>
            <span className={styles.rad}>RAD</span>
            <span className={styles.yar}>YAR</span>
          </div>
          <span className={styles.adminBadge}>Admin</span>
        </div>
        <button className={styles.signOutBtn} onClick={() => signOut(() => router.push('/'))}>
          Abmelden
        </button>
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>Admin-Dashboard</h1>
        <p className={styles.sub}>Angemeldet als <strong>{user?.primaryEmailAddress?.emailAddress}</strong></p>

        {/* Statistiken */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statNum}>{users.length}</div>
            <div className={styles.statLabel}>Registrierte Nutzer</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNum}>
              {users.filter(u => {
                const d = new Date(u.createdAt)
                const now = new Date()
                return now - d < 7 * 24 * 60 * 60 * 1000
              }).length}
            </div>
            <div className={styles.statLabel}>Neu (letzte 7 Tage)</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNum}>
              {users.filter(u => u.lastSignInAt && (new Date() - new Date(u.lastSignInAt)) < 24 * 60 * 60 * 1000).length}
            </div>
            <div className={styles.statLabel}>Aktiv heute</div>
          </div>
        </div>

        {/* User-Tabelle */}
        <div className={styles.tableWrapper}>
          <h2 className={styles.sectionTitle}>Alle Nutzer</h2>
          {error && <div className={styles.error}>{error}</div>}
          {loadingUsers ? (
            <div className={styles.loading}><div className={styles.spinner} /></div>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>E-Mail</th>
                  <th>Registriert</th>
                  <th>Letzter Login</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id}>
                    <td>{u.firstName || '—'} {u.lastName || ''}</td>
                    <td>{u.emailAddresses?.[0]?.emailAddress || '—'}</td>
                    <td>{u.createdAt ? new Date(u.createdAt).toLocaleDateString('de-DE') : '—'}</td>
                    <td>{u.lastSignInAt ? new Date(u.lastSignInAt).toLocaleDateString('de-DE') : '—'}</td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr><td colSpan={4} style={{textAlign:'center', color:'#94a3b8'}}>Keine Nutzer gefunden</td></tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
