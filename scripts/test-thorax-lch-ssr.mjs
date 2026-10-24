import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { build } from 'esbuild'
import React from 'react'
import { renderToString } from 'react-dom/server'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const bundle = path.join(root, 'tmp', 'thorax-lch-ssr.cjs')
fs.mkdirSync(path.dirname(bundle), { recursive: true })

await build({
  absWorkingDir: root,
  entryPoints: ['app/thorax/lch-lunge/page.js'],
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
const { LCH_CHECKS: checks, LCH_QUESTIONS: questions, LCH_CARDS: cards } = await import('../data/thoraxLchLesson.js')
for (const lang of ['de','en','fa']) {
  globalThis.__testLang=lang
  const html=renderToString(React.createElement(Page))
  assert.equal((html.match(/<h1\b/g)||[]).length,1)
  assert.ok(html.includes(`lang="${lang}"`))
  assert.ok(html.includes(`dir="${lang==='fa'?'rtl':'ltr'}"`))
  for (const id of ['muster','verlauf','einordnung']) {
    const panel=html.match(new RegExp(`<div id="${id}-panel"[^>]*>`))?.[0]
    assert.ok(panel,`${lang} missing ${id}`)
    assert.equal(panel.includes('hidden=""'),id!=='muster')
  }
  for (const src of ['/educational/thorax-lch/hero.png','/hrct/retikulaer-nodulaer/image22.jpeg','/hrct/retikulaer-nodulaer/image23.jpeg']) assert.ok(html.includes(src) || html.includes(encodeURIComponent(src)), src)
  assert.ok(html.includes('themen=lch-lunge'))
  assert.ok(html.includes('fach=thorax'))
  assert.ok(html.includes('/lernen/thorax'))
  assert.ok(html.includes('/flashcards/lch-lunge'))
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
const source=fs.readFileSync(path.join(root,'app/thorax/lch-lunge/page.js'),'utf8')
assert.ok(source.includes('item.feedback[answer]'))
assert.ok(source.includes('aria-pressed={answer===i}'))
assert.ok(fs.statSync(path.join(root,'public/educational/thorax-lch/hero.png')).size>1000)
for (const lang of ['de','en','fa']) for (const q of questions[lang]) assert.equal(q.fach,'thorax')
console.log('Pulmonary LCH SSR passes DE/EN/FA: shared shell, one open chapter, RTL, four-option banks, feedback, cards and thorax routes.')

const layoutSource=fs.readFileSync(path.join(root,'app/thorax/layout.js'),'utf8')
for (const marker of ['<Navbar />','<LearningAccessGate>','<LessonInProgressGate>']) assert.ok(layoutSource.includes(marker))
assert.ok(!source.includes('<Footer'));
assert.ok(layoutSource.includes('<Footer />'))
