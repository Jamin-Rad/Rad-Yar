import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {normalizeFamilyState,assertHistoryPreserved,MAX_BACKUP_BYTES} from './family.mjs'
import {reconcileHoldings} from './holdings.mjs'
import {initialInvestmentState} from './test-fixtures.mjs'
const source=readFileSync(new URL('../../app/api/andarun/investments/route.js',import.meta.url),'utf8').replace(/^import .*\n/gm,'').replace(/\bexport /g,'')
const initial=()=>{const s=normalizeFamilyState(initialInvestmentState());s.accounts.forEach(a=>a.positions=[]);return s}
const buy={id:'synthetic-buy',accountId:'mobin',isin:'US0378331005',name:'Synthetic Equity',type:'BUY',quantity:'0.25',assetClass:'STOCK',date:'2026-01-01',datetime:'2026-01-01T12:00:00Z',sourceRow:2,amountCents:-1000,cashCents:-1100,feeCents:-100,issues:[]}
const revision='2026-01-02T12:00:00Z'
function handlers({allowed=true,ledgerError=false}={}){
 const calls=[]
 const admin={rpc:async(name,args)=>{calls.push({name,args});return{data:{transactions:[buy]},error:ledgerError?{message:'unavailable'}:null}},from:()=>{
  let mode='read',written=null
  const q={select:()=>q,eq:()=>q,update:value=>{mode='write';written=value;return q},insert:value=>{mode='write';written=value;return q},maybeSingle:async()=>{if(mode==='write'){calls.push({written});return{data:{updated_at:written.updated_at},error:null}}return{data:{state:initial(),updated_at:revision},error:null}},single:async()=>({data:{updated_at:written.updated_at},error:null})}
  return q
 }}
 const factory=new Function('NextResponse','requireAndarunSession','isSupabaseAdminConfigured','supabaseAdmin','initialInvestmentState','normalizeFamilyState','assertHistoryPreserved','MAX_BACKUP_BYTES','reconcileHoldings',source+'\nreturn {GET,PUT}')
 return {...factory({json:(body,init)=>Response.json(body,init)},async()=>allowed?{ownerId:'session-owner'}:{error:'denied'},true,admin,initialInvestmentState,normalizeFamilyState,assertHistoryPreserved,MAX_BACKUP_BYTES,reconcileHoldings),calls}
}
const put=()=>new Request('https://example.test/api/andarun/investments',{method:'PUT',headers:{Origin:'https://example.test'},body:JSON.stringify({state:initial(),revision,ownerId:'another-owner'})})
test('portfolio reads automatically derive holdings from the authenticated ledger',async()=>{
 const h=handlers(),r=await h.GET(),body=await r.json()
 assert.equal(r.status,200);assert.equal(body.state.accounts[2].positions[0].quantity,'0.25');assert.equal(body.state.accounts[2].positions[0].valueCents,null)
 assert.equal(h.calls[0].args.p_owner_id,'session-owner');assert.equal(r.headers.get('cache-control'),'private, no-store')
 assert.equal((await handlers({allowed:false}).GET()).status,403)
})
test('portfolio writes reapply the ledger, so an empty stale draft cannot erase imported holdings',async()=>{
 const h=handlers(),r=await h.PUT(put()),body=await r.json()
 assert.equal(r.status,200);assert.equal(body.state.accounts[2].positions[0].quantity,'0.25')
 const saved=h.calls.find(c=>c.written).written
 assert.equal(saved.owner_id,'session-owner');assert.equal(saved.state.accounts[2].positions[0].ledger.costCents,1100)
})
test('ledger failure preserves the prior portfolio rather than returning or saving empty derived holdings',async()=>{
 const h=handlers({ledgerError:true})
 assert.equal((await h.GET()).status,503);assert.equal((await h.PUT(put())).status,503)
 assert.equal(h.calls.filter(c=>c.written).length,0)
})
