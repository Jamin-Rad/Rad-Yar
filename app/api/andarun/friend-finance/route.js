import { NextResponse } from 'next/server'
import { requireAndarunSession } from '@/lib/andarunPasswordAuth'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase/server'

const STATE_ID = 'andarun:friend-finance:v1'
const PRIMARY_TABLE = 'andarun_friend_finance_state'
const FALLBACK_TABLE = 'admin_budget_state'

function isMissingTable(error) {
  return /does not exist|schema cache|PGRST205|42P01/i.test(error?.message || '')
}

export async function GET() {
  const access = await requireAndarunSession()
  if (access.error) return NextResponse.json({ error: access.error }, { status: access.status })
  if (!isSupabaseAdminConfigured) {
    return NextResponse.json({ error: 'ذخیره‌سازی آنلاین در دسترس نیست.' }, { status: 503 })
  }

  const { data, error } = await supabaseAdmin
    .from(PRIMARY_TABLE)
    .select('state,updated_at')
    .eq('id', STATE_ID)
    .maybeSingle()

  if (error && !isMissingTable(error)) {
    console.error('[andarun-friend-finance] GET failed', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (data) {
    return NextResponse.json({ state: data.state, updatedAt: data.updated_at, online: true })
  }

  // The dedicated migration may not have reached production yet. Keep this
  // feature online in an isolated row of the already deployed JSON state table.
  const { data: fallback, error: fallbackError } = await supabaseAdmin
    .from(FALLBACK_TABLE)
    .select('store,updated_at')
    .eq('id', STATE_ID)
    .maybeSingle()

  if (fallbackError) {
    console.error('[andarun-friend-finance] fallback GET failed', fallbackError)
    return NextResponse.json({ error: fallbackError.message }, { status: 500 })
  }

  if (!error && fallback?.store) {
    const migratedAt = new Date().toISOString()
    const { error: migrationError } = await supabaseAdmin.from(PRIMARY_TABLE).upsert({
      id: STATE_ID,
      state: fallback.store,
      updated_at: migratedAt,
    }, { onConflict: 'id' })
    if (!migrationError) {
      return NextResponse.json({ state: fallback.store, updatedAt: migratedAt, online: true })
    }
  }

  return NextResponse.json({
    state: fallback?.store ?? null,
    updatedAt: fallback?.updated_at ?? null,
    online: true,
  })
}

export async function PUT(request) {
  const access = await requireAndarunSession()
  if (access.error) return NextResponse.json({ error: access.error }, { status: access.status })
  if (!isSupabaseAdminConfigured) {
    return NextResponse.json({ error: 'ذخیره‌سازی آنلاین در دسترس نیست.' }, { status: 503 })
  }

  let body
  try { body = await request.json() } catch {
    return NextResponse.json({ error: 'اطلاعات ارسال‌شده معتبر نیست.' }, { status: 400 })
  }
  if (!body.state || typeof body.state !== 'object' || Array.isArray(body.state)) {
    return NextResponse.json({ error: 'ساختار گردش حساب معتبر نیست.' }, { status: 400 })
  }

  const updatedAt = new Date().toISOString()
  const { error } = await supabaseAdmin.from(PRIMARY_TABLE).upsert({
    id: STATE_ID,
    state: body.state,
    updated_at: updatedAt,
  }, { onConflict: 'id' })

  if (error && !isMissingTable(error)) {
    console.error('[andarun-friend-finance] PUT failed', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!error) return NextResponse.json({ ok: true, online: true, updatedAt })

  const { error: fallbackError } = await supabaseAdmin.from(FALLBACK_TABLE).upsert({
    id: STATE_ID,
    store: body.state,
    recurring: [],
    cat_budgets: {},
    categories: [],
    updated_at: updatedAt,
  }, { onConflict: 'id' })

  if (fallbackError) {
    console.error('[andarun-friend-finance] fallback PUT failed', fallbackError)
    return NextResponse.json({ error: fallbackError.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true, online: true, updatedAt })
}
