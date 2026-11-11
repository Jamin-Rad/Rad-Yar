import {NextResponse} from 'next/server'
import {requireAndarunSession} from '@/lib/andarunPasswordAuth'
import {isSupabaseAdminConfigured,supabaseAdmin} from '@/lib/supabase/server'
import {manualEntryBatches} from '@/lib/investments/manual-entry.mjs'

export const dynamic='force-dynamic'
const json=(body,status=200)=>NextResponse.json(body,{status,headers:{'Cache-Control':'private, no-store',Vary:'Cookie'}})
export async function POST(request){
 const access=await requireAndarunSession()
 if(access.error)return json({error:'دسترسی مجاز نیست.'},403)
 const origin=request.headers.get('origin')
 if(origin&&origin!==new URL(request.url).origin)return json({error:'مبدأ درخواست مجاز نیست.'},403)
 if(!isSupabaseAdminConfigured)return json({error:'اتصال سرور برقرار نیست.'},503)
 let body,oldPayload,newPayload=null,paired=null,newPaired=null
 try{
  const raw=await request.text();if(Buffer.byteLength(raw,'utf8')>16000)return json({error:'حجم درخواست بیش از حد مجاز است.'},413)
  body=JSON.parse(raw)
  const old=body.transaction
  if(!old||!['self','fatemeh','mobin','mobina'].includes(old.accountId)||!/^[-\w]{1,100}$/.test(old.id)||body.action!=='delete'&&body.action!=='edit')throw Error('تراکنش معتبر نیست.')
  if(old.manual?.linkedAccount){
   paired=body.pairedTransaction
   if(!paired||paired.manual?.requestId!==old.manual.requestId||paired.accountId!==old.manual.linkedAccount||paired.manual?.linkedAccount!==old.accountId)throw Error('دو سمت انتقال باید با هم اصلاح شوند.')
  }
  oldPayload={...old};delete oldPayload.accountId;delete oldPayload.sourceRow
  if(body.action==='edit'){
    if(!['BUY','SELL','TRANSFER_IN','TRANSFER_OUT'].includes(old.type))throw Error('ویرایش این نوع تراکنش پشتیبانی نمی‌شود.')
    const input={...body.input,requestId:'correction_'+crypto.randomUUID().replaceAll('-','')}
    const batches=manualEntryBatches(input)
    if(batches.length!==(paired?2:1))throw Error('ساختار تراکنش معتبر نیست.')
    const replace=(previous,batch)=>{
      if(batch.accountId!==previous.accountId||batch.rows[0].type!==previous.type||(batch.rows[0].isin||'')!==(previous.isin||''))throw Error('نوع، حساب و شناسه دارایی باید ثابت بماند.')
      return {...batch.rows[0],id:previous.id,accountId:previous.accountId,sourceRow:previous.sourceRow,manual:{...batch.rows[0].manual,...(previous.manual?.orderId ? {orderId: previous.manual.orderId} : {}),corrected:true}}
    }
    newPayload=replace(old,batches.find(b=>b.accountId===old.accountId))
    if(paired)newPaired=replace(paired,batches.find(b=>b.accountId===paired.accountId))
  }
 }catch(error){return json({error:error.message||'درخواست معتبر نیست.'},400)}
 const {data,error}=paired?await supabaseAdmin.rpc('change_andarun_investment_transfer',{p_owner_id:access.ownerId,p_first:body.transaction,p_second:paired,p_new_first:newPayload,p_new_second:newPaired}):await supabaseAdmin.rpc('change_andarun_investment_transaction',{p_owner_id:access.ownerId,p_account_id:body.transaction.accountId,p_transaction_id:body.transaction.id,p_old_payload:oldPayload,p_new_payload:newPayload})
 if(error)return json({error:error.message?.includes('INSUFFICIENT_UNITS')?'این تغییر باعث فروش بیش از موجودی می‌شود.':error.message?.includes('TRANSACTION_CHANGED')?'تراکنش در جای دیگری تغییر کرده است؛ صفحه را تازه‌سازی کن.':'تغییر تراکنش انجام نشد.'},/INSUFFICIENT_UNITS|TRANSACTION_CHANGED/.test(error.message)?409:503)
 return json(data)
}
