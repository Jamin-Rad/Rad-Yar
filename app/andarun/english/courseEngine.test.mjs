import test from 'node:test'
import assert from 'node:assert/strict'
import { questions, lesson, categories } from './courseContent.js'
import { emptyState, readState, startSession, currentQuestion, optionOrder, answer, advance, result, DAY } from './courseEngine.js'

test('B1 pilot has a complete text, ten expressions and 20 paired four-choice questions', () => {
  const words = lesson.paragraphs.join(' ').replaceAll('**','').split(/\s+/).length
  assert(words >= 180 && words <= 250, words)
  assert.equal(lesson.words.length, 10)
  assert.equal(questions.length, 20)
  assert.equal(new Set(questions.map(q => q.id)).size, 20)
  for (const key of Object.keys(categories)) assert.equal(questions.filter(q => q.category === key).length, 5)
  for (const q of questions) {
    assert.equal(q.variants.length, 2)
    assert.notEqual(q.variants[0].prompt, q.variants[1].prompt)
    for (const variant of q.variants) {
      assert.equal(variant.options.length, 4)
      assert.equal(new Set(variant.options).size, 4)
      assert(variant.options[variant.answer])
      assert(variant.explanation.length > 35)
    }
  }
})

test('test locks first answer, resumes feedback, scores once and persists result', () => {
  let s = startSession(emptyState(), 'test', 1000)
  assert.equal(advance(s), s)
  const first = currentQuestion(s.session)
  s = answer(s, 1, 1001)
  assert.equal(answer(s, 0), s)
  assert.equal(s.mistakes[first.id].streak, 0)
  s = readState(JSON.parse(JSON.stringify(s)))
  assert.equal(s.session.answers[first.id], 1)
  s = advance(s, 1002)
  while (currentQuestion(s.session)) s = advance(answer(s, 0, 1003), 1004)
  assert.equal(result(s.session).correct, 19)
  assert.equal(result(s.session).total, 20)
  assert.equal(s.history.length, 1)
  assert.equal(advance(s), s)
  assert.equal(s.history.length, 1)
  assert.equal(readState(JSON.parse(JSON.stringify(s))).session.index, 20)
  const orders = Array.from({length:20}, (_, index) => optionOrder({...s.session,index}).indexOf(0))
  assert(new Set(orders).size >= 3)
})

test('review uses transfer questions; premature practice cannot graduate a mistake', () => {
  let s = startSession(emptyState(), 'test', 1000)
  const first = currentQuestion(s.session)
  s = answer(s, 1, 1001)
  s = startSession(s, 'review', 1002)
  assert.notEqual(currentQuestion(s.session).prompt, first.prompt)
  s = answer(s, 0, 1003)
  assert.equal(s.mistakes[first.id].streak, 1)
  assert.equal(s.mistakes[first.id].due, 1003 + DAY)
  s = advance(s, 1004)
  s = answer(startSession(s, 'review', 2000), 0, 2001)
  assert.equal(s.mistakes[first.id].streak, 1)
  s = answer(startSession(s, 'review', DAY + 2000), 0, DAY + 2001)
  assert.equal(s.mistakes[first.id], undefined)
  const noMistakes = {...s,mistakes:{}}
  assert.equal(startSession(noMistakes,'review'),noMistakes)
})

test('invalid storage recovers safely without losing valid mistake records', () => {
  assert.deepEqual(readState(null), emptyState())
  assert.deepEqual(readState({version:99}), emptyState())
  const s = startSession(emptyState(),'test',100)
  const invalid = {...s, session:{...s.session,index:10}}
  assert.equal(readState(invalid).session, null)
  assert.equal(readState({...s,session:{...s.session,ids:['unknown']}}).session,null)
  assert.deepEqual(readState({version:1,mistakes:{q1:{due:5,streak:1},q2:{due:-1,streak:1}}}).mistakes,{q1:{due:5,streak:1}})
})

test('wrong review resets delayed streak and retest never counts as delayed mastery', () => {
  let s={...emptyState(),mistakes:{q1:{due:5000,streak:1}}}
  s=answer(startSession(s,'review',6000),1,6001)
  assert.deepEqual(s.mistakes.q1,{due:6001,streak:0})
  s=answer(startSession(s,'test',7000),0,7001)
  assert.equal(s.mistakes.q1.streak,0)
})
