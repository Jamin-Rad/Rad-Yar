import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/adminAuth'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase/server'

const HEALTH_SETTINGS_ID = 'health:admin'

function unavailable() {
  return NextResponse.json({ error: 'Admin health settings storage is not available.' }, { status: 503 })
}

async function readSettings() {
  const { data, error } = await supabaseAdmin
    .from('admin_budget_state')
    .select('store')
    .eq('id', HEALTH_SETTINGS_ID)
    .maybeSingle()

  if (error) throw error
  return data?.store && typeof data.store === 'object' ? data.store : {}
}

async function writeSettings(store) {
  const payload = {
    id: HEALTH_SETTINGS_ID,
    store,
    updated_at: new Date().toISOString(),
  }
  const result = await supabaseAdmin
    .from('admin_budget_state')
    .upsert(payload, { onConflict: 'id' })
    .select('store')
    .single()

  if (!result.error) return result.data?.store || store

  const text = `${result.error?.message || ''} ${result.error?.details || ''} ${result.error?.hint || ''} ${result.error?.code || ''}`
  if (!/updated_at|schema cache|PGRST204/i.test(text)) throw result.error

  const fallback = await supabaseAdmin
    .from('admin_budget_state')
    .upsert({ id: HEALTH_SETTINGS_ID, store }, { onConflict: 'id' })
    .select('store')
    .single()

  if (fallback.error) throw fallback.error
  return fallback.data?.store || store
}

export async function GET() {
  const admin = await requireAdmin()
  if (admin.error) return NextResponse.json({ error: admin.error }, { status: admin.status })
  if (!isSupabaseAdminConfigured || !supabaseAdmin) return unavailable()

  try {
    const store = await readSettings()
    return NextResponse.json({ caloriePlan: store.caloriePlan || null })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 503 })
  }
}

export async function POST(request) {
  const admin = await requireAdmin()
  if (admin.error) return NextResponse.json({ error: admin.error }, { status: admin.status })
  if (!isSupabaseAdminConfigured || !supabaseAdmin) return unavailable()

  const body = await request.json()
  const caloriePlan = body.caloriePlan && typeof body.caloriePlan === 'object' ? body.caloriePlan : null

  try {
    await writeSettings({ caloriePlan })
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
