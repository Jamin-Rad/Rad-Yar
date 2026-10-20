import assert from 'node:assert/strict'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..')
const require=createRequire(import.meta.url)
const Module=require('node:module')
const React=require('react')
const {renderToStaticMarkup}=require('react-dom/server')
const swc=require('next/dist/build/swc')
let lang='de'
const originalResolve=Module._resolveFilename
Module._resolveFilename=function(request,parent,...rest){
  if(request.startsWith('@/'))request=path.join(root,request.slice(2))
  return originalResolve.call(this,request,parent,...rest)
}
const loader=(module,filename)=>{
  const {code}=swc.transformSync(fs.readFileSync(filename,'utf8'),{filename,jsc:{parser:{syntax:'ecmascript',jsx:true},transform:{react:{runtime:'automatic'}}},module:{type:'commonjs'}})
  module._compile(code,filename)
}
require.extensions['.js']=loader
require.extensions['.jsx']=loader
require.extensions['.css']=module=>{module.exports={}}
const originalLoad=Module._load
Module._load=function(request,parent,isMain){
  if(request==='next/link')return ({children,...props})=>React.createElement('a',props,children)
  if(request==='next/image')return ({fill,priority,...props})=>React.createElement('img',props)
  if(request==='@/components/Navbar'||request==='@/components/Footer')return ()=>null
  if(request==='@/providers/LanguageProvider')return {useLanguage:()=>({lang})}
  if(request==='@/hooks/usePersistedSectionProgress')return {usePersistedSectionProgress:()=>[new Set(),()=>{}]}
  if(request==='@/hooks/useLehrModeActive')return {useLehrModeActive:()=>false}
  if(request==='@/lib/lessonHashNavigation')return {observeLessonHash:()=>()=>{}}
  return originalLoad.call(this,request,parent,isMain)
}

const {default:Route}=require(path.join(root,'app/abdomen/niere/renaltrauma/page.jsx'))
const {RENAL_TRAUMA_LESSON:lesson}=require(path.join(root,'data/renalTraumaLesson.js'))
const {CURRICULUM}=require(path.join(root,'data/curriculum.js'))
const {getContentStatus}=require(path.join(root,'data/lessonStatus.js'))
const findTopic=topics=>{
  for(const topic of topics||[]){
    if(topic.id==='nierentrauma')return topic
    const found=findTopic(topic.sub)
    if(found)return found
  }
  return null
}
const topic=CURRICULUM.flatMap(subject=>subject.kapitel||[]).reduce((found,chapter)=>found||findTopic(chapter.themen),null)
assert.ok(topic,'renal trauma curriculum topic exists')
assert.equal(topic.link,'/abdomen/niere/renaltrauma')
assert.equal(topic.inProgress,true)
assert.equal(getContentStatus(topic),'in_progress','lesson remains in progress pending review')
assert.equal(lesson.id,'abdomen-renal-trauma')
assert.doesNotMatch(JSON.stringify(lesson),/kontrastiertes Urin/,'German grammar remains correct throughout lesson data')

const expected={
  de:['lang="de"','dir="ltr"','Nierentrauma in der CT','arteriell für Gefäßverletzung','nephrographisch für Kontusionen','etwa fünf Minuten verzögert','AAST','2025','Abdomen.pdf','Unfallmechanismus','Welche Frage beantwortet jede CT-Phase?','CT-Phasen und Hauptsuchziel','aria-labelledby="renal-phase-title"','geringe perirenale Flüssigkeit und Stranding','kontrastierter Urin','d="M780 40L795 72L780 104"','https://uroweb.org/guidelines/urological-trauma/chapter/urogenital-trauma-guidelines','https://www.aast.org/resources/trauma-tools/organ-injury-scale.html'],
  en:['lang="en"','dir="ltr"','Renal trauma on CT','arterial for vascular injury','nephrographic for contusions','about five minutes delayed','AAST','2025','Abdomen.pdf','traumatic mechanism','What does each CT phase answer?','CT phases and primary target','aria-labelledby="renal-phase-title"','small amount of perirenal fluid and fat stranding','outside the collecting system','https://uroweb.org/guidelines/urological-trauma/chapter/urogenital-trauma-guidelines','https://www.aast.org/resources/trauma-tools/organ-injury-scale.html'],
  fa:['lang="fa"','dir="rtl"','تروما کلیه در CT','فاز شریانی برای آسیب عروقی','فاز نفروگرافیک برای کوفتگی','حدود پنج دقیقه تأخیری','AAST','۲۰۲۵','Abdomen.pdf','سازوکار تروماتیک','هر فاز CT به کدام پرسش پاسخ می‌دهد؟','فازهای CT و هدف اصلی','aria-labelledby="renal-phase-title"','مقدار کمی مایع اطراف کلیه','خارج از سیستم جمع‌کننده','https://uroweb.org/guidelines/urological-trauma/chapter/urogenital-trauma-guidelines','https://www.aast.org/resources/trauma-tools/organ-injury-scale.html'],
}
for(const locale of ['de','en','fa']){
  lang=locale
  const html=renderToStaticMarkup(React.createElement(Route))
  for(const phrase of expected[locale])assert.ok(html.includes(phrase),`${locale}: ${phrase}`)
  assert.ok(html.includes('data-lesson-progress-managed="true"'),`${locale}: shared lesson shell`)
  assert.ok(html.includes('/educational/nierentrauma/hero.svg'),`${locale}: topical non-diagnostic hero`)
  assert.ok(html.includes('/educational/nierentrauma/fornix-rupture-pdf-p57.png'),`${locale}: source CT figure`)
  assert.equal((html.match(/type="radio"/g)||[]).length,3,`${locale}: self-check options`)
  assert.ok(!html.includes('checked=""'),`${locale}: no preselected answer`)
  for(const section of lesson.sections){
    assert.ok(html.includes(section.title[locale]),`${locale}: section title`)
    assert.ok(html.includes(section.body[locale]),`${locale}: section body`)
    assert.ok(html.includes(section.implication[locale]),`${locale}: section implication`)
  }
  assert.ok(html.includes(lesson.check.question[locale]),`${locale}: self-check question`)
  assert.ok(lesson.check.explanation[locale].length>30,`${locale}: explanatory feedback is authored`)
  assert.ok(lesson.check.retry[locale].length>30,`${locale}: retry feedback is authored`)
  assert.ok(html.includes(lesson.media[locale]),`${locale}: source media disclosure`)
  assert.ok(html.includes(lesson.sourceReview[locale]),`${locale}: scope and review limits`)
}
const provenance=JSON.parse(fs.readFileSync(path.join(root,'public/educational/nierentrauma/image-provenance.json'),'utf8'))
assert.equal(provenance.source,'User-supplied Abdomen.pdf, physical PDF page 57, printed page 56')
assert.equal(provenance.clinicalScope,'Demonstrates urinary contrast extravasation only. The slide does not establish that this specific case was traumatic.')
assert.ok(fs.statSync(path.join(root,'public/educational/nierentrauma/fornix-rupture-pdf-p57.png')).size>10000)
assert.doesNotMatch(fs.readFileSync(path.join(root,'public/educational/nierentrauma/hero.svg'),'utf8'),/<text\b/,'hero SVG contains no unlocalized text')
console.log('Renal trauma route SSR PASS: DE/EN/FA, Persian RTL, localized phase diagram, source CT provenance and mechanism caveat, self-check, official EAU/AAST references, and exact curriculum ID linked as inProgress. Browser and clinical sign-off remain pending.')
