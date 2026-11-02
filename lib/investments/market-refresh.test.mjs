import test from 'node:test'
import assert from 'node:assert/strict'
import { createMarketCache } from './market-cache.mjs'
import { captureVisit, readVisit, visitChanges } from './visit.mjs'
import { tradingViewSymbol, tradingViewEmbedUrl, tradingViewUrl } from './tradingview.mjs'
import { normalizeFamilyState } from './family.mjs'
import { initialInvestmentState } from './test-fixtures.mjs'

function fixture() {
 const state = normalizeFamilyState(initialInvestmentState())
 const p = state.accounts[0].positions[0]
 p.marketSymbol = 'DEMO'; p.marketConfirmed = true; p.quantity = '2'
 const market = { quote: { price: 100, currency: 'USD', asOf: '2026-10-29T20:00:00Z' }, fx: {latest: {rate: .9, date: '2026-10-29'}}, splits: [], news: [] }
 return { state, p, market }
}
test('manual refresh bypasses normal TTL, deduplicates concurrent requests and limits rapid retries', async () => {
 let time=0, calls=0
 const cache=createMarketCache({now:()=>time})
 const task=async()=>++calls
 assert.equal(await cache('quote',task),1)
 time=20000
 assert.equal(await cache('quote',task),1)
 assert.deepEqual(await Promise.all([cache('quote',task,true),cache('quote',task,true)]),[2,2])
 time=21000
 assert.equal(await cache('quote',task,true),2)
 time=40000
 assert.equal(await cache('quote',task,true),3)
 await assert.rejects(cache('bad',async()=>{throw Error('offline')},true))
 assert.equal(await cache('bad',task,true),4)
})
test('visit baseline isolates ownership, applies both FX rates, and stays immutable', () => {
 const {state,p,market}=fixture()
 state.accounts[1].positions=[{...p,id:p.id,quantity:'1'}]
 const old=captureVisit(state,{DEMO:market},'2026-10-30T08:00:00Z')
 const original=JSON.stringify(old)
 const current={...market,quote:{...market.quote,price:110,asOf:'2026-10-30T20:00:00Z'},fx:{latest:{rate:.8,date:'2026-10-30'}}}
 const result=visitChanges(state,{DEMO:current},old,Date.parse('2026-11-01T10:00:00Z'))
 assert.equal(result.compared,2)
 assert.equal(result.rows.find(r=>r.accountId==='self').movement.deltaCents,-400)
 assert.equal(result.rows.find(r=>r.accountId==='fatemeh').movement.deltaCents,-200)
 assert.ok(Math.abs(result.rows[0].movement.nativePercent-10)<1e-10)
 assert.equal(JSON.stringify(old),original)
 assert.deepEqual(readVisit(original),old)
})
test('visit comparisons suppress changed currency/mapping, splits, stale or older data; missing FX stays unknown', () => {
 const {state,p,market}=fixture()
 const old=captureVisit(state,{DEMO:market},'2026-10-29T21:00:00Z')
 const now=Date.parse('2026-10-31T10:00:00Z')
 for(const change of [{quote:{...market.quote,currency:'EUR'}},{quote:{...market.quote,asOf:'2026-10-28T20:00:00Z'}},{splits:[{date:'2026-10-30'}],quote:{...market.quote,asOf:'2026-10-30T20:00:00Z'}}]) {
  assert.equal(visitChanges(state,{DEMO:{...market,...change}},old,now).rows[0].movement,null)
 }
 assert.equal(visitChanges(state,{DEMO:market},old,now+10*86400000).rows[0].movement,null)
 assert.equal(visitChanges(state,{DEMO:{...market,fx:{}}},old,now).rows[0].movement.deltaCents,null)
 p.marketSymbol='OTHER'
 assert.equal(visitChanges(state,{OTHER:market},old,now).rows[0].movement,null)
})
test('new important news excludes already seen URLs, older news and unconfirmed instruments', () => {
 const {state,p,market}=fixture()
 const news={title:'Demo earnings',url:'https://example.com/new',date:'2026-10-30T09:00:00Z',important:true}
 const old=captureVisit(state,{DEMO:{...market,news:[{...news,url:'https://example.com/seen'}]}},'2026-10-30T08:00:00Z')
 const current={...market,news:[news,{...news,url:'https://example.com/seen'},{...news,url:'https://example.com/old',date:'2026-10-29T09:00:00Z'}]}
 assert.deepEqual(visitChanges(state,{DEMO:current},old,Date.parse('2026-10-31')).rows[0].news,[news])
 p.marketConfirmed=false
 assert.equal(visitChanges(state,{DEMO:current},old).rows.length,0)
 assert.equal(readVisit('{bad'),null)
 assert.equal(readVisit(JSON.stringify({...old,positions:{bad:{quote:{price:-1}}}})),null)
})
test('TradingView mapping survives portfolio validation and cannot inject markup into the isolated embed', () => {
 const {state,p}=fixture()
 p.tradingViewSymbol='NASDAQ:DEMO'
 assert.equal(normalizeFamilyState(state).accounts[0].positions[0].tradingViewSymbol,'NASDAQ:DEMO')
 for(const bad of ['<script>', 'NASDAQ:DEMO</script>', 'https://example.com','DEMO']) assert.throws(()=>tradingViewSymbol(bad))
 const url=new URL(tradingViewEmbedUrl('NASDAQ:DEMO'))
 assert.equal(url.origin,'https://www.tradingview-widget.com')
 assert.equal(url.pathname,'/embed-widget/advanced-chart/')
 assert.equal(JSON.parse(decodeURIComponent(url.hash.slice(1))).symbol,'NASDAQ:DEMO')
 assert.ok(!url.href.includes('quantity'))
 assert.equal(tradingViewUrl('nasdaq:demo'),'https://www.tradingview.com/chart/?symbol=NASDAQ%3ADEMO')
})

test('a short visit with unloaded prices retains only an unchanged instrument baseline', () => {
 const {state,p,market}=fixture()
 const old=captureVisit(state,{DEMO:market},'2026-10-30T08:00:00Z')
 const next=captureVisit(state,{},'2026-10-31T08:00:00Z',old)
 assert.deepEqual(next.positions['self:'+p.id].quote,market.quote)
 p.marketSymbol='OTHER'
 assert.equal(captureVisit(state,{},'2026-10-31T08:00:00Z',old).positions['self:'+p.id].quote,null)
})
