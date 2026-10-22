import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { TECHNIK_GRUNDLAGEN } from '../data/technikGrundlagenLesson.js'
import { TECHNIK_INTERVENTIONELLE_RADIOLOGIE_LESSON as lesson } from '../data/technikInterventionelleRadiologieLesson.js'

const require = createRequire(import.meta.url)
let lang = 'de'
const styles = new Proxy({}, { get: (_, key) => key === '__esModule' ? false : String(key) })
function compile(file, replacements) {
  const source = transformSync(fs.readFileSync(file,'utf8'), { loader:'jsx', jsx:'automatic', format:'cjs' }).code
  const mod={exports:{}}
  new Function('require','module','exports',source)(name=>Object.hasOwn(replacements,name)?replacements[name]:require(name),mod,mod.exports)
  return mod.exports
}
const shell=compile('components/lesson-template/StandardLessonShell.jsx',{
  'next/link':{__esModule:true,default:({children,...props})=>React.createElement('a',props,children)},
  '@/hooks/usePersistedSectionProgress':{usePersistedSectionProgress:()=>[new Set(),()=>{}]},
  '@/hooks/useLehrModeActive':{useLehrModeActive:()=>false},
  '@/components/LessonHero':{__esModule:true,default:({title,imageSrc,imageAlt})=>React.createElement('div',{'data-hero-title':title,'data-hero-image':imageSrc,'aria-label':imageAlt})},
  '@/lib/lessonHashNavigation':{observeLessonHash:()=>()=>{}},
  './StandardLessonShell.module.css':styles,
})
const Page=compile('app/technik/interventionelle-radiologie/page.jsx',{
  '@/components/lesson-template/StandardLessonShell':{...shell,__esModule:true},
  '@/providers/LanguageProvider':{useLanguage:()=>({lang})},
  '@/data/technikInterventionelleRadiologieLesson':{TECHNIK_INTERVENTIONELLE_RADIOLOGIE_LESSON:lesson},
  './page.module.css':styles,
}).default
const GrundPage=compile('app/technik/grundlagen/StandardPage.jsx',{
  '@/components/Footer':{__esModule:true,default:()=>React.createElement('footer')},
  '@/components/InProgressBanner':{__esModule:true,default:()=>React.createElement('aside')},
  '@/components/lesson-template/StandardLessonShell':{...shell,__esModule:true},
  '@/providers/LanguageProvider':{useLanguage:()=>({lang})},
  '@/data/technikGrundlagenLesson':{TECHNIK_GRUNDLAGEN},
  '../kontrastmittel/page.module.css':styles,
}).default
const translate=(value,path='lesson')=>{
  if(Array.isArray(value)) return value.forEach((item,index)=>translate(item,`${path}[${index}]`))
  if(!value||typeof value!=='object') return
  if(['de','en','fa'].some(key=>Object.hasOwn(value,key))) { for(const key of ['de','en','fa']) assert.ok(typeof value[key]==='string'&&value[key].trim(),`${path}.${key}`); return }
  for(const [key,child] of Object.entries(value)) translate(child,`${path}.${key}`)
}
translate(lesson)
const fluoro=TECHNIK_GRUNDLAGEN.sections.find(section=>section.id==='fluoro')
assert.ok(fluoro,'existing fluoro chapter found')
assert.deepEqual(fluoro.curriculumId,['fluoroskopie-durchleuchtung','dsa-grundlagen'])
assert.equal(fluoro.teachingBlocks.length,3)
assert.ok(fluoro.teachingBlocks.some(block=>block.id==='fluoro-zoom'),'PDF pp.63–64 zoom block is connected to the existing fluoroscopy section')
assert.ok(fs.existsSync(`public${lesson.hero}`),'hero schematic exists')
assert.match(fs.readFileSync(`public/${lesson.hero.slice(1)}`,'utf8'),/NOT A CLINICAL IMAGE/)
const dsaImage='public/technik/interventionelle-radiologie/dsa-triptych-p62.png'
assert.ok(fs.existsSync(dsaImage)&&fs.statSync(dsaImage).size>10000,'authorized PDF DSA triptych crop exists')
const dsaChapter=lesson.chapters.find(chapter=>chapter.id==='dsa-grundlagen')
assert.equal(dsaChapter.visualSourceRef,'Technik.pdf#page=62')
assert.match(dsaChapter.visualCaption.en,/printed p\. 61.*panels a–c.*one example/i)
assert.doesNotMatch(JSON.stringify(lesson.sources),/rID/i,'do not invent an rID absent from PDF')
for(const citation of ['10.1148/rg.312105185','10.1007/s11604-020-00990-w']) assert.ok(JSON.stringify(lesson.sources).includes(citation),`visible lesson source panel has DOI ${citation}`)
const curriculum=fs.readFileSync('data/curriculum.js','utf8')
for(const [id,href] of [
  ['gefaesse-dsa','/technik/grundlagen#fluoro'],['fluoroskopie-durchleuchtung','/technik/grundlagen#fluoro'],
  ['dsa-grundlagen','/technik/interventionelle-radiologie#dsa-grundlagen'],
  ['ir-materialien','/technik/interventionelle-radiologie#ir-materialien'],['ir-pta-stent','/technik/interventionelle-radiologie#ir-pta-stent'],
  ['ir-embolisation','/technik/interventionelle-radiologie#ir-embolisation'],
]) assert.match(curriculum,new RegExp(`id: '${id}'[^\\n]*link: '${href.replace(/[.*+?^${}()|[\\]\\\\]/g,'\\$&')}'[^\\n]*inProgress: true`),`${id} linked and marked in progress`)
assert.match(curriculum,/id: 'ir-seldinger-technik'[^\n]*inProgress: true/,'Seldinger curriculum item remains in progress')
assert.doesNotMatch(curriculum,/id: 'ir-seldinger-technik'[^\n]*link:/,'Seldinger curriculum item stays unlinked')
assert.match(fs.readFileSync('docs/lesson-quality/technik-fluoroskopie-ir-p59-p68.md','utf8'),/does not describe Seldinger puncture steps/)
assert.match(lesson.sourceNote.en,/not an instruction for vascular access/i)
assert.equal(lesson.check.answer,0)
const { QUESTION_BANK } = await import('../data/questions.js')
const { FLASHCARDS } = await import('../data/flashcards.js')
for(const locale of ['de','en','fa']) {
  const q=QUESTION_BANK[locale].find(item=>item.id===`fluoro-zoom-${locale}-digital-vs-acquisition`)
  assert.ok(q&&q.correct==='A'&&q.tags.includes('fluoroskopie-durchleuchtung'),`${locale} zoom MCQ registered under the existing topic`)
  assert.equal(q.options.length,4,`${locale} zoom MCQ has four options`)
}
assert.ok(FLASHCARDS.some(card=>card.id==='fluoro-zoom-display-vs-acquisition'&&card.topicId==='fluoroskopie-durchleuchtung'),'zoom flashcard is registered to the existing topic')

for(const locale of ['de','en','fa']) {
  lang=locale
  const html=renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${locale}"`)&&html.includes(`dir="${locale==='fa'?'rtl':'ltr'}"`),`${locale} language direction`)
  assert.ok(html.includes(lesson.title[locale])&&html.includes(lesson.hero),`${locale} page heading and image`)
  assert.ok(html.includes('/technik/interventionelle-radiologie/dsa-triptych-p62.png'),`${locale} source triptych rendered`)
  assert.ok(html.includes(dsaChapter.visualCaption[locale])&&html.includes('sourceRef: Technik.pdf#page=62'),`${locale} image provenance and caveat rendered`)
  assert.ok(html.includes('10.1148/rg.312105185')&&html.includes('10.1007/s11604-020-00990-w'),`${locale} precise citations visible in lesson source panel`)
  for(const chapter of lesson.chapters) {
    assert.ok(html.includes(`id="${chapter.id}"`),`${locale} route anchor ${chapter.id}`)
    assert.ok(html.includes(chapter.title[locale]),`${locale} localized chapter title`)
    assert.ok(chapter.lead[locale].length>50,`${locale} chapter text`)
  }
  assert.ok(html.includes(lesson.check.prompt[locale])&&lesson.check.feedback[locale].length>40&&lesson.check.retry[locale].length>40,`${locale} feedback content`)
  const foundation=renderToStaticMarkup(React.createElement(GrundPage))
  for(const block of fluoro.teachingBlocks) assert.ok(foundation.includes(block.title[locale]),`${locale} fluoroscopy teaching block`)
  assert.ok(foundation.includes(fluoro.teachingBlocks.find(block=>block.id==='fluoro-zoom').supplement[locale]),`${locale} dose qualifier rendered`)
  assert.ok(foundation.includes(fluoro.title[locale]),`${locale} existing fluoroscopy section title`)
}

console.log('Fluoroscopy/interventional radiology SSR PASS: detector chains, DSA mask-subtraction and limits, exact curriculum links/inProgress, source-bounded route anchors, DE/EN/FA/RTL, and assessment feedback. Browser QA and clinician review remain pending.')
