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

  const { store, recurring, catBudgets, categories, expectedUpdatedAt } = body

  if (Object.prototype.hasOwnProperty.call(body, 'expectedUpdatedAt')) {
    const { data: current, error: versionError } = await supabaseAdmin
      .from('admin_budget_state')
      .select('updated_at')
      .eq('id', BUDGET_ID)
      .maybeSingle()

    if (versionError) {
      console.error('[admin-budget] version check failed', versionError)
      return NextResponse.json({ error: versionError.message }, { status: 500 })
    }

    const currentVersion = current?.updated_at ?? null
    const clientVersion = expectedUpdatedAt ?? null
    if (currentVersion !== clientVersion) {
      return NextResponse.json({
        error: 'Die Online-Daten wurden inzwischen auf einem anderen Gerät geändert.',
        code: 'BUDGET_VERSION_CONFLICT',
        updatedAt: currentVersion,
      }, { status: 409 })
    }
  }

  const updatedAt = new Date().toISOString()

  const { error } = await supabaseAdmin
    .from('admin_budget_state')
    .upsert({
      id: BUDGET_ID,
      store: store && typeof store === 'object' ? store : {},
      recurring: Array.isArray(recurring) ? recurring : [],
      cat_budgets: catBudgets && typeof catBudgets === 'object' ? catBudgets : {},
      categories: Array.isArray(categories) ? categories : [],
      updated_at: updatedAt,
    }, { onConflict: 'id' })

  if (error) {
    console.error('[admin-budget] PUT failed', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ ok: true, updatedAt })
}
