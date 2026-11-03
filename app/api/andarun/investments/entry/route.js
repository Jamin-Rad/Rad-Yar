import { createHash } from 'node:crypto'
import { NextResponse } from 'next/server'
import { requireAndarunSession } from '@/lib/andarunPasswordAuth'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase/server'
import { manualEntryBatches } from '@/lib/investments/manual-entry.mjs'

export const dynamic='force-dynamic'
const headers={'Cache-Control':'private, no-store',Vary:'Cookie'}
const json=(body,status=200)=>NextResponse.json(body,{status,headers})
export async function POST(request){
  const access=await requireAndarunSession()
  if(access.error)return json({error:'دسترسی مجاز نیست.'},403)
  const origin=request.headers.get('origin')
  if(origin&&origin!==new URL(request.url).origin)return json({error:'مبدأ درخواست مجاز نیست.'},403)
  if(!isSupabaseAdminConfigured)return json({error:'اتصال سرور برقرار نیست.'},503)
  let batches
  try{
    const text=await request.text();if(Buffer.byteLength(text,'utf8')>16000)return json({error:'حجم ثبت بیش از حد مجاز است.'},413)
    batches=manualEntryBatches(JSON.parse(text)).map(b=>({...b,sourceHash:createHash('sha256').update(JSON.stringify(b)).digest('hex')}))
  }catch(error){return json({error:error.message||'ثبت معتبر نیست.'},400)}
  const {data,error}=await supabaseAdmin.rpc('record_andarun_investment_entry',{p_owner_id:access.ownerId,p_batches:batches})
  if(error)return json({error:error.message?.includes('INSUFFICIENT_UNITS')?'تعداد فروش از موجودی ثبت‌شده بیشتر است.':error.message?.includes('LEDGER_CONFLICT')?'این شناسه قبلاً با اطلاعات متفاوت ثبت شده است.':'ثبت انجام نشد؛ دوباره تلاش کن.'},/LEDGER_CONFLICT|INSUFFICIENT_UNITS/.test(error.message)?409:503)
  return json(data)
}
