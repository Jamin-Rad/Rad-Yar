import test from 'node:test'
import assert from 'node:assert/strict'
import { parseMeasurement, prostateVolume, psaDensity } from './prostatePsa.mjs'

test('millimetres and centimetres produce the same volume and density', () => {
  const volume = prostateVolume({ length: '50', width: '40', height: '30' })
  assert.ok(Math.abs(volume - 31.38) < 1e-10)
  assert.ok(Math.abs(prostateVolume({ length: '5', width: '4', height: '3', unit: 'cm' }) - volume) < 1e-10)
  assert.equal(psaDensity('4.7', volume).toFixed(3), '0.150')
  assert.equal(psaDensity('6', 40), 0.15)
})

test('localized input, zero PSA and incomplete measurements stay distinct', () => {
  for (const value of ['4,7', '۴٫۷', '٤٫٧', ' 4.7 ']) assert.equal(parseMeasurement(value), 4.7)
  assert.equal(psaDensity('0', 40), 0)
  for (const value of ['', ' ', '-1', '1e2', '4x', 'Infinity', '1,2,3']) {
    assert.equal(psaDensity(value, 40), null)
    assert.equal(prostateVolume({ length: value, width: 40, height: 30 }), null)
  }
  for (const volume of [0, -1, null, Infinity, NaN]) assert.equal(psaDensity('6', volume), null)
  assert.equal(prostateVolume({ length: 0, width: 40, height: 30 }), null)
  assert.equal(prostateVolume({ length: 50, width: 40, height: 30, unit: 'm' }), null)
})
