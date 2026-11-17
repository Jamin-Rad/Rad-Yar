import assert from 'node:assert/strict'
import test from 'node:test'
import { evaluateFindings, isReviewed, questionsFor, selectFinding } from './workflow.mjs'

test('Cine and ECG follow-ups depend on relevant findings', () => {
  const normal = { 'rv-motion': ['none'], twi: ['none'] }
  const path = questionsFor(normal)
  assert.ok(path.every(item => !['rv-global', 'age', 'rv-values', 'family-arvc'].includes(item.id)))
  assert.equal(isReviewed(path[0], normal), true)
  assert.equal(isReviewed(path[0], { 'rv-motion': ['unknown'] }), false)
  const positive = questionsFor({ 'rv-motion': ['aneurysm'], twi: ['v1-v3'] })
  assert.ok(['rv-global', 'age'].every(id => positive.some(item => item.id === id)))
})

test('selecting another LV scar extent preserves the RV finding', () => {
  const lge = questionsFor({}).find(item => item.id === 'lge')
  assert.deepEqual(selectFinding(lge, ['rv-lge', 'lv-lge'], 'lv-lge-extensive'), ['rv-lge', 'lv-lge-extensive'])
  assert.deepEqual(selectFinding(lge, ['rv-lge'], 'none'), ['none'])
})

test('ETF scores RV scar as minor and Padua as major', () => {
  const { etf, padua } = evaluateFindings({ lge: ['rv-lge'] })
  assert.equal(etf.points, 1)
  assert.equal(padua.points, 2)
  const anotherPattern = evaluateFindings({ lge: ['rv-lge-other'] })
  assert.equal(anotherPattern.etf.points, 1)
  assert.equal(anotherPattern.padua.outcome, 'noAnchor')
})

test('ETF uses LV LGE extent and can diagnose ALVC without a variant', () => {
  const limited = evaluateFindings({ lge: ['lv-lge'], genetics: ['gene-acm'] })
  assert.equal(limited.etf.points, 2)
  assert.equal(limited.etf.outcome, 'possible')
  assert.equal(limited.padua.outcome, 'alvcMet')
  const extensive = evaluateFindings({ lge: ['lv-lge-extensive'], depolarization: ['low-voltage-all'] })
  assert.equal(extensive.etf.points, 4)
  assert.equal(extensive.etf.outcome, 'definite')
  assert.equal(extensive.padua.outcome, 'alvcMissing')
  assert.equal(evaluateFindings({ 'lv-function': ['lv-function'], genetics: ['gene-arvc'] }).etf.outcome, 'etfLgeMissing')
})

test('ETF does not establish overt disease from electrical and genetic findings alone', () => {
  const result = evaluateFindings({ depolarization: ['low-voltage-all'], genetics: ['gene-arvc'], arrest: ['arrest-vf-vt'] })
  assert.equal(result.etf.outcome, 'noAnchor')
  assert.equal(result.etf.points, null)
})

test('ETF aneurysm with global RV dysfunction is major, with no additional minor points', () => {
  const result = evaluateFindings({ 'rv-motion': ['aneurysm'], 'rv-global': ['dysfunction'] })
  assert.equal(result.etf.points, 2)
  assert.equal(result.etf.breakdown[0].matches.length, 2)
  assert.equal(result.padua.points, 1)
})

test('ETF applies the distinct right precordial T-wave rules', () => {
  const scar = { lge: ['rv-lge'], twi: ['v1-v2'] }
  const age = ['age14', 'no-j', 'no-rbbb', 'puberty']
  const result = evaluateFindings({ ...scar, age })
  assert.equal(result.etf.breakdown[2].points, 0)
  assert.equal(result.padua.breakdown[2].points, 1)
  assert.equal(evaluateFindings({ ...scar, age: [...age, 'male'] }).etf.breakdown[2].points, 1)
  assert.equal(evaluateFindings({ ...scar, twi: ['v1-v3'], age }).etf.breakdown[2].points, 2)
  assert.equal(evaluateFindings({ ...scar, twi: ['v1-beyond-child'] }).etf.breakdown[2].points, 1)
})

test('ETF counts compatible rhythm findings once and excludes LV-only findings in ARVC', () => {
  const result = evaluateFindings({ lge: ['rv-lge'], vt: ['vt-superior'], pvc: ['pvc-rv', 'pvc-exercise'], arrest: ['arrest-vf-vt'] })
  const category = result.etf.breakdown[4]
  assert.equal(category.points, 2)
  assert.equal(category.matches.length, 3)
  assert.equal(category.eligible.length, 2)
})
