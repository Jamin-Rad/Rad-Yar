import { NextResponse } from 'next/server'
import { hasMobinSession } from '@/lib/mobinAuth'
import { supabaseAdmin } from '@/lib/supabase/server'
import { mergeStudySessions, normalizeLegacyMathSessions, validStudySession } from '@/lib/mobinStudyTime'

async function saveSession(session) {
  const data = { section: session.section, day: session.day, seconds: session.seconds }
  for (let attempt = 0; attempt < 3; attempt++) {
    const current = await supabaseAdmin.from('mobin_progress').select('data,updated_at').eq('id', session.id).maybeSingle()
    if (current.error) throw current.error
    const row = current.data
    // An older upload can finish after the final upload from a closing tab.
    if (row && row.data?.seconds >= session.seconds) return
    const updated_at = new Date(Math.max(Date.now(), (Date.parse(row?.updated_at) || 0) + 1)).toISOString()
    if (!row) {
      const result = await supabaseAdmin.from('mobin_progress').insert({ id: session.id, data, updated_at })
      if (result.error?.code === '23505') continue
      if (result.error) throw result.error
      return
    }
    const update = supabaseAdmin.from('mobin_progress').update({ data, updated_at }).eq('id', session.id)
    const result = await (row.updated_at ? update.eq('updated_at', row.updated_at) : update.is('updated_at', null)).select('id').maybeSingle()
    if (result.error) throw result.error
    if (result.data) return
  }
  throw new Error('Concurrent study time update')
}

export async function GET(request) {
  const headers = { 'Cache-Control': 'private, no-store' }
  if (!(await hasMobinSession())) return NextResponse.json({ error: 'Nicht eingeloggt' }, { status: 401, headers })
  if (!supabaseAdmin) return NextResponse.json({ sessions: [], mathSessions: [], localOnly: true }, { headers })

  try {
    const cursor = new URL(request.url).searchParams.get('since') || ''
    const since = /^v1:([1-9]\d{0,17})$/.exec(cursor)?.[1] ?? null
    const { data, error } = await supabaseAdmin.rpc('read_mobin_study_time', { p_since: since })
    if (error) throw error
    if (!data.full && data.revision === since) return new Response(null, { status: 204, headers })

    const result = { cursor: `v1:${data.revision}`, full: data.full, sessions: [], mathSessions: [], deleted: [], deletedMath: [] }
    for (const [kind, id, payload] of data.rows) {
      if (kind === 'math') {
        const [session] = normalizeLegacyMathSessions({ sessions: { [id]: { studyDays: payload } } })
        if (session) result.mathSessions.push(session)
        else if (!data.full) result.deletedMath.push(id)
      } else {
        const session = { ...payload, id }
        if (validStudySession(session)) result.sessions.push(session)
        else if (!data.full) result.deleted.push(id)
      }
    }
    return NextResponse.json(result, { headers })
  } catch {
    return NextResponse.json({ error: 'Lernzeit konnte nicht geladen werden' }, { status: 500, headers })
  }
}

export async function POST(request) {
  if (!(await hasMobinSession())) return NextResponse.json({ error: 'Nicht eingeloggt' }, { status: 401 })
  let payload
  try { payload = await request.json() } catch { return NextResponse.json({ error: 'Ungültige Daten' }, { status: 400 }) }
  const sessions = Array.isArray(payload?.sessions) ? payload.sessions : [payload]
  if (!sessions.length || sessions.length > 20 || !sessions.every(validStudySession)) return NextResponse.json({ error: 'Ungültige Lernzeit' }, { status: 400 })
  if (!supabaseAdmin) return NextResponse.json({ ok: true, localOnly: true })

  try {
    for (const session of mergeStudySessions(sessions)) await saveSession(session)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Lernzeit konnte nicht gespeichert werden' }, { status: 500 })
  }
}
