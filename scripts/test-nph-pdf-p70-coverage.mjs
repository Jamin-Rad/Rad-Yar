import assert from 'node:assert/strict'
import fs from 'node:fs'
import { NPH_LESSON } from '../data/normaldruckhydrozephalus.js'

assert.deepEqual(NPH_LESSON.pdfSourcePages, [69, 71])
const fourthVentricle = NPH_LESSON.morphologie.items.find(item => item.title.en === 'Fourth-ventricle configuration')
assert.ok(fourthVentricle)
for (const lang of ['de', 'en', 'fa']) {
  assert.ok(fourthVentricle.title[lang] && fourthVentricle.text[lang], `${lang}: complete localized morphology caveat`)
}
assert.match(fourthVentricle.text.en, /alone does not establish NPH or exclude obstruction/)
assert.equal(NPH_LESSON.morphologie.reference.url, 'https://doi.org/10.3238/arztebl.2012.0015')
for (const lang of ['de', 'en', 'fa']) assert.ok(NPH_LESSON.morphologie.reference.label[lang])

const curriculum = fs.readFileSync('data/curriculum.js', 'utf8')
assert.match(curriculum, /\{ id: 'systematische-bildanalyse-liquor',[^\n]*link: '\/gehirn\/anatomie\/liquorraeume-ventrikelsystem',[^\n]*ready: true, inProgress: true/)
const route = fs.readFileSync('app/gehirn/anatomie/normaldruckhydrozephalus/page.js', 'utf8')
assert.ok(route.includes('NPH_LESSON.morphologie.reference.url'))
const ledger = fs.readFileSync('docs/lesson-quality/gehirn-nph-p69-p71.md', 'utf8')
for (const phrase of ['physical PDF pp.69–71', 'fourth ventricle', 'lactate on MRS', 'hypometabolism on PET', 'diagnostic value as unclear']) {
  assert.ok(ledger.toLowerCase().includes(phrase.toLowerCase()), `ledger records ${phrase}`)
}
console.log('Gehirn.pdf NPH p.70 delta: localized fourth-ventricle caveat, linked evidence, curriculum route mapping and omission rationale PASS. Independent review/browser/clinical approval remain separate.')
