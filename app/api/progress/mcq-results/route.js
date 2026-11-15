import { NextResponse } from 'next/server'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase/server'
import { getPracticeUserIdentity } from '@/lib/userIdentity'

import { loadQuestionProgress } from '@/lib/iosStudyProgressStore'
import { nativeScorePrefix } from '@/lib/studyProgressScores.mjs'

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

export async function GET(request) {
  const identity = await getPracticeUserIdentity(request)
  if (!identity) {
    return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 })
  }
  if (identity.storageUnavailable || !isSupabaseAdminConfigured || !supabaseAdmin) {
    return NextResponse.json({ error: 'Speicher nicht verfügbar' }, { status: 503 })
  }

  try {
    const { scores } = await loadQuestionProgress(supabaseAdmin, identity.lookupIds)
    return NextResponse.json({ scores }, { headers: { 'Cache-Control': 'no-store' } })
  } catch {
    return NextResponse.json({ error: 'Ergebnisse nicht verfügbar' }, { status: 503 })
  }
}

export async function POST(request) {
  const identity = await getPracticeUserIdentity(request)
  if (!identity) {
    return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 })
  }
  if (identity.storageUnavailable || !isSupabaseAdminConfigured || !supabaseAdmin) {
    return NextResponse.json({ error: 'Speicher nicht verfügbar' }, { status: 503 })
  }

  let payload
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Ungültige Anfrage' }, { status: 400 })
  }

  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
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

  rows = rows.filter(row => !row.thema_id.startsWith(nativeScorePrefix))
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

export async function DELETE(request) {
  const identity = await getPracticeUserIdentity(request)
  if (!identity) {
    return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 })
  }
  if (identity.storageUnavailable || !isSupabaseAdminConfigured || !supabaseAdmin) {
    return NextResponse.json({ error: 'Speicher nicht verfügbar' }, { status: 503 })
  }

  const { error } = await supabaseAdmin
    .from('mcq_results')
    .delete()
    .in('user_id', identity.lookupIds)

  if (error) {
    console.error('MCQ-Ergebnisse konnten nicht gelöscht werden:', error)
    return NextResponse.json({ error: 'Löschen fehlgeschlagen' }, { status: 503 })
  }

  return NextResponse.json({ ok: true })
}
