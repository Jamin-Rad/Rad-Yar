import assert from 'node:assert/strict'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync, buildSync } from 'esbuild'

const require = createRequire(import.meta.url)
const lesson = require('../data/diffuseGliomaLesson.js')
const styles = new Proxy({}, { get: (_, key) => String(key) })
const Link = ({ href, children, ...props }) => React.createElement('a', { href, ...props }, children)
const compile = (path, overrides) => {
  const code = transformSync(fs.readFileSync(path, 'utf8'), { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
  const mod = { exports: {} }
  new Function('require', 'module', 'exports', code)(name => Object.hasOwn(overrides, name) ? overrides[name] : require(name), mod, mod.exports)
  return mod.exports
}
const shell = compile('components/lesson-template/StandardLessonShell.jsx', {
  'next/link': { __esModule: true, default: Link },
  '@/hooks/usePersistedSectionProgress': { usePersistedSectionProgress: () => React.useState(() => new Set()) },
  '@/hooks/useLehrModeActive': { useLehrModeActive: () => false },
  '@/components/LessonHero': { __esModule: true, default: ({ title, imageSrc, imageAlt }) => React.createElement('header', null, React.createElement('h1', null, title), React.createElement('img', { src: imageSrc, alt: imageAlt })) },
  '@/lib/lessonHashNavigation': { observeLessonHash: () => () => {} },
  './StandardLessonShell.module.css': { __esModule: true, default: styles },
})
let lang = 'de'
const Page = compile('app/gehirn/tumoren/diffuse-gliome/page.jsx', {
  'next/link': { __esModule: true, default: Link },
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang }) },
  '@/components/lesson-template/StandardLessonShell': shell,
  '@/data/diffuseGliomaLesson': lesson,
  './page.module.css': { __esModule: true, default: styles },
}).default
function checkLocales(obj, path = 'data') {
  if (!obj || typeof obj !== 'object') return
  if ('de' in obj || 'en' in obj || 'fa' in obj) {
    assert.deepEqual(Object.keys(obj).sort(), ['de', 'en', 'fa'], path)
    for (const locale of ['de', 'en', 'fa']) {
      assert.equal(typeof obj[locale], 'string', `${path}.${locale}`)
      assert.ok(obj[locale].trim(), `${path}.${locale}`)
      if (locale !== 'fa') assert.doesNotMatch(obj[locale], /[\u0600-\u06ff]/, `Persian leaked into ${path}.${locale}`)
    }
    return
  }
  for (const [key, value] of Object.entries(obj)) checkLocales(value, `${path}.${key}`)
}
for (const [key, value] of Object.entries(lesson)) if (key !== 'DIFFUSE_GLIOMA_QUESTIONS') checkLocales(value, key)
for (lang of ['de', 'en', 'fa']) {
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${lang}"`) && html.includes(`dir="${lang === 'fa' ? 'rtl' : 'ltr'}"`))
  for (const section of lesson.DIFFUSE_GLIOMA_SECTIONS) assert.ok(html.includes(`id="${section.id}"`), `Missing ${section.id}`)
  for (const id of lesson.DIFFUSE_GLIOMA_TOPIC_IDS) {
    assert.ok(html.includes(`/flashcards/${id}`))
    assert.ok(html.includes(`themen=${id}&amp;from=`))
    assert.ok(html.includes(`aria-labelledby="${id}-check"`))
  }
  assert.ok(html.includes('/educational/diffuse-glioma/hero.png'), 'Conceptual hero remains separate from diagnostic figures')
  for (const key of ['astro', 'oligo', 'gbm', 'gbmTypical']) {
    const copy = lesson.DIFFUSE_GLIOMA_COPY[key]
    assert.ok(html.includes(copy.alt[lang]))
    assert.ok(html.includes(copy.caption[lang]))
  }
  assert.doesNotMatch(html, /Befund &amp; Selbsttest|undefined|\[object Object\]/)
  const questions = lesson.DIFFUSE_GLIOMA_QUESTIONS[lang]
  assert.equal(questions.length, 3)
  assert.equal(new Set(questions.map(q => q.id)).size, 3)
  for (const q of questions) {
    assert.equal(q.options.length, 4, 'Shared quiz requires four options')
    assert.ok(q.options.some(o => o.id === q.correct))
    assert.deepEqual(Object.keys(q.wrongExplanations).sort(), q.options.map(o => o.id).filter(id => id !== q.correct).sort())
    assert.equal(q.tags.length, 1)
    assert.ok(lesson.DIFFUSE_GLIOMA_TOPIC_IDS.includes(q.tags[0]))
  }
}
const bundleModule = path => {
  const mod = { exports: {} }
  const { outputFiles } = buildSync({ entryPoints: [path], bundle: true, platform: 'node', format: 'cjs', write: false })
  new Function('require', 'module', 'exports', outputFiles[0].text)(require, mod, mod.exports)
  return mod.exports
}
const registry = bundleModule('data/questions.js')
const cards = bundleModule('data/flashcards.js')
const curriculum = bundleModule('data/curriculum.js')
for (const id of lesson.DIFFUSE_GLIOMA_TOPIC_IDS) {
  for (const locale of ['de', 'en', 'fa']) {
    const selected = registry.getQuestions([id], locale, 100)
    assert.equal(selected.length, 1, `${id}/${locale}: exact topic yields exactly one authored question`)
    assert.ok(selected[0].id.startsWith(`${id}-${locale}-`))
  }
  assert.equal(cards.getCardsByTopic(id).length, 2, `${id}: exact topic yields two cards`)
  const topic = curriculum.CURRICULUM.flatMap(subject => subject.kapitel).flatMap(chapter => chapter.themen).find(topic => topic.id === id)
  assert.equal(topic.link, `${lesson.DIFFUSE_GLIOMA_PATH}#${id}`)
}
for (const id of lesson.DIFFUSE_GLIOMA_TOPIC_IDS) assert.equal(lesson.DIFFUSE_GLIOMA_FLASHCARDS.filter(c => c.topicId === id).length, 2)
const provenance = JSON.parse(fs.readFileSync('public/educational/diffuse-glioma/provenance.json', 'utf8'))
for (const figure of provenance.figures) {
  assert.ok(fs.statSync(`public${figure.asset}`).size > 10000)
  assert.deepEqual(figure.alt, lesson.DIFFUSE_GLIOMA_COPY[figure.copyKey].alt)
  assert.deepEqual(figure.caption, lesson.DIFFUSE_GLIOMA_COPY[figure.copyKey].caption)
  assert.equal(figure.transformations, 'none')
}
console.log('PASS diffuse glioma: real shared-shell SSR in DE/EN/FA, exact curriculum anchors, production filters return one four-option MCQ/topic/locale and two cards/topic, conceptual hero separate from four clinical figures, localized provenance. Browser interaction is a separate check.')
