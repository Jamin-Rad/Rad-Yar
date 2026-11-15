import { NextResponse } from 'next/server'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase/server'
import { getLearningUserIdentity } from '@/lib/userIdentity'
import { loadLearningReadSnapshot } from '@/lib/learningReadSnapshot'

const unavailable = () => NextResponse.json({ error: 'Lesefortschritt nicht verfügbar' }, { status: 503 })
const validDate = value => typeof value === 'string' && Number.isFinite(Date.parse(value)) && Date.parse(value) <= Date.now() + 300000
const validVersion = value => value && validDate(value.changedAt) && typeof value.changeId === 'string' && value.changeId.length <= 100

export async function GET(request) {
  const identity = await getLearningUserIdentity(request)
  if (!identity) return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 })
  if (identity.storageUnavailable || !isSupabaseAdminConfigured || !supabaseAdmin) return unavailable()
  try {
    const snapshot = await loadLearningReadSnapshot(supabaseAdmin, identity.lookupIds)
    return NextResponse.json(snapshot, { headers: { 'Cache-Control': 'no-store' } })
  } catch {
    return unavailable()
  }
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
