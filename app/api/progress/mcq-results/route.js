import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase/server'

function toClient(row) {
  const details = row.details && typeof row.details === 'object' ? row.details : {}
  return {
    attempted: row.attempted,
    correct: row.correct,
    lastDate: row.last_date,
    fach: row.fach_id || '',
    ...details,
  }
}

function toRow(userId, themaId, result) {
  const { attempted, correct, lastDate, fach, ...details } = result || {}
  return {
    user_id: userId,
    thema_id: themaId,
    attempted: attempted ?? 0,
    correct: correct ?? 0,
    fach_id: fach || null,
    last_date: lastDate || new Date().toISOString(),
    details,
  }
}

export async function GET() {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 })
  }
  if (!isSupabaseAdminConfigured || !supabaseAdmin) {
    return NextResponse.json({ error: 'Speicher nicht verfügbar' }, { status: 503 })
  }

  const { data, error } = await supabaseAdmin
    .from('mcq_results')
    .select('*')
    .eq('user_id', userId)

  if (error) {
    console.error('MCQ-Ergebnisse konnten nicht geladen werden:', error.message)
    return NextResponse.json({ error: 'Ergebnisse nicht verfügbar' }, { status: 503 })
  }

  const scores = {}
  for (const row of data || []) {
    scores[row.thema_id] = toClient(row)
  }
  return NextResponse.json({ scores })
}

export async function POST(request) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 })
  }
  if (!isSupabaseAdminConfigured || !supabaseAdmin) {
    return NextResponse.json({ error: 'Speicher nicht verfügbar' }, { status: 503 })
  }

  let payload
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Ungültige Anfrage' }, { status: 400 })
  }

  let rows = []
  if (payload.bulk && typeof payload.bulk === 'object') {
    rows = Object.entries(payload.bulk)
      .filter(([themaId, result]) => typeof themaId === 'string' && result && typeof result === 'object')
      .map(([themaId, result]) => toRow(userId, themaId, result))
  } else if (typeof payload.themaId === 'string' && payload.result && typeof payload.result === 'object') {
    rows = [toRow(userId, payload.themaId, payload.result)]
  } else {
    return NextResponse.json({ error: 'Ungültige Anfrage' }, { status: 400 })
  }

  if (rows.length === 0) {
    return NextResponse.json({ ok: true })
  }

  const { error } = await supabaseAdmin
    .from('mcq_results')
    .upsert(rows, { onConflict: 'user_id,thema_id' })

  if (error) {
    console.error('MCQ-Ergebnisse konnten nicht gespeichert werden:', error.message)
    return NextResponse.json({ error: 'Speichern fehlgeschlagen' }, { status: 503 })
  }

  return NextResponse.json({ ok: true })
}
