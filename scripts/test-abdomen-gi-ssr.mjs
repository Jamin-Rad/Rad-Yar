import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { build } from 'esbuild'
import React from 'react'
import { renderToString } from 'react-dom/server'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const bundle = path.join(root, 'tmp', 'abdomen-gi-ssr.cjs')
fs.mkdirSync(path.dirname(bundle), { recursive: true })

fs.writeFileSync(path.join(root,'tmp','abdomen-gi-entry.jsx'), "export {default as Ulcer} from '../app/abdomen/gi/ulkuserkrankung/page'; export {default as Diverticulum} from '../app/abdomen/gi/duodenaldivertikel/page'")
await build({
  absWorkingDir: root,
  entryPoints: ['tmp/abdomen-gi-entry.jsx'],
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



const require=createRequire(import.meta.url),pages=require(bundle)
const d=await import('../data/abdomenGiCompletion.js')
for(const [Page,lesson] of [[pages.Ulcer,d.ABDOMEN_GI_LESSONS[0]],[pages.Diverticulum,d.ABDOMEN_GI_LESSONS[1]]])
for (const lang of ['de','en','fa']) {
 globalThis.__testLang=lang
 const html=renderToString(React.createElement(Page))
 assert.equal((html.match(/<h1\b/g)||[]).length,1)
 assert.ok(html.includes(lesson.title[lang]))
 assert.ok(html.includes({de:'Drei Regeln mitnehmen',en:'Three rules to remember',fa:'سه نکته برای یادآوری'}[lang]))
 assert.ok(html.includes(`dir="${lang==='fa'?'rtl':'ltr'}"`))
 assert.ok(html.includes(`themen=${lesson.id}`))
 assert.ok(html.includes(encodeURIComponent(`${lesson.path}?lang=${lang}`)))
 assert.ok(html.includes(`/flashcards/${lesson.id}`))
 for(const [index,chapter] of lesson.chapters.entries()) {
  const panel=html.match(new RegExp(`<div id="${chapter.id}-panel"[^>]*>`))?.[0]
  assert.ok(panel)
  assert.equal(panel.includes('hidden=""'),index!==0)
 }
 for(const source of lesson.sources) assert.ok(html.includes(source.href))
 for(const asset of [lesson.hero,...lesson.chapters.filter(chapter=>chapter.image).map(chapter=>chapter.image.src)]) {
  assert.ok(html.includes(asset)||html.includes(encodeURIComponent(asset)))
  assert.ok(fs.statSync(path.join(root,'public',asset)).size>1000)
 }
 assert.ok(html.includes('creativecommons.org/licenses/by/4.0/'))
 assert.equal(d.ABDOMEN_GI_QUESTIONS[lang].filter(question=>question.tags.includes(lesson.id)).length,2)
 assert.equal(d.ABDOMEN_GI_CARDS.filter(card=>card.topicId===lesson.id).length,2)
 assert.equal(d.ABDOMEN_GI_QUESTIONS[lang].length,4)
 for (const q of d.ABDOMEN_GI_QUESTIONS[lang]) {
  assert.ok(q.options.some(o=>o.id===q.correct))
  assert.equal(new Set(q.options.map(o=>o.text)).size,4)
  assert.equal(Object.keys(q.wrongExplanations).length,3)
  assert.ok(q.explanation && q.source)
 }
 for (const c of d.ABDOMEN_GI_CARDS) for (const key of ['front','answer','explanation']) assert.ok(c[key][lang])
}
assert.equal(new Set(d.ABDOMEN_GI_CARDS.map(c=>c.id)).size,4)
console.log('PASS: GI lessons SSR in DE/EN/FA, exact topic/locale returns, source links, assets, 4 MCQs per language and 4 self-contained cards. Browser QA is separate.')
