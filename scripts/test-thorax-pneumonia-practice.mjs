import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { build } from 'esbuild'
import React from 'react'
import { renderToString } from 'react-dom/server'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const bundle = path.join(root, 'tmp', 'thorax-pneumonia-ssr.cjs')
fs.mkdirSync(path.dirname(bundle), { recursive: true })

await build({
  absWorkingDir: root,
  entryPoints: ['app/thorax/pneumonie-muster/page.js'],
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
const { THORAX_PNEUMONIA_QUESTIONS: qs, THORAX_PNEUMONIA_FLASHCARDS: cards, THORAX_PNEUMONIA_TOPICS: topics } = await import('../data/thoraxPneumoniaPractice.js')
assert.equal(qs.length,21)
assert.equal(cards.length,7)
assert.equal(new Set(qs.map(q=>q.id)).size,21)
for (const lang of ['de','en','fa']) {
 globalThis.__testLang=lang
 const html=renderToString(React.createElement(Page))
 assert.ok(html.includes(`dir="${lang==='fa'?'rtl':'ltr'}"`))
 assert.ok(html.includes('id="pleuraempyem"'))
 for(const topic of topics) {
  assert.ok(html.includes(`themen=${topic.id}`))
  assert.ok(html.includes(`/flashcards/${topic.id}`))
  const bank=qs.filter(q=>q.tags.includes(topic.id)&&q.id.includes(`-${lang}-`))
  assert.equal(bank.length,1)
  const back = `/thorax/pneumonie-muster${lang === "de" ? "" : `?lang=${lang}`}${topic.id === "pneumonie-muster" ? "" : `#${topic.id}`}`
  assert.ok(html.includes(`from=${encodeURIComponent(back)}`))
  assert.equal(bank[0].options.length,4)
  assert.ok(bank[0].options.some(o=>o.id===bank[0].correct))
  assert.equal(new Set(bank[0].options.map(o=>o.text)).size,4)
  assert.equal(Object.keys(bank[0].wrongExplanations).length,3)
  assert.ok(cards.find(c=>c.topicId===topic.id)?.front[lang])
  assert.ok(cards.find(c=>c.topicId===topic.id)?.answer[lang])
 }
 if(lang!=='de') assert.ok(html.includes(`&amp;lang=${lang}`))
}
console.log('Pneumonia practice SSR PASS DE/EN/FA: 7 exact-topic banks/cards, actual page links and empyema anchor. Browser not covered.')