import {test} from 'node:test';
import assert from 'node:assert/strict';
import {lesson4Chapters,lesson4Vocabulary} from './lesson4.js';
import {lesson4Practice} from './lesson4Practice.js';
import {lesson4Flashcards} from './lesson4Flashcards.js';
import {lesson4Notes} from './lesson4Audit.js';
import {createSourceChapters} from './sourceChapters.js';
import {sourceFigures,answerFigures} from './sourceFigures.js';
import {buildFlashcards} from './flashcards.js';
import {buildLessonPractice} from './customExam.js';

test('source aliases and missing terminal dots preserve every source character and logical chapter order',()=>{
 const specs=[{id:'intro'},{id:'4.1.8.3'},{id:'4.1.8.4',sourceId:'4.1.5.4'}];
 const pages=[{number:1,text:'Cover',fa:'جلد'},{number:2,text:'Contents',fa:'فهرست'},{number:3,text:'4.1.8.3 Exkurs\n\nBody\n\n4.1.5.4 Recommendations\n\nEnd',fa:'۴.۱.۸.۳. گفتار\n\nمتن\n\n۴.۱.۵.۴. توصیه‌ها\n\nپایان'}];
 const chunks=createSourceChapters(pages,specs).flatMap(c=>c.chunks);
 for(const page of pages)for(const [lang,key] of [['de','text'],['fa','fa']])assert.equal(chunks.filter(c=>c.page===page.number).map(c=>c[key]).join(''),page[key]);
 assert.ok(chunks.some(c=>c.chapterId==='4.1.8.4'&&c.text.startsWith('4.1.5.4')));
});
test('all lesson 4 binary items are reachable once and include bilingual statements and explanations',()=>{
 const lesson={id:4,chapters:lesson4Chapters,cards:[]};
 const items=buildLessonPractice({4:lesson},[4],'binary');
 assert.equal(items.length,48);assert.equal(new Set(items.map(q=>q.id)).size,48);
 const indexes=lesson4Chapters.flatMap(c=>c.statementIds);assert.equal(new Set(indexes).size,lesson4Practice.length);
 for(const q of items)assert.ok(typeof q.answer==='boolean'&&q.text&&q.fa&&q.whyDe&&q.why&&!q.official);
});
test('lesson 4 recall units cover every original question, are atomic and cannot replace full official responses',()=>{
 const originals=Array.from({length:10},(_,i)=>({id:`4.${i+1}`,source:'official',official:true,model:'Full private official answer',modelFa:'پاسخ کامل'}));
 const words=lesson4Vocabulary.map((v,i)=>({id:`word-4-${i}`,source:'vocabulary',text:v[0],modelFa:v[1]}));
 const lesson={id:4,chapters:lesson4Chapters,cards:[...originals,...words]};
 const before=structuredClone(lesson.cards),deck=buildFlashcards(lesson);
 assert.deepEqual(lesson.cards,before);assert.equal(new Set(deck.map(c=>c.id)).size,deck.length);
 for(const q of originals)assert.ok(lesson4Flashcards.some(c=>c.sourceQuestionId===q.id));
 for(const c of deck){assert.ok(c.atomic&&!c.official&&c.model&&c.modelFa);assert.ok(c.model.split(/\s+/).length<=20);assert.ok(c.modelFa.split(/\s+/).length<=35);}
 assert.equal(buildLessonPractice({4:lesson},[4],'official')[0].model,'Full private official answer');
});
test('lesson 4 retains all source and official solution visuals and flags obsolete insolvency rules',()=>{
 assert.equal(sourceFigures[4].filter(f=>f.id.startsWith('figure')).length,5);
 assert.equal(sourceFigures[4].filter(f=>f.id.startsWith('table')).length,3);
 for(const id of ['4.5','4.8','4.9','4.10'])assert.ok(answerFigures[id]?.file.startsWith('lesson-4-'));
 const duration=lesson4Notes.find(n=>n.id==='current-duration');assert.ok(duration.questions.includes('4.5'));assert.match(duration.de,/drei Jahre/);assert.match(duration.de,/nicht erforderlich/);
 assert.equal(lesson4Practice.find(q=>q.text.includes('Mindesttilgung von 35')).answer,false);
 assert.equal(lesson4Practice.find(q=>q.text.includes('24 Monate')).answer,true);
});
