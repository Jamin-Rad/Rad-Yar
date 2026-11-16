import { test } from 'node:test'
import assert from 'node:assert/strict'
import { estimateXtbStopOut, xtbExposure, xtbScenario } from './xtb-risk.mjs'

test('remaining lots and gross Brent scenarios use the broker contract multiplier', () => {
  const exposure = xtbExposure({
    plan: { direction: 'long', symbol: 'OIL', product: 'cfd', currency: 'USD' },
    executions: [{ kind: 'entry', price: '95.80', quantity: '.02' }],
  })
  assert.equal(exposure.units, 20)
  assert.equal(Math.round(xtbScenario(exposure, 90).amount), -116)
  assert.equal(Math.round(xtbScenario(exposure, 110).amount), 284)
  const snapshot = { price: 96, equity: 400, margin: 180, fx: 1 }
  assert.deepEqual(estimateXtbStopOut(exposure, snapshot, 1), { price: 80.5, marginLevel: 400 / 180 * 100, alreadyBelow: false })
  assert.equal(estimateXtbStopOut(exposure, snapshot, 2), null)
  assert.equal(estimateXtbStopOut(exposure, { ...snapshot, equity: 80 }, 1).alreadyBelow, true)
})
