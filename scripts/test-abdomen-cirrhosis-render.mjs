import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { observeLessonHash } from '../lib/lessonHashNavigation.js'
import * as cirrhosis from '../data/abdomenCirrhosisLesson.js'
import * as ui from '../data/abdomenCirrhosisUi.js'

const require=createRequire(import.meta.url)
const styles=new Proxy({}, {get:(_,k)=>k==='__esModule'?false:String(k)})
function compile(path,replacements){const source=transformSync(fs.readFileSync(path,'utf8'),{loader:'jsx',jsx:'automatic',format:'cjs'}).code;const module={exports:{}};new Function('require','module','exports',source)(name=>Object.hasOwn(replacements,name)?replacements[name]:require(name),module,module.exports);return module.exports}
const Link=({href,children,...props})=>React.createElement('a',{href,...props},children)
const Image=({src,alt})=>React.createElement('img',{src,alt})
const shell=compile('components/lesson-template/StandardLessonShell.jsx',{'next/link':Link,'@/hooks/usePersistedSectionProgress':{usePersistedSectionProgress:()=>[new Set(),()=>{}]},'@/hooks/useLehrModeActive':{useLehrModeActive:()=>false},'@/components/LessonHero':({title,imageSrc,imageAlt})=>React.createElement('div',{role:'img','aria-label':imageAlt},title,imageSrc),'@/lib/lessonHashNavigation':{observeLessonHash},'./StandardLessonShell.module.css':styles})
let lang='de'
const Page=compile('app/abdomen/leber/zirrhose/page.js',{'next/image':Image,'@/providers/LanguageProvider':{useLanguage:()=>({lang})},'@/components/lesson-template/StandardLessonShell':shell,'@/data/abdomenCirrhosisLesson':cirrhosis,'@/data/abdomenCirrhosisUi':ui,'./page.module.css':styles}).default
for(const locale of ['de','en','fa']){
 lang=locale
 const html=renderToStaticMarkup(React.createElement(Page))
 assert.ok(html.includes(cirrhosis.CIRRHOSIS_LESSON.title[locale]))
 assert.ok(html.includes(`lang="${locale}"`)&&html.includes(`dir="${locale==='fa'?'rtl':'ltr'}"`))
 const ret=cirrhosis.CIRRHOSIS_LESSON.path+(locale==='de'?'':`?lang=${locale}`)
 assert.ok(html.includes(`themen=leberzirrhose&amp;from=${encodeURIComponent(ret)}`))
 assert.ok(html.includes(`/flashcards/leberzirrhose?from=${encodeURIComponent(ret)}`))
 for(const label of ['practice','cards','path','complete','continue'])assert.ok(html.includes(ui.CIRRHOSIS_LABELS[label][locale]),`${locale} ${label}`)
 for(const q of cirrhosis.CIRRHOSIS_QUESTIONS[locale]){assert.equal(q.options.length,4);assert.ok(q.options.some(o=>o.id===q.correct));assert.equal(Object.keys(q.wrongExplanations).length,3)}
 for(const q of cirrhosis.CIRRHOSIS_LESSON.checks){assert.equal(q.options.length,4);assert.equal(q.feedback.length,4);for(const feedback of q.feedback)assert.ok(feedback[locale])}
}
const clipped=cirrhosis.CIRRHOSIS_LESSON.sections.find(s=>s.image?.clip).image
assert.ok(fs.statSync(`public${clipped.src}`).size>1000)
const css=fs.readFileSync('app/abdomen/leber/zirrhose/page.module.css','utf8')
assert.match(css,/\.ctPanel\s*\{[^}]*aspect-ratio:600\/555;[^}]*overflow:hidden/,'Operative photo panel is clipped by the intended CT viewport; pixels still require browser inspection')
for(const section of cirrhosis.CIRRHOSIS_LESSON.sections)if(section.image)assert.ok(fs.existsSync(`public${section.image.src}`))
for(const path of ['app/abdomen/leber/psc-mrcp/page.js','app/abdomen/niere/raumforderungen/page.js','app/abdomen/gi/kolitis-patterns/page.js','app/abdomen/pankreas/pankreatitis/page.js'])transformSync(fs.readFileSync(path,'utf8'),{loader:'jsx'})
console.log('Cirrhosis actual-route SSR PASS DE/EN/FA/RTL, populated controls, localized encoded practice returns, four-option questions/feedback, real media paths and CT clip rule; 4 bounded-context routes compile. Actual pixels/interactions remain browser checks.')
