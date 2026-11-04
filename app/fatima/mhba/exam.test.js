import {test} from 'node:test';
import assert from 'node:assert/strict';
import {scoreStatements,statements,nextReview} from './exam.js';
import {statementTranslations,explanationsDe} from './statementTranslations.js';
import {createLessons} from './course.js';
import {validateFatimaMhbaMaterials} from '../../../lib/fatimaMhbaSchema.js';
import {extraChapterPractice} from './chapterPractice.js';
import {chapters} from './studyContent.js';
const toFa=s=>s.replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[Number(d)]);
const tableIds={4:['table-4-1','table-4-2','table-4-3'],5:['table-5-1','table-5-2'],6:['table-6-1','table-6-2','table-6-3','table-6-4'],7:['table-7-1','table-7-2','table-7-3','table-7-4','table-7-5','table-7-6','table-7-7','table-7-question','table-7-answer'],8:['table-8-1','table-8-2','figure-8-1','figure-8-4','figure-8-9','figure-8-10','table-8-answer-5']};
const heading=(c,lang)=>c.sourceHeadings?.[lang]||(c.id==='literatur'?(lang==='de'?'Literaturverzeichnis:':'فهرست منابع'):c.id==='fragen'?(lang==='de'?'Kontrollfragen:':'سؤال‌های کنترلیِ خود جزوه'):(lang==='de'?(c.sourceId||c.id):toFa(c.sourceId||c.id))+'. Synthetic heading');
const materials=Object.fromEntries([1,2,4,5,6,7,8].map(n=>[n,{tables:tableIds[n]?Object.fromEntries(tableIds[n].map(id=>[id,{head:['معیار','مقدار'],rows:[['نمونه','ترجمه']]}])):undefined,pages:Array.from({length:({1:45,2:48,4:53,5:46,6:48,7:41,8:48})[n]},(_,i)=>{
 const headings=chapters[n].filter(c=>c.id!=='intro'&&c.start===i+1);
 return {number:i+1,text:'Synthetic source page '+(i+1)+'\n'+headings.map(c=>heading(c,'de')).join('\n')+'\nSynthetic paragraph.',fa:'صفحهٔ مصنوعی\n'+headings.map(c=>heading(c,'fa')).join('\n')+'\nپاراگراف مصنوعی.'};
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


test('lesson 6 makes every authored item reachable and rejects incomplete private source or tables',()=>{
 const lesson=lessons[6];assert.equal(lesson.chapters.length,33);
 assert.deepEqual([...new Set(lesson.chapters.flatMap(c=>c.statementIds))].sort((a,b)=>a-b),Array.from({length:44},(_,i)=>i));
 assert.equal(lesson.cards.filter(c=>c.source==='official').length,10);
 const missing=structuredClone(materials);delete missing[6];assert.throws(()=>validateFatimaMhbaMaterials(missing),/Incomplete/);
 const table=structuredClone(materials);table[6].tables['table-6-4'].rows[0]=['incomplete'];assert.throws(()=>validateFatimaMhbaMaterials(table),/table/);
 const untranslated=structuredClone(materials);untranslated[6].questions[9].officialAnswerFa='';assert.throws(()=>validateFatimaMhbaMaterials(untranslated),/questions/);
});

test('lesson 7 keeps ABC input available before revealing answers and covers every practice item',()=>{
 const lesson=lessons[7];assert.equal(lesson.chapters.length,26);
 assert.deepEqual([...new Set(lesson.chapters.flatMap(c=>c.statementIds))].sort((a,b)=>a-b),Array.from({length:46},(_,i)=>i));
 const abc=lesson.cards.find(c=>c.id==='7.7');assert.equal(abc.questionTable,materials[7].tables['table-7-question']);assert.equal(abc.answerTable,materials[7].tables['table-7-answer']);
 const missing=structuredClone(materials);delete missing[7];assert.throws(()=>validateFatimaMhbaMaterials(missing),/Incomplete/);
 const table=structuredClone(materials);delete table[7].tables['table-7-question'];assert.throws(()=>validateFatimaMhbaMaterials(table),/table/);
 const untranslated=structuredClone(materials);untranslated[7].questions[9].officialAnswerFa='';assert.throws(()=>validateFatimaMhbaMaterials(untranslated),/questions/);
});

test('lesson 8 preserves diagram-only answers, calculations and its nonstandard bibliography heading',()=>{
 const lesson=lessons[8];assert.equal(lesson.chapters.length,32);
 assert.deepEqual([...new Set(lesson.chapters.flatMap(c=>c.statementIds))].sort((a,b)=>a-b),Array.from({length:54},(_,i)=>i));
 for(const id of ['8.2','8.5','8.9','8.10'])assert.ok(lesson.questions.find(q=>q.id===id).figure);
 assert.equal(lesson.questions.find(q=>q.id==='8.5').answerTable,materials[8].tables['table-8-answer-5']);
 assert.equal(lesson.chapters.find(c=>c.id==='literatur').start,47);
 const missing=structuredClone(materials);delete missing[8];assert.throws(()=>validateFatimaMhbaMaterials(missing),/Incomplete/);
 const untranslated=structuredClone(materials);untranslated[8].questions[1].officialAnswerFa='';assert.throws(()=>validateFatimaMhbaMaterials(untranslated),/questions/);
 const heading=structuredClone(materials);heading[8].pages[46].fa='عنوان نامرتبط';assert.throws(()=>createLessons(heading),/Missing fa source chapter/);
});
