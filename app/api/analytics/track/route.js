import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase/server'

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

    const { userId } = await auth()
    const { error } = await supabaseAdmin.rpc('record_site_activity', {
      p_visitor_id: visitorId,
      p_user_id: userId || null,
      p_path: cleanPath(payload.path),
      p_visits: boundedInt(payload.visits, 1),
      p_page_views: boundedInt(payload.pageViews, 1),
      p_active_seconds: boundedInt(payload.activeSeconds, 60),
    })

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
