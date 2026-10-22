import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { getQuestions, MCQ_TOPIC_GROUPS } from '../data/questions.js'
import { CURRICULUM } from '../data/curriculum.js'
import { getCardById, getCardsByTopic, getFlashcardTopic } from '../data/flashcards.js'

const id = 'mesenteriale-ischaemie'
const curriculumTopic = CURRICULUM.flatMap(subject => subject.kapitel || []).flatMap(chapter => chapter.themen || []).find(topic => topic.id === id)
assert.equal(curriculumTopic?.link, '/abdomen/gi/mesenteriale-ischaemie')
assert.equal(curriculumTopic?.mcqLink, '/ueben/quiz?fach=abdomen&n=1&themen=mesenteriale-ischaemie')
assert.equal(curriculumTopic?.flashcardLink, '/flashcards/mesenteriale-ischaemie')
const topicGroup = MCQ_TOPIC_GROUPS.find(group => group.fachId === 'abdomen' && group.kapitelId === 'abdomen-gi-trakt' && group.topics.some(topic => topic.id === id))
assert.ok(topicGroup)
for (const lang of ['de', 'en', 'fa']) assert.ok(topicGroup.title[lang])

for (const lang of ['de', 'en', 'fa']) {
  const questions = getQuestions([id], lang, 10)
  assert.equal(questions.length, 1, `${lang}: exactly one MCQ under the exact topic tag`)
  assert.equal(questions[0].id, `abdomen-mesenteric-ischaemia-cta-protocol-${lang}-01`)
  assert.equal(questions[0].options.length, 4)
  assert.equal(questions[0].correct, 'A')
  assert.ok(questions[0].source.includes('Recommendation 33') || questions[0].source.includes('Empfehlung 33'))
}

assert.ok(getFlashcardTopic(id))
assert.equal(getCardsByTopic(id).length, 1)
assert.ok(getCardById('mesenteriale-ischaemie-cta-protocol'))
const route = readFileSync(new URL('../app/abdomen/gi/mesenteriale-ischaemie/page.js', import.meta.url), 'utf8')
assert.ok(route.includes('id="cta-protocol"'))
assert.ok(route.includes('/ueben/quiz?fach=abdomen&n=1&themen=mesenteriale-ischaemie&from='))
assert.ok(route.includes('/flashcards/mesenteriale-ischaemie?from='))
assert.ok(route.includes("`${langHref('/abdomen/gi/mesenteriale-ischaemie')}#cta-protocol`"))
assert.ok(route.includes('encodeURIComponent(lessonReturn)'))
for (const lang of ['de', 'en', 'fa']) {
  const pathname = lang === 'de' ? '/abdomen/gi/mesenteriale-ischaemie' : `/abdomen/gi/mesenteriale-ischaemie?lang=${lang}`
  const returned = new URL(`${pathname}#cta-protocol`, 'https://radyar.example')
  assert.equal(returned.hash, '#cta-protocol', `${lang}: return URL preserves the CTA anchor`)
  assert.equal(returned.searchParams.get('lang'), lang === 'de' ? null : lang)
}

console.log('Mesenteric ischaemia exact-topic assessment integration passed for DE/EN/FA.')
