import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { build } from 'esbuild'
import React from 'react'
import { renderToString } from 'react-dom/server'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const bundle = path.join(root, 'tmp', 'thorax-pectus-ssr.cjs')
fs.mkdirSync(path.dirname(bundle), { recursive: true })

await build({
  absWorkingDir: root,
  entryPoints: ['app/thorax/pectus-excavatum/page.jsx'],
  outfile: bundle,
  bundle: true,
  jsx: 'automatic',
  loader: { '.js':'jsx' },
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
const { PECTUS_QUESTIONS: questions, PECTUS_FLASHCARDS: cards, PECTUS_LESSON: lesson } = await import('../data/thoraxPectusLesson.js')
for (const lang of ['de','en','fa']) {
  globalThis.__testLang=lang
  const html=renderToString(React.createElement(Page))
  assert.equal((html.match(/<h1\b/g)||[]).length,1)
  assert.ok(html.includes(`lang="${lang}"`))
  assert.ok(html.includes(`dir="${lang==='fa'?'rtl':'ltr'}"`))
  for (const id of ['pattern','localise','summary']) {
    const panel=html.match(new RegExp(`<div id="${id}-panel"[^>]*>`))?.[0]
    assert.ok(panel,`${lang} missing ${id}`)
    assert.equal(panel.includes('hidden=""'),id!=='pattern')
  }
  assert.ok(html.includes('themen=pectus-excavatum'))
  assert.ok(html.includes('/ueben/quiz?'))
  assert.ok(html.includes('/flashcards/pectus-excavatum'))
  assert.ok(html.includes('33208'))
  assert.ok(html.includes('type="radio"'))
  const bank = questions.filter(q=>q.id.includes(`-${lang}-`))
  assert.equal(bank.length,2)
  for(const q of bank) {
    assert.equal(q.options.length,4)
    assert.equal(new Set(q.options.map(o=>o.text)).size,4)
    assert.ok(q.options.some(o=>o.id===q.correct))
    assert.ok(q.explanation && q.source)
  }
  for(const card of cards) {
    assert.equal(card.topicId,'pectus-excavatum')
    assert.ok(card.front[lang] && card.answer[lang])
  }
  assert.ok(lesson.check.explanation[lang])
}
for (const asset of ['hero.png','frontal.jpg','lateral.jpg']) assert.ok(fs.statSync(path.join(root,'public/educational/pectus-excavatum',asset)).size>1000)
assert.deepEqual(questions.filter(q=>q.id.includes('-de-')).map(q=>q.correct),['B','C'])
console.log('Pectus SSR DE/EN/FA PASS: shell/chapters, RTL, local check, exact-topic practice links, 2 questions per language, 3 cards, assets. Browser behavior not covered.')