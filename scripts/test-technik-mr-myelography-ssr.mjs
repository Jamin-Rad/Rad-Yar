import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { build } from 'esbuild'
import React from 'react'
import { renderToString } from 'react-dom/server'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const bundle = path.join(root, 'tmp', 'mr-myelography-ssr.cjs')
fs.mkdirSync(path.dirname(bundle), { recursive: true })

await build({
  absWorkingDir: root,
  entryPoints: ['app/technik/mr-myelographie/page.jsx'],
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
      builder.onLoad({ filter: /.*/, namespace: 'fixture' }, () => ({ contents: "export function useLanguage(){return {lang:globalThis.__testLang||'de',texts:{footerLegalLink:'RadYar',footerCopy:'RadYar'}}}", loader: 'js' }))
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
const { MR_MYEL_CHECKS: checks, MR_MYEL_QUESTIONS: questions, MR_MYEL_CARDS: cards } = await import('../data/technikMrMyelographyLesson.js')
for (const lang of ['de','en','fa']) {
  globalThis.__testLang=lang
  const html=renderToString(React.createElement(Page))
  assert.equal((html.match(/<h1\b/g)||[]).length,1)
  assert.ok(html.includes(`lang="${lang}"`))
  assert.ok(html.includes(`dir="${lang==='fa'?'rtl':'ltr'}"`))
  for (const id of ['liquorkontrast','datensatz','aussagegrenzen','anwendung']) {
    const panel=html.match(new RegExp(`<div id="${id}-panel"[^>]*>`))?.[0]
    assert.ok(panel,`${lang} missing ${id}`)
    assert.equal(panel.includes('hidden=""'),id!=='liquorkontrast')
  }
  for (const src of ['/educational/mr-myelography/hero.png']) assert.ok(html.includes(src))
  assert.ok(html.includes('themen=mr-myelographie'))
  assert.ok(html.includes('fach=technik'))
  assert.ok(html.includes('/lernen/technik'))
  assert.ok(html.includes('/flashcards/mr-myelographie'))
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
const source=fs.readFileSync(path.join(root,'app/technik/mr-myelographie/page.jsx'),'utf8')
assert.ok(source.includes('item.feedback[answer]'))
assert.ok(source.includes('aria-pressed={answer===i}'))
assert.ok(fs.statSync(path.join(root,'public/educational/mr-myelography/hero.png')).size>1000)
for (const lang of ['de','en','fa']) for (const q of questions[lang]) assert.equal(q.fach,'technik')
console.log('MR myelography SSR passes DE/EN/FA: shared shell, single open chapter, localized RTL diagrams, four-option banks, feedback, cards and technik training routes.')

const layoutSource=fs.readFileSync(path.join(root,'app/technik/layout.js'),'utf8')
for (const marker of ['<Navbar />','<LearningAccessGate>','<LessonInProgressGate>']) assert.ok(layoutSource.includes(marker))
assert.ok(source.includes('<Footer/>'))
