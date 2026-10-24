import assert from 'node:assert/strict'
import fs from 'node:fs'
import {BRONCHIOLITIS_LESSON,BRONCHIOLITIS_QUESTIONS,BRONCHIOLITIS_CARDS} from '../data/thoraxBronchiolitisLesson.js'
import {HP_LESSON,HP_QUESTIONS,HP_CARDS} from '../data/thoraxHypersensitivityLesson.js'
for(const [lesson,questions,cards] of [[BRONCHIOLITIS_LESSON,BRONCHIOLITIS_QUESTIONS,BRONCHIOLITIS_CARDS],[HP_LESSON,HP_QUESTIONS,HP_CARDS]]) {
 assert.equal(lesson.chapters.length,3)
 for(const lang of ['de','en','fa']) {
  assert.equal(questions[lang].length,2)
  for(const [i,q] of questions[lang].entries()) {
   assert.equal(q.options.length,4)
   assert.equal(q.correct,questions.de[i].correct)
   assert.equal(q.id.replace(`-${lang}-`,'-de-'),questions.de[i].id)
   assert(q.tags.includes(lesson.id));assert(q.question);assert(q.explanation)
   for(const option of q.options) if(option.id!==q.correct) assert(q.wrongExplanations[option.id])
   assert.equal(q.explanation,lesson.checks[i].feedback[lesson.checks[i].correct][lang])
  }
  for(const c of cards) { assert(c.front[lang]);assert(c.answer[lang]);assert(c.explanation[lang]);assert.equal(c.topicId,lesson.id) }
  for(const c of lesson.chapters) {assert(c.title[lang]);for(const p of c.paragraphs||[])assert(p[lang]);for(const row of c.rows||[])for(const v of row)assert(v[lang]);if(c.image){assert(c.image.alt[lang]);assert(c.image.caption[lang]);}}
 }
 assert(fs.existsSync(`public${lesson.hero}`))
 assert(fs.existsSync(`public${lesson.chapters[0].image.src}`))
 console.log(`${lesson.id}: translation units, MCQ/localcheck/card parity, assets PASS`)
}
