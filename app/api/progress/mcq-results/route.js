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
  if ('answer' in payload) {
    const a = payload.answer
    const validId = value => typeof value === 'string' && value.length > 0 && value.length <= 512
    if (!a || !/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(a.id) ||
        !validId(a.topicId) || !validId(a.questionId) || typeof a.correct !== 'boolean' ||
        !/^\d{4}-\d{2}-\d{2}$/.test(a.day) || !Number.isFinite(Date.parse(a.at)) ||
        Date.parse(a.at) > Date.now() + 300000) {
      return NextResponse.json({ error: 'Ungültige Antwort' }, { status: 400 })
    }
    // Web and iOS use the same immutable answer format and topic projection.
    const { error } = await supabaseAdmin.from('mcq_results').upsert({
      user_id: identity.ownerId, thema_id: nativeScorePrefix + a.id.toLowerCase(), attempted: 1,
      correct: Number(a.correct), last_date: a.at, fach_id: typeof a.fach === 'string' ? a.fach : null,
      details: { nativeAnswer: { topicId: a.topicId, questionId: a.questionId, day: a.day } },
    }, { onConflict: 'user_id,thema_id', ignoreDuplicates: true })
    return NextResponse.json(error ? { error: 'Speichern fehlgeschlagen' } : { ok: true }, { status: error ? 503 : 200 })
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
