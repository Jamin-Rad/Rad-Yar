import { NextResponse } from 'next/server'
import { requireAndarunSession } from '@/lib/andarunPasswordAuth'
import { supabaseAdmin } from '@/lib/supabase/server'
import { CalendarError, listCalendar, mutateCalendar } from '@/lib/calendarSync.mjs'
export const dynamic = 'force-dynamic'
const reply = (body, status = 200) => NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } })
async function handle(request, write) {
  const identity = await requireAndarunSession()
  if (identity.error) return reply({ error: 'Bitte anmelden.' }, 401)
  if (!supabaseAdmin) return reply({ error: 'Kalender nicht verfügbar.' }, 503)
  try {
    if (!write) return reply(await listCalendar(supabaseAdmin, identity, new URL(request.url).searchParams.get('after')))
    const text = await request.text()
    if (text.length > 30000) return reply({ error: 'Änderung zu groß.' }, 413)
    let body
    try { body = JSON.parse(text) } catch { return reply({ error: 'Ungültige Daten.' }, 400) }
    if (!body || typeof body !== 'object') return reply({ error: 'Ungültige Daten.' }, 400)
    return reply(await mutateCalendar(supabaseAdmin, identity, body))
  } catch (error) {
    return error instanceof CalendarError ? reply({ error: error.message, current: error.current }, error.status)
      : reply({ error: 'Kalender gerade nicht erreichbar.' }, 503)
  }
}
export const GET = request => handle(request, false)
export const POST = request => handle(request, true)
