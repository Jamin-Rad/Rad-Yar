import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { build } from 'esbuild'
import React from 'react'
import { renderToString } from 'react-dom/server'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const bundle = path.join(root, 'tmp', 'upper-limb-arteries-ssr.cjs')
fs.mkdirSync(path.dirname(bundle), { recursive: true })

await build({
  absWorkingDir: root,
  entryPoints: ['app/gefaesse/anatomie-obere-extremitaet/page.jsx'],
  outfile: bundle,
  bundle: true,
  jsx: 'automatic',
  platform: 'node',
  format: 'cjs',
  external: ['react', 'react-dom', 'next/*'],
  plugins: [{
    name: 'radyar-ssr-fixtures',
    setup(builder) {
      builder.onResolve({ filter: /^@\/providers\/LanguageProvider$/ }, () => ({ path: 'language-provider', namespace: 'fixture' }))
      builder.onLoad({ filter: /.*/, namespace: 'fixture' }, () => ({ contents: "export function useLanguage(){return {lang:globalThis.__testLang||'de'}}", loader: 'js' }))
      builder.onResolve({ filter: /\.css$/ }, args => ({ path: path.resolve(args.resolveDir, args.path), namespace: 'css-mock' }))
      builder.onLoad({ filter: /.*/, namespace: 'css-mock' }, () => ({ contents: 'export default new Proxy({}, { get: (_, key) => String(key) })', loader: 'js' }))
      builder.onResolve({ filter: /^@\// }, args => {
        const base = path.resolve(root, args.path.slice(2))
        const resolved = ['', '.js', '.jsx', '.mjs', '.json'].map(ext => `${base}${ext}`).find(file => fs.existsSync(file))
        return resolved ? { path: resolved } : { errors: [{ text: `Unresolved alias: ${args.path}` }] }
      })
    },
  }],
})

const require = createRequire(import.meta.url)
const Page = require(bundle).default
const { UPPER_ARTERY_CHECKS: checks, UPPER_ARTERY_QUESTIONS: questions, UPPER_ARTERY_CARDS: cards } = await import('../data/upperLimbArteriesLesson.js')
for (const lang of ['de','en','fa']) {
  globalThis.__testLang=lang
  const html=renderToString(React.createElement(Page))
  assert.equal((html.match(/<h1\b/g)||[]).length,1)
  assert.ok(html.includes(`lang="${lang}"`))
  assert.ok(html.includes(`dir="${lang==='fa'?'rtl':'ltr'}"`))
  for (const id of ['landmarken','unterarm','hand','verlauf-pruefen']) {
    const panel=html.match(new RegExp(`<div id="${id}-panel"[^>]*>`))?.[0]
    assert.ok(panel,`${lang} missing ${id}`)
    assert.equal(panel.includes('hidden=""'),id!=='landmarken')
  }
  for (const src of ['/educational/upper-limb-arteries/hero.png']) assert.ok(html.includes(src))
  assert.ok(html.includes('themen=arterien-obere-extremitaet'))
  assert.ok(html.includes('fach=gefaesse-ir'))
  assert.ok(html.includes('/lernen/gefaesse-ir'))
  assert.ok(html.includes('/flashcards/arterien-obere-extremitaet'))
  assert.ok(!html.includes('Befund &amp; Selbsttest'))
  for (const q of questions[lang]) {
    assert.equal(q.options.length,4)
    assert.equal(new Set(q.options.map(o=>o.text)).size,4)
    assert.ok(q.options.some(o=>o.id===q.correct))
    assert.equal(Object.keys(q.wrongExplanations).length,3)
    assert.ok(q.explanation && q.source)
  }
  for (const card of cards) for (const key of ['front','answer','explanation']) assert.ok(card[key][lang])
}
assert.deepEqual(checks.map(q=>q.correct),[1,2])
const source=fs.readFileSync(path.join(root,'app/gefaesse/anatomie-obere-extremitaet/page.jsx'),'utf8')
assert.ok(source.includes('item.feedback[answer]'))
assert.ok(source.includes('aria-pressed={answer===i}'))
assert.ok(fs.statSync(path.join(root,'public/educational/upper-limb-arteries/hero.png')).size>1000)
for (const lang of ['de','en','fa']) for (const q of questions[lang]) assert.equal(q.fach,'gefaesse-ir')
console.log('Upper-limb artery SSR passes DE/EN/FA: shared shell, single open chapter, localized RTL diagrams, four-option banks, feedback, cards and gefaesse-ir training routes.')

const layoutSource=fs.readFileSync(path.join(root,'app/gefaesse/anatomie-obere-extremitaet/layout.js'),'utf8')
for (const marker of ['<Navbar />','<Footer />','<LearningAccessGate>','<LessonInProgressGate>']) assert.ok(layoutSource.includes(marker),`route layout missing ${marker}`)
