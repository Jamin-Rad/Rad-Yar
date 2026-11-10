import assert from 'node:assert/strict'
import test from 'node:test'
import { canOpenEnglishMode, challengeAnswered, challengeComplete } from './mobinEnglishProgress.js'

test('30 word questions must be completed before mock exams open', () => {
  const empty = {}
  const partial = { 'word-challenge': { run: { results: Array(12).fill({ correct: true }) } } }
  const completed = { 'word-challenge': { completed: true, total: 30, last: 21 } }
  assert.equal(challengeAnswered(empty), 0)
  assert.equal(challengeAnswered(partial), 12)
  assert.equal(canOpenEnglishMode('word-challenge', partial), true)
  assert.equal(canOpenEnglishMode('probe-a', partial), false)
  assert.equal(canOpenEnglishMode('probe-b', completed), true)
  assert.equal(challengeComplete(completed), true)
})

test('earlier completed 30-question rounds remain unlocked', () => {
  const legacy = { 'word-challenge': { total: 30, date: '2026-11-10T14:00:00Z' } }
  assert.equal(challengeComplete(legacy), true)
  assert.equal(challengeAnswered(legacy), 30)
  assert.equal(canOpenEnglishMode('probe-a', legacy), true)
  const legacyAfterReview = { 'word-challenge': { total: 6, date: '2026-11-10T15:00:00Z' } }
  assert.equal(challengeComplete(legacyAfterReview), true)
})
