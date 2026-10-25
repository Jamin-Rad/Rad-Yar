import fs from 'node:fs'
import assert from 'node:assert/strict'
import {KAVERNOM_LESSON,KAVERNOM_QUESTIONS,KAVERNOM_FLASHCARDS,KAVERNOM_ROUTE_COVERAGE} from '../data/kavernom.js'
import {QUESTION_BANK} from '../data/questions.js'
import {FLASHCARDS} from '../data/flashcards.js'
const dir='docs/lesson-quality/remediation-2026-10-25/brain/'
const manifest=JSON.parse(fs.readFileSync(dir+'packet20-kavernom-author-manifest.json'))
assert.equal(KAVERNOM_LESSON.goals.length,5)
let feedback=0,count=0
for(const lang of ['de','en','fa']){
 const qs=KAVERNOM_QUESTIONS[lang];assert.equal(qs.length,12)
 for(const q of qs){assert.deepEqual(QUESTION_BANK[lang].filter(x=>x.id===q.id),[q]);assert.equal(q.correct,'A');assert.equal(new Set(q.options.map(o=>o.text)).size,4);for(const o of q.options)if(o.id!==q.correct){assert.ok(q.wrongExplanations[o.id]);feedback++}assert.ok(q.source);count++}
 const goalIDs=new Set(KAVERNOM_ROUTE_COVERAGE.learningGoals.flatMap(g=>g.questionIds).map(id=>id.replace('-de-',`-${lang}-`)))
 for(const q of qs)assert.ok(goalIDs.has(q.id))
}
assert.equal(KAVERNOM_FLASHCARDS.length,15)
for(const c of KAVERNOM_FLASHCARDS){assert.deepEqual(FLASHCARDS.filter(x=>x.id===c.id),[c]);for(const lang of ['de','en','fa'])for(const field of ['front','answer','explanation'])assert.ok(c[field][lang]);count++}
assert.equal(feedback,108)
assert.equal(KAVERNOM_FLASHCARDS[1].category.en,'MRI')
assert.equal(KAVERNOM_FLASHCARDS[1].category.fa,'ام‌آر‌آی')
assert.match(KAVERNOM_QUESTIONS.fa[1].question,/سوسپتیبیلیتی/)
assert.match(KAVERNOM_FLASHCARDS[2].answer.fa,/سوسپتیبیلیتی/)
const page=fs.readFileSync('app/gehirn/vaskulaer/kavernom/page.js','utf8')
assert.ok(page.includes("question.id.endsWith('-11')"))
assert.ok(page.includes('question={(KAVERNOM_QUESTIONS[lang]'))
assert.equal(manifest.scope.localizedQuestionObjects,36)
console.log(`PASS ${count}actual canonical/global Kavernom payloads,108specific feedback fields,5goal coverage groups,corrected locale labels and canonicalQ11 inline consumer.`)
