import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase/server'

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
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 })
  }
  if (!isSupabaseAdminConfigured || !supabaseAdmin) {
    return NextResponse.json({ error: 'Speicher nicht verfügbar' }, { status: 503 })
  }

  const { data, error } = await supabaseAdmin
    .from('leitner_cards')
    .select('*')
    .eq('user_id', userId)

  if (error) {
    console.error('Leitner-Fortschritt konnte nicht geladen werden:', error)
    return NextResponse.json({ error: 'Fortschritt nicht verfügbar' }, { status: 503 })
  }

  const cards = {}
  for (const row of data || []) {
    cards[row.card_id] = toClient(row)
  }
  return NextResponse.json({ cards })
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
      .filter(([cardId, record]) => typeof cardId === 'string' && record && typeof record === 'object')
      .map(([cardId, record]) => toRow(userId, cardId, record))
  } else if (typeof payload.cardId === 'string' && payload.record && typeof payload.record === 'object') {
    rows = [toRow(userId, payload.cardId, payload.record)]
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
