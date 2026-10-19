import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { BONE_INFARCT_COPY, BONE_INFARCT_CHAPTERS, BONE_INFARCT_CHECK, BONE_INFARCT_QUESTIONS, BONE_INFARCT_FLASHCARDS, BONE_INFARCT_PATH } from '../data/knocheninfarktLesson.js'
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
[BONE_INFARCT_COPY, BONE_INFARCT_CHAPTERS, BONE_INFARCT_CHECK, BONE_INFARCT_FLASHCARDS].forEach(walk)
const topics = CURRICULUM.flatMap(fach => fach.kapitel.flatMap(chapter => chapter.themen))
const topic = topics.find(item => item.id === 'knocheninfarkt')
assert.equal(topic.link, BONE_INFARCT_PATH)
assert.equal(topic.inProgress, true)
assert.equal(getLessonStatus(BONE_INFARCT_PATH), 'in_progress')
assert.equal(getLessonLinkForFlashcard('/flashcards/knocheninfarkt'), BONE_INFARCT_PATH)
assert.ok(MCQ_TOPIC_GROUPS.some(group => group.fachId === 'msk' && group.topics.some(item => item.id === 'knocheninfarkt')))
assert.equal(countQuestions(['knocheninfarkt']), 3)
const deIds = BONE_INFARCT_QUESTIONS.de.map(q => q.id)
for (const lang of langs) {
  const actual = QUESTION_BANK[lang].filter(q => q.tags.includes('knocheninfarkt'))
  assert.equal(actual.length, 3)
  assert.deepEqual(getQuestionsForIds(deIds, lang).map(q => q.id), actual.map(q => q.id))
  actual.forEach(question => {
    assert.equal(question.options.length, 4)
    assert.ok(question.options.some(option => option.id === question.correct))
    assert.deepEqual(Object.keys(question.wrongExplanations).sort(), question.options.map(option => option.id).filter(id => id !== question.correct).sort())
    assert.ok(question.source)
  })
}
assert.equal(FLASHCARDS.filter(card => card.topicId === 'knocheninfarkt').length, 3)
assert.ok(getFlashcardTopic('knocheninfarkt'))
assert.equal(BONE_INFARCT_CHECK.correct, 1)
assert.equal(BONE_INFARCT_CHECK.feedback.length, BONE_INFARCT_CHECK.options.length)
const jsx = await readFile('app/msk/knochennekrosen/knocheninfarkt/page.js', 'utf8')
require('esbuild').transformSync(jsx, { loader: 'jsx', format: 'esm' })
const provenance = JSON.parse(await readFile('public/educational/knocheninfarkt/provenance.json', 'utf8'))
assert.equal(provenance.pdfPage, 123)
for (const image of provenance.images) assert.ok((await readFile(`public/educational/knocheninfarkt/${image.file}`)).length > 5000)
for (const lang of langs) {
  const localized = BONE_INFARCT_PATH + (lang === 'de' ? '' : `?lang=${lang}`)
  const quiz = new URL(`https://example.invalid${topic.mcqLink}&from=${encodeURIComponent(localized)}${lang === 'de' ? '' : `&lang=${lang}`}`)
  assert.equal(quiz.searchParams.get('themen'), 'knocheninfarkt')
  assert.equal(quiz.searchParams.get('from'), localized)
  assert.equal(quiz.searchParams.get('lang') || 'de', lang)
}
console.log(`Knocheninfarkt scoped checks passed: ${semanticUnits} localized semantic units present; exact curriculum/status, 9 MCQs with option feedback, 3 cards, language-ID mapping, assets and JSX syntax. Browser/clinical equivalence not established by this check.`)
