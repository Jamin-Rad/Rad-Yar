import { NextResponse } from 'next/server'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase/server'
import { normalizeProgress as normalizeState, mergeProgress } from '@/lib/kanguruProgress'

const EMPTY_STATE = { version: 3, gradeGroup: '5-6', attempts: {}, practiceDays: [], updatedAt: null }

function fallbackId(ownerId) {
  return `kaenguru:${ownerId}`
}

function isMissingTable(error) {
  const text = `${error?.message || ''} ${error?.details || ''} ${error?.hint || ''} ${error?.code || ''}`
  return /andarun_kaenguru_state|relation .* does not exist|schema cache|PGRST205|42P01/i.test(text)
}

async function readState(ownerId) {
  const result = await supabaseAdmin
    .from('andarun_kaenguru_state')
    .select('state')
    .eq('owner_id', ownerId)
    .maybeSingle()

  if (!result.error) return normalizeState(result.data?.state || EMPTY_STATE)
  if (!isMissingTable(result.error)) throw result.error

  const fallback = await supabaseAdmin
    .from('admin_budget_state')
    .select('store')
    .eq('id', fallbackId(ownerId))
    .maybeSingle()
  if (fallback.error) throw fallback.error
  return normalizeState(fallback.data?.store || EMPTY_STATE)
}

async function writeState(ownerId, state) {
  const result = await supabaseAdmin
    .from('andarun_kaenguru_state')
    .upsert({ owner_id: ownerId, state, updated_at: new Date().toISOString() }, { onConflict: 'owner_id' })
    .select('state')
    .single()

  if (!result.error) return normalizeState(result.data?.state || state)
  if (!isMissingTable(result.error)) throw result.error

  const fallback = await supabaseAdmin
    .from('admin_budget_state')
    .upsert({
      id: fallbackId(ownerId),
      store: state,
      recurring: [],
      cat_budgets: {},
      categories: [],
      updated_at: new Date().toISOString(),
    }, { onConflict: 'id' })
    .select('store')
    .single()
  if (fallback.error) throw fallback.error
  return normalizeState(fallback.data?.store || state)
}

function unavailable() {
  return NextResponse.json({ error: 'Der Känguru-Speicher ist nicht verfügbar.' }, { status: 503 })
}

export function createKanguruHandlers(requireSession, storage = {
  available: isSupabaseAdminConfigured && Boolean(supabaseAdmin), read: readState, write: writeState,
}) {
  async function GET() {
    const identity = await requireSession()
    if (identity.error) return NextResponse.json({ error: identity.error }, { status: identity.status })
    if (!storage.available) return unavailable()
    try {
      return NextResponse.json({ state: await storage.read(identity.ownerId) })
    } catch (error) {
      console.error('[andarun-kaenguru] GET failed', error)
      return unavailable()
    }
  }

  async function PATCH(request) {
    const identity = await requireSession()
    if (identity.error) return NextResponse.json({ error: identity.error }, { status: identity.status })
    if (!storage.available) return unavailable()

    let body
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 400 })
    }

    try {
      const incoming = normalizeState(body?.state)
      const previous = await storage.read(identity.ownerId)
      const state = mergeProgress(incoming, previous)
      return NextResponse.json({ state: await storage.write(identity.ownerId, state) })
    } catch (error) {
      console.error('[andarun-kaenguru] PATCH failed', error)
      return unavailable()
    }
  }

  async function DELETE() {
    const identity = await requireSession()
    if (identity.error) return NextResponse.json({ error: identity.error }, { status: identity.status })
    if (!storage.available) return unavailable()

    try {
      const state = await storage.write(identity.ownerId, EMPTY_STATE)
      return NextResponse.json({ state })
    } catch (error) {
      console.error('[andarun-kaenguru] DELETE failed', error)
      return unavailable()
    }
  }
  return { GET, PATCH, DELETE }
}
