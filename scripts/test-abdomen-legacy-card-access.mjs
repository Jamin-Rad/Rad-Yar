import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { observeLessonHash } from '../lib/lessonHashNavigation.js'
import * as ormond from '../data/ormondLesson.js'
import * as panniculitis from '../data/panniculitisLesson.js'
import * as peritoneal from '../data/peritonealCarcinomatosisLesson.js'
import { ABDOMEN_LEGACY_CARDS as cards, ABDOMEN_LEGACY_CARD_TOPICS as topics } from '../data/abdomenLegacyCardAccess.js'

const require=createRequire(import.meta.url)
const styles=new Proxy({}, {get:(_,k)=>k==='__esModule'?false:String(k)})
function compile(path,replacements){const source=transformSync(fs.readFileSync(path,'utf8'),{loader:'jsx',jsx:'automatic',format:'cjs'}).code;const module={exports:{}};new Function('require','module','exports',source)(name=>Object.hasOwn(replacements,name)?replacements[name]:require(name),module,module.exports);return module.exports}
const Link=({href,children,...props})=>React.createElement('a',{href,...props},children)
const Image=({src,alt})=>React.createElement('img',{src,alt})
const shell=compile('components/lesson-template/StandardLessonShell.jsx',{'next/link':Link,'@/hooks/usePersistedSectionProgress':{usePersistedSectionProgress:()=>[new Set(),()=>{}]},'@/hooks/useLehrModeActive':{useLehrModeActive:()=>false},'@/components/LessonHero':({title,imageSrc,imageAlt})=>React.createElement('div',{role:'img','aria-label':imageAlt},title,imageSrc),'@/lib/lessonHashNavigation':{observeLessonHash},'./StandardLessonShell.module.css':styles})
let lang='de'
const cases=[['retroperitoneum/morbus-ormond','morbus-ormond','ormondLesson',ormond],['peritoneum/mesenteriale-panniculitis','mesenteriale-panniculitis','panniculitisLesson',panniculitis],['peritoneum/peritonealkarzinose','peritonealkarzinose','peritonealCarcinomatosisLesson',peritoneal]]
for(const [route,topic,data,module] of cases){
 const Page=compile(`app/abdomen/${route}/page.jsx`,{'next/image':Image,'@/providers/LanguageProvider':{useLanguage:()=>({lang})},'@/components/lesson-template/StandardLessonShell':shell,[`@/data/${data}`]:module,'./page.module.css':styles}).default
 for(const locale of ['de','en','fa']){
  lang=locale
  const html=renderToStaticMarkup(React.createElement(Page))
  const ret=`/abdomen/${route}${lang==='de'?'':`?lang=${lang}`}`
  assert.ok(html.includes(`/flashcards/${topic}?from=${encodeURIComponent(ret)}`))
  assert.ok(html.includes(`themen=${topic}&amp;from=${encodeURIComponent(ret)}`))
 }
 assert.equal(cards.filter(c=>c.topicId===topic).length,3)
 assert.equal(topics.filter(t=>t.id===topic).length,1)
}
assert.equal(new Set(cards.map(c=>c.id)).size,9)
for(const card of cards)for(const lang of ['de','en','fa']){assert.ok(card.front[lang].includes(card.category[lang]));assert.ok(card.answer[lang].length>20)}
console.log('Legacy card access PASS: 9 self-contained translated cards, 3 exact topics, actual3routes DE/EN/FA SSR with quiz/card localized encoded returns. Browser roundtrips separate.')
