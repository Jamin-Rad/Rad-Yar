import assert from 'node:assert/strict'
import { QUESTION_BANK, MCQ_TOPIC_GROUPS } from '../data/questions.js'
import { FLASHCARDS, FLASHCARD_TOPICS } from '../data/flashcards.js'
import { CURRICULUM } from '../data/curriculum.js'
import { SHOULDER_INSTABILITY_LESSON } from '../data/shoulderInstabilityLesson.js'

const topic = 'schulterinstabilitaet'
const lessonRoute = '/msk/schulter/instabilitaet'
for (const lang of ['de', 'en', 'fa']) {
  const questions = QUESTION_BANK[lang].filter(q => q.tags?.includes(topic))
  assert.equal(questions.length, 2, `${lang}: exactly two topic questions`)
  for (const q of questions) {
    assert.equal(q.options.length, 4, `${q.id}: four options`)
    assert.ok(q.options.some(o => o.id === q.correct), `${q.id}: valid answer`)
    for (const option of q.options.filter(option => option.id !== q.correct)) {
      assert.ok(q.wrongExplanations?.[option.id], `${q.id}: distractor ${option.id} has feedback`)
    }
    assert.ok(q.explanation && q.source, `${q.id}: rationale and source`)
  }
}
assert.ok(MCQ_TOPIC_GROUPS.some(group => group.topics?.some(item => item.id === topic)), 'MCQ selector has exact topic ID')
assert.ok(FLASHCARD_TOPICS.some(item => item.id === topic), 'flashcard selector has exact topic ID')
assert.equal(FLASHCARDS.filter(card => card.topicId === topic).length, 3, 'three topic flashcards registered')
const curriculumTopic = CURRICULUM.flatMap(subject => subject.kapitel || subject.chapters || []).flatMap(chapter => chapter.themen || chapter.topics || []).find(item => item.id === topic)
assert.ok(curriculumTopic, 'curriculum topic exists')
assert.equal(curriculumTopic.link, lessonRoute, 'curriculum links to the lesson route')
assert.match(curriculumTopic.mcqLink, /themen=schulterinstabilitaet/, 'curriculum links to exact MCQ topic')
assert.equal(curriculumTopic.flashcardLink, '/flashcards/schulterinstabilitaet', 'curriculum links to exact flashcard topic')
assert.equal(SHOULDER_INSTABILITY_LESSON.check.options.length, 4, 'embedded check has four options')
for (let i = 0; i < SHOULDER_INSTABILITY_LESSON.check.options.length; i += 1) {
  if (i !== SHOULDER_INSTABILITY_LESSON.check.answer) assert.ok(SHOULDER_INSTABILITY_LESSON.check.wrongExplanations[i], `embedded distractor ${i} has specific feedback`)
}
console.log('Shoulder-instability lesson registry checks passed (DE/EN/FA, MCQs, flashcards, curriculum links).')
