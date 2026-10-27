import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync, statSync} from 'node:fs'
import {getPractice} from './practice.js'

const lessons=JSON.parse(readFileSync(new URL('../../../data/deutsch/daily-conversations-2026-10-27.json',import.meta.url)))
const recordings=JSON.parse(readFileSync(new URL('../../../data/deutschRecordings.json',import.meta.url)))

test('both daily conversation lessons include complete exercises and ready audio',()=>{
 assert.equal(lessons.length,2)
 assert.equal(new Set(lessons.map(l=>l.id)).size,2)
 for(const lesson of lessons){
  assert.equal(lesson.level,'B2')
  assert.equal(lesson.reading.questions.length,5)
  assert.equal(lesson.listening.questions.length,5)
  assert.equal(lesson.writing.checklist.length,5)
  assert.ok(lesson.reading.text.split(/\s+/).length>=170)
  assert.notEqual(lesson.listening.text,lesson.reading.text)
  assert.equal(lesson.reading.vocabulary.length,15)
  for(const word of lesson.reading.vocabulary){
   assert.ok(lesson.reading.text.includes(word.term),word.term)
   assert.ok(word.example.includes(word.term),word.term)
   assert.match(word.fa,/[\u0600-\u06ff]/)
   assert.ok(word.de.length>15)
  }
  const practice=getPractice(lesson)
  assert.equal(practice.vocabulary.length,15)
  assert.equal(practice.grammar.length,15)
  for(const section of [lesson.reading,lesson.listening]){
   const recording=recordings.find(r=>r.text===section.text)
   assert.ok(recording)
   assert.ok(statSync(new URL('../../../public'+recording.src,import.meta.url)).size>100000)
   for(const item of section.questions){assert.equal(item.options.length,4);assert.ok(item.answer>=0&&item.answer<4)}
  }
  for(const item of [...practice.vocabulary,...practice.grammar]){
   assert.equal(item.question.split('___').length,2)
   assert.equal(item.options.length,4)
   assert.equal(new Set(item.options).size,4)
   assert.doesNotMatch(item.question,/^(Ergänze|Wähle|Was bedeutet|Welche)/)
   assert.ok(item.answer>=0&&item.answer<4)
  }
  assert.equal(new Set(practice.vocabulary.map(q=>q.answer)).size,4)
 }
})
