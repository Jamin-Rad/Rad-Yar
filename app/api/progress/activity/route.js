import { NextResponse } from 'next/server'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase/server'
import { getLearningUserIdentity } from '@/lib/userIdentity'
import { ACTIVITY_CATEGORIES, activityDay, activityRow, maxActivityDay, aggregateActivity } from '@/utils/learningActivity'

const unavailable=()=>NextResponse.json({error:'Aktivität nicht verfügbar'},{status:503})
const validCount=value=>Number.isSafeInteger(value)&&value>=0&&value<=86400*365
const validDay=value=>typeof value==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(value)&&Number.isFinite(Date.parse(value))&&new Date(value).toISOString().slice(0,10)===value&&Date.parse(value)<=Date.now()+86400000
function validActivity(value){return value&&typeof value==='object'&&validCount(value.visits??0)&&ACTIVITY_CATEGORIES.every(key=>validCount(value.categories?.[key]??0))&&validCount(value.activeSeconds??0)}

export async function GET(request){
 const identity=await getLearningUserIdentity(request)
 if(!identity)return NextResponse.json({error:'Nicht angemeldet'},{status:401})
 if(identity.storageUnavailable||!isSupabaseAdminConfigured||!supabaseAdmin)return unavailable()
 async function all(table,order){
  const rows=[]
  for(let offset=0;;offset+=1000){
   let query=supabaseAdmin.from(table).select('*').in('user_id',identity.lookupIds).order('user_id')
   for(const key of order)query=query.order(key)
   const {data,error}=await query.range(offset,offset+999)
   if(error)throw error
   rows.push(...data);if(data.length<1000)return rows
  }
 }
 try{
  const [rows,baselines]=await Promise.all([all('learning_activity_sources',['source_id','day']),all('learning_activity_baselines',['day'])])
  const legacyDays={}
  for(const row of baselines)legacyDays[row.day]=maxActivityDay(legacyDays[row.day],activityRow(row))
  // The same source can exist under a historical and canonical owner key.
  const bySource=new Map()
  for(const row of rows){const next=activityRow(row),key=`${next.sourceId}:${next.day}`;bySource.set(key,{...next,...maxActivityDay(bySource.get(key),next)})}
  const sources=[...bySource.values()]
  return NextResponse.json({version:2,legacyDays,sources,days:aggregateActivity(legacyDays,sources)},{headers:{'Cache-Control':'no-store'}})
 }catch{return unavailable()}
}

export async function POST(request){
 const identity=await getLearningUserIdentity(request)
 if(!identity)return NextResponse.json({error:'Nicht angemeldet'},{status:401})
 if(identity.storageUnavailable||!isSupabaseAdminConfigured||!supabaseAdmin)return unavailable()
 let payload
 try{payload=await request.json()}catch{return NextResponse.json({error:'Ungültige Anfrage'},{status:400})}
 if(!payload||typeof payload!=='object'||Array.isArray(payload))return NextResponse.json({error:'Ungültige Anfrage'},{status:400})
 const streams=payload.streams,legacy=payload.legacyDays||{}
 if(!Array.isArray(streams)||streams.length>200||!legacy||Array.isArray(legacy)||typeof legacy!=='object'||Object.keys(legacy).length>5000||
  streams.some(row=>!row||typeof row.sourceId!=='string'||! /^[a-zA-Z0-9_-]{12,80}$/.test(row.sourceId)||!validDay(row.day)||!validActivity(row)||activityDay(row).activeSeconds>86400)||
  Object.entries(legacy).some(([day,value])=>!validDay(day)||!validActivity(value))){return NextResponse.json({error:'Ungültige Anfrage'},{status:400})}
 const {error}=await supabaseAdmin.rpc('sync_learning_activity',{p_user_id:identity.ownerId,p_streams:streams,p_legacy_days:legacy})
 if(error)return unavailable()
 return NextResponse.json({ok:true})
}
