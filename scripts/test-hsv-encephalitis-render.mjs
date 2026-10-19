import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { observeLessonHash } from '../lib/lessonHashNavigation.js'
import { HSV_LESSON } from '../data/gehirnHsvEnzephalitisLesson.js'

const require=createRequire(import.meta.url)
const styles=new Proxy({}, {get:(_,key)=>key==='__esModule'?false:String(key)})
const Link=({children,...props})=>React.createElement('a',props,children)
const Image=({fill,priority,...props})=>React.createElement('img',props)
function compile(path,replacements){
 const source=transformSync(fs.readFileSync(path,'utf8'),{loader:'jsx',jsx:'automatic',format:'cjs'}).code
 const module={exports:{}}
 new Function('require','module','exports',source)(name=>Object.hasOwn(replacements,name)?replacements[name]:require(name),module,module.exports)
 return module.exports
}
const Hero=compile('components/LessonHero.jsx',{'next/image':Image,'./LessonHero.module.css':styles}).default
const shell=compile('components/lesson-template/StandardLessonShell.jsx',{
 'next/link':Link,
 '@/components/LessonHero':Hero,
 '@/lib/lessonHashNavigation':{observeLessonHash},
 '@/hooks/usePersistedSectionProgress':{usePersistedSectionProgress:()=>React.useState(()=>new Set())},
 '@/hooks/useLehrModeActive':{useLehrModeActive:()=>false},
 './StandardLessonShell.module.css':styles,
})
const Page=compile('app/gehirn/infektionen/herpes-enzephalitis/page.jsx',{
 '@/providers/LanguageProvider':{useLanguage:()=>({lang:activeLanguage})},
 '@/components/lesson-template/StandardLessonShell':shell,
 '@/data/gehirnHsvEnzephalitisLesson':{HSV_LESSON},
 './page.module.css':styles,
}).default
let activeLanguage='de'
const htmlFor=lang=>{activeLanguage=lang;return renderToStaticMarkup(React.createElement(Page))}
for(const lang of ['de','en','fa']){
 const html=htmlFor(lang)
 assert.ok(html.includes(`lang="${lang}"`)&&html.includes(`dir="${lang==='fa'?'rtl':'ltr'}"`),`${lang} direction`)
 assert.ok(html.includes(HSV_LESSON.title[lang]),`${lang} title`)
 assert.ok(html.includes(HSV_LESSON.imageAlt[lang]),`${lang} image alt`)
 assert.ok(html.includes(HSV_LESSON.imageCaption[lang]),`${lang} image caption`)
 assert.ok(html.includes(HSV_LESSON.check.question[lang]),`${lang} case question`)
 assert.ok(html.includes(HSV_LESSON.warning[lang]),`${lang} urgent warning`)
 assert.equal((html.match(/aria-controls="(?:pattern|sequences|mimics|takehome)-panel"/g)||[]).length,4,`${lang} chapter controls`)
 assert.ok(html.includes('/educational/herpes-enzephalitis/pdf-case.png'))
}
function assertLocalized(value,path='root'){
 if(Array.isArray(value)) return value.forEach((item,i)=>assertLocalized(item,`${path}[${i}]`))
 if(value&&typeof value==='object'){
  if(['de','en','fa'].some(key=>Object.hasOwn(value,key))) for(const lang of ['de','en','fa']) assert.ok(typeof value[lang]==='string'&&value[lang].trim(),`${path}.${lang} missing`)
  else for(const [key,child] of Object.entries(value)) assertLocalized(child,`${path}.${key}`)
 }
}
assertLocalized(HSV_LESSON)
assert.ok(fs.existsSync('public/educational/herpes-enzephalitis/hero.svg'))
assert.ok(fs.existsSync('public/educational/herpes-enzephalitis/pdf-case.png'))
assert.ok(fs.existsSync('public/educational/herpes-enzephalitis/image-provenance.json'))
console.log('HSV encephalitis route semantic SSR PASS: DE/EN/FA, RTL, four chapters, image/caption, urgent boundary, embedded case question, complete localized data.')
