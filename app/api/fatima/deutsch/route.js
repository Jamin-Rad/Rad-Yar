import { NextResponse } from 'next/server'
import { requireFatimaSession, SHARED_ANDARUN_LOOKUP_OWNER_IDS } from '@/lib/fatimaPasswordAuth'
import { isSupabaseAdminConfigured } from '@/lib/supabase/server'
import { readDeutschState, saveDeutschChanges } from '@/lib/deutsch/storage'

async function sharedLessons() {
  for (const ownerId of SHARED_ANDARUN_LOOKUP_OWNER_IDS) {
    const state = await readDeutschState(ownerId)
    if (state.lessons.length) return state.lessons
  }
  return []
}

export async function GET() {
  const identity = await requireFatimaSession()
  if (identity.error) return NextResponse.json({ error: identity.error }, { status: identity.status })
  if (!isSupabaseAdminConfigured) return NextResponse.json({ error: 'Speicher nicht verfügbar.' }, { status: 503 })
  try {
    const state = await readDeutschState(identity.ownerId)
    return NextResponse.json({ state: { ...state, lessons: await sharedLessons() } }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (error) {
    console.error('[fatima-deutsch] GET failed', error)
    return NextResponse.json({ error: 'Fortschritt konnte nicht geladen werden.' }, { status: 503 })
  }
}

export async function PATCH(request) {
  const identity = await requireFatimaSession()
  if (identity.error) return NextResponse.json({ error: identity.error }, { status: identity.status })
  if (!isSupabaseAdminConfigured) return NextResponse.json({ error: 'Speicher nicht verfügbar.' }, { status: 503 })
  let body
  try { body = await request.json() } catch { return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 400 }) }
  if ((!Array.isArray(body?.changes) && !body?.state) || (body?.changes?.length > 500)) return NextResponse.json({ error: 'Ungültige Änderungen.' }, { status: 400 })
  try {
    const state = await saveDeutschChanges(identity.ownerId, body.changes || [], { allowLessons: false, legacyState: body.changes ? undefined : body.state })
    return NextResponse.json({ state: { ...state, lessons: await sharedLessons() } }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (error) {
    console.error('[fatima-deutsch] PATCH failed', error)
    return NextResponse.json({ error: 'Fortschritt bleibt lokal erhalten. Synchronisierung erneut versuchen.' }, { status: 503 })
  }
}
