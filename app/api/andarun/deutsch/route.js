import { NextResponse } from 'next/server'
import { requireAndarunSession } from '@/lib/andarunPasswordAuth'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase/server'

const EMPTY_STATE = {
  lessons: [],
  cards: [],
  reviews: [],
  writings: [],
  answers: {},
}

function unavailable() {
  return NextResponse.json({ error: 'Andarun Deutsch storage is not available.' }, { status: 503 })
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
    lessons: state.lessons.slice(0, 365),
    cards: state.cards.slice(0, 5000),
    reviews: state.reviews.slice(-5000),
    writings: state.writings.slice(-500),
    answers: state.answers,
  }
}

export async function GET() {
  const identity = await requireAndarunSession()
  if (identity.error) return NextResponse.json({ error: identity.error }, { status: identity.status })
  if (!isSupabaseAdminConfigured || !supabaseAdmin) return unavailable()

  const { data, error } = await supabaseAdmin
    .from('andarun_deutsch_state')
    .select('state')
    .eq('owner_id', identity.ownerId)
    .maybeSingle()

  if (error) {
    console.error('[andarun-deutsch] GET failed', error)
    return NextResponse.json({ error: error.message }, { status: 503 })
  }

  return NextResponse.json({ state: normalizeState(data?.state || EMPTY_STATE) })
}

export async function PATCH(request) {
  const identity = await requireAndarunSession()
  if (identity.error) return NextResponse.json({ error: identity.error }, { status: identity.status })
  if (!isSupabaseAdminConfigured || !supabaseAdmin) return unavailable()

  let body = {}
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const state = cleanState(body.state)
  const { data, error } = await supabaseAdmin
    .from('andarun_deutsch_state')
    .upsert({
      owner_id: identity.ownerId,
      state,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'owner_id' })
    .select('state')
    .single()

  if (error) {
    console.error('[andarun-deutsch] PATCH failed', error)
    return NextResponse.json({ error: error.message }, { status: 503 })
  }

  return NextResponse.json({ state: normalizeState(data?.state || state) })
}
