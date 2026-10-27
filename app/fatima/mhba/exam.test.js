import {test} from 'node:test';
import assert from 'node:assert/strict';
import {scoreStatements,statements,examQuestions,writtenTotal,nextReview} from './exam.js';
import {createLessons} from './course.js';
const materials=Object.fromEntries([1,2].map(n=>[n,{pages:[],questions:Array.from({length:10},(_,i)=>({id:n+'.'+(i+1),official:true,text:'Synthetic control question '+(i+1),officialAnswer:'Synthetic official answer for integration testing without publishing private course material.'}))}]));
const lessons=createLessons(materials);
test('first-semester exam has exactly 40 binary statements and seven written choices per lesson',()=>{
 for(const lesson of Object.values(lessons)){
  assert.equal(statements[lesson.id].length,40);
  assert.equal(examQuestions(lesson).length,7);
  assert.equal(lesson.questions.length,10);
  assert.ok(lesson.questions.every(q=>q.official&&q.officialAnswer.length>40));
  assert.ok(statements[lesson.id].every(q=>typeof q.answer==='boolean'&&q.why.length>10));
 }
});
test('wrong answers deduct a point and omitted answers are neutral, including negative totals',()=>{
 const qs=[{answer:true},{answer:false},{answer:true}];
 assert.deepEqual(scoreStatements(qs,{0:true,1:true}),{correct:1,wrong:1,blank:1,score:0});
 assert.equal(scoreStatements(qs,{0:false,1:true,2:false}).score,-3);
 for(const qs of Object.values(statements))assert.equal(scoreStatements(qs,Object.fromEntries(qs.map((q,i)=>[i,q.answer]))).score,40);
});
test('written grade only includes selected questions and clamps individual grades',()=>{
 assert.equal(writtenTotal(['a','b'],{a:20,b:-2,c:10}),10);
});
test('recall failures return in ten minutes, successful recall increases spacing',()=>{
 const now=1000000;
 assert.equal(nextReview(null,false,now).due,now+600000);
 const first=nextReview(null,true,now);
 assert.equal(first.due,now+86400000);
 assert.equal(nextReview(first,true,now).due,now+3*86400000);
});
