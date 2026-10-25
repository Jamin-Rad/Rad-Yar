import assert from 'node:assert/strict'
import {lessonCheckFeedback} from '../lib/lessonCheckFeedback.js'
import {abdomenThoraxAssessmentDrafts} from '../data/abdomenThoraxAssessmentDrafts.js'

// Two real canonical checks use letter-keyed wrong rationales. The inline
// consumer must show the chosen alternative's rationale rather than the answer.
for(const id of ['abdomen-pancreatic-cysts','abdomen-appendizitis']){
 const source=abdomenThoraxAssessmentDrafts[id]
 const check={...source,explanation:source.rationale}
 assert.equal(lessonCheckFeedback(check,check.answer),source.rationale)
 for(let index=0;index<check.options.length;index++){
  if(index===check.answer)continue
  const expected=source.wrongExplanations['ABCD'[index]]
  assert.ok(expected)
  assert.equal(lessonCheckFeedback(check,index),expected)
  for(const lang of ['de','en','fa'])assert.ok(expected[lang]?.trim())
 }
}
const correct={de:'Richtig erklärt',en:'Correct rationale',fa:'توضیح پاسخ درست'}
const selected={de:'Diese Auswahl erklärt',en:'Selected-option rationale',fa:'توضیح گزینهٔ انتخاب‌شده'}
const unused={de:'Andere Auswahl',en:'Another alternative',fa:'گزینهٔ دیگر'}
assert.equal(lessonCheckFeedback({answer:1,explanation:correct,optionFeedback:[selected,correct,unused]},0),selected)
assert.equal(lessonCheckFeedback({answer:1,explanation:correct,wrongFeedback:{0:selected}},0),selected)
assert.equal(lessonCheckFeedback({answer:1,explanation:correct,wrongFeedback:{0:selected}},1),correct)
assert.equal(lessonCheckFeedback({answer:1,explanation:correct},0),correct)
assert.equal(lessonCheckFeedback({answer:1,explanation:correct},null),null)
assert.equal(lessonCheckFeedback({answer:1,explanation:correct},undefined),null)
console.log('Inline checks resolve selected-option rationales for all three existing formats; legacy and unanswered checks retain their behavior.')
