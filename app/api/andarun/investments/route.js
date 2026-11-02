import { NextResponse } from 'next/server'
import { requireAndarunSession } from '@/lib/andarunPasswordAuth'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase/server'
import { initialInvestmentState } from '@/lib/investments/seed.server'
import { normalizeFamilyState, assertHistoryPreserved, MAX_BACKUP_BYTES } from '@/lib/investments/family.mjs'
import { reconcileHoldings } from '@/lib/investments/holdings.mjs'

export const dynamic = 'force-dynamic'
const headers = { 'Cache-Control': 'private, no-store', Vary: 'Cookie' }
function json(body, status = 200) { return NextResponse.json(body, { status, headers }) }

export async function GET() {
  const access = await requireAndarunSession()
  if (access.error) return json({ error: 'دسترسی به حساب خصوصی مجاز نیست.' }, 403)
  if (isSupabaseAdminConfigured) {
    const [{ data, error },ledger] = await Promise.all([
      supabaseAdmin.from('andarun_investment_state').select('state,updated_at').eq('owner_id', access.ownerId).maybeSingle(),
      supabaseAdmin.rpc('read_andarun_investment_ledger',{p_owner_id:access.ownerId})
    ])
    if (!error&&!ledger.error&&Array.isArray(ledger.data?.transactions)) return json({ state: normalizeFamilyState(reconcileHoldings(normalizeFamilyState(data?.state || initialInvestmentState()),ledger.data.transactions)), revision: data?.updated_at || null, cloud: true })
    return json({ error: 'ذخیره خصوصی سرور موقتاً در دسترس نیست؛ نسخه مرورگر را نگه دار.' }, 503)
  }
  // No storage is silently substituted: the UI labels browser-local saves.
  return json({ state: normalizeFamilyState(initialInvestmentState()), revision: null, cloud: false })
}

export async function PUT(request) {
  const access = await requireAndarunSession()
  if (access.error) return json({ error: 'دسترسی به حساب خصوصی مجاز نیست.' }, 403)
  const origin = request.headers.get('origin')
  if (origin && origin !== new URL(request.url).origin) return json({ error: 'مبدأ درخواست مجاز نیست.' }, 403)
  if (!isSupabaseAdminConfigured) return json({ error: 'ذخیره ابری فعال نیست؛ نسخه مرورگر و خروجی فایل در دسترس است.' }, 503)
  let body, state
  try {
    const raw = await request.text()
    if (Buffer.byteLength(raw, 'utf8') > MAX_BACKUP_BYTES) return json({ error: 'فایل بیش از حد بزرگ است.' }, 413)
    body = JSON.parse(raw)
    state = normalizeFamilyState(body.state)
    if (body.revision !== null && (typeof body.revision !== 'string' || !Number.isFinite(Date.parse(body.revision)))) throw new Error('نسخه ذخیره معتبر نیست.')
  } catch (error) { return json({ error: error.message || 'اطلاعات معتبر نیست.' }, 400) }

  const [stored,ledger] = await Promise.all([
    supabaseAdmin.from('andarun_investment_state').select('state,updated_at').eq('owner_id', access.ownerId).maybeSingle(),
    supabaseAdmin.rpc('read_andarun_investment_ledger',{p_owner_id:access.ownerId})
  ])
  if (stored.error||ledger.error||!Array.isArray(ledger.data?.transactions)) return json({ error: 'ذخیره ابری در دسترس نیست؛ تغییرات در این مرورگر باقی مانده‌اند.' }, 503)
  if ((stored.data?.updated_at || null) !== body.revision) return json({ error: 'نسخه سرور تغییر کرده است؛ ابتدا پشتیبان بگیر و آخرین نسخه را بارگذاری کن.' }, 409)
  try { state=normalizeFamilyState(reconcileHoldings(state,ledger.data.transactions));if (stored.data) assertHistoryPreserved(stored.data.state, state) }
  catch (error) { return json({ error: error.message }, 409) }
  const revision = new Date().toISOString()
  const row = { owner_id: access.ownerId, state, updated_at: revision }
  const result = body.revision
    ? await supabaseAdmin.from('andarun_investment_state').update(row).eq('owner_id', access.ownerId).eq('updated_at', body.revision).select('updated_at').maybeSingle()
    : await supabaseAdmin.from('andarun_investment_state').insert(row).select('updated_at').single()
  if (result.error?.code === '23505' || (!result.error && !result.data)) return json({ error: 'نسخه جدیدتری در سرور وجود دارد. ابتدا از تغییراتت خروجی بگیر و صفحه را دوباره بارگذاری کن.' }, 409)
  if (result.error) return json({ error: 'ذخیره ابری در دسترس نیست؛ تغییرات در این مرورگر باقی مانده‌اند.' }, 503)
  return json({ ok: true, revision: result.data.updated_at, state })
}
