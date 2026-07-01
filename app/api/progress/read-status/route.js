import { NextResponse } from 'next/server'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase/server'
import { getSignedInUserIdentity } from '@/lib/userIdentity'

export async function GET() {
  const identity = await getSignedInUserIdentity()
  if (!identity) {
    return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 })
  }
  if (!isSupabaseAdminConfigured || !supabaseAdmin) {
    return NextResponse.json({ error: 'Speicher nicht verfügbar' }, { status: 503 })
  }

  const { data, error } = await supabaseAdmin
    .from('user_progress')
    .select('thema_id,read_pct,updated_at')
    .in('user_id', identity.lookupIds)

  if (error) {
    console.error('Lesefortschritt konnte nicht geladen werden:', error)
    return NextResponse.json({ error: 'Lesefortschritt nicht verfügbar' }, { status: 503 })
  }

  const read = {}
  const historyByTopic = new Map()
  for (const row of data || []) {
    const isRead = Number(row.read_pct) >= 1
    read[row.thema_id] = isRead
    if (isRead) {
      read[row.thema_id] = true
      const previous = historyByTopic.get(row.thema_id)
      if (!previous || new Date(row.updated_at) > new Date(previous.learnedAt)) {
        historyByTopic.set(row.thema_id, { topicId: row.thema_id, learnedAt: row.updated_at })
      }
    }
  }
  const history = [...historyByTopic.values()]
  history.sort((a, b) => new Date(b.learnedAt) - new Date(a.learnedAt))

  return NextResponse.json({ read, history })
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
  if (Array.isArray(payload.bulk)) {
    rows = payload.bulk
      .filter(item => typeof item?.themaId === 'string')
      .map(item => ({
        user_id: identity.ownerId,
        thema_id: item.themaId,
        read_pct: item.read ? 1 : 0,
        updated_at: item.learnedAt || new Date().toISOString(),
      }))
  } else if (typeof payload.themaId === 'string') {
    rows = [{
      user_id: identity.ownerId,
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
    console.error('Lesefortschritt konnte nicht gespeichert werden:', error)
    return NextResponse.json({ error: 'Speichern fehlgeschlagen' }, { status: 503 })
  }

  return NextResponse.json({ ok: true })
}
