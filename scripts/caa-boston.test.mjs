import test from 'node:test'
import assert from 'node:assert/strict'
import { evaluateBoston } from '../lib/caaBoston.mjs'
const base = { age: 72, clinical: true, lobar: 0, pvs: false, wmh: false, deep: false, alternative: false }
for (const [name, changes, expected] of [
  ['no qualifying MRI marker', {}, ['unmet', 'none']],
  ['one lobar lesion', { lobar: 1 }, ['possible', 'single']],
  ['two lobar lesions', { lobar: 2 }, ['probable', 'multiple']],
  ['many lobar lesions', { lobar: 8 }, ['probable', 'multiple']],
  ['PVS alone', { pvs: true }, ['possible', 'wm']],
  ['WMH alone', { wmh: true }, ['possible', 'wm']],
  ['two WM markers alone are not probable', { pvs: true, wmh: true }, ['possible', 'wm']],
  ['one lesion plus PVS', { lobar: 1, pvs: true }, ['probable', 'combined']],
  ['one lesion plus WMH', { lobar: 1, wmh: true }, ['probable', 'combined']],
  ['one lesion plus both WM markers', { lobar: 1, pvs: true, wmh: true }, ['probable', 'combined']],
  ['threshold age 50', { age: 50, lobar: 2 }, ['probable', 'multiple']],
  ['age 49', { age: 49, lobar: 2 }, ['unmet', 'age']],
  ['no compatible symptoms', { clinical: false, lobar: 2 }, ['unmet', 'clinical']],
  ['deep blood excludes probable', { deep: true, lobar: 2 }, ['unmet', 'deep']],
  ['deep blood excludes possible', { deep: true, pvs: true }, ['unmet', 'deep']],
  ['alternative cause excludes probable', { alternative: true, lobar: 2 }, ['unmet', 'alternative']],
  ['alternative cause excludes possible', { alternative: true, lobar: 1 }, ['unmet', 'alternative']],
  ['empty age', { age: '' }, ['incomplete', 'invalid']],
  ['invalid age', { age: 'unknown' }, ['incomplete', 'invalid']],
  ['fractional age', { age: 50.5 }, ['incomplete', 'invalid']],
  ['negative lesion count', { lobar: -1 }, ['incomplete', 'invalid']],
  ['fractional lesion count', { lobar: 1.5 }, ['incomplete', 'invalid']],
]) test(name, () => {
  const result = evaluateBoston({ ...base, ...changes })
  assert.deepEqual([result.category, result.reason], expected)
})
