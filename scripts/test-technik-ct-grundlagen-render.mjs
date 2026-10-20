import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { CT_BASICS_SECTIONS, CT_BASICS_QUESTIONS, CT_BASICS_FLASHCARD_TOPICS, CT_BASICS_FLASHCARDS } from '../data/technikCTBasicsLesson.js'
import { QUESTION_BANK, MCQ_TOPIC_GROUPS } from '../data/questions.js'
import { FLASHCARD_TOPICS, getCardsByTopic } from '../data/flashcards.js'

const langs=['de','en','fa']
const ids=['ct-grundprinzip-aufbau','ct-aufnahmetechniken']
assert.deepEqual(CT_BASICS_SECTIONS.map(section=>section.id),ids)
assert.deepEqual(CT_BASICS_SECTIONS.map(section=>section.curriculumId),ids)
assert.deepEqual(CT_BASICS_QUESTIONS.length,6)
assert.deepEqual(CT_BASICS_FLASHCARD_TOPICS.map(topic=>topic.id),ids)
assert.deepEqual(CT_BASICS_FLASHCARDS.length,4)
for(const id of ids){
  assert.ok(MCQ_TOPIC_GROUPS.flatMap(group=>group.topics).some(topic=>topic.id===id),`${id}: MCQ topic registered`)
  assert.ok(FLASHCARD_TOPICS.some(topic=>topic.id===id),`${id}: flashcard topic registered`)
  assert.equal(getCardsByTopic(id).length,2,`${id}: two topic cards`)
  for(const lang of langs) assert.ok(QUESTION_BANK[lang].some(q=>q.tags.includes(id)),`${lang}: ${id} questions available`)
}
for(const section of CT_BASICS_SECTIONS){
  for(const lang of langs){
    assert.ok(section.title[lang]&&section.lead[lang]&&section.visual.alt[lang]&&section.visual.caption[lang]&&section.visual.legend[lang]&&section.note[lang],`${lang}: ${section.id} localized copy`)
    for(const [term,detail] of section.rows) assert.ok(term[lang]&&detail[lang],`${lang}: ${section.id} table row`)
    if(section.id==='ct-aufnahmetechniken') assert.ok(section.rows.some(([term,detail])=>term[lang]==='Pitch'&&detail[lang].toLowerCase().includes('table travel')||term[lang]==='Pitch'&&detail[lang].includes('Tischvorschub')||term[lang].includes('Pitch')&&detail[lang].includes('حرکت تخت')),`${lang}: helical pitch defined`)
    const q=CT_BASICS_QUESTIONS.find(item=>item.id===`${section.id}-${lang}-01`)
    assert.ok(q,`${lang}: ${section.id} MCQ`)
    assert.equal(q.correct,'A')
    assert.equal(q.options.length,4)
    assert.deepEqual(Object.keys(q.wrongExplanations).sort(),['B','C','D'])
    assert.ok(q.explanation.trim().length>30,`${lang}: correct-answer feedback is substantive`)
    for(const option of ['A','B','C','D']){
      if(option===q.correct) continue
      assert.ok(q.wrongExplanations[option]?.trim().length>30,`${lang}: option ${option} has specific feedback`)
    }
  }
}
assert.match(CT_BASICS_QUESTIONS.find(q=>q.id==='ct-grundprinzip-aufbau-de-01').wrongExplanations.B,/direkte Photonenzählung.*indirekte.*energieintegrierende/s, 'German option B explains direct vs indirect detection')
for(const src of ['public/technik/ct-grundlagen/hero.svg','public/technik/ct-grundlagen/ct-signal-chain.svg','public/technik/ct-grundlagen/ct-acquisition-modes.svg']){
  const svg=fs.readFileSync(src,'utf8')
  assert.doesNotMatch(svg,/<text\b/i,`${src}: language-neutral schematic`)
}
const curriculum=fs.readFileSync('data/curriculum.js','utf8')
for(const id of ids){
  const escaped=id.replaceAll('-','\\-')
  assert.match(curriculum,new RegExp(`id: '${escaped}'.*link: '/technik/ct-grundlagen#${escaped}'.*mcqLink: '/ueben/quiz\\?fach=technik&n=1&themen=${escaped}'.*flashcardLink: '/flashcards/${escaped}'`),`${id}: curriculum links exact route, MCQ and cards`)
}

const require=createRequire(import.meta.url)
const styles=new Proxy({}, {get:(_,key)=>String(key)})
let activeLang='de'
const moduleData=await import('../data/technikCTBasicsLesson.js')
const replacements={
  '@/components/Footer':{__esModule:true,default:()=>React.createElement('footer')},
  '@/components/lesson-template/StandardLessonShell':{
    __esModule:true,
    default:({children,lang,title,sections,actions,theme,heroImageAlt,sources,renderIcon})=>React.createElement('main',{lang,dir:lang==='fa'?'rtl':'ltr'},
      React.createElement('h1',null,title),React.createElement('img',{src:theme.heroImage,alt:heroImageAlt}),
      React.createElement('nav',null,Object.values(actions).map(action=>React.createElement('a',{key:action.href,href:action.href},action.label))),
      sources,children),
    LessonSection:({id,title,children})=>React.createElement('section',{id},React.createElement('h2',null,title),children),
    LessonSources:({title,items})=>React.createElement('aside',null,React.createElement('h2',null,title),items.map((item,index)=>React.createElement('div',{key:item.href||index},item.href?React.createElement('a',{href:item.href},item.title):item.title,React.createElement('p',null,item.citation),React.createElement('em',null,item.scope))))
  },
  '@/providers/LanguageProvider':{useLanguage:()=>({lang:activeLang})},
  '@/data/technikCTBasicsLesson':moduleData,
  './page.module.css':{__esModule:true,default:styles},
}
const source=transformSync(fs.readFileSync('app/technik/ct-grundlagen/page.jsx','utf8'),{loader:'jsx',jsx:'automatic',format:'cjs'}).code
const pageModule={exports:{}}
new Function('require','module','exports',source)(name=>Object.hasOwn(replacements,name)?replacements[name]:require(name),pageModule,pageModule.exports)
const Page=pageModule.exports.default
const provenance={de:'Vom Nutzer bereitgestelltes PDF; alle fünf Seiten visuell geprüft.',en:'User-provided PDF; all five pages visually inspected.',fa:'PDF ارائه‌شده توسط کاربر؛ هر پنج صفحه به‌صورت بصری بررسی شدند.'}
for(const lang of langs){
  activeLang=lang
  const html=renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${lang}"`)&&html.includes(`dir="${lang==='fa'?'rtl':'ltr'}"`),`${lang}: direction`)
  assert.ok(html.includes('/technik/ct-grundlagen/hero.svg'),`${lang}: CT-specific hero`)
  for(const section of CT_BASICS_SECTIONS){
    assert.ok(html.includes(`id="${section.id}"`),`${lang}: chapter anchor ${section.id}`)
    assert.ok(html.includes(section.title[lang])&&html.includes(section.lead[lang]),`${lang}: chapter content`)
    assert.ok(html.includes(section.visual.src)&&html.includes(section.visual.alt[lang])&&html.includes(section.visual.caption[lang]),`${lang}: graphic, alt and caption`)
    assert.ok(html.includes(section.note[lang]),`${lang}: qualification`)
    assert.ok(html.includes(`/ueben/quiz?fach=technik&amp;n=1&amp;themen=${section.id}&amp;from=%2Ftechnik%2Fct-grundlagen${lang==='de'?'':`%3Flang%3D${lang}`}%23${section.id}${lang==='de'?'':`&amp;lang=${lang}`}`),`${lang}: chapter MCQ action and localized return anchor`)
    assert.ok(html.includes(`/flashcards/${section.id}?from=%2Ftechnik%2Fct-grundlagen${lang==='de'?'':`%3Flang%3D${lang}`}%23${section.id}${lang==='de'?'':`&amp;lang=${lang}`}`),`${lang}: chapter flashcard action and localized return anchor`)
  }
  assert.ok(html.includes(provenance[lang]),`${lang}: localized PDF provenance`)
  assert.ok(html.includes(`/ueben/quiz?fach=technik&amp;n=2&amp;themen=${ids.join(',')}&amp;from=%2Ftechnik%2Fct-grundlagen${lang==='de'?'':`%3Flang%3D${lang}`}${lang==='de'?'':`&amp;lang=${lang}`}`),`${lang}: global quiz action covers both topics`)
}
console.log('CT fundamentals/acquisition SSR and registry audit PASS: exact curriculum IDs, source-mapped localized content, CT-specific hero, neutral diagrams, MCQs/cards, action links, DE/EN/FA and RTL.')
