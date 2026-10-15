import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const source = readFileSync(new URL('../utils/monthlyExpenseModel.js', import.meta.url), 'utf8')
const m = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`)
for (const [text, expected] of [['42,50', 42.5], ['42.50', 42.5], ['1.234,56', 1234.56], ['1 234,56', 1234.56], ['.50', .5]]) assert.equal(m.parseAmount(text), expected)
for (const text of ['', '0', '-10', 'NaN', 'Infinity', '12,345', '12.345', '1e2', '1,234.56']) assert.equal(m.parseAmount(text), null)
assert.equal(m.validDate('2026-02-30'), false)
assert.equal(m.validDate('2028-02-29'), true)
assert.equal(m.todayBerlin(new Date('2026-10-14T23:15:00Z')), '2026-10-15')
assert.equal(m.shiftMonth('2026-01', -1), '2025-12')

const categories = [{ name: 'Lebensmittel', type: 'expense' }, { name: 'Fatima', type: 'expense' }, { name: 'Auto', type: 'expense' }]
const exp = (id, date, amount, extra = {}) => ({ id, type: 'expense', date, amount, category: 'Lebensmittel', ...extra })
const store = {
  '2026-10': { entries: [exp('one', '2026-10-12', 125, { tags: ['Lebensmittel', 'Fatima'], paidByFatima: true }), exp('later', '2026-10-25', 50)], note: 'Keep metadata' },
  '2026-09': { entries: [exp('old', '2026-09-12', 100), exp('late-old', '2026-09-25', 200)] },
  __iran_special_trip_v1: { expenses: [{ id: 'iran', amountRial: 3000000 }], note: 'Keep vacation' },
}
const input = { month: '2026-10', store, recurring: [], budgets: { Lebensmittel: 100, Auto: 200 }, categories, today: '2026-10-15' }
const result = m.analyseMonth(input)
assert.equal(result.totals.expenses, 175)
assert.equal(result.totals.fatima, 125)
assert.equal(result.day, 15)
assert.equal(result.delta, 25)
assert.equal(result.rows.find(row => row.name === 'Lebensmittel').percent, 175)
assert.equal(result.rows.find(row => row.name === 'Auto').actual, 0)
assert.equal(result.rows.reduce((sum, row) => sum + row.actual, 0), result.totals.expenses)
assert.equal(result.budgetLeft, 125)
assert.equal(m.analyseMonth({ ...input, month: '2026-11' }).delta, null)
assert.equal(m.analyseMonth({ ...input, store: { '2026-10': store['2026-10'] } }).comparable, false)
assert.equal(m.analyseMonth({ ...input, today: '2026-10-31' }).day, 30)
const decimals = m.analyseMonth({ ...input, store: { '2026-10': { entries: [exp('a', '2026-10-01', .1), exp('b', '2026-10-02', .2)] } }, budgets: { Lebensmittel: .3 } })
assert.equal(decimals.rows[0].status, 'full')
assert.equal(decimals.budgetLeft, 0)
assert.equal(m.categoryLimit({ 'Lebensmittel / Gesamt': 100, 'Lebensmittel / Aldi': 30 }, 'Lebensmittel'), 100)
assert.equal(m.categoryLimit({ 'Lebensmittel / Aldi': 30, 'Lebensmittel / Lidl': 20 }, 'Lebensmittel'), 50)

const recurring = [{ id: 'rent', title: 'Miete', category: 'Zu Hause', amount: 1000, startMonth: '2026-01', endMonth: '2026-10', amountChanges: [{ startMonth: '2026-09', amount: 1200 }] }]
assert.equal(m.monthEntries('2026-08', {}, recurring)[0].amount, 1000)
assert.equal(m.monthEntries('2026-10', {}, recurring)[0].amount, 1200)
assert.equal(m.monthEntries('2026-11', {}, recurring).length, 0)
assert.equal(m.monthEntries('2027-01', {}, [{ ...recurring[0], endMonth: undefined }], { futureRecurring: false, today: '2026-10-15' }).length, 0)
const vacations = m.monthEntries('2026-10', { '2026-10': { entries: [exp('vacation', '2026-10-12', 10, { tags: ['Ausflug'] }), exp('stay', '2026-10-12', 20)] } }, [])
assert.equal(vacations.length, 1)

const original = structuredClone(store)
const moved = { ...store['2026-10'].entries[0], date: '2026-09-15', amount: 150 }
const updated = m.putMonthlyEntry(store, moved)
assert.deepEqual(store, original)
assert.equal(updated['2026-10'].entries.some(entry => entry.id === 'one'), false)
assert.equal(updated['2026-09'].entries.filter(entry => entry.id === 'one').length, 1)
assert.equal(updated['2026-10'].note, 'Keep metadata')
assert.deepEqual(updated.__iran_special_trip_v1, original.__iran_special_trip_v1)
const deleted = m.removeMonthlyEntry(updated, 'one')
assert.equal(deleted['2026-09'].entries.some(entry => entry.id === 'one'), false)
assert.deepEqual(deleted.__iran_special_trip_v1, original.__iran_special_trip_v1)
console.log('Monthly expense model passed: locale input, Berlin dates, equal-period comparison, unique category totals, budget limits, recurring history, vacation exclusion and immutable month moves.')
