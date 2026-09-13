'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import styles from './admin.module.css'
import { PROMO_LIMIT, PROMO_MONTHS, isSubscriptionActive } from '@/utils/subscription'

const PERIODS = [7, 30, 90]
const EMPTY_USAGE = { views: 0, visitors: 0, sessions: 0, starts: 0, completions: 0, repeatUses: 0, completionRate: 0, activeSeconds: 0, sources: [], countries: [] }
const TOOLS = [
  { key: 'nodeRads', title: 'Node-RADS', subtitle: 'Lymphknoten in CT und MRT', mark: 'N', tone: 'node' },
  { key: 'kaiser', title: 'Kaiser Score', subtitle: 'Mamma-MRT Entscheidungsbaum', mark: 'K', tone: 'kaiser' },
  { key: 'fleischner', title: 'Fleischner', subtitle: 'Pulmonale Rundherde', mark: 'F', tone: 'fleischner' },
]
const NAV = [
  { id: 'overview', label: 'Übersicht', icon: '⌂' },
  { id: 'calculators', label: 'Rechner', icon: '▦' },
  { id: 'lessons', label: 'Lektionen', icon: '▤' },
  { id: 'users', label: 'Nutzer', icon: '♙' },
]

function duration(seconds) {
  const total = Math.max(0, Math.round(Number(seconds) || 0))
  if (total < 60) return `${total} Sek.`
  const hours = Math.floor(total / 3600)
  const minutes = Math.floor((total % 3600) / 60)
  return hours ? `${hours} Std. ${minutes} Min.` : `${minutes} Min.`
}

function sourceName(value) {
  return { direct: 'Direkt / unbekannt', internal: 'Innerhalb RadYar', whatsapp: 'WhatsApp', copy: 'Kopierter Link', qr: 'QR-Code' }[value] || value
}

function countryName(value) {
  if (!value || value === 'unknown') return 'Unbekannt'
  try { return new Intl.DisplayNames(['de'], { type: 'region' }).of(value) || value } catch { return value }
}

function PeriodPicker({ value, onChange }) {
  return <div className={styles.adminPeriod} aria-label="Auswertungszeitraum">
    {PERIODS.map(days => <button type="button" key={days} aria-pressed={value === days} className={value === days ? styles.adminPeriodActive : ''} onClick={() => onChange(days)}>{days} Tage</button>)}
  </div>
}

function MetricStrip({ items }) {
  return <div className={styles.adminMetricStrip}>{items.map(item => <div key={item.label}>
    <span>{item.icon}</span><p><small>{item.label}</small><strong>{item.value}</strong></p>
  </div>)}</div>
}

function TrendChart({ rows = [], period }) {
  const visible = useMemo(() => {
    const start = new Date()
    start.setHours(0, 0, 0, 0)
    start.setDate(start.getDate() - period + 1)
    return rows.filter(row => new Date(`${row.day}T00:00:00`) >= start)
  }, [period, rows])
  const max = Math.max(1, ...visible.map(row => row.pageViews))
  return <section className={styles.adminTrend}>
    <header><div><h2>Nutzungsverlauf</h2><p>Seitenaufrufe pro Tag</p></div><strong>{visible.reduce((sum, row) => sum + row.pageViews, 0)} Aufrufe</strong></header>
    {visible.length ? <div className={styles.adminTrendBars}>{visible.map((row, index) => <div key={row.day} title={`${row.day}: ${row.pageViews} Aufrufe`}>
      <i style={{ height: `${Math.max(row.pageViews / max * 100, 4)}%` }}/>
      {(index === 0 || index === visible.length - 1 || (period === 7 && index % 2 === 0)) ? <small>{new Date(`${row.day}T00:00:00`).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' })}</small> : null}
    </div>)}</div> : <Empty text="Für diesen Zeitraum liegen noch keine Verlaufsdaten vor."/>}
  </section>
}

function Empty({ text }) {
  return <div className={styles.adminEmpty}>{text}</div>
}

function MiniBars({ title, rows = [], formatter }) {
  const values = rows.slice(0, 4)
  const max = Math.max(1, ...values.map(row => row.count))
  return <div className={styles.adminMiniBars}><h4>{title}</h4>
    {values.length ? values.map(row => <div key={row.key}><span>{formatter(row.key)}</span><i><b style={{ width: `${row.count / max * 100}%` }}/></i><strong>{row.count}</strong></div>) : <p>Noch keine Daten</p>}
  </div>
}

function CalculatorRow({ tool, metrics }) {
  return <article className={styles.adminCalculatorRow} data-tone={tool.tone}>
    <div className={styles.adminCalculatorName}><span>{tool.mark}</span><div><h3>{tool.title}</h3><p>{tool.subtitle}</p></div></div>
    <div className={styles.adminCalculatorMetrics}>
      {[['Aufrufe', metrics.views], ['Besucher', metrics.visitors], ['Starts', metrics.starts], ['Abschlüsse', metrics.completions], ['Quote', `${metrics.completionRate} %`], ['Wiederholt', metrics.repeatUses], ['Aktive Zeit', duration(metrics.activeSeconds)]].map(([label, value]) => <div key={label}><small>{label}</small><strong>{value}</strong></div>)}
    </div>
    <div className={styles.adminOrigins}><MiniBars title="Quelle" rows={metrics.sources} formatter={sourceName}/><MiniBars title="Land" rows={metrics.countries} formatter={countryName}/></div>
  </article>
}

function Calculators({ analytics, period }) {
  const tools = TOOLS.map(tool => ({ ...tool, metrics: analytics.toolUsage?.[tool.key]?.[period] || EMPTY_USAGE }))
  const fallback = tools.reduce((sum, tool) => ({ views: sum.views + tool.metrics.views, visitors: sum.visitors + tool.metrics.visitors, starts: sum.starts + tool.metrics.starts, completions: sum.completions + tool.metrics.completions }), { views: 0, visitors: 0, starts: 0, completions: 0 })
  const total = analytics.calculatorTotals?.[period] || { ...fallback, completionRate: fallback.starts ? Math.round(fallback.completions / fallback.starts * 100) : 0 }
  return <>
    <MetricStrip items={[
      { icon: '◉', label: 'Aufrufe gesamt', value: total.views },
      { icon: '♙', label: 'Besucher gesamt', value: total.visitors },
      { icon: '▶', label: 'Starts gesamt', value: total.starts },
      { icon: '✓', label: 'Abschlüsse gesamt', value: total.completions },
      { icon: '↗', label: 'Abschlussquote', value: `${total.completionRate} %` },
    ]}/>
    <TrendChart rows={analytics.dailyTrend} period={period}/>
    <section className={styles.adminCalculators}>
      <header><div><h2>Rechner im Detail</h2><p>Nutzung, Herkunft und Engagement pro Rechner</p></div><span>Einwilligungsbasierte Statistik</span></header>
      <div>{tools.map(tool => <CalculatorRow key={tool.key} tool={tool} metrics={tool.metrics}/>)}</div>
    </section>
  </>
}

function Lessons({ analytics, period }) {
  const pages = analytics.lessonUsage?.[period] || []
  const fallback = pages.reduce((sum, page) => ({ views: sum.views + page.views, visitors: sum.visitors + page.visitors, activeSeconds: sum.activeSeconds + page.activeSeconds }), { views: 0, visitors: 0, activeSeconds: 0 })
  const total = analytics.lessonTotals?.[period] || fallback
  return <>
    <MetricStrip items={[
      { icon: '▤', label: 'Aktive Lektionen', value: pages.length },
      { icon: '◉', label: 'Lektionsaufrufe', value: total.views },
      { icon: '♙', label: 'Eindeutige Leser', value: total.visitors },
      { icon: '◷', label: 'Aktive Lernzeit', value: duration(total.activeSeconds) },
    ]}/>
    <section className={styles.adminLessonPanel}>
      <header><div><h2>Lektionen und Lernseiten</h2><p>Nach Aufrufen sortiert · letzte {period} Tage</p></div><strong>{pages.length} Seiten</strong></header>
      {pages.length ? <div className={styles.adminLessonTable}>
        <div className={styles.adminLessonHead}><span>#</span><span>Seite / Lektion</span><span>Leser</span><span>Aufrufe</span><span>Ø Zeit</span><span>Gesamtzeit</span></div>
        {pages.map((page, index) => <div className={styles.adminLessonRow} key={page.path}>
          <span>{String(index + 1).padStart(2, '0')}</span><Link href={page.path}>{page.path}</Link><strong>{page.visitors}</strong><strong>{page.views}</strong><span>{duration(page.averageSeconds)}</span><span>{duration(page.activeSeconds)}</span>
        </div>)}
      </div> : <Empty text="Noch keine Lektionsaufrufe in diesem Zeitraum."/>}
    </section>
  </>
}

function Overview({ analytics, period, userMetrics, onNavigate }) {
  const pages = (analytics.topPages || []).slice(0, 8)
  const max = Math.max(1, ...pages.map(page => page.views))
  return <>
    <MetricStrip items={[
      { icon: '♙', label: 'Registrierte Nutzer', value: userMetrics.total },
      { icon: '+', label: 'Neu in 7 Tagen', value: userMetrics.newUsers },
      { icon: '◉', label: 'Besucher heute', value: analytics.totals.activeToday },
      { icon: '◆', label: 'Aktive Abos', value: userMetrics.subscriptions },
      { icon: '◎', label: 'Seitenaufrufe', value: analytics.totals.pageViews },
    ]}/>
    <TrendChart rows={analytics.dailyTrend} period={period}/>
    <div className={styles.adminOverviewGrid}>
      <section className={styles.adminTopPages}>
        <header><div><h2>Meistbesuchte Seiten</h2><p>Gesamter erfasster Zeitraum</p></div></header>
        {pages.length ? pages.map((page, index) => <div key={page.path} className={styles.adminTopPage}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <div><div><Link href={page.path}>{page.path}</Link><strong>{page.views}</strong></div><i><b style={{ width: `${page.views / max * 100}%` }}/></i></div>
        </div>) : <Empty text="Noch keine Seitenaufrufe erfasst."/>}
      </section>
      <aside className={styles.adminQuickLinks}>
        <h2>Bereiche</h2>
        <button type="button" onClick={() => onNavigate('calculators')}><span>▦</span><div><strong>Rechner</strong><small>Node-RADS, Kaiser und Fleischner</small></div><b>→</b></button>
        <button type="button" onClick={() => onNavigate('lessons')}><span>▤</span><div><strong>Lektionen</strong><small>Lernseiten und Lesedauer</small></div><b>→</b></button>
        <button type="button" onClick={() => onNavigate('users')}><span>♙</span><div><strong>Nutzer</strong><small>Konten und Abonnements</small></div><b>→</b></button>
        <p><strong>{userMetrics.promo} / {PROMO_LIMIT}</strong> Promo-Aktivierungen</p>
      </aside>
    </div>
  </>
}

function Users({ users, analytics, loading, search, setSearch, error, actionError, actionLoadingId, onAction, onDelete }) {
  return <section className={styles.adminUsers}>
    <header><div><h2>Alle Nutzer</h2><p>Konten, Aktivität und Abonnements</p></div><input type="search" placeholder="Name oder E-Mail suchen…" value={search} onChange={event => setSearch(event.target.value)}/></header>
    {error ? <div className={styles.error}>{error}</div> : null}
    {actionError ? <div className={styles.error}>{actionError}</div> : null}
    {loading ? <div className={styles.loading}><div className={styles.spinner}/></div> : <div className={styles.adminUsersScroll}><table className={styles.table}>
      <thead><tr><th>Name</th><th>E-Mail</th><th>Status</th><th>Registriert</th><th>Letzter Besuch</th><th>Aktive Zeit</th><th>Besuche</th><th>Abo</th><th>Aktionen</th></tr></thead>
      <tbody>{users.map(user => {
        const label = `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.emailAddresses?.[0]?.emailAddress || user.id
        const usage = analytics.userStats[user.id]
        const subscribed = isSubscriptionActive({ publicMetadata: { subscription: user.subscription } })
        return <tr key={user.id}>
          <td><strong>{user.firstName || '—'} {user.lastName || ''}</strong></td>
          <td>{user.emailAddresses?.[0]?.emailAddress || '—'}</td>
          <td>{user.isAdmin ? <span className={`${styles.statusBadge} ${styles.statusAdmin}`}>Admin</span> : user.banned ? <span className={`${styles.statusBadge} ${styles.statusBanned}`}>Gesperrt</span> : <span className={`${styles.statusBadge} ${styles.statusActive}`}>Aktiv</span>}</td>
          <td>{user.createdAt ? new Date(user.createdAt).toLocaleDateString('de-DE') : '—'}</td>
          <td>{formatDateTime(usage?.lastVisitAt || user.lastActiveAt)}</td>
          <td>{duration(usage?.activeSeconds)}</td><td>{usage?.visits || 0}</td>
          <td>{subscribed ? <span className={`${styles.statusBadge} ${styles.statusSubscribed}`}>bis {new Date(user.subscription.until).toLocaleDateString('de-DE')}</span> : '—'}</td>
          <td>{user.isAdmin ? '—' : <div className={styles.actions}>
            <button disabled={actionLoadingId === user.id} onClick={() => onAction(user.id, user.banned ? 'unban' : 'ban')}>{user.banned ? 'Entsperren' : 'Sperren'}</button>
            <button disabled={actionLoadingId === user.id} onClick={() => onAction(user.id, 'setSubscription', { months: 1 })}>+1 Monat</button>
            <PromoButton user={user} loading={actionLoadingId === user.id} onAction={onAction}/>
            <button disabled={actionLoadingId === user.id || !subscribed} onClick={() => onAction(user.id, 'clearSubscription')}>Abo deaktivieren</button>
            <button disabled={actionLoadingId === user.id} className={styles.deleteBtn} onClick={() => onDelete(user.id, label)}>Löschen</button>
          </div>}</td>
        </tr>
      })}{!users.length ? <tr><td colSpan={9}>Keine Nutzer gefunden</td></tr> : null}</tbody>
    </table></div>}
  </section>
}

function PromoButton({ user, loading, onAction }) {
  return <button disabled={loading} onClick={() => onAction(user.id, 'setSubscription', { months: PROMO_MONTHS, promo: true })}>Promo {PROMO_MONTHS}M</button>
}

function formatDateTime(value) {
  return value ? new Date(value).toLocaleString('de-DE') : 'Noch nicht erfasst'
}

export default function AdminDashboardV2() {
  const [section, setSection] = useState('overview')
  const [period, setPeriod] = useState(30)
  const [analytics, setAnalytics] = useState({
    totals: { visits: 0, pageViews: 0, activeSeconds: 0, visitors: 0, activeToday: 0 },
    userStats: {}, topPages: [], lessonUsage: {}, lessonTotals: {}, dailyTrend: [], calculatorTotals: {},
    toolUsage: { nodeRads: {}, kaiser: {}, fleischner: {} },
  })
  const [analyticsLoading, setAnalyticsLoading] = useState(true)
  const [analyticsError, setAnalyticsError] = useState('')
  const [users, setUsers] = useState([])
  const [userCounts, setUserCounts] = useState({ total: 0, promo: 0, subscriptions: 0, newUsers: 0 })
  const [loadingUsers, setLoadingUsers] = useState(true)
  const [userError, setUserError] = useState('')
  const [actionError, setActionError] = useState('')
  const [actionLoadingId, setActionLoadingId] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    setAnalyticsLoading(true)
    fetch('/api/admin/analytics').then(async response => {
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Statistik konnte nicht geladen werden')
      setAnalytics(data)
    }).catch(error => setAnalyticsError(error.message)).finally(() => setAnalyticsLoading(false))
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoadingUsers(true)
      const url = search ? `/api/admin/users?query=${encodeURIComponent(search)}` : '/api/admin/users'
      fetch(url).then(async response => {
        const data = await response.json()
        if (!response.ok) throw new Error(data.error || 'Nutzer konnten nicht geladen werden')
        setUsers(data.users || [])
        setUserCounts({ total: data.totalCount || 0, promo: data.promoActivatedCount || 0, subscriptions: data.activeSubscriptionCount || 0, newUsers: data.newUsers7Count || 0 })
      }).catch(error => setUserError(error.message)).finally(() => setLoadingUsers(false))
    }, search ? 300 : 0)
    return () => window.clearTimeout(timer)
  }, [search])

  async function handleAction(userId, action, extra = {}) {
    setActionError('')
    setActionLoadingId(userId)
    try {
      const response = await fetch(`/api/admin/users/${userId}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action, ...extra }) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Aktion fehlgeschlagen')
      setUsers(current => current.map(user => user.id === userId ? { ...user, ...('banned' in data ? { banned: data.banned } : {}), ...('subscription' in data ? { subscription: data.subscription } : {}) } : user))
    } catch (error) { setActionError(error.message) } finally { setActionLoadingId(null) }
  }

  async function handleDelete(userId, label) {
    if (!window.confirm(`Nutzer "${label}" wirklich endgültig löschen?`)) return
    setActionLoadingId(userId)
    try {
      const response = await fetch(`/api/admin/users/${userId}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Löschen fehlgeschlagen')
      setUsers(current => current.filter(user => user.id !== userId))
      setUserCounts(current => ({ ...current, total: Math.max(0, current.total - 1) }))
    } catch (error) { setActionError(error.message) } finally { setActionLoadingId(null) }
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    window.location.href = '/admin/login'
  }

  const titles = {
    overview: ['Übersicht', 'Website, Lernen und Nutzer auf einen Blick.'],
    calculators: ['Rechner', 'Nutzung und Performance der klinischen Rechner auf RadYar.'],
    lessons: ['Lektionen', 'Reichweite und aktive Lernzeit der einzelnen Unterrichtsseiten.'],
    users: ['Nutzer', 'Konten, Aktivität und Abonnements verwalten.'],
  }

  return <div className={styles.adminShell}>
    <aside className={styles.adminSidebar}>
      <Link href="/" className={styles.adminBrand}><span>◇</span><div><strong>RadYar</strong><small>Admin</small></div></Link>
      <nav>{NAV.map(item => <button type="button" key={item.id} className={section === item.id ? styles.adminNavActive : ''} onClick={() => setSection(item.id)}><span>{item.icon}</span>{item.label}</button>)}</nav>
      <div className={styles.adminSidebarFoot}><Link href="/">← Zur Website</Link><button type="button" onClick={logout}>Abmelden</button></div>
    </aside>
    <main className={styles.adminWorkspace}>
      <header className={styles.adminHeader}><div><h1>{titles[section][0]}</h1><p>{titles[section][1]}</p></div>{section !== 'users' ? <PeriodPicker value={period} onChange={setPeriod}/> : null}</header>
      {analyticsError && section !== 'users' ? <div className={styles.error}>{analyticsError}</div> : null}
      {analyticsLoading && section !== 'users' ? <div className={styles.adminLoading}><div className={styles.spinner}/><span>Statistik wird geladen…</span></div> : null}
      {!analyticsLoading && section === 'overview' ? <Overview analytics={analytics} period={period} userMetrics={userCounts} onNavigate={setSection}/> : null}
      {!analyticsLoading && section === 'calculators' ? <Calculators analytics={analytics} period={period}/> : null}
      {!analyticsLoading && section === 'lessons' ? <Lessons analytics={analytics} period={period}/> : null}
      {section === 'users' ? <Users users={users} analytics={analytics} loading={loadingUsers} search={search} setSearch={setSearch} error={userError} actionError={actionError} actionLoadingId={actionLoadingId} onAction={handleAction} onDelete={handleDelete}/> : null}
    </main>
  </div>
}
