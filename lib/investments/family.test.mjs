import test from 'node:test'
import assert from 'node:assert/strict'
import { initialInvestmentState } from './test-fixtures.mjs'
import { normalizeFamilyState, familySummary, assertHistoryPreserved, createSnapshot, snapshotComparison, tradeStatus, nextReviewDate, reviewQueue, familyReport, sharedPositions, todayBerlin } from './family.mjs'

const initial = () => normalizeFamilyState(initialInvestmentState())
function plan() {
  return { id: 'trade-test', plan: { name: 'Test asset', symbol: 'TEST', direction: 'long', product: 'cfd', currency: 'USD', entryPrice: '100.125', stopPrice: '95.25', targetPrice: '110', quantity: null, plannedRiskCents: 5000, rationale: 'Example thesis', invalidation: 'Example invalidation', planDate: '2026-10-01', reviewDate: '2026-10-08', createdAt: '2026-10-01T08:00:00Z' }, executions: [], reviews: [] }
}

test('legacy portfolio migrates to only the personal account, without fabricating family balances', () => {
  const state = initial()
  assert.deepEqual(state.accounts.map(a => a.owner), ['من', 'فاطمه', 'مبین', 'مبینا'])
  assert.deepEqual(state.accounts.map(a => a.positions.length), [5, 0, 0, 0])
  assert.equal(familySummary(state).totalCents, 33750)
  assert.equal(familySummary(state).populatedAccounts, 1)
  assert.equal(state.accounts[0].positions.find(p => p.id === 'unknown').gainCents, null)
  assert.equal(state.accounts[0].snapshotDate, null)
  assert.deepEqual(normalizeFamilyState(JSON.parse(JSON.stringify(state))), state)
})

test('holdings with identical IDs remain independent across owners and selected reports respect account boundaries', () => {
  const state = initial()
  state.accounts[1].positions.push({ ...state.accounts[0].positions[0], valueCents: 100 })
  const normalized = normalizeFamilyState(state)
  assert.equal(familySummary(normalized).totalCents, 33850)
  const report = familyReport(normalized, { accountIds: ['fatemeh'], includeTrades: false })
  assert.match(report, /حساب فاطمه/)
  assert.doesNotMatch(report, /حساب من/)
  assert.doesNotMatch(report, /Northwind/)
})

test('trade plan is frozen while execution and reviews append independently', () => {
  const state = initial()
  state.trades.push(plan())
  const before = normalizeFamilyState(state)
  const after = structuredClone(before)
  after.trades[0].executions.push({ id: 'entry', kind: 'entry', date: '2026-10-02', price: '100.15', quantity: '0.5', note: 'Executed', recordedAt: '2026-10-02T08:00:00Z' })
  assert.equal(tradeStatus(assertHistoryPreserved(before, after).trades[0]), 'open')
  const altered = structuredClone(after)
  altered.trades[0].plan.rationale = 'Hindsight rewrite'
  assert.throws(() => assertHistoryPreserved(before, altered), /برنامه اولیه/)
  const removed = structuredClone(before); removed.trades = []
  assert.throws(() => assertHistoryPreserved(before, removed))
  const changedExecution = structuredClone(after)
  changedExecution.trades[0].executions[0].price = '99'
  assert.throws(() => assertHistoryPreserved(after, changedExecution), /سابقه/)
})

test('invalid trade states and directional stop/target prices are rejected', () => {
  const state = initial(); state.trades.push(plan())
  state.trades[0].plan.stopPrice = '101'
  assert.throws(() => normalizeFamilyState(state), /حد توقف/)
  state.trades[0] = plan()
  state.trades[0].executions.push({ id: 'exit', kind: 'exit', date: '2026-10-02', price: '101', netResultCents: 100, recordedAt: '2026-10-02T08:00:00Z' })
  assert.throws(() => normalizeFamilyState(state), /سازگار نیست/)
})

test('stop/target comparisons retain eight decimal places without floating point rounding', () => {
  const state = initial(); state.trades.push(plan())
  state.trades[0].plan.entryPrice = '100000000000.00000002'
  state.trades[0].plan.stopPrice = '100000000000.00000001'
  state.trades[0].plan.targetPrice = '100000000000.00000003'
  assert.equal(normalizeFamilyState(state).trades[0].plan.stopPrice, '100000000000.00000001')
})

test('closed trade result uses actual broker net result, not an assumed CFD multiplier', () => {
  const state = initial(); state.trades.push(plan())
  state.trades[0].executions = [
    { id: 'entry', kind: 'entry', date: '2026-10-02', price: '100.15', quantity: '0.5', recordedAt: '2026-10-02T08:00:00Z' },
    { id: 'exit', kind: 'exit', date: '2026-10-03', price: '101', netResultCents: -1234, recordedAt: '2026-10-03T08:00:00Z' },
  ]
  const trade = normalizeFamilyState(state).trades[0]
  assert.equal(tradeStatus(trade), 'closed')
  assert.equal(trade.executions.at(-1).netResultCents, -1234)
})

test('review appointments can be closed or rescheduled without erasing the original rationale', () => {
  const state = initial(); state.trades.push(plan())
  assert.equal(reviewQueue(state, '2026-10-09').length, 1)
  state.trades[0].reviews.push({ id: 'review', date: '2026-10-09', thesisValid: 'uncertain', followedPlan: 'yes', note: 'Review evidence', nextReviewDate: '2026-10-16', recordedAt: '2026-10-09T08:00:00Z' })
  const updated = normalizeFamilyState(state)
  assert.equal(nextReviewDate(updated.trades[0]), '2026-10-16')
  assert.equal(reviewQueue(updated, '2026-10-15').length, 0)
  assert.equal(reviewQueue(updated, '2026-10-16').length, 1)
  updated.trades[0].reviews[0].nextReviewDate = null
  assert.equal(reviewQueue(updated, '2026-10-29').length, 0)
})

test('dated snapshots preserve quantities and values and cannot be rewritten later', () => {
  const state = initial()
  const account = state.accounts[0]
  account.snapshots.push(createSnapshot(account, { id: 's1', asOf: '2026-09-01', recordedAt: '2026-10-29T08:00:00Z' }))
  const old = structuredClone(state)
  account.positions[0].valueCents += 5000
  account.snapshots.push(createSnapshot(account, { id: 's2', asOf: '2026-10-01', recordedAt: '2026-10-29T08:00:00Z' }))
  assert.equal(snapshotComparison(account).deltaCents, 5000)
  assert.equal(account.snapshots[0].positions[0].valueCents, 10000)
  assertHistoryPreserved(old, state)
  const changed = structuredClone(state); changed.accounts[0].snapshots[0].positions[0].valueCents++
  assert.throws(() => assertHistoryPreserved(old, changed), /تاریخی/)
  assert.throws(() => createSnapshot(account, { id: 's3', asOf: '2026-10-01', recordedAt: '2026-10-29T08:00:00Z' }))
  assert.equal(snapshotComparison(state.accounts[1]), null)
})

test('cross-account exposure requires an exact ISIN rather than guessing from a name', () => {
  const state = initial()
  state.accounts[1].positions = [{ ...state.accounts[0].positions[0], valueCents: 100 }]
  assert.equal(sharedPositions(state).length, 0)
  state.accounts[0].positions[0].isin = 'US09290D1019'
  state.accounts[1].positions[0].isin = 'US09290D1019'
  assert.equal(sharedPositions(normalizeFamilyState(state))[0].valueCents, 10100)
})

test('Berlin review dates follow local midnight even across the UTC day boundary', () => {
  assert.equal(todayBerlin(new Date('2026-10-28T23:30:00Z')), '2026-10-29')
})

test('partial fills retain exact remaining quantity and realized results across exits',()=>{
 const state=initial();const t=plan();state.trades.push(t)
 const event=(id,kind,quantity,extra={})=>({id,kind,quantity,date:'2026-10-02',price:'100',recordedAt:'2026-10-02T12:00:00Z',...extra})
 t.executions=[event('e1','entry','0.1'),event('e2','entry','0.2'),event('x1','exit','0.1',{netResultCents:20})]
 const normalized=normalizeFamilyState(state)
 assert.equal(tradeStatus(normalized.trades[0]),'open')
 t.executions.push(event('x2','exit','0.2',{netResultCents:-10}))
 assert.equal(tradeStatus(normalizeFamilyState(state).trades[0]),'closed')
 t.executions[3].quantity='0.20000001'
 assert.throws(()=>normalizeFamilyState(state),/مانده/)
})
test('legacy exit without quantity migrates to full close and stays immutable',()=>{
 const state=initial();const t=plan();state.trades.push(t)
 t.executions=[{id:'e',kind:'entry',quantity:'2',price:'100',date:'2026-10-02',recordedAt:'2026-10-02T12:00:00Z'},{id:'x',kind:'exit',price:'101',netResultCents:100,date:'2026-10-02',recordedAt:'2026-10-02T12:00:00Z'}]
 const normalized=normalizeFamilyState(state)
 assert.equal(normalized.trades[0].executions[1].quantity,'2')
 assertHistoryPreserved(state,normalized)
})
test('long term decisions and pasted reviews are append-only and owner-linked',()=>{
 const state=initial();const decision={id:'decision',accountId:'self',positionId:'alpha',name:'Aster',action:'hold',rationale:'Initial evidence',invalidation:'Counter evidence',planDate:'2026-10-01',reviewDate:'2026-10-08',createdAt:'2026-10-01T12:00:00Z',baselineQuantity:'1',baselineValueCents:10000,baselineDate:'2026-10-01',reviews:[]}
 state.decisions.push(decision)
 const before=normalizeFamilyState(state)
 decision.reviews.push({id:'r',date:'2026-10-08',recordedAt:'2026-10-08T12:00:00Z',thesisValid:'uncertain',followedPlan:'yes',note:'Observed evidence',chatResponse:'Copied discussion',actualOutcomeCents:100,noActionOutcomeCents:50,evidence:'Same dates and cash flows',nextReviewDate:'2026-11-01'})
 assert.equal(assertHistoryPreserved(before,state).decisions[0].reviews[0].chatResponse,'Copied discussion')
 const changed=structuredClone(state);changed.decisions[0].rationale='Rewrite'
 assert.throws(()=>assertHistoryPreserved(state,changed),/فرض اولیه/)
 changed.decisions[0].accountId='xtb';assert.throws(()=>normalizeFamilyState(changed))
})
test('more than one year of weekly snapshots remains valid',()=>{
 const state=initial();for(let i=0;i<60;i++){const date=new Date(Date.UTC(2024,0,1+i*7)).toISOString().slice(0,10);state.accounts[0].snapshots.push(createSnapshot(state.accounts[0],{id:`snapshot-${i}`,asOf:date,recordedAt:'2026-10-01T12:00:00Z'}))}
 assert.equal(normalizeFamilyState(state).accounts[0].snapshots.length,60)
})
