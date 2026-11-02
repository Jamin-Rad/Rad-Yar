import test from 'node:test'
import assert from 'node:assert/strict'
import {marketImpact,attentionQueue,parseNews} from './market.mjs'
import {holdingsFromCsv,mergeHoldings,parseCsv} from './import.mjs'
import {normalizeFamilyState} from './family.mjs'
import {initialInvestmentState} from './test-fixtures.mjs'
import {reviewReport} from './review-report.mjs'
const market={quote:{price:110,asOf:'2026-10-09T20:00:00Z',currency:'USD',symbol:'DEMO',exchange:'Test',sourceUrl:'https://example.com'},history:[{date:'2026-10-01',close:100},{date:'2026-10-02',close:100},{date:'2026-10-09',close:110}],fx:{latest:{rate:.9,date:'2026-10-09'},'2026-10-02':{rate:.8,date:'2026-10-02'}},news:[],splits:[]}
test('market impact uses both historical and current FX and never unconfirmed identity',()=>{
 assert.equal(marketImpact({quantity:'2',marketConfirmed:true},market).deltaCents,3800)
 assert.equal(marketImpact({quantity:'2',marketConfirmed:false},market),null)
 const noFx={...market,fx:{}}
 assert.equal(marketImpact({quantity:'2',marketConfirmed:true},noFx).deltaCents,null)
 assert.equal(marketImpact({quantity:'2',marketConfirmed:true},{...market,splits:[{date:'2026-10-08'}]}),null)
})
test('stale market movements do not become current attention signals',()=>{
 const state=normalizeFamilyState(initialInvestmentState());state.accounts[0].positions[0].marketSymbol='DEMO';state.accounts[0].positions[0].marketConfirmed=true
 const queue=attentionQueue(state,{DEMO:market},'2026-11-01')
 assert.ok(queue[0].reasons.some(r=>r.kind==='quality'))
 assert.ok(queue.every(r=>r.reasons.every(reason=>reason.kind!=='movement')))
})
test('CSV supports quoted delimiters and German decimals without treating transactions as holdings',()=>{
 let id=0;const rows=holdingsFromCsv('Asset;ISIN;Quantity;Recorded value EUR;Displayed gain EUR;As of\n"Example; Asset";;2,5;1.000,50;-20,25;2026-10-01',()=>`id-${id++}`)
 assert.equal(rows[0].quantity,'2.5');assert.equal(rows[0].valueCents,100050);assert.equal(rows[0].gainCents,-2025)
 assert.throws(()=>holdingsFromCsv('Date,Type,Amount\n2026-10-01,Buy,100',()=>''),/ستون/)
 assert.throws(()=>parseCsv('Asset,Quantity\n"unclosed,2'))
})
test('holding import updates only matched holdings and preserves old history and unmapped assets',()=>{
 const state=normalizeFamilyState(initialInvestmentState());const account=state.accounts[0]
 const incoming={...account.positions[0],id:'incoming',valueCents:15000}
 const merged=mergeHoldings(account,[incoming])
 assert.equal(merged.positions.length,account.positions.length);assert.equal(merged.positions[0].id,account.positions[0].id);assert.equal(merged.positions[1].valueCents,account.positions[1].valueCents)
})
test('report selection covers historical records and market sources without other owners or unchecked assets',()=>{
 const state=normalizeFamilyState(initialInvestmentState());const a=state.accounts[0]
 a.positions[0].marketSymbol='DEMO';a.positions[0].marketConfirmed=true
 a.snapshots=[{id:'s',asOf:'2026-10-01',recordedAt:'2026-10-01T12:00:00Z',confirmed:true,note:'',positions:a.positions}]
 const report=reviewReport(state,{accountIds:['self'],positionIds:['self:alpha'],includeTrades:false},{DEMO:market})
 assert.match(report,/Aster Industries/);assert.match(report,/https:\/\/example.com/);assert.match(report,/2026-10-01/);assert.doesNotMatch(report,/Northwind Technology/);assert.doesNotMatch(report,/حساب فاطمه/)
})
test('news rejects unsafe links and invalid/future dates and preserves publisher attribution',()=>{
 const item=(link,date)=>`<item><title><![CDATA[Example earnings &amp; outlook]]></title><link>${link}</link><pubDate>${date}</pubDate><source>Example Publisher</source></item>`
 const rows=parseNews(`<rss>${item('https://example.com','Fri, 09 Oct 2026 12:00:00 GMT')}${item('javascript:alert(1)','Fri, 09 Oct 2026 12:00:00 GMT')}${item('https://future.test','Fri, 09 Oct 2027 12:00:00 GMT')}</rss>`,Date.parse('2026-10-10'))
 assert.equal(rows.length,1);assert.equal(rows[0].publisher,'Example Publisher');assert.equal(rows[0].important,true)
})
test('CSV rejects another owner, mixed currencies and invalid instrument checksum',()=>{
 const make=()=>`row-${Math.random().toString(16).slice(2)}`
 assert.throws(()=>holdingsFromCsv('Account,Asset,Quantity,Recorded value EUR\nother,Example,1,100',make,'owner'),/حساب/)
 assert.throws(()=>holdingsFromCsv('Asset,Quantity,Recorded value EUR,Currency\nExample,1,100,USD',make),/یورو/)
 assert.throws(()=>holdingsFromCsv('Asset,ISIN,Quantity,Recorded value EUR\nExample,US0378331000,1,100',make),/ISIN/)
})
