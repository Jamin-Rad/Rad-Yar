import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { TECHNIK_GRUNDLAGEN } from '../data/technikGrundlagenLesson.js'
import { QUESTION_BANK, MCQ_TOPIC_GROUPS } from '../data/questions.js'
import { FLASHCARD_TOPICS, getCardsByTopic } from '../data/flashcards.js'
import { CT_PROTOCOL_BLOCK, CT_PROTOCOL_TOPIC } from '../data/technikCTProtocolLesson.js'

const langs = ['de','en','fa']
const section = TECHNIK_GRUNDLAGEN.sections.find(item => item.id === 'protokoll')
assert.ok(section)
assert.equal(section.curriculumId.includes(CT_PROTOCOL_TOPIC.id), true)
assert.deepEqual(section.teachingBlocks, [CT_PROTOCOL_BLOCK])
assert.equal(CT_PROTOCOL_BLOCK.rows.length, 9)
assert.equal(CT_PROTOCOL_BLOCK.visual.legend.length, 5, 'each phase timeline node has a visible localized key')
assert.ok(fs.existsSync(`public${CT_PROTOCOL_BLOCK.visual.src}`))
const svg = fs.readFileSync(`public${CT_PROTOCOL_BLOCK.visual.src}`, 'utf8')
assert.match(svg, /<svg/)
assert.doesNotMatch(svg, /<text\b/i, 'phase diagram is language-neutral')
assert.ok(MCQ_TOPIC_GROUPS.flatMap(group => group.topics).some(topic => topic.id === CT_PROTOCOL_TOPIC.id))
assert.ok(FLASHCARD_TOPICS.some(topic => topic.id === CT_PROTOCOL_TOPIC.id))
assert.equal(getCardsByTopic(CT_PROTOCOL_TOPIC.id).length, 5)
for (const lang of langs) {
  const question = QUESTION_BANK[lang].find(item => item.id === `ct-protocol-${lang}-pancreas-phase`)
  assert.ok(question, `${lang}: protocol MCQ registered`)
  assert.equal(question.correct, 'A')
  assert.equal(question.options.length, 4)
  assert.deepEqual(Object.keys(question.wrongExplanations).sort(), ['B','C','D'])
  assert.ok(question.explanation.length > 100)
  for (const option of question.options) assert.ok(option.text.length > 40, `${lang}: substantive option ${option.id}`)
  for (const feedback of Object.values(question.wrongExplanations)) assert.ok(feedback.length > 50, `${lang}: specific distractor rationale`)
  const optionC = question.options.find(option => option.id === 'C').text
  assert.match(optionC, { de:/Früharteriell.*Gefäßphase/, en:/Early arterial.*vascular phase/, fa:/شریانی زودرس.*عروقی/ }[lang], `${lang}: plausible early-vs-late arterial distractor`)
  assert.match(question.wrongExplanations.C, { de:/Früh- und spätarterielle Phasen/, en:/Early and late arterial phases/, fa:/زودرس و دیررس/ }[lang], `${lang}: specific feedback separates arterial phases`)
  assert.match(CT_PROTOCOL_BLOCK.rows[1][1][lang], { de:/Arterien.*wenig Kontrastmittel/, en:/Arteries.*little contrast/, fa:/شریان‌ها.*کنتراست کمی/ }[lang])
  assert.match(CT_PROTOCOL_BLOCK.rows[2][0][lang], { de:/Spätarteriell/, en:/Late arterial/, fa:/دیررس/ }[lang])
  assert.match(CT_PROTOCOL_BLOCK.rows[4][0][lang], { de:/kortikomedullär/, en:/corticomedullary/, fa:/کورتیکومدولاری/ }[lang])
  assert.match(CT_PROTOCOL_BLOCK.rows[8][1][lang], { de:/Anastomoseninsuffizienz.*Abszesskommunikation/, en:/anastomotic insufficiency.*abscess communication/, fa:/نارسایی آناستوموز.*ارتباط آبسه/ }[lang])
  for (const row of CT_PROTOCOL_BLOCK.rows) assert.ok(row[0][lang] && row[1][lang], `${lang}: row localized`)
  assert.ok(CT_PROTOCOL_BLOCK.visual.alt[lang] && CT_PROTOCOL_BLOCK.visual.legend[0][lang] && CT_PROTOCOL_BLOCK.visual.caption[lang] && CT_PROTOCOL_BLOCK.note[lang])
  const card = getCardsByTopic(CT_PROTOCOL_TOPIC.id)[0]
  assert.ok(card.front[lang] && card.answer[lang])
  const kidneyCard = getCardsByTopic(CT_PROTOCOL_TOPIC.id).find(item => item.id === 'ct-protocol-kidney')
  const oralCard = getCardsByTopic(CT_PROTOCOL_TOPIC.id).find(item => item.id === 'ct-protocol-oral')
  assert.ok(kidneyCard && oralCard, `${lang}: renal and oral-contrast cards registered`)
  assert.match(kidneyCard.front[lang], { de:/kortikomedullär.*exkretorisch/, en:/corticomedullary.*excretory/, fa:/کورتیکومدولاری.*دفعی/ }[lang], `${lang}: renal card asks both phase roles`)
  assert.match(kidneyCard.answer[lang], { de:/Gefäße.*frühe Läsionsanreicherung.*Nierenbecken.*Harnleiter/, en:/vessels.*early lesion enhancement.*collecting systems.*ureters/, fa:/عروق.*ضایعه.*لگنچه.*حالب/ }[lang], `${lang}: renal card covers early enhancement and excretion`)
  assert.match(oralCard.answer[lang], { de:/Anastomoseninsuffizienz.*Abszesskommunikation.*maskieren/, en:/anastomotic insufficiency.*abscess communication.*mask/, fa:/نارسایی آناستوموز.*ارتباط آبسه.*بپوشاند/ }[lang], `${lang}: oral card covers indications and masking limitations`)
}

const require = createRequire(import.meta.url)
const styles = new Proxy({}, { get: (_, key) => String(key) })
let activeLang = 'de'
const replacements = {
  '@/components/Footer': { __esModule:true, default:()=>React.createElement('footer') },
  '@/components/InProgressBanner': { __esModule:true, default:()=>null },
  '@/components/lesson-template/StandardLessonShell': {
    __esModule:true,
    default:({children,lang})=>React.createElement('main',{lang,dir:lang==='fa'?'rtl':'ltr'},children),
    LessonSection:({id,title,children})=>React.createElement('section',{id},React.createElement('h2',null,title),children),
    LessonSources:({items})=>React.createElement('aside',null,items.map(item=>React.createElement('a',{key:item.href,href:item.href},item.title))),
  },
  '@/providers/LanguageProvider': { useLanguage:()=>({lang:activeLang}) },
  '@/data/technikGrundlagenLesson': { TECHNIK_GRUNDLAGEN },
  '../kontrastmittel/page.module.css': { __esModule:true, default:styles },
}
const source = transformSync(fs.readFileSync('app/technik/grundlagen/StandardPage.jsx','utf8'),{loader:'jsx',jsx:'automatic',format:'cjs'}).code
const mod = {exports:{}}
new Function('require','module','exports',source)(name=>Object.hasOwn(replacements,name)?replacements[name]:require(name),mod,mod.exports)
const Page = mod.exports.default
for (const lang of langs) {
  activeLang=lang
  const html=renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${lang}"`) && html.includes(`dir="${lang==='fa'?'rtl':'ltr'}"`))
  assert.ok(html.includes(CT_PROTOCOL_BLOCK.title[lang]) && html.includes(CT_PROTOCOL_BLOCK.lead[lang]))
  assert.ok(html.includes(CT_PROTOCOL_BLOCK.visual.src) && html.includes(CT_PROTOCOL_BLOCK.visual.alt[lang]) && html.includes(CT_PROTOCOL_BLOCK.visual.legend[0][lang]))
  for (const key of CT_PROTOCOL_BLOCK.visual.legend) assert.ok(html.includes(key[lang]), `${lang}: visible localized key for each of the five nodes`)
  assert.ok(html.includes(CT_PROTOCOL_BLOCK.note[lang]))
  for (const row of CT_PROTOCOL_BLOCK.rows) assert.ok(html.includes(row[0][lang]) && html.includes(row[1][lang]), `${lang}: rendered ${row[0][lang]}`)
  assert.ok(html.includes(lang==='fa'?'تمرین فازهای CT':lang==='en'?'Practise CT phases':'CT-Phasen üben'))
  assert.ok(html.includes(`/ueben/quiz?fach=technik&amp;n=1&amp;themen=ct-methodik-km-phasen&amp;from=%2Ftechnik%2Fgrundlagen${lang==='de'?'':`%3Flang%3D${lang}`}%23protokoll`), `${lang}: localized quiz return link`)
  assert.ok(html.includes(`/flashcards/ct-methodik-km-phasen?from=%2Ftechnik%2Fgrundlagen${lang==='de'?'':`%3Flang%3D${lang}`}%23protokoll`), `${lang}: localized card return link`)
}
const curriculum=fs.readFileSync('data/curriculum.js','utf8').split('\n').find(line=>line.includes("id: 'ct-methodik-km-phasen'"))
assert.ok(curriculum)
assert.match(curriculum,/link: '\/technik\/grundlagen#protokoll'/)
assert.match(curriculum,/mcqLink: '\/ueben\/quiz\?fach=technik&n=1&themen=ct-methodik-km-phasen'/)
assert.match(curriculum,/flashcardLink: '\/flashcards\/ct-methodik-km-phasen'/)
assert.match(CT_PROTOCOL_BLOCK.note.de,/Zeitachsen.*unterscheiden/)
assert.match(CT_PROTOCOL_BLOCK.note.en,/timelines.*differ/)
assert.match(CT_PROTOCOL_BLOCK.note.fa,/محورهای زمانی.*تفاوت/)
console.log('CT protocol phase SSR/registry test PASS: pp.69–73 scope, organ rows, timeline, DE/EN/FA/RTL, MCQ/cards and localized actions.')
