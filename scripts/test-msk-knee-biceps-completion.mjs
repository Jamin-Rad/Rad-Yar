import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { build } from 'esbuild'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import sharp from 'sharp'
import { KNEE_BICEPS_COMPLETION, KNEE_BICEPS_CORRECT_INDEX } from '../data/kneeBicepsCompletion.js'
import { KNIE_LIGAMENTE_QUESTIONS, KNIE_LIGAMENTE_FLASHCARDS } from '../data/knieligamente.js'

const root = process.cwd()
const bundle = path.join(root, 'tmp/knee-biceps-route.cjs')
await build({
  absWorkingDir: root, entryPoints: ['app/msk/knie/kreuzbaender/page.js'], outfile: bundle,
  bundle: true, platform: 'node', format: 'cjs', jsx: 'automatic', loader: { '.js': 'jsx' }, external: ['react', 'react-dom', 'next/*'],
  plugins: [{ name: 'route-fixtures', setup(builder) {
    builder.onResolve({ filter: /^@\/providers\/LanguageProvider$/ }, () => ({ path: 'language', namespace: 'fixture' }))
    builder.onResolve({ filter: /^@\/hooks\/useLessonReadStatus$/ }, () => ({ path: 'progress', namespace: 'fixture' }))
    builder.onLoad({ filter: /.*/, namespace: 'fixture' }, ({ path: key }) => ({ contents: key === 'language' ? "export function useLanguage(){return {lang:globalThis.__testLang}}" : 'export function useLessonReadStatus(){return {isRead:false,toggleRead(){},authError:false}}', loader: 'js' }))
    builder.onResolve({ filter: /\.css$/ }, args => ({ path: path.resolve(args.resolveDir, args.path), namespace: 'css' }))
    builder.onLoad({ filter: /.*/, namespace: 'css' }, () => ({ contents: 'export default new Proxy({}, {get:(_,key)=>String(key)})', loader: 'js' }))
    builder.onResolve({ filter: /^@\// }, args => {
      const base = path.join(root, args.path.slice(2))
      return { path: ['', '.js', '.jsx', '.json'].map(ext => base + ext).find(candidate => fs.existsSync(candidate)) }
    })
  }}],
})
const require = createRequire(import.meta.url)
const Page = require(bundle).default
assert.equal(KNEE_BICEPS_CORRECT_INDEX, 1)
for (const lang of ['de', 'en', 'fa']) {
  globalThis.__testLang = lang
  const copy = KNEE_BICEPS_COMPLETION[lang]
  const html = renderToStaticMarkup(React.createElement(Page))
  for (const expected of ['biceps-femoris-injury-followup.jpg', 'plc-anatomy-axial.png', 'data-teaching="biceps-femoris"', '10.1055/s-0041-1741106', copy.title, copy.question]) assert.ok(html.includes(expected), `${lang}: missing ${expected}`)
  assert.ok(!html.includes('src="/knieligamente/arcuate-sign.png"'), `${lang}: mislabeled normal-anatomy figure must not be referenced`)
  assert.ok(html.includes(`dir="${lang === 'fa' ? 'rtl' : 'ltr'}"`))
  assert.equal(copy.options.length, 4)
  assert.equal(copy.feedback.length, 4)
  const question = KNIE_LIGAMENTE_QUESTIONS[lang].find(item => item.id === `kreuzbaender-${lang}-08`)
  assert.equal(question.correct, 'B')
  assert.equal(question.options.length, 4)
  for (let index = 0; index < 4; index++) {
    assert.equal(question.options[index].text, copy.options[index])
    assert.ok(copy.feedback[index]?.trim())
  }
  assert.equal(question.question, copy.question)
  assert.equal(question.options[1].text, copy.options[1])
  assert.equal(question.explanation, copy.feedback[1])
  assert.ok(KNIE_LIGAMENTE_FLASHCARDS.find(card => card.id === 'kreuzbaender-07').answer[lang])
  assert.equal(new Set(KNIE_LIGAMENTE_QUESTIONS[lang].map(item => item.id)).size, KNIE_LIGAMENTE_QUESTIONS[lang].length)
}
const metadata = await sharp('public/knieligamente/biceps-femoris-injury-followup.jpg').metadata()
assert.equal(metadata.width, 1027)
assert.equal(metadata.height, 534)
assert.deepEqual(fs.readFileSync('public/knieligamente/plc-anatomy-axial.png'), fs.readFileSync('public/knieligamente/arcuate-sign.png'))
console.log('Knee biceps completion PASS: real route SSR DE/EN/FA, corrected image linkage, source reference, original montage dimensions, and linked assessment/card equivalence. Browser and scientific gates separate.')
