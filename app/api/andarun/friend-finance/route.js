import { NextResponse } from 'next/server'
import { requireAndarunSession } from '@/lib/andarunPasswordAuth'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase/server'
import { financeConflict, mergeFriendLedgers, readFinanceState, writeFinanceState } from '@/utils/financeState'

export async function GET() {
  const access = await requireAndarunSession()
  if (access.error) return NextResponse.json({ error: access.error }, { status: access.status })
  if (!isSupabaseAdminConfigured) return NextResponse.json({ error: 'ذخیره‌سازی آنلاین در دسترس نیست.' }, { status: 503 })
  try {
    const snapshot = await readFinanceState(supabaseAdmin, 'friends')
    return NextResponse.json({ state: snapshot.row ? snapshot.state : null, updatedAt: snapshot.updatedAt, online: true })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(request) {
  const access = await requireAndarunSession()
  if (access.error) return NextResponse.json({ error: access.error }, { status: access.status })
  if (!isSupabaseAdminConfigured) return NextResponse.json({ error: 'ذخیره‌سازی آنلاین در دسترس نیست.' }, { status: 503 })
  let body
  try { body = await request.json() } catch {
    return NextResponse.json({ error: 'اطلاعات ارسال‌شده معتبر نیست.' }, { status: 400 })
  }
  if (!body.state || typeof body.state !== 'object' || Array.isArray(body.state) ||
    Object.values(body.state).some(entries => !Array.isArray(entries))) {
    return NextResponse.json({ error: 'ساختار گردش حساب معتبر نیست.' }, { status: 400 })
  }
  const hasBase = body.baseState && typeof body.baseState === 'object' && !Array.isArray(body.baseState) &&
    Object.values(body.baseState).every(Array.isArray)
  try {
    for (let attempt = 0; attempt < 4; attempt++) {
      const snapshot = await readFinanceState(supabaseAdmin, 'friends')
      const sameVersion = snapshot.updatedAt === (body.expectedUpdatedAt ?? null)
      // Legacy clients may append, but cannot delete entries they never loaded.
      const state = sameVersion ? body.state : mergeFriendLedgers(snapshot.state, body.state, hasBase ? body.baseState : {})
      try {
        const updatedAt = await writeFinanceState(supabaseAdmin, snapshot, { [snapshot.field]: state })
        return NextResponse.json({ ok: true, online: true, updatedAt, state })
      } catch (error) {
        if (error.status !== 409 || attempt === 3) throw error
      }
    }
    throw financeConflict()
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: error.status || 500 })
  }
}
