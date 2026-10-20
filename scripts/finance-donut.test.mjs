import test from 'node:test'
import assert from 'node:assert/strict'
import { buildExpenseDonut, formatExpenseShare } from '../app/admin/budget/financeDonutGeometry.mjs'

test('chart shares sum to 100 without double-counting refunds or zero categories', () => {
  const segments = buildExpenseDonut([['Wohnen', 1200], ['Sonstiges', 700], ['Lebensmittel', 480], ['Freizeit', 350], ['Mobilität', 220], ['Erstattung', -50], ['Leer', 0]])
  assert.equal(segments.length, 5)
  assert.ok(Math.abs(segments.reduce((total, segment) => total + segment.share, 0) - 100) < 1e-10)
  assert.equal(formatExpenseShare(segments[0].share), '40,7 %')
  assert.equal(formatExpenseShare(segments[4].share), '7,5 %')
  assert.ok(segments.some(segment => segment.outer.length))
  assert.ok(segments.some(segment => segment.inner.length))
})

test('single category, tiny slices, and empty/refund-only months have valid geometry', () => {
  for (const values of [[['Alles', 99]], [['Groß', 100000], ['Klein', 0.01]], Array.from({ length: 30 }, (_, index) => [`Kategorie ${index}`, index + 1])]) {
    const result = buildExpenseDonut(values)
    assert.ok(Math.abs(result.reduce((total, segment) => total + segment.share, 0) - 100) < 1e-10)
    for (const segment of result) {
      assert.ok(segment.share > 0)
      for (const path of [segment.top, ...segment.outer, ...segment.inner, ...segment.edges]) {
        assert.match(path, /^M /)
        assert.match(path, / Z$/)
        assert.doesNotMatch(path, /NaN|Infinity|undefined/)
      }
    }
  }
  assert.equal(buildExpenseDonut([['Alles', 99]])[0].share, 100)
  assert.equal(formatExpenseShare(0.00001), '< 0,1 %')
  assert.deepEqual(buildExpenseDonut([]), [])
  assert.deepEqual(buildExpenseDonut([['Erstattung', -40], ['Null', 0], ['Ungültig', NaN]]), [])
})
