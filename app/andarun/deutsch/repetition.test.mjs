import test from 'node:test'
import assert from 'node:assert/strict'
import {normalizeDeutschState,diffDeutschState,applyDeutschChanges} from '../../../lib/deutsch/state.js'
import {createDeutschSync} from '../../../lib/deutsch/sync.js'
import {getReviewSummary,recordQuestionAnswer,makePracticeSession,clearQuestionAnswers,getQuestionBank,getLessonTests} from './sessions.js'
import {lessonProgress} from './progress.js'
import {readFileSync} from 'node:fs'
const at=day=>new Date(Date.UTC(2026,9,27+day,12))
const bank=[{answerKey:'q',question:'Eine ___ bleibt.',options:['Frage','Antwort'],answer:0}]
const empty=()=>normalizeDeutschState({})

test('a mistake needs three spaced correct answers, with 3 then 10 days between reviews',()=>{
 let state=recordQuestionAnswer(empty(),bank,'q',1,at(0))
 assert.equal(getReviewSummary(bank,state.answers,state.mistakeReviews,at(0)).due.length,1)
 state=recordQuestionAnswer(state,bank,'q',0,at(0))
 assert.equal(state.mistakeReviews.q.correctCount,1)
 assert.equal(state.mistakeReviews.q.dueAt,at(3).toISOString())
 let summary=getReviewSummary(bank,state.answers,state.mistakeReviews,at(0))
 assert.equal(summary.active.length,1);assert.equal(summary.due.length,0)
 // Neither a reopened session nor an early random-test answer can skip the wait.
 state=recordQuestionAnswer(state,bank,'q',0,at(1))
 assert.equal(state.mistakeReviews.q.correctCount,1)
 assert.equal(makePracticeSession(bank,state.answers,'mistakes',()=>0,{mistakeReviews:state.mistakeReviews,now:at(2)}).items.length,0)
 state=recordQuestionAnswer(state,bank,'q',0,at(3))
 assert.equal(state.mistakeReviews.q.correctCount,2)
 assert.equal(state.mistakeReviews.q.dueAt,at(13).toISOString())
 assert.equal(getReviewSummary(bank,state.answers,state.mistakeReviews,at(12)).active.length,1)
 assert.equal(getReviewSummary(bank,state.answers,state.mistakeReviews,at(12)).due.length,0)
 assert.equal(getReviewSummary(bank,state.answers,state.mistakeReviews,at(13)).due.length,1)
 state=recordQuestionAnswer(state,bank,'q',0,at(13))
 assert.equal(state.mistakeReviews.q.correctCount,3)
 assert.equal(state.mistakeReviews.q.dueAt,null)
 assert.equal(getReviewSummary(bank,state.answers,state.mistakeReviews,at(20)).active.length,0)
 state=recordQuestionAnswer(state,bank,'q',1,at(21))
 assert.equal(state.mistakeReviews.q.correctCount,0)
 assert.equal(getReviewSummary(bank,state.answers,state.mistakeReviews,at(21)).due.length,1)
})

test('wrong answers reset the correct streak and old mistakes are immediately due',()=>{
 let state=normalizeDeutschState({answers:{q:1}})
 state=recordQuestionAnswer(state,bank,'q',0,at(0))
 state=recordQuestionAnswer(state,bank,'q',0,at(3))
 state=recordQuestionAnswer(state,bank,'q',1,at(5))
 assert.equal(state.mistakeReviews.q.correctCount,0)
 assert.equal(state.mistakeReviews.q.dueAt,at(5).toISOString())
 const correctOnly=recordQuestionAnswer(empty(),bank,'q',0,at(0))
 assert.deepEqual(correctOnly.mistakeReviews,{})
})

test('review records survive server merging, offline reopening, and normal test resets',async()=>{
 const baseline=normalizeDeutschState({answers:{q:1}})
 const reviewed=recordQuestionAnswer(baseline,bank,'q',0,at(0))
 const merged=applyDeutschChanges({...baseline,answers:{...baseline.answers,other:2}},diffDeutschState(baseline,reviewed))
 assert.equal(merged.answers.other,2)
 assert.deepEqual(merged.mistakeReviews,reviewed.mistakeReviews)
 const map=new Map();const storage={getItem:k=>map.get(k)||null,setItem:(k,v)=>map.set(k,v)}
 const sync=createDeutschSync({storage,key:'review',delay:60000,request:async()=>{throw Error('offline')},onState:()=>{},onStatus:()=>{}})
 sync.hydrate(baseline);sync.update(reviewed);await sync.flush();sync.stop()
 const reopened=createDeutschSync({storage,key:'review',delay:60000,request:async()=>({state:baseline}),onState:()=>{},onStatus:()=>{}})
 reopened.hydrate(baseline)
 assert.equal(reopened.getState().mistakeReviews.q.dueAt,at(3).toISOString());reopened.stop()
 const reset=clearQuestionAnswers(reviewed,bank,bank,at(1))
 assert.equal(reset.answers.q,undefined)
 assert.equal(reset.mistakeReviews.q.correctCount,1)
 assert.equal(getReviewSummary(bank,reset.answers,reset.mistakeReviews,at(3)).due.length,1)
 const oldReset=clearQuestionAnswers(baseline,bank,bank,at(0))
 assert.equal(getReviewSummary(bank,oldReset.answers,oldReset.mistakeReviews,at(0)).due.length,1)
})

test('review records follow revised question keys and do not duplicate historical mistakes',()=>{
 const revised=[{...bank[0],answerKey:'old',legacy:true,supersededBy:'q'},...bank]
 const state=normalizeDeutschState({answers:{old:1,q:0},mistakeReviews:{old:{correctCount:1,dueAt:at(3).toISOString(),lastReviewedAt:at(0).toISOString()}}})
 const summary=getReviewSummary(revised,state.answers,state.mistakeReviews,at(3))
 assert.equal(summary.active.length,1);assert.equal(summary.due[0].answerKey,'q')
 const next=recordQuestionAnswer(state,revised,'q',0,at(3))
 assert.equal(next.mistakeReviews.q.correctCount,2)
 assert.equal(getReviewSummary(revised,next.answers,next.mistakeReviews,at(3)).active.length,1)
})

test('the server validates review counts and dates',()=>{
 const invalid={correctCount:4,dueAt:at(3).toISOString(),lastReviewedAt:at(0).toISOString()}
 const result=applyDeutschChanges(empty(),{mistakeReviews:{set:{bad:invalid,invalidDate:{...invalid,correctCount:1,dueAt:'never'},valid:{...invalid,correctCount:1}}}})
 assert.deepEqual(Object.keys(result.mistakeReviews),['valid'])
})

test('lesson progress measures all four sections; answering tests never marks a lesson read',()=>{
 const [lesson]=JSON.parse(readFileSync(new URL('../../../data/deutsch/daily-conversations-2026-10-27.json',import.meta.url)))
 const questions=getQuestionBank([lesson]);let state=empty()
 assert.equal(lessonProgress(lesson,state,questions).percent,0)
 const tests=getLessonTests(lesson)
 state.answers=Object.fromEntries([...tests.vocabulary,...tests.grammar].map(q=>[q.answerKey,(q.answer+1)%4]))
 assert.equal(lessonProgress(lesson,state,questions).percent,25)
 assert.equal(state.lessonStatus[lesson.id],undefined)
 state={...state,answers:Object.fromEntries(questions.filter(q=>!q.legacy).map(q=>[q.answerKey,q.answer])),lessonStatus:{[lesson.id]:{readAt:null,readProgress:1,listenProgress:1}},writings:[{id:'writing',lessonId:lesson.id}]}
 assert.equal(lessonProgress(lesson,state,questions).percent,100)
 const reset=clearQuestionAnswers(state,questions,[...tests.vocabulary,...tests.grammar])
 assert.equal(lessonProgress(lesson,reset,questions).percent,75)
})

test('late offline saves cannot roll back a newer review or reading/listening progress',()=>{
 const current=normalizeDeutschState({mistakeReviews:{q:{correctCount:2,dueAt:at(13).toISOString(),lastReviewedAt:at(3).toISOString()}},lessonStatus:{lesson:{readAt:null,readProgress:1,listenProgress:0.4}}})
 const stale={mistakeReviews:{set:{q:{correctCount:1,dueAt:at(3).toISOString(),lastReviewedAt:at(0).toISOString()}}},lessonStatus:{set:{lesson:{readAt:null,readProgress:0.3,listenProgress:0.7}}}}
 const merged=applyDeutschChanges(current,stale)
 assert.equal(merged.mistakeReviews.q.correctCount,2)
 assert.equal(merged.mistakeReviews.q.dueAt,at(13).toISOString())
 assert.equal(merged.lessonStatus.lesson.readProgress,1)
 assert.equal(merged.lessonStatus.lesson.listenProgress,0.7)
})
