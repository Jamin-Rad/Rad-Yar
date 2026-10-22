import assert from 'node:assert/strict'
import fs from 'node:fs'
import { QUESTION_BANK, MCQ_TOPIC_GROUPS } from '../data/questions.js'
import { CURRICULUM } from '../data/curriculum.js'
import { getCardsByTopic, getFlashcardTopic } from '../data/flashcards.js'

const lesson = fs.readFileSync('app/thorax/pulmonale-hypertonie/page.jsx', 'utf8')
const topicId = 'pulmonale-hypertonie'
const languages = ['de', 'en', 'fa']
const persianScript = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/
const assertLanguageSlots = (value, id) => {
  for (const lang of languages) {
    assert.ok(value[lang], `${id}: ${lang} field is present`)
    if (lang === 'fa') assert.match(value[lang], persianScript, `${id}: Persian field uses Persian script`)
    else assert.doesNotMatch(value[lang], persianScript, `${id}: ${lang} field has no Persian leakage`)
  }
}
const assertLanguageSlot = (lang, text, id) => {
  assert.ok(text, `${id}: ${lang} field is present`)
  if (lang === 'fa') assert.match(text, persianScript, `${id}: Persian field uses Persian script`)
  else assert.doesNotMatch(text, persianScript, `${id}: ${lang} field has no Persian leakage`)
}

for (const lang of languages) {
  const questions = QUESTION_BANK[lang].filter((question) => question.tags.includes(topicId))
  assert.equal(questions.length, 2, `${lang}: both PH questions registered exactly once`)
  for (const question of questions) {
    assert.equal(question.fach, 'thorax', `${question.id}: thorax registry`)
    assert.equal(question.options.length, 4, `${question.id}: four options`)
    assert.ok(question.options.some((option) => option.id === question.correct), `${question.id}: valid answer`)
    assert.equal(Object.keys(question.wrongExplanations).length, 3, `${question.id}: localized distractor feedback`)
    assert.ok(question.explanation && question.source, `${question.id}: rationale and source`)
    assertLanguageSlot(lang, question.question, `${question.id}: question`)
    assertLanguageSlot(lang, question.explanation, `${question.id}: explanation`)
    for (const option of question.options) assertLanguageSlot(lang, option.text, `${question.id}: option ${option.id}`)
    for (const [optionId, text] of Object.entries(question.wrongExplanations)) assertLanguageSlot(lang, text, `${question.id}: feedback ${optionId}`)
  }
  const cards = getCardsByTopic(topicId)
  assert.equal(cards.length, 2, `${lang}: two cards registered under the exact topic ID`)
  for (const card of cards) {
    assert.ok(card.front[lang] && card.answer[lang] && card.explanation[lang] && card.source, `${card.id}: localized card fields`)
    assertLanguageSlots(card.front, `${card.id}: front`)
    assertLanguageSlots(card.answer, `${card.id}: answer`)
    assertLanguageSlots(card.explanation, `${card.id}: explanation`)
  }
}

const groups = MCQ_TOPIC_GROUPS.flatMap((group) => group.topics || [])
assert.equal(groups.filter((topic) => topic.id === topicId).length, 1, 'exact topic appears once in MCQ navigation')
assert.equal(getFlashcardTopic(topicId)?.href, `/flashcards/${topicId}`, 'flashcard route is registered')

const curriculumTopics = []
const visit = (value) => {
  if (!value || typeof value !== 'object') return
  if (Array.isArray(value)) return value.forEach(visit)
  if (value.id === topicId) curriculumTopics.push(value)
  Object.values(value).forEach(visit)
}
visit(CURRICULUM)
assert.equal(curriculumTopics.length, 1, 'exact curriculum topic appears once')
assert.match(curriculumTopics[0].mcqLink, /themen=pulmonale-hypertonie/)
assert.equal(curriculumTopics[0].flashcardLink, `/flashcards/${topicId}`)
assert.match(lesson, /themen=pulmonale-hypertonie/)
assert.match(lesson, /flashcards\/pulmonale-hypertonie/)
assert.match(lesson, /path\.includes\('\?'\)/, 'locale helper preserves existing exercise query parameters')

console.log('Pulmonary hypertension assessment and retrieval registration passed in DE/EN/FA.')
