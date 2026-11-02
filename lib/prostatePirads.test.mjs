import test from 'node:test'
import assert from 'node:assert/strict'
import { combinePirads } from './prostatePirads.mjs'

// Independent transcription of the PI-RADS v2.1 assessment table (p. 11).
test('PZ combination table: only DWI 3 responds to positive DCE', () => {
  const expected = { negative: [1, 2, 3, 4, 5], positive: [1, 2, 4, 4, 5], unavailable: [1, 2, 3, 4, 5] }
  for (const [dce, scores] of Object.entries(expected)) {
    for (let dwi = 1; dwi <= 5; dwi++) {
      for (let t2 = 1; t2 <= 5; t2++) {
        assert.equal(combinePirads({ zone: 'PZ', dwi, t2, dce }).score, scores[dwi - 1])
      }
    }
  }
})

test('TZ combination table, including 2+1 and 3+1: DCE does not change scores', () => {
  const expected = [[1, 1, 1, 1, 1], [2, 2, 2, 3, 3], [3, 3, 3, 3, 4], [4, 4, 4, 4, 4], [5, 5, 5, 5, 5]]
  for (let t2 = 1; t2 <= 5; t2++) for (let dwi = 1; dwi <= 5; dwi++) {
    for (const dce of ['negative', 'positive', 'unavailable']) {
      assert.equal(combinePirads({ zone: 'TZ', t2, dwi, dce }).score, expected[t2 - 1][dwi - 1])
    }
  }
})

test('unavailable DCE is distinguished from negative DCE', () => {
  assert.equal(combinePirads({ zone: 'PZ', dwi: 3, dce: 'unavailable' }).rule, 'pz-no-dce')
  assert.equal(combinePirads({ zone: 'PZ', dwi: 3, dce: 'negative' }).rule, 'pz-negative')
})

test('invalid or missing dominant scores cannot produce a clinical category', () => {
  const valid = { zone: 'TZ', t2: 3, dwi: 4, dce: 'positive' }
  for (const patch of [{ zone: 'CZ' }, { t2: undefined }, { t2: 6 }, { dwi: 0 }, { dwi: 2.5 }, { dwi: '4' }, { dce: undefined }]) {
    assert.throws(() => combinePirads({ ...valid, ...patch }), RangeError)
  }
})
