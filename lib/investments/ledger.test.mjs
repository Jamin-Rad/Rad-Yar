import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {PGlite} from '@electric-sql/pglite'
import {transactionsFromCsv,LEDGER_COLUMNS,ledgerReport,ledgerCsv,ledgerUnits,ledgerQuantity} from './ledger.mjs'
const isin='US0378331005'
function csv(rows) {return [LEDGER_COLUMNS.join(','),...rows.map(r=>LEDGER_COLUMNS.map(k=>'"'+String(r[k]??'').replaceAll('"','""')+'"').join(','))].join('\r\n')}
function source(id,type='BUY',extra={}) {return {transaction_id:id,datetime:'2025-01-01T12:00:00Z',date:'2025-01-01',account_type:'DEFAULT',type,category:'TRADING',name:'Synthetic Asset',symbol:isin,shares:type==='SELL'?'-2':'2',price:'10',amount:type==='SELL'?'20':'-20',fee:'-1',currency:'EUR',...extra}}
const parsed=rows=>transactionsFromCsv(csv(rows),'self').transactions

test('ledger preserves fractional precision, broker accounting date and signed components without double-counting fees',()=>{
 const tx=parsed([source('a','BUY',{date:'2025-01-02',datetime:'2025-01-01T23:30:00Z',shares:'0.0000000001',price:'1000000000',amount:'-0.10'})])[0]
 assert.equal(tx.quantity,'0.0000000001');assert.equal(tx.date,'2025-01-02');assert.equal(tx.cashCents,-110)
 assert.equal(ledgerQuantity(ledgerUnits('-0.0000000001')),'-0.0000000001')
})
test('ledger rejects wrong owner class, foreign financial currency, sub-cent cash and net-instead-of-gross trade amounts',()=>{
 for(const row of [source('a','BUY',{account_type:'JUNIOR'}),source('a','BUY',{currency:'USD'}),source('a','BUY',{tax:'-0.001'}),source('a','BUY',{amount:'-21'})])assert.throws(()=>parsed([row]))
 assert.throws(()=>transactionsFromCsv(csv([source('j','BUY',{account_type:'JUNIOR'})]),'fatemeh'))
 const input=csv([source('same')]);assert.throws(()=>transactionsFromCsv(input,'mobin'))
 assert.equal(transactionsFromCsv(csv([source('j','BUY',{account_type:'JUNIOR'})]),'mobina').transactions.length,1)
})
test('duplicate identical IDs are ignored inside a file; conflicting duplicates are rejected',()=>{
 assert.equal(transactionsFromCsv(csv([source('a'),source('a')]),'self').duplicates,1)
 assert.throws(()=>parsed([source('a'),source('a','BUY',{name:'Changed'})]))
})
test('FIFO carries full history into a later reporting year and conserves partial lot costs including buy and sell fees',()=>{
 const txs=parsed([source('buy','BUY',{shares:'0.3',price:'100',amount:'-30',fee:'-1.01',date:'2024-12-31',datetime:'2024-12-31T12:00:00Z'}),source('s1','SELL',{shares:'-0.1',price:'110',amount:'11',fee:'-1',tax:'-0.10',date:'2025-01-02',datetime:'2025-01-02T12:00:00Z'}),source('s2','SELL',{shares:'-0.2',price:'110',amount:'22',fee:'-1',tax:'-0.20',date:'2025-01-03',datetime:'2025-01-03T12:00:00Z'})])
 const report=ledgerReport(txs,{from:'2025-01-01',to:'2025-12-31'})
 assert.equal(report.rows.length,2);assert.equal(report.sales.reduce((s,t)=>s+t.costCents,0),3101)
 assert.equal(report.summary.realizedBeforeTaxCents,-1);assert.equal(report.summary.realizedAfterTaxCents,-31)
 assert.equal(report.holdings.length,0)
})
test('missing opening purchases, pre-existing dividend holdings and corporate actions never receive zero cost',()=>{
 for(const prefix of [[],[source('d','DIVIDEND',{shares:'3',price:'',amount:'1',fee:''})],[source('corp','SPIN_OFF',{shares:'1',price:'',amount:'',fee:'',currency:''})]]){
  const txs=parsed([...prefix,source('buy'),source('sell','SELL',{date:'2025-02-01',datetime:'2025-02-01T12:00:00Z',shares:'-3',price:'12',amount:'36'})])
  const report=ledgerReport(txs);assert.equal(report.sales[0].costCents,null);assert.equal(report.summary.realizedAfterTaxCents,null)
 }
})
test('income, refunds and transfers are separate; blank noncash money is preserved and holdings honor period end',()=>{
 const txs=parsed([source('buy'),source('div','DIVIDEND',{shares:'2',price:'',amount:'2.00',fee:'',tax:'-0.50'}),source('refund','TAX_OPTIMIZATION',{symbol:'',shares:'',price:'',amount:'0',fee:'',tax:'0.20'}),source('transfer','TRANSFER_IN',{symbol:'',shares:'',price:'',amount:'1000',fee:''}),source('future','BUY',{date:'2026-01-01',datetime:'2026-01-01T12:00:00Z'})])
 const r=ledgerReport(txs,{to:'2025-12-31'})
 assert.equal(r.summary.incomeGrossCents,200);assert.equal(r.summary.incomeNetCents,150)
 assert.equal(r.summary.taxWithheldCents,50);assert.equal(r.summary.taxRefundedCents,20);assert.equal(r.summary.taxNetCents,30)
 assert.equal(r.summary.inboundCents,100000);assert.equal(r.holdings[0].quantity,'2')
 assert.equal(parsed([source('c','SPLIT',{amount:'',fee:'',price:'',currency:''})])[0].amountCents,null)
})
test('ownership is respected in calculations and spreadsheet text is protected from formula injection',()=>{
 const tx=parsed([source('same','BUY',{name:'=HYPERLINK("https://example.com")'})])[0]
 const r=ledgerReport([tx,{...tx,accountId:'mobin'}],{accountId:'self'})
 assert.equal(r.rows.length,1);assert.equal(r.holdings.length,1)
 assert.ok(ledgerCsv(r).includes("'=HYPERLINK"))
})

test('private database ledger imports atomically, survives repeat imports, rejects conflicts and denies client access',async()=>{
 const db=new PGlite()
 try{
 await db.exec('create role anon; create role authenticated; create role service_role bypassrls;')
 await db.exec(readFileSync(new URL('../../supabase/migrations/20261102132950_investment_transaction_ledger.sql',import.meta.url),'utf8'))
 const rows=parsed([source('a')]);const hash='a'.repeat(64)
 const insert=async(owner,account,sourceHash,values)=>{const r=await db.query('select public.import_andarun_investment_transactions($1,$2,$3,$4,$5,$6::jsonb) as result',[owner,account,sourceHash,'synthetic.csv','synthetic',JSON.stringify(values)]);return r.rows[0].result}
 assert.equal((await insert('owner','self',hash,rows)).added,1)
 assert.equal((await insert('owner','self',hash,rows)).duplicates,1)
 assert.equal((await insert('owner','self','b'.repeat(64),rows)).added,0)
 await assert.rejects(insert('owner','self','c'.repeat(64),[{...rows[0],name:'changed'}]),/LEDGER_CONFLICT/)
 assert.equal((await db.query("select count(*)::int as count from public.andarun_investment_imports")).rows[0].count,2)
 const junior=transactionsFromCsv(csv([source('a','BUY',{account_type:'JUNIOR'})]),'mobin').transactions
 assert.equal((await insert('owner','mobin',hash,junior)).added,1)
 assert.equal((await insert('other-owner','self',hash,rows)).added,1)
 const snapshot=(await db.query("select public.read_andarun_investment_ledger('owner') as result")).rows[0].result
 assert.equal(snapshot.transactions.length,2)
 await db.exec('set role anon')
 await assert.rejects(db.query("select * from public.andarun_investment_transactions"),/permission denied/)
 await assert.rejects(db.query("select public.read_andarun_investment_ledger('owner')"),/permission denied/)
 }finally{await db.close()}
})
