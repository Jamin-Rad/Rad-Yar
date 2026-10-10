import { NextResponse } from 'next/server'
import { requireAndarunSession } from '@/lib/andarunPasswordAuth'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase/server'

const STATE_ID = 'andarun:friend-finance:v1'

function isMissingTable(error) {
  return /does not exist|schema cache|PGRST205|42P01/i.test(error?.message || '')
}

export async function GET() {
  const access = await requireAndarunSession()
  if (access.error) return NextResponse.json({ error: access.error }, { status: access.status })
  if (!isSupabaseAdminConfigured) return NextResponse.json({ state: null, localOnly: true })

  const { data, error } = await supabaseAdmin
    .from('andarun_friend_finance_state')
    .select('state,updated_at')
    .eq('id', STATE_ID)
    .maybeSingle()

  if (error) {
    if (isMissingTable(error)) return NextResponse.json({ state: null, localOnly: true })
    console.error('[andarun-friend-finance] GET failed', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ state: data?.state ?? null, updatedAt: data?.updated_at ?? null })
}

export async function PUT(request) {
  const access = await requireAndarunSession()
  if (access.error) return NextResponse.json({ error: access.error }, { status: access.status })
  if (!isSupabaseAdminConfigured) return NextResponse.json({ ok: true, localOnly: true })

  let body
  try { body = await request.json() } catch {
    return NextResponse.json({ error: 'اطلاعات ارسال‌شده معتبر نیست.' }, { status: 400 })
  }
  if (!body.state || typeof body.state !== 'object' || Array.isArray(body.state)) {
    return NextResponse.json({ error: 'ساختار گردش حساب معتبر نیست.' }, { status: 400 })
  }

  const { error } = await supabaseAdmin.from('andarun_friend_finance_state').upsert({
    id: STATE_ID,
    state: body.state,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'id' })

  if (error) {
    if (isMissingTable(error)) return NextResponse.json({ ok: true, localOnly: true })
    console.error('[andarun-friend-finance] PUT failed', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ ok: true })
}
