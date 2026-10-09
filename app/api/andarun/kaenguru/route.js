import { NextResponse } from 'next/server'
import { requireAndarunSession } from '@/lib/andarunPasswordAuth'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase/server'

const EMPTY_STATE = { version: 2, gradeGroup: '5-6', attempts: {}, updatedAt: null }

function normalizeState(value) {
  const state = value && typeof value === 'object' ? value : {}
  const attempts = state.attempts && typeof state.attempts === 'object' ? state.attempts : {}
  return {
    version: 2,
    gradeGroup: state.gradeGroup === '7-8' ? '7-8' : '5-6',
    attempts: Object.fromEntries(Object.entries(attempts).slice(-5000)),
    updatedAt: typeof state.updatedAt === 'string' ? state.updatedAt : null,
  }
}

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

export async function GET() {
  const identity = await requireAndarunSession()
  if (identity.error) return NextResponse.json({ error: identity.error }, { status: identity.status })
  if (!isSupabaseAdminConfigured || !supabaseAdmin) return unavailable()
  try {
    return NextResponse.json({ state: await readState(identity.ownerId) })
  } catch (error) {
    console.error('[andarun-kaenguru] GET failed', error)
    return unavailable()
  }
}

export async function PATCH(request) {
  const identity = await requireAndarunSession()
  if (identity.error) return NextResponse.json({ error: identity.error }, { status: identity.status })
  if (!isSupabaseAdminConfigured || !supabaseAdmin) return unavailable()

  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 400 })
  }

  try {
    const state = normalizeState(body?.state)
    return NextResponse.json({ state: await writeState(identity.ownerId, state) })
  } catch (error) {
    console.error('[andarun-kaenguru] PATCH failed', error)
    return unavailable()
  }
}
