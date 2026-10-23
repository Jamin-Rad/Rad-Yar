import fs from 'node:fs'
import assert from 'node:assert/strict'
import {createRequire} from 'node:module'
import React from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import {transformSync} from 'esbuild'
import * as data from '../data/mskGlenohumeralOaLesson.js'
const require=createRequire(import.meta.url)
let language='de'
let allRead=false
const css=new Proxy({},{get:(_,key)=>key==='__esModule'?false:String(key)})
function compile(file,mocks){const module={exports:{}};new Function('require','module','exports',transformSync(fs.readFileSync(file,'utf8'),{loader:'jsx',jsx:'automatic',format:'cjs'}).code)(name=>Object.hasOwn(mocks,name)?mocks[name]:require(name),module,module.exports);return module.exports}
const shell=compile('components/lesson-template/StandardLessonShell.jsx',{'next/link':{__esModule:true,default:({children,...props})=>React.createElement('a',props,children)},'@/hooks/usePersistedSectionProgress':{usePersistedSectionProgress:(_,ids)=>[new Set(allRead?ids:[]),()=>{}]},'@/hooks/useLehrModeActive':{useLehrModeActive:()=>false},'@/components/LessonHero':{__esModule:true,default:({title,imageSrc,imageAlt})=>React.createElement('img',{src:imageSrc,alt:imageAlt,'data-title':title})},'@/lib/lessonHashNavigation':{observeLessonHash:()=>()=>{}},'./StandardLessonShell.module.css':css})
const client=compile('app/msk/schulter/arthrose/LessonClient.jsx',{'@/components/lesson-template/StandardLessonShell':{...shell,__esModule:true},'@/providers/LanguageProvider':{useLanguage:()=>({lang:language})},'@/data/mskGlenohumeralOaLesson':data,'./page.module.css':css})
const entry=compile('app/msk/schulter/arthrose/page.js',{'./LessonClient.jsx':{...client,__esModule:true}})
assert.deepEqual(fs.readdirSync('app/msk/schulter/arthrose').filter(x=>/^page\.[jt]sx?$/.test(x)),['page.js'])
for(const lang of ['de','en','fa']){language=lang;const html=renderToStaticMarkup(React.createElement(entry.default));assert.ok(html.includes(`dir="${lang==='fa'?'rtl':'ltr'}"`));assert.ok(html.includes(data.GLENOHUMERAL_OA_LESSON.title[lang]));assert.equal((html.match(/type="radio"/g)||[]).length,8);assert.ok(html.includes('/ueben/quiz?fach=msk'));const returnPath=`/msk/schulter/arthrose${lang==='de'?'':`?lang=${lang}`}`;assert.ok(html.includes(`/flashcards/${data.GLENOHUMERAL_OA_TOPIC_ID}?from=${encodeURIComponent(returnPath)}${lang==='de'?'':`&amp;lang=${lang}`}`));assert.ok(html.includes(`from=${encodeURIComponent(returnPath)}`));assert.ok(html.includes({de:'Ganze Lektion als gelesen markieren',en:'Mark full lesson as read',fa:'علامت‌گذاری کل درس به‌عنوان خوانده‌شده'}[lang]));assert.ok(html.includes(`aria-label="${{de:'Brotkrümelnavigation',en:'Breadcrumb navigation',fa:'مسیر صفحه'}[lang]}"`));for(const q of data.GLENOHUMERAL_OA_QUESTIONS[lang]){assert.equal(q.options.length,4);assert.ok(q.options.some(o=>o.id===q.correct));assert.equal(Object.keys(q.wrongExplanations).length,3);assert.ok(q.explanation)}for(const c of data.GLENOHUMERAL_OA_FLASHCARDS)assert.ok(c.front[lang]&&c.answer[lang]&&c.explanation[lang])}
for(const asset of [data.GLENOHUMERAL_OA_LESSON.hero,...data.GLENOHUMERAL_OA_LESSON.sections.map(s=>s.image).filter(Boolean)])assert.ok(fs.existsSync(`public${asset}`))
allRead=true
for(const lang of ['de','en','fa']){language=lang;const html=renderToStaticMarkup(React.createElement(entry.default));assert.ok(html.includes({de:'Ganze Lektion gelesen',en:'Full lesson marked as read',fa:'کل درس خوانده شد'}[lang]),`${lang} completed-state control is named`)}
console.log('Glenohumeral OA route SSR PASS: server entry, DE/EN/FA RTL, 8 options, topic links, bank/card parity and assets. Browser/scientific review are separate.')
