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

test('September clothing for Mobin is visible in both categories but remains one ledger expense', async () => {
  const { entryCategoryNames, entryCategorySubtitle, buildCategoryTotals } = await import('../app/admin/budget/financeOverviewData.mjs')
  const categories = [
    { name: 'Mobin', type: 'expense', subs: [{ name: 'Kleidung' }, { name: 'Schule' }] },
    { name: 'Kleidung', type: 'expense', subs: [{ name: 'Takko' }] },
  ]
  const expense = { id: 'september-8', type: 'expense', date: '2026-09-08', title: 'Kleidung', category: 'Mobin', tags: ['Mobin'], catSubtitles: { Mobin: 'Kleidung' }, amount: 42 }
  const before = structuredClone(expense)
  assert.deepEqual(entryCategoryNames(expense, categories), ['Mobin', 'Kleidung'])
  assert.equal(entryCategorySubtitle(expense, 'Mobin', categories), 'Kleidung')
  assert.equal(entryCategorySubtitle(expense, 'Kleidung', categories), 'Mobin')
  assert.deepEqual(buildCategoryTotals([expense], categories), [['Kleidung', 42], ['Mobin', 42]])
  assert.deepEqual(buildExpenseBreakdown([expense]), [['Mobin', 42]])
  assert.equal([expense].reduce((sum, e) => sum + e.amount, 0), 42)
  assert.deepEqual(expense, before)
})

test('explicit multi-category selections, old titles and refunds stay unique within each view', async () => {
  const { entryCategoryNames, entryCategorySubtitle, buildCategoryTotals } = await import('../app/admin/budget/financeOverviewData.mjs')
  const categories = [
    { name: 'Mobin', type: 'expense', subs: [{ name: 'Kleidung' }] },
    { name: 'Kleidung', type: 'expense', subs: [{ name: 'Takko' }] },
    { name: 'Gehalt', type: 'income', subs: [] },
  ]
  const explicit = { type: 'expense', category: 'Mobin', tags: ['Mobin', 'Kleidung', 'Kleidung', 'Gehalt'], catSubtitles: { Mobin: 'Kleidung', Kleidung: 'Takko' }, amount: 50 }
  assert.deepEqual(entryCategoryNames(explicit, categories), ['Mobin', 'Kleidung'])
  assert.equal(entryCategorySubtitle(explicit, 'Kleidung', categories), 'Takko')
  assert.deepEqual(entryCategoryNames({ type: 'expense', category: 'Mobin', title: 'Kleidung' }, categories), ['Mobin', 'Kleidung'])
  assert.deepEqual(entryCategoryNames({ type: 'expense', category: 'Mobin', title: 'Shirt für Kleidung', description: 'Kleidung' }, categories), ['Mobin'])
  const refund = { ...explicit, amount: -10 }
  assert.deepEqual(buildCategoryTotals([explicit, refund, { type: 'income', category: 'Gehalt', amount: 1000 }], categories), [['Kleidung', 40], ['Mobin', 40]])
  assert.equal(buildExpenseBreakdown([explicit, refund]).reduce((sum, [, amount]) => sum + amount, 0), 40)
})
