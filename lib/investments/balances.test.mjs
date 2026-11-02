import test from 'node:test'
import assert from 'node:assert/strict'
import {cashBalance,positionBalance,accountBalance,balanceCsv} from './balances.mjs'
import {parseIsinMarket} from './isin-market.mjs'
import {normalizeFamilyState} from './family.mjs'
import {initialInvestmentState} from './test-fixtures.mjs'

const now=Date.parse('2026-06-08T14:00:00Z')
const account={id:'self',positions:[]}
const tx=(id,date,type,cashCents)=>({id,accountId:'self',date,datetime:date+'T12:00:00Z',type,currency:'EUR',cashCents})
const rows=[tx('1','2026-06-01','TRANSFER_IN',100000),tx('2','2026-06-02','BUY',-30100),tx('3','2026-06-03','DIVIDEND',150),tx('4','2026-06-04','SELL',9900),tx('5','2026-06-05','TRANSFER_OUT',-5000),tx('6','2026-06-06','TAX_OPTIMIZATION',40)]
const position={id:'p',name:'Example',isin:'US0378331005',quantity:'1.25',valueCents:999999,gainCents:123,ledger:{quantityStatus:'transactions',costCents:10000}}
const market={identity:{isin:position.isin},quote:{price:100,currency:'EUR',asOf:'2026-06-08T13:00:00Z',source:'Test'}}
test('cash includes buys, sales, net dividends, fees/taxes and transfers exactly once; zero opening is an estimate',()=>{
 const cash=cashBalance(account,rows)
 assert.equal(cash.movementCents,74990);assert.equal(cash.balanceCents,null);assert.equal(cash.estimatedCents,74990)
 assert.equal(cash.status,'zero-opening-estimate')
})
test('history starting with income cannot silently imply a zero opening',()=>{
 const cash=cashBalance(account,[rows[2],rows[3]])
 assert.equal(cash.movementCents,10050);assert.equal(cash.balanceCents,null);assert.equal(cash.estimatedCents,null)
 assert.equal(cash.status,'missing-opening')
})
test('opening is before all same-date rows and later imports recompute cash; no double count of earlier history',()=>{
 const anchored={...account,cashOpening:{date:'2026-06-03',balanceCents:25000}}
 const cash=cashBalance(anchored,rows)
 assert.equal(cash.balanceCents,30090)
 assert.equal(cashBalance(anchored,[...rows,tx('7','2026-06-08','BUY',-5090)]).balanceCents,25000)
 assert.equal(cashBalance(anchored,rows).balanceCents,30090)
})
test('missing/foreign cash and empty history cannot become zero balance',()=>{
 assert.equal(cashBalance(account,[]).balanceCents,null)
 assert.equal(cashBalance({...account,cashOpening:{date:'2026-06-01',balanceCents:0}},[{...rows[0],currency:'USD'}]).balanceCents,null)
})
test('valuation uses fractional quantity times EUR reference, never the old screenshot or cost as price',()=>{
 const value=positionBalance(position,{['ISIN:'+position.isin]:market},now)
 assert.equal(value.marketValueCents,12500);assert.equal(value.marketGainCents,2500)
 assert.equal(position.valueCents,999999)
 assert.equal(positionBalance(position,{},now).marketValueCents,null)
 assert.equal(positionBalance({...position,quantity:'1'},{['ISIN:'+position.isin]:{...market,quote:{...market.quote,price:1.005}}},now).marketValueCents,101)
})
test('identity mismatch, future/stale prices and missing FX do not enter totals',()=>{
 const key='ISIN:'+position.isin
 assert.equal(positionBalance(position,{[key]:{...market,identity:{isin:'different'}}},now).marketValueCents,null)
 for(const asOf of ['2026-06-08T16:00:00Z','2026-05-20T13:00:00Z'])assert.equal(positionBalance(position,{[key]:{...market,quote:{...market.quote,asOf}}},now).marketValueCents,null)
 assert.equal(positionBalance(position,{[key]:{...market,quote:{...market.quote,currency:'USD'}}},now).marketValueCents,null)
 assert.equal(positionBalance(position,{[key]:{...market,quote:{...market.quote,currency:'USD'},fx:{latest:{rate:.8,date:'2026-06-08'}}}},now).marketValueCents,10000)
})
test('total equity adds cash to securities, does not add realized profit/cost twice and stays partial if incomplete',()=>{
 const a={...account,cashOpening:{date:'2026-06-01',balanceCents:0},positions:[position]}
 const result=accountBalance(a,rows,{['ISIN:'+position.isin]:market},now)
 assert.equal(result.equityCents,87490);assert.equal(result.equityEstimated,false)
 const partial=accountBalance({...a,positions:[position,{...position,id:'other',isin:'US67066G1040'}]},rows,{['ISIN:'+position.isin]:market},now)
 assert.equal(partial.partialValueCents,12500);assert.equal(partial.securitiesCents,null);assert.equal(partial.equityCents,null)
 const unknown=accountBalance({...a,positions:[{...position,ledger:{quantityStatus:'prior-record'}}]},rows,{['ISIN:'+position.isin]:market},now)
 assert.equal(unknown.equityCents,null);assert.equal(unknown.estimatedEquityCents,87490);assert.equal(unknown.equityEstimated,true);assert.equal(unknown.positions[0].marketGainCents,null)
})
function page(instrument,quotes){return `<script id="__NEXT_DATA__" type="application/json">${JSON.stringify({props:{pageProps:{data:{snapshot:{instrument,quote:quotes[0],quoteList:{list:quotes}}}}}})}</script>`}
const quote={isoCurrency:'EUR',unitType:'STK',last:12.5,datetimeLast:'2026-06-08T13:00:00Z',previousLast:11,datetimePreviousLast:'2026-06-05T16:30:00Z',market:{idNotation:1,nameExchange:'Example'}}
test('automatic provider accepts exact ISIN and per-unit EUR quotes only, filtering future data',()=>{
 const instrument={isin:position.isin,name:'Example',symbol:'EX'}
 const result=parseIsinMarket(page(instrument,[{...quote,last:999,datetimeLast:'2026-06-08T20:00:00Z'},quote]),position.isin,now)
 assert.equal(result.quote.price,12.5);assert.equal(result.identity.isin,position.isin)
 assert.throws(()=>parseIsinMarket(page({...instrument,isin:'wrong'},[quote]),position.isin,now))
 assert.throws(()=>parseIsinMarket(page(instrument,[{...quote,unitType:'PCT'}]),position.isin,now))
 assert.throws(()=>parseIsinMarket(page(instrument,[{...quote,isoCurrency:'USD'}]),position.isin,now))
 const closed=parseIsinMarket(page(instrument,[{...quote,datetimeLast:'2026-06-08T20:00:00Z'}]),position.isin,now)
 assert.equal(closed.quote.price,11);assert.match(closed.quote.delay,/پایانی/)
})
test('balance CSV exports calculated quantities, quote dates and cash status',()=>{
 const result=accountBalance({...account,positions:[position]},rows,{['ISIN:'+position.isin]:market},now)
 const csv=balanceCsv(result)
 assert.match(csv,/"1.25"/);assert.match(csv,/"125.00"/);assert.match(csv,/"749.90"/);assert.match(csv,/zero-opening-estimate/)
})

test('cash anchor and provider consent survive normalization and invalid anchors are rejected',()=>{
 const state=normalizeFamilyState(initialInvestmentState())
 state.accounts[0].cashOpening={date:'2026-06-01',balanceCents:12345}
 state.settings.isinPricesEnabled=true
 const normalized=normalizeFamilyState(state)
 assert.deepEqual(normalized.accounts[0].cashOpening,state.accounts[0].cashOpening)
 assert.equal(normalized.settings.isinPricesEnabled,true)
 state.accounts[0].cashOpening.balanceCents='12345'
 assert.throws(()=>normalizeFamilyState(state))
})
test('a real-cash checkpoint ignores earlier history and adds only subsequent movements, including same-day trades',()=>{
 const anchored={...account,cashCheckpoint:{asOf:'2026-06-05T13:00:00Z',balanceCents:20000}}
 const later={...tx('7','2026-06-05','BUY',-1000),datetime:'2026-06-05T14:00:00Z'}
 const cash=cashBalance(anchored,[...rows,later])
 assert.equal(cash.balanceCents,19040);assert.equal(cash.movementCents,-960);assert.equal(cash.status,'confirmed-checkpoint')
 const backdated=tx('8','2026-06-02','TRANSFER_IN',5000)
 assert.equal(cashBalance(anchored,[...rows,later,backdated]).balanceCents,19040)
 const state=normalizeFamilyState(initialInvestmentState())
 state.accounts[0].cashCheckpoint=anchored.cashCheckpoint
 assert.deepEqual(normalizeFamilyState(state).accounts[0].cashCheckpoint,anchored.cashCheckpoint)
 state.accounts[0].cashOpening={date:'2026-06-01',balanceCents:0}
 assert.throws(()=>normalizeFamilyState(state))
})
