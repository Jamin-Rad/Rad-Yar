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
const shell=compile('components/lesson-template/StandardLessonShell.jsx',{'next/link':Link,'@/hooks/usePersistedSectionProgress':{usePersistedSectionProgress:(_id,ids)=>[new Set(),()=>{}]},'@/hooks/useLehrModeActive':{useLehrModeActive:()=>false},'@/components/LessonHero':({title,imageSrc,imageAlt})=>React.createElement('div',{className:'hero',role:'img','aria-label':imageAlt},title,imageSrc),'@/lib/lessonHashNavigation':{observeLessonHash},'./StandardLessonShell.module.css':styles})
for(const [route,file,title,terms,feedback] of [
 ['gist','app/abdomen/gi/gist/page.js',['Gastrointestinale Stromatumoren (GIST)','Gastrointestinal stromal tumours (GIST)','تومورهای استرومایی گوارشی (GIST)'],['PDF-Seite 68','PDF page 68','صفحه PDF ۶۸'],['Die Morphologie ist mit GIST vereinbar','The pattern is compatible with GIST','الگو با GIST سازگار است']],
 ['pylorusstenose','app/abdomen/gi/pylorusstenose/page.js',['Hypertrophe Pylorusstenose','Hypertrophic pyloric stenosis','تنگی هیپرتروفیک پیلور'],['nur die Überschrift','heading','فقط عنوان'],['Ein einzelner Grenzwert beweist keine Stenose','One threshold measurement does not prove stenosis','یک اندازه بالاتر از آستانه به‌تنهایی تنگی را ثابت نمی‌کند']],
]){
 let lang='de'
 const Page=compile(file,{'next/image':Image,'@/providers/LanguageProvider':{useLanguage:()=>({lang})},'@/components/lesson-template/StandardLessonShell':shell,'./page.module.css':styles}).default
 for(const locale of ['de','en','fa']){lang=locale;const html=renderToStaticMarkup(React.createElement(Page));const i=['de','en','fa'].indexOf(locale);assert.ok(html.includes(`lang="${locale}"`)&&html.includes(`dir="${locale==='fa'?'rtl':'ltr'}"`),`${route} ${locale} locale direction`);assert.ok(html.includes(title[i]),`${route} ${locale} localized title`);assert.ok(html.includes(terms[i]),`${route} ${locale} localized source scope`);assert.ok(html.includes(feedback[i]),`${route} ${locale} assessment option`);assert.ok(html.includes('image-provenance')===false,`${route} ${locale} no provenance leak`)}
 const curriculum=fs.readFileSync('data/curriculum.js','utf8');assert.match(curriculum,new RegExp(`id: '${route}'[^\\n]*link: '/abdomen/gi/${route}'[^\\n]*inProgress: true`));assert.ok(fs.existsSync(`public/educational/${route==='gist'?'gist':'pylorus'}/image-provenance.json`))
}
const gist=fs.readFileSync('app/abdomen/gi/gist/page.js','utf8');for(const x of ['Serrano C','Choi H','phase','no new lesions','keine neuen Läsionen','ضایعه جدید','does not prove','Hypodensität','arterial and portal acquisitions','arterielle und portalvenöse Akquisitionen','فاز شریانی و پورتوونوز'])assert.ok(gist.toLowerCase().includes(x.toLowerCase()),`GIST source caveat/reference ${x}`)
const pylorus=fs.readFileSync('app/abdomen/gi/pylorusstenose/page.js','utf8');for(const x of ['20211251','≥3 mm','≥۳ میلی‌متر','Ein einzelner Grenzwert beweist keine Stenose','One threshold measurement does not prove stenosis'])assert.ok(pylorus.includes(x),`pylorus criteria/source ${x}`)
assert.ok(pylorus.includes('Die gepoolte Testgüte stützt'), 'German source citation is localized')
assert.ok(pylorus.includes('van den Bunder AIM'), 'meta-analysis authorship is accurate')
assert.ok(pylorus.includes('revised 2020'), 'ACR source edition date is accurate')
assert.ok(pylorus.includes('Schematische Darstellung der Messachsen'), 'German hero alt is localized')
const pylorusSvg=fs.readFileSync('public/educational/pylorus/hero.svg','utf8');assert.ok(pylorusSvg.includes('M390 184V203'),'muscle caliper spans one wall only');assert.ok(pylorusSvg.includes('M325 250V315 M650 250V315'),'canal endpoints are marked on the schematic');assert.ok(!pylorusSvg.includes('<text'),'pylorus SVG has no unlocalized visible labels');for(const x of ['über eine einzelne Muskelwand','perpendicular across ONE muscle wall','عمود بر یک دیواره عضلانی'])assert.ok(pylorus.includes(x),`pylorus layer-specific measurement ${x}`)
const gistSvg=fs.readFileSync('public/educational/gist/hero.svg','utf8');assert.ok(!gistSvg.includes('<text'),'GIST SVG has no unlocalized visible labels')
console.log('Abdomen GIST and pyloric stenosis actual-route SSR PASS: DE/EN/FA, RTL, source-scope statements, distinct feedback, current references, exact in-progress curriculum links and provenance files.')
