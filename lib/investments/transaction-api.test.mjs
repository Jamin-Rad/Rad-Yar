import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {manualEntryBatches} from './manual-entry.mjs'

const source=readFileSync(new URL('../../app/api/andarun/investments/transaction/route.js',import.meta.url),'utf8').replace(/^import .*\r?\n/gm,'').replace(/\bexport /g,'')
const input={kind:'BUY',accountId:'self',datetime:'2026-08-23T10:00:00Z',netCents:10100,quantity:'1',name:'Synthetic Equity',isin:'US0378331005',feeCents:100,taxCents:0}
const old=manualEntryBatches({...input,requestId:'api_change_123'},Date.parse('2026-08-24T10:00:00Z'))[0].rows[0]
test('transaction API scopes mutations to session owner and validates edits',async()=>{
 const calls=[]
 const handler=new Function('NextResponse','requireAndarunSession','isSupabaseAdminConfigured','supabaseAdmin','manualEntryBatches',source+';return POST')(
  {json:(body,init)=>Response.json(body,init)},async()=>({ownerId:'session-owner'}),true,{rpc:async(name,args)=>{calls.push({name,args});return {data:{changed:true},error:null}}},value=>manualEntryBatches(value,Date.parse('2026-08-24T10:00:00Z')))
 const req=(body,origin='https://example.test')=>new Request('https://example.test/api/andarun/investments/transaction',{method:'POST',headers:{Origin:origin},body:JSON.stringify(body)})
 assert.equal((await handler(req({action:'delete',transaction:old},'https://other.test'))).status,403)
 assert.equal((await handler(req({action:'delete',transaction:old,ownerId:'attacker'}))).status,200)
 assert.equal(calls[0].args.p_owner_id,'session-owner')
 assert.equal(calls[0].args.p_old_payload.accountId,undefined)
 assert.equal((await handler(req({action:'edit',transaction:old,input:{...input,netCents:10200}}))).status,200)
 assert.equal(calls[1].args.p_new_payload.id,old.id)
 assert.equal(calls[1].args.p_new_payload.cashCents,-10200)
 assert.equal((await handler(req({action:'edit',transaction:old,input:{...input,isin:'US5949181045'}}))).status,400)
})
