import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase/server'
import { getSignedInUserIdentity } from '@/lib/userIdentity'

const ID_PATTERN = /^[a-zA-Z0-9_-]{12,80}$/
const SOURCE_PATTERN = /^[a-z0-9.-]{1,80}$/
const TOOLS = new Set(['node-rads', 'kaiser-score'])
const EVENTS = new Set(['view', 'start', 'complete', 'restart', 'recommend_open', 'whatsapp_click', 'copy_link'])

function countryFrom(request) {
  const value = request.headers.get('x-vercel-ip-country') || request.headers.get('cf-ipcountry') || ''
  return /^[A-Z]{2}$/i.test(value) && value.toUpperCase() !== 'XX' ? value.toUpperCase() : null
}

export async function POST(request) {
  try {
    if (!isSupabaseAdminConfigured || !supabaseAdmin) return new NextResponse(null, { status: 204 })
    const payload = await request.json()
    if (!ID_PATTERN.test(payload.visitorId || '') || !ID_PATTERN.test(payload.sessionId || '') ||
        !TOOLS.has(payload.tool) || !EVENTS.has(payload.event)) {
      return NextResponse.json({ error: 'Ungültiges Analytics-Event' }, { status: 400 })
    }
    const source = SOURCE_PATTERN.test(payload.source || '') ? payload.source : 'direct'
    const identity = await getSignedInUserIdentity()
    const { error } = await supabaseAdmin.from('analytics_calculator_events').insert({
      visitor_id: payload.visitorId,
      session_id: payload.sessionId,
      user_id: identity?.ownerId || null,
      tool: payload.tool,
      event: payload.event,
      source,
      country_code: countryFrom(request),
    })
    if (error) {
      // Deployments can receive traffic before the migration has been applied.
      // Keep analytics working against the existing protected table meanwhile.
      if (error.code === '42P01' || error.code === 'PGRST205') {
        const country = countryFrom(request) || 'unknown'
        const nonce = crypto.randomUUID().replaceAll('-', '').slice(0, 12)
        const path = `/calculator-event/${payload.tool}/${payload.event}/${source}/${country}/${payload.sessionId}/${nonce}`
        const fallback = await supabaseAdmin.from('analytics_pages').insert({
          visitor_id: payload.visitorId,
          user_id: identity?.ownerId || null,
          path,
          views: 1,
          active_seconds: 0,
        })
        if (!fallback.error) return new NextResponse(null, { status: 204 })
      }
      console.error('Rechner-Analytics konnte nicht gespeichert werden:', error.message)
      return NextResponse.json({ error: 'Statistik nicht verfügbar' }, { status: 503 })
    }
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Rechner-Analytics-Fehler:', error)
    return NextResponse.json({ error: 'Ungültige Anfrage' }, { status: 400 })
  }
}
