import assert from 'node:assert/strict'
import fs from 'node:fs'
import { QUESTION_BANK, MCQ_TOPIC_GROUPS, getQuestionsForIds } from '../data/questions.js'
import { FLASHCARDS, FLASHCARD_TOPICS } from '../data/flashcards.js'
import { CURRICULUM } from '../data/curriculum.js'
import { ABDOMEN_LEGACY_CARDS } from '../data/abdomenLegacyCardAccess.js'
const routes={leberzirrhose:'/abdomen/leber/zirrhose','fibrolamellaeres-karzinom':'/abdomen/leber/fibrolamellaeres-karzinom',ulkuserkrankung:'/abdomen/gi/ulkuserkrankung',duodenaldivertikel:'/abdomen/gi/duodenaldivertikel'}
const topics=CURRICULUM.find(f=>f.id==='abdomen').kapitel.flatMap(k=>k.themen)
for(const [id,route] of Object.entries(routes)){
 const entries=topics.filter(t=>t.id===id);assert.equal(entries.length,1,`${id} curriculum uniqueness`);assert.equal(entries[0].link,route)
 assert.ok(['js','jsx','tsx'].some(ext=>fs.existsSync(`app${route}/page.${ext}`)),`${id} actual route`)
 assert.equal(MCQ_TOPIC_GROUPS.flatMap(g=>g.topics).filter(t=>t.id===id).length,1,`${id} exact MCQ group`)
 assert.equal(FLASHCARD_TOPICS.filter(t=>t.id===id).length,1,`${id} exact card topic`)
 assert.equal(FLASHCARD_TOPICS.find(t=>t.id===id).href,`/flashcards/${id}`)
 const base=QUESTION_BANK.de.filter(q=>q.tags.includes(id));assert.equal(base.length,2,`${id} question count`)
 for(const lang of ['de','en','fa']){
  const translated=getQuestionsForIds(base.map(q=>q.id),lang);assert.equal(translated.length,2)
  for(const q of translated){
   assert.ok(QUESTION_BANK[lang].includes(q),`${id} returns actual ${lang} object, not fallback`)
   assert.ok(q.id.includes(`-${lang}-`)||q.id.endsWith(`-${lang}`),`${q.id} language identity`)
   assert.equal(q.options.length,4,`${q.id} exam compatibility`)
   assert.equal(new Set(q.options.map(o=>o.id)).size,4);assert.ok(q.options.some(o=>o.id===q.correct));assert.ok(q.explanation&&q.source)
   for(const o of q.options)if(o.id!==q.correct)assert.ok(q.wrongExplanations[o.id],`${q.id} feedback ${o.id}`)
  }
 }
 const cards=FLASHCARDS.filter(c=>c.topicId===id);assert.equal(cards.length,2,`${id} cards`)
 for(const card of cards)for(const lang of ['de','en','fa'])for(const field of ['front','answer','explanation'])assert.ok(card[field]?.[lang],`${card.id} ${field} ${lang}`)
}
assert.equal(ABDOMEN_LEGACY_CARDS.length,9)
for(const card of ABDOMEN_LEGACY_CARDS){assert.equal(FLASHCARDS.filter(c=>c.id===card.id).length,1,`${card.id} global registration`);for(const lang of ['de','en','fa']){assert.ok(card.front[lang].includes(card.category[lang]));assert.ok(card.answer[lang])}}
for(const id of ['morbus-ormond','mesenteriale-panniculitis','peritonealkarzinose'])assert.equal(FLASHCARD_TOPICS.filter(t=>t.id===id).length,1)
assert.equal(MCQ_TOPIC_GROUPS.flatMap(g=>g.topics).filter(t=>t.id==='volvulus').length,1,'Volvulus group must not duplicate')
console.log('Abdomen completion registration PASS: 4 exact existing routes, 8 questions/8 cards per language with real localized retrieval and four-option exam compatibility; 9 legacy cards once each; unique Volvulus group. Browser/action roundtrips tested separately.')
