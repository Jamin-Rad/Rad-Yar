import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { PCNSL_COPY, PCNSL_CHAPTERS, PCNSL_CHECK, PCNSL_QUESTIONS, PCNSL_FLASHCARDS, PCNSL_PATH } from '../data/pcnslLesson.js'
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
[PCNSL_COPY, PCNSL_CHAPTERS, PCNSL_CHECK, PCNSL_FLASHCARDS].forEach(walk)
const topics = CURRICULUM.flatMap(fach => fach.kapitel.flatMap(chapter => chapter.themen))
const topic = topics.find(item => item.id === 'lymphom-zns')
assert.equal(topic.link, PCNSL_PATH)
assert.equal(topic.inProgress, true)
assert.equal(getLessonStatus(PCNSL_PATH), 'in_progress')
assert.equal(getLessonLinkForFlashcard('/flashcards/lymphom-zns'), PCNSL_PATH)
assert.ok(MCQ_TOPIC_GROUPS.some(group => group.fachId === 'gehirn' && group.topics.some(item => item.id === 'lymphom-zns')))
const tumorGroups = MCQ_TOPIC_GROUPS.filter(group => group.fachId === 'gehirn' && group.kapitelId === 'kopf-tumoren')
assert.equal(tumorGroups.length, 1, 'one setup group for brain tumour chapter')
assert.ok(tumorGroups[0].topics.some(topic => topic.id === 'lymphom-zns'))
assert.equal(countQuestions(['lymphom-zns']), 2)
const deIds = PCNSL_QUESTIONS.de.map(q => q.id)
for (const lang of langs) {
  const actual = QUESTION_BANK[lang].filter(q => q.tags.includes('lymphom-zns'))
  assert.equal(actual.length, 2)
  assert.deepEqual(getQuestionsForIds(deIds, lang).map(q => q.id), actual.map(q => q.id))
  actual.forEach(question => {
    assert.equal(question.options.length, 4)
    assert.ok(question.options.some(option => option.id === question.correct))
    assert.deepEqual(Object.keys(question.wrongExplanations).sort(), question.options.map(option => option.id).filter(id => id !== question.correct).sort())
    assert.ok(question.source)
  })
}
assert.equal(FLASHCARDS.filter(card => card.topicId === 'lymphom-zns').length, 2)
assert.ok(getFlashcardTopic('lymphom-zns'))
assert.equal(PCNSL_CHECK.correct, 2)
assert.equal(PCNSL_CHECK.feedback.length, PCNSL_CHECK.options.length)
const jsx = await readFile('app/gehirn/tumoren/zns-lymphom/page.js', 'utf8')
require('esbuild').transformSync(jsx, { loader: 'jsx', format: 'esm' })
const provenance = JSON.parse(await readFile('public/educational/pcnsl-schematic.provenance.json', 'utf8'))
assert.equal(provenance.lessonId, 'lymphom-zns')
assert.ok((await readFile('public/educational/pcnsl-schematic.svg', 'utf8')).includes('<svg'))
for (const lang of langs) {
  const localized = PCNSL_PATH + (lang === 'de' ? '' : `?lang=${lang}`)
  const quiz = new URL(`https://example.invalid${topic.mcqLink}&from=${encodeURIComponent(localized)}${lang === 'de' ? '' : `&lang=${lang}`}`)
  assert.equal(quiz.searchParams.get('themen'), 'lymphom-zns')
  assert.equal(quiz.searchParams.get('from'), localized)
  assert.equal(quiz.searchParams.get('lang') || 'de', lang)
}
console.log(`PCNSL scoped checks passed: ${semanticUnits} localized semantic units present; exact curriculum/status, 6 MCQs with option feedback, 2 cards, language-ID mapping, assets and JSX syntax. Browser/clinical equivalence not established by this check.`)
