import {test} from 'node:test';
import assert from 'node:assert/strict';
import {atomicCards} from './flashcardContent.js';
import {buildFlashcards,studyCards} from './flashcards.js';
import {chapters} from './studyContent.js';
import {buildLessonPractice} from './customExam.js';
import {createReviewQueue} from './reviewQueue.js';
import {initialCardSession,limitSession,reduceCardSession} from './flashcardSession.js';
import {scheduleCard} from './leitner.js';
const words=t=>t.trim().split(/\s+/).length;
function fixture(id){return {id,chapters:chapters[id],cards:[
 ...Array.from({length:10},(_,i)=>({id:`${id}.${i+1}`,source:'official',official:true,model:'Full original answer. '.repeat(100),modelFa:'پاسخ کامل'})),
 ...chapters[id].filter(c=>!['intro','literatur','fragen'].includes(c.id)).map(c=>({id:`concept-${id}-${c.id}`,source:'concept'})),
 ...Array.from({length:id===1?38:28},(_,i)=>({id:`word-${id}-${i}`,source:'vocabulary',text:'term',fa:'واژه',modelFa:'معنی واژه'})),
]};}

test('lessons 1, 4 and 5 cover all ten source questions with short bilingual recall units',()=>{
 for(const id of [1,4,5]){
  const cards=atomicCards[id];
  assert.equal(new Set(cards.map(c=>c.id)).size,cards.length);
  for(let q=1;q<=10;q++)assert.ok(cards.some(c=>c.sourceQuestionId===`${id}.${q}`));
  for(const c of cards){
   assert.ok(c.text&&c.fa&&c.model&&c.modelFa,c.id);
   assert.ok(words(c.model)<=20,`${c.id}: answer should fit one thought`);
   assert.ok(words(c.modelFa)<=35,`${c.id}: Persian answer too long`);
   assert.ok(words(c.text)<=24,`${c.id}: prompt too broad`);
   assert.ok(!/Kernaussagen/.test(c.text),'no whole-chapter summaries');
   assert.equal(!!c.contextDe,!!c.contextFa,c.id);
  }
 }
});
test('existing card IDs and review schedules survive; full official exam answers stay intact',()=>{
 for(const id of [1,5]){
  const lesson=fixture(id),original=structuredClone(lesson.cards),flashcards=buildFlashcards(lesson);
  assert.deepEqual(lesson.cards,original);
  const ids=new Set(flashcards.map(c=>c.id));assert.equal(ids.size,flashcards.length);
  assert.ok(lesson.cards.every(c=>ids.has(c.id)),'all old IDs retained');
  assert.ok(flashcards.every(c=>c.atomic&&!c.official&&c.model&&words(c.model)<=20));
  lesson.flashcards=flashcards;assert.equal(studyCards(lesson),flashcards);
  const practice=buildLessonPractice({[id]:lesson},[id],'official');assert.equal(practice.length,10);assert.equal(practice[0].model,original[0].model);
  const review={[`${id}.1`]:{box:3,due:1234}};
  assert.deepEqual(createReviewQueue(flashcards,review,true,1500).find(c=>c.id===`${id}.1`).priorReview,review[`${id}.1`]);
 }
 const legacy={cards:[{id:'2.1'}]};assert.equal(buildFlashcards(legacy),legacy.cards);
});
test('lesson 5 calculation cards label the old model and preserve its exact arithmetic',()=>{
 const cards=atomicCards[5];assert.match(cards.find(c=>c.id==='5.9').contextDe,/keine heutige/);
 assert.match(cards.find(c=>c.id==='fc-5.9-old-rule').model,/Nein/);
 assert.equal(20000*.04,800);assert.equal(100000-2*25000-4*800,46800);assert.equal(46800/4,11700);assert.equal(2*37500+2*12500,100000);
 assert.match(cards.find(c=>c.id==='fc-5.9-totals').model,/37.500/);
});
const deck=[{id:'a'},{id:'b'},{id:'c'}];
const act=(s,a)=>reduceCardSession(s,a,deck);
test('navigation and flipping do not grade, and the answer must be revealed before rating',()=>{
 let s=initialCardSession;assert.equal(act(s,{type:'rate',known:true}),s);
 s=act(s,{type:'flip'});s=act(s,{type:'move',direction:1});assert.equal(s.position,1);assert.equal(s.revealed,false);assert.deepEqual(s.ratings,{});
 assert.equal(act({...s,position:2},{type:'move',direction:1}).position,2);
});
test('rating advances once, unknown is a real grade, and skipped cards are revisited',()=>{
 let s=act(initialCardSession,{type:'move',direction:1});s=act(s,{type:'flip'});s=act(s,{type:'rate',known:false});assert.equal(s.position,2);assert.equal(s.ratings.b,false);
 s=act(s,{type:'move',direction:-1});s=act(s,{type:'flip'});assert.equal(act(s,{type:'rate',known:true}),s,'must not overwrite a previous unknown grade');
 s=act(s,{type:'move',direction:1});s=act(s,{type:'flip'});s=act(s,{type:'rate',known:true});assert.equal(s.position,0,'go back to skipped card');
 s=act(s,{type:'flip'});s=act(s,{type:'rate',known:true});assert.equal(s.done,true);assert.equal(Object.keys(s.ratings).length,3);
});
test('short sessions cap workload without changing due order or Leitner intervals',()=>{
 const cards=Array.from({length:30},(_,i)=>({id:String(i),source:'concept'}));const review={'4':{box:2,due:100},'8':{box:1,due:50}};
 const queue=createReviewQueue(cards,review,false,1000);assert.deepEqual(limitSession(queue,'10').slice(0,2).map(c=>c.id),['8','4']);
 assert.equal(limitSession(queue,'10').length,10);assert.equal(limitSession(queue,'20').length,20);assert.equal(limitSession(queue,'all').length,30);
 assert.equal(scheduleCard(undefined,false,1000).due,601000);assert.equal(scheduleCard({box:2},true,1000).due,1000+7*86400000);
});
