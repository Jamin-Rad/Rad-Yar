import { NextResponse } from 'next/server'
import { hasMobinSession } from '@/lib/mobinAuth'
import { supabaseAdmin } from '@/lib/supabase/server'
import { normalizeLegacyMathSessions, validStudySession } from '@/lib/mobinStudyTime'

export async function GET() {
  if (!(await hasMobinSession())) return NextResponse.json({ error: 'Nicht eingeloggt' }, { status: 401 })
  if (!supabaseAdmin) return NextResponse.json({ sessions: [], mathSessions: [] })

  const [studyResult, mathResult] = await Promise.all([
    supabaseAdmin.from('mobin_progress').select('id,data').like('id', 'study-time:%').order('id', { ascending: false }).limit(2000),
    supabaseAdmin.from('mobin_progress').select('data').eq('id', 'mobin-math-exam-v1').maybeSingle(),
  ])
  if (studyResult.error || mathResult.error) return NextResponse.json({ error: 'Lernzeit konnte nicht geladen werden' }, { status: 500 })
  return NextResponse.json({
    sessions: (studyResult.data || []).map(row => ({ ...row.data, id: row.id })).filter(validStudySession),
    mathSessions: normalizeLegacyMathSessions(mathResult.data?.data),
  }, { headers: { 'Cache-Control': 'no-store' } })
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
