import test from 'node:test'
import assert from 'node:assert/strict'
import { pageForRect, spreadStart, mappedQuestions } from '../components/book-view/pagination.mjs'
import { BOOK_VIEW_PILOTS, BOOK_QUESTION_MAPPINGS, questionIdsForSection } from '../components/book-view/pilots.js'
import { CAA_QUESTIONS } from '../data/caaStudyBank.js'
import { CAA_CHAPTERS } from '../data/caaLesson.js'

test('page geometry handles LTR, RTL, gutters and subpixel roundoff', () => {
  assert.equal(pageForRect({ left: 40 }, { left: 40 }, 564), 0)
  assert.equal(pageForRect({ left: 604 }, { left: 40 }, 564), 1)
  assert.equal(pageForRect({ left: 1167.7 }, { left: 40 }, 564), 2)
  assert.equal(pageForRect({ right: 1060 }, { right: 1060 }, 564, true), 0)
  assert.equal(pageForRect({ right: 496 }, { right: 1060 }, 564, true), 1)
  assert.equal(pageForRect({}, {}, 0), 0)
})
test('spread navigation never skips the last odd page or leaves the book', () => {
  assert.equal(spreadStart(99, 2, 7), 6)
  assert.equal(spreadStart(5, 2, 7), 4)
  assert.equal(spreadStart(-1, 2, 7), 0)
  assert.equal(spreadStart(99, 1, 7), 6)
  assert.equal(spreadStart(2, 2, 1), 0)
})
test('only the CAA pilot is enabled', () => {
  assert.deepEqual([...BOOK_VIEW_PILOTS], ['caa'])
  assert.deepEqual(questionIdsForSection('another-lesson', 'grundlagen', 'de'), [])
  assert.deepEqual(questionIdsForSection('caa', 'unknown-section', 'de'), [])
})
test('every checkpoint maps 1–3 unchanged questions to an existing section in all languages', () => {
  for (const lang of ['de', 'en', 'fa']) {
    const seen = new Set()
    for (const section of Object.keys(BOOK_QUESTION_MAPPINGS.caa)) {
      assert.ok(CAA_CHAPTERS.some(chapter => chapter.id === section))
      const ids = questionIdsForSection('caa', section, lang)
      const result = mappedQuestions(CAA_QUESTIONS[lang], ids)
      assert.equal(result.length, ids.length)
      assert.ok(result.length >= 1 && result.length <= 3)
      for (const question of result) {
        assert.equal(question, CAA_QUESTIONS[lang].find(source => source.id === question.id))
        assert.ok(!seen.has(question.id))
        seen.add(question.id)
      }
    }
  }
})
test('unmapped, missing and invalid questions are skipped without inventing replacements', () => {
  const bank = CAA_QUESTIONS.en
  assert.deepEqual(mappedQuestions(bank), [])
  assert.deepEqual(mappedQuestions(bank, ['does-not-exist']), [])
  assert.deepEqual(mappedQuestions([{ ...bank[0], correct: 'missing' }], [bank[0].id]), [])
  assert.equal(mappedQuestions(bank, [bank[0].id, bank[0].id]).length, 1)
  assert.equal(mappedQuestions(bank, bank.map(question => question.id), 99).length, 3)
})
