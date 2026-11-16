import test from 'node:test'
import assert from 'node:assert/strict'
import { overviewAllocation } from './overview-allocation.mjs'

test('portfolio aggregates repeated ISINs across owners and reports missing coverage separately', () => {
  const position = (id, value, overrides = {}) => ({ id, name: id, quantityKnown: true, category: 'stock', marketValueCents: value, ...overrides })
  const allocation = overviewAllocation([
    {accountId: 'self', positions: [position('Same name', 3000, {isin:'US0378331005'}), position('Second technology holding', 1000, {isin:'US5949181045'})]},
    {accountId: 'fatemeh', positions: [position('Same name', 4000, {isin:'US0378331005'}), position('Unnamed instrument', 2000, {category:'fund'}),
      position('Unpriced', null), position('Unconfirmed', 9000, {quantityKnown:false})]},
  ], { US0378331005: 'technology', US5949181045: 'technology' })
  assert.equal(allocation.total, 10000)
  assert.equal(allocation.excluded, 2)
  assert.deepEqual(allocation.groups.map(({key, share}) => [key, share]), [['technology', .8], ['fund', .2]])
  assert.deepEqual(allocation.groups[0].holdings.map(({key, valueCents, share}) => [key, valueCents, share]), [
    ['US0378331005', 7000, .7], ['US5949181045', 1000, .1],
  ])
  assert.equal(allocation.groups[0].holdings[0].accountId, 'fatemeh')
  assert.equal(allocation.groups[0].holdings[0].positionId, 'Same name')
  assert.deepEqual(allocation.top.map(({key, valueCents}) => [key, valueCents]), [['US0378331005', 7000], ['fatemeh:Unnamed instrument', 2000], ['US5949181045', 1000]])
})

test('profit allocation nets shared instruments across accounts before weighting only positive gains', () => {
  const position = (id, isin, marketGainCents) => ({ id, isin, name: id, category: 'stock', marketGainCents })
  const apple = 'US0378331005', microsoft = 'US5949181045'
  const allocation = overviewAllocation([
    { accountId: 'self', positions: [position('Apple', apple, 700), position('Microsoft', microsoft, 200)] },
    { accountId: 'fatemeh', positions: [position('Apple', apple, -400), position('Loss', '', -900), position('Unknown', '', null)] },
  ], { [apple]: 'technology', [microsoft]: 'technology' }, 'profit')
  assert.equal(allocation.total, 500)
  assert.equal(allocation.excluded, 1)
  assert.deepEqual(allocation.groups[0].holdings.map(({key, valueCents, share}) => [key, valueCents, share]), [[apple, 300, .6], [microsoft, 200, .4]])
})
