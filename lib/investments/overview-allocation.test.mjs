import test from 'node:test'
import assert from 'node:assert/strict'
import { overviewAllocation } from './overview-allocation.mjs'

test('portfolio aggregates repeated ISINs across owners and reports missing coverage separately', () => {
  const position = (id, value, overrides = {}) => ({ id, name: id, quantityKnown: true, category: 'stock', marketValueCents: value, ...overrides })
  const allocation = overviewAllocation([
    {accountId: 'self', positions: [position('Same name', 3000, {isin:'US0378331005'}), position('Unnamed instrument', 1000)]},
    {accountId: 'fatemeh', positions: [position('Same name', 4000, {isin:'US0378331005'}), position('Unnamed instrument', 2000, {category:'fund'}),
      position('Unpriced', null), position('Unconfirmed', 9000, {quantityKnown:false})]},
  ], { US0378331005: 'technology' })
  assert.equal(allocation.total, 10000)
  assert.equal(allocation.excluded, 2)
  assert.deepEqual(allocation.groups.map(({key, share}) => [key, share]), [['technology', .7], ['fund', .2], ['stock', .1]])
  assert.deepEqual(allocation.top.map(({key, valueCents}) => [key, valueCents]), [['US0378331005', 7000], ['fatemeh:Unnamed instrument', 2000], ['self:Unnamed instrument', 1000]])
})
