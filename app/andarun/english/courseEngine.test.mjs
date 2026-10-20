import assert from 'node:assert/strict'
import * as content from './courseContent.js'
import * as engine from './courseEngine.js'
const { courseLessons, courseUnits, courseQuestionBank, courseQuestionMap } = content
const { emptyCourseState, startCourseSession, studyLesson, answerCourseQuestion, advanceCourseSession, isLessonUnlocked, checkpointUnlocked, nextCourseStep, getSessionResult, getDueQuestions, recordCard, readCourseState, optionOrder } = engine
let clock = Date.now()
assert.equal(courseLessons.length, 18)
assert.equal(courseQuestionBank.length, 360)
assert.equal(new Set(courseQuestionBank.map(q => q.id)).size, 360)
for (const lesson of courseLessons) {
  assert.equal(lesson.questions.length, 20)
  assert.deepEqual(['grammar', 'sentence', 'vocabulary'].map(skill => lesson.questions.filter(q => q.skill === skill).length), [6, 6, 8])
  assert.equal(lesson.words.length, 4)
  for (const q of lesson.questions) {
    assert.equal(q.options.length, 4, q.id)
    assert.equal(new Set(q.options.map(s => s.trim().toLowerCase())).size, 4, q.id)
    assert(q.options.every(s => typeof s === 'string' && s.length > 0), q.id)
    assert(q.explanation.length > 20, q.id)
    assert.equal(q.lessonId, lesson.id)
  }
}
console.log('PASS: 18 complete lessons, 360 unique questions, four distinct choices, skill balance, glossary and explanations')
let state = emptyCourseState()
assert.equal(startCourseSession(state, { type: 'lesson', targetId: 'be' }), state)
assert(!isLessonUnlocked(state, 'habits'))
state = studyLesson(state, 'be', clock++)
state = startCourseSession(state, { type: 'lesson', targetId: 'be', id: 'first', now: clock++ })
const orders = state.session.base.map(id => optionOrder(courseQuestionMap[id], { ...state.session, index: state.session.base.indexOf(id) }).indexOf(0))
assert(new Set(orders).size >= 3)
const initialQuestion = state.session.queue[0]
state = answerCourseQuestion(state, 1, clock++)
assert.equal(state.cards[initialQuestion].attempts, 1)
assert.equal(state.session.queue.indexOf(initialQuestion, 1), 4)
assert.equal(answerCourseQuestion(state, 0, clock++), state)
const recovered = readCourseState(JSON.parse(JSON.stringify(state)))
assert.deepEqual(recovered.session, state.session)
assert.equal(answerCourseQuestion(recovered, 0, clock++), recovered)
console.log('PASS: lesson prerequisites, study gate, shuffled choices, spaced correction and reload without double grading')
function finish(input, wrong = new Set()) {
  let result = input
  let safety = 0
  while (result.session.status === 'active') {
    assert(safety++ < 100)
    const session = result.session
    if (!session.feedback) {
      const id = session.queue[session.index]
      const first = !(id in session.firstAnswers)
      result = answerCourseQuestion(result, first && wrong.has(id) ? 1 : 0, clock++)
    }
    result = advanceCourseSession(result, clock++)
  }
  return result
}
state = finish(state)
assert.equal(getSessionResult(state.session).percent, 95)
assert(isLessonUnlocked(state, 'habits'))
assert.equal(state.cards[initialQuestion].box, 0)
assert.equal(state.cards[initialQuestion].correct, 1)
assert.equal(state.history.length, 1)
assert.equal(advanceCourseSession(state), state)
let weak = studyLesson(emptyCourseState(), 'be', clock++)
weak = startCourseSession(weak, { type: 'lesson', targetId: 'be', id: 'weak', now: clock++ })
const wrongGrammar = new Set(courseLessons[0].questions.filter(q => q.skill === 'grammar').slice(0, 3).map(q => q.id))
weak = finish(weak, wrongGrammar)
assert.equal(getSessionResult(weak.session).percent, 85)
assert(!getSessionResult(weak.session).passed)
assert(!isLessonUnlocked(weak, 'habits'))
assert.equal(weak.session.base.length, 20)
assert(weak.session.queue.length <= 40)
console.log('PASS: corrections do not inflate first-attempt scores; a weak individual skill blocks progression even at 85% overall')
let card = recordCard(undefined, false, 1000000)
assert.equal(card.due, 1600000)
card = recordCard(card, true, 1000100)
assert.equal(card.box, 0)
assert.equal(card.due, 1600000)
card = recordCard(card, true, 1600000)
assert.equal(card.box, 1)
assert.equal(card.due, 1600000 + 86400000)
const dueBeforeExtra = card.due
card = recordCard(card, true, 1600100)
assert.equal(card.box, 1)
assert.equal(card.due, dueBeforeExtra)
card = recordCard(card, true, card.due)
assert.equal(card.box, 2)
card = recordCard(card, false, card.due)
assert.equal(card.box, 0)
assert.equal(getDueQuestions({ ...emptyCourseState(), cards: { 'be-g1': card } }, card.due - 1).length, 0)
assert.equal(getDueQuestions({ ...emptyCourseState(), cards: { 'be-g1': card } }, card.due - 1, true).length, 1)
console.log('PASS: 10-minute recovery, due-time promotion, no early promotion, reset on error and mistakes-only practice')
let all = emptyCourseState()
for (const unit of courseUnits) {
  for (const lesson of courseLessons.filter(l => l.unit === unit.id)) {
    assert(isLessonUnlocked(all, lesson.id), lesson.id)
    all = studyLesson(all, lesson.id, clock++)
    all = startCourseSession(all, { type: 'lesson', targetId: lesson.id, id: `full-${lesson.id}`, now: clock++ })
    all = finish(all)
    assert(all.lessons[lesson.id].passedAt, lesson.id)
  }
  assert(checkpointUnlocked(all, unit.id))
  const following = courseLessons.find(l => l.number === courseLessons.filter(l => l.unit === unit.id).at(-1).number + 1)
  if (following) assert(!isLessonUnlocked(all, following.id))
  all = startCourseSession(all, { type: 'checkpoint', targetId: unit.id, id: `checkpoint-${unit.id}`, now: clock++ })
  assert.equal(all.session.base.length, 18)
  assert.deepEqual(['grammar', 'sentence', 'vocabulary'].map(skill => all.session.base.filter(id => courseQuestionMap[id].skill === skill).length), [6, 6, 6])
  all = finish(all)
  assert(all.checkpoints[unit.id].passedAt)
  if (following) assert(isLessonUnlocked(all, following.id))
}
assert.deepEqual(nextCourseStep(all), { type: 'review', id: null })
assert.equal(Object.values(all.lessons).filter(l => l.passedAt).length, 18)
assert.equal(Object.values(all.checkpoints).filter(l => l.passedAt).length, 6)
const reviewNow = clock + 86400000 * 40
all = startCourseSession(all, { type: 'review', id: 'review', now: reviewNow })
assert.equal(all.session.base.length, 20)
assert(all.session.base.every(id => all.cards[id].due <= reviewNow))
const clean = readCourseState({ version: 1, cards: { 'be-g1': { box: -1, due: NaN } }, session: { type: 'lesson', id: 'invalid', base: ['unknown'], queue: ['unknown'], index: 999 }, lessons: { be: { passedAt: -1, rounds: -3 } } })
assert.equal(clean.session, null)
assert.equal(clean.lessons.be.passedAt, null)
assert.deepEqual(clean.cards, {})
console.log('PASS: all 18 lessons + six checkpoints complete without a progression dead-end; review cap and damaged-state recovery')
