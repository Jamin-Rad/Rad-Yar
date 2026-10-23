import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { build } from 'esbuild'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const bundle = path.join(root, 'tmp', 'pyelonephritis-route-ssr.cjs')
fs.mkdirSync(path.dirname(bundle), { recursive: true })
await build({
  absWorkingDir: root,
  entryPoints: ['app/abdomen/niere/pyelonephritis/page.jsx'],
  outfile: bundle,
  bundle: true,
  jsx: 'automatic',
  platform: 'node',
  format: 'cjs',
  external: ['react', 'react-dom', 'next/*'],
  plugins: [{
    name: 'pyelonephritis-ssr-fixtures',
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
const Module = require('node:module')
const originalLoad = Module._load
Module._load = function (request, parent, isMain) {
  if (request === 'next/link') return ({ children, ...props }) => React.createElement('a', props, children)
  if (request === 'next/image') return ({ fill, priority, ...props }) => React.createElement('img', props)
  return originalLoad.call(this, request, parent, isMain)
}
const Page = require(bundle).default
const { PYELONEPHRITIS_LESSON: lesson } = require(path.join(root, 'data/pyelonephritisLesson.js'))
const curriculum = fs.readFileSync(path.join(root, 'data/curriculum.js'), 'utf8')
assert.match(curriculum, /id: 'pyelonephritis'[^\n]*link: '\/abdomen\/niere\/pyelonephritis'[^\n]*inProgress: true/, 'exact curriculum id links to route with inProgress status')
assert.match(curriculum, /id: 'nierenabszess'[^\n]*link: '\/abdomen\/niere\/pyelonephritis#complications'[^\n]*inProgress: true/, 'exact renal abscess curriculum id links to the existing complications section with inProgress status')

for (const lang of ['de', 'en', 'fa']) {
  globalThis.__testLang = lang
  const html = renderToStaticMarkup(React.createElement(Page))
  assert.ok(html.includes(`lang="${lang}"`), `${lang}: root language`)
  assert.ok(html.includes(`dir="${lang === 'fa' ? 'rtl' : 'ltr'}"`), `${lang}: text direction`)
  assert.ok(html.includes('data-lesson-progress-managed="true"'), `${lang}: shared lesson shell`)
  assert.ok(html.includes('/educational/pyelonephritis/hero.svg'), `${lang}: topic-specific hero`)
  for (const section of lesson.sections) {
    assert.ok(html.includes(section.title[lang]), `${lang}: section title`)
    assert.ok(html.includes(section.body[lang]), `${lang}: section body`)
    assert.ok(html.includes(section.implication[lang]), `${lang}: implication`)
  }
  for (const phrase of [
    lang === 'de' ? 'bakterielle Entzündung' : lang === 'en' ? 'bacterial inflammation' : 'التهاب باکتریایی',
    lang === 'de' ? 'Diabetes oder Immunschwäche' : lang === 'en' ? 'diabetes or immunosuppression' : 'دیابت یا نقص ایمنی',
    lang === 'de' ? 'Gas-Flüssigkeitsspiegel' : lang === 'en' ? 'gas-fluid levels' : 'سطح مایع-گاز',
    lang === 'de' ? 'fokale nekrotische' : lang === 'en' ? 'focal necrotic' : 'نکروز کانونی',
  ]) assert.ok(lesson.sections.some(section => section.body[lang].includes(phrase)), `${lang}: source-specific imaging/clinical context ${phrase}`)
  for (const phrase of [
    lang === 'de' ? 'portalvenöse Phase' : lang === 'en' ? 'portal-venous phase' : 'فاز پورتوونوس',
    lang === 'de' ? 'keine allgemeine Protokollvorgabe' : lang === 'en' ? 'not a general protocol recommendation' : 'توصیهٔ عمومی پروتکل نیست',
    lang === 'de' ? 'keine separate Phasenangabe' : lang === 'en' ? 'no separate phase label' : 'برچسب جداگانه‌ای برای فاز ندارد',
  ]) assert.ok(lesson.sections[0].body[lang].includes(phrase), `${lang}: source-only CT phase caveat ${phrase}`)
  for (const phrase of [
    lang === 'de' ? 'gasbildende Infektion' : lang === 'en' ? 'gas-forming infection' : 'عفونت گازساز',
    lang === 'de' ? 'vergrößert und zerstört' : lang === 'en' ? 'enlarged and destroyed' : 'بزرگ و تخریب‌شده',
  ]) assert.ok(lesson.sections[1].body[lang].includes(phrase), `${lang}: emphysematous morphology ${phrase}`)
  for (const figure of Object.values(lesson.figures)) assert.ok(html.includes(figure.caption[lang]), `${lang}: localized source caption`)
  for (const phrase of [
    lesson.check.question[lang], lesson.check.options[0][lang],
    lesson.sourceReview[lang], lesson.media[lang], 'pyelonephritis-ct-pdf-p53.png', 'pyelonephritis-emphysematous-ct-pdf-p54.png',
    'EAU Guidelines on Urological Infections', 'CT imaging of acute and chronic pyelonephritis',
  ]) assert.ok(html.includes(phrase), `${lang}: ${phrase}`)
  assert.equal((html.match(/type="radio"/g) || []).length, 3, `${lang}: single three-option self-check`)
  assert.ok(lesson.check.explanation[lang] && lesson.check.retry[lang], `${lang}: answer and retry feedback are localized in lesson data`)
  assert.ok(html.includes('Abdomen.pdf'), `${lang}: visible source attribution`)
}

const route = fs.readFileSync(path.join(root, 'app/abdomen/niere/pyelonephritis/page.jsx'), 'utf8')
assert.ok(route.includes("from '@/components/lesson-template/StandardLessonShell'"), 'route uses maintained shared shell')
assert.match(route, /function ParenchymaSchematic[\s\S]*role="img" aria-labelledby=/, 'guided non-diagnostic parenchymal schematic is accessible')
assert.match(route, /<ParenchymaSchematic lang=\{lang\}\/>/, 'pattern schematic is rendered beside the source crop')
assert.doesNotMatch(route, /Befund\s*&\s*Selbsttest/, 'no unrelated chapter title')
const ledger = fs.readFileSync(path.join(root, 'docs/lesson-quality/pyelonephritis-abdomen-p53-p54.md'), 'utf8')
for (const mapping of ['physical p.53 / printed p.52', 'physical p.54 / printed p.53', 'Gerota fascia', 'No rID, contributor or sequence metadata']) assert.ok(ledger.includes(mapping), `ledger includes ${mapping}`)
assert.match(ledger, /Renal\/perirenal abscess[^\n]*Abdomen\.pdf, physical p\.53 \/ printed p\.52[^\n]*Section 3/, 'renal abscess is bounded to the source-supported complication coverage on p.53')
assert.match(lesson.sections[2].implication.en, /48–72 hours/)
for (const asset of ['public/niere/pyelonephritis-ct-pdf-p53.png', 'public/niere/pyelonephritis-emphysematous-ct-pdf-p54.png', 'public/educational/pyelonephritis/hero.svg']) assert.ok(fs.existsSync(path.join(root, asset)), `asset exists: ${asset}`)
for (const [file, sourcePage, printedPage] of [
  ['public/niere/pyelonephritis-ct-pdf-p53.provenance.json', 53, 52],
  ['public/niere/pyelonephritis-emphysematous-ct-pdf-p54.provenance.json', 54, 53],
]) {
  const provenance = JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'))
  assert.equal(provenance.source, 'Abdomen.pdf')
  assert.equal(provenance.physicalPage, sourcePage)
  assert.equal(provenance.printedPage, printedPage)
  assert.equal(provenance.radiopaediaId, null)
  assert.equal(provenance.contributor, null)
}
console.log('Pyelonephritis p53–54 SSR/source/localization checks PASS for DE/EN/FA and RTL. Browser and clinical approval remain pending.')
