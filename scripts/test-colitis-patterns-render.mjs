import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { observeLessonHash } from '../lib/lessonHashNavigation.js'

const require=createRequire(import.meta.url)
const styles=new Proxy({}, {get:(_,k)=>k==='__esModule'?false:String(k)})
function compile(path,replacements){const source=transformSync(fs.readFileSync(path,'utf8'),{loader:'jsx',jsx:'automatic',format:'cjs'}).code;const module={exports:{}};new Function('require','module','exports',source)(name=>Object.hasOwn(replacements,name)?replacements[name]:require(name),module,module.exports);return module.exports}
const Link=({href,children,...props})=>React.createElement('a',{href,...props},children)
const Image=({src,alt})=>React.createElement('img',{src,alt})
const shell=compile('components/lesson-template/StandardLessonShell.jsx',{'next/link':Link,'@/hooks/usePersistedSectionProgress':{usePersistedSectionProgress:()=>[new Set(),()=>{}]},'@/hooks/useLehrModeActive':{useLehrModeActive:()=>false},'@/components/LessonHero':({title,imageSrc,imageAlt})=>React.createElement('div',{role:'img','aria-label':imageAlt},title,imageSrc),'@/lib/lessonHashNavigation':{observeLessonHash},'./StandardLessonShell.module.css':styles})
const titles={de:'Kolitis im CT: zwei unterschiedliche Muster',en:'Colitis on CT: two different patterns',fa:'کولیت در CT: دو الگوی متفاوت'}
const sourceNotes={de:'PDF-Seiten 81–82',en:'PDF pages 81–82',fa:'صفحات PDF ۸۱–۸۲'}
const sourceTitles={de:'Abdomen.pdf, PDF-Seiten 81–82',en:'Abdomen.pdf, PDF pages 81–82',fa:'Abdomen.pdf، صفحات PDF ۸۱–۸۲'}
const navLabels={de:['Das Grundmuster erkennen','Akute Kolitis: passt das Muster zu PMC?','Kolitis im CT: zwei unterschiedliche Muster'],en:['Recognize the core pattern','Acute colitis: does the pattern fit PMC?','Colitis on CT: two different patterns'],fa:['الگوی اصلی را بشناسید','کولیت حاد: آیا الگو با PMC سازگار است؟','کولیت در CT: دو الگوی متفاوت']}
let lang='de'
const Page=compile('app/abdomen/gi/kolitis-patterns/page.js',{'next/image':Image,'@/providers/LanguageProvider':{useLanguage:()=>({lang})},'@/components/lesson-template/StandardLessonShell':shell,'./page.module.css':styles}).default
for(const locale of ['de','en','fa']){
  lang=locale
  const html=renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${locale}"`)&&html.includes(`dir="${locale==='fa'?'rtl':'ltr'}"`),`${locale} locale and direction`)
  assert.ok(html.includes(titles[locale]),`${locale} title`)
  assert.ok(html.includes(sourceNotes[locale]),`${locale} PDF scope`)
  for(const label of navLabels[locale])assert.ok(html.includes(`<strong>${label}</strong>`),`${locale} populated sidebar label ${label}`)
  assert.ok(html.includes(`<strong>${sourceTitles[locale]}</strong>`),`${locale} PDF source entry is translated and rendered as non-link text`)
  assert.ok(html.includes('href="https://doi.org/10.1148/radiology.180.1.2052723"'),`${locale} external source remains linked`)
  assert.ok(html.includes(`href="/?lang=${locale}"`)=== (locale!=='de'),`${locale} root breadcrumb preserves language`)
  assert.ok(html.includes(`/lernen/abdomen?lang=${locale}`)=== (locale!=='de'),`${locale} abdomen breadcrumb preserves language`)
  assert.ok(html.includes('/educational/colitis/pmc-accordion-source.png')&&html.includes('/educational/colitis/uc-coronal-source.png'),`${locale} source images`)
  assert.ok(html.includes('doi.org/10.1093/ecco-jcc/jjaf106')&&html.includes('10.1148/radiology.180.1.2052723'),`${locale} current/source references`)
}
const curriculum=fs.readFileSync('data/curriculum.js','utf8')
for(const id of ['pmc-kolitis','colitis-ulcerosa'])assert.match(curriculum,new RegExp(`id: '${id}'[^\\n]*link: '/abdomen/gi/kolitis-patterns'[^\\n]*inProgress: true`),`${id} exact route/inProgress`)
const lesson=fs.readFileSync('app/abdomen/gi/kolitis-patterns/page.js','utf8')
for(const phrase of ['segmental','Pankolitis','pancolitis','سگمنتال','>15 mm','۱۵ میلی‌متر','continuous rectum-first','CT alone does not confirm','CT-Muster','syncHashNavigation','Recent antibiotic therapy','kürzliche Antibiotikatherapie','درمان اخیر با آنتی‌بیوتیک','contrast may outline the grooves','Kontrast kann sich in den Furchen','ماده حاجب ممکن است شیارهای','Multidetector computed tomography features of positive endoscopic or toxin assay'])assert.ok(lesson.toLowerCase().includes(phrase.toLowerCase()),`content caveat ${phrase}`)
assert.ok(lesson.includes('syncHashNavigation'))
for(const file of ['public/educational/colitis/hero.svg','public/educational/colitis/image-provenance.json','public/educational/colitis/pmc-accordion-source.png','public/educational/colitis/uc-coronal-source.png'])assert.ok(fs.existsSync(file),`asset ${file}`)
const hero=fs.readFileSync('public/educational/colitis/hero.svg','utf8');assert.ok(!hero.includes('<text'),'hero schematic has no unlocalized visible labels')
assert.equal((hero.match(/stroke-dasharray/g)||[]).length,1,'schematic contrasts a discontinuous pattern with a continuous pattern')
const provenance=JSON.parse(fs.readFileSync('public/educational/colitis/image-provenance.json','utf8'));assert.equal(provenance.assets.length,3)
assert.ok(provenance.assets[0].visibleIdentifiers.includes('22935')&&provenance.assets[1].visibleIdentifiers.includes('16054'),'tiny embedded IDs are documented without external attribution')
console.log('Colitis patterns actual-route SSR PASS: DE/EN/FA and RTL, bounded PDF scope, distinct source examples, hash sync, exact in-progress curriculum links and source/reference evidence.')
