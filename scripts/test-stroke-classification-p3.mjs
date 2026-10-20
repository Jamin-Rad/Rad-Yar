import assert from 'node:assert/strict'
import { STROKE_LESSON } from '../data/stroke.js'

const locales = ['de', 'en', 'fa']
const groups = STROKE_LESSON.basics.classificationGroups

function assertLocalized(value, label) {
  assert.ok(value && typeof value === 'object' && !Array.isArray(value), `${label} must be a localized object`)
  for (const locale of locales) {
    assert.equal(typeof value[locale], 'string', `${label}.${locale} must be present`)
    assert.ok(value[locale].trim(), `${label}.${locale} must not be empty`)
  }
}

assertLocalized(STROKE_LESSON.basics.classificationTitle, 'classificationTitle')
assertLocalized(STROKE_LESSON.basics.classificationCaveLabel, 'classificationCaveLabel')
assertLocalized(STROKE_LESSON.basics.classificationCave, 'classificationCave')
assertLocalized(STROKE_LESSON.heroCards[0].value, 'heroCards[0].value')

for (const [groupIndex, group] of groups.entries()) {
  assertLocalized(group.title, `group ${groupIndex} title`)
  for (const [itemIndex, item] of group.items.entries()) {
    assertLocalized(item.title, `group ${groupIndex} item ${itemIndex} title`)
    assert.ok(Array.isArray(item.text), `group ${groupIndex} item ${itemIndex} text must be an array`)
    for (const [textIndex, text] of item.text.entries()) {
      assertLocalized(text, `group ${groupIndex} item ${itemIndex} text ${textIndex}`)
    }
  }
}

const renderedText = JSON.stringify({
  heroCards: STROKE_LESSON.heroCards,
  groups,
  nihss: STROKE_LESSON.basics.items.find(item => item.title?.de === 'NIHSS'),
  cave: STROKE_LESSON.basics.classificationCave,
})
assert.doesNotMatch(renderedText, /80.?85|15.?20|10.?15|RIND|PRIND|Completed Stroke|>\s*6|greater than 6/i)

const tIa = groups.flatMap(group => group.items).find(item => item.title?.en === 'Transient ischaemic attack (TIA)')
assert.ok(tIa, 'TIA explanation is present')
assert.match(tIa.text[0].en, /without infarction/i)
assert.match(tIa.text[1].en, /duration alone/i)

const nihss = groups.flatMap(group => group.items).find(item => item.title?.en === 'NIHSS')
assert.ok(nihss, 'NIHSS explanation is present')
assert.match(nihss.text[0].en, /0–42/)
assert.match(nihss.text[1].en, /low score.*disabling deficit/i)

const basicsNihss = STROKE_LESSON.basics.items.find(item => item.title?.en === 'NIHSS')
assert.ok(basicsNihss, 'brief NIHSS reference remains in clinical basics')
assert.match(basicsNihss.text.en, /0–42/)
assert.match(basicsNihss.text.en, /see “TIA and stroke”/i)
assert.doesNotMatch(basicsNihss.text.en, /score alone|low score/i, 'detailed disability caveat appears only once')

const venousInfarct = groups.flatMap(group => group.items).find(item => item.title?.en === 'Venous infarction')
assert.ok(venousInfarct, 'pre-existing venous infarction mechanism is retained')
assertLocalized(venousInfarct.title, 'venous infarction title')
for (const [textIndex, text] of venousInfarct.text.entries()) assertLocalized(text, `venous infarction text ${textIndex}`)

assert.equal(STROKE_LESSON.basics.rows.length, 5, 'source vascular-territory comparison remains available')
for (const [rowIndex, row] of STROKE_LESSON.basics.rows.entries()) {
  for (const [cellIndex, cell] of row.entries()) assertLocalized(cell, `territory row ${rowIndex} cell ${cellIndex}`)
}

console.log('Stroke p.3 classification and translation checks passed.')
