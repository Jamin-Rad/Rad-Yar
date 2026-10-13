import { NextResponse } from 'next/server'
import { createHash } from 'node:crypto'
import { requireAndarunSession } from '@/lib/andarunPasswordAuth'
import { supabaseAdmin } from '@/lib/supabase/server'
import { pushReadiness, sendCalendarPush } from '@/lib/calendarPush'
import { validPushSubscription } from '@/utils/calendarReminders'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
const reply = (body, status = 200) => NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } })
const hash = endpoint => createHash('sha256').update(endpoint).digest('hex')

export async function GET() {
  const identity = await requireAndarunSession()
  if (identity.error) return reply({ error: identity.error }, identity.status)
  const readiness = await pushReadiness()
  return reply({ ...readiness, publicKey: readiness.ready ? process.env.CALENDAR_VAPID_PUBLIC_KEY : null })
}

export async function POST(request) {
  const identity = await requireAndarunSession()
  if (identity.error) return reply({ error: identity.error }, identity.status)
  if (request.headers.get('origin') !== new URL(request.url).origin) return reply({ error: 'Invalid origin' }, 403)
  let body
  try {
    const raw = await request.text()
    if (raw.length > 8000) return reply({ error: 'Request too large' }, 413)
    body = JSON.parse(raw)
  } catch { return reply({ error: 'Invalid request' }, 400) }
  if (!validPushSubscription(body?.subscription)) return reply({ error: 'Ungültiges Gerät.' }, 400)
  if (!supabaseAdmin) return reply({ error: 'Speicher nicht verfügbar.' }, 503)
  const endpointHash = hash(body.subscription.endpoint)
  if (body.action === 'status') {
    const saved = await supabaseAdmin.from('calendar_push_subscriptions').select('leads, show_details').eq('owner_id', identity.ownerId).eq('endpoint_hash', endpointHash).maybeSingle()
    if (saved.error) return reply({ error: 'Geräte-Einstellungen noch nicht verfügbar.' }, 503)
    return reply({ enabled: Boolean(saved.data), leads: saved.data?.leads || [1440, 30], showDetails: saved.data?.show_details === true })
  }
  if (body.action === 'disable') {
    const result = await supabaseAdmin.from('calendar_push_subscriptions').delete().eq('owner_id', identity.ownerId).eq('endpoint_hash', endpointHash)
    return result.error ? reply({ error: 'Deaktivieren fehlgeschlagen.' }, 503) : reply({ ok: true })
  }
  const readiness = await pushReadiness()
  if (!readiness.ready) return reply({ error: readiness.reason }, 503)
  if (body.action === 'test') {
    const saved = await supabaseAdmin.from('calendar_push_subscriptions').select('subscription, last_test_at').eq('owner_id', identity.ownerId).eq('endpoint_hash', endpointHash).maybeSingle()
    if (saved.error || !saved.data) return reply({ error: 'Dieses Gerät zuerst aktivieren.' }, 400)
    if (Date.now() - Date.parse(saved.data.last_test_at || 0) < 60000) return reply({ error: 'Bitte eine Minute warten.' }, 429)
    const locked = await supabaseAdmin.from('calendar_push_subscriptions').update({ last_test_at: new Date().toISOString() }).eq('owner_id', identity.ownerId).eq('endpoint_hash', endpointHash).or('last_test_at.is.null,last_test_at.lt.' + new Date(Date.now() - 60000).toISOString()).select('endpoint_hash')
    if (locked.error || !locked.data?.length) return reply({ error: 'Bitte eine Minute warten.' }, 429)
    try {
      await sendCalendarPush(saved.data.subscription, { title: 'Jaminova', body: 'Deine Test-Erinnerung ist angekommen.', tag: 'calendar-test' })
      return reply({ ok: true })
    } catch { return reply({ error: 'Testversand fehlgeschlagen. Gerät bitte erneut aktivieren.' }, 502) }
  }
  const leads = Array.isArray(body.leads) ? [...new Set(body.leads)].filter(value => value === 1440 || value === 30) : [1440, 30]
  const result = await supabaseAdmin.from('calendar_push_subscriptions').upsert({ owner_id: identity.ownerId, endpoint_hash: endpointHash, subscription: body.subscription, leads, show_details: body.showDetails === true, enabled_at: new Date().toISOString() }, { onConflict: 'owner_id,endpoint_hash' })
  return result.error ? reply({ error: 'Einstellungen konnten nicht gespeichert werden.' }, 503) : reply({ ok: true })
}
