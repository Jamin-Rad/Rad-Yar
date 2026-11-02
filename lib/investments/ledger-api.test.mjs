import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {transactionsFromCsv,LEDGER_COLUMNS} from './ledger.mjs'
const source=readFileSync(new URL('../../app/api/andarun/investments/ledger/route.js',import.meta.url),'utf8').replace(/^import .*\n/gm,'').replace(/\bexport /g,'')
function handlers({allowed=true,configured=true,error=null,missing=false}={}){
 const calls=[]
 const supabaseAdmin={rpc:async(name,args)=>{calls.push({name,args});return{data:name.startsWith('read_')?{transactions:[],imports:[]}:{added:1,duplicates:0},error}},from:name=>{
  const filters=[]
  const query={select:()=>query,eq:(key,value)=>{filters.push([key,value]);return query},maybeSingle:async()=>{calls.push({table:name,filters});return{data:missing?null:{raw_csv:'synthetic',filename:'source.csv'},error}}}
  return query
 }}
 const factory=new Function('NextResponse','requireAndarunSession','isSupabaseAdminConfigured','supabaseAdmin','transactionsFromCsv','createHash',source+'\nreturn {GET,POST};')
 return {...factory({json:(body,init)=>Response.json(body,init)},async()=>allowed?{ownerId:'session-owner'}:{error:'denied'},configured,supabaseAdmin,transactionsFromCsv,createHash),calls}
}
const get=url=>new Request('http://localhost:3016/api/andarun/investments/ledger'+url)
const row={datetime:'2026-01-01T12:00:00Z',date:'2026-01-01',account_type:'DEFAULT',category:'CASH',type:'TRANSFER_IN',amount:'100',currency:'EUR',transaction_id:'synthetic-id'}
const csv=[LEDGER_COLUMNS.join(','),LEDGER_COLUMNS.map(k=>row[k]||'').join(',')].join('\n')
const post=(body,origin='http://localhost:3016')=>new Request('http://localhost:3016/api/andarun/investments/ledger',{method:'POST',headers:{'Content-Type':'application/json',Origin:origin},body:JSON.stringify(body)})
test('ledger routes authenticate every read/write and retain private no-store headers',async()=>{
 const h=handlers({allowed:false})
 for(const response of [await h.GET(get('')),await h.POST(post({}))]){assert.equal(response.status,403);assert.equal(response.headers.get('cache-control'),'private, no-store');assert.equal(response.headers.get('vary'),'Cookie')}
 assert.equal(h.calls.length,0)
 const unavailable=handlers({configured:false});assert.equal((await unavailable.GET(get(''))).status,503)
})
test('ledger import binds the authenticated owner, validates source/account, and rejects cross-origin writes',async()=>{
 const h=handlers();assert.equal((await h.POST(post({accountId:'self',csv,filename:'source.csv',ownerId:'other-owner'}))).status,200)
 assert.equal(h.calls[0].args.p_owner_id,'session-owner');assert.equal(h.calls[0].args.p_account_id,'self');assert.equal(h.calls[0].args.p_rows.length,1)
 assert.equal((await h.POST(post({accountId:'self',csv},'https://other.example'))).status,403)
 assert.equal((await h.POST(post({accountId:'mobin',csv}))).status,400)
 assert.equal((await h.POST(post({accountId:'self',csv:'bad'}))).status,400)
})
test('source download is scoped to session owner plus account and hash; malformed/missing sources are explicit',async()=>{
 const h=handlers(),hash='a'.repeat(64)
 assert.equal((await h.GET(get('?source='+hash+'&account=self'))).status,200)
 assert.deepEqual(h.calls[0].filters,[['owner_id','session-owner'],['account_id','self'],['source_hash',hash]])
 assert.equal((await h.GET(get('?source=invalid&account=self'))).status,400)
 assert.equal((await handlers({missing:true}).GET(get('?source='+hash+'&account=self'))).status,404)
})
test('conflicting existing transactions are reported without a successful import',async()=>{
 const h=handlers({error:{message:'LEDGER_CONFLICT: Synthetic row changed'}})
 assert.equal((await h.POST(post({accountId:'self',csv}))).status,409)
 const read=handlers();assert.equal((await read.GET(get(''))).status,200);assert.deepEqual(read.calls[0],{name:'read_andarun_investment_ledger',args:{p_owner_id:'session-owner'}})
})
