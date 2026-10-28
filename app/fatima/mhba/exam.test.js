import {test} from 'node:test';
import assert from 'node:assert/strict';
import {scoreStatements,statements,nextReview} from './exam.js';
import {statementTranslations,explanationsDe} from './statementTranslations.js';
import {createLessons} from './course.js';
import {validateFatimaMhbaMaterials} from '../../../lib/fatimaMhbaSchema.js';
import {extraChapterPractice} from './chapterPractice.js';
import {chapters} from './studyContent.js';
const toFa=s=>s.replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[Number(d)]);
const materials=Object.fromEntries([1,2,5].map(n=>[n,{tables:n===5?Object.fromEntries(['table-5-1','table-5-2'].map(id=>[id,{head:['معیار','مقدار'],rows:[['نمونه','ترجمه']]}])):undefined,pages:Array.from({length:({1:45,2:48,5:46})[n]},(_,i)=>{
 const headings=chapters[n].filter(c=>c.id!=='intro'&&c.start===i+1);
 return {number:i+1,text:'Synthetic source page '+(i+1)+'\n'+headings.map(c=>c.id==='literatur'?'Literaturverzeichnis:':c.id==='fragen'?'Kontrollfragen:':c.id+'. Synthetic heading').join('\n')+'\nSynthetic paragraph.',fa:'صفحهٔ مصنوعی\n'+headings.map(c=>c.id==='literatur'?'فهرست منابع':c.id==='fragen'?'سؤال‌های کنترلیِ خود جزوه':toFa(c.id)+'. عنوان مصنوعی').join('\n')+'\nپاراگراف مصنوعی.'};
}),questions:Array.from({length:10},(_,i)=>({id:n+'.'+(i+1),official:true,text:'Synthetic control question '+(i+1),fa:'سؤال رسمی',officialAnswer:'Synthetic official answer',officialAnswerFa:'پاسخ رسمی فارسی'}))}]));
const lessons=createLessons(materials);
test('chapter fragments cover every original German and Persian character exactly once',()=>{
 for(const lesson of Object.values(lessons)){
  for(const page of lesson.pages){const parts=lesson.chunks.filter(c=>c.page===page.number);assert.equal(parts.map(c=>c.text).join(''),page.text);assert.equal(parts.map(c=>c.fa).join(''),page.fa);}
  assert.ok(lesson.chapters.every(c=>c.summary.de.length&&c.summary.de.length===c.summary.fa.length));
 }
});
test('chapter practice uses only valid binary statements and every statement has a Persian translation',()=>{
 for(const lesson of Object.values(lessons)){
  assert.equal(statements[lesson.id].length,statementTranslations[lesson.id].length);
  assert.equal(statements[lesson.id].length,explanationsDe[lesson.id].length);
  assert.ok(Object.entries(extraChapterPractice).filter(([key])=>key.startsWith(lesson.id+':')).flatMap(([,qs])=>qs).every(q=>typeof q.answer==='boolean'&&q.fa&&q.whyDe&&q.why));
  assert.ok(statements[lesson.id].every((s,i)=>typeof s.answer==='boolean'&&statementTranslations[lesson.id][i].length>10));
  for(const chapter of lesson.chapters)assert.ok(chapter.statementIds.every(i=>statements[lesson.id][i]));
 }
});
test('authored cards include official questions with exact full answers, concepts and vocabulary',()=>{
 for(const lesson of Object.values(lessons)){
  assert.equal(lesson.cards.filter(c=>c.official).length,10);
  assert.ok(lesson.cards.some(c=>c.source==='concept'));
  assert.ok(lesson.cards.some(c=>c.source==='vocabulary'));
  assert.equal(new Set(lesson.cards.map(c=>c.id)).size,lesson.cards.length);
  assert.equal(lesson.cards[0].model,lesson.questions[0].officialAnswer);
  assert.equal(lesson.cards[0].modelFa,lesson.questions[0].officialAnswerFa);
 }
});
test('wrong answers deduct a point and blank answers remain neutral, including negative totals',()=>{
 const qs=[{answer:true},{answer:false},{answer:true}];
 assert.deepEqual(scoreStatements(qs,{0:true,1:true}),{correct:1,wrong:1,blank:1,score:0});
 assert.equal(scoreStatements(qs,{0:false,1:true,2:false}).score,-3);
 for(const qs of Object.values(statements))assert.equal(scoreStatements(qs,Object.fromEntries(qs.map((q,i)=>[i,q.answer]))).score,qs.length);
});
test('recall failures return in ten minutes and success keeps existing spaced-review schedules',()=>{
 const now=1000000;assert.equal(nextReview(null,false,now).due,now+600000);
 const first=nextReview(null,true,now);assert.equal(first.due,now+86400000);assert.equal(nextReview(first,true,now).due,now+3*86400000);
});

test('private payload validation refuses missing translations or changed page/question numbering',()=>{
 assert.equal(validateFatimaMhbaMaterials(materials),materials);
 const partial=structuredClone(materials);partial[2].pages[30].fa='';
 assert.throws(()=>validateFatimaMhbaMaterials(partial),/bilingual/);
 const missingTable=structuredClone(materials);delete missingTable[5].tables['table-5-2'];assert.throws(()=>validateFatimaMhbaMaterials(missingTable),/table/);
 const wrong=structuredClone(materials);wrong[1].questions[0].id='2.1';
 assert.throws(()=>validateFatimaMhbaMaterials(wrong),/questions/);
});
