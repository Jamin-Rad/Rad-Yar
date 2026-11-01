import { NextResponse } from 'next/server'
import { hasMobinSession } from '@/lib/mobinAuth'
import { supabaseAdmin } from '@/lib/supabase/server'
import { mergeMathProgress, normalizeMathProgress } from '@/lib/mobinMath'

// A separate row keeps the earlier Deutsch progress untouched.
const ROW_ID = 'mobin-math-exam-v1'
const json = (body, status = 200) => NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } })
const unavailable = () => json({ error: 'Der Online-Speicher ist gerade nicht erreichbar. Dein Fortschritt bleibt auf diesem Gerät erhalten.' }, 503)

async function readRow() {
  const { data, error } = await supabaseAdmin.from('mobin_progress').select('data, updated_at').eq('id', ROW_ID).maybeSingle()
  if (error) throw error
  return data
}

export async function GET() {
  if (!(await hasMobinSession())) return json({ error: 'Nicht eingeloggt.' }, 401)
  if (!supabaseAdmin) return unavailable()
  try {
    const row = await readRow()
    return json({ state: normalizeMathProgress(row?.data) })
  } catch (error) {
    console.error('[mobin-math] Read failed:', error?.code || 'unknown')
    return unavailable()
  }
}

export async function PATCH(request) {
  if (!(await hasMobinSession())) return json({ error: 'Nicht eingeloggt.' }, 401)
  const origin = request.headers.get('origin')
  if (origin && origin !== new URL(request.url).origin) return json({ error: 'Ungültiger Ursprung.' }, 403)
  if (!supabaseAdmin) return unavailable()
  let incoming
  try {
    const body = await request.text()
    if (body.length > 2_000_000) return json({ error: 'Die Lernhistorie ist zu groß.' }, 413)
    const payload = JSON.parse(body)
    if (payload?.state?.version !== 1 || !payload.state.sessions || !payload.state.bookmarks || Array.isArray(payload.state.sessions) || Array.isArray(payload.state.bookmarks)) return json({ error: 'Ungültiger Lernstand.' }, 400)
    incoming = normalizeMathProgress(payload.state)
  } catch {
    return json({ error: 'Ungültige Anfrage.' }, 400)
  }
  try {
    // Compare-and-swap prevents concurrent devices from overwriting each other.
    for (let attempt = 0; attempt < 3; attempt += 1) {
      const row = await readRow()
      const state = mergeMathProgress(row?.data, incoming)
      const updatedAt = new Date(Math.max(Date.now(), (Date.parse(row?.updated_at) || 0) + 1)).toISOString()
      if (!row) {
        const result = await supabaseAdmin.from('mobin_progress').insert({ id: ROW_ID, data: state, updated_at: updatedAt }).select('data').single()
        if (result.error?.code === '23505') continue
        if (result.error) throw result.error
        return json({ state: normalizeMathProgress(result.data.data) })
      }
      let query = supabaseAdmin.from('mobin_progress').update({ data: state, updated_at: updatedAt }).eq('id', ROW_ID)
      query = row.updated_at ? query.eq('updated_at', row.updated_at) : query.is('updated_at', null)
      const result = await query.select('data').maybeSingle()
      if (result.error) throw result.error
      if (result.data) return json({ state: normalizeMathProgress(result.data.data) })
    }
    return json({ error: 'Der Lernstand wurde gleichzeitig geändert. Bitte noch einmal synchronisieren.' }, 409)
  } catch (error) {
    console.error('[mobin-math] Save failed:', error?.code || 'unknown')
    return unavailable()
  }
}
