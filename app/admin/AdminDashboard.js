'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import styles from './admin.module.css'

// Letzte 14 Tage als Registrierungs-Chart
function RegistrationChart({ users }) {
  const days = useMemo(() => {
    const buckets = []
    for (let i = 13; i >= 0; i--) {
      const d = new Date()
      d.setHours(0, 0, 0, 0)
      d.setDate(d.getDate() - i)
      buckets.push({ date: d, count: 0 })
    }
    users.forEach(u => {
      if (!u.createdAt) return
      const created = new Date(u.createdAt)
      created.setHours(0, 0, 0, 0)
      const bucket = buckets.find(b => b.date.getTime() === created.getTime())
      if (bucket) bucket.count += 1
    })
    return buckets
  }, [users])

  const max = Math.max(1, ...days.map(d => d.count))

  return (
    <div className={styles.chartWrapper}>
      <h2 className={styles.sectionTitle}>Neue Registrierungen (letzte 14 Tage)</h2>
      <div className={styles.chart}>
        {days.map((d, i) => (
          <div className={styles.chartCol} key={i}>
            <div className={styles.chartBarTrack}>
              <div
                className={styles.chartBar}
                style={{ height: `${(d.count / max) * 100}%` }}
                title={`${d.count} am ${d.date.toLocaleDateString('de-DE')}`}
              />
            </div>
            <span className={styles.chartCount}>{d.count > 0 ? d.count : ''}</span>
            <span className={styles.chartLabel}>{d.date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' })}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const router = useRouter()

  const [users, setUsers] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [loadingUsers, setLoadingUsers] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [actionError, setActionError] = useState('')
  const [actionLoadingId, setActionLoadingId] = useState(null)

  function loadUsers(query) {
    setLoadingUsers(true)
    const url = query ? `/api/admin/users?query=${encodeURIComponent(query)}` : '/api/admin/users'
    fetch(url)
      .then(r => r.json())
      .then(data => {
        setUsers(data.users ?? [])
        setTotalCount(data.totalCount ?? data.users?.length ?? 0)
        setLoadingUsers(false)
      })
      .catch(() => { setError('Fehler beim Laden der User-Liste.'); setLoadingUsers(false) })
  }

  useEffect(() => {
    loadUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Suche debounced
  useEffect(() => {
    const t = setTimeout(() => loadUsers(search), 350)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  async function handleAction(userId, action) {
    setActionError('')
    setActionLoadingId(userId)
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Aktion fehlgeschlagen')
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, banned: data.banned, locked: data.locked } : u))
    } catch (err) {
      setActionError(err.message)
    } finally {
      setActionLoadingId(null)
    }
  }

  async function handleDelete(userId, label) {
    if (!window.confirm(`Nutzer "${label}" wirklich endgültig löschen? Das kann nicht rückgängig gemacht werden.`)) return
    setActionError('')
    setActionLoadingId(userId)
    try {
      const res = await fetch(`/api/admin/users/${userId}`, { method: 'DELETE' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Löschen fehlgeschlagen')
      setUsers(prev => prev.filter(u => u.id !== userId))
      setTotalCount(c => Math.max(0, c - 1))
    } catch (err) {
      setActionError(err.message)
    } finally {
      setActionLoadingId(null)
    }
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

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
        <button className={styles.signOutBtn} onClick={handleLogout}>
          Abmelden
        </button>
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>Admin-Dashboard</h1>

        {/* Statistiken */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statNum}>{totalCount}</div>
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
          <div className={styles.statCard}>
            <div className={styles.statNum}>{users.filter(u => u.banned).length}</div>
            <div className={styles.statLabel}>Gesperrt</div>
          </div>
        </div>

        {/* Registrierungs-Chart */}
        <RegistrationChart users={users} />

        {/* User-Tabelle */}
        <div className={styles.tableWrapper}>
          <div className={styles.tableHead}>
            <h2 className={styles.sectionTitle}>Alle Nutzer</h2>
            <input
              type="search"
              className={styles.searchInput}
              placeholder="Suche nach Name oder E-Mail…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          {error && <div className={styles.error}>{error}</div>}
          {actionError && <div className={styles.error}>{actionError}</div>}
          {loadingUsers ? (
            <div className={styles.loading}><div className={styles.spinner} /></div>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>E-Mail</th>
                  <th>Status</th>
                  <th>Registriert</th>
                  <th>Letzter Login</th>
                  <th>Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => {
                  const label = `${u.firstName || ''} ${u.lastName || ''}`.trim() || u.emailAddresses?.[0]?.emailAddress || u.id
                  return (
                    <tr key={u.id}>
                      <td>{u.firstName || '—'} {u.lastName || ''}</td>
                      <td>{u.emailAddresses?.[0]?.emailAddress || '—'}</td>
                      <td>
                        {u.isAdmin ? (
                          <span className={`${styles.statusBadge} ${styles.statusAdmin}`}>Admin</span>
                        ) : u.banned ? (
                          <span className={`${styles.statusBadge} ${styles.statusBanned}`}>Gesperrt</span>
                        ) : (
                          <span className={`${styles.statusBadge} ${styles.statusActive}`}>Aktiv</span>
                        )}
                      </td>
                      <td>{u.createdAt ? new Date(u.createdAt).toLocaleDateString('de-DE') : '—'}</td>
                      <td>{u.lastSignInAt ? new Date(u.lastSignInAt).toLocaleDateString('de-DE') : '—'}</td>
                      <td>
                        {u.isAdmin ? (
                          <span className={styles.muted}>—</span>
                        ) : (
                          <div className={styles.actions}>
                            <button
                              className={styles.actionBtn}
                              disabled={actionLoadingId === u.id}
                              onClick={() => handleAction(u.id, u.banned ? 'unban' : 'ban')}
                            >
                              {u.banned ? 'Entsperren' : 'Sperren'}
                            </button>
                            <button
                              className={`${styles.actionBtn} ${styles.actionBtnDanger}`}
                              disabled={actionLoadingId === u.id}
                              onClick={() => handleDelete(u.id, label)}
                            >
                              Löschen
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  )
                })}
                {users.length === 0 && (
                  <tr><td colSpan={6} style={{textAlign:'center', color:'#94a3b8'}}>Keine Nutzer gefunden</td></tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
