import { NextResponse } from 'next/server'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase/server'
import { getSignedInUserIdentity } from '@/lib/userIdentity'

const VISITOR_PATTERN = /^[a-zA-Z0-9_-]{12,80}$/

function cleanPath(value) {
  if (typeof value !== 'string' || !value.startsWith('/')) return '/'
  return value.split('?')[0].slice(0, 240) || '/'
}

function boundedInt(value, max) {
  const number = Number.parseInt(value, 10)
  if (!Number.isFinite(number)) return 0
  return Math.max(0, Math.min(number, max))
}

function todayUtc() {
  return new Date().toISOString().slice(0, 10)
}

async function incrementRow(table, match, increments, insertValues) {
  const columns = Object.keys(increments).join(',')
  let query = supabaseAdmin.from(table).select(columns)
  for (const [column, value] of Object.entries(match)) query = query.eq(column, value)

  const { data: current, error: readError } = await query.maybeSingle()
  if (readError) return readError

  if (!current) {
    const { error } = await supabaseAdmin.from(table).insert(insertValues)
    return error
  }

  const nextValues = { last_seen_at: new Date().toISOString() }
  for (const [column, amount] of Object.entries(increments)) {
    nextValues[column] = Number(current[column] || 0) + amount
  }

  let update = supabaseAdmin.from(table).update(nextValues)
  for (const [column, value] of Object.entries(match)) update = update.eq(column, value)
  const { error } = await update
  return error
}

async function recordActivityDirectly({ visitorId, userId, path, visits, pageViews, activeSeconds }) {
  const day = todayUtc()
  const lastSeenAt = new Date().toISOString()
  const dailyError = await incrementRow(
    'analytics_daily',
    { visitor_id: visitorId, day },
    { visits, page_views: pageViews, active_seconds: activeSeconds },
    {
      visitor_id: visitorId,
      user_id: userId,
      day,
      visits,
      page_views: pageViews,
      active_seconds: activeSeconds,
      last_seen_at: lastSeenAt,
    }
  )
  if (dailyError) return dailyError

  return incrementRow(
    'analytics_pages',
    { visitor_id: visitorId, path, day },
    { views: pageViews, active_seconds: activeSeconds },
    {
      visitor_id: visitorId,
      user_id: userId,
      path,
      day,
      views: pageViews,
      active_seconds: activeSeconds,
      last_seen_at: lastSeenAt,
    }
  )
}

export async function POST(request) {
  try {
    if (!isSupabaseAdminConfigured || !supabaseAdmin) {
      return new NextResponse(null, { status: 204 })
    }

    const payload = await request.json()
    const visitorId = typeof payload.visitorId === 'string' ? payload.visitorId : ''
    if (!VISITOR_PATTERN.test(visitorId)) {
      return NextResponse.json({ error: 'Ungültige Besucher-ID' }, { status: 400 })
    }

    let identity = null
    try {
      identity = await getSignedInUserIdentity()
    } catch (error) {
      // Öffentliche Rechner müssen auch dann anonym gezählt werden, wenn Clerk
      // in einem Browser oder auf einer öffentlichen Route nicht verfügbar ist.
      console.warn('Analytics-Identität nicht verfügbar; anonyme Erfassung wird verwendet:', error?.message)
    }

    const activity = {
      visitorId,
      userId: identity?.ownerId || null,
      path: cleanPath(payload.path),
      visits: boundedInt(payload.visits, 1),
      pageViews: boundedInt(payload.pageViews, 1),
      activeSeconds: boundedInt(payload.activeSeconds, 60),
    }
    const { error: rpcError } = await supabaseAdmin.rpc('record_site_activity', {
      p_visitor_id: visitorId,
      p_user_id: activity.userId,
      p_path: activity.path,
      p_visits: activity.visits,
      p_page_views: activity.pageViews,
      p_active_seconds: activity.activeSeconds,
    })

    // Ältere Deployments haben die Tabellen, aber teilweise nicht die RPC-
    // Funktion. In diesem Fall bleibt die Besuchsstatistik trotzdem nutzbar.
    const error = rpcError ? await recordActivityDirectly(activity) : null
    if (error) {
      console.error('Analytics konnte nicht gespeichert werden:', error.message || error)
      return NextResponse.json({ error: 'Statistik nicht verfügbar' }, { status: 503 })
    }

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Analytics-Fehler:', error)
    return NextResponse.json({ error: 'Ungültige Anfrage' }, { status: 400 })
  }
}
