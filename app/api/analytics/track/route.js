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

async function recordWithoutRpc({ visitorId, userId, path, visits, pageViews, activeSeconds }) {
  const day = new Date().toISOString().slice(0, 10)
  const [{ data: daily }, { data: page }] = await Promise.all([
    supabaseAdmin.from('analytics_daily').select('visits,page_views,active_seconds').eq('visitor_id', visitorId).eq('day', day).maybeSingle(),
    supabaseAdmin.from('analytics_pages').select('views,active_seconds').eq('visitor_id', visitorId).eq('path', path).eq('day', day).maybeSingle(),
  ])
  const now = new Date().toISOString()
  const [{ error: dailyError }, { error: pageError }] = await Promise.all([
    supabaseAdmin.from('analytics_daily').upsert({
      visitor_id: visitorId, user_id: userId, day,
      visits: Number(daily?.visits || 0) + visits,
      page_views: Number(daily?.page_views || 0) + pageViews,
      active_seconds: Number(daily?.active_seconds || 0) + activeSeconds,
      last_seen_at: now,
    }),
    supabaseAdmin.from('analytics_pages').upsert({
      visitor_id: visitorId, user_id: userId, path, day,
      views: Number(page?.views || 0) + pageViews,
      active_seconds: Number(page?.active_seconds || 0) + activeSeconds,
      last_seen_at: now,
    }),
  ])
  return dailyError || pageError
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

    const identity = await getSignedInUserIdentity()
    const path = cleanPath(payload.path)
    const visits = boundedInt(payload.visits, 1)
    const pageViews = boundedInt(payload.pageViews, 1)
    const activeSeconds = boundedInt(payload.activeSeconds, 60)
    let { error } = await supabaseAdmin.rpc('record_site_activity', {
      p_visitor_id: visitorId,
      p_user_id: identity?.ownerId || null,
      p_path: path,
      p_visits: visits,
      p_page_views: pageViews,
      p_active_seconds: activeSeconds,
    })
    if (error?.code === '42501') {
      error = await recordWithoutRpc({ visitorId, userId: identity?.ownerId || null, path, visits, pageViews, activeSeconds })
    }

    if (error) {
      console.error('Analytics konnte nicht gespeichert werden:', error.message)
      return NextResponse.json({ error: 'Statistik nicht verfügbar' }, { status: 503 })
    }

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Analytics-Fehler:', error)
    return NextResponse.json({ error: 'Ungültige Anfrage' }, { status: 400 })
  }
}
