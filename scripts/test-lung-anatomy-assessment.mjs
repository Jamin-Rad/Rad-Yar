import assert from 'node:assert/strict'
import fs from 'node:fs'
import { CURRICULUM } from '../data/curriculum.js'
import { getQuestions, MCQ_TOPIC_GROUPS } from '../data/questions.js'
import { FLASHCARD_TOPICS, getCardsByTopic } from '../data/flashcards.js'

const id = 'lungenanatomie'
const topic = CURRICULUM.flatMap(subject => subject.kapitel || []).flatMap(chapter => chapter.themen || []).find(item => item.id === id)
assert.equal(topic?.link, '/thorax/anatomie/lungenanatomie')
assert.equal(topic?.mcqLink, '/ueben/quiz?fach=thorax&n=1&themen=lungenanatomie')
assert.equal(topic?.flashcardLink, '/flashcards/lungenanatomie')
assert.ok(MCQ_TOPIC_GROUPS.some(group => group.fachId === 'thorax' && group.kapitelId === 'thorax-anatomie' && group.topics.some(item => item.id === id)))
assert.ok(FLASHCARD_TOPICS.some(item => item.id === id))

for (const lang of ['de', 'en', 'fa']) {
  const questions = getQuestions([id], lang, 10)
  assert.equal(questions.length, 1, `${lang}: one exact-topic MCQ`)
  assert.equal(questions[0].id, `thorax-lung-segmental-anatomy-${lang}-01`)
  assert.equal(questions[0].correct, 'A')
  assert.equal(questions[0].options.length, 4)
  assert.ok(questions[0].question && questions[0].explanation && questions[0].source)
}

const cards = getCardsByTopic(id)
assert.equal(cards.length, 1)
assert.equal(cards[0].id, 'lungenanatomie-left-basal-segments')
for (const lang of ['de', 'en', 'fa']) {
  assert.ok(cards[0].front[lang] && cards[0].answer[lang] && cards[0].explanation[lang], `${lang}: complete flashcard`)
}

const route = fs.readFileSync('app/thorax/anatomie/lungenanatomie/page.jsx', 'utf8')
assert.match(route, /const lessonReturn = local\('\/thorax\/anatomie\/lungenanatomie#segments'\)/)
assert.match(route, /themen=lungenanatomie&from=\$\{encodeURIComponent\(lessonReturn\)\}/)
assert.match(route, /flashcards\/lungenanatomie\?from=\$\{encodeURIComponent\(lessonReturn\)\}/)
assert.match(route, /split\('#', 2\)[\s\S]*?path\.includes\('\?'\) \? '&' : '\?'[\s\S]*?hash \? `\$\{localizedPath\}#\$\{hash\}`/)

for (const lang of ['de', 'en', 'fa']) {
  const local = href => {
    const [path, hash] = href.split('#', 2)
    const localizedPath = lang === 'de' ? path : `${path}${path.includes('?') ? '&' : '?'}lang=${lang}`
    return hash ? `${localizedPath}#${hash}` : localizedPath
  }
  const lessonReturn = local('/thorax/anatomie/lungenanatomie#segments')
  const action = local(`/ueben/quiz?fach=thorax&n=1&themen=${id}&from=${encodeURIComponent(lessonReturn)}`)
  const parsed = new URL(action, 'https://radyar.example')
  assert.equal(parsed.searchParams.get('lang'), lang === 'de' ? null : lang)
  assert.equal(parsed.searchParams.get('themen'), id)
  const returned = new URL(parsed.searchParams.get('from'), 'https://radyar.example')
  assert.equal(returned.pathname, '/thorax/anatomie/lungenanatomie')
  assert.equal(returned.hash, '#segments')
  assert.equal(returned.searchParams.get('lang'), lang === 'de' ? null : lang)
}

console.log('Lung anatomy exact-topic assessment integration passed: DE/EN/FA, MCQ/card retrieval, localized action URLs and return-anchor parity.')
