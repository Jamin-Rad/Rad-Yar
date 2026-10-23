import assert from 'node:assert/strict'
import { CURRICULUM } from '../data/curriculum.js'
import { QUESTION_BANK, MCQ_TOPIC_GROUPS } from '../data/questions.js'
import { FLASHCARDS, FLASHCARD_TOPICS } from '../data/flashcards.js'

for (const id of ['sternum-rippen-trauma', 'glenohumerale-arthrose', 'arterien-obere-extremitaet']) {
  const matches = CURRICULUM.flatMap(f => f.kapitel.flatMap(k => k.themen.filter(t => t.id === id).map(t => ({ f, k, t }))))
  assert.equal(matches.length, 1, `${id}: one curriculum entry`)
  const { f, k, t } = matches[0]
  const group = MCQ_TOPIC_GROUPS.find(g => g.topics.some(topic => topic.id === id))
  assert.equal(group.fachId, f.id, `${id}: actual curriculum specialty`)
  assert.equal(group.kapitelId, k.id)
  const params = new URL(t.mcqLink, 'https://radyar.test').searchParams
  assert.equal(params.get('fach'), f.id)
  assert.equal(params.get('themen'), id)
  for (const lang of ['de', 'en', 'fa']) {
    const questions = QUESTION_BANK[lang].filter(q => q.fach === f.id && q.tags.includes(id))
    assert.equal(questions.length, 2, `${id}/${lang}: selectable quiz`)
    questions.forEach(q => assert.equal(q.options.length, 4))
  }
  assert.equal(FLASHCARD_TOPICS.filter(topic => topic.id === id).length, 1)
  assert.equal(FLASHCARDS.filter(card => card.topicId === id).length, id === 'sternum-rippen-trauma' ? 3 : 2)
  assert.equal(t.inProgress, true)
}
console.log('MSK completion integration PASS: actual specialty/chapter, curriculum, selected MCQs and cards agree.')
