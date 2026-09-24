import { NextResponse } from 'next/server'
import { requireAndarunSession } from '@/lib/andarunPasswordAuth'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase/server'
import { normalizeState } from '@/app/andarun/finanz/gefangene/aidData'

const STATE_ID = 'andarun:prisoner-aid'

function storageUnavailable(error) {
  return /does not exist|schema cache|PGRST205|42P01/i.test(error?.message || '')
}

export async function GET() {
  const access = await requireAndarunSession()
  if (access.error) return NextResponse.json({ error: access.error }, { status: access.status })
  if (!isSupabaseAdminConfigured) return NextResponse.json({ state: null, localOnly: true })

  const { data, error } = await supabaseAdmin.from('andarun_prisoner_aid_state')
    .select('state,updated_at').eq('id', STATE_ID).maybeSingle()
  if (error) {
    if (storageUnavailable(error)) return NextResponse.json({ state: null, localOnly: true })
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ state: data?.state ? normalizeState(data.state) : null, updatedAt: data?.updated_at })
}

export async function PUT(request) {
  const access = await requireAndarunSession()
  if (access.error) return NextResponse.json({ error: access.error }, { status: access.status })
  let body
  try { body = await request.json() } catch {
    return NextResponse.json({ error: 'اطلاعات نامعتبر است.' }, { status: 400 })
  }
  if (!body?.state || typeof body.state !== 'object' || Array.isArray(body.state)) {
    return NextResponse.json({ error: 'ساختار اطلاعات نامعتبر است.' }, { status: 400 })
  }
  const state = normalizeState(body.state)
  if (!isSupabaseAdminConfigured) return NextResponse.json({ ok: true, localOnly: true })
  const { error } = await supabaseAdmin.from('andarun_prisoner_aid_state').upsert({
    id: STATE_ID, state, updated_at: new Date().toISOString(),
  }, { onConflict: 'id' })
  if (error) {
    if (storageUnavailable(error)) return NextResponse.json({ ok: true, localOnly: true })
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ ok: true })
}
