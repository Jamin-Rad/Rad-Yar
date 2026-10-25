import assert from 'node:assert/strict'
import fs from 'node:fs'
import {QUESTION_BANK} from '../data/questions.js'
import {FLASHCARDS} from '../data/flashcards.js'
import {TECHNIK_INTERVENTIONELLE_RADIOLOGIE_LESSON as intervention} from '../data/technikInterventionelleRadiologieLesson.js'
const published=JSON.parse(fs.readFileSync('data/assessmentQuality/publishedBank.json','utf8'))
const reviewed=JSON.parse(fs.readFileSync('data/assessmentQuality/reviewedPackets.json','utf8'))
for(const lang of ['de','en','fa']){
  const bank=new Map(QUESTION_BANK[lang].map(q=>[q.id,q]))
  assert.deepEqual(published.questions[lang].map(q=>q.id),reviewed.questionIds.map(id=>id.replace(/-de(?=-|$)/,`-${lang}`)))
  for(const q of published.questions[lang]) assert.deepEqual(bank.get(q.id),q,'Published global question differs from its reviewed payload')
  const wire=bank.get(`aq-atv-wire-role-${lang}-application`)
  assert.equal(intervention.check.prompt[lang],wire.question,'Later GI authoring must not replace the active intervention check')
  assert.deepEqual(intervention.check.options.map(o=>o[lang]),wire.options.map(o=>o.text))
  assert.equal('ABCD'[intervention.check.answer],wire.correct)
}
const cards=new Map(FLASHCARDS.map(c=>[c.id,c]))
assert.deepEqual(published.cards.map(c=>c.id),reviewed.cardIds)
for(const card of published.cards)assert.deepEqual(cards.get(card.id),card)
const deIds=new Set(QUESTION_BANK.de.map(q=>q.id))
for(const route of published.routeCoverage)for(const goal of route.learningGoals){
 for(const id of goal.questionIds)assert.ok(deIds.has(id),`${route.route} missing question ${id}`)
 for(const id of goal.cardIds)assert.ok(cards.has(id),`${route.route} missing card ${id}`)
}
console.log('Reviewed payloads, global banks, learning-goal IDs and active intervention check agree.')
