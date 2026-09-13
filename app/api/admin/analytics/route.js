import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/adminAuth'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase/server'

const DAY_MS = 24 * 60 * 60 * 1000
const PAGE_SIZE = 1000
const LESSON_PREFIXES = ['/abdomen/', '/gehirn/', '/lunge/', '/mamma/', '/msk/', '/thorax/', '/wirbelsaeule/', '/technik/', '/referenzen/']

async function fetchAll(makeQuery, maxRows) {
  const rows = []
  for (let from = 0; from < maxRows; from += PAGE_SIZE) {
    const { data, error } = await makeQuery().range(from, Math.min(from + PAGE_SIZE - 1, maxRows - 1))
    if (error) return { data: rows, error }
    rows.push(...(data || []))
    if (!data || data.length < PAGE_SIZE) break
  }
  return { data: rows, error: null }
}

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
    { data: calculatorEvents, error: calculatorError },
    { data: fallbackEvents, error: fallbackError },
  ] = await Promise.all([
    fetchAll(() => supabaseAdmin.from('analytics_daily').select('*').gte('day', since).order('day'), 20000),
    fetchAll(() => supabaseAdmin.from('analytics_pages').select('*').gte('day', since).not('path', 'like', '/node-rads/event/%').not('path', 'like', '/calculator-event/%').order('day'), 30000),
    fetchAll(() => supabaseAdmin.from('analytics_pages').select('day,path,views').gte('day', since).like('path', '/node-rads/event/%').order('day'), 30000),
    fetchAll(() => supabaseAdmin.from('analytics_calculator_events').select('visitor_id,session_id,tool,event,source,country_code,occurred_at').gte('occurred_at', `${since}T00:00:00.000Z`).order('occurred_at'), 50000),
    fetchAll(() => supabaseAdmin.from('analytics_pages').select('visitor_id,path,day').gte('day', since).like('path', '/calculator-event/%').order('day'), 50000),
  ])

  const calculatorTableMissing = calculatorError?.code === '42P01' || calculatorError?.code === 'PGRST205'
  if (dailyError || pagesError || nodeRadsError || fallbackError || (calculatorError && !calculatorTableMissing)) {
    const message = dailyError?.message || pagesError?.message || nodeRadsError?.message || fallbackError?.message || calculatorError?.message || 'Analytics nicht verfügbar'
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
  const toolRows = { nodeRads: [], kaiser: [], fleischner: [] }
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
    if (row.path === '/node-rads') {
      nodeRadsDay(row.day).views += Number(row.views || 0)
      toolRows.nodeRads.push(row)
    }
    if (row.path === '/kaiser-score') toolRows.kaiser.push(row)
    if (row.path === '/fleischner') toolRows.fleischner.push(row)
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

  const lessonPages = [...pageMap.values()]
    .filter(entry => LESSON_PREFIXES.some(prefix => entry.path.startsWith(prefix)))
    .map(entry => ({
      path: entry.path,
      views: entry.views,
      activeSeconds: entry.activeSeconds,
      visitors: entry.visitors.size,
      averageSeconds: entry.views ? Math.round(entry.activeSeconds / entry.views) : 0,
    }))
    .sort((a, b) => b.views - a.views)

  const lessonUsage = Object.fromEntries([7, 30, 90].map(period => {
    const periodStart = new Date(Date.now() - (period - 1) * DAY_MS).toISOString().slice(0, 10)
    const lessonMap = new Map()
    for (const row of pages || []) {
      if (row.day < periodStart || !LESSON_PREFIXES.some(prefix => row.path.startsWith(prefix))) continue
      const entry = lessonMap.get(row.path) || { path: row.path, views: 0, activeSeconds: 0, visitors: new Set() }
      entry.views += Number(row.views || 0)
      entry.activeSeconds += Number(row.active_seconds || 0)
      entry.visitors.add(row.visitor_id)
      lessonMap.set(row.path, entry)
    }
    const ranked = [...lessonMap.values()].map(entry => ({
      path: entry.path,
      views: entry.views,
      visitors: entry.visitors.size,
      activeSeconds: entry.activeSeconds,
      averageSeconds: entry.views ? Math.round(entry.activeSeconds / entry.views) : 0,
    })).sort((a, b) => b.views - a.views)
    return [period, ranked]
  }))

  const lessonTotals = Object.fromEntries([7, 30, 90].map(period => {
    const periodStart = new Date(Date.now() - (period - 1) * DAY_MS).toISOString().slice(0, 10)
    const readers = new Set()
    let views = 0
    let activeSeconds = 0
    for (const row of pages || []) {
      if (row.day < periodStart || !LESSON_PREFIXES.some(prefix => row.path.startsWith(prefix))) continue
      views += Number(row.views || 0)
      activeSeconds += Number(row.active_seconds || 0)
      if (row.visitor_id) readers.add(row.visitor_id)
    }
    return [period, { views, visitors: readers.size, activeSeconds }]
  }))

  const trendMap = new Map()
  for (const row of daily || []) {
    const entry = trendMap.get(row.day) || { day: row.day, visits: 0, pageViews: 0, visitors: 0 }
    entry.visits += Number(row.visits || 0)
    entry.pageViews += Number(row.page_views || 0)
    entry.visitors += 1
    trendMap.set(row.day, entry)
  }
  const dailyTrend = [...trendMap.values()].sort((a, b) => a.day.localeCompare(b.day))

  const nodeRads = [...nodeRadsDays.values()].sort((a, b) => a.day.localeCompare(b.day))
  const databaseTool = { nodeRads: 'node-rads', kaiser: 'kaiser-score', fleischner: 'fleischner' }
  const normalizedFallbackEvents = (fallbackEvents || []).flatMap(row => {
    const [, prefix, tool, event, source, countryCode, sessionId] = row.path.split('/')
    return prefix === 'calculator-event' ? [{
      visitor_id: row.visitor_id, session_id: sessionId, tool, event, source,
      country_code: countryCode === 'unknown' ? null : countryCode,
      occurred_at: `${row.day}T12:00:00.000Z`,
    }] : []
  })
  const allCalculatorEvents = [...(calculatorEvents || []), ...normalizedFallbackEvents]
  const toolUsage = Object.fromEntries(Object.entries(toolRows).map(([tool, rows]) => [tool,
    Object.fromEntries([7, 30, 90].map(period => {
      const periodStart = new Date(Date.now() - (period - 1) * DAY_MS).toISOString().slice(0, 10)
      const legacyVisitors = new Set()
      const legacy = rows.reduce((result, row) => {
        if (row.day < periodStart) return result
        result.views += Number(row.views || 0)
        result.activeSeconds += Number(row.active_seconds || 0)
        if (row.visitor_id) legacyVisitors.add(row.visitor_id)
        return result
      }, { views: 0, activeSeconds: 0 })
      const events = allCalculatorEvents.filter(row => row.tool === databaseTool[tool] && row.occurred_at.slice(0, 10) >= periodStart)
      const views = events.filter(row => row.event === 'view')
      const completed = events.filter(row => row.event === 'complete')
      const countBy = (items, field, fallback) => {
        const counts = new Map()
        for (const item of items) {
          const key = item[field] || fallback
          counts.set(key, (counts.get(key) || 0) + 1)
        }
        return [...counts.entries()].map(([key, count]) => ({ key, count })).sort((a, b) => b.count - a.count).slice(0, 10)
      }
      const eventVisitors = new Set(views.map(row => row.visitor_id))
      const completedVisitors = new Set(completed.map(row => row.visitor_id))
      const sessions = new Set(views.map(row => row.session_id))
      const eventCount = event => events.filter(row => row.event === event).length
      const pageViews = views.length || legacy.views
      const visitors = eventVisitors.size || legacyVisitors.size
      return [period, {
        views: pageViews,
        visitors,
        sessions: sessions.size,
        starts: eventCount('start'),
        completions: completed.length,
        repeatUses: Math.max(0, completed.length - completedVisitors.size),
        completionRate: eventCount('start') ? Math.round(completed.length / eventCount('start') * 100) : 0,
        usesPerVisitor: visitors ? Number((completed.length / visitors).toFixed(1)) : 0,
        restarts: eventCount('restart'),
        recommendOpens: eventCount('recommend_open'),
        whatsappClicks: eventCount('whatsapp_click'),
        copyLinks: eventCount('copy_link'),
        activeSeconds: legacy.activeSeconds,
        sources: countBy(views, 'source', 'direct'),
        countries: countBy(views, 'country_code', 'unknown'),
      }]
    }))
  ]))

  const calculatorTotals = Object.fromEntries([7, 30, 90].map(period => {
    const periodStart = new Date(Date.now() - (period - 1) * DAY_MS).toISOString().slice(0, 10)
    const visitors = new Set()
    let views = 0
    let starts = 0
    let completions = 0
    for (const [tool, rows] of Object.entries(toolRows)) {
      const events = allCalculatorEvents.filter(row => row.tool === databaseTool[tool] && row.occurred_at.slice(0, 10) >= periodStart)
      const viewEvents = events.filter(row => row.event === 'view')
      if (viewEvents.length) {
        views += viewEvents.length
        for (const row of viewEvents) if (row.visitor_id) visitors.add(row.visitor_id)
      } else {
        for (const row of rows) {
          if (row.day < periodStart) continue
          views += Number(row.views || 0)
          if (row.visitor_id) visitors.add(row.visitor_id)
        }
      }
      starts += events.filter(row => row.event === 'start').length
      completions += events.filter(row => row.event === 'complete').length
    }
    return [period, {
      views,
      visitors: visitors.size,
      starts,
      completions,
      completionRate: starts ? Math.round(completions / starts * 100) : 0,
    }]
  }))

  return NextResponse.json({ totals, userStats, topPages, lessonPages, lessonUsage, lessonTotals, dailyTrend, nodeRads, toolUsage, calculatorTotals, periodDays: 90 })
}
