import fs from 'node:fs'
import assert from 'node:assert/strict'
import {QUESTION_BANK} from '../data/questions.js'
import {FLASHCARDS} from '../data/flashcards.js'
const base='docs/lesson-quality/remediation-2026-10-25/abdomen-technik/packet07-fnh/'
const expected=JSON.parse(fs.readFileSync(base+'author-after.json'))
const page=fs.readFileSync('app/abdomen/leber/fnh/page.js','utf8')
const content=JSON.parse(page.slice(page.indexOf('const CONTENT = ')+16,page.indexOf('const CASE_COPY')).trim())
let count=0,feedback=0
for(const lang of ['de','en','fa']){
 const actual=QUESTION_BANK[lang].filter(q=>q.tags?.includes('fnh'))
 assert.equal(actual.length,10)
 for(const q of expected.questions[lang]){
  assert.deepEqual(actual.find(x=>x.id===q.id),q,q.id)
  assert.equal(new Set(q.options.map(o=>o.text)).size,4)
  assert.equal(q.options.filter(o=>o.id===q.correct).length,1)
  for(const o of q.options)if(o.id!==q.correct){assert.ok(q.wrongExplanations[o.id]);feedback++}
  count++
 }
 const q=actual.find(q=>q.id===`fnh-${lang}-04`),inline=content[lang].mri.check
 assert.equal(inline.question,q.question)
 assert.deepEqual(inline.options,q.options.map(o=>o.text))
 assert.equal(inline.answer,'ABCD'.indexOf(q.correct))
 assert.deepEqual(inline.wrongExplanations,q.options.map(o=>q.wrongExplanations[o.id]||''))
 assert.equal(content[lang].basics.learningGoals.length,4)
}
for(const c of expected.cards){assert.deepEqual(FLASHCARDS.find(x=>x.id===c.id),c,c.id);count++}
assert.match(expected.questions.en[6].explanation,/shows delayed enhancement with extracellular contrast/)
assert.match(expected.cards.find(c=>c.id==='fnh-05-ct').explanation.en,/classic haemangioma pattern/)
assert.equal(expected.cards.find(c=>c.id==='fnh-12-reporting').category.fa,'درمان و پیگیری')
assert.equal(feedback,90)
console.log(`PASS ${count}actual FNH payloads,90specific wrong explanations,3canonical inline checks and4goals per language.`)
