import { NextResponse } from 'next/server'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase/server'
import { getLearningUserIdentity } from '@/lib/userIdentity'
import { readVersion } from '@/utils/readProgressStore'

const unavailable = () => NextResponse.json({ error: 'Lesefortschritt nicht verfügbar' }, { status: 503 })
const validDate = value => typeof value === 'string' && Number.isFinite(Date.parse(value)) && Date.parse(value) <= Date.now() + 300000
const validVersion = value => value && validDate(value.changedAt) && typeof value.changeId === 'string' && value.changeId.length <= 100

export async function GET(request) {
  const identity = await getLearningUserIdentity(request)
  if (!identity) return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 })
  if (identity.storageUnavailable || !isSupabaseAdminConfigured || !supabaseAdmin) return unavailable()
  const rows = []
  for (let offset = 0; ; offset += 1000) {
    const { data, error } = await supabaseAdmin.from('user_progress')
      .select('user_id,thema_id,read_pct,updated_at,change_id,learned_at')
      .in('user_id', identity.lookupIds).order('user_id').order('thema_id').range(offset, offset + 999)
    if (error) return unavailable()
    rows.push(...data)
    if (data.length < 1000) break
  }
  const resets = await supabaseAdmin.from('learning_progress_resets')
    .select('changed_at,change_id').in('user_id', identity.lookupIds)
  if (resets.error) return unavailable()
  let reset = null
  for (const row of resets.data || []) {
    const next = { changedAt: new Date(row.changed_at).toISOString(), changeId: row.change_id }
    if (readVersion(next) > readVersion(reset)) reset = next
  }
  const records = {}
  for (const row of rows) {
    const record = { read: Number(row.read_pct) >= 1, changedAt: new Date(row.updated_at).toISOString(), changeId: row.change_id || '', learnedAt: row.learned_at || row.updated_at }
    if (!records[row.thema_id] || readVersion(record) > readVersion(records[row.thema_id])) records[row.thema_id] = record
  }
  const read = {}, history = []
  for (const [topicId, record] of Object.entries(records)) {
    read[topicId] = record.read && (!reset || readVersion(record) > readVersion(reset))
    if (read[topicId]) history.push({ topicId, learnedAt: record.learnedAt })
  }
  history.sort((a, b) => Date.parse(b.learnedAt) - Date.parse(a.learnedAt))
  return NextResponse.json({ version: 2, records, reset, read, history }, { headers: { 'Cache-Control': 'no-store' } })
}

export async function POST(request) {
  const identity = await getLearningUserIdentity(request)
  if (!identity) return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 })
  if (identity.storageUnavailable || !isSupabaseAdminConfigured || !supabaseAdmin) return unavailable()
  let payload
  try { payload = await request.json() } catch { return NextResponse.json({ error: 'Ungültige Anfrage' }, { status: 400 }) }
  if (!payload || typeof payload !== 'object' || Array.isArray(payload) || (Array.isArray(payload.bulk) && payload.bulk.some(item => !item || typeof item !== 'object'))) return NextResponse.json({ error: 'Ungültige Anfrage' }, { status: 400 })
  const incoming = Array.isArray(payload.bulk) ? payload.bulk : payload.themaId ? [payload] : []
  const changes = incoming.map(item => ({ ...item, changedAt: item.changedAt || item.learnedAt || new Date().toISOString(), changeId: item.changeId ?? '' }))
  if (changes.length > 1000 || (!changes.length && !payload.reset) ||
      (payload.reset && !validVersion(payload.reset)) ||
      changes.some(item => typeof item.themaId !== 'string' || !item.themaId.length || item.themaId.length > 200 || typeof item.read !== 'boolean' || !validVersion(item) || (item.learnedAt && !validDate(item.learnedAt)))) {
    return NextResponse.json({ error: 'Ungültige Anfrage' }, { status: 400 })
  }
  const { error } = await supabaseAdmin.rpc('apply_learning_read_progress', {
    p_user_id: identity.ownerId, p_lookup_ids: identity.lookupIds, p_changes: changes, p_reset: payload.reset || null,
  })
  if (error) return unavailable()
  return NextResponse.json({ ok: true })
}

export async function DELETE(request) {
  const reset = { changedAt: new Date().toISOString(), changeId: crypto.randomUUID() }
  return POST({ headers: request?.headers, json: async () => ({ reset }) })
}
