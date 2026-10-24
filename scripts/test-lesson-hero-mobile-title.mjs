import fs from 'node:fs'
import assert from 'node:assert/strict'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { FLC_LESSON } from '../data/abdomenFlcLesson.js'
import { CIRRHOSIS_LESSON } from '../data/abdomenCirrhosisLesson.js'
import { ABDOMEN_GI_LESSONS } from '../data/abdomenGiCompletion.js'

const module={exports:{}}
const source=transformSync(fs.readFileSync('components/LessonHero.jsx','utf8'),{loader:'jsx',jsx:'transform',format:'cjs'}).code
new Function('require','module','exports','React',source)(name=>name==='next/image'?({src,alt})=>React.createElement('img',{src,alt}):{hero:'hero',visual:'visual'},module,module.exports,React)
const Hero=module.exports.default
for(const lesson of [FLC_LESSON,CIRRHOSIS_LESSON,...ABDOMEN_GI_LESSONS])for(const lang of ['de','en','fa']){
  const html=renderToStaticMarkup(React.createElement(Hero,{title:lesson.title[lang],lang,imageSrc:'/fixture.png',imageAlt:'Fixture'}))
  assert.ok(html.includes(`lang="${lang}"`))
  assert.ok(html.includes(`<h1>${lesson.title[lang]}</h1>`),'Actual visible hero heading retains complete localized title')
}
const css=fs.readFileSync('components/LessonHero.module.css','utf8')
const mobile=css.slice(css.indexOf('@media(max-width:760px)'),css.indexOf('@media print'))
assert.match(mobile,/\.hero h1\s*\{[^}]*min-width:\s*0;[^}]*overflow-wrap:\s*anywhere;[^}]*hyphens:\s*auto;/)
assert.match(mobile,/\.hero\[lang='fa'\] h1\s*\{[^}]*hyphens:\s*manual;/)
assert.doesNotMatch(css.slice(0,css.indexOf('@media(max-width:760px)')),/overflow-wrap:\s*anywhere/,'Desktop typography is unchanged')
console.log('LessonHero mobile title contract PASS: four lesson titles × DE/EN/FA, actual visible h1, mobile wrapping and Persian override. Pixel overlap requires browser inspection at 320/390px.')
