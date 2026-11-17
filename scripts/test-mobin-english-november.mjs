import test from 'node:test'
import assert from 'node:assert/strict'
import { NOVEMBER_MODES, NOVEMBER_WORDS } from '../lib/mobinEnglishNovember.js'
import { isTypedAnswerCorrect, MOCK_TESTS } from '../lib/mobinEnglish.js'
import { normalizeEnglishHistory, mergeEnglishHistory } from '../lib/mobinEnglishSync.js'

const spelling = NOVEMBER_MODES.find(m => m.id === 'nov18-spelling')
const run = (results = [], extra = {}) => ({ id: 'same-run', startedAt: '2026-11-17T10:00:00.000Z', index: results.length, results, ...extra })
const history = r => ({ [spelling.id]: { run: r, updatedAt: '2026-11-17T11:00:00.000Z' } })

test('all supplied vocabulary entries have a meaning and a spelling task', () => {
  assert.equal(NOVEMBER_WORDS.length, 43)
  for (const mode of NOVEMBER_MODES) {
    assert.equal(new Set(mode.questions.map(q => q.id)).size, mode.questions.length)
    for (const q of mode.questions) {
      assert.ok(isTypedAnswerCorrect(q, q.answer), q.id)
      if (q.options) assert.equal(q.options.filter(v => v === q.answer).length, 1)
    }
  }
  assert.equal(spelling.questions.length, NOVEMBER_WORDS.length)
  assert.equal(NOVEMBER_MODES.find(m => m.id === 'nov18-meaning').questions.length, NOVEMBER_WORDS.length)
  const tests = NOVEMBER_MODES.filter(m => m.kind === 'test' && !m.id.startsWith('nov18-quick-'))
  assert.equal(tests.length, 2)
  for (const mode of tests) {
    assert.equal(mode.questions.length, 20)
    assert.equal(mode.questions.filter(q => q.group === 'Grammatik').length, 10)
    assert.ok(mode.questions.every(q => !q.options))
  }
})

test('spelling is strict, with explicit textbook alternatives', () => {
  for (const [answer, typo] of [['passenger', 'pasenger'], ['access', 'acces'], ['harbour', 'harbor'], ['cathedral', 'cathedrel']]) {
    assert.equal(isTypedAnswerCorrect({ answer }, typo), false)
  }
  assert.ok(isTypedAnswerCorrect(spelling.questions.find(q => q.answer === 'cab'), 'taxi'))
  assert.ok(isTypedAnswerCorrect({ answer: "she isn't" }, 'she isn’t'))
  assert.ok(isTypedAnswerCorrect({ answer: 'Are you going to come?', sentence: true }, 'Are you going to come'))
})

test('server regrades answers and preserves partial drafts across devices', () => {
  const q = spelling.questions[0]
  const a = normalizeEnglishHistory(history(run([{ id: q.id, chosen: 'wrong', correct: true }], { draft: 'brid' })))
  assert.equal(a[spelling.id].run.results[0].correct, false)
  assert.equal(a[spelling.id].run.draft, 'brid')
  const stale = history(run([], { draft: 'old' }))
  const merged = mergeEnglishHistory(a, stale)
  assert.equal(merged[spelling.id].run.results.length, 1)
  assert.equal(merged[spelling.id].run.draft, 'brid')
})

test('mistake-only review retains stable source order and correct results', () => {
  const q = spelling.questions[5]
  const normalized = normalizeEnglishHistory(history(run([{ id: q.id, chosen: q.answer }], { reviewOnly: true, questionIds: [q.id] })))
  assert.deepEqual(normalized[spelling.id].run.questionIds, [q.id])
  assert.equal(normalized[spelling.id].run.results[0].correct, true)
})

test('old November 11 history survives alongside all new completed modes within API size limit', () => {
  const old = { [MOCK_TESTS[0].id]: { completed: true, best: 7, last: 7, date: '2026-11-11T12:00:00Z' } }
  const all = Object.fromEntries(NOVEMBER_MODES.map(m => [m.id, { run: run(m.questions.map(q => ({ id: q.id, chosen: q.answer }))), completed: true, last: m.questions.length, best: m.questions.length }]))
  const merged = mergeEnglishHistory(old, all)
  assert.equal(merged[MOCK_TESTS[0].id].best, 7)
  assert.ok(JSON.stringify({ state: merged }).length < 60000)
  assert.equal(Object.keys(merged).length, NOVEMBER_MODES.length + 1)
})

test('two quick tests each mix 30 difficult four-option items with one correct answer', () => {
 const tests = NOVEMBER_MODES.filter(m => m.id.startsWith('nov18-quick-'))
 assert.equal(tests.length, 2)
 for (const t of tests) {
  assert.equal(t.questions.length,30)
  assert.equal(t.questions.filter(q=>q.group==='Grammatik').length,15)
  assert.equal(t.questions.filter(q=>q.group==='Rechtschreibung').length,10)
  for(const q of t.questions){assert.equal(new Set(q.options).size,4);assert.equal(q.options.filter(o=>isTypedAnswerCorrect(q,o)).length,1)}
  const normalized=normalizeEnglishHistory({[t.id]:{run:run(t.questions.map(q=>({id:q.id,chosen:q.answer})))}})
  assert.equal(normalized[t.id].run.results.filter(r=>r.correct).length,30)
 }
})
