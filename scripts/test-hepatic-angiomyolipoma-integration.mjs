import assert from 'node:assert/strict'
import { CURRICULUM } from '../data/curriculum.js'
import { HEPATIC_ANGIOMYOLIPOMA_QUESTIONS, HEPATIC_ANGIOMYOLIPOMA_FLASHCARDS, HEPATIC_ANGIOMYOLIPOMA_FLASHCARD_TOPIC } from '../data/hepaticAngiomyolipomaLearning.js'
import { QUESTION_BANK, MCQ_TOPIC_GROUPS, getQuestions } from '../data/questions.js'
import { FLASHCARDS, FLASHCARD_TOPICS, getCardsByTopic } from '../data/flashcards.js'
import fs from 'node:fs'

const langs = ['de', 'en', 'fa']
const allTopics = value => Array.isArray(value)
  ? value.flatMap(allTopics)
  : value && typeof value === 'object'
    ? [...(value.id ? [value] : []), ...Object.values(value).flatMap(allTopics)]
    : []
const findWithParent = (value, targetId, parent = null) => {
  if (Array.isArray(value)) return value.map(item => findWithParent(item, targetId, parent)).find(Boolean)
  if (!value || typeof value !== 'object') return null
  if (value.id === targetId) return { item: value, parent }
  for (const child of Object.values(value)) {
    const found = findWithParent(child, targetId, value.id ? value : parent)
    if (found) return found
  }
  return null
}

const topicId = 'hepatisches-angiomyolipom'
const topic = allTopics(CURRICULUM).find(item => item.id === topicId)
assert.ok(topic, 'exact hepatic AML curriculum ID exists')
assert.equal(findWithParent(CURRICULUM, topicId)?.parent?.id, 'abdomen-leber', 'hepatic AML is nested under the liver curriculum chapter')
assert.equal(topic.link, '/abdomen/leber/angiomyolipom')
assert.equal(topic.mcqLink, `/ueben/quiz?fach=abdomen&n=10&themen=${topicId}`)
assert.equal(topic.flashcardLink, `/flashcards/${topicId}`)
assert.equal(topic.inProgress, true)
assert.equal(allTopics(CURRICULUM).filter(item => item.id === 'angiomyolipom').length, 1, 'kidney AML remains a separate, unique topic')
assert.ok(MCQ_TOPIC_GROUPS.flatMap(group => group.topics).some(item => item.id === topicId))

for (const lang of langs) {
  const qs = HEPATIC_ANGIOMYOLIPOMA_QUESTIONS[lang]
  assert.equal(qs.length, 4, `${lang}: four MCQs`)
  assert.equal(new Set(qs.map(q => q.id)).size, 4)
  for (const q of qs) {
    assert.equal(q.topicId, topicId)
    assert.equal(q.tags[0], topicId)
    assert.equal(q.options.length, 4)
    assert.ok(q.explanation.length > 20, `${lang}/${q.id}: explanatory feedback`)
    assert.ok(q.source.includes('Abdomen.pdf, pp. 12–13'))
    assert.ok(QUESTION_BANK[lang].some(item => item.id === q.id), `${lang}/${q.id}: question is registered`)
  }
  assert.equal(getQuestions([topicId], lang, 10).length, 4, `${lang}: quiz topic selection`)
}

const washout = HEPATIC_ANGIOMYOLIPOMA_QUESTIONS.en.find(q => q.id.startsWith(`${topicId}-washout`))
assert.equal(washout.correct, 'D')
assert.match(washout.source, /Wang et al\., 2009/)
assert.match(washout.explanation, /PDF page 12.*page 13.*separate Wang series/i)
assert.doesNotMatch(washout.explanation, /source is contradictory/i)
assert.match(washout.options[2].text, /PDF itself reports early wash-out in two AML cases with TSC/i)
assert.match(HEPATIC_ANGIOMYOLIPOMA_FLASHCARDS.find(card => card.id.endsWith('-washout')).explanation.en, /Wang series \(2009\)/)
assert.match(fs.readFileSync(new URL('../app/abdomen/leber/angiomyolipom/page.js', import.meta.url), 'utf8'), /PDF page 12 describes no typical wash-out.*page 13.*separate Wang series/i)
assert.ok(HEPATIC_ANGIOMYOLIPOMA_FLASHCARDS.every(card => card.topicId === topicId))
assert.equal(HEPATIC_ANGIOMYOLIPOMA_FLASHCARDS.length, 4)
assert.equal(FLASHCARDS.filter(card => card.topicId === topicId).length, 4)
assert.equal(getCardsByTopic(topicId).length, 4)
assert.equal(HEPATIC_ANGIOMYOLIPOMA_FLASHCARD_TOPIC.href, `/flashcards/${topicId}`)
assert.equal(FLASHCARD_TOPICS.filter(item => item.id === topicId).length, 1)
for (const card of HEPATIC_ANGIOMYOLIPOMA_FLASHCARDS) {
  for (const field of ['front', 'answer', 'explanation']) {
    for (const lang of langs) assert.ok(card[field][lang].length > 8, `${card.id}/${field}/${lang} translated`)
  }
}
const route = fs.readFileSync(new URL('../app/abdomen/leber/angiomyolipom/page.js', import.meta.url), 'utf8')
assert.match(route, /lessonId="abdomen-hepatic-aml"/)
assert.match(route, /themen=hepatisches-angiomyolipom/)
assert.match(route, /flashcards\/hepatisches-angiomyolipom/)
assert.match(route, /quizHref="\/ueben\/quiz\?fach=abdomen&amp;n=10&amp;themen=hepatisches-angiomyolipom"/)
assert.match(route, /flashcardsHref="\/flashcards\/hepatisches-angiomyolipom"/)
assert.doesNotMatch(route, /<h1/)
for (const phrase of ['HCC kann ebenfalls Fett enthalten', 'HCC can also contain fat', 'HCC نیز ممکن است چربی داشته باشد']) assert.ok(route.includes(phrase), `localized take-home includes: ${phrase}`)

console.log('Hepatic AML curriculum, three-language assessment registry, source conflict and route links passed.')
