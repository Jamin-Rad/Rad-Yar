import test from 'node:test'
import assert from 'node:assert/strict'
import { lessons,questions,questionMap,flashcards,categories } from './courseContent.js'
import { emptyState,readState,mergeState,startSession,currentQuestion,optionOrder,answer,advance,result,DAY,rateCard,dueCards,activeMistakes } from './courseEngine.js'
import { readFileSync, statSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { createEnglishHandlers } from '../../../lib/englishApi.js'

test('two complete B1 lessons: independent 5/15/15/5 tests, 160 prompts and 20 flashcards',()=>{
 assert.equal(lessons.length,2);assert.equal(questions.length,80);assert.equal(flashcards.length,20)
 assert.equal(new Set(questions.map(q=>q.id)).size,80)
 for(const l of lessons){
  const count=l.paragraphs.join(' ').split(/\s+/).length
  assert(count>=180&&count<=250,count);assert.equal(l.words.length,10);assert.equal(l.grammarNotes.length,3)
  for(const [category,n] of Object.entries({reading:5,vocabulary:15,grammar:15,conversation:5}))
    assert.equal(questions.filter(q=>q.lessonId===l.id&&q.category===category).length,n)
 }
 for(const q of questions){
  assert.equal(q.variants.length,2)
  assert.notDeepEqual(q.variants[0],q.variants[1])
  for(const v of q.variants){assert.equal(v.options.length,4,q.id);assert.equal(new Set(v.options).size,4,q.id);assert(v.options[v.answer]);assert(v.explanation.length>30)}
 }
 const prompts=questions.flatMap(q=>q.variants.map(v=>v.prompt+JSON.stringify(v.options)))
 assert.equal(new Set(prompts).size,160,'Every prompt is separately authored')
})

test('each lesson/category starts only its own questions and locks/scorers first answers',()=>{
 for(const l of lessons)for(const category of Object.keys(categories)){
  let s=startSession(emptyState(),{lessonId:l.id,category},1000)
  assert(s.session.ids.every(id=>questionMap[id].lessonId===l.id&&questionMap[id].category===category))
  const first=currentQuestion(s.session);s=answer(s,1,1001);assert.equal(answer(s,0),s)
  s=readState(JSON.parse(JSON.stringify(s)));assert.equal(s.session.answers[first.id],1)
  s=advance(s,1002)
  while(currentQuestion(s.session))s=advance(answer(s,0,1003),1004)
  assert.equal(result(s.session).correct,s.session.ids.length-1)
  assert.equal(s.history.length,1);assert.equal(s.history[0].category,category);assert.equal(advance(s),s)
 }
 const s=startSession(emptyState(),{category:'grammar'})
 assert(new Set(Array.from({length:15},(_,index)=>optionOrder({...s.session,index}).indexOf(0))).size>=3)
})

test('mistake review uses fresh questions, delayed graduation and tombstones for sync',()=>{
 let s=startSession(emptyState(),{category:'grammar'},1000)
 const first=currentQuestion(s.session);s=answer(s,1,1001)
 s=startSession(s,{mode:'review',category:'grammar'},1002)
 assert.notEqual(currentQuestion(s.session).prompt,first.prompt)
 s=answer(s,0,1003);assert.equal(s.mistakes[first.id].due,1003+DAY)
 s=answer(startSession(s,{mode:'review',category:'grammar'},2000),0,2001)
 assert.equal(s.mistakes[first.id].streak,1)
 const stale=structuredClone(s)
 s=answer(startSession(s,{mode:'review',category:'grammar'},DAY+2000),0,DAY+2001)
 assert.equal(activeMistakes(s).length,0)
 assert.equal(s.mistakes[first.id].resolved,true)
 assert.equal(activeMistakes(mergeState(s,stale)).length,0)
})

test('legacy pilot progress/session migrate without losing answers or mistake IDs',()=>{
 const raw={version:1,attempts:1,mistakes:{q1:{due:100,streak:0}},history:[],session:{id:'old',mode:'test',ids:['q1','q2'],index:0,variant:0,answers:{q1:1}}}
 const s=readState(raw)
 assert.equal(s.version,2);assert.equal(s.session.lessonId,'b1-01');assert.equal(s.session.answers.q1,1)
 assert.equal(activeMistakes(s).length,1);assert.equal(mergeState(s,emptyState()).session.id,'old')
 assert.equal(readState({...raw,session:{...raw.session,index:9}}).session,null)
 assert.deepEqual(readState({version:88}),emptyState())
})

test('flashcards schedule known/again and early practice cannot increase interval',()=>{
 let s=rateCard(emptyState(),'b1-02-word-0',true,1000)
 assert.equal(s.cards['b1-02-word-0'].due,1000+DAY)
 assert.equal(rateCard(s,'b1-02-word-0',true,2000),s)
 assert.equal(dueCards(s,'b1-02',2000).length,9)
 s=rateCard(s,'b1-02-word-0',true,1000+DAY)
 assert.equal(s.cards['b1-02-word-0'].due,1000+4*DAY)
 s=rateCard(s,'b1-02-word-0',false,1001+DAY)
 assert.equal(s.cards['b1-02-word-0'].box,0);assert.equal(s.cards['b1-02-word-0'].due,1001+DAY+600000)
})

test('merging two devices preserves unrelated cards, mistakes and history',()=>{
 let a=rateCard(emptyState(),'b1-01-word-0',true,1000)
 let b=rateCard(emptyState(),'b1-02-word-0',false,2000)
 const merged=mergeState(a,b)
 assert.equal(Object.keys(merged.cards).length,2)
 assert.deepEqual(mergeState(merged,merged),merged)
 assert.deepEqual(readState(JSON.parse(JSON.stringify(merged))),merged)
})

test('online API enforces session, limits input and detects stale concurrent saves',async()=>{
 let stored={state:emptyState(),revision:null},writes=0
 const storage={available:true,read:async()=>structuredClone(stored),write:async(owner,state,revision)=>{
   assert.equal(owner,'test-owner')
   if(revision!==stored.revision)return null
   writes++;stored={state,revision:'2026-10-25T00:00:0'+writes+'.000Z'};return stored
 }}
 const denied=createEnglishHandlers(async()=>({error:'Denied',status:403}),storage)
 assert.equal((await denied.GET()).status,403)
 assert.equal((await denied.PUT(new Request('http://local',{method:'PUT',body:'{}'}))).status,403);assert.equal(writes,0)
 const api=createEnglishHandlers(async()=>({ownerId:'test-owner'}),storage)
 const put=body=>api.PUT(new Request('http://local',{method:'PUT',body:JSON.stringify(body)}))
 const state=rateCard(emptyState(),'b1-02-word-1',true,100)
 assert.equal((await put({state,revision:null})).status,200)
 const conflict=await put({state:emptyState(),revision:null});assert.equal(conflict.status,409)
 assert.equal((await conflict.json()).state.cards['b1-02-word-1'].box,1)
 assert.equal((await put({state:{version:99},revision:null})).status,400)
 assert.equal((await api.PUT(new Request('http://local',{method:'PUT',body:'x'.repeat(200001)}))).status,413)
 assert.equal((await api.GET()).headers.get('cache-control'),'no-store')
})

test('review changes form when a test used variant one and resumes the chosen form',()=>{
 let s=startSession({...emptyState(),attempts:1},{category:'vocabulary'},1000)
 const prompt=currentQuestion(s.session).prompt
 s=answer(s,1,1001)
 s=startSession(s,{mode:'review',category:'vocabulary'},1002)
 assert.notEqual(currentQuestion(s.session).prompt,prompt)
 const restored=readState(JSON.parse(JSON.stringify(s)))
 assert.deepEqual(currentQuestion(restored.session),currentQuestion(s.session))
})
test('all ten natural-voice files match the exact displayed lesson text',()=>{
 for(const l of lessons)for(let i=0;i<l.paragraphs.length;i++){
  const file=new URL('../../../public/english/'+l.id+'/paragraph-'+(i+1)+'.mp3',import.meta.url)
  const metadata=JSON.parse(readFileSync(new URL(file.href+'.json'),'utf8'))
  assert.equal(metadata.textSha256,createHash('sha256').update(l.paragraphs[i].replaceAll('**','')).digest('hex'))
  assert(statSync(file).size>1000)
 }
})
