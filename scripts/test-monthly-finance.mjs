import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const source = readFileSync(new URL('../utils/monthlyFinance.js', import.meta.url), 'utf8')
const finance = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`)
const { parseEuroAmount, validEntryDate, berlinToday, shiftMonth, expenseCategoryTotals, buildMonthlyAnalytics } = finance

for (const value of ['42,50', '42.50', ' 42,50 ', '1.234,56', '1234.56', '1 234,56']) {
  assert.equal(parseEuroAmount(value), value.includes('234') ? 1234.56 : 42.5)
}
for (const value of ['', '0', '-5', 'Infinity', '12,345', '12.345', '1,234.56', 'abc', '1e3']) assert.equal(parseEuroAmount(value), null)
assert.equal(validEntryDate('2026-02-30'), false)
assert.equal(validEntryDate('2028-02-29'), true)
assert.equal(berlinToday(new Date('2026-10-12T23:30:00Z')), '2026-10-13')
assert.equal(shiftMonth('2026-01', -1), '2025-12')

const categories = [{ name: 'Lebensmittel', type: 'expense' }, { name: 'Fatima', type: 'expense' }, { name: 'Auto', type: 'expense' }]
const expense = (date, amount, extra = {}) => ({ type: 'expense', date, amount, category: 'Lebensmittel', ...extra })
const base = { month: '2026-10', today: '2026-10-13', categories, budgets: { Lebensmittel: 100, Auto: 200 },
  entries: [expense('2026-10-12', 125, { tags: ['Lebensmittel', 'Fatima'], paidByFatima: true }), expense('2026-10-20', 50)],
  previousEntries: [expense('2026-09-12', 100), expense('2026-09-20', 200)],
}
assert.deepEqual(expenseCategoryTotals(base.entries, categories), [['Lebensmittel', 175]])
const current = buildMonthlyAnalytics(base)
assert.equal(current.totals.expenses, 175)
assert.equal(current.totals.fatima, 125)
assert.equal(current.comparisonDay, 13)
assert.equal(current.changes.expenses.amount, 25)
assert.equal(current.changes.expenses.percent, 25)
assert.equal(current.rows.find(row => row.name === 'Lebensmittel').percent, 175)
assert.equal(current.rows.find(row => row.name === 'Auto').actual, 0)
assert.equal(current.budgetRemaining, 125)
assert.equal(current.multiTagged, true)
assert.equal(current.overBudget.length, 1)
const historical = buildMonthlyAnalytics({ ...base, month: '2026-08' })
assert.equal(historical.comparisonDay, null)
assert.equal(historical.changes.expenses.amount, -125)
assert.equal(buildMonthlyAnalytics({ ...base, month: '2026-11' }).changes.expenses, null)
assert.equal(buildMonthlyAnalytics({ ...base, previousEntries: [] }).comparable, false)
const cappedDays = buildMonthlyAnalytics({ ...base, today: '2026-10-31', entries: [expense('2026-10-30', 50), expense('2026-10-31', 100)] })
assert.equal(cappedDays.comparisonDay, 30)
assert.equal(cappedDays.changes.expenses.amount, -250)
const exhausted = buildMonthlyAnalytics({ ...base, entries: [expense('2026-10-01', 100)] })
assert.equal(exhausted.rows[0].status, 'full')
assert.equal(exhausted.overBudget.length, 0)
const noBudget = buildMonthlyAnalytics({ ...base, budgets: {}, entries: [expense('2026-10-01', 50)] })
assert.equal(noBudget.budgetTotal, 0)
assert.equal(noBudget.unbudgeted, 50)
const subLimits = buildMonthlyAnalytics({ ...base, budgets: { 'Lebensmittel / Aldi': 30, 'Lebensmittel / Lidl': 20 }, entries: [expense('2026-10-01', 10)] })
assert.equal(subLimits.budgetTotal, 50)
const parentLimit = buildMonthlyAnalytics({ ...base, budgets: { 'Lebensmittel / Gesamt': 100, 'Lebensmittel / Aldi': 30 } })
assert.equal(parentLimit.budgetTotal, 100)
const centBoundary = buildMonthlyAnalytics({ ...base, budgets: { Lebensmittel: .3 }, entries: [expense('2026-10-01', .1), expense('2026-10-02', .2)] })
assert.equal(centBoundary.rows[0].status, 'full')
assert.equal(centBoundary.budgetRemaining, 0)
console.log('Monthly finance tests passed: EUR parsing, Berlin date, leap dates, equal-period comparisons, primary-category totals, payer totals, zero-spend budgets, uncapped percentages, and budget boundaries.')
