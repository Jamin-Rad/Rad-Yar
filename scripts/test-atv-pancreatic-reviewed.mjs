import fs from 'node:fs'
import assert from 'node:assert/strict'
import { QUESTION_BANK } from '../data/questions.js'
import { FLASHCARDS } from '../data/flashcards.js'
import { abdomenThoraxAssessmentDrafts as drafts } from '../data/abdomenThoraxAssessmentDrafts.js'
import { lessonCheckFeedback } from '../lib/lessonCheckFeedback.js'

// The independently reviewed manifest is the expected payload, rather than a
// second derivation from the newly integrated producers.
const base = 'docs/lesson-quality/remediation-2026-10-25/abdomen-technik/'
const manifest = JSON.parse(fs.readFileSync(base + 'packet05-author-manifest.json', 'utf8'))
let compared = 0
for (const lang of ['de', 'en', 'fa']) {
  assert.equal(manifest.questions[lang].length, 23)
  for (const expected of manifest.questions[lang]) {
    assert.deepEqual(QUESTION_BANK[lang].find(question => question.id === expected.id), expected, expected.id)
    compared++
  }
}
assert.equal(manifest.cards.length, 26)
for (const expected of manifest.cards) {
  assert.deepEqual(FLASHCARDS.find(card => card.id === expected.id), expected, expected.id)
  compared++
}
let optionRationales = 0
for (const key of ['abdomen-pdac-isoattenuating', 'abdomen-pdac-double-duct', 'abdomen-pdac-vessel-contact', 'abdomen-pancreatic-cysts']) {
  const draft = drafts[key]
  const check = { ...draft, explanation: draft.rationale }
  assert.equal(draft.options.length, 4, key)
  for (const lang of ['de', 'en', 'fa']) {
    const question = QUESTION_BANK[lang].find(item => item.id === `${key}-${lang}-01`)
    assert.equal(draft.question[lang], question.question)
    assert.equal('ABCD'[draft.answer], question.correct)
    for (let index = 0; index < 4; index++) {
      assert.equal(draft.options[index][lang], question.options[index].text)
      const expected = index === draft.answer ? question.explanation : question.wrongExplanations['ABCD'[index]]
      assert.equal(lessonCheckFeedback(check, index)[lang], expected)
      optionRationales++
    }
  }
}
assert.equal(compared, 95)
assert.equal(optionRationales, 48)
console.log('All 95 reviewed pancreatic/PSC payloads and 48 localized draft option rationales match actual canonical runtime exports. Browser and clinical acceptance remain separate.')
