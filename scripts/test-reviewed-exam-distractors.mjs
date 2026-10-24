import assert from 'node:assert/strict'
import fs from 'node:fs'
import {createRequire} from 'node:module'
import {transformSync} from 'esbuild'
import {completeExamOptions} from '../data/reviewedExamDistractors.js'
import {QUESTION_BANK} from '../data/questions.js'
const fixture={id:'flc-de-scar',options:[{id:'A',text:'First'},{id:'B',text:'Second'},{id:'C',text:'Third'}],correct:'B',explanation:'Original explanation',wrongExplanations:{A:'First is wrong',C:'Third is wrong'}}
const out=completeExamOptions({de:[fixture]}).de[0]
assert.equal(fixture.options.length,3,'source local decision remains unchanged')
assert.equal(out.options.length,4);assert.equal(out.correct,fixture.correct);assert.equal(out.explanation,fixture.explanation)
assert.deepEqual(out.options.slice(0,3),fixture.options);assert.ok(out.wrongExplanations.D.length>20)
assert.equal(completeExamOptions({de:[out]}).de[0],out,'idempotent for already-four-option questions')
const unmapped={...fixture,id:'unmapped-de'};assert.equal(completeExamOptions({de:[unmapped]}).de[0],unmapped,'never fabricate filler for unmapped content')
const require=createRequire(import.meta.url)
const module={exports:{}}
const code=transformSync(fs.readFileSync('lib/exams.js','utf8'),{loader:'js',format:'cjs'}).code
new Function('require','module','exports',code)(name=>name==='@/utils/examMedia'?{normalizeExamMedia:()=>null}:require(name),module,module.exports)
for(const lang of ['de','en','fa']){
 const bank=QUESTION_BANK[lang].filter(q=>/^(spinale-leptomeningitis|neuroborreliose-spinal|wirbelsaeulentuberkulose|paravertebraler-abszess|epiduraler-abszess|spinale-tumoren-grundlagen|spinale-arachnoiditis|guillain-barre-syndrom|funikulaere-myelose|rippenpathologien|akute-le|flc-|li-rads-)/.test(q.id))
 assert.equal(bank.length,17)
 for(const q of bank){
  assert.equal(q.options.length,4);assert.equal(new Set(q.options.map(o=>o.id)).size,4)
  assert.equal(new Set(q.options.map(o=>o.text)).size,4);assert.ok(q.wrongExplanations.D)
  const result=module.exports.validateExamInput({title:'Lesson QA',organizerName:'RadYar',language:lang,durationMinutes:10,activeDurationMinutes:60,questions:[{prompt:q.question,options:q.options.map(o=>o.text),correctOptionIndex:q.options.findIndex(o=>o.id===q.correct),explanation:q.explanation,wrongExplanations:q.wrongExplanations}]})
  assert.ok(result.value,result.error)
 }
}
console.log('Reviewed exam distractors PASS: 17 questions x 3 languages accepted by unchanged production exam validator; unique four choices, specific D feedback, correct answer unchanged, no source mutation or filler for unknown IDs.')
