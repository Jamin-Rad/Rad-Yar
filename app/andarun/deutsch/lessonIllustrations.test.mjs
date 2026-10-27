import test from 'node:test'
import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {lessonIllustration,lessonIllustrations} from './lessonIllustrations.js'

test('every prepared lesson has its own real optimized header illustration',()=>{
 const sources=Object.keys(lessonIllustrations).map(id=>lessonIllustration({id}))
 assert.equal(new Set(sources).size,sources.length)
 for(const src of sources){
  const bytes=readFileSync(new URL('../../../public'+src,import.meta.url))
  assert.equal(bytes.toString('ascii',8,12),'WEBP')
  assert.ok(bytes.length>10000&&bytes.length<200000)
 }
})
test('imported lessons accept a prepared local image and otherwise use their topic',()=>{
 assert.equal(lessonIllustration({illustration:'/andarun/deutsch/lessons/mein-termin.webp'}),'/andarun/deutsch/lessons/mein-termin.webp')
 assert.match(lessonIllustration({title:'Reparatur der Heizung'}),/reparatur.webp$/)
 assert.match(lessonIllustration({illustration:'https://example.com/tracker.png',title:'Arzttermin'}),/arzttermin.webp$/)
})
