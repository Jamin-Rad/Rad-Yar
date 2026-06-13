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
  const [{ data: daily, error: dailyError }, { data: pages, error: pagesError }] = await Promise.all([
    supabaseAdmin.from('analytics_daily').select('*').gte('day', since).limit(20000),
    supabaseAdmin.from('analytics_pages').select('*').gte('day', since).limit(30000),
  ])

  if (dailyError || pagesError) {
    const message = dailyError?.message || pagesError?.message || 'Analytics nicht verfügbar'
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
  for (const row of pages || []) {
    const entry = pageMap.get(row.path) || { path: row.path, views: 0, activeSeconds: 0, visitors: new Set() }
    entry.views += Number(row.views || 0)
    entry.activeSeconds += Number(row.active_seconds || 0)
    entry.visitors.add(row.visitor_id)
    pageMap.set(row.path, entry)
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

  return NextResponse.json({ totals, userStats, topPages, periodDays: 90 })
}
