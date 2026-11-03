import test from 'node:test'
import assert from 'node:assert/strict'
import { profitRange,periodPlan,openPeriodPlan,periodProfit,periodInstruments,periodProfitCsv } from './period-profit.mjs'
const isin='US0378331005',now=Date.parse('2026-06-08T15:00:00Z'),today='2026-06-08',range=profitRange({mode:'custom',from:'2026-06-01',to:today},today)
const account=q=>({id:'self',owner:'Synthetic',positions:q==='0'?[]:[{id:'p',name:'Example',isin,quantity:q,ledger:{quantityStatus:'transactions'}}],inventoryCheckpoint:{asOf:'2026-06-08T14:00:00Z',holdings:q==='0'?[]:[{isin,quantity:q}]}})
const tx=(id,type,quantity,date,cashCents)=>({id,type,quantity,date,datetime:date+'T12:00:00Z',cashCents,amountCents:cashCents,currency:'EUR',accountId:'self',isin,name:'Example',issues:[]})
const market={identity:{isin},quote:{price:120,currency:'EUR',idNotation:1,asOf:'2026-06-08T14:00:00Z'},historyMeta:{verified:true,isin,currency:'EUR',idNotation:1},history:[{date:'2026-05-29',close:100},{date:'2026-06-03',close:110}]}
function calc(q,rows,r=range,prices={[`ISIN:${isin}`]:market}){const plan=openPeriodPlan(periodPlan([account(q)],rows,r,now));return {plan,result:{...periodProfit(plan,prices,now,today),scope:'open'}}}
test('a full exit produces no current holding profit even with positive sale proceeds',()=>{
 const {plan,result}=calc('0',[tx('s','SELL','10','2026-06-03',115000)])
 assert.equal(result.gainCents,0);assert.equal(result.count,0);assert.deepEqual(periodInstruments(plan,today),[])
})
test('partial sales leave only the retained opening shares in current performance',()=>{
 const {plan,result}=calc('6',[tx('s','SELL','4','2026-06-03',46000)])
 assert.equal(plan[0].instruments[0].startQuantity,'6');assert.equal(result.gainCents,12000)
})
test('FIFO consumes old shares before new buys and allocates purchase fees to remaining lots',()=>{
 // Start with 3 old shares, buy 4 for 441 EUR, then sell 5: two new shares remain.
 const rows=[tx('b','BUY','4','2026-06-02',-44100),tx('s','SELL','5','2026-06-04',57500)]
 const {plan,result}=calc('2',rows)
 assert.equal(plan[0].instruments[0].startQuantity,'0');assert.equal(result.gainCents,1950)
 assert.deepEqual(periodInstruments(plan,today)[0].historyDates,[])
 // No opening quote is needed when all retained lots were bought inside the period.
 assert.equal(calc('2',rows,range,{[`ISIN:${isin}`]:{...market,history:[],historyMeta:null}}).result.gainCents,1950)
})
test('a sell followed by a repurchase measures only the new open lot',()=>{
 const {result}=calc('2',[tx('s','SELL','10','2026-06-02',130000),tx('b','BUY','2','2026-06-04',-23000)])
 assert.equal(result.gainCents,1000)
})
test('dividends and deposits are separate from the retained security price gain',()=>{
 const result=calc('10',[tx('d','DIVIDEND','10','2026-06-03',1000),{...tx('cash','TRANSFER_IN',null,'2026-06-03',50000),isin:''}]).result
 assert.equal(result.gainCents,20000)
})
test('past range ends use holdings and prices as of that date, excluding later sells',()=>{
 const r=profitRange({mode:'custom',from:'2026-06-01',to:'2026-06-03'},today)
 const {result}=calc('0',[tx('s','SELL','10','2026-06-05',115000)],r)
 assert.equal(result.gainCents,10000)
})
test('missing reference prices are incomplete and export labels retained quantities correctly',()=>{
 const {result}=calc('6',[tx('s','SELL','4','2026-06-03',46000)],range,{})
 assert.equal(result.gainCents,null)
 const csv=periodProfitCsv(result,range)
 assert.ok(csv.includes('Retained opening quantity'));assert.ok(csv.includes('Open position period profit EUR'))
 assert.ok(!csv.includes('Cash income / costs without instrument'))
})
