import assert from 'node:assert/strict'
import {lessonAssessmentActions} from '../lib/lessonAssessmentLinks.js'
import {assessmentReturnHref} from '../lib/assessmentNavigation.js'

const handler=()=>{}
for(const lang of ['de','en','fa']){
 const actions={mcq:{label:'Open quiz',href:'/ueben/quiz?fach=abdomen&n=8&themen=gist#question',onClick:handler},flashcards:{label:'Flashcards',href:'/flashcards/gist?topic=gist'}}
 const out=lessonAssessmentActions('/abdomen/gi/gist',lang,actions)
 for(const key of ['mcq','flashcards']){
  const url=new URL(out[key].href,'https://rad-yar.com')
  assert.equal(url.searchParams.get('lang'),lang)
  assert.equal(url.searchParams.get('from'),`/abdomen/gi/gist?lang=${lang}`)
  assert.equal(assessmentReturnHref(url.searchParams.get('from'),lang,'/lernen/abdomen'),`/abdomen/gi/gist?lang=${lang}`)
  assert.equal(out[key].label,actions[key].label)
 }
 const quiz=new URL(out.mcq.href,'https://rad-yar.com')
 assert.equal(quiz.searchParams.get('n'),'3')
 assert.equal(quiz.searchParams.get('themen'),'gist')
 assert.equal(quiz.hash,'#question')
 assert.equal(out.mcq.onClick,handler)
 assert.equal(new URL(out.flashcards.href,'https://rad-yar.com').searchParams.get('topic'),'gist')
 assert.equal(actions.mcq.href,'/ueben/quiz?fach=abdomen&n=8&themen=gist#question')
}
const target='/msk/knie/meniskus?view=images&lang=de#discoid'
const custom=lessonAssessmentActions('/unmapped','fa',{mcq:{href:`/ueben/quiz?from=${encodeURIComponent(target)}&fragen=meniskus-de-01&lang=de#feedback`}})
const url=new URL(custom.mcq.href,'https://rad-yar.com')
assert.equal(url.searchParams.get('from'),target)
assert.equal(url.searchParams.get('fragen'),'meniskus-de-01')
assert.equal(url.searchParams.get('lang'),'fa')
assert.equal(url.hash,'#feedback')
assert.equal(assessmentReturnHref(target,'fa','/lernen/msk'),'/msk/knie/meniskus?view=images&lang=fa#discoid')
for(const href of ['https://example.com/ueben/quiz','//example.com/flashcards/gist','/profil'])assert.equal(lessonAssessmentActions('/unmapped','fa',{mcq:{href}}).mcq.href,href)
assert.deepEqual(lessonAssessmentActions('/unmapped','fa'),{})
assert.equal(lessonAssessmentActions('/unmapped','fa',{mcq:{onClick:handler}}).mcq.onClick,handler)
console.log('Custom assessment actions preserve language, return target, topic, hash and handlers without inventing unmapped links.')
