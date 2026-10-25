import assert from 'node:assert/strict'
import {QUESTION_BANK,getQuestionSetVersion,getQuestionSetRevision,getQuestionsForIds} from '../data/questions.js'
import {canonicalAssessmentId} from '../lib/assessmentIdentity.js'
import {selectedAssessmentVersion} from '../lib/assessmentContentVersion.js'
const target=QUESTION_BANK.de.find(q=>q.tags.includes('mamma-mrt-basics'))
const unrelated=QUESTION_BANK.de.find(q=>!q.tags.includes('mamma-mrt-basics'))
const original={correct:target.correct,question:unrelated.question}
const before=getQuestionSetVersion(['mamma-mrt-basics'])
const explicitBefore=getQuestionSetVersion([], [target.id])
try{
  target.correct=target.correct==='A'?'B':'A'
  assert.notEqual(getQuestionSetVersion(['mamma-mrt-basics']),before,'A revised key must not reuse persisted answers')
  assert.notEqual(getQuestionSetVersion([], [target.id]),explicitBefore,'Explicit exam selections must also invalidate a changed key')
  target.correct=original.correct
  assert.equal(getQuestionSetVersion(['mamma-mrt-basics']),before)
  unrelated.question+=' Test-only revision'
  assert.equal(getQuestionSetVersion(['mamma-mrt-basics']),before,'Unrelated revisions must not reset this topic')
  assert.equal(getQuestionSetVersion([], [target.id]),explicitBefore,'An unrelated revision must preserve the explicit selection')
}finally{target.correct=original.correct;unrelated.question=original.question}
for(const lang of ['en','fa']){
 const translated=getQuestionsForIds([target.id],lang)[0],text=translated.options[0].text
 try{
  translated.options[0].text+=' test-only correction'
  assert.notEqual(getQuestionSetVersion([], [target.id]),explicitBefore,`${lang}-only correction must invalidate the selection`)
 }finally{translated.options[0].text=text}
 assert.equal(getQuestionSetVersion([], [target.id]),explicitBefore)
}
// Same selected content keeps the exact legacy seed; other topics may change.
const legacy=[{id:'a-de',tags:['one'],fingerprint:'original'},{id:'b-de',tags:['two'],fingerprint:'original'}]
const revised=[legacy[0],{...legacy[1],fingerprint:'revised'}]
assert.equal(selectedAssessmentVersion(revised,['one']),selectedAssessmentVersion(legacy,['one']))
assert.notEqual(selectedAssessmentVersion(revised,['two']),selectedAssessmentVersion(legacy,['two']))
assert.equal(getQuestionSetRevision([],[]),null)
// Every current retry/profile ID must round-trip, including suffix-locale MSK IDs.
for(const lang of ['de','en','fa']){
 const localized=getQuestionsForIds(QUESTION_BANK.de.map(q=>q.id),lang)
 assert.deepEqual(localized.map(q=>canonicalAssessmentId(q.id)),QUESTION_BANK.de.map(q=>q.id))
}
assert.equal(canonicalAssessmentId('rk-fettkissen-1-en'),'rk-fettkissen-1-de')
console.log('Changed assessment keys invalidate only affected saved quiz sessions.')
