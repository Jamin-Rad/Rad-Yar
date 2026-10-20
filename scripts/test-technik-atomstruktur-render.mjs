import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { TECHNIK_GRUNDLAGEN as lesson } from '../data/technikGrundlagenLesson.js'

const langs=['de','en','fa'], persian=/[\u0600-\u06ff]/u, atom=lesson.sections.find(section=>section.id==='atom')
assert.ok(atom); assert.equal(atom.pages,'25–27'); assert.equal(atom.rows.length,7)
function inspect(value){if(!value||typeof value!=='object')return;if(langs.every(lang=>typeof value[lang]==='string')){assert.ok(langs.every(lang=>value[lang].trim()));assert.ok(!persian.test(value.de)&&!persian.test(value.en)&&persian.test(value.fa))}else Object.values(value).forEach(inspect)}
inspect(atom)
assert.match(atom.rows[1][1].de,/A = Protonen \+ Neutronen/); assert.match(atom.rows[1][1].fa,/N = A − Z/)
assert.match(atom.rows[2][1].en,/not a universal threshold/); assert.match(atom.rows[5][1].de,/Absorptionskanten/)
assert.equal(atom.visuals[0].src,'/technik/grundlagen/atom-ionisation.svg')
const require=createRequire(import.meta.url), styles=new Proxy({}, {get:(_,key)=>String(key)})
let activeLang='de'
const replacements={
  '@/components/Footer':{__esModule:true,default:()=>React.createElement('footer')},
  '@/components/InProgressBanner':{__esModule:true,default:()=>null},
  '@/components/lesson-template/StandardLessonShell':{__esModule:true,default:({children,lang,sections,sources})=>React.createElement('main',{lang,dir:lang==='fa'?'rtl':'ltr','data-sections':sections.map(s=>s.id).join(',')},children,sources),LessonSection:({id,title,children})=>React.createElement('section',{id,'aria-label':title},children),LessonSources:({items})=>React.createElement('aside',{'data-references':items.map(item=>item.href).join('|')})},
  '@/providers/LanguageProvider':{useLanguage:()=>({lang:activeLang})},
  '@/data/technikGrundlagenLesson':{TECHNIK_GRUNDLAGEN:lesson},
  '../kontrastmittel/page.module.css':{__esModule:true,default:styles},
}
const pageSource=fs.readFileSync('app/technik/grundlagen/StandardPage.jsx','utf8')
const source=transformSync(pageSource,{loader:'jsx',jsx:'automatic',format:'cjs'}).code,module={exports:{}}
new Function('require','module','exports',source)(name=>Object.hasOwn(replacements,name)?replacements[name]:require(name),module,module.exports)
const Page=module.exports.default
for(const lang of langs){activeLang=lang;const html=renderToStaticMarkup(React.createElement(Page));assert.ok(html.includes(`lang="${lang}"`)&&html.includes(`dir="${lang==='fa'?'rtl':'ltr'}"`),`${lang} document direction`);assert.ok(html.includes('id="atom"'),`${lang} atom section`);assert.ok(html.includes(atom.visuals[0].src),`${lang} diagram`);assert.ok(html.includes(atom.visuals[0].alt[lang]),`${lang} localized diagram alt`);assert.ok(html.includes(atom.visuals[0].caption[lang]),`${lang} localized diagram labels`);assert.ok(html.includes(`id="technik-atom-check-title"`),`${lang} atom check linked to section`);assert.ok(html.includes(lang==='de'?'Selbstcheck: Anregung oder Ionisation?':lang==='en'?'Self-check: excitation or ionization?':'خودآزمایی: برانگیختگی یا یونش؟'),`${lang} localized check`);for(const option of (lang==='de'?['Ionisation: Das Atom hat ein Elektron verloren.','Anregung: Das Elektron bleibt gebunden und besetzt vorübergehend ein höheres Niveau.','Indirekte Ionisation durch ein neutrales Photon.'] : lang==='en'?['Ionization: the atom lost an electron.','Excitation: the electron remains bound and temporarily occupies a higher level.','Indirect ionization by a neutral photon.']:['یونش: اتم یک الکترون از دست داده است.','برانگیختگی: الکترون مقید می‌ماند و موقتاً تراز بالاتری را اشغال می‌کند.','یونش غیرمستقیم بر اثر فوتون خنثی.']))assert.ok(html.includes(option),`${lang} localized option`);for(const row of atom.rows)assert.ok(html.includes(row[0][lang]),`${lang} localized row`);assert.ok(html.includes(atom.note[lang]),`${lang} source correction`);assert.ok(atom.references.every(ref=>html.includes(ref.href)),`${lang} learner-facing references`)}
const curriculum=fs.readFileSync('data/curriculum.js','utf8')
assert.match(curriculum,/\{ id: 'roentgen-physikalische-grundlagen',[^\n]*link: '\/technik\/grundlagen#atom',[^\n]*inProgress: true/)
assert.match(pageSource,/copy\.feedback\[answer\]/,'selected answer displays its option-specific explanation')
assert.equal((pageSource.match(/feedback: \[/g)||[]).length,3,'the check supplies separate feedback arrays for all three languages')
const svg=fs.readFileSync('public/technik/grundlagen/atom-ionisation.svg','utf8'),ledger=fs.readFileSync('docs/lesson-quality/technik-atomstruktur-ionisation-p25-p27.md','utf8')
assert.doesNotMatch(svg,/<text|<title|<desc/i);assert.match(ledger,/NIST XCOM/);assert.match(ledger,/universal 5 eV ionization threshold/)
console.log('Technik atom section SSR audit PASS: DE/EN/FA, RTL, localized diagram, source qualification, Z/A/isotope coverage and ledger.')
