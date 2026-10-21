import assert from 'node:assert/strict'
import { QUESTION_BANK, MCQ_TOPIC_GROUPS } from '../data/questions.js'
import { FLASHCARD_TOPICS, FLASHCARDS } from '../data/flashcards.js'
import { CURRICULUM } from '../data/curriculum.js'
import { readFile } from 'node:fs/promises'

const topic = CURRICULUM.flatMap(area => area.kapitel || []).flatMap(chapter => chapter.themen || []).find(item => item.id === 'pnet')
assert.ok(topic, 'pnet curriculum topic exists')
assert.equal(topic.link, '/abdomen/pankreas/neuroendokrine-tumoren')
assert.equal(topic.mcqLink, '/ueben/quiz?fach=abdomen&n=4&themen=pnet')
assert.equal(topic.flashcardLink, '/flashcards/pnet')
assert.ok(MCQ_TOPIC_GROUPS.some(group => group.fachId === 'abdomen' && group.topics.some(item => item.id === 'pnet')))
assert.ok(FLASHCARD_TOPICS.some(item => item.id === 'pnet' && item.href === '/flashcards/pnet'))

for (const lang of ['de', 'en', 'fa']) {
  const questions = QUESTION_BANK[lang].filter(item => item.tags.includes('pnet'))
  assert.equal(questions.length, 4, `${lang}: four pnet MCQs`)
  assert.equal(new Set(questions.map(item => item.correct)).size, 4, `${lang}: correct options balanced across A-D`)
  for (const question of questions) {
    assert.equal(question.options.length, 4)
    assert.ok(question.explanation?.trim())
    assert.deepEqual(Object.keys(question.wrongExplanations).sort(), question.options.filter(item => item.id !== question.correct).map(item => item.id).sort())
  }
}

assert.equal(FLASHCARDS.filter(card => card.topicId === 'pnet').length, 4)
for (const card of FLASHCARDS.filter(item => item.topicId === 'pnet')) {
  for (const field of ['front', 'answer', 'explanation']) {
    for (const lang of ['de', 'en', 'fa']) assert.ok(card[field]?.[lang]?.trim(), `${card.id}.${field}.${lang}`)
  }
}

const route = await readFile(new URL('../app/abdomen/pankreas/neuroendokrine-tumoren/page.js', import.meta.url), 'utf8')
assert.match(route, /themen=pnet/)
assert.match(route, /flashcards\/pnet/)
assert.match(route, /small study|kleine Studie|مطالعه کوچکی/i)
console.log('pNET registration passed: curriculum, MCQ group, 12 localized MCQs, 4 trilingual flashcards, route links and insulinoma caveat.')
