import test from 'node:test'
import assert from 'node:assert/strict'
import {getWritingExercises,getOrderingExercises,checkTranslation,checkWordOrder,shuffledTokens,normalizeSentence,acceptedWordOrders} from './shortExercises.js'
import {lessonIllustrations} from './lessonIllustrations.js'
import {getLessonTests,getQuestionBank,recordQuestionAnswer,getReviewSummary,clearQuestionAnswers} from './sessions.js'
import {lessonProgress} from './progress.js'
import {normalizeDeutschState,applyDeutschChanges,diffDeutschState} from '../../../lib/deutsch/state.js'
import {sentenceOnly,getPractice} from './practice.js'
const words=text=>normalizeSentence(text).split(' ').sort()

test('each prepared lesson has five short Persian translations and five real word-order tasks',()=>{
 for(const id of Object.keys(lessonIllustrations)){
  const lesson={id};const writing=getWritingExercises(lesson);const order=getOrderingExercises(lesson)
  assert.equal(writing.length,5);assert.equal(order.length,5)
  assert.equal(new Set(writing.map(q=>q.id)).size,5)
  for(const exercise of writing){
   assert.match(exercise.fa,/[\u0600-\u06ff]/)
   assert.ok(exercise.answers[0].split(/\s+/).length<=12)
   assert.ok(checkTranslation(exercise,exercise.answers[0]))
   assert.ok(!checkTranslation(exercise,'Ich weiß es nicht.'))
  }
  for(const item of order){
   assert.equal(item.type,'ordering');assert.match(item.question,/[\u0600-\u06ff]/)
   assert.ok(item.tokens.length>=3)
   assert.ok(checkWordOrder(item,item.tokens))
   assert.ok(!checkWordOrder(item,shuffledTokens(item)))
   assert.deepEqual(shuffledTokens(item),shuffledTokens(item))
   for(const solution of acceptedWordOrders(item)) assert.deepEqual(words(solution),words(item.tokens.join(' ')))
  }
 }
})
test('translations accept prepared variants and ordinary case and punctuation differences',()=>{
 const exercise=getWritingExercises({id:'deutsch-2026-10-27-reparaturtermin-vereinbaren'})[2]
 assert.ok(checkTranslation(exercise,'morgen kommt der Techniker!'))
 assert.ok(checkTranslation(exercise,' Der Techniker kommt morgen '))
 assert.ok(!checkTranslation(exercise,'Der Techniker kommt gestern.'))
})
test('word-order tasks preserve duplicate words and require every word exactly once',()=>{
 const item={tokens:['Ich','glaube','dass','ich','Zeit','habe'],solutions:['Ich glaube, dass ich Zeit habe.']}
 const pool=shuffledTokens(item)
 assert.equal(new Set(pool.map(word=>word.id)).size,6)
 assert.equal(pool.filter(word=>word.text.toLowerCase()==='ich').length,2)
 assert.ok(checkWordOrder(item,item.tokens))
 assert.ok(!checkWordOrder(item,item.tokens.slice(1)))
 assert.ok(!checkWordOrder(item,[...item.tokens,'habe']))
})
test('ordering questions share saved answers, mistake scheduling, and category reset',()=>{
 const lesson={id:'deutsch-2026-10-27-reparaturtermin-vereinbaren'}
 const tests=getLessonTests(lesson);const bank=getQuestionBank([lesson])
 assert.equal(tests.grammar.filter(q=>q.type==='ordering').length,5)
 const item=tests.grammar.find(q=>q.type==='ordering')
 assert.equal(bank.filter(q=>!q.legacy&&q.answerKey===item.answerKey).length,1)
 let state=recordQuestionAnswer(normalizeDeutschState({}),bank,item.answerKey,1,new Date('2026-10-27T12:00Z'))
 assert.equal(getReviewSummary(bank,state.answers,state.mistakeReviews,new Date('2026-10-27T12:00Z')).due[0].type,'ordering')
 state=recordQuestionAnswer(state,bank,item.answerKey,0,new Date('2026-10-27T12:00Z'))
 assert.equal(state.mistakeReviews[item.answerKey].correctCount,1)
 const cleared=clearQuestionAnswers(state,bank,tests.grammar)
 assert.equal(cleared.answers[item.answerKey],undefined)
 assert.equal(cleared.mistakeReviews[item.answerKey].correctCount,1)
})
test('sentence drafts survive state merging and only the five submitted sentences complete writing',()=>{
 const lesson={id:'deutsch-001-digitale-erreichbarkeit'};const exercises=getWritingExercises(lesson)
 const baseline=normalizeDeutschState({writings:[{id:'legacy-essay',lessonId:lesson.id,text:'Ein alter Text.'}]})
 assert.equal(lessonProgress(lesson,baseline).sections.Schreiben,0)
 const draft={id:exercises[0].id,exerciseId:exercises[0].id,lessonId:lesson.id,kind:'translation',text:'Mein Entwurf',checkedAt:null}
 let state={...baseline,writings:[draft,...baseline.writings]}
 state=applyDeutschChanges(baseline,diffDeutschState(baseline,state))
 assert.equal(state.writings[0].text,'Mein Entwurf')
 assert.ok(state.writings.some(item=>item.id==='legacy-essay'))
 assert.equal(lessonProgress(lesson,state).sections.Schreiben,0)
 state.writings=exercises.map(exercise=>({...draft,id:exercise.id,text:exercise.answers[0],checkedAt:'2026-10-27T12:00:00Z'}))
 assert.equal(lessonProgress(lesson,state).sections.Schreiben,1)
 state.writings[0].checkedAt=null
 assert.equal(lessonProgress(lesson,state).sections.Schreiben,0.8)
})
test('grammar strips redundant cloze instructions without changing saved historical versions',()=>{
 for(const instruction of ['Fülle die Lücke aus:','Ergänze die richtige Präposition:','Bitte vervollständige den Satz.','Setze das passende Wort ein:']){
  const question=`${instruction} Wir sprechen mit ___ Kollegin.`
  assert.equal(sentenceOnly(question),'Wir sprechen mit ___ Kollegin.')
 }
 const lesson={grammar:[{question:'Fülle die Lücke aus: Wir sprechen mit ___ Kollegin.',options:['der','die','den','dem'],answer:0}]}
 assert.equal(getPractice(lesson).grammar[0].question,'Wir sprechen mit ___ Kollegin.')
 assert.match(getPractice(lesson,{fullPhrases:true}).grammar[0].question,/^Fülle/)
 assert.equal(sentenceOnly('Welche Kollegin ___ heute?'),'Welche Kollegin ___ heute?')
 const context='Es geht um eine höfliche Bitte: „___ Sie mir helfen?“'
 assert.equal(sentenceOnly(context),context)
})


test('a late older writing draft cannot replace a more recent checked sentence',()=>{
 const current=normalizeDeutschState({writings:[{id:'sentence',kind:'translation',text:'Der Techniker kommt morgen.',checkedAt:'2026-10-27T12:10:00Z',updatedAt:'2026-10-27T12:10:00Z'}]})
 const result=applyDeutschChanges(current,{writings:{upsert:[{id:'sentence',kind:'translation',text:'Der Techniker',checkedAt:null,updatedAt:'2026-10-27T12:00:00Z'}]}})
 assert.equal(result.writings[0].text,'Der Techniker kommt morgen.')
 assert.ok(result.writings[0].checkedAt)
})

test('valid fronted clauses and objects are accepted without changing published task identities',()=>{
 const lesson={id:'deutsch-2026-10-27-reparaturtermin-vereinbaren'}
 const tasks=getOrderingExercises(lesson)
 const because=tasks.find(item=>item.solutions[0].includes('weil'))
 const answer='Weil ich arbeite kann ich nicht kommen'.split(' ')
 assert.ok(checkWordOrder(because,answer))
 assert.ok(!checkWordOrder(because,'Weil ich arbeite ich kann nicht kommen'.split(' ')))
 const original=[...because.solutions]
 acceptedWordOrders(because)
 assert.deepEqual(because.solutions,original)
 const digital=getOrderingExercises({id:'deutsch-001-digitale-erreichbarkeit'})[0]
 assert.ok(checkWordOrder(digital,'Ich schalte mein Handy nach Feierabend aus'.split(' ')))
})
