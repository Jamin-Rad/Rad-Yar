import assert from 'node:assert/strict'
import test from 'node:test'
import { evaluateFindings, isReviewed, optionsFor, parseMeasurement, questionsFor, validMeasurements } from './workflow.mjs'

const values = { sex: '', edvi: '', ef: '', unavailable: false }

test('only relevant follow-ups appear, and explicit negative and unknown are distinguishable', () => {
  const normal = { 'rv-motion': ['none'], twi: ['none'], family: ['none'] }
  const path = questionsFor(normal)
  assert.ok(path.every(item => !['rv-values', 'rv-global', 'age', 'family-arvc'].includes(item.id)))
  assert.equal(isReviewed(path[0], normal, values), true)
  assert.equal(isReviewed(path[0], { 'rv-motion': ['unknown'] }, values), false)
  const withFindings = { 'rv-motion': ['ak-dys-free'], twi: ['v1-v3'], family: ['family-pathology'] }
  const followups = questionsFor(withFindings)
  assert.ok(['rv-values', 'rv-global', 'age', 'family-arvc'].every(id => followups.some(item => item.id === id)))
  assert.deepEqual(optionsFor(followups.find(item => item.id === 'family-arvc'), withFindings).map(item => item.id), ['family-pathology'])
})

test('numeric CMR separates Padua normal references from fixed TFC thresholds', () => {
  const answers = { 'rv-motion': ['ak-dys-free'], 'rv-global': ['none'] }
  const result = evaluateFindings(answers, { ...values, sex: 'male', edvi: '110,0' })
  assert.equal(result.tfc.points, 2)
  assert.equal(result.tfc.outcome, 'possible')
  assert.equal(result.padua.points, 1)
  assert.equal(evaluateFindings(answers, { ...values, ef: '۴۵' }).tfc.points, 1)
  assert.equal(evaluateFindings(answers, { ...values, ef: '40' }).tfc.points, 2)
  assert.equal(evaluateFindings(answers, { ...values, sex: 'female', edvi: '۹۰٫۰' }).tfc.points, 1)
  assert.equal(evaluateFindings(answers, { ...values, edvi: '150' }).tfc.points, 0)
  assert.equal(evaluateFindings({ 'rv-motion': ['none'] }, { ...values, ef: '30' }).tfc.points, 0)
  assert.equal(parseMeasurement('١١٠٫٥'), 110.5)
  assert.equal(validMeasurements({ ...values, ef: '101' }), false)
})

test('aneurysmal RV free wall alone qualifies as Padua minor and dyssynchrony alone does not', () => {
  const aneurysm = evaluateFindings({ 'rv-motion': ['aneurysm'] }, values)
  assert.equal(aneurysm.padua.points, 1)
  assert.equal(aneurysm.tfc.points, 0)
  const dyssync = evaluateFindings({ 'rv-motion': ['dyssync'], 'rv-global': ['dilated'] }, { ...values, ef: '40' })
  assert.equal(dyssync.padua.outcome, 'noAnchor')
  assert.equal(dyssync.tfc.points, 2)
})

test('age conditions, epsilon-wave grading and unknown VT axis use their own rules', () => {
  const answers = {
    'rv-motion': ['ak-dys-free'], twi: ['v1-v3'], age: ['older14'],
    depolarization: ['epsilon'], vt: ['vt-unknown-axis'],
  }
  const result = evaluateFindings(answers, values)
  assert.equal(result.tfc.points, 5)
  assert.equal(result.padua.points, 2)
  assert.equal(isReviewed(questionsFor(answers).find(item => item.id === 'vt'), answers, values), false)
  assert.equal(evaluateFindings({ ...answers, age: ['puberty'] }, values).padua.points, 4)
})

test('Padua establishes ALVC with LV LGE and genotype, TFC scores only qualifying independent findings', () => {
  const result = evaluateFindings({
    lge: ['lv-lge'], genetics: ['gene-acm'], biopsy: ['none'],
  }, values)
  assert.equal(result.padua.outcome, 'alvcMet')
  assert.equal(result.padua.points, null)
  assert.equal(result.tfc.points, 0)
  const biopsy = evaluateFindings({ biopsy: ['biopsy-minor'], lge: ['rv-lge'] }, values)
  assert.equal(biopsy.padua.points, 2)
  assert.equal(biopsy.tfc.points, 1)
})

test('findings from echo, angiography and MRI in the same category do not add up', () => {
  const result = evaluateFindings({
    'rv-motion': ['ak-dys-free'], 'other-imaging': ['echo-minor', 'angio', 'rv-function'],
    family: ['family-pathology'], 'family-arvc': ['family-pathology'], genetics: ['gene-arvc'],
  }, { ...values, sex: 'male', edvi: '115', ef: '38' })
  assert.equal(result.tfc.points, 4)
  assert.equal(result.padua.points, 4)
  assert.equal(result.tfc.breakdown[0].matches.length, 3)
})
