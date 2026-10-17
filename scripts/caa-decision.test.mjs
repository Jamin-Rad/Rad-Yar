import test from 'node:test'
import assert from 'node:assert/strict'
import { CAA_DECISION_EXAMS, CAA_PRUEFUNG_CASES, decisionOutcome } from '../data/caaStoryCases.mjs'
import { existsSync } from 'node:fs'

for (const [id, questions] of Object.entries(CAA_DECISION_EXAMS)) {
  test(`${id}: six four-choice decisions are complete in all three languages`, () => {
    assert.equal(questions.length, 6)
    assert.equal(new Set(questions.map(q => q.id)).size, questions.length)
    assert.deepEqual(new Set(questions.map(q => q.domain)), new Set(['observation','investigation','interpretation','diagnosis']))
    for (const question of questions) {
      for (const entry of [question]) {
        assert(entry)
        assert.equal(entry.options.length, 4)
        assert.equal(new Set(entry.options.map(option => option.id)).size,entry.options.length)
        assert(entry.options.some(option => option.id === entry.correct))
        for(const lang of ['de','en','fa']) {
          assert(entry.prompt[lang]?.trim())
          assert(entry.explanation[lang]?.trim())
          for (const option of entry.options) assert(option.text[lang]?.trim())
        }
      }
    }
  })
  test(`${id}: wrong and missing answers cannot receive independent credit`, () => {
    for(const question of questions) {
      const wrong = question.options.find(option => option.id !== question.correct).id
      assert.equal(decisionOutcome(question,question.correct),'independent')
      assert.equal(decisionOutcome(question,wrong),'missed')
      assert.equal(decisionOutcome(question,wrong,question.correct),'missed')
      assert.equal(decisionOutcome(question,undefined),'unanswered')
      assert.equal(decisionOutcome(question,'not-an-option',question.correct),'unanswered')
      assert.equal(decisionOutcome(question,question.correct,'not-an-option'),'independent')
    }
  })
}

test('Only the two requested source cases are active and media belong to their patient', () => {
  assert.deepEqual(CAA_PRUEFUNG_CASES.map(item=>item.id),['caa-radiopaedia-40475','caa-radiopaedia-147140'])
  for(const item of CAA_PRUEFUNG_CASES) {
    const rid=item.id.split('-').at(-1)
    assert(item.source.startsWith('https://radiopaedia.org/cases/'))
    assert(item.credit.includes(rid))
    assert.deepEqual(item.decisionExam.map(question=>question.stage),[0,1,2,3,4,5])
    for(const stage of item.stages) for(const image of [stage,...(stage.additionalImages||[])].filter(image=>image.image)) {
      assert(image.image.includes('/'+rid+'-'))
      assert(existsSync(new URL('../public'+image.image,import.meta.url)))
      for(const lang of ['de','en','fa']) assert(image.imageCaption[lang])
    }
  }
})
