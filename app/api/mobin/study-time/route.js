import { NextResponse } from 'next/server'
import { hasMobinSession } from '@/lib/mobinAuth'
import { supabaseAdmin } from '@/lib/supabase/server'
import { normalizeLegacyMathSessions, validStudySession } from '@/lib/mobinStudyTime'

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
  let session
  try { session = await request.json() } catch { return NextResponse.json({ error: 'Ungültige Daten' }, { status: 400 }) }
  if (!validStudySession(session)) return NextResponse.json({ error: 'Ungültige Lernzeit' }, { status: 400 })
  if (!supabaseAdmin) return NextResponse.json({ ok: true, localOnly: true })

  const { error } = await supabaseAdmin.from('mobin_progress').upsert({
    id: session.id,
    data: { section: session.section, day: session.day, seconds: session.seconds },
    updated_at: new Date().toISOString(),
  })
  if (error) return NextResponse.json({ error: 'Lernzeit konnte nicht gespeichert werden' }, { status: 500 })
  return NextResponse.json({ ok: true })
}
