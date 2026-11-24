import { NextResponse } from 'next/server'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase/server'
import { getSignedInUserIdentity } from '@/lib/userIdentity'
import { ACK_PREFIX, EXIT_BODY_LIMIT, EXIT_ENTRY_LIMIT, UUID } from '@/utils/exitAnalytics'

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

async function recordExit(payload, request) {
  if (!isSupabaseAdminConfigured || !supabaseAdmin) return new Response(null, { status:503 })
  const origin = request.headers.get('origin')
  if (origin && origin !== new URL(request.url).origin) return new Response(null, { status:403 })
  if (!UUID.test(payload.batchId) || !Array.isArray(payload.entries) ||
      !payload.entries.length || payload.entries.length > EXIT_ENTRY_LIMIT) return new Response(null, { status:400 })
  const entries = []
  for (const row of payload.entries) {
    if (!row || !UUID.test(row.id) || typeof row.path !== 'string' || !row.path.startsWith('/') ||
        row.path.length > 240 || ![0,1].includes(row.visits) || ![0,1].includes(row.views) || row.visits > row.views ||
        !Number.isInteger(row.seconds) || row.seconds < 0 || row.seconds > 86400 ||
        typeof row.seen !== 'string' || !Number.isFinite(Date.parse(row.seen)) ||
        new Date(row.seen).toISOString().slice(0,10) !== row.day ||
        (row.actor != null && (typeof row.actor !== 'string' || row.actor.length > 128))) {
      return new Response(null, { status:400 })
    }
    entries.push({ id:row.id, day:row.day, path:cleanPath(row.path), seconds:row.seconds,
      views:row.views, visits:row.visits, seen:row.seen, actor:row.actor })
  }
  const identity = entries.some(row => row.actor) ? await getSignedInUserIdentity() : null
  const { error } = await supabaseAdmin.rpc('record_exit_analytics', {
    p_visitor:payload.visitorId, p_owner:identity?.ownerId || null,
    p_entries:entries.map(({ actor, ...row }) => ({ ...row, owned:Boolean(identity && actor === identity.userId) })),
  })
  if (error) return new Response(null, { status:503 })
  const secure = new URL(request.url).protocol === 'https:' ? '; Secure' : ''
  return new Response(null, { status:204, headers:{
    'Cache-Control':'private, no-store',
    'X-Radyar-Analytics-Ack':payload.batchId,
    'Set-Cookie':ACK_PREFIX + payload.batchId + '=1; Max-Age=604800; Path=/; SameSite=Lax' + secure,
  } })
}

export async function POST(request) {
  try {
    if (Number(request.headers.get('content-length')) > EXIT_BODY_LIMIT) return new Response(null, { status:413 })
    const raw = await request.text()
    if (new TextEncoder().encode(raw).length > EXIT_BODY_LIMIT) return new Response(null, { status:413 })
    const payload = JSON.parse(raw)
    const visitorId = typeof payload.visitorId === 'string' ? payload.visitorId : ''
    if (!VISITOR_PATTERN.test(visitorId)) {
      return NextResponse.json({ error: 'Ungültige Besucher-ID' }, { status: 400 })
    }
    if ('entries' in payload || 'batchId' in payload) return await recordExit(payload, request)
    if (!isSupabaseAdminConfigured || !supabaseAdmin) return new NextResponse(null, { status:204 })

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
