import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { FACET_COPY, FACET_CHAPTERS, FACET_CHECK, FACET_QUESTIONS, FACET_FLASHCARDS, FACET_PATH } from '../data/spondylarthroseLesson.js'
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
[FACET_COPY, FACET_CHAPTERS, FACET_CHECK, FACET_FLASHCARDS].forEach(walk)
const topics = CURRICULUM.flatMap(fach => fach.kapitel.flatMap(chapter => chapter.themen))
const topic = topics.find(item => item.id === 'spondylarthrose')
assert.equal(topic.link, FACET_PATH)
assert.equal(topic.inProgress, true)
assert.equal(getLessonStatus(FACET_PATH), 'in_progress')
assert.equal(getLessonLinkForFlashcard('/flashcards/spondylarthrose'), FACET_PATH)
assert.ok(MCQ_TOPIC_GROUPS.some(group => group.fachId === 'wirbelsaeule' && group.topics.some(item => item.id === 'spondylarthrose')))
const degenerativeGroups = MCQ_TOPIC_GROUPS.filter(group => group.fachId === 'wirbelsaeule' && group.kapitelId === 'ws-degenerativ')
assert.equal(degenerativeGroups.length, 1, 'one setup group per existing degenerative chapter')
assert.ok(degenerativeGroups[0].topics.some(topic => topic.id === 'spinalkanalstenose'))
const synovialTopic = topics.find(item => item.id === 'synovialzyste-facettengelenke')
assert.equal(synovialTopic.link, `${FACET_PATH}#space`)
assert.equal(synovialTopic.mcqLink, '/ueben/quiz?fach=wirbelsaeule&n=1&themen=synovialzyste-facettengelenke&from=%2Fwirbelsaeule%2Fdegenerative%2Fspondylarthrose%23space')
assert.equal(new URL(`http://local${synovialTopic.mcqLink}`).searchParams.get('from'), `${FACET_PATH}#space`)
assert.equal(synovialTopic.flashcardLink, '/flashcards/synovialzyste-facettengelenke')
assert.equal(getLessonLinkForFlashcard(synovialTopic.flashcardLink), `${FACET_PATH}#space`)
assert.equal(countQuestions(['spondylarthrose']), 2)
const deIds = FACET_QUESTIONS.de.filter(q => q.tags.includes('spondylarthrose')).map(q => q.id)
for (const lang of langs) {
  const actual = QUESTION_BANK[lang].filter(q => q.tags.includes('spondylarthrose'))
  assert.equal(actual.length, 2)
  assert.deepEqual(getQuestionsForIds(deIds, lang).map(q => q.id), actual.map(q => q.id))
  actual.forEach(question => {
    assert.equal(question.options.length, 4)
    assert.ok(question.options.some(option => option.id === question.correct))
    assert.deepEqual(Object.keys(question.wrongExplanations).sort(), question.options.map(option => option.id).filter(id => id !== question.correct).sort())
    assert.ok(question.source)
  })
}
assert.equal(FLASHCARDS.filter(card => card.topicId === 'spondylarthrose').length, 2)
assert.ok(getFlashcardTopic('spondylarthrose'))
assert.equal(countQuestions(['synovialzyste-facettengelenke']), 1)
assert.ok(MCQ_TOPIC_GROUPS.some(group => group.fachId === 'wirbelsaeule' && group.topics.some(item => item.id === 'synovialzyste-facettengelenke')))
assert.equal(FLASHCARDS.filter(card => card.topicId === 'synovialzyste-facettengelenke').length, 1)
assert.ok(getFlashcardTopic('synovialzyste-facettengelenke'))
for (const lang of langs) {
  const question = FACET_QUESTIONS[lang].find(item => item.tags.includes('synovialzyste-facettengelenke'))
  assert.ok(question && QUESTION_BANK[lang].some(item => item.id === question.id))
  assert.equal(question.options.length, 4)
  assert.equal(question.correct, 'B')
  const lengths = question.options.map(option => option.text.length)
  assert.ok(Math.max(...lengths) / Math.min(...lengths) < 1.25, `${lang} cyst question options should not reveal the answer by length`)
  assert.deepEqual(Object.keys(question.wrongExplanations).sort(), question.options.map(option => option.id).filter(id => id !== question.correct).sort())
  assert.deepEqual(getQuestionsForIds([question.id], lang).map(item => item.id), [question.id])
}
assert.equal(FACET_CHECK.correct, 2)
assert.equal(FACET_CHECK.feedback.length, FACET_CHECK.options.length)
const jsx = await readFile('app/wirbelsaeule/degenerative/spondylarthrose/page.js', 'utf8')
require('esbuild').transformSync(jsx, { loader: 'jsx', format: 'esm' })
const provenance = JSON.parse(await readFile('public/educational/spondylarthrose-schematic.provenance.json', 'utf8'))
assert.equal(provenance.lessonId, 'spondylarthrose')
assert.ok((await readFile('public/educational/spondylarthrose-schematic.svg', 'utf8')).includes('<svg'))
assert.ok(CURRICULUM.flatMap(fach => fach.kapitel.flatMap(chapter => chapter.themen)).find(topic => topic.id === 'spinalkanalstenose').link === '/wirbelsaeule/degenerative', 'existing stenosis route must be preserved')
for (const lang of langs) {
  const localized = FACET_PATH + (lang === 'de' ? '' : `?lang=${lang}`)
  const quiz = new URL(`https://example.invalid${topic.mcqLink}&from=${encodeURIComponent(localized)}${lang === 'de' ? '' : `&lang=${lang}`}`)
  assert.equal(quiz.searchParams.get('themen'), 'spondylarthrose')
  assert.equal(quiz.searchParams.get('from'), localized)
  assert.equal(quiz.searchParams.get('lang') || 'de', lang)
}
console.log(`Spondylarthrose scoped checks passed: ${semanticUnits} localized semantic units present; exact curriculum/status, 6 facet MCQs plus one juxtafacet-cyst MCQ per language, 2 facet cards plus one cyst card, language-ID mapping, assets and JSX syntax. Browser/clinical equivalence not established by this check.`)
