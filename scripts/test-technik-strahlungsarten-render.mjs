import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { TECHNIK_STRAHLUNGSARTEN_LESSON as lesson } from '../data/technikStrahlungsartenLesson.js'

const langs = ['de','en','fa'], persian = /[\u0600-\u06ff]/u
let units = 0
function inspect(value) { if (!value || typeof value !== 'object') return; if (langs.every(lang => typeof value[lang] === 'string')) { units++; assert.ok(langs.every(lang => value[lang].trim()), 'localized string is nonempty'); assert.ok(!persian.test(value.de) && !persian.test(value.en) && persian.test(value.fa), 'language slots remain distinct') } else Object.values(value).forEach(inspect) }
inspect(lesson)
assert.equal(lesson.id,'strahlungsarten'); assert.equal(lesson.chapters.length,3); assert.equal(lesson.question.answer,0); assert.equal(lesson.question.options.length,3); assert.equal(lesson.question.feedbackByOption.length,3); assert.equal(lesson.summary.length,3)
assert.match(lesson.chapters[0].paragraphs[0].de,/Heliumkern/); assert.match(lesson.chapters[0].paragraphs[1].en,/origin/); assert.match(lesson.chapters[1].paragraphs[1].fa,/بی‌خطر نمی‌کند/)
const require=createRequire(import.meta.url), styles=new Proxy({}, {get:(_,key)=>String(key)})
let activeLang='de'
const replacements={
 './page.module.css':{__esModule:true,default:styles},
 '@/providers/LanguageProvider':{useLanguage:()=>({lang:activeLang})},
 '@/components/lesson-template/StandardLessonShell':{__esModule:true,default:({children,lang,title,sections,theme,heroImageAlt,sources})=>React.createElement('main',{lang,dir:lang==='fa'?'rtl':'ltr','data-lesson-title':title,'data-hero':theme.heroImage,'data-hero-alt':heroImageAlt,'data-section-ids':sections.map(s=>s.id).join(',')},children,sources),LessonSection:({id,title,children})=>React.createElement('section',{id,'aria-label':title},children),LessonSources:({title,items,note})=>React.createElement('aside',{'data-sources':items.map(x=>x.href||x.title).join('|'),'data-note':note},title)},
 '@/data/technikStrahlungsartenLesson':{TECHNIK_STRAHLUNGSARTEN_LESSON:lesson},
}
const source=transformSync(fs.readFileSync('app/technik/strahlungsarten/page.jsx','utf8'),{loader:'jsx',jsx:'automatic',format:'cjs'}).code,module={exports:{}}
new Function('require','module','exports',source)(name=>Object.hasOwn(replacements,name)?replacements[name]:require(name),module,module.exports)
const Page=module.exports.default, htmlFor=lang=>{activeLang=lang;return renderToStaticMarkup(React.createElement(Page))}
for(const lang of langs){const html=htmlFor(lang);assert.ok(html.includes(`lang="${lang}"`)&&html.includes(`dir="${lang==='fa'?'rtl':'ltr'}"`),`${lang} direction`);assert.ok(html.includes('data-hero="/technik/strahlungsarten/hero.svg"')&&html.includes(lesson.heroAlt[lang]),`${lang} localized hero`);assert.ok(html.includes('data-section-ids="particle-or-photon,energy-and-interaction,medical-examples,take-home"'),`${lang} section navigation`);for(const chapter of lesson.chapters)assert.ok(html.includes(`aria-label="${chapter.title[lang]}"`),`${lang} chapter ${chapter.id}`);for(const option of lesson.question.options)assert.ok(html.includes(option[lang]),`${lang} assessment`);assert.ok(lesson.question.feedbackByOption.every(feedback=>feedback[lang].trim()),`${lang} option-specific feedback`);assert.ok(html.includes('pub1309_web.pdf')&&html.includes('TCS-40_web.pdf'),`${lang} reference links`)}
assert.ok(fs.readFileSync('app/technik/strahlungsarten/page.jsx','utf8').includes('lesson.question.feedbackByOption[answer]'),'selected answer maps to its explanatory rationale')
const svg=fs.readFileSync('public/technik/strahlungsarten/hero.svg','utf8'), ledger=fs.readFileSync('docs/lesson-quality/technik-strahlungsarten-p28-29.md','utf8')
assert.match(svg,/>γ</);assert.match(svg,/>X</);assert.match(ledger,/PDF p\. 28–29/);assert.match(ledger,/rigid gamma-above-X-ray energy boundary/);assert.match(ledger,/existing `\/technik\/grundlagen`/)
console.log(`Radiation types lesson audit PASS: ${units} localized units; DE/EN/FA static route render and RTL; three chapters; localized concept visual; 3-option check; IAEA/NRC references and source ledger.`)
