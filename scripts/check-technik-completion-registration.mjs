import assert from 'node:assert/strict'
import { CURRICULUM } from '../data/curriculum.js'
import { QUESTION_BANK, MCQ_TOPIC_GROUPS } from '../data/questions.js'
import { getCardsByTopic, getFlashcardTopic } from '../data/flashcards.js'
const expected = {
  'strahlenschutz-gesetzliche-grundlagen': '/technik/grundlagen#strahlenschutz-gesetzliche-grundlagen',
  'strahlenschutzbereiche-verantwortliche': '/technik/grundlagen#strahlenschutzbereiche-verantwortliche',
  'fachkunde-strahlenschutz': '/technik/grundlagen#fachkunde-strahlenschutz',
  teleradiologie: '/technik/grundlagen#teleradiologie',
  'photon-counting-ct': '/technik/ct-grundlagen#ct-grundprinzip-aufbau',
  'roentgen-streustrahlenraster': '/technik/grundlagen#optimierung',
  'c-arm-ct': '/technik/grundlagen#fluoro',
  'mr-myelographie': '/technik/mr-myelographie',
}
const fach = CURRICULUM.find(f => f.id === 'technik')
for (const [id, href] of Object.entries(expected)) {
  const chapter = fach.kapitel.find(k => k.themen.some(t => t.id === id))
  assert.ok(chapter, id)
  const topic = chapter.themen.find(t => t.id === id)
  assert.equal(topic.link, href)
  assert.equal(new URL(topic.mcqLink, 'https://local.test').searchParams.get('themen'), id)
  assert.equal(topic.flashcardLink, `/flashcards/${id}`)
  assert.ok(MCQ_TOPIC_GROUPS.some(g => g.fachId === 'technik' && g.kapitelId === chapter.id && g.topics.some(t => t.id === id)))
  const count = id === 'mr-myelographie' ? 2 : 1
  for (const lang of ['de', 'en', 'fa']) {
    assert.equal(QUESTION_BANK[lang].filter(q => q.tags.includes(id)).length, count, `${id}/${lang}`)
    assert.ok(getFlashcardTopic(id).title[lang])
    for (const card of getCardsByTopic(id)) assert.ok(card.front[lang] && card.answer[lang])
  }
  assert.equal(getCardsByTopic(id).length, count)
}
console.log('PASS: all eight Technik additions/access repairs resolve to their exact lesson, chapter, localized MCQs and cards.')
