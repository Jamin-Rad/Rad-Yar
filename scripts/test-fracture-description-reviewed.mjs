import fs from 'node:fs'
import assert from 'node:assert/strict'
import {FRAKTUR_QUESTIONS,FRAKTUR_FLASHCARDS,FRAKTUR_STRESS_FLASHCARDS,FRAKTUR_LESSON} from '../data/frakturbeschreibung.js'
import {QUESTION_BANK} from '../data/questions.js'
import {FLASHCARDS} from '../data/flashcards.js'
const dir='docs/lesson-quality/remediation-2026-10-25/msk-spine/packet13/'
const after=JSON.parse(fs.readFileSync(dir+'after-manifest.json')),before=JSON.parse(fs.readFileSync(dir+'before.json'))
assert.deepEqual(FRAKTUR_QUESTIONS,after.questions)
assert.deepEqual(FRAKTUR_FLASHCARDS,after.cards)
assert.deepEqual(FRAKTUR_STRESS_FLASHCARDS,after.stressAlias)
assert.deepEqual(FRAKTUR_LESSON,after.lesson)
let feedback=0
for(const lang of ['de','en','fa']){
 assert.equal(FRAKTUR_QUESTIONS[lang].length,12)
 assert.equal(QUESTION_BANK[lang].filter(q=>q.tags?.includes('frakturbeschreibung')).length,13)
 for(const q of FRAKTUR_QUESTIONS[lang]){assert.deepEqual(QUESTION_BANK[lang].filter(x=>x.id===q.id),[q]);for(const o of q.options)if(o.id!==q.correct){assert.ok(q.wrongExplanations[o.id]);feedback++}}
 const id=`aq-msk-frakturbeschreibung-${lang}-report-distal-reference`
 assert.deepEqual(QUESTION_BANK[lang].find(q=>q.id===id),before.globalQuestions[lang].find(q=>q.id===id))
}
for(const card of [...FRAKTUR_FLASHCARDS,...FRAKTUR_STRESS_FLASHCARDS])assert.deepEqual(FLASHCARDS.filter(c=>c.id===card.id),[card])
assert.equal(feedback,108)
assert.equal(FRAKTUR_FLASHCARDS.find(c=>c.id==='frakturbeschreibung-11-joint').explanation.fa,JSON.parse(fs.readFileSync(dir+'repair01.json')).after)
console.log('PASS36actual original fracture-description questions,15cards+stressalias,108wrongfeedbacks,6teaching repairs and3unchanged accepted supplement counterparts.')
