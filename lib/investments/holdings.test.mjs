import test from 'node:test'
import assert from 'node:assert/strict'
import { currentHoldings, reconcileHoldings } from './holdings.mjs'
import { normalizeFamilyState, createSnapshot } from './family.mjs'
import { summarize } from './portfolio.mjs'
import { initialInvestmentState } from './test-fixtures.mjs'
const isin='US0378331005',other='US5949181045'
const tx=(id,type,quantity,extra={})=>({id,type,quantity,accountId:'self',isin,name:'Synthetic Equity',assetClass:'STOCK',datetime:'2026-01-01T12:00:00Z',date:'2026-01-01',sourceRow:2,amountCents:type==='BUY'?-10000:type==='SELL'?12000:null,cashCents:type==='BUY'?-10100:type==='SELL'?11900:null,feeCents:-100,taxCents:0,issues:[],...extra})
const empty=()=>{const s=normalizeFamilyState(initialInvestmentState());s.accounts.forEach(a=>a.positions=[]);return s}
test('current holdings keep fractional shares and FIFO cost, and isolate family owners',()=>{
 const rows=[tx('buy','BUY','0.3'),tx('sell','SELL','-0.1',{date:'2026-01-02',datetime:'2026-01-02T12:00:00Z'}),tx('junior','BUY','0.0000000001',{accountId:'mobin'})]
 const result=normalizeFamilyState(reconcileHoldings(empty(),rows))
 assert.equal(result.accounts[0].positions[0].quantity,'0.2');assert.equal(result.accounts[0].positions[0].valueCents,null)
 assert.equal(result.accounts[2].positions[0].quantity,'0.0000000001');assert.equal(result.accounts[0].positions[0].ledger.costCents,6733)
 assert.deepEqual(normalizeFamilyState(reconcileHoldings(result,rows)),result)
})
test('removing the last ledger transaction removes its derived position',()=>{
 const recorded=reconcileHoldings(empty(),[tx('buy','BUY','1')])
 assert.equal(recorded.accounts[0].positions.length,1)
 assert.equal(reconcileHoldings(recorded,[]).accounts[0].positions.length,0)
})
test('signed corporate events and cancellations reconstruct quantities independently of unverified tax basis',()=>{
 const rows=[tx('buy','BUY','10'),tx('bonus','BONUS_ISSUE','4'),tx('cancel','BONUS_ISSUE_CANCELLED','-4'),tx('replacement','BONUS_ISSUE','6'),tx('sell','SELL','-2',{date:'2026-02-01',datetime:'2026-02-01T12:00:00Z'})]
 const r=currentHoldings(rows)[0];assert.equal(r.quantity,'14');assert.equal(r.costCents,null)
})
test('ISIN replacements, full sales and worthless removals leave the active list without destroying history',()=>{
 const state=empty();state.accounts[0].positions=[{...normalizeFamilyState(initialInvestmentState()).accounts[0].positions[0],name:'Synthetic Equity',isin,quantity:'10'}]
 const rows=[tx('buy','BUY','10'),tx('out','REVERSE_SPLIT','-10'),tx('in','REVERSE_SPLIT','1',{isin:other,name:'Replacement Equity'})]
 const next=reconcileHoldings(state,rows)
 assert.deepEqual(next.accounts[0].positions.map(p=>p.isin),[other])
 assert.deepEqual(next.decisions,state.decisions);assert.deepEqual(next.trades,state.trades);assert.deepEqual(next.accounts[0].snapshots,state.accounts[0].snapshots)
 assert.equal(reconcileHoldings(empty(),[tx('b','BUY','10'),tx('s','SELL','-10')]).accounts[0].positions.length,0)
 assert.equal(reconcileHoldings(empty(),[tx('b','BUY','10'),tx('w','WORTHLESS','-10')]).accounts[0].positions.length,0)
})
test('missing opening inventory preserves prior counts with provenance and never guesses from dividend shares',()=>{
 const state=empty();const legacy=normalizeFamilyState(initialInvestmentState()).accounts[0].positions[0]
 state.accounts[0].positions=[{...legacy,name:'Synthetic Equity',quantity:'7'}]
 const rows=[tx('div','DIVIDEND','20'),tx('s','SELL','-5',{date:'2026-02-01',datetime:'2026-02-01T12:00:00Z'})]
 const result=reconcileHoldings(state,rows).accounts[0].positions[0]
 assert.equal(result.quantity,'7');assert.equal(result.id,legacy.id);assert.equal(result.ledger.quantityStatus,'prior-record');assert.equal(result.ledger.costCents,null)
 assert.equal(reconcileHoldings(empty(),rows).accounts[0].positions.length,0)
 const delayed=[tx('buy','BUY','3'),tx('sell','SELL','-3',{datetime:'2026-01-02T12:00:00Z',date:'2026-01-02'}),tx('paid','DIVIDEND','3',{datetime:'2026-01-05T12:00:00Z',date:'2026-01-05'})]
 assert.equal(currentHoldings(delayed)[0].quantity,null)
 assert.equal(reconcileHoldings(empty(),delayed).accounts[0].positions.length,0)
})
test('unique matching retains decisions IDs and mappings, quantity changes clear stale valuations',()=>{
 const state=empty();const legacy=normalizeFamilyState(initialInvestmentState()).accounts[0].positions[0]
 state.accounts[0].positions=[{...legacy,name:'Synthetic Equity',quantity:'2',marketSymbol:'SYN',marketConfirmed:true}]
 const next=normalizeFamilyState(reconcileHoldings(state,[tx('buy','BUY','3')])).accounts[0].positions[0]
 assert.equal(next.id,legacy.id);assert.equal(next.marketSymbol,'SYN');assert.equal(next.marketConfirmed,true)
 assert.equal(next.valueCents,null);assert.equal(next.gainCents,null)
 assert.equal(reconcileHoldings(state,[]).accounts[0].positions[0].valueCents,legacy.valueCents)
})
test('missing prices remain distinct from zero and cannot enter a broker-valued snapshot',()=>{
 const state=normalizeFamilyState(reconcileHoldings(empty(),[tx('b','BUY','2')]))
 const s=summarize(state.accounts[0].positions);assert.equal(s.valuedCount,0);assert.equal(s.unvaluedCount,1);assert.deepEqual(s.allocation,[])
 assert.throws(()=>createSnapshot(state.accounts[0],{id:'test',asOf:'2026-01-02',recordedAt:'2026-01-02T12:00:00Z'}),/قیمت/)
 const precise=normalizeFamilyState(reconcileHoldings(empty(),[tx('tiny','BUY','0.0000000001')]))
 precise.accounts[0].positions[0].valueCents=0
 precise.accounts[0].snapshots.push(createSnapshot(precise.accounts[0],{id:'test',asOf:'2026-01-02',recordedAt:'2026-01-02T12:00:00Z'}))
 assert.equal(normalizeFamilyState(precise).accounts[0].snapshots[0].positions[0].quantity,'0.0000000001')
})
test('prior inventory applies subsequent buys/sales once, but does not double-count backfilled older history',()=>{
 const state=empty(),legacy=normalizeFamilyState(initialInvestmentState()).accounts[0].positions[0]
 state.accounts[0].positions=[{...legacy,name:'Synthetic Equity',isin,quantity:'7'}]
 const original=[tx('div','DIVIDEND','20'),tx('sell','SELL','-5',{date:'2026-02-01',datetime:'2026-02-01T12:00:00Z'})]
 const anchored=normalizeFamilyState(reconcileHoldings(state,original))
 const after=[...original,tx('later','SELL','-2',{date:'2026-03-01',datetime:'2026-03-01T12:00:00Z'})]
 const next=normalizeFamilyState(reconcileHoldings(anchored,after))
 assert.equal(next.accounts[0].positions[0].quantity,'5')
 assert.equal(next.accounts[0].positions[0].valueCents,null)
 assert.deepEqual(normalizeFamilyState(reconcileHoldings(next,after)),next)
 const backfilled=[...original,tx('older','BUY','1',{date:'2025-12-01',datetime:'2025-12-01T12:00:00Z'})]
 assert.equal(reconcileHoldings(anchored,backfilled).accounts[0].positions[0].quantity,'7')
 next.accounts[0].positions[0].ledger.quantityConfirmed=true
 const confirmed=normalizeFamilyState(reconcileHoldings(next,[...after,tx('new','BUY','1',{date:'2026-04-01',datetime:'2026-04-01T12:00:00Z'})]))
 assert.equal(confirmed.accounts[0].positions[0].quantity,'6')
 assert.equal(confirmed.accounts[0].positions[0].ledger.quantityConfirmed,true)
 assert.equal(confirmed.accounts[0].positions[0].ledger.costCents,null)
 assert.equal(reconcileHoldings(next,[...after,tx('close','SELL','-5',{date:'2026-04-01',datetime:'2026-04-01T12:00:00Z'})]).accounts[0].positions.length,0)
})
