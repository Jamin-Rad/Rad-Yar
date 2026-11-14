import { NextResponse } from 'next/server'
import { clerkClient } from '@clerk/nextjs/server'
import { account, linked, db, randomToken, rowsFor } from '@/lib/kartino/server'
import { catalog, digest, wireProgress, validEvents } from '@/lib/kartino/catalog'
export const runtime='nodejs'
export const dynamic='force-dynamic'
const response=(body,status=200)=>NextResponse.json(body,{status,headers:{'Cache-Control':'no-store'}})
export async function POST(request,{params}) {
 try {
  const accountID=await account(request)
  if(!accountID)return response({error:'Sign in to Kartino again.'},401)
  const {action}=await params
  if(Number(request.headers.get('content-length')||0)>500000)return response({error:'Request too large'},413)
  const raw=await request.text();if(raw.length>500000)return response({error:'Request too large'},413)
  let body;try{body=JSON.parse(raw)}catch{return response({error:'Invalid request'},400)}
  if(action==='start'){
   if(!/^[A-Za-z0-9_-]{43}$/.test(body.challenge||'') || !/^[A-Za-z0-9_-]{32,128}$/.test(body.state||''))return response({error:'Invalid authorization request'},400)
   const {count,error:countError}=await db.from('kartino_radyar_pending').select('id',{count:'exact',head:true}).eq('account_id',accountID).gt('expires_at',new Date().toISOString())
   if(countError)throw countError
   if(count>=5)return response({error:'Please wait a few minutes and retry.'},429)
   const {data,error}=await db.from('kartino_radyar_pending').insert({account_id:accountID,challenge:body.challenge,state:body.state,expires_at:new Date(Date.now()+10*60000).toISOString()}).select('id').single();if(error)throw error
   return response({url:new URL('/kartino/connect?id='+data.id,request.url).toString()})
  }
  if(action==='exchange'){
   if(!/^[A-Za-z0-9_-]{43,128}$/.test(body.verifier||'') || !/^[0-9a-f-]{36}$/i.test(body.code||''))return response({error:'Invalid code'},400)
   const token=randomToken();const challenge=Buffer.from(digest(body.verifier),'hex').toString('base64url')
   const {data,error}=await db.rpc('kartino_radyar_exchange',{p_id:body.code,p_account:accountID,p_challenge:challenge,p_token:digest(token)})
   if(error)throw error
   if(!data)return response({error:'Connection expired. Please connect again.'},401)
   const {data:created,error:readError}=await db.from('kartino_radyar_links').select('clerk_id').eq('id',data.id).eq('account_id',accountID).single();if(readError)throw readError
   return response({token,name:data.name,linkID:data.id,userID:created.clerk_id})
  }
  const link=await linked(request,accountID)
  if(!link)return response({error:'Reconnect to RadYar in Settings.'},401)
  if(action==='disconnect'){
   const {error}=await db.from('kartino_radyar_links').delete().eq('id',link.id).eq('account_id',accountID);if(error)throw error
   return response({ok:true})
  }
  if(action!=='sync')return response({error:'Not found'},404)
  if(!validEvents(body.events||[]))return response({error:'Invalid review batch'},400)
  const clerk=await clerkClient();let user
  try{user=await clerk.users.getUser(link.clerk_id)}catch(e){if(e.status===404)return response({error:'RadYar account unavailable. Reconnect.'},401);throw e}
  let rows=await rowsFor(link.owner_id)
  const content=catalog(user,body.language,wireProgress(rows))
  // Do not accept invented card IDs. Previously downloaded cards can submit pending
  // reviews after entitlement expiry; the response still restricts current content.
  const { FLASHCARDS }=await import('@/data/flashcards')
  const ids=new Set(FLASHCARDS.map(c=>c.id))
  const removedEvents=(body.events||[]).filter(e=>!ids.has(e.cardID))
  const currentEvents=(body.events||[]).filter(e=>ids.has(e.cardID))
  let acknowledgements=removedEvents.map(e=>e.id),conflicts=removedEvents.length
  if(currentEvents.length){
   const {data,error}=await db.rpc('kartino_radyar_reviews',{p_link:link.id,p_owner:link.owner_id,p_events:currentEvents});if(error)throw error
   acknowledgements.push(...data.acknowledged);conflicts+=data.conflicts;rows=await rowsFor(link.owner_id)
  }
  const progress=wireProgress(rows);const progressHash=digest(progress)
  return response({name:link.name,manifest:content.manifest,decks:content.decks.filter(d=>body.manifest?.[d.id]!==content.manifest[d.id]),progress:!body.events?.length && body.progressHash===progressHash ? null:progress,progressHash,acknowledged:acknowledgements,conflicts,validUntil:content.validUntil,fullAccess:content.fullAccess,sessionLimit:content.sessionLimit,serverTime:new Date().toISOString()})
 }catch(error){console.error('Kartino bridge:',error?.code||error?.name||'failed');return response({error:'Sync is temporarily unavailable. Your offline reviews are safe; retry shortly.'},503)}
}
