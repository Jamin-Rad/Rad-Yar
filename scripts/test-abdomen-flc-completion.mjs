import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { observeLessonHash } from '../lib/lessonHashNavigation.js'
import * as flc from '../data/abdomenFlcLesson.js'
import * as planning from '../data/abdomenHccPlanning.js'
const require=createRequire(import.meta.url)
const styles=new Proxy({}, {get:(_,k)=>k==='__esModule'?false:String(k)})
function compile(path,replacements){const source=transformSync(fs.readFileSync(path,'utf8'),{loader:'jsx',jsx:'automatic',format:'cjs'}).code;const module={exports:{}};new Function('require','module','exports',source)(name=>Object.hasOwn(replacements,name)?replacements[name]:require(name),module,module.exports);return module.exports}
const Link=({href,children,...props})=>React.createElement('a',{href,...props},children)
const Image=({src,alt})=>React.createElement('img',{src,alt})
const shell=compile('components/lesson-template/StandardLessonShell.jsx',{'next/link':Link,'@/hooks/usePersistedSectionProgress':{usePersistedSectionProgress:()=>[new Set(),()=>{}]},'@/hooks/useLehrModeActive':{useLehrModeActive:()=>false},'@/components/LessonHero':({title,imageSrc,imageAlt})=>React.createElement('div',{role:'img','aria-label':imageAlt},title,imageSrc),'@/lib/lessonHashNavigation':{observeLessonHash},'./StandardLessonShell.module.css':styles})
let lang='de'
const Page=compile('app/abdomen/leber/fibrolamellaeres-karzinom/page.jsx',{'next/image':Image,'@/providers/LanguageProvider':{useLanguage:()=>({lang})},'@/components/lesson-template/StandardLessonShell':shell,'@/data/abdomenFlcLesson':flc,'./page.module.css':styles}).default
for(const locale of ['de','en','fa']){
 lang=locale
 const html=renderToStaticMarkup(React.createElement(Page))
 assert.ok(html.includes(flc.FLC_LESSON.title[locale]))
 const summary=flc.FLC_LESSON.chapters.find(c=>c.emphasis).title[locale]
 assert.ok(html.includes(`<span>${summary}</span>`), `Visible summary action label: ${locale}`)
 assert.ok(html.includes(`lang="${locale}"`)&&html.includes(`dir="${locale==='fa'?'rtl':'ltr'}"`))
 assert.ok(html.includes('themen=fibrolamellaeres-karzinom'))
 assert.ok(html.includes(encodeURIComponent(`${flc.FLC_LESSON.path}?lang=${locale}`)))
 for(const bank of [flc.FLC_QUESTIONS,planning.LIRADS_QUESTIONS]){
  assert.equal(bank[locale].length,2)
  for(const q of bank[locale]){assert.ok(q.options.some(o=>o.id===q.correct));assert.ok(q.explanation.length>30);assert.equal(Object.keys(q.wrongExplanations).length,q.options.length-1)}
 }
 for(const q of flc.FLC_LESSON.checks){assert.ok(q.question[locale]);for(const f of q.feedback)assert.ok(f[locale])}
}
assert.equal(flc.FLC_CARDS.length,2);assert.equal(planning.LIRADS_CARDS.length,2)
for(const f of ['hero.png','takahashi-2021-figure1.jpg','image-provenance.json'])assert.ok(fs.statSync(`public/educational/abdomen-flc/${f}`).size>100)
for(const f of ['app/abdomen/leber/hcc/page.js','app/abdomen/leber/li-rads/page.js'])transformSync(fs.readFileSync(f,'utf8'),{loader:'jsx'})
console.log('FLC and LI-RADS practice PASS: actual FLC shell SSR all3locales/RTL; localized encoded return; 2questions/2cards each; valid answers and feedback; assets; HCC/LI-RADS JSX syntax. Browser QA separate.')
