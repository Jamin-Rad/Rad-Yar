'use client'

import Link from 'next/link'

import { useEffect, useMemo, useState } from 'react'
import styles from './admin.module.css'
import { PROMO_LIMIT, PROMO_MONTHS, isSubscriptionActive } from '@/utils/subscription'

function formatDuration(seconds) {
  const total = Math.max(0, Math.round(Number(seconds) || 0))
  if (total < 60) return `${total} Sek.`
  const hours = Math.floor(total / 3600)
  const minutes = Math.floor((total % 3600) / 60)
  if (!hours) return `${minutes} Min.`
  return `${hours} Std. ${minutes} Min.`
}

function formatDateTime(value) {
  return value ? new Date(value).toLocaleString('de-DE') : 'Noch nicht erfasst'
}

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
  const [users, setUsers] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [promoActivatedCount, setPromoActivatedCount] = useState(0)
  const [activeSubscriptionCount, setActiveSubscriptionCount] = useState(0)
  const [newUsers7Count, setNewUsers7Count] = useState(0)
  const [loadingUsers, setLoadingUsers] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [actionError, setActionError] = useState('')
  const [actionLoadingId, setActionLoadingId] = useState(null)
  const [analytics, setAnalytics] = useState({
    totals: { visits: 0, pageViews: 0, activeSeconds: 0, visitors: 0, activeToday: 0 },
    userStats: {},
    topPages: [],
    periodDays: 90,
  })
  const [analyticsError, setAnalyticsError] = useState('')

  function loadUsers(query) {
    setLoadingUsers(true)
    const url = query ? `/api/admin/users?query=${encodeURIComponent(query)}` : '/api/admin/users'
    fetch(url)
      .then(r => r.json())
      .then(data => {
        setUsers(data.users ?? [])
        setTotalCount(data.totalCount ?? data.users?.length ?? 0)
        setPromoActivatedCount(data.promoActivatedCount ?? 0)
        setActiveSubscriptionCount(data.activeSubscriptionCount ?? 0)
        setNewUsers7Count(data.newUsers7Count ?? 0)
        setLoadingUsers(false)
      })
      .catch(() => { setError('Fehler beim Laden der User-Liste.'); setLoadingUsers(false) })
  }

  useEffect(() => {
    loadUsers()
    fetch('/api/admin/analytics')
      .then(async response => {
        const data = await response.json()
        if (!response.ok) throw new Error(data.error || 'Statistik konnte nicht geladen werden')
        setAnalytics(data)
      })
      .catch(err => setAnalyticsError(err.message))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Suche debounced
  useEffect(() => {
    const t = setTimeout(() => loadUsers(search), 350)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  async function handleAction(userId, action, extra) {
    setActionError('')
    setActionLoadingId(userId)
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, ...extra }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Aktion fehlgeschlagen')
      setUsers(prev => prev.map(u => {
        if (u.id !== userId) return u
        const next = { ...u }
        if ('banned' in data) next.banned = data.banned
        if ('locked' in data) next.locked = data.locked
        if ('subscription' in data) next.subscription = data.subscription
        return next
      }))
      if ('subscription' in data) {
        const wasActive = isSubscriptionActive({
          publicMetadata: { subscription: users.find(u => u.id === userId)?.subscription },
        })
        const isActive = isSubscriptionActive({ publicMetadata: { subscription: data.subscription } })
        if (wasActive !== isActive) {
          setActiveSubscriptionCount(count => Math.max(0, count + (isActive ? 1 : -1)))
        }
        setPromoActivatedCount(c => {
          const wasPromo = users.find(u => u.id === userId)?.subscription?.promo
          const isPromo = !!data.subscription?.promo
          if (wasPromo === isPromo) return c
          return isPromo ? c + 1 : Math.max(0, c - 1)
        })
      }
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

  const maxPageViews = Math.max(1, ...analytics.topPages.map(page => page.views))

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <h1 className={styles.title}>Admin-Dashboard</h1>
        <p className={styles.sub}>Nutzer, Abonnements und Website-Nutzung im Überblick</p>

        {/* Statistiken */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statNum}>{totalCount}</div>
            <div className={styles.statLabel}>Registrierte Nutzer</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNum}>{newUsers7Count}</div>
            <div className={styles.statLabel}>Neu (letzte 7 Tage)</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNum}>
              {analytics.totals.activeToday}
            </div>
            <div className={styles.statLabel}>Besucher heute</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNum}>{activeSubscriptionCount}</div>
            <div className={styles.statLabel}>Aktive Abos</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNum}>{promoActivatedCount} / {PROMO_LIMIT}</div>
            <div className={styles.statLabel}>Promo-Aktivierungen</div>
          </div>
        </div>

        <div className={styles.analyticsSection}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Allgemeine Website-Nutzung</h2>
              <p>Erfasster Zeitraum: letzte {analytics.periodDays} Tage</p>
            </div>
          </div>
          {analyticsError && (
            <div className={styles.error}>
              {analyticsError} Die Erfassung startet danach automatisch.
            </div>
          )}
          <div className={styles.analyticsGrid}>
            <div className={styles.analyticsCard}><strong>{analytics.totals.visitors}</strong><span>Eindeutige Besucher</span></div>
            <div className={styles.analyticsCard}><strong>{analytics.totals.visits}</strong><span>Besuche</span></div>
            <div className={styles.analyticsCard}><strong>{analytics.totals.pageViews}</strong><span>Seitenaufrufe</span></div>
            <div className={styles.analyticsCard}><strong>{formatDuration(analytics.totals.activeSeconds)}</strong><span>Aktive Gesamtzeit</span></div>
          </div>
        </div>

        <div className={styles.pagesPanel}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Meistbesuchte Seiten</h2>
              <p>Vergleich nach Seitenaufrufen</p>
            </div>
          </div>
          {analytics.topPages.length ? (
            <div className={styles.pageRanking}>
              {analytics.topPages.map((page, index) => (
                <div className={styles.pageRankRow} key={page.path}>
                  <span className={styles.pageRankNum}>{String(index + 1).padStart(2, '0')}</span>
                  <div className={styles.pageRankMain}>
                    <div className={styles.pageRankHead}>
                      <Link href={page.path}>{page.path}</Link>
                      <span>{page.views} Aufrufe · {page.visitors} Besucher · {formatDuration(page.activeSeconds)}</span>
                    </div>
                    <div className={styles.pageRankTrack}>
                      <span style={{ width: `${Math.max((page.views / maxPageViews) * 100, 2)}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.emptyAnalytics}>Noch keine Seitenaufrufe erfasst.</p>
          )}
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
                  <th>Letzter Besuch</th>
                  <th>Aktive Zeit</th>
                  <th>Aktive Tage</th>
                  <th>Ø pro Tag</th>
                  <th>Besuche</th>
                  <th>Abo</th>
                  <th>Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => {
                  const label = `${u.firstName || ''} ${u.lastName || ''}`.trim() || u.emailAddresses?.[0]?.emailAddress || u.id
                  const usage = analytics.userStats[u.id]
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
                      <td>{formatDateTime(usage?.lastVisitAt || u.lastActiveAt)}</td>
                      <td>{formatDuration(usage?.activeSeconds)}</td>
                      <td>{usage?.activeDays || 0}</td>
                      <td>{formatDuration(usage?.averageSecondsPerDay)}</td>
                      <td>{usage?.visits || 0}</td>
                      <td>
                        {isSubscriptionActive({ publicMetadata: { subscription: u.subscription } }) ? (
                          <>
                            <span className={`${styles.statusBadge} ${styles.statusSubscribed}`}>
                              Aktiv bis {new Date(u.subscription.until).toLocaleDateString('de-DE')}
                            </span>
                            {u.subscription?.promo && <span className={styles.promoTag}>Promo</span>}
                          </>
                        ) : (
                          <span className={`${styles.statusBadge} ${styles.statusInactive}`}>—</span>
                        )}
                      </td>
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
                              className={styles.actionBtn}
                              disabled={actionLoadingId === u.id}
                              onClick={() => handleAction(u.id, 'setSubscription', { months: 1 })}
                            >
                              +1 Monat
                            </button>
                            <button
                              className={styles.actionBtn}
                              disabled={actionLoadingId === u.id}
                              onClick={() => handleAction(u.id, 'setSubscription', { months: PROMO_MONTHS, promo: true })}
                            >
                              Promo ({PROMO_MONTHS} Monate)
                            </button>
                            <button
                              className={styles.actionBtn}
                              disabled={actionLoadingId === u.id || !isSubscriptionActive({ publicMetadata: { subscription: u.subscription } })}
                              onClick={() => handleAction(u.id, 'clearSubscription')}
                            >
                              Abo deaktivieren
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
                  <tr><td colSpan={11} style={{textAlign:'center', color:'#94a3b8'}}>Keine Nutzer gefunden</td></tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
