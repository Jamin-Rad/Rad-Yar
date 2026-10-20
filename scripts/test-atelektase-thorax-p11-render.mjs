import fs from 'node:fs'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { HRCT_LESSONS, HRCT_QUESTIONS } from '../data/hrct-muster.js'

const require = createRequire(import.meta.url)
const styles = { default: new Proxy({}, { get: (_, key) => String(key) }) }
function compile(path, replacements) {
  const source = transformSync(fs.readFileSync(path, 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
  const module = { exports: {} }
  new Function('require', 'module', 'exports', source)(name => Object.hasOwn(replacements, name) ? replacements[name] : require(name), module, module.exports)
  return module.exports
}
const Link = ({ href, children, ...props }) => React.createElement('a', { href, ...props }, children)
let lang = 'de'
const Page = compile('components/HrctPatternLesson.jsx', {
  'next/link': Link,
  '@/components/InProgressBanner': () => null,
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang }) },
  '@/hooks/useLessonReadStatus': { useLessonReadStatus: () => ({ isRead: false, toggleRead: () => {}, authError: false }) },
  '@/hooks/useMobileLearningLayout': { useMobileLearningLayout: () => false },
  '@/app/abdomen/gi/divertikulitis/page.module.css': styles,
}).default
const lesson = HRCT_LESSONS['hrct-dichteanhebung']
assert.ok(lesson.sourceReferences.some(ref => ref.source === 'Thorax.pdf' && ref.pages.includes(11)))
const atelectasis = lesson.sections.find(section => section.id === 'atelektase')
assert.ok(atelectasis)
for (const [locale, snippets] of Object.entries({ de: ['Minderbelüftung', 'resorbiert', 'Mediastinum'], en: ['reduced ventilation', 'resorbed', 'mediastinum'], fa: ['کاهش تهویه', 'بازجذب', 'مدیاستن'] })) {
  const prose = atelectasis.cards.map(card => card.text[locale]).join(' ')
  for (const snippet of snippets) assert.ok(prose.toLowerCase().includes(snippet.toLowerCase()), `${locale}: source point ${snippet}`)
}
assert.equal(atelectasis.images.length, 1, 'one diagnostic CT image; no unrelated image or decorative comet')
assert.match(atelectasis.images[0].src, /image2\.jpeg$/)
assert.match(atelectasis.images[0].radiopaediaUrl, /8563/)
const provenance = JSON.parse(fs.readFileSync('public/hrct/dichteanhebung/image2.jpeg.provenance.json', 'utf8'))
assert.equal(provenance.pdf_page, 11)
assert.equal(provenance.source_identifier_visible_in_pdf, 'Radiopaedia rID 8563')
assert.match(provenance.contributor, /Not visible/)
assert.match(provenance.external_license, /Not established/)
assert.match(atelectasis.cave.en, /mimic a peripheral neoplasm/)
const roundedQuestion = HRCT_QUESTIONS.en.find(question => question.question.includes('rounded atelectasis'))
assert.ok(roundedQuestion, 'retrieval question exists in English')
assert.match(roundedQuestion.explanation, /No single sign should be treated as proof/)
for (const locale of ['de', 'en', 'fa']) {
  lang = locale
  const html = renderToStaticMarkup(React.createElement(Page, { lesson }))
  assert.ok(html.includes(`lang="${locale}"`) && html.includes(`dir="${locale === 'fa' ? 'rtl' : 'ltr'}"`), `${locale}: language/direction`)
  assert.ok(html.includes('id="atelektase"'), `${locale}: section anchor`)
  for (const card of atelectasis.cards) {
    assert.ok(html.includes(card.title[locale]), `${locale}: card title`)
    assert.ok(html.includes(card.text[locale]), `${locale}: card text`)
  }
  assert.ok(html.includes(atelectasis.cave[locale]), `${locale}: differential caveat`)
  assert.ok(html.includes(atelectasis.images[0].caption[locale]), `${locale}: CT case caption`)
}
console.log('Atelektase Thorax.pdf p.11 SSR PASS: DE/EN/FA, RTL, source scope, volume-loss teaching, rounded-atelectasis differential, single relevant CT case, linked retrieval QA.')
