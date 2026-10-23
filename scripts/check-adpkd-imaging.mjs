import assert from 'node:assert/strict'
import fs from 'node:fs'
import { ADPKD_COPY, ADPKD_ID, ADPKD_PATH, ADPKD_SECTIONS, ADPKD_SOURCES } from '../data/adpkdImagingLesson.js'
import { ADPKD_FLASHCARDS, ADPKD_FLASHCARD_TOPIC, ADPKD_QUESTIONS, ADPKD_TOPIC_GROUP } from '../data/adpkdImagingAssessments.js'
import { CURRICULUM } from '../data/curriculum.js'
import { QUESTION_BANK, MCQ_TOPIC_GROUPS } from '../data/questions.js'
import { FLASHCARDS, FLASHCARD_TOPICS } from '../data/flashcards.js'

const langs = ['de', 'en', 'fa']
assert.equal(ADPKD_ID, 'adpkd-bildgebung')
assert.equal(ADPKD_PATH, '/abdomen/niere/adpkd')
assert.deepEqual(ADPKD_SECTIONS.map(section => section.id), ['orientation', 'pattern', 'workup', 'take-home'])
for (const [key, item] of Object.entries(ADPKD_COPY)) {
  if (item && typeof item === 'object' && !Array.isArray(item) && langs.some(lang => lang in item)) {
    for (const lang of langs) assert.ok(item[lang], `ADPKD_COPY.${key}.${lang} missing`)
  }
}
assert.ok(ADPKD_SOURCES.some(source => source.href.includes('kdigo.org') && source.href.includes('2025-adpkd')))

const flatCurriculum = Object.values(CURRICULUM).flatMap(fach => (fach.kapitel || []).flatMap(chapter => chapter.themen || []))
const registryTopic = flatCurriculum.find(topic => topic.id === ADPKD_ID)
assert.ok(registryTopic, 'curriculum entry missing')
assert.equal(registryTopic.link, ADPKD_PATH)
assert.equal(registryTopic.inProgress, true)
assert.ok(registryTopic.mcqLink.includes(`themen=${ADPKD_ID}`))
assert.ok(registryTopic.flashcardLink.includes(`/flashcards/${ADPKD_ID}`))
assert.ok(MCQ_TOPIC_GROUPS.some(group => group.topics?.some(topic => topic.id === ADPKD_ID)))
assert.ok(FLASHCARD_TOPICS.some(topic => topic.id === ADPKD_ID))
assert.equal(ADPKD_FLASHCARD_TOPIC.id, ADPKD_ID)

for (const lang of langs) {
  const questions = ADPKD_QUESTIONS[lang]
  assert.equal(questions.length, 2, `${lang}: lesson MCQ count`)
  assert.equal(questions.length, QUESTION_BANK[lang].filter(question => question.tags?.includes(ADPKD_ID)).length, `${lang}: shared MCQ registry`)
  for (const question of questions) {
    assert.equal(question.options.length, 4)
    assert.equal(question.correct, 'A')
    assert.equal(Object.keys(question.wrongExplanations).length, 3)
    for (const option of question.options) assert.ok(option.text.length > 12)
  }
}
assert.equal(ADPKD_TOPIC_GROUP.topics[0].id, ADPKD_ID)
assert.equal(ADPKD_FLASHCARDS.length, 3)
assert.equal(ADPKD_FLASHCARDS.length, FLASHCARDS.filter(card => card.topicId === ADPKD_ID).length)
assert.ok(ADPKD_FLASHCARDS.every(card => langs.every(lang => card.front[lang] && card.answer[lang] && card.explanation[lang])))
assert.ok(fs.existsSync(new URL('../public/educational/adpkd/hero.svg', import.meta.url)))

console.log('ADPKD imaging lesson registries, locales, assessments, and assets are consistent.')
