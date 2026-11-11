import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {createHash} from 'node:crypto'
import {PGlite} from '@electric-sql/pglite'
import {manualEntryBatches} from './manual-entry.mjs'

const base={requestId:'change_buy_123',kind:'BUY',accountId:'self',datetime:'2026-08-23T10:00:00Z',netCents:10100,quantity:'1',name:'Synthetic Equity',isin:'US0378331005',feeCents:100,taxCents:0}
const batches=input=>manualEntryBatches(input,Date.parse('2026-08-24T10:00:00Z')).map(b=>({...b,sourceHash:createHash('sha256').update(JSON.stringify(b)).digest('hex')}))
test('transaction corrections are atomic, audited, owner scoped, and cannot oversell',async()=>{
 const db=new PGlite()
 try{
  await db.exec('create role anon; create role authenticated; create role service_role;')
  await db.exec('create table public.andarun_investment_state(owner_id text primary key,state jsonb);')
  for(const file of ['20261102132950_investment_transaction_ledger.sql','20261103072620_investment_manual_entries.sql','20261111173000_investment_transaction_corrections.sql'])await db.exec(readFileSync(new URL('../../supabase/migrations/'+file,import.meta.url),'utf8'))
  const insert=async input=>db.query('select public.record_andarun_investment_entry($1,$2::jsonb)', ['owner',JSON.stringify(batches(input))])
  const change=async(old,next,owner='owner')=>db.query('select public.change_andarun_investment_transaction($1,$2,$3,$4::jsonb,$5::jsonb) as result',[owner,'self',old.id,JSON.stringify(old),next?JSON.stringify(next):null])
  await insert(base)
  const original=batches(base)[0].rows[0];delete original.accountId;delete original.sourceRow
  const saleInput={...base,requestId:'change_sell_123',kind:'SELL',datetime:'2026-08-24T09:00:00Z',netCents:11900}
  await insert(saleInput)
  await assert.rejects(()=>change(original,null),/INSUFFICIENT_UNITS/)
  const changed={...original,cashCents:-10200}
  assert.equal((await change(original,changed)).rows[0].result.changed,true)
  await assert.rejects(()=>change(original,changed),/TRANSACTION_CHANGED/)
  await assert.rejects(()=>change(changed,null,'other'),/TRANSACTION_NOT_FOUND/)
  const audit=await db.query("select count(*)::int as n from public.andarun_investment_transaction_changes where owner_id='owner'")
  assert.equal(audit.rows[0].n,1)
  const sale=batches(saleInput)[0].rows[0];delete sale.accountId;delete sale.sourceRow
  await change(sale,null)
  await change(changed,null)
  assert.equal((await db.query("select count(*)::int as n from public.andarun_investment_transactions where owner_id='owner'")).rows[0].n,0)
  assert.equal((await db.query("select has_function_privilege('anon','public.change_andarun_investment_transaction(text,text,text,jsonb,jsonb)','execute') as allowed")).rows[0].allowed,false)
  const transfer=batches({...base,kind:'TRANSFER',fromAccount:'self',toAccount:'mobin',requestId:'transfer_change_1',netCents:25000})
  await db.query('select public.record_andarun_investment_entry($1,$2::jsonb)', ['owner',JSON.stringify(transfer)])
  const [outbound,inbound]=transfer.map(b=>b.rows[0])
  const transferChange=(nextOut,nextIn)=>db.query('select public.change_andarun_investment_transfer($1,$2::jsonb,$3::jsonb,$4::jsonb,$5::jsonb)', ['owner',JSON.stringify(outbound),JSON.stringify(inbound),nextOut?JSON.stringify(nextOut):null,nextIn?JSON.stringify(nextIn):null])
  await assert.rejects(()=>transferChange(null,{...inbound,cashCents:26000}),/INVALID_TRANSFER/)
  assert.equal((await db.query("select count(*)::int as n from public.andarun_investment_transactions where owner_id='owner'")).rows[0].n,2)
  await transferChange(null,null)
  assert.equal((await db.query("select count(*)::int as n from public.andarun_investment_transactions where owner_id='owner'")).rows[0].n,0)
 }finally{await db.close()}
})
