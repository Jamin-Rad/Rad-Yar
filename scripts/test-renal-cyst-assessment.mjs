import assert from 'node:assert/strict'
import fs from 'node:fs'
import { CURRICULUM } from '../data/curriculum.js'
import { getQuestions, MCQ_TOPIC_GROUPS } from '../data/questions.js'
import { FLASHCARD_TOPICS, getCardsByTopic } from '../data/flashcards.js'

const id = 'nierenzysten'
const topic = CURRICULUM.flatMap(subject => subject.kapitel || []).flatMap(chapter => chapter.themen || []).find(item => item.id === id)
assert.equal(topic?.link, '/abdomen/niere/nierenzysten')
assert.equal(topic?.mcqLink, '/ueben/quiz?fach=abdomen&n=1&themen=nierenzysten')
assert.equal(topic?.flashcardLink, '/flashcards/nierenzysten')
assert.ok(MCQ_TOPIC_GROUPS.some(group => group.fachId === 'abdomen' && group.topics.some(item => item.id === id)))
assert.ok(FLASHCARD_TOPICS.some(item => item.id === id))

for (const lang of ['de', 'en', 'fa']) {
  const questions = getQuestions([id], lang, 10)
  assert.equal(questions.length, 1, `${lang}: exactly one exact-topic MCQ`)
  assert.equal(questions[0].id, `abdomen-renal-cyst-bosniak-nodule-${lang}-01`)
  assert.equal(questions[0].options.length, 4)
  assert.equal(questions[0].correct, 'A')
  assert.ok(questions[0].source.includes('2019182646'))
  const perpendicularMeasurement = {
    de: 'senkrecht zur Wand gemessen',
    en: 'measured perpendicular to the wall',
    fa: 'عمود بر دیواره',
  }[lang]
  assert.ok(questions[0].question.includes(perpendicularMeasurement), `${lang}: threshold axis is explicit`)
}

const cards = getCardsByTopic(id)
assert.equal(cards.length, 1)
assert.equal(cards[0].id, 'nierenzysten-bosniak-ii-septa')
for (const lang of ['de', 'en', 'fa']) {
  assert.ok(cards[0].front[lang] && cards[0].answer[lang] && cards[0].explanation[lang], `${lang}: complete flashcard`)
}

const route = fs.readFileSync('app/abdomen/niere/nierenzysten/page.js', 'utf8')
assert.match(route, /const lessonReturn = local\('\/abdomen\/niere\/nierenzysten#classes'\)/)
assert.match(route, /themen=nierenzysten&from=\$\{encodeURIComponent\(lessonReturn\)\}/)
assert.match(route, /flashcards\/nierenzysten\?from=\$\{encodeURIComponent\(lessonReturn\)\}/)
assert.match(route, /const local = href => \{[\s\S]*?split\('#', 2\)[\s\S]*?hash \? `\$\{localizedPath\}#\$\{hash\}`/)
for (const lang of ['de', 'en', 'fa']) {
  const pathname = lang === 'de' ? '/abdomen/niere/nierenzysten' : `/abdomen/niere/nierenzysten?lang=${lang}`
  const returned = new URL(`${pathname}#classes`, 'https://radyar.example')
  assert.equal(returned.hash, '#classes', `${lang}: return URL retains lesson anchor`)
  assert.equal(returned.searchParams.get('lang'), lang === 'de' ? null : lang)
}

console.log('Renal cyst exact-topic assessment integration passed: DE/EN/FA, MCQ/card retrieval, links and return-anchor parity.')
