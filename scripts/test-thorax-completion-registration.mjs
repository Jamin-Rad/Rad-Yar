import assert from 'node:assert/strict'
import fs from 'node:fs'
import { QUESTION_BANK, MCQ_TOPIC_GROUPS, getQuestionsForIds } from '../data/questions.js'
import { FLASHCARDS, FLASHCARD_TOPICS } from '../data/flashcards.js'
import { CURRICULUM } from '../data/curriculum.js'
const expected={'lch-lunge':2,'pectus-excavatum':2,'lungenzysten-differentialdiagnose':2,'mukoviszidose':2,'bronchiolitis':2,'hypersensitivitaetspneumonitis':2,'atelektase':1,'rippenpathologien':1,'akute-le':1,'pneumonie-muster':1,'bakterielle-pneumonie':1,'virale-pneumonie-covid':1,'atypische-pneumonie':1,'pcp':1,'aspergillus-lunge':1,'pleuraempyem':1}
const thorax=CURRICULUM.find(f=>f.id==='thorax')
const topics=thorax.kapitel.flatMap(k=>k.themen)
for(const [id,count] of Object.entries(expected)){
 const topic=topics.find(t=>t.id===id)
 assert.ok(topic?.link,`${id} curriculum link`)
 const route=topic.link.split('#')[0]
 assert.ok(['js','jsx','tsx'].some(ext=>fs.existsSync(`app${route}/page.${ext}`)),`${id} route`)
 assert.equal(MCQ_TOPIC_GROUPS.flatMap(g=>g.topics).filter(t=>t.id===id).length,1,`${id} group`)
 assert.equal(FLASHCARD_TOPICS.filter(t=>t.id===id).length,1,`${id} card topic`)
 const qs=QUESTION_BANK.de.filter(q=>q.tags.includes(id))
 assert.equal(qs.length,count,`${id} count`)
 for(const lang of ['de','en','fa']){
  const translated=getQuestionsForIds(qs.map(q=>q.id),lang)
  assert.equal(translated.length,count)
  for(const q of translated){assert.ok(q.id.includes(`-${lang}-`),q.id);assert.ok(q.options.some(o=>o.id===q.correct));assert.ok(q.explanation&&q.source);for(const o of q.options)if(o.id!==q.correct)assert.ok(q.wrongExplanations[o.id])}
 }
 const cards=FLASHCARDS.filter(c=>c.topicId===id)
 assert.ok(cards.length>=1,`${id} cards`)
 for(const card of cards)for(const lang of ['de','en','fa'])for(const field of ['front','answer'])assert.ok(card[field][lang],`${id} ${field} ${lang}`)
}
console.log(`Thorax registration PASS: ${Object.keys(expected).length} exact-topic lesson/quiz/card paths; DE/EN/FA IDs and feedback.`)
