import test from 'node:test'
import assert from 'node:assert/strict'
import { profitRange, periodPlan, periodProfit, periodProfitCsv } from './period-profit.mjs'
const isin='US0378331005', other='US5949181045', now=Date.parse('2026-06-08T15:00:00Z'), today='2026-06-08'
const range=profitRange({mode:'custom',from:'2026-06-01',to:today},today)
const tx=(type,quantity,date,amountCents,extra={})=>({id:type+date,accountId:'self',type,quantity,date,datetime:date+'T12:00:00Z',isin,currency:'EUR',amountCents,cashCents:amountCents,feeCents:null,taxCents:null,...extra})
const account=(quantity='10',extra={})=>({id:'self',owner:'Test',positions:quantity==='0'?[]:[{id:'p',isin,name:'Synthetic',quantity,ledger:{quantityStatus:'transactions'}}],inventoryCheckpoint:{asOf:'2026-06-08T14:00:00Z',holdings:quantity==='0'?[]:[{isin,quantity}]},...extra})
const markets=(extra={})=>({['ISIN:'+isin]:{identity:{isin},quote:{price:120,currency:'EUR',idNotation:1,asOf:'2026-06-08T14:00:00Z'},historyMeta:{verified:true,isin,currency:'EUR',idNotation:1},history:[{date:'2026-05-29',close:100},{date:'2026-06-03',close:110},{date:'2026-06-05',close:115}],...extra}})
const calculate=(accounts,rows,prices=markets(),r=range)=>periodProfit(periodPlan(accounts,rows,r,now),prices,now,today)
test('presets are inclusive calendar dates; custom rejects reversed, invalid and future dates',()=>{
 assert.equal(profitRange({mode:'current'},today),null)
 assert.deepEqual(profitRange({mode:'week'},today),{from:'2026-06-02',to:today,startDate:'2026-06-01'})
 assert.equal(profitRange({mode:'month'},today).from,'2026-05-10')
 assert.equal(profitRange({mode:'year'},today).from,'2026-01-01')
 for(const [from,to] of [['2026-06-09',today],['2026-02-30',today],['2026-06-01','2026-06-09'],['',today]])assert.ok(profitRange({mode:'custom',from,to},today).error)
})
test('held inventory gains use historical EUR close and live end quote without purchase basis',()=>{
 const result=calculate([account()],[])
 assert.equal(result.gainCents,20000)
 assert.equal(result.accounts[0].instruments[0].startAsOf,'2026-05-29')
})
test('buys do not create profit; net costs and tax are counted exactly once',()=>{
 const rows=[tx('BUY','2','2026-06-02',-22000,{cashCents:-22100,feeCents:-100}),tx('DIVIDEND','10','2026-06-04',1000,{cashCents:750,taxCents:-250})]
 const result=calculate([account('12')],rows)
 // 1440 end - 1000 start - 221 purchase + 7.50 dividend.
 assert.equal(result.gainCents,22650)
})
test('fully sold instruments remain in period performance and require their opening price',()=>{
 const rows=[tx('SELL','10','2026-06-04',115000,{cashCents:114000,taxCents:-1000})]
 const result=calculate([account('0')],rows)
 assert.equal(result.gainCents,14000)
 assert.equal(result.accounts[0].instruments[0].startQuantity,'10')
 assert.equal(calculate([account('0')],rows,{}).gainCents,null)
})
test('round trips within the range need no historical prices when both inventories are zero',()=>{
 const rows=[tx('BUY','2','2026-06-02',-20000),tx('SELL','2','2026-06-04',22000)]
 assert.equal(calculate([account('0')],rows,{}).gainCents,2000)
})
test('external deposits and withdrawals are excluded while transfer fees reduce performance',()=>{
 const rows=[tx('TRANSFER_IN',null,'2026-06-02',50000,{isin:'',cashCents:49900,feeCents:-100}),tx('TRANSFER_OUT',null,'2026-06-03',-20000,{isin:''}),tx('INTEREST_PAYMENT',null,'2026-06-04',500,{isin:'',cashCents:400,taxCents:-100})]
 assert.equal(calculate([account('0')],rows,{}).gainCents,300)
})
test('family transfers do not count as profit in either account or family totals',()=>{
 const rows=[tx('TRANSFER_OUT',null,'2026-06-02',-100000,{isin:''}),tx('TRANSFER_IN',null,'2026-06-02',100000,{isin:'',accountId:'child'})]
 const result=calculate([account('0'),{...account('0'),id:'child'}],rows,{})
 assert.equal(result.gainCents,0)
 assert.deepEqual(result.accounts.map(a=>a.gainCents),[0,0])
})
test('historical end date excludes later trades, income and quotes',()=>{
 const historical=profitRange({mode:'custom',from:'2026-06-01',to:'2026-06-03'},today)
 const rows=[tx('BUY','2','2026-06-04',-23000),tx('DIVIDEND','10','2026-06-05',1000)]
 assert.equal(calculate([account('12')],rows,markets(),historical).gainCents,10000)
})
test('inclusive endpoints: first and last date count, preceding and following dates do not',()=>{
 const rows=['2026-05-31','2026-06-01','2026-06-08','2026-06-09'].map(date=>tx('INTEREST_PAYMENT',null,date,100,{isin:''}))
 assert.equal(calculate([account('0')],rows,{}).gainCents,200)
})
test('incomplete or cross-currency, cross-instrument and stale prices never yield a complete result',()=>{
 for(const change of [{historyMeta:{verified:false}}, {identity:{isin:other}}, {quote:{price:120,currency:'USD',idNotation:1,asOf:'2026-06-08T14:00:00Z'}}, {historyMeta:{verified:true,isin,currency:'EUR',idNotation:2}}, {history:[{date:'2026-05-01',close:100}]}]) {
   const result=calculate([account()],[],markets(change))
   assert.equal(result.complete,false);assert.equal(result.gainCents,null)
 }
 const stale=markets();stale['ISIN:'+isin].quote.asOf='2026-05-01T12:00:00Z'
 assert.equal(calculate([account()],[],stale).gainCents,15000) // Last available daily close is still recent.
 stale['ISIN:'+isin].history=[{date:'2026-05-01',close:100}]
 assert.equal(calculate([account()],[],stale).gainCents,null)
})
test('corporate actions, missing quantities and negative reconstructed inventories are incomplete',()=>{
 for(const row of [tx('SPLIT','5','2026-06-04',null),tx('BUY',null,'2026-06-04',-100),tx('BUY','11','2026-06-04',-100),tx('EXCHANGE','1','2026-06-04',null)])assert.equal(calculate([account()], [row]).gainCents,null)
})
test('verified ledger quantities support accounts without checkpoints; uncertain records do not',()=>{
 const rows=[tx('BUY','10','2026-05-01',-90000)]
 assert.equal(calculate([account('10',{inventoryCheckpoint:null})],rows).gainCents,20000)
 const uncertain=account('10',{inventoryCheckpoint:null});uncertain.positions[0].ledger={quantityStatus:'prior-record'}
 assert.equal(calculate([uncertain],rows).gainCents,null)
})
test('unknown cash events, missing trade cash and foreign cash are incomplete',()=>{
 for(const row of [tx('MYSTERY',null,'2026-06-02',100,{isin:''}),tx('BUY','1','2026-06-02',null),tx('INTEREST_PAYMENT',null,'2026-06-02',100,{isin:'',currency:'USD'})])assert.equal(calculate([account()], [row]).gainCents,null)
})
test('fractional quantities round at currency precision; export includes range, coverage and actual price dates',()=>{
 const result=calculate([account('0.3333333333')],[])
 assert.equal(result.gainCents,667)
 const csv=periodProfitCsv(result,range)
 assert.ok(csv.includes('2026-06-01'));assert.ok(csv.includes('2026-05-29'));assert.ok(csv.includes('6.67'));assert.ok(csv.includes('Complete'))
 assert.equal(periodPlan([],null,range,now),null)
 assert.equal(calculate([account('0')],[],{}).gainCents,0)
})

test('cash liquidation proceeds alone cannot reconstruct missing pre-liquidation shares',()=>{
 const result=calculate([account('0')],[tx('LIQUIDATION_PROCEEDS',null,'2026-06-04',1000)],{})
 assert.equal(result.complete,false)
 assert.equal(result.gainCents,null)
})
