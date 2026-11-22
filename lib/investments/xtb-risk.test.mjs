import { test } from 'node:test'
import assert from 'node:assert/strict'
import { valueXtbAccount, estimateXtbStopOut, xtbExposure, xtbScenario } from './xtb-risk.mjs'

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

test('account equity adds signed open P/L and known financing without changing cash',()=>{
  const position={plan:{symbol:'OIL',product:'cfd',currency:'USD'},executions:[{kind:'entry',price:'100',quantity:'0.02'}],brokerSnapshot:{swapCents:-200,rolloverCents:50}}
  const result=valueXtbAccount(50000,[position],{'BZ=F':{currency:'USD',price:102,eurRate:.9}})
  assert.deepEqual(result,{openCents:3450,equityCents:53450,priced:1})
  assert.equal(valueXtbAccount(50000,[position],{}).equityCents,null)
  assert.equal(valueXtbAccount(50000,[],{}).equityCents,50000)
})
