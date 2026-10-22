import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { CURRICULUM } from '../data/curriculum.js'
import { getQuestions, MCQ_TOPIC_GROUPS, QUESTION_BANK } from '../data/questions.js'

const topicId = 'leber-mrt-protokoll'
const topic = CURRICULUM.flatMap(fach => fach.kapitel.flatMap(kapitel => kapitel.themen || []))
  .find(item => item.id === topicId)
assert.ok(topic, 'curriculum topic exists')
assert.equal(topic.link, '/technik/grundlagen#leber-mrt-protokoll')
assert.equal(topic.mcqLink, '/ueben/quiz?fach=technik&n=1&themen=leber-mrt-protokoll')

const group = MCQ_TOPIC_GROUPS.flatMap(item => item.topics).filter(item => item.id === topicId)
assert.equal(group.length, 1, 'exactly one global MCQ topic registration exists')
for (const lang of ['de', 'en', 'fa']) {
  const questions = QUESTION_BANK[lang].filter(question => question.tags?.includes(topicId))
  assert.equal(questions.length, 1, `${lang} has exactly one focused question`)
  assert.equal(questions[0].options.length, 4)
  assert.equal(questions[0].correct, 'B')
  assert.ok(questions[0].explanation)
  assert.deepEqual(Object.keys(questions[0].wrongExplanations).sort(), ['A', 'C', 'D'])
  assert.equal(getQuestions([topicId], lang, 1)[0]?.id, questions[0].id, `${lang} selector returns the registered question`)
}

const page = await readFile(new URL('../app/technik/grundlagen/StandardPage.jsx', import.meta.url), 'utf8')
assert.match(page, /section\.id === 'leber-mrt-protokoll'.*<LiverProtocolActions lang=\{lang\}/)
assert.match(page, /ueben\/quiz\?fach=technik&n=1&themen=leber-mrt-protokoll&from=\$\{from\}/)
assert.match(page, /\/technik\/grundlagen\?lang=\$\{lang\}#leber-mrt-protokoll/)

console.log('Liver MRI protocol integration passed: localized quiz, exact topic/link, visible route action, and return anchor.')
