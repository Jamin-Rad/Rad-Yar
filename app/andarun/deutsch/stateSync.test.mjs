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
