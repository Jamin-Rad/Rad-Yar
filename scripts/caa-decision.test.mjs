import test from 'node:test'
import assert from 'node:assert/strict'
import { CAA_DECISION_EXAMS, decisionOutcome } from '../data/caaDecisionExam.mjs'

for (const [id, questions] of Object.entries(CAA_DECISION_EXAMS)) {
  test(`${id}: questions and follow-ups are complete in all three languages`, () => {
    assert.equal(questions.length, 6)
    assert.equal(new Set(questions.map(q => q.id)).size, questions.length)
    assert.deepEqual(new Set(questions.map(q => q.domain)), new Set(['observation','investigation','interpretation','diagnosis']))
    for (const question of questions) {
      for (const entry of [question, question.followUp]) {
        assert(entry)
        assert(entry.options.length >= 3)
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
  test(`${id}: follow-up recovery cannot erase an incorrect initial answer`, () => {
    for(const question of questions) {
      const wrong = question.options.find(option => option.id !== question.correct).id
      assert.equal(decisionOutcome(question,question.correct),'independent')
      assert.equal(decisionOutcome(question,wrong),'missed')
      assert.equal(decisionOutcome(question,wrong,question.followUp.correct),'supported')
      assert.equal(decisionOutcome(question,undefined),'unanswered')
      assert.equal(decisionOutcome(question,'not-an-option',question.followUp.correct),'unanswered')
      assert.equal(decisionOutcome(question,question.correct,'not-an-option'),'independent')
    }
  })
}
