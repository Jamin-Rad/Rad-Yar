import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/adminAuth'
import { requireAndarunSession } from '@/lib/andarunPasswordAuth'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase/server'

const BUDGET_ID = 'default'

function unavailable() {
  return NextResponse.json({ error: 'Supabase ist nicht konfiguriert.' }, { status: 503 })
}

async function requireBudgetAccess() {
  const admin = await requireAdmin()
  if (!admin.error) return { ok: true }

  const andarun = await requireAndarunSession()
  if (!andarun.error) return { ok: true }

  return admin
}

export async function GET() {
  const access = await requireBudgetAccess()
  if (access.error) return NextResponse.json({ error: access.error }, { status: access.status })
  if (!isSupabaseAdminConfigured) return unavailable()

  const { data, error } = await supabaseAdmin
    .from('admin_budget_state')
    .select('store,recurring,cat_budgets,categories,updated_at')
    .eq('id', BUDGET_ID)
    .maybeSingle()

  if (error) {
    console.error('[admin-budget] GET failed', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({
    store: data?.store ?? {},
    recurring: data?.recurring ?? [],
    catBudgets: data?.cat_budgets ?? {},
    categories: data?.categories ?? [],
    updatedAt: data?.updated_at ?? null,
  })
}

export async function PUT(request) {
  const access = await requireBudgetAccess()
  if (access.error) return NextResponse.json({ error: access.error }, { status: access.status })
  if (!isSupabaseAdminConfigured) return unavailable()

  let body = {}
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Ungültige Budget-Daten.' }, { status: 400 })
  }

  const { store, recurring, catBudgets, categories } = body

  const { error } = await supabaseAdmin
    .from('admin_budget_state')
    .upsert({
      id: BUDGET_ID,
      store: store && typeof store === 'object' ? store : {},
      recurring: Array.isArray(recurring) ? recurring : [],
      cat_budgets: catBudgets && typeof catBudgets === 'object' ? catBudgets : {},
      categories: Array.isArray(categories) ? categories : [],
      updated_at: new Date().toISOString(),
    }, { onConflict: 'id' })

  if (error) {
    console.error('[admin-budget] PUT failed', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ ok: true })
}
