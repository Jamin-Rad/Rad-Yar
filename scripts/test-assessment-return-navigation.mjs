import assert from 'node:assert/strict'
import {assessmentReturnHref} from '../lib/assessmentNavigation.js'
for(const lang of ['de','en','fa']){
  const href=assessmentReturnHref('/thorax/lung-rads?lang=de&view=lesson#measure',lang,'/ueben')
  const url=new URL(href,'https://rad-yar.com')
  assert.equal(url.searchParams.get('lang'),lang)
  assert.equal(url.searchParams.get('view'),'lesson')
  assert.equal(url.hash,'#measure')
  assert.equal(assessmentReturnHref(null,lang,'/flashcards'),`/flashcards?lang=${lang}`)
}
assert.equal(assessmentReturnHref('//example.com','fa','/ueben'),'/ueben?lang=fa')
console.log('Quiz/card return targets preserve the current language, lesson query and section.')
