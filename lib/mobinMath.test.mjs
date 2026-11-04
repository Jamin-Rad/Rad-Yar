import test from 'node:test'
import assert from 'node:assert/strict'
import { MATH_EXAM_COLLECTIONS, MATH_QUESTIONS, MATH_TOPICS } from '../data/mobinMathExam.js'
import { addMathStudyTime, berlinStudyDay, createMathSession, emptyMathProgress, equalRationals, finishMathSession, gradeMathResponse, mergeMathProgress, normalizeMathProgress, parseRational, recordMathResponse, sessionStudySeconds, summarizeMathProgress } from './mobinMath.js'

const at = '2026-11-01T18:00:00.000Z'
const later = '2026-11-01T18:01:00.000Z'
const q = id => MATH_QUESTIONS.find(question => question.id === id)
const answerFor = question => question.type === 'choice' ? question.options.find(option => equalRationals(option.value, question.answer)).id : question.answer
function stateWithSession(mode = 'practice', ids = ['m6-01'], id = 's1') {
  return { ...emptyMathProgress(), sessions: { [id]: createMathSession(id, mode, ids, at) } }
}
const number = text => {
  const normalized = text.replace(',', '.')
  if (normalized.includes('/')) { const [a, b] = normalized.split('/').map(Number); return a / b }
  return Number(normalized)
}

test('all 14 photographed topics have exactly one medium and one hard original question', () => {
  const original = MATH_QUESTIONS.slice(0, 28)
  assert.equal(original.length, 28)
  assert.equal(new Set(original.map(item => item.id)).size, 28)
  assert.equal(MATH_TOPICS.length, 14)
  assert.deepEqual(MATH_TOPICS.map(topic => topic.page), [6, 10, 13, 16, 19, 22, 25, 28, 36, 40, 43, 47, 50, 53])
  for (const topic of MATH_TOPICS) {
    const items = original.filter(item => item.topicId === topic.id)
    assert.deepEqual(items.map(item => item.difficulty), ['medium', 'hard'])
    for (const item of items) {
      assert.ok(item.prompt && item.hint && item.steps.length >= 3)
      assert.ok(gradeMathResponse(item, answerFor(item)).correct, `${item.id}: canonical answer must pass`)
    }
  }
})

test('all 28 answer keys agree with independently calculated mathematical results', () => {
  const expected = [
    120 / 8 * 3 / 5 * 2, 9 / (1 - 5 / 12 - 1 / 3), 252 / 378, 42 / 70 * 45,
    2 / 8 * 7, 2 / 3 + (7 / 6 - 2 / 3) / 5 * 2, 9 / 16, 3 / 5 - 7 / 12,
    Math.max(7 / 12, 5 / 8, 11 / 18, 3 / 5), (5 / 6 + 7 / 8) / 2, 13 / 16, .375,
    Math.min(2.305, 2.35, 2.035, 2.053), (4.079 + 4.08) / 2, 2.075 * 100, 2.4 * 60,
    5 / 12 + 7 / 18 - 1 / 9, 7 / 10 - 4 / 15 - 1 / 6, -7 / 12 + 5 / 18,
    -5 / 6 - (-3 / 4) + (-7 / 12), -3.75 + 8.06 - 2.895, 12.50 - 18.75 + 7.90 - 4.65,
    17.35 - (6.48 + 7.35), -11 / 12 + (5 / 8 - 1 / 12) - (-3 / 8), Math.round(6.7496 * 100) / 100,
    Math.round(19.49) + Math.round(8.49) - Math.round(3.51), 3.25 - 85 / 100 + .6,
    (4 - .875 - 1.68 - .75) * 1000,
  ]
  for (const [index, question] of MATH_QUESTIONS.slice(0, 28).entries()) assert.ok(Math.abs(number(question.answer) - expected[index]) < 1e-10, `${question.id}: mathematical key mismatch`)
})

test('20 new exam questions cover every topic, with independent answers and stable collection IDs', () => {
  assert.equal(MATH_QUESTIONS.length, 48)
  assert.equal(new Set(MATH_QUESTIONS.map(item => item.id)).size, 48)
  const added = MATH_QUESTIONS.slice(28)
  assert.deepEqual(added.map(item => item.id), Array.from({ length: 20 }, (_, index) => `m6-${index + 29}`))
  assert.equal(new Set(added.map(item => item.topicId)).size, 14)
  assert.equal(added.filter(item => item.difficulty === 'hard').length, 14)
  const expected = [
    (144 - 144 * 5 / 12) * (1 - 3 / 7), 84 / 126 * 45, -.5 + (.75 - (-.5)) / 10 * 7,
    13.5 / 18, [7 / 8, 11 / 12, 13 / 15, 17 / 20].sort((a, b) => Math.abs(b - 1) - Math.abs(a - 1))[0],
    .0625, (3.008 + 3.08) / 2, 1.375 * 60, 7 / 8 - (1 / 6 + 5 / 12), -3 / 4 - (-5 / 6) - 7 / 12,
    -4.875 + 2.09 - (-1.785), 15.72 - (4.85 - 2.28) - 7.15, 1000 / 100,
    2 * 1000 - (185 + 3 * 425), 30 * 3 / 5 * 2 / 3, 168 / (120 / 5), 84 / (1 - 5 / 12 - 7 / 18),
    -11 / 4 + 5 / 6 - 7 / 12, 50 - 12.85 - 8.90 + 3.75 - 16.48, (65 + 34 - 20) / 10,
  ]
  for (const [index, item] of added.entries()) {
    assert.ok(Math.abs(number(item.answer) - expected[index]) < 1e-10, item.id)
    assert.ok(item.prompt && item.hint && item.steps.length >= 3, item.id)
    assert.ok(gradeMathResponse(item, answerFor(item)).correct, item.id)
  }
  assert.deepEqual(MATH_EXAM_COLLECTIONS.map(item => [item.id, item.questionIds.length]), [['new', 20], ['all', 48], ['original', 28]])
  assert.deepEqual(MATH_EXAM_COLLECTIONS[0].questionIds, added.map(item => item.id))
  assert.deepEqual(MATH_EXAM_COLLECTIONS[2].questionIds, MATH_QUESTIONS.slice(0, 28).map(item => item.id))
  assert.equal(gradeMathResponse(q('m6-31'), '6/16').correct, false)
  assert.equal(gradeMathResponse(q('m6-36'), '82,5').correct, true)
  assert.match(gradeMathResponse(q('m6-48'), '8').explanation, /vor der Rechnung/)
})

test('each multiple-choice question has exactly one correct option and explanations for all distractors', () => {
  for (const question of MATH_QUESTIONS.filter(item => item.type === 'choice')) {
    assert.equal(question.options.filter(option => Math.abs(number(option.value) - number(question.answer)) < 1e-12).length, 1, question.id)
    assert.equal(question.options.filter(option => gradeMathResponse(question, option.id).correct).length, 1, question.id)
    assert.ok(question.options.every(option => option.explanation.trim()))
  }
})

test('rational grading accepts equivalent fractions, comma, dot, mixed numbers and Unicode minus exactly', () => {
  for (const [a, b] of [['−0,75', '-3/4'], ['6/8', '.75'], ['.5625', '9/16'], ['-1 1/2', '-3/2'], ['۰٫۷۵', '3/4'], ['٣/٤', '0.75'], ['0.10000000000000001', '10000000000000001/100000000000000000']]) assert.ok(equalRationals(a, b), `${a} = ${b}`)
  assert.equal(equalRationals('0.10000000000000001', '0.1'), false)
  for (const value of ['', '1/0', '0/0', '1+1', '1e3', 'Infinity', '3/-4', '1 5/4', null]) assert.equal(parseRational(value), null)
})

test('a request for a fully reduced fraction is enforced without confusing format errors with wrong values', () => {
  assert.equal(gradeMathResponse(q('m6-12'), '3/8').correct, true)
  assert.equal(gradeMathResponse(q('m6-12'), '375/1000').correct, false)
  assert.match(gradeMathResponse(q('m6-12'), '375/1000').explanation, /Zahlenwert stimmt/)
  assert.equal(gradeMathResponse(q('m6-12'), '0,375').correct, false)
  assert.equal(gradeMathResponse(q('m6-07'), '0,5625').correct, true)
  assert.equal(gradeMathResponse(q('m6-19'), '−11/36').correct, true)
  assert.equal(gradeMathResponse(q('m6-07'), '2 + 4').valid, false)
})

test('known misconceptions receive targeted feedback', () => {
  assert.match(gradeMathResponse(q('m6-05'), '7/8').explanation, /gesamte Strecke ist 2/)
  assert.match(gradeMathResponse(q('m6-19'), '11/36').explanation, /Vorzeichen/)
  assert.match(gradeMathResponse(q('m6-28'), '0,695').explanation, /Gramm/)
})

test('submissions are immutable and incomplete sessions cannot finish', () => {
  let state = stateWithSession('practice', ['m6-01', 'm6-02'])
  state = recordMathResponse(state, 's1', 'm6-01', 'A', true, at)
  const duplicate = recordMathResponse(state, 's1', 'm6-01', 'B', false, later)
  assert.equal(duplicate, state)
  assert.equal(finishMathSession(state, 's1'), state)
  assert.equal(recordMathResponse(state, 's1', 'm6-02', 'invalid'), state)
  state = recordMathResponse(state, 's1', 'm6-02', '36', false, later)
  state = finishMathSession(state, 's1', later)
  assert.equal(state.sessions.s1.finishedAt, later)
})

test('an unfinished exam reveals neither accuracy nor mistakes in the overview', () => {
  let state = stateWithSession('exam', ['m6-01', 'm6-02'])
  state = recordMathResponse(state, 's1', 'm6-01', 'A', false, at)
  assert.equal(summarizeMathProgress(state).attempted, 0)
  assert.deepEqual(summarizeMathProgress(state).reviewIds, [])
  state = recordMathResponse(state, 's1', 'm6-02', '36', false, later)
  state = finishMathSession(state, 's1', later)
  assert.equal(summarizeMathProgress(state).attempted, 2)
  assert.equal(summarizeMathProgress(state).correct, 1)
  assert.deepEqual(summarizeMathProgress(state).reviewIds, ['m6-01'])
})

test('correct review clears the error queue but retains the first attempt and history', () => {
  let state = stateWithSession()
  state = recordMathResponse(state, 's1', 'm6-01', 'A', false, at)
  state.sessions.s2 = createMathSession('s2', 'review', ['m6-01'], later)
  state = recordMathResponse(state, 's2', 'm6-01', 'B', false, later)
  const summary = summarizeMathProgress(state)
  assert.equal(summary.firstCorrect, 0)
  assert.equal(summary.correct, 1)
  assert.equal(summary.attempts.length, 2)
  assert.deepEqual(summary.reviewIds, [])
  state.bookmarks['m6-01'] = { active: true, at: later }
  assert.deepEqual(summarizeMathProgress(state).reviewIds, ['m6-01'])
})

test('cloud merging retains both devices, first submissions, completed results and cleared bookmarks', () => {
  let local = stateWithSession('practice', ['m6-01', 'm6-02'])
  local = recordMathResponse(local, 's1', 'm6-01', 'A', false, at)
  local.bookmarks['m6-01'] = { active: false, at: later }
  let remote = stateWithSession('practice', ['m6-01', 'm6-02'])
  remote = recordMathResponse(remote, 's1', 'm6-01', 'B', false, later)
  remote = recordMathResponse(remote, 's1', 'm6-02', '36', false, later)
  remote = finishMathSession(remote, 's1', later)
  remote.sessions.s2 = createMathSession('s2', 'exam', ['m6-03'], at)
  remote.bookmarks['m6-01'] = { active: true, at }
  const merged = mergeMathProgress(local, remote)
  assert.equal(Object.keys(merged.sessions).length, 2)
  assert.equal(merged.sessions.s1.responses['m6-01'].value, 'A')
  assert.equal(merged.sessions.s1.responses['m6-02'].value, '36')
  assert.equal(merged.sessions.s1.finishedAt, later)
  assert.equal(merged.bookmarks['m6-01'].active, false)
  assert.deepEqual(mergeMathProgress(merged, merged), merged)
  assert.deepEqual(mergeMathProgress(remote, local), merged)
})

test('corrupt persisted state, forged correctness flags and unfinished completion flags are rejected', () => {
  assert.deepEqual(normalizeMathProgress(null), emptyMathProgress())
  const state = stateWithSession('exam', ['m6-01', 'm6-02'])
  state.sessions.s1.responses['m6-01'] = { value: 'A', correct: true, at }
  state.sessions.s1.responses.unknown = { value: 'A', at }
  state.sessions.s1.finishedAt = later
  const normalized = normalizeMathProgress(state)
  assert.equal(normalized.sessions.s1.finishedAt, null)
  assert.deepEqual(Object.keys(normalized.sessions.s1.responses), ['m6-01'])
  assert.equal('correct' in normalized.sessions.s1.responses['m6-01'], false)
})

test('study time is counted once across sync, attributed to Berlin days, and stops after completion', () => {
  let state = stateWithSession()
  state = addMathStudyTime(state, 's1', 8, new Date('2026-11-01T23:30:00Z'))
  assert.equal(berlinStudyDay(new Date('2026-11-01T23:30:00Z')), '2026-11-02')
  assert.equal(state.sessions.s1.studyDays['2026-11-02'], 8)
  const merged = mergeMathProgress(state, state)
  assert.equal(sessionStudySeconds(merged.sessions.s1), 8)
  state = recordMathResponse(state, 's1', 'm6-01', 'B', false, later)
  state = finishMathSession(state, 's1', later)
  assert.equal(addMathStudyTime(state, 's1', 5), state)
})
