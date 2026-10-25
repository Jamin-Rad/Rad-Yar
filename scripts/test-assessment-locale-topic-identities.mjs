import assert from 'node:assert/strict'
import {QUESTION_BANK,getQuestionsForIds,getQuestionSetVersion} from '../data/questions.js'
import {canonicalAssessmentId} from '../lib/assessmentIdentity.js'

// A locale-looking topic token must not be rewritten as the question locale.
const id='aq-msk-de-quervain-de-provocation-study-limit'
for(const lang of ['en','fa']){
 const [question]=getQuestionsForIds([id],lang)
 assert.equal(question.id,`aq-msk-de-quervain-${lang}-provocation-study-limit`)
 const previous=getQuestionSetVersion([], [id]),text=question.options[0].text
 try{
  question.options[0].text+=' locale identity regression probe'
  assert.notEqual(getQuestionSetVersion([], [id]),previous,`${lang}-only change must invalidate the matching saved selection`)
 }finally{question.options[0].text=text}
}

// Exercise every real middle/trailing ID, not only the new collision fixture.
const ids=QUESTION_BANK.de.map(q=>q.id)
for(const lang of ['en','fa']){
 const actual=new Map(QUESTION_BANK[lang].map(q=>[canonicalAssessmentId(q.id),q]))
 assert.equal(actual.size,QUESTION_BANK[lang].length,'Canonical locale identity must remain unique')
 const translated=getQuestionsForIds(ids,lang)
 assert.equal(translated.length,ids.length)
 for(let i=0;i<ids.length;i++){
  assert.ok(actual.has(ids[i]),`${lang} missing counterpart ${ids[i]}`)
  assert.strictEqual(translated[i],actual.get(ids[i]),`${lang} silently fell back or selected another topic: ${ids[i]}`)
 }
}
console.log(`Locale-looking topic names preserved; ${ids.length} actual question counterparts per language resolve in order and translated changes invalidate the correct selection.`)
