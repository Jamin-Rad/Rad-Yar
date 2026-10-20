import test from 'node:test'
import assert from 'node:assert/strict'
import { buildExpenseBreakdown, expenseCategory } from '../app/admin/budget/financeOverviewData.mjs'

test('multi-tag expenses count once in their primary category', () => {
  const entries = [
    { type: 'expense', category: 'Lebensmittel', tags: ['Lebensmittel', 'Familie'], amount: 480 },
    { type: 'expense', category: 'Familie', tags: ['Familie', 'Freizeit'], amount: '350' },
    { type: 'income', category: 'Gehalt', amount: 4800 },
  ]
  const result = buildExpenseBreakdown(entries)
  assert.deepEqual(result, [['Lebensmittel', 480], ['Familie', 350]])
  assert.equal(result.reduce((sum, [, amount]) => sum + amount, 0), 830)
})

test('refunds offset their category and retain a negative category balance', () => {
  assert.deepEqual(buildExpenseBreakdown([
    { type: 'expense', category: 'Wohnen', amount: 1200 },
    { type: 'expense', category: 'Wohnen', amount: -100 },
    { type: 'expense', category: 'Retouren', amount: -50 },
  ]), [['Wohnen', 1100], ['Retouren', -50]])
})

test('uncategorized and legacy tag-only entries remain visible', () => {
  assert.equal(expenseCategory({ tags: ['Auto', 'Familie'] }), 'Auto')
  assert.deepEqual(buildExpenseBreakdown([
    { type: 'expense', tags: ['Auto', 'Familie'], amount: 220 },
    { type: 'expense', amount: 700 },
  ]), [['Ohne Kategorie', 700], ['Auto', 220]])
})

test('empty, zero and invalid amounts never produce chart segments', () => {
  assert.deepEqual(buildExpenseBreakdown([]), [])
  assert.deepEqual(buildExpenseBreakdown([
    { type: 'expense', category: 'Wohnen', amount: 0 },
    { type: 'expense', category: 'Auto', amount: 'invalid' },
  ]), [])
})
