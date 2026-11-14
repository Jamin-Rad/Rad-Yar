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

async function readStudySessions() {
  const sessions = []
  let lastId
  while (true) {
    let query = supabaseAdmin.from('mobin_progress').select('id,data')
      .like('id', 'study-time:%').order('id', { ascending: true }).limit(500)
    if (lastId) query = query.gt('id', lastId)
    const { data, error } = await query
    if (error) throw error
    if (!data.length) return sessions
    for (const row of data) {
      const session = { ...row.data, id: row.id }
      if (validStudySession(session)) sessions.push(session)
    }
    lastId = data[data.length - 1].id
  }
}

export async function GET() {
  if (!(await hasMobinSession())) return NextResponse.json({ error: 'Nicht eingeloggt' }, { status: 401 })
  const headers = { 'Cache-Control': 'no-store' }
  if (!supabaseAdmin) return NextResponse.json({ sessions: [], mathSessions: [], localOnly: true }, { headers })

  try {
    const [sessions, mathResult] = await Promise.all([
      readStudySessions(),
      supabaseAdmin.from('mobin_progress').select('data').eq('id', 'mobin-math-exam-v1').maybeSingle(),
    ])
    if (mathResult.error) throw mathResult.error
    return NextResponse.json({
      sessions,
      mathSessions: normalizeLegacyMathSessions(mathResult.data?.data),
    }, { headers })
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
