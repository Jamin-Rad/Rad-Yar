// Protect the actual central producers and inline consumer after shared integration.
import fs from 'node:fs'
import assert from 'node:assert/strict'
import {QUESTION_BANK} from '../data/questions.js'
import {FLASHCARDS} from '../data/flashcards.js'
import {hccPhaseCheck} from '../data/assessmentQuality/atvLiver.js'
const accepted=JSON.parse(fs.readFileSync('docs/lesson-quality/remediation-2026-10-25/abdomen-technik/packet06-independent-after.json','utf8')).actualPayload
let n=0
for(const lang of ['de','en','fa']){
 for(const question of accepted.questions[lang]){assert.deepEqual(QUESTION_BANK[lang].find(q=>q.id===question.id),question,question.id);n++}
 assert.deepEqual(QUESTION_BANK[lang].find(q=>q.id===hccPhaseCheck[lang].id),hccPhaseCheck[lang],lang+' actual inline HCC phase question')
}
for(const card of accepted.cards){assert.deepEqual(FLASHCARDS.find(c=>c.id===card.id),card,card.id);n++}
assert.equal(n,94)
console.log('All94 independently accepted liver assessment payloads and actual inline HCC phase questions match central producers.')
