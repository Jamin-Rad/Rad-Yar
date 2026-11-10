import assert from 'node:assert/strict'
import test from 'node:test'
import { MOCK_TESTS, WORD_CHALLENGE, isTypedAnswerCorrect } from './mobinEnglish.js'

test('two full written mock tests and thirty four-choice questions', () => {
  assert.equal(MOCK_TESTS.length, 2)
  assert.deepEqual(MOCK_TESTS.map(testSet => testSet.questions.length), [10, 10])
  assert.equal(WORD_CHALLENGE.length, 30)
  assert.equal(new Set([...MOCK_TESTS.flatMap(testSet => testSet.questions), ...WORD_CHALLENGE].map(question => question.id)).size, 50)
  for (const testSet of MOCK_TESTS) {
    assert.equal(testSet.questions.filter(question => question.group === 'Übersetze').length, 5)
    assert.equal(testSet.questions.filter(question => question.group === 'Complete the sentence').length, 4)
    assert.equal(testSet.questions.filter(question => question.group === 'Past tense').length, 1)
    for (const question of testSet.questions) {
      assert.ok(question.prompt && question.answer && question.explain)
      assert.equal(isTypedAnswerCorrect(question, question.answer), true)
      assert.equal(isTypedAnswerCorrect(question, `${question.answer}x`), false)
    }
  }
  assert.equal(WORD_CHALLENGE.filter(question => question.skill === 'Schreibweise').length, 15)
  assert.equal(WORD_CHALLENGE.filter(question => question.skill === 'Bedeutung').length, 15)
  for (const question of WORD_CHALLENGE) {
    assert.equal(question.options.length, 4, question.id)
    assert.equal(new Set(question.options.map(option => option.toLowerCase())).size, 4, question.id)
    assert.ok(Number.isInteger(question.correct) && question.correct >= 0 && question.correct < 4, question.id)
    assert.ok(question.prompt && question.explain && question.options[question.correct], question.id)
  }
})

test('written answers ignore accidental whitespace and case, but check spelling', () => {
  const question = MOCK_TESTS[0].questions[4]
  assert.equal(isTypedAnswerCorrect(question, ' Cathedral '), true)
  assert.equal(isTypedAnswerCorrect(question, 'cathedrale'), false)
})
