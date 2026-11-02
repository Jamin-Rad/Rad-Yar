import test from 'node:test'
import assert from 'node:assert/strict'
import { initialInvestmentState } from './test-fixtures.mjs'
import { parseMoney, summarize, validateState, portfolioReport } from './portfolio.mjs'

test('synthetic holdings retain exact cents, fractional quantities and unknown gains', () => {
  const state = initialInvestmentState()
  const result = summarize(validateState(state).positions)
  assert.equal(result.count, 5)
  assert.equal(result.totalCents, 33750)
  assert.equal(result.knownGainCents, -750)
  assert.equal(result.unknownGainCount, 1)
  assert.equal(result.winners, 2)
  assert.equal(result.losers, 1)
  assert.equal(state.positions.find(p => p.id === 'unknown').gainCents, null)
  assert.equal(state.positions.find(p => p.id === 'alpha').quantity, '1.996985')
  assert.equal(state.positions.find(p => p.id === 'unknown').quantity, '0.667')
  assert.deepEqual(result.needsReview.map(p => p.id), ['unknown', 'spin', 'fund'])
  assert.equal(result.allocation.reduce((sum, group) => sum + group.valueCents, 0), result.totalCents)
})

test('monetary inputs preserve cents across German, Persian and signed formats', () => {
  assert.equal(parseMoney('1.048,50 €'), 104850)
  assert.equal(parseMoney('1048.50'), 104850)
  assert.equal(parseMoney('۱٬۰۴۸٫۵۰'), 104850)
  assert.equal(parseMoney('−166.30'), -16630)
  assert.equal(parseMoney('0.29'), 29)
  assert.equal(parseMoney('', true), null)
  assert.throws(() => parseMoney('1.077'))
  assert.throws(() => parseMoney('1e5'))
  assert.throws(() => parseMoney('1,2,3'))
})

test('financial backup validation rejects corrupt or ambiguous state without losing fractional quantity', () => {
  const original = initialInvestmentState()
  assert.deepEqual(validateState(JSON.parse(JSON.stringify(original))), original)
  assert.throws(() => validateState({ ...original, positions: [...original.positions, original.positions[0]] }))
  assert.throws(() => validateState({ ...original, positions: [{ ...original.positions[0], valueCents: 12.1 }] }))
  assert.throws(() => validateState({ ...original, positions: [{ ...original.positions[0], valueCents: -1 }] }))
  assert.throws(() => validateState({ ...original, positions: [{ ...original.positions[0], quantity: '0' }] }))
  assert.throws(() => validateState({ ...original, account: { snapshotDate: '2026-02-30' } }))
  assert.throws(() => validateState({ ...original, watchlist: [{ name: 'Missing ID' }] }))
})

test('unknown gains do not become zero or a whole-account return in reports', () => {
  const state = initialInvestmentState()
  const report = portfolioReport(state)
  assert.match(report, /تاریخ قیمت‌ها: نامشخص/)
  assert.match(report, /پوشش: ناقص/)
  assert.match(report, /از 4 ردیف؛ 1 ردیف نامشخص/)
  assert.match(report, /سود خالص حساب یا بازده تاریخی نیست/)
  assert.match(report, /Example Unknown:.*نامشخص/)
  assert.match(report, /بهای خرید قطعی یا بازده سالانه استنتاج نکن/)
})

test('empty and zero-value portfolios produce finite allocation and no invented percentages', () => {
  const empty = summarize([])
  assert.equal(empty.totalCents, 0)
  assert.equal(empty.topFiveShare, 0)
  assert.deepEqual(empty.allocation, [])
  const zero = summarize([{ ...initialInvestmentState().positions[0], valueCents: 0, gainCents: null }])
  assert.equal(zero.topFiveShare, 0)
  assert.equal(zero.unknownGainCount, 1)
})
