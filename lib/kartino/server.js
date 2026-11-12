import { randomBytes } from 'node:crypto'
import { supabaseAdmin as db } from '@/lib/supabase/server'
import { digest } from './catalog'
export { db }
export const randomToken=()=>randomBytes(32).toString('base64url')
export async function account(request) {
  const raw=request.headers.get('authorization')?.replace(/^Bearer /,'')
  if (!raw || raw.length>512 || !db) return null
  const {data,error}=await db.from('kartino_sessions').select('account_id').eq('token_hash',digest(raw)).gt('expires_at',new Date().toISOString()).maybeSingle()
  if(error) throw error
  return data?.account_id || null
}
export async function linked(request,accountID) {
  const token=request.headers.get('x-radyar-link')
  if(!token || token.length>512) return null
  const {data,error}=await db.from('kartino_radyar_links').select('*').eq('token_hash',digest(token)).eq('account_id',accountID).gt('expires_at',new Date().toISOString()).maybeSingle()
  if(error) throw error
  return data
}
export async function rowsFor(ownerID) {
  const {data:aliases,error:aliasError}=await db.from('learning_legacy_owners').select('legacy_id').eq('user_id',ownerID)
  if(aliasError)throw aliasError
  const owners=[ownerID,...(aliases||[]).map(a=>a.legacy_id)]
  const rows=[]
  for(let offset=0;;offset+=1000){const {data,error}=await db.from('leitner_cards').select('*').in('user_id',owners).order('user_id').order('card_id').range(offset,offset+999);if(error)throw error;rows.push(...data);if(data.length<1000)break}
  const latest=new Map()
  const time=r=>Date.parse(r?.last_reviewed_at||r?.last_seen_at||r?.added_at||0)||0
  for(const row of rows){const old=latest.get(row.card_id);if(!old || time(row)>time(old) || (time(row)===time(old) && row.user_id===ownerID))latest.set(row.card_id,row)}
  const migrate=[...latest.values()].filter(r=>r.user_id!==ownerID).map(r=>({...r,user_id:ownerID}))
  if(migrate.length){const {error}=await db.from('leitner_cards').upsert(migrate,{onConflict:'user_id,card_id'});if(error)throw error}
  return [...latest.values()]
}
