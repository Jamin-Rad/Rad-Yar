import assert from'node:assert/strict'
import fs from'node:fs'
import{QUESTION_BANK}from'../data/questions.js'
import{qualityCoverage}from'../data/assessmentQuality/index.js'
import{lessonAssessmentActions}from'../lib/lessonAssessmentLinks.js'
const registry=JSON.parse(fs.readFileSync('data/assessmentQuality/routeLinks.json','utf8')).routes
let goalQuestions=0
for(const entry of qualityCoverage){
 const mapping=registry[entry.route];assert.ok(mapping,entry.route)
 const actual=QUESTION_BANK.de.filter(q=>q.tags.some(tag=>mapping.topicIds.includes(tag)))
 assert.equal(mapping.questionCount,actual.length,`${entry.route} available count`)
 if(entry.cardTopicId){
  assert.equal(mapping.cardTopic,entry.cardTopicId,`${entry.route} explicit card deck`)
  for(const lang of ['de','en','fa'])assert.equal(new URL(lessonAssessmentActions(entry.route,lang).flashcards.href,'https://rad-yar.com').pathname,`/flashcards/${entry.cardTopicId}`)
 }
 for(const goal of entry.learningGoals)for(const id of goal.questionIds){
  assert.ok(actual.some(q=>q.id===id),`${entry.route} route selection omits explicit goal ${id}`);goalQuestions++
 }
 for(const lang of ['de','en','fa']){
  const action=lessonAssessmentActions(entry.route,lang).mcq
  assert.ok(action,`${entry.route} quiz action`)
  const url=new URL(action.href,'https://rad-yar.com')
  assert.equal(Number(url.searchParams.get('n')),actual.length)
  assert.equal(url.searchParams.get('lang'),lang)
  assert.deepEqual(new Set(url.searchParams.get('themen').split(',')),new Set(mapping.topicIds))
 }
}
console.log(`All ${goalQuestions} explicit goal-question references are reachable through their reviewed route topic selections in DE/EN/FA; counts match actual union pools.`)
