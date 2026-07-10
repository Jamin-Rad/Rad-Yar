import { NextResponse } from 'next/server'
import { requireFatimaSession, SHARED_ANDARUN_LOOKUP_OWNER_IDS } from '@/lib/fatimaPasswordAuth'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase/server'

const EMPTY_STATE = {
  lessons: [],
  cards: [],
  reviews: [],
  writings: [],
  answers: {},
}

function unavailable() {
  return NextResponse.json({ error: 'Fatima Deutsch storage is not available.' }, { status: 503 })
}

function normalizeState(value) {
  const state = value && typeof value === 'object' ? value : {}
  return {
    lessons: Array.isArray(state.lessons) ? state.lessons : [],
    cards: Array.isArray(state.cards) ? state.cards : [],
    reviews: Array.isArray(state.reviews) ? state.reviews : [],
    writings: Array.isArray(state.writings) ? state.writings : [],
    answers: state.answers && typeof state.answers === 'object' ? state.answers : {},
  }
}

function cleanState(value) {
  const state = normalizeState(value)
  return {
    lessons: [],
    cards: state.cards.slice(0, 5000),
    reviews: state.reviews.slice(-5000),
    writings: state.writings.slice(-500),
    answers: state.answers,
  }
}

function isMissingDeutschTable(error) {
  const text = `${error?.message || ''} ${error?.details || ''} ${error?.hint || ''} ${error?.code || ''}`
  return /andarun_deutsch_state|relation .* does not exist|schema cache|PGRST205|42P01/i.test(text)
}

function fallbackId(ownerId) {
  return `deutsch:${ownerId}`
}

async function readState(ownerId) {
  const { data, error } = await supabaseAdmin
    .from('andarun_deutsch_state')
    .select('state')
    .eq('owner_id', ownerId)
    .maybeSingle()

  if (error) {
    if (!isMissingDeutschTable(error)) throw error

    const fallback = await supabaseAdmin
      .from('admin_budget_state')
      .select('store')
      .eq('id', fallbackId(ownerId))
      .maybeSingle()

    if (fallback.error) throw fallback.error
    return normalizeState(fallback.data?.store || EMPTY_STATE)
  }

  return normalizeState(data?.state || EMPTY_STATE)
}

async function readFirstState(ownerIds) {
  for (const ownerId of ownerIds) {
    const state = await readState(ownerId)
    if (state.lessons.length || state.cards.length || state.reviews.length || state.writings.length || Object.keys(state.answers).length) {
      return state
    }
  }
  return normalizeState(EMPTY_STATE)
}

async function writeState(ownerId, state) {
  const result = await supabaseAdmin
    .from('andarun_deutsch_state')
    .upsert({
      owner_id: ownerId,
      state,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'owner_id' })
    .select('state')
    .single()

  if (!result.error) return normalizeState(result.data?.state || state)
  if (!isMissingDeutschTable(result.error)) throw result.error

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

export async function GET() {
  const identity = await requireFatimaSession()
  if (identity.error) return NextResponse.json({ error: identity.error }, { status: identity.status })
  if (!isSupabaseAdminConfigured || !supabaseAdmin) return unavailable()

  try {
    const shared = await readFirstState(SHARED_ANDARUN_LOOKUP_OWNER_IDS)
    const own = await readState(identity.ownerId)
    return NextResponse.json({ state: { ...own, lessons: shared.lessons } })
  } catch (error) {
    console.error('[fatima-deutsch] GET failed', error)
    return NextResponse.json({ error: error.message }, { status: 503 })
  }
}

export async function PATCH(request) {
  const identity = await requireFatimaSession()
  if (identity.error) return NextResponse.json({ error: identity.error }, { status: identity.status })
  if (!isSupabaseAdminConfigured || !supabaseAdmin) return unavailable()

  let body = {}
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const state = cleanState(body.state)
  try {
    const saved = await writeState(identity.ownerId, state)
    const shared = await readFirstState(SHARED_ANDARUN_LOOKUP_OWNER_IDS)
    return NextResponse.json({ state: { ...saved, lessons: shared.lessons } })
  } catch (error) {
    console.error('[fatima-deutsch] PATCH failed', error)
    return NextResponse.json({ error: error.message }, { status: 503 })
  }
}
