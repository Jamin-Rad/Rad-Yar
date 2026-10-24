import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { build } from 'esbuild'
import React from 'react'
import { renderToString } from 'react-dom/server'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const bundle = path.join(root, 'tmp', 'abdomen-existing-practice-ssr.cjs')
fs.mkdirSync(path.dirname(bundle), { recursive: true })

fs.writeFileSync(path.join(root,'tmp','abdomen-existing-practice-entry.jsx'), "export {default as Fornix} from '../app/abdomen/niere/fornixruptur/page'; export {default as Pylorus} from '../app/abdomen/gi/pylorusstenose/page'; export {default as Colitis} from '../app/abdomen/gi/kolitis-patterns/page'; export {default as Pyelo} from '../app/abdomen/niere/pyelonephritis/page'")
await build({
  absWorkingDir: root,
  entryPoints: ['tmp/abdomen-existing-practice-entry.jsx'],
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
const d=await import('../data/abdomenExistingPractice.js')
const {FORNIX_LESSON}=await import('../data/fornixRuptureLesson.js')
let renders=0
for(const lang of ['de','en','fa']){
 globalThis.__testLang=lang
 for(const [Page,ids] of [[pages.Fornix,['fornixruptur']],[pages.Pylorus,['pylorusstenose']],[pages.Colitis,['pmc-kolitis','colitis-ulcerosa']],[pages.Pyelo,['pyelonephritis','nierenabszess']]]){
  const html=renderToString(React.createElement(Page));renders++
  assert.equal((html.match(/<h1\b/g)||[]).length,1)
  assert.ok(html.includes(`dir="${lang==='fa'?'rtl':'ltr'}"`))
  for(const id of ids){
   const topic=d.ABDOMEN_EXISTING_PRACTICE.find(t=>t.id===id)
   const anchor=id==='pmc-kolitis'?'pmc':id==='colitis-ulcerosa'?'uc':topic.anchor
   const back=`${topic.path}?lang=${lang}${anchor?`#${anchor}`:''}`
   assert.ok(html.includes(`themen=${id}`),`missing quiz ${id}/${lang}`)
   assert.ok(html.includes(`/flashcards/${id}`),`missing cards ${id}/${lang}`)
   assert.ok(html.includes(encodeURIComponent(back)),`missing return ${back}`)
  }
  if(Page===pages.Fornix){
   assert.ok(html.includes(FORNIX_LESSON.title[lang]))
   assert.ok(html.includes({de:'Drei Regeln mitnehmen',en:'Three rules to remember',fa:'سه نکته برای یادآوری'}[lang]))
   for(const [i,chapter] of FORNIX_LESSON.chapters.entries()){
    const panel=html.match(new RegExp(`<div id="${chapter.id}-panel"[^>]*>`))?.[0]
    assert.ok(panel);assert.equal(panel.includes('hidden=""'),i!==0)
   }
   for(const source of FORNIX_LESSON.sources.filter(s=>s.href))assert.ok(html.includes(source.href))
   for(const asset of [FORNIX_LESSON.hero,FORNIX_LESSON.chapters[1].image.src]){
    assert.ok(html.includes(asset)||html.includes(encodeURIComponent(asset)))
    assert.ok(fs.statSync(path.join(root,'public',asset)).size>1000)
   }
   assert.ok(!html.includes('creativecommons.org/licenses/by/4.0/'),'PDF image must not be falsely CC-labelled')
  }
 }
 assert.equal(d.ABDOMEN_EXISTING_QUESTIONS[lang].length,12)
 for(const topic of d.ABDOMEN_EXISTING_PRACTICE){
  assert.equal(d.ABDOMEN_EXISTING_QUESTIONS[lang].filter(q=>q.tags.includes(topic.id)).length,2)
  assert.equal(d.ABDOMEN_EXISTING_CARDS.filter(c=>c.topicId===topic.id).length,2)
 }
 for(const q of d.ABDOMEN_EXISTING_QUESTIONS[lang]){
  assert.equal(q.options.length,4);assert.ok(q.options.some(o=>o.id===q.correct))
  assert.equal(Object.keys(q.wrongExplanations).length,3);assert.ok(q.source&&q.explanation)
 }
 for(const c of d.ABDOMEN_EXISTING_CARDS)for(const key of ['front','answer','explanation'])assert.ok(c[key][lang])
}
assert.equal(renders,12)
assert.equal(new Set(d.ABDOMEN_EXISTING_CARDS.map(c=>c.id)).size,12)
console.log('PASS: 12 actual route SSR renders, DE/EN/FA, Fornix shell/assets/source labels, six exact topics with encoded locale+anchor returns, 12 four-option MCQs per language and 12 cards. Browser QA remains separate.')
