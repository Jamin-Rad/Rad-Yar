import test from 'node:test'
import assert from 'node:assert/strict'
import { classifyTfcCmr } from './criteriaLogic.mjs'
const result = patch => classifyTfcCmr({ sex: 'male', edvi: 85, ef: 55, regional: true, ...patch })
test('adult volume cutoffs include their exact boundaries for each sex', () => {
  for (const [sex, minor, major] of [['male',100,110],['female',90,100]]) {
    assert.equal(result({sex,edvi:minor - .01}),'none')
    assert.equal(result({sex,edvi:minor}),'minor')
    assert.equal(result({sex,edvi:major - .01}),'minor')
    assert.equal(result({sex,edvi:major}),'major')
  }
})
test('RVEF 40 is major; above 40 through 45 is minor', () => {
  assert.equal(result({ef:40}),'major')
  assert.equal(result({ef:40.01}),'minor')
  assert.equal(result({ef:45}),'minor')
  assert.equal(result({ef:45.01}),'none')
})
test('regional abnormality is required even with both severe global findings', () => {
  assert.equal(result({edvi:150,ef:25,regional:false}),'none')
  assert.equal(result({edvi:150,ef:25}),'major')
})
test('one category takes the stronger finding and does not add volume to EF', () => {
  assert.equal(result({edvi:105,ef:35}),'major')
  assert.equal(result({edvi:120,ef:43}),'major')
})
test('missing or invalid data never silently become a positive criterion', () => {
  for (const patch of [{ef:''},{edvi:''},{ef:NaN},{edvi:0},{ef:101},{sex:'unknown'}]) assert.equal(result(patch),'incomplete')
})
