import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/adminAuth'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase/server'

const DAY_MS = 24 * 60 * 60 * 1000

export async function GET() {
  const admin = await requireAdmin()
  if (admin.error) {
    return NextResponse.json({ error: admin.error }, { status: admin.status })
  }
  if (!isSupabaseAdminConfigured || !supabaseAdmin) {
    return NextResponse.json(
      { error: 'Die Analytics-Datenbank ist noch nicht eingerichtet.' },
      { status: 503 }
    )
  }

  const since = new Date(Date.now() - 89 * DAY_MS).toISOString().slice(0, 10)
  const [
    { data: daily, error: dailyError },
    { data: pages, error: pagesError },
    { data: nodeRadsEvents, error: nodeRadsError },
  ] = await Promise.all([
    supabaseAdmin.from('analytics_daily').select('*').gte('day', since).limit(20000),
    supabaseAdmin.from('analytics_pages').select('*').gte('day', since).not('path', 'like', '/node-rads/event/%').limit(30000),
    supabaseAdmin.from('analytics_pages').select('day,path,views').gte('day', since).like('path', '/node-rads/event/%').limit(30000),
  ])

  if (dailyError || pagesError || nodeRadsError) {
    const message = dailyError?.message || pagesError?.message || nodeRadsError?.message || 'Analytics nicht verfügbar'
    console.error('Admin-Analytics-Fehler:', message)
    return NextResponse.json(
      { error: 'Die Analytics-Datenbank ist noch nicht eingerichtet.' },
      { status: 503 }
    )
  }

  const visitors = new Set()
  const userStats = {}
  const totals = { visits: 0, pageViews: 0, activeSeconds: 0, visitors: 0, activeToday: 0 }
  const today = new Date().toISOString().slice(0, 10)

  for (const row of daily || []) {
    visitors.add(row.visitor_id)
    totals.visits += Number(row.visits || 0)
    totals.pageViews += Number(row.page_views || 0)
    totals.activeSeconds += Number(row.active_seconds || 0)
    if (row.day === today) totals.activeToday += 1

    if (!row.user_id) continue
    const entry = userStats[row.user_id] || {
      visits: 0,
      pageViews: 0,
      activeSeconds: 0,
      activeDays: 0,
      lastVisitAt: null,
    }
    entry.visits += Number(row.visits || 0)
    entry.pageViews += Number(row.page_views || 0)
    entry.activeSeconds += Number(row.active_seconds || 0)
    entry.activeDays += 1
    if (!entry.lastVisitAt || new Date(row.last_seen_at) > new Date(entry.lastVisitAt)) {
      entry.lastVisitAt = row.last_seen_at
    }
    userStats[row.user_id] = entry
  }
  totals.visitors = visitors.size

  for (const entry of Object.values(userStats)) {
    entry.averageSecondsPerDay = entry.activeDays
      ? Math.round(entry.activeSeconds / entry.activeDays)
      : 0
  }

  const pageMap = new Map()
  const nodeRadsDays = new Map()
  const nodeRadsDay = day => {
    if (!nodeRadsDays.has(day)) nodeRadsDays.set(day, {
      day, views: 0, recommendOpens: 0, whatsappClicks: 0, copyLinks: 0,
      referralWhatsapp: 0, referralCopy: 0, referralQr: 0,
    })
    return nodeRadsDays.get(day)
  }
  for (const row of pages || []) {
    const entry = pageMap.get(row.path) || { path: row.path, views: 0, activeSeconds: 0, visitors: new Set() }
    entry.views += Number(row.views || 0)
    entry.activeSeconds += Number(row.active_seconds || 0)
    entry.visitors.add(row.visitor_id)
    pageMap.set(row.path, entry)
    if (row.path === '/node-rads') nodeRadsDay(row.day).views += Number(row.views || 0)
  }

  const nodeRadsEventFields = {
    '/node-rads/event/recommend-open': 'recommendOpens',
    '/node-rads/event/whatsapp-click': 'whatsappClicks',
    '/node-rads/event/copy-link': 'copyLinks',
    '/node-rads/event/referral-whatsapp': 'referralWhatsapp',
    '/node-rads/event/referral-copy': 'referralCopy',
    '/node-rads/event/referral-qr': 'referralQr',
  }
  for (const row of nodeRadsEvents || []) {
    const field = nodeRadsEventFields[row.path]
    if (field) nodeRadsDay(row.day)[field] += Number(row.views || 0)
  }

  const topPages = [...pageMap.values()]
    .map(entry => ({
      path: entry.path,
      views: entry.views,
      activeSeconds: entry.activeSeconds,
      visitors: entry.visitors.size,
    }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 20)

  const nodeRads = [...nodeRadsDays.values()].sort((a, b) => a.day.localeCompare(b.day))

  return NextResponse.json({ totals, userStats, topPages, nodeRads, periodDays: 90 })
}
