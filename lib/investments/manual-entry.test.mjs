import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {PGlite} from '@electric-sql/pglite'
import {manualEntryBatches} from './manual-entry.mjs'
import {cashPlanStatus} from './cash-plan.mjs'
import {cashBalance,accountBalance,positionBalance} from './balances.mjs'
import {reconcileHoldings} from './holdings.mjs'
import {normalizeFamilyState} from './family.mjs'
import {initialInvestmentState} from './test-fixtures.mjs'
import {fifoAnalysis,ledgerSummary} from './ledger.mjs'
const now=Date.parse('2026-08-24T10:00:00Z')
const base={requestId:'synthetic_1234',kind:'BUY',accountId:'self',datetime:'2026-08-23T10:00:00Z',netCents:10100,quantity:'0.125',name:'Synthetic Equity',isin:'US0378331005',feeCents:100,taxCents:0}
const rows=input=>manualEntryBatches(input,now).flatMap(b=>b.rows)
test('manual buy and sell keep fractional quantity and net cash; expenses are counted once',()=>{
 const buy=rows(base)[0],sale=rows({...base,requestId:'synthetic_sale',kind:'SELL',netCents:11900,datetime:'2026-08-24T09:00:00Z'})[0]
 assert.equal(buy.quantity,'0.125');assert.equal(buy.amountCents,-10000);assert.equal(buy.cashCents,-10100)
 assert.equal(sale.quantity,'-0.125');assert.equal(sale.amountCents,12000);assert.equal(sale.cashCents,11900)
 assert.equal(fifoAnalysis([buy,sale]).sales[0].realizedAfterTaxCents,1800)
})
test('net-only entries preserve unknown fee/tax split without inventing gross or execution price',()=>{
 const buy=rows({...base,feeCents:null,taxCents:null})[0],sale=rows({...base,kind:'SELL',requestId:'net_sale_1',feeCents:null,taxCents:null,netCents:12000,datetime:'2026-08-24T09:00:00Z'})[0]
 assert.equal(buy.cashCents,-10100);assert.equal(buy.amountCents,null);assert.equal(buy.price,null)
 const result=fifoAnalysis([buy,sale]);assert.equal(result.sales[0].realizedAfterTaxCents,1900);assert.equal(result.sales[0].realizedBeforeTaxCents,null)
 assert.equal(ledgerSummary([buy,sale],result.sales).sellCents,null)
})
test('paired transfer conserves family cash and remains separate from profit and quantities',()=>{
 const tx=rows({...base,kind:'TRANSFER',fromAccount:'self',toAccount:'mobin',netCents:25000})
 assert.deepEqual(tx.map(t=>t.cashCents),[-25000,25000]);assert.equal(tx[0].manual.linkedAccount,'mobin')
 assert.equal(ledgerSummary(tx).incomeNetCents,0)
 const state=normalizeFamilyState(initialInvestmentState());state.accounts.forEach(a=>{a.positions=[];a.cashOpening={date:'2026-08-01',balanceCents:50000}})
 const next=reconcileHoldings(state,tx);assert.equal(next.accounts[0].positions.length,0)
 assert.equal(cashBalance(next.accounts[0],tx).balanceCents,25000);assert.equal(cashBalance(next.accounts[2],tx).balanceCents,75000)
 assert.equal(next.accounts.reduce((n,a)=>n+accountBalance(a,tx).equityCents,0),200000)
})
test('manual validation rejects invalid accounts, self transfers, future dates, charges and nonpositive quantities',()=>{
 for(const change of [{accountId:'other'},{netCents:0},{feeCents:-1},{feeCents:10200},{quantity:'0'},{isin:'invalid'},{datetime:'2030-01-01T10:00:00Z'},{datetime:'2026-08-23T10:00:00'},{kind:'TRANSFER',fromAccount:'self',toAccount:'self'}])assert.throws(()=>manualEntryBatches({...base,...change},now))
})
test('confirmed complete inventory continues after the checkpoint, including repurchasing a previously closed holding',()=>{
 const state=normalizeFamilyState(initialInvestmentState());state.accounts.forEach(a=>a.positions=[])
 state.accounts[0].inventoryCheckpoint={asOf:'2026-08-23T09:00:00Z',holdings:[]}
 const oldIncome={...rows(base)[0],id:'old_income',type:'DIVIDEND',quantity:'3',datetime:'2026-08-22T10:00:00Z',date:'2026-08-22'}
 const bought=reconcileHoldings(state,[oldIncome,...rows(base)])
 assert.equal(bought.accounts[0].positions[0].quantity,'0.125');assert.equal(bought.accounts[0].positions[0].ledger.quantityConfirmed,true)
 assert.deepEqual(reconcileHoldings(bought,[oldIncome,...rows(base)]),bought)
 const sold=reconcileHoldings(bought,[oldIncome,...rows(base),...rows({...base,kind:'SELL',requestId:'repurchase_sale',datetime:'2026-08-24T09:00:00Z'})])
 assert.equal(sold.accounts[0].positions.length,0)
 const broker={...bought.accounts[0].positions[0],brokerBasis:{quantity:'0.125',costCents:10100,asOf:'2026-08-23',throughId:rows(base)[0].id}}
 assert.equal(positionBalance(broker,{},now).remainingCostCents,10100)
 assert.equal(positionBalance({...broker,quantity:'0.25'},{},now).remainingCostCents,null)
})
test('monthly deposit stays pending until received; short months and recorded months are handled',()=>{
 const plan={id:'synthetic_plan',accountId:'self',amountCents:1200,day:31,startMonth:'2026-01',active:true}
 assert.equal(cashPlanStatus(plan,[],'2026-02-27').ready,false);assert.equal(cashPlanStatus(plan,[],'2026-02-28').ready,true)
 const tx=rows({...base,kind:'DEPOSIT',planId:plan.id})
 assert.equal(cashPlanStatus({...plan,day:1},tx,'2026-08-24').recorded,true)
 assert.equal(cashPlanStatus({...plan,day:1},tx,'2026-08-24').ready,false)
 assert.equal(cashPlanStatus({...plan,active:false},[],'2026-02-28').ready,false)
 const state=normalizeFamilyState({...normalizeFamilyState(initialInvestmentState()),settings:{cashPlans:[plan]}});assert.deepEqual(state.settings.cashPlans,[plan])
})
test('database entry is atomic, retry-safe, scoped to owner and not callable by anonymous clients',async()=>{
 const db=new PGlite()
 try{
  await db.exec('create role anon; create role authenticated; create role service_role;')
  await db.exec('create table public.andarun_investment_state(owner_id text primary key,state jsonb);')
  await db.exec(readFileSync(new URL('../../supabase/migrations/20261102132950_investment_transaction_ledger.sql',import.meta.url),'utf8'))
  await db.exec(readFileSync(new URL('../../supabase/migrations/20261103072620_investment_manual_entries.sql',import.meta.url),'utf8'))
  const batches=manualEntryBatches({...base,kind:'TRANSFER',fromAccount:'self',toAccount:'mobina'},now).map(b=>({...b,sourceHash:createHash('sha256').update(JSON.stringify(b)).digest('hex')}))
  const call=(owner,b)=>db.query('select public.record_andarun_investment_entry($1,$2::jsonb) as result',[owner,JSON.stringify(b)])
  assert.equal((await call('synthetic-owner',batches)).rows[0].result.added,2)
  assert.deepEqual((await call('synthetic-owner',batches)).rows[0].result,{added:0,duplicates:2})
  assert.equal((await call('other-owner',batches)).rows[0].result.added,2)
  const invalid=JSON.parse(JSON.stringify(batches));invalid[1].sourceHash='bad'
  await assert.rejects(()=>call('rollback-owner',invalid))
  assert.equal((await db.query("select count(*)::int as n from public.andarun_investment_transactions where owner_id='rollback-owner'")).rows[0].n,0)
  assert.equal((await db.query("select count(*)::int as n from public.andarun_investment_imports where owner_id='rollback-owner'")).rows[0].n,0)
  const changed=JSON.parse(JSON.stringify(batches));changed[1].sourceHash='b'.repeat(64);changed[1].rows[0].cashCents++
  await assert.rejects(()=>call('synthetic-owner',changed),/LEDGER_CONFLICT/)
  const permissions=await db.query("select has_function_privilege('anon','public.record_andarun_investment_entry(text,jsonb)','execute') as anonymous")
  assert.equal(permissions.rows[0].anonymous,false)
  const prepare=input=>manualEntryBatches(input,now).map(b=>({...b,sourceHash:createHash('sha256').update(JSON.stringify(b)).digest('hex')}))
  await call('inventory-owner',prepare(base))
  const sale=prepare({...base,requestId:'sale_once',kind:'SELL'})
  assert.equal((await call('inventory-owner',sale)).rows[0].result.added,1)
  assert.equal((await call('inventory-owner',sale)).rows[0].result.duplicates,1)
  await assert.rejects(()=>call('inventory-owner',prepare({...base,kind:'SELL',requestId:'oversell_test'})),/INSUFFICIENT_UNITS/)
 }finally{await db.close()}
})
const source=readFileSync(new URL('../../app/api/andarun/investments/entry/route.js',import.meta.url),'utf8').replace(/^import .*\n/gm,'').replace(/\bexport /g,'')
test('entry API binds session owner, rejects cross-origin/invalid entries and surfaces storage errors',async()=>{
 const calls=[]
 const factory=new Function('NextResponse','requireAndarunSession','isSupabaseAdminConfigured','supabaseAdmin','manualEntryBatches','createHash',source+'; return POST')
 const handler=(allowed=true,error=null)=>factory({json:(body,init)=>Response.json(body,init)},async()=>allowed?{ownerId:'session-owner'}:{error:'denied'},true,{rpc:async(name,args)=>{calls.push({name,args});return {data:{added:1,duplicates:0},error}}},i=>manualEntryBatches(i,now),createHash)
 const req=(input=base,origin='https://example.test')=>new Request('https://example.test/api/andarun/investments/entry',{method:'POST',headers:{Origin:origin},body:JSON.stringify({...input,ownerId:'attacker'})})
 assert.equal((await handler(false)(req())).status,403);assert.equal(calls.length,0)
 assert.equal((await handler()(req(base,'https://other.test'))).status,403)
 assert.equal((await handler()(req({...base,netCents:-1}))).status,400)
 const response=await handler()(req());assert.equal(response.status,200);assert.equal(response.headers.get('cache-control'),'private, no-store');assert.equal(calls[0].args.p_owner_id,'session-owner')
 assert.equal((await handler(true,{message:'LEDGER_CONFLICT'})(req())).status,409)
})
