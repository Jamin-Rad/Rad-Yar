import {createHash} from 'node:crypto'
import {NextResponse} from 'next/server'
import {requireAndarunSession} from '@/lib/andarunPasswordAuth'
import {isSupabaseAdminConfigured, supabaseAdmin} from '@/lib/supabase/server'
import {manualEntryBatches} from '@/lib/investments/manual-entry.mjs'
import {orderTerms} from '@/lib/investments/orders.mjs'

export const dynamic = 'force-dynamic'
const uuid = /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i
const json = (body, status = 200) => NextResponse.json(body, {status, headers: {'Cache-Control': 'private, no-store', Vary: 'Cookie'}})

export async function GET() {
  const access = await requireAndarunSession()
  if (access.error) return json({error: 'دسترسی مجاز نیست.'}, 403)
  if (!isSupabaseAdminConfigured) return json({error: 'اتصال سرور برقرار نیست.'}, 503)
  const {data, error} = await supabaseAdmin.from('andarun_investment_orders')
    .select('id, terms, created_at, placed_at, cancelled_at, broker_reference, fills')
    .eq('owner_id', access.ownerId).order('created_at', {ascending: false})
  if (error) return json({error: 'دریافت اردرها انجام نشد.'}, 503)
  return json(data)
}

export async function POST(request) {
  const access = await requireAndarunSession()
  if (access.error) return json({error: 'دسترسی مجاز نیست.'}, 403)
  const origin = request.headers.get('origin')
  if (origin && origin !== new URL(request.url).origin) return json({error: 'مبدأ درخواست مجاز نیست.'}, 403)
  if (!isSupabaseAdminConfigured) return json({error: 'اتصال سرور برقرار نیست.'}, 503)
  let id, action, data = {}
  try {
    const raw = await request.text()
    if (Buffer.byteLength(raw, 'utf8') > 16000) return json({error: 'حجم درخواست بیش از حد مجاز است.'}, 413)
    const body = JSON.parse(raw)
    id = body.id
    action = body.action
    if (!uuid.test(id) || !['create', 'edit', 'place', 'cancel', 'fill'].includes(action)) throw Error('درخواست معتبر نیست.')
    if (['place', 'cancel', 'fill'].includes(action) && body.confirmed !== true) throw Error('ابتدا وضعیت اردر را در کارگزاری تأیید کن.')
    if (action === 'create') data = orderTerms(body.terms)
    if (action === 'edit') data = {terms: orderTerms(body.terms), expectedTerms: orderTerms(body.expectedTerms)}
    if (action === 'place') data = {reference: String(body.reference || '').trim().slice(0, 100), expectedTerms: orderTerms(body.expectedTerms)}
    if (action === 'fill') {
      const input = body.input
      if (!['BUY', 'SELL'].includes(input?.kind) || !uuid.test(input?.requestId)) throw Error('اجرای اردر معتبر نیست.')
      const [batch] = manualEntryBatches({
        kind: input.kind, accountId: input.accountId, datetime: input.datetime,
        quantity: input.quantity, name: input.name, isin: input.isin,
        netCents: input.netCents, feeCents: input.feeCents, taxCents: input.taxCents,
        note: input.note, requestId: `order_${input.requestId}`,
      })
      batch.rows[0].manual.orderId = id
      data = {...batch, sourceHash: createHash('sha256').update(JSON.stringify(batch)).digest('hex')}
    }
  } catch (error) {
    return json({error: error.message || 'درخواست معتبر نیست.'}, 400)
  }
  const {data: result, error} = await supabaseAdmin.rpc('manage_andarun_investment_order', {
    p_owner_id: access.ownerId, p_id: id, p_action: action, p_data: data,
  })
  if (!error) return json(result)
  const errors = {
    ORDER_NOT_FOUND: 'اردر پیدا نشد.', ORDER_NOT_OPEN: 'وضعیت اردر تغییر کرده یا اردر هنوز در کارگزاری تأیید نشده است.',
    ORDER_CONFLICT: 'اطلاعات اردر تغییر کرده است. صفحه را تازه کن.', ORDER_QUANTITY: 'تعداد اجرا از ماندهٔ اردر بیشتر است.',
    INSUFFICIENT_UNITS: 'تعداد فروش از موجودی ثبت‌شده بیشتر است.',
  }
  const code = Object.keys(errors).find(key => error.message?.includes(key))
  return json({error: errors[code] || 'ذخیره اردر انجام نشد.'}, code ? 409 : 503)
}
