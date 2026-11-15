import assert from 'node:assert/strict'
import test from 'node:test'
import { assessPadua, categories } from './criteria.mjs'

const assess = (...ids) => assessPadua(new Set(ids))

test('all 23 criteria belong to six categories and have unique IDs', () => {
  const ids = categories.flatMap(category => category.criteria.map(criterion => criterion.id))
  assert.equal(categories.length, 6)
  assert.equal(ids.length, 23)
  assert.equal(new Set(ids).size, ids.length)
})

test('ECG and genetics alone cannot establish a Padua phenotype', () => {
  const result = assess('rv-twi-major', 'gene')
  assert.equal(result.outcome, 'noAnchor')
  assert.equal(result.points, null)
})

test('right-dominant disease omits LV electrical criteria', () => {
  const result = assess('rv-motion', 'lv-twi', 'low-voltage', 'lv-arrhythmia')
  assert.equal(result.phenotype, 'right')
  assert.equal(result.outcome, 'belowThreshold')
  assert.equal(result.points, 1)
})

test('right-dominant score maps 2, 3, and at least 4 points to distinct tiers', () => {
  assert.equal(assess('rv-function').outcome, 'possible')
  assert.equal(assess('rv-function', 'epsilon').outcome, 'borderline')
  assert.equal(assess('rv-function', 'rv-twi-major').outcome, 'definite')
})

test('biventricular disease counts only the strongest finding per category', () => {
  const result = assess('rv-function', 'rv-motion', 'lv-function', 'rv-lge', 'lv-lge', 'rv-biopsy', 'lv-arrhythmia')
  assert.equal(result.phenotype, 'biventricular')
  assert.equal(result.points, 5)
  assert.equal(result.outcome, 'definite')
  assert.deepEqual(result.breakdown.map(category => category.points), [2, 2, 0, 0, 1, 0])
})

test('isolated ALVC requires characteristic LV LGE and the qualifying genetic variant', () => {
  assert.equal(assess('lv-lge', 'family-definite').outcome, 'alvcMissing')
  assert.equal(assess('lv-function', 'gene').outcome, 'alvcMissing')
  assert.equal(assess('lv-lge', 'gene').outcome, 'alvcMet')
  assert.equal(assess('lv-lge', 'gene').points, null)
  assert.equal(assess('rv-motion', 'lv-lge', 'gene').phenotype, 'biventricular')
})
