import test from 'node:test'
import assert from 'node:assert/strict'
import { normalizeDeutschState, diffDeutschState, applyDeutschChanges } from '../../../lib/deutsch/state.js'
import { createDeutschSync } from '../../../lib/deutsch/sync.js'
import { getQuestionBank, makePracticeSession } from './sessions.js'
import { readFileSync } from 'node:fs'
const memory=()=>{const map=new Map();return{getItem:key=>map.get(key)||null,setItem:(key,value)=>map.set(key,value)}}
const empty=()=>normalizeDeutschState({})
const readAt='2026-10-27T13:00:00.000Z'

test('read status is explicit; new lessons and test answers do not imply read',()=>{
 const state=normalizeDeutschState({lessons:[{id:'new'}],answers:{'new-test-v2-0':0}})
 assert.equal(state.lessonStatus.new,undefined)
 const read=applyDeutschChanges(state,{lessonStatus:{set:{new:{readAt}}}})
 assert.equal(read.lessonStatus.new.readAt,readAt)
 assert.equal(applyDeutschChanges(read,{lessonStatus:{set:{new:{readAt:null}}}}).lessonStatus.new.readAt,null)
})
test('small progress updates preserve newly added lessons and other device answers',()=>{
 const previous=normalizeDeutschState({lessons:[{id:'one'}],answers:{old:0}})
 const changes=diffDeutschState(previous,{...previous,answers:{...previous.answers,mine:2}})
 const remote={...previous,lessons:[{id:'two'},{id:'one'}],answers:{...previous.answers,theirs:3}}
 const merged=applyDeutschChanges(remote,changes)
 assert.equal(merged.lessons.length,2)
 assert.deepEqual(merged.answers,{old:0,theirs:3,mine:2})
})
test('local cache is durable before the delayed save; old ack cannot overwrite a newer answer',async()=>{
 const storage=memory();let resolveFirst;let lastState
 const sync=createDeutschSync({storage,key:'x',delay:60000,onState:s=>lastState=s,onStatus:()=>{},request:()=>new Promise(resolve=>{resolveFirst=resolve})})
 sync.hydrate(empty());sync.update(s=>({...s,answers:{a:1}}))
 assert.equal(JSON.parse(storage.getItem('x')).state.answers.a,1)
 const flushing=sync.flush();sync.update(s=>({...s,answers:{...s.answers,b:2}}))
 resolveFirst({state:{...empty(),answers:{a:1}}});await flushing
 assert.deepEqual(lastState.answers,{a:1,b:2})
 assert.equal(JSON.parse(storage.getItem('x')).pending.length,1)
 // Resolve the remaining flush when stop sends it.
 sync.stop();resolveFirst({state:lastState})
})
test('offline edits survive reopening and merge with the latest remote lesson library',async()=>{
 const storage=memory();let statuses=[]
 const sync=createDeutschSync({storage,key:'x',delay:60000,onState:()=>{},onStatus:s=>statuses.push(s),request:async()=>{throw Error('offline')}})
 sync.hydrate(empty());sync.update(s=>({...s,lessonStatus:{l:{readAt}}}));await sync.flush();sync.stop()
 assert.ok(statuses.includes('offline'))
 const reopened=createDeutschSync({storage,key:'x',delay:60000,onState:()=>{},onStatus:()=>{},request:async()=>({state:empty()})})
 reopened.hydrate({...empty(),lessons:[{id:'new-from-server'}]})
 assert.equal(reopened.getState().lessonStatus.l.readAt,readAt)
 assert.equal(reopened.getState().lessons[0].id,'new-from-server');reopened.stop()
})
test('leaving a page does not let its late acknowledgement overwrite a new page cache',async()=>{
 const storage=memory();let resolve
 const sync=createDeutschSync({storage,key:'x',delay:60000,onState:()=>{},onStatus:()=>{},request:()=>new Promise(done=>{resolve=done})})
 sync.hydrate(empty());sync.update(s=>({...s,answers:{a:0}}));const pending=sync.flush();sync.stop()
 storage.setItem('x',JSON.stringify({version:2,state:{...empty(),answers:{a:0,b:1}},pending:[{answers:{set:{b:1}}}]}))
 resolve({state:{...empty(),answers:{a:0}}});await pending
 assert.equal(JSON.parse(storage.getItem('x')).state.answers.b,1)
})
test('random practice has stable source keys, no duplicates, and fresh session answers',()=>{
 const lessons=JSON.parse(readFileSync(new URL('../../../data/deutsch/daily-conversations-2026-10-27.json',import.meta.url)))
 const bank=getQuestionBank(lessons);const answers=Object.fromEntries(bank.map(q=>[q.answerKey,q.answer]))
 const session=makePracticeSession(bank,answers,'random',()=>0)
 assert.equal(session.items.length,20);assert.equal(new Set(session.items.map(q=>q.answerKey)).size,20)
 assert.deepEqual(session.answers,{})
 assert.notDeepEqual(session.items.map(q=>q.answerKey),bank.slice(0,20).map(q=>q.answerKey))
 assert.ok(bank.some(q=>q.audio));assert.ok(bank.some(q=>q.reading))
})
test('mistake review only includes wrong answers and clears corrected items',()=>{
 const bank=[{answerKey:'a',answer:0},{answerKey:'b',answer:1},{answerKey:'c',answer:2}]
 const answers={a:3,b:1}
 assert.deepEqual(makePracticeSession(bank,answers,'mistakes').items.map(q=>q.answerKey),['a'])
 assert.equal(makePracticeSession(bank,{...answers,a:0},'mistakes').items.length,0)
})

test('legacy mistakes remain reviewable but never enter new random tests',()=>{
 const lesson={id:'legacy',reading:{questions:[]},grammar:[{question:'Ergänze: „Sie bittet ___ Hilfe.“',options:['um','mit','an','für'],answer:0}],vocabulary_quiz:[{question:'Was bedeutet erreichbar?',options:['kontaktierbar','müde','spät','nah'],answer:0}]}
 const bank=getQuestionBank([lesson])
 const session=makePracticeSession(bank,{'legacy-grammar-0':2,'legacy-vocabquiz-0':3},'mistakes')
 assert.equal(session.items.length,2)
 assert.ok(session.items.some(item=>item.answerKey==='legacy-vocabquiz-0'&&item.legacy))
 assert.ok(makePracticeSession(bank,{},'random').items.every(item=>!item.legacy))
 const prior=bank.find(item=>item.answerKey==='legacy-grammar-0')
 assert.ok(session.items.some(item=>item.answerKey===prior.supersededBy&&!item.legacy))
 assert.equal(makePracticeSession(bank,{'legacy-grammar-0':2,[prior.supersededBy]:0},'mistakes').items.length,0)
})

test('lesson categories share global source keys without mixing vocabulary and grammar', async()=>{
 const {getLessonTests}=await import('./sessions.js')
 const lessons=JSON.parse(readFileSync(new URL('../../../data/deutsch/daily-conversations-2026-10-27.json',import.meta.url)))
 const bank=getQuestionBank(lessons)
 for(const lesson of lessons){
  const tests=getLessonTests(lesson)
  assert.equal(tests.vocabulary.length,15);assert.equal(tests.grammar.length,15)
  for(const kind of ['vocabulary','grammar']) for(const item of tests[kind]){
   assert.equal(item.kind,kind)
   assert.equal(bank.filter(q=>!q.legacy&&q.answerKey===item.answerKey).length,1)
  }
  assert.equal(new Set([...tests.vocabulary,...tests.grammar].map(q=>q.answerKey)).size,30)
 }
})

test('rewritten alternatives do not reuse old option indexes and old mistakes can be cleared',async()=>{
 const {getLessonTests,getMistakeQuestions}=await import('./sessions.js')
 const [lesson]=JSON.parse(readFileSync(new URL('../../../data/deutsch/daily-conversations-2026-10-27.json',import.meta.url)))
 const tests=getLessonTests(lesson);const bank=getQuestionBank([lesson])
 const item=tests.vocabulary[0];const old=tests.legacy.find(q=>q.supersededBy===item.answerKey)
 assert.ok(item.answerKey.includes('test-v3-vocabulary-'));assert.ok(old)
 const wrong=(old.answer+1)%4
 assert.equal(getMistakeQuestions(bank,{[old.answerKey]:wrong}).length,1)
 assert.equal(getMistakeQuestions(bank,{[old.answerKey]:wrong})[0].answerKey,item.answerKey)
 assert.equal(getMistakeQuestions(bank,{[old.answerKey]:wrong,[item.answerKey]:item.answer}).length,0)
 const priorDefinition=`${lesson.id}-vocabquiz-0`
 assert.equal(getMistakeQuestions(bank,{[old.answerKey]:wrong,[priorDefinition]:wrong}).length,1)
 assert.ok(makePracticeSession(bank,{},'random').items.every(q=>!q.legacy))
})

test('old definition mistakes reopen the reviewed sentence exercise for that word',()=>{
 const lesson={id:'definition',reading:{vocabulary:[{term:'erreichbar',example:'Ich bin erreichbar.'}]},vocabulary_quiz:[{question:'Was bedeutet „erreichbar“?',options:['kontaktierbar','müde','nah','spät'],answer:0}]}
 const bank=getQuestionBank([lesson]);const review=makePracticeSession(bank,{'definition-vocabquiz-0':1},'mistakes')
 assert.equal(review.items.length,1);assert.equal(review.items[0].legacy,undefined)
 assert.ok(review.items[0].question.includes('___'));assert.equal(review.items[0].options[review.items[0].answer],'erreichbar')
 assert.equal(makePracticeSession(bank,{'definition-vocabquiz-0':1,[review.items[0].answerKey]:review.items[0].answer},'mistakes').items.length,0)
})
