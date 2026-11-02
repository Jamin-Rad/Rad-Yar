import { createHash } from 'node:crypto'
import { NextResponse } from 'next/server'
import { requireAndarunSession } from '@/lib/andarunPasswordAuth'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase/server'
import { transactionsFromCsv } from '@/lib/investments/ledger.mjs'

export const dynamic = 'force-dynamic'
const headers = { 'Cache-Control': 'private, no-store', Vary: 'Cookie' }
const json = (body,status=200) => NextResponse.json(body,{status,headers})
export async function GET(request) {
  const access=await requireAndarunSession()
  if(access.error)return json({error:'دسترسی به تراکنش‌های خصوصی مجاز نیست.'},403)
  if(!isSupabaseAdminConfigured)return json({error:'اتصال خصوصی تراکنش‌ها به سرور پیکربندی نشده است.'},503)
  const params=new URL(request.url).searchParams
  const source=params.get('source'),account=params.get('account')
  if(source){
    if(!/^[a-f0-9]{64}$/.test(source)||!['self','fatemeh','mobin','mobina'].includes(account))return json({error:'شناسه فایل یا حساب معتبر نیست.'},400)
    const {data,error}=await supabaseAdmin.from('andarun_investment_imports').select('raw_csv,filename').eq('owner_id',access.ownerId).eq('account_id',account).eq('source_hash',source).maybeSingle()
    if(error)return json({error:'فایل اصلی دریافت نشد.'},503)
    if(!data)return json({error:'فایل پیدا نشد.'},404)
    return json({csv:data.raw_csv,filename:data.filename})
  }
  const {data,error}=await supabaseAdmin.rpc('read_andarun_investment_ledger',{p_owner_id:access.ownerId})
  if(error||!Array.isArray(data?.transactions)||!Array.isArray(data?.imports))return json({error:'دفتر تراکنش‌ها دریافت نشد؛ اطلاعات قبلی را نگه دار.'},503)
  if(Buffer.byteLength(JSON.stringify(data),'utf8')>4_000_000)return json({error:'حجم دفتر برای دریافت یک‌جا زیاد است؛ خروجی کامل نیازمند پردازش سرور است.'},413)
  return json({...data,cloud:true})
}
export async function POST(request) {
  const access=await requireAndarunSession()
  if(access.error)return json({error:'دسترسی مجاز نیست.'},403)
  const origin=request.headers.get('origin')
  if(origin&&origin!==new URL(request.url).origin)return json({error:'مبدأ درخواست مجاز نیست.'},403)
  if(!isSupabaseAdminConfigured)return json({error:'ذخیره خصوصی تراکنش‌ها در دسترس نیست؛ فایل اصلی را نگه دار.'},503)
  let body,parsed
  try{
    const text=await request.text()
    if(Buffer.byteLength(text,'utf8')>3_500_000)return json({error:'حجم درخواست بیش از حد مجاز است.'},413)
    body=JSON.parse(text)
    if(typeof body.csv!=='string'||Buffer.byteLength(body.csv,'utf8')>3_000_000)throw Error('فایل تراکنش باید کمتر از ۳ مگابایت باشد.')
    parsed=transactionsFromCsv(body.csv,body.accountId)
  }catch(error){return json({error:error.message||'قالب فایل معتبر نیست.'},400)}
  const sourceHash=createHash('sha256').update(body.csv).digest('hex')
  const filename=String(body.filename||'transactions.csv').replace(/[\r\n/\\]/g,'_').slice(0,200)
  const {data,error}=await supabaseAdmin.rpc('import_andarun_investment_transactions',{p_owner_id:access.ownerId,p_account_id:body.accountId,p_source_hash:sourceHash,p_filename:filename,p_csv:body.csv,p_rows:parsed.transactions})
  if(error){
    if(error.message?.includes('LEDGER_CONFLICT'))return json({error:'شناسه تراکنش موجود با محتوای متفاوت پیدا شد؛ هیچ ردیفی از این فایل ذخیره نشد. فایل و حساب را بررسی کن.'},409)
    return json({error:'ذخیره تراکنش انجام نشد؛ فایل اصلی را نگه دار و دوباره تلاش کن.'},503)
  }
  return json({...data,duplicates:data.duplicates+parsed.duplicates,sourceHash})
}
