import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { TECHNIK_DOSIMETRIE_LESSON as lesson } from '../data/technikDosimetrieLesson.js'

const langs = ['de', 'en', 'fa']
const persian = /[\u0600-\u06ff]/u
let units = 0
function inspect(value) {
  if (!value || typeof value !== 'object') return
  if (langs.every(lang => typeof value[lang] === 'string')) {
    units++
    assert.ok(langs.every(lang => value[lang].trim()), 'translation must not be empty')
    assert.ok(!persian.test(value.de) && !persian.test(value.en) && persian.test(value.fa), 'translation stored in wrong language slot')
  } else Object.values(value).forEach(inspect)
}
inspect(lesson)
assert.equal(lesson.id, 'dosisgroessen-dosimetrie')
assert.equal(lesson.chapters.length, 5)
assert.equal(lesson.question.answer, 1)
assert.equal(lesson.question.options.length, 3)
assert.equal(lesson.summary.length, 4)
assert.match(lesson.chapters[1].paragraphs[0].de, /Gray \(Gy = J\/kg\)/)
assert.match(lesson.chapters[1].paragraphs[1].en, /organ or tissue/)
assert.match(lesson.chapters[1].paragraphs[2].fa, /پیش‌بینی خطر فردی/)
assert.match(lesson.chapters[2].paragraphs[1].de, /CTDIvol × Scanlänge/)
assert.match(lesson.chapters[2].paragraphs[2].en, /does not specify depth-dose distribution or the dose to a particular organ/)
assert.match(lesson.chapters[3].paragraphs[0].de, /enthält keine Rückstreuung/)
assert.match(lesson.chapters[3].paragraphs[1].en, /calibrated TLD/)
assert.match(lesson.chapters[3].paragraphs[2].fa, /به‌تنهایی دوز پوست فرد نیست/)
assert.match(lesson.summary[3].en, /DFP\/KAP alone is not an individual skin dose/)

const require = createRequire(import.meta.url)
const styles = new Proxy({}, { get: (_, key) => String(key) })
const replacements = {
  './page.module.css': { __esModule: true, default: styles },
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: activeLang }) },
  '@/components/lesson-template/StandardLessonShell': {
    __esModule: true,
    default: ({ children, lang, title, sections, theme, sources, actions, heroImageAlt }) => React.createElement('main', { lang, dir: lang === 'fa' ? 'rtl' : 'ltr', 'data-lesson-title': title, 'data-hero': theme.heroImage, 'data-hero-alt': heroImageAlt, 'data-actions': JSON.stringify(actions), 'data-section-ids': sections.map(section => section.id).join(',') }, children, sources),
    LessonSection: ({ id, title, children }) => React.createElement('section', { id, 'aria-label': title }, children),
    LessonSources: ({ title, items, note }) => React.createElement('aside', { 'data-sources': items.map(item => item.href).join('|'), 'data-source-scopes': items.map(item => item.scope).join('|'), 'data-source-note': note }, title),
  },
  '@/data/technikDosimetrieLesson': { TECHNIK_DOSIMETRIE_LESSON: lesson },
}
function compile(path) {
  const source = transformSync(fs.readFileSync(path, 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
  const module = { exports: {} }
  new Function('require', 'module', 'exports', source)((name) => Object.hasOwn(replacements, name) ? replacements[name] : require(name), module, module.exports)
  return module.exports.default
}
let activeLang = 'de'
const Page = compile('app/technik/dosimetrie/page.jsx')
const htmlFor = lang => { activeLang = lang; return renderToStaticMarkup(React.createElement(Page)) }
const curriculum = fs.readFileSync('data/curriculum.js', 'utf8')
assert.match(curriculum, /id: 'dosisgroessen-dosimetrie'[^\n]+link: '\/technik\/dosimetrie'[^\n]+inProgress: true/)
assert.ok(!fs.readFileSync('data/lessonStatus.js', 'utf8').includes('/technik/dosimetrie'), 'do not declare scientific completion')
const expectedScopes = {
  de: ['Definitionen und vorgesehene Anwendung', 'Erläutert die Grenzen der Effektivdosis', 'CTDIvol und DLP als Scanner-Ausgabegrößen', 'Grenzen von CTDI/DLP als Ersatzgrößen', 'Definition und Bedeutung des KAP/Luftkerma-Flächen-Produkts', 'Definition und direkte bzw. indirekte Bestimmung'],
  en: ['Definitions and intended use of absorbed', 'Clarifies the limitations of effective dose', 'CTDIvol and DLP as scanner-output quantities', 'Limits of CTDI/DLP as surrogates', 'Definition and use of KAP/air kerma-area product', 'Definitions and direct or indirect assessment'],
  fa: ['تعریف و کاربرد موردنظر دوز جذب‌شده', 'محدودیت‌های دوز مؤثر در برآورد خطر فردی', 'CTDIvol و DLP به‌عنوان کمیت‌های خروجی دستگاه', 'محدودیت CTDI و DLP به‌عنوان شاخص‌های جایگزین', 'تعریف و کاربرد KAP یا حاصل‌ضرب کرما در مساحت', 'تعریف و سنجش مستقیم یا غیرمستقیم'],
}

for (const lang of langs) {
  const html = htmlFor(lang)
  assert.ok(html.includes(`lang="${lang}"`) && html.includes(`dir="${lang === 'fa' ? 'rtl' : 'ltr'}"`), `${lang}: language and direction`)
  assert.ok(html.includes('data-hero="/technik/dosimetrie/hero.svg"') && html.includes(lesson.heroAlt[lang]), `${lang}: topic-specific schematic and alt text`)
  assert.ok(html.includes('data-section-ids="which-question,protection-quantities,scanner-indices,entrance-surface,decision,take-home"'), `${lang}: lesson navigation sections`)
  for (const chapter of lesson.chapters) assert.ok(html.includes(`aria-label="${chapter.title[lang]}"`), `${lang}: chapter title ${chapter.id}`)
  for (const option of lesson.question.options) assert.ok(html.includes(option[lang]), `${lang}: self-check option`)
  assert.ok(html.includes('CTDI<sub>vol</sub>') && html.includes('mGy × cm = mGy·cm'), `${lang}: dimensional relationship`)
  assert.ok(html.includes('Kₑ') && html.includes('Kᵢ') && html.includes('×') && html.includes(lang === 'de' ? 'Rückstreufaktor' : lang === 'en' ? 'backscatter factor' : 'ضریب پس‌پراکندگی'), `${lang}: entrance-surface air kerma backscatter-factor relationship`)
  assert.ok(html.includes('https://www.icrp.org/publication.asp?id=ICRP+Publication+103') && html.includes('https://www.aapm.org/pubs/reports/detail.asp?docid=190') && html.includes('https://www-pub.iaea.org/MTCD/Publications/PDF/PUB1983_web.pdf') && html.includes('https://www-pub.iaea.org/MTCD/publications/PDF/TRS457_web.pdf'), `${lang}: primary sources`)
  for (const scope of expectedScopes[lang]) assert.ok(html.includes(scope), `${lang}: translated source scope: ${scope}`)
}
const route = fs.readFileSync('app/technik/dosimetrie/page.jsx', 'utf8')
assert.ok(route.includes('StandardLessonShell') && route.includes('syncHashNavigation') && route.includes('pick(lesson.question.feedback, lang)'))
for (const lang of langs) assert.ok(lesson.question.feedback[lang].trim(), `${lang}: assessment feedback exists`)
const svg = fs.readFileSync('public/technik/dosimetrie/hero.svg', 'utf8')
assert.match(svg, /Not patient data/)
const ledger = fs.readFileSync('docs/lesson-quality/technik-dosimetrie-p5-p8.md', 'utf8')
assert.match(ledger, /PDF pp\. 5–8/)
assert.match(ledger, /PDF p\.9[\s\S]*?not claimed covered/)
assert.match(ledger, /D-06[\s\S]*?entrance-surface air kerma/)
console.log(`Dose-quantities route audit PASS: ${units} localized content units; DE/EN/FA static route render and RTL; 5 chapters; 3-option explanatory inline assessment; exact curriculum mapping; schematic provenance; primary-source links.`)
