import { NextResponse } from 'next/server'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase/server'
import { getSignedInUserIdentity } from '@/lib/userIdentity'

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
  const identity = await getSignedInUserIdentity()
  if (!identity) {
    return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 })
  }
  if (!isSupabaseAdminConfigured || !supabaseAdmin) {
    return NextResponse.json({ error: 'Speicher nicht verfügbar' }, { status: 503 })
  }

  const { data, error } = await supabaseAdmin
    .from('mcq_results')
    .select('*')
    .in('user_id', identity.lookupIds)

  if (error) {
    console.error('MCQ-Ergebnisse konnten nicht geladen werden:', error)
    return NextResponse.json({ error: 'Ergebnisse nicht verfügbar' }, { status: 503 })
  }

  const scores = {}
  for (const row of data || []) {
    const next = toClient(row)
    const previous = scores[row.thema_id]
    if (!previous || new Date(next.lastDate || 0) >= new Date(previous.lastDate || 0)) {
      scores[row.thema_id] = next
    }
  }
  return NextResponse.json({ scores })
}

export async function POST(request) {
  const identity = await getSignedInUserIdentity()
  if (!identity) {
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
      .map(([themaId, result]) => toRow(identity.ownerId, themaId, result))
  } else if (typeof payload.themaId === 'string' && payload.result && typeof payload.result === 'object') {
    rows = [toRow(identity.ownerId, payload.themaId, payload.result)]
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
    console.error('MCQ-Ergebnisse konnten nicht gespeichert werden:', error)
    return NextResponse.json({ error: 'Speichern fehlgeschlagen' }, { status: 503 })
  }

  return NextResponse.json({ ok: true })
}

export async function DELETE() {
  const identity = await getSignedInUserIdentity()
  if (!identity) {
    return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 })
  }
  if (!isSupabaseAdminConfigured || !supabaseAdmin) {
    return NextResponse.json({ error: 'Speicher nicht verfügbar' }, { status: 503 })
  }

  const { error } = await supabaseAdmin
    .from('mcq_results')
    .delete()
    .eq('user_id', identity.ownerId)

  if (error) {
    console.error('MCQ-Ergebnisse konnten nicht gelöscht werden:', error)
    return NextResponse.json({ error: 'Löschen fehlgeschlagen' }, { status: 503 })
  }

  return NextResponse.json({ ok: true })
}
