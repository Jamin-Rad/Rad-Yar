import { NextResponse } from 'next/server'
import { requirePrisonerAidSession } from '@/lib/prisonerAidAuth'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase/server'
import { normalizeState } from '@/app/andarun/finanz/gefangene/aidData'

const STATE_ID = 'andarun:prisoner-aid'

function tableMissing(error) {
  return /does not exist|schema cache|PGRST205|42P01/i.test(`${error?.message || ''} ${error?.code || ''}`)
}

function unavailable(error) {
  return NextResponse.json({ error: error || 'ذخیرهٔ آنلاین در دسترس نیست.' }, { status: 503 })
}

async function fallbackRead() {
  const { data, error } = await supabaseAdmin.from('admin_budget_state')
    .select('store,updated_at').eq('id', STATE_ID).maybeSingle()
  if (error) throw error
  return { state: data?.store ? normalizeState(data.store) : null,
    updatedAt: data?.updated_at, store: 'budget' }
}

async function readState() {
  const { data, error } = await supabaseAdmin.from('andarun_prisoner_aid_state')
    .select('state,updated_at').eq('id', STATE_ID).maybeSingle()
  if (error && !tableMissing(error)) throw error
  if (!error && data?.state) return { state: normalizeState(data.state),
    updatedAt: data.updated_at, store: 'prisoner-aid' }
  try {
    const fallback = await fallbackRead()
    return fallback.state || error ? fallback : { state: null, store: 'prisoner-aid' }
  } catch (fallbackError) {
    if (!error && tableMissing(fallbackError)) return { state: null, store: 'prisoner-aid' }
    throw fallbackError
  }
}

async function fallbackWrite(state) {
  const { data, error } = await supabaseAdmin.from('admin_budget_state')
    .upsert({ id: STATE_ID, store: state, updated_at: new Date().toISOString() }, { onConflict: 'id' })
    .select('store,updated_at').single()
  if (error) throw error
  return { state: normalizeState(data.store), updatedAt: data.updated_at, store: 'budget' }
}

async function writeState(state) {
  const { data, error } = await supabaseAdmin.from('andarun_prisoner_aid_state')
    .upsert({ id: STATE_ID, state, updated_at: new Date().toISOString() }, { onConflict: 'id' })
    .select('state,updated_at').single()
  if (error) {
    if (!tableMissing(error)) throw error
    return fallbackWrite(state)
  }
  return { state: normalizeState(data.state), updatedAt: data.updated_at, store: 'prisoner-aid' }
}

async function accessError() {
  const access = await requirePrisonerAidSession()
  if (access.error) return NextResponse.json({ error: access.error }, { status: access.status })
  if (!isSupabaseAdminConfigured || !supabaseAdmin) return unavailable()
  return null
}

export async function GET() {
  const rejected = await accessError()
  if (rejected) return rejected
  try { return NextResponse.json({ ...await readState(), online: true }) }
  catch (error) { return unavailable(error.message) }
}

export async function PUT(request) {
  const rejected = await accessError()
  if (rejected) return rejected
  let body
  try { body = await request.json() } catch {
    return NextResponse.json({ error: 'اطلاعات نامعتبر است.' }, { status: 400 })
  }
  if (!body?.state || typeof body.state !== 'object' || Array.isArray(body.state))
    return NextResponse.json({ error: 'ساختار اطلاعات نامعتبر است.' }, { status: 400 })
  try {
    const saved = await writeState(normalizeState(body.state))
    return NextResponse.json({ ok: true, online: true, updatedAt: saved.updatedAt, store: saved.store })
  } catch (error) { return unavailable(error.message) }
}
