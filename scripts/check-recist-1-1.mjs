import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { RECIST_COPY, RECIST_CHAPTERS, RECIST_CHECK, RECIST_QUESTIONS, RECIST_FLASHCARDS, RECIST_FLASHCARD_TOPIC, RECIST_PATH } from '../data/recist11Lesson.js'
import { CURRICULUM, getLessonLinkForFlashcard } from '../data/curriculum.js'
import { QUESTION_BANK, MCQ_TOPIC_GROUPS, getQuestionsForIds, countQuestions } from '../data/questions.js'
import { FLASHCARDS, getFlashcardTopic } from '../data/flashcards.js'
import { getLessonStatus } from '../data/lessonStatus.js'

const require = createRequire(import.meta.url)
const langs = ['de', 'en', 'fa']
let semanticUnits = 0
function walk(value) {
  if (Array.isArray(value)) return value.forEach(walk)
  if (!value || typeof value !== 'object') return
  if ('de' in value || 'en' in value || 'fa' in value) {
    langs.forEach(lang => assert.ok(typeof value[lang] === 'string' && value[lang].trim(), `Missing ${lang} text`))
    semanticUnits++
  } else Object.values(value).forEach(walk)
}
[RECIST_COPY, RECIST_CHAPTERS, RECIST_CHECK, RECIST_FLASHCARDS].forEach(walk)
const topics = CURRICULUM.flatMap(fach => fach.kapitel.flatMap(chapter => chapter.themen))
const topic = topics.find(item => item.id === 'recist-1-1')
assert.equal(topic.link, RECIST_PATH)
assert.equal(topic.inProgress, true)
assert.equal(getLessonStatus(RECIST_PATH), 'in_progress')
assert.equal(getLessonLinkForFlashcard('/flashcards/recist-1-1'), RECIST_PATH)
assert.ok(MCQ_TOPIC_GROUPS.some(group => group.fachId === 'technik' && group.topics.some(item => item.id === 'recist-1-1')))
const tumorGroups = MCQ_TOPIC_GROUPS.filter(group => group.fachId === 'technik' && group.kapitelId === 'technik-onkologie')
assert.equal(tumorGroups.length, 1, 'one setup group for oncology chapter')
assert.ok(tumorGroups[0].topics.some(topic => topic.id === 'recist-1-1'))
assert.equal(countQuestions(['recist-1-1']), 3)
const deIds = RECIST_QUESTIONS.de.map(q => q.id)
for (const lang of langs) {
  const actual = QUESTION_BANK[lang].filter(q => q.tags.includes('recist-1-1'))
  assert.equal(actual.length, 3)
  assert.deepEqual(getQuestionsForIds(deIds, lang).map(q => q.id), actual.map(q => q.id))
  actual.forEach(question => {
    assert.equal(question.options.length, 4)
    assert.ok(question.options.some(option => option.id === question.correct))
    assert.deepEqual(Object.keys(question.wrongExplanations).sort(), question.options.map(option => option.id).filter(id => id !== question.correct).sort())
    assert.ok(question.source)
  })
}
assert.equal(FLASHCARDS.filter(card => card.topicId === 'recist-1-1').length, 3)
assert.ok(getFlashcardTopic('recist-1-1'))
assert.equal(RECIST_CHECK.correct, 2)
assert.equal(RECIST_CHECK.feedback.length, RECIST_CHECK.options.length)
const jsx = await readFile('app/technik/onkologie/recist-1-1/page.js', 'utf8')
require('esbuild').transformSync(jsx, { loader: 'jsx', format: 'esm' })
const provenance = JSON.parse(await readFile('public/educational/recist-1-1-schematic.provenance.json', 'utf8'))
assert.equal(provenance.lessonId, 'recist-1-1')
assert.ok((await readFile('public/educational/recist-1-1-schematic.svg', 'utf8')).includes('<svg'))
for (const lang of langs) {
  const localized = RECIST_PATH + (lang === 'de' ? '' : `?lang=${lang}`)
  const quiz = new URL(`https://example.invalid${topic.mcqLink}&from=${encodeURIComponent(localized)}${lang === 'de' ? '' : `&lang=${lang}`}`)
  assert.equal(quiz.searchParams.get('themen'), 'recist-1-1')
  assert.equal(quiz.searchParams.get('from'), localized)
  assert.equal(quiz.searchParams.get('lang') || 'de', lang)
}
console.log(`RECIST scoped checks passed: ${semanticUnits} localized semantic units present; exact curriculum/status, 9 MCQs with option feedback, 3 cards, language-ID mapping, assets and JSX syntax. Browser/clinical equivalence not established by this check.`)

assert.equal((61-50)/50*100,22)
assert.equal(61-50,11)
assert.equal(24-20,4)
assert.equal(RECIST_QUESTIONS.en[1].correct,'A')

assert.match(RECIST_FLASHCARD_TOPIC.color, /^#[0-9a-f]{6}$/i)
