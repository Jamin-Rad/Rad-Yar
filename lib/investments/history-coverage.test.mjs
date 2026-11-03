import test from 'node:test'
import assert from 'node:assert/strict'
import { historicalPrice, historyCovers, resolveIsinHistory } from './history-coverage.mjs'
import { periodInstruments, profitRange, periodPlan, periodProfit } from './period-profit.mjs'
const isin='US0378331005',now=Date.parse('2026-06-08T15:00:00Z'),date='2025-12-31'
const quote=id=>({idNotation:id,isin,price:id===1?120:119,currency:'EUR',asOf:'2026-06-08T14:00:00Z'})
const market={identity:{isin},quote:quote(1),quoteAlternatives:[quote(1),quote(2)]}
const history=(id,dates)=>({history:dates.map(date=>({date,close:100})),historyMeta:{verified:true,isin,currency:'EUR',idNotation:id}})
test('yearly boundary checks actual nearby prices, not simply the first date in the series',()=>{
 const m={...market,...history(1,['2024-12-01','2026-04-27','2026-06-05'])}
 assert.equal(historyCovers(m,[date],now),false)
 assert.equal(historicalPrice({...market,...history(1,['2025-12-30'])},date,now).asOf,'2025-12-30')
 assert.equal(historicalPrice(m,'2026-06-08',now).asOf,'2026-06-05')
 assert.equal(historicalPrice(m,'2026-06-09',now),null)
})
test('missing annual opening price selects a complete alternate EUR venue with its own quote',async()=>{
 const calls=[]
 const resolved=await resolveIsinHistory(market,async m=>{calls.push(m.quote.idNotation);return history(m.quote.idNotation,m.quote.idNotation===1?['2026-04-27']:['2025-12-30','2026-06-05'])},[date],now)
 assert.deepEqual(calls,[1,2]);assert.equal(resolved.quote.idNotation,2);assert.equal(resolved.quote.price,119);assert.equal(resolved.historyMeta.idNotation,2)
 assert.equal(historyCovers(resolved,[date],now),true)
})
test('covered histories and chart-only requests need no alternative requests',async()=>{
 let calls=0;const load=async m=>{calls++;return history(m.quote.idNotation,['2025-12-30'])}
 await resolveIsinHistory(market,load,[date],now);assert.equal(calls,1)
 calls=0;await resolveIsinHistory(market,load,[],now);assert.equal(calls,1)
})
test('a failed venue tries the next; genuinely unavailable dates stay incomplete',async()=>{
 const resolved=await resolveIsinHistory(market,async m=>{if(m.quote.idNotation===1)throw Error('Unavailable');return history(2,['2026-04-27'])},[date],now)
 assert.equal(historyCovers(resolved,[date],now),false)
 assert.equal(historicalPrice({...resolved,historyMeta:{...resolved.historyMeta,idNotation:3}},date,now),null)
})
test('both endpoints must be covered; unsafe currencies are never fallback candidates',async()=>{
 const unsafe={...market,quoteAlternatives:[{...quote(9),currency:'USD'},quote(2)]},calls=[]
 const resolved=await resolveIsinHistory(unsafe,async m=>{calls.push(m.quote.idNotation);return history(m.quote.idNotation,m.quote.idNotation===1?['2025-12-30']:['2025-12-30','2026-06-05'])},[date,'2026-06-05'],now)
 assert.deepEqual(calls,[1,2]);assert.equal(resolved.quote.idNotation,2)
})
test('a fully covered alternate restores the family annual result instead of leaving it blank',async()=>{
 const range=profitRange({mode:'year'},'2026-06-08'),accounts=[{id:'self',owner:'Synthetic',positions:[{id:'p',name:'Example',isin,quantity:'1',ledger:{quantityStatus:'transactions'}}],inventoryCheckpoint:{asOf:'2026-06-08T14:00:00Z',holdings:[{isin,quantity:'1'}]}}]
 const plan=periodPlan(accounts,[],range,now)
 assert.deepEqual(periodInstruments(plan,'2026-06-08')[0].historyDates,[date])
 const before={...market,...history(1,['2026-04-27'])}
 assert.equal(periodProfit(plan,{['ISIN:'+isin]:before},now,'2026-06-08').gainCents,null)
 const after=await resolveIsinHistory(market,async m=>history(m.quote.idNotation,m.quote.idNotation===1?['2026-04-27']:['2025-12-30']),[date],now)
 assert.equal(periodProfit(plan,{['ISIN:'+isin]:after},now,'2026-06-08').gainCents,1900)
 const emptyStart={...plan[0],instruments:[{...plan[0].instruments[0],startQuantity:'0'}]}
 assert.deepEqual(periodInstruments([emptyStart],'2026-06-08')[0].historyDates,[])
})
