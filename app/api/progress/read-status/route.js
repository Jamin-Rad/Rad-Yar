import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase/server'

export async function GET() {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 })
  }
  if (!isSupabaseAdminConfigured || !supabaseAdmin) {
    return NextResponse.json({ error: 'Speicher nicht verfügbar' }, { status: 503 })
  }

  const { data, error } = await supabaseAdmin
    .from('user_progress')
    .select('thema_id, read_pct, updated_at')
    .eq('user_id', userId)

  if (error) {
    console.error('Lesefortschritt konnte nicht geladen werden:', error.message)
    return NextResponse.json({ error: 'Lesefortschritt nicht verfügbar' }, { status: 503 })
  }

  const read = {}
  const history = []
  for (const row of data || []) {
    if (Number(row.read_pct) >= 1) {
      read[row.thema_id] = true
      history.push({ topicId: row.thema_id, learnedAt: row.updated_at })
    }
  }
  history.sort((a, b) => new Date(b.learnedAt) - new Date(a.learnedAt))

  return NextResponse.json({ read, history })
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
  if (Array.isArray(payload.bulk)) {
    rows = payload.bulk
      .filter(item => typeof item?.themaId === 'string')
      .map(item => ({
        user_id: userId,
        thema_id: item.themaId,
        read_pct: item.read ? 1 : 0,
        updated_at: item.learnedAt || new Date().toISOString(),
      }))
  } else if (typeof payload.themaId === 'string') {
    rows = [{
      user_id: userId,
      thema_id: payload.themaId,
      read_pct: payload.read ? 1 : 0,
      updated_at: new Date().toISOString(),
    }]
  } else {
    return NextResponse.json({ error: 'Ungültige Anfrage' }, { status: 400 })
  }

  if (rows.length === 0) {
    return NextResponse.json({ ok: true })
  }

  const { error } = await supabaseAdmin
    .from('user_progress')
    .upsert(rows, { onConflict: 'user_id,thema_id' })

  if (error) {
    console.error('Lesefortschritt konnte nicht gespeichert werden:', error.message)
    return NextResponse.json({ error: 'Speichern fehlgeschlagen' }, { status: 503 })
  }

  return NextResponse.json({ ok: true })
}
