import { NextResponse } from 'next/server'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase/server'
import { getSignedInUserIdentity } from '@/lib/userIdentity'

function toClient(row) {
  return {
    id: row.card_id,
    box: row.box,
    status: row.status,
    addedAt: row.added_at,
    lastSeenAt: row.last_seen_at,
    lastReviewedAt: row.last_reviewed_at,
    dueAt: row.due_at,
    correctCount: row.correct_count,
    wrongCount: row.wrong_count,
    seenCount: row.seen_count,
  }
}

function toRow(userId, cardId, record) {
  return {
    user_id: userId,
    card_id: cardId,
    box: record.box ?? 1,
    status: record.status ?? 'active',
    added_at: record.addedAt ?? new Date().toISOString(),
    last_seen_at: record.lastSeenAt ?? null,
    last_reviewed_at: record.lastReviewedAt ?? null,
    due_at: record.dueAt ?? null,
    correct_count: record.correctCount ?? 0,
    wrong_count: record.wrongCount ?? 0,
    seen_count: record.seenCount ?? 0,
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
    .from('leitner_cards')
    .select('*')
    .in('user_id', identity.lookupIds)

  if (error) {
    console.error('Leitner-Fortschritt konnte nicht geladen werden:', error)
    return NextResponse.json({ error: 'Fortschritt nicht verfügbar' }, { status: 503 })
  }

  const cards = {}
  for (const row of data || []) {
    const next = toClient(row)
    const previous = cards[row.card_id]
    const nextTime = new Date(next.lastReviewedAt || next.lastSeenAt || next.addedAt || 0).getTime()
    const previousTime = new Date(previous?.lastReviewedAt || previous?.lastSeenAt || previous?.addedAt || 0).getTime()
    if (!previous || nextTime >= previousTime) cards[row.card_id] = next
  }
  return NextResponse.json({ cards })
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
      .filter(([cardId, record]) => typeof cardId === 'string' && record && typeof record === 'object')
      .map(([cardId, record]) => toRow(identity.ownerId, cardId, record))
  } else if (typeof payload.cardId === 'string' && payload.record && typeof payload.record === 'object') {
    rows = [toRow(identity.ownerId, payload.cardId, payload.record)]
  } else {
    return NextResponse.json({ error: 'Ungültige Anfrage' }, { status: 400 })
  }

  if (rows.length === 0) {
    return NextResponse.json({ ok: true })
  }

  const { error } = await supabaseAdmin
    .from('leitner_cards')
    .upsert(rows, { onConflict: 'user_id,card_id' })

  if (error) {
    console.error('Leitner-Fortschritt konnte nicht gespeichert werden:', error)
    return NextResponse.json({ error: 'Speichern fehlgeschlagen' }, { status: 503 })
  }

  return NextResponse.json({ ok: true })
}
