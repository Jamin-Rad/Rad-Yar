import test from 'node:test'
import assert from 'node:assert/strict'
import {probeRounds} from '../app/mobin/fach/latein/endungen/probeQuestions.js'
import {probeId,mergeProbeDraft,gradeProbeResult} from '../app/mobin/fach/latein/endungen/probeProgress.js'
const mode='probe24-1',q=probeRounds[mode].questions
const entry=(index,answers,checked={},modifiedAt=1)=>({modifiedAt,draft:{index,answers,checked}})
test('current and archived tasks have explanations and valid options; prior bank IDs stay fixed',()=>{
 const originals=Object.entries(probeRounds).filter(([id])=>!id.endsWith('-review'))
 assert.equal(originals.length,17)
 assert.equal(originals.reduce((sum,[,r])=>sum+r.questions.length,0),239)
 for(const [id,r]of originals){assert.equal(r.questions.length,/probe24-[67]$/.test(id)?10:/probe24-1[12]$/.test(id)?12:15);for(const x of r.questions){assert.ok(x.explanation);if(x.options){assert.equal(new Set(x.options).size,x.options.length);assert.ok(x.options.includes(x.answer))}}}
 for(const id of ['probe24-11','probe24-12'])assert.equal(probeRounds[id].questions.filter(q=>q.topic.startsWith('Wortschatz')).length,6)
 assert.equal(new Set(Object.keys(probeRounds).map(probeId)).size,34)
})
test('stale device cannot rewind answers or checked feedback',()=>{
 const a=entry(3,{0:'first',1:'second',2:'third',3:'current'},{0:true,1:true,2:true})
 const b=entry(0,{0:'replacement'},{},999)
 const merged=mergeProbeDraft(a,b)
 assert.equal(merged.draft.index,3);assert.equal(merged.draft.answers[0],'first')
 const checked=mergeProbeDraft(entry(0,{0:'locked'},{0:true}),b)
 assert.equal(checked.draft.answers[0],'locked')
 assert.deepEqual(mergeProbeDraft(a,{draft:null,modifiedAt:1000}),a)
})
test('server derives first and review scores; a review requires the original and all required answers',()=>{
 const answers=Object.fromEntries(q.map((x,i)=>[i,i===2?'wrong':x.answer]))
 const first=gradeProbeResult({mode,id:crypto.randomUUID(),answers,mistakes:[]})
 assert.deepEqual(first.mistakes,[2]);assert.equal(first.id,probeId(mode))
 assert.equal(gradeProbeResult({mode,answers:{0:'partial'}}),null)
 const review={mode:mode+'-review',answers:{2:q[2].answer}}
 assert.equal(gradeProbeResult(review),null)
 assert.deepEqual(gradeProbeResult(review,first).mistakes,[])
 assert.equal(gradeProbeResult({...review,answers:{}},first),null)
})
