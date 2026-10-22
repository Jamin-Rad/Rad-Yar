import assert from 'node:assert/strict'
import fs from 'node:fs'
import { transformSync } from 'esbuild'

const routePath = 'app/msk/trauma/sprunggelenk/page.js'
const source = fs.readFileSync(routePath, 'utf8')
const compiled = transformSync(source, { loader: 'jsx', jsx: 'automatic', format: 'cjs' }).code
const styles = { default: new Proxy({}, { get: (_, key) => String(key) }) }
const react = { __esModule: true, useEffect() {}, useMemo: callback => callback(), useState: value => [value, () => {}], default: {} }
const runtime = { jsx: () => null, jsxs: () => null, Fragment: Symbol.for('react.fragment') }
const stubs = {
  react,
  'react/jsx-runtime': runtime,
  'next/image': { __esModule: true, default: () => null },
  'next/link': { __esModule: true, default: () => null },
  '@/providers/LanguageProvider': { useLanguage: () => ({ lang: 'fa' }) },
  '@/hooks/useLessonReadStatus': { useLessonReadStatus: () => ({}) },
  '@/hooks/useMobileLearningLayout': { useMobileLearningLayout: () => ({}) },
  './page.module.css': styles,
  '@/components/InProgressBanner': { __esModule: true, default: () => null },
}
const module = { exports: {} }
new Function('require', 'module', 'exports', compiled)(name => {
  if (Object.hasOwn(stubs, name)) return stubs[name]
  throw new Error(`Unexpected import in parity test: ${name}`)
}, module, module.exports)
const { CONTENT } = module.exports
assert.ok(CONTENT?.fa)

const allowedSharedCopy = new Set(['', 'Dr. Zia', 'CT', 'MRI', 'AP', 'Mortise', 'Weber A', 'Weber B', 'Weber C', 'Weber A–C', 'bildgebung', 'analyse', 'weber', 'stabilitaet', 'sonderformen', 'ct', 'fall', 'takehome', 'pilon', 'mais', 'bi', '🩻', '🔍', '🦴', '⚠️', '🧩', '◫', '🧪', '💡'])
const untranslated = []
function compareEnglishAndPersian(en, fa, path = 'CONTENT') {
  if (typeof en === 'string' && typeof fa === 'string') {
    const structural = path.endsWith('.id') || path.endsWith('.icon') || /\.checkOptions\[\d+\]\[0\]$/.test(path)
    if (en === fa && !structural && !allowedSharedCopy.has(en)) untranslated.push(path)
    return
  }
  if (Array.isArray(en) && Array.isArray(fa)) {
    assert.equal(fa.length, en.length, `${path}: translated list has matching length`)
    en.forEach((value, index) => compareEnglishAndPersian(value, fa[index], `${path}[${index}]`))
    return
  }
  if (en && fa && typeof en === 'object' && typeof fa === 'object') {
    for (const [key, value] of Object.entries(en)) {
      assert.ok(Object.hasOwn(fa, key), `${path}.${key}: Persian override exists`)
      compareEnglishAndPersian(value, fa[key], `${path}.${key}`)
    }
  }
}
compareEnglishAndPersian(CONTENT.en, CONTENT.fa)
assert.deepEqual(untranslated, [], `English phrases inherited by Persian route: ${untranslated.join(', ')}`)
assert.match(CONTENT.fa.stability.key, /هم‌مرکز/)
assert.match(CONTENT.fa.weber.rows[0][1], /پایین‌تر/)
assert.match(CONTENT.fa.caseStudy.imageAlt, /رادیوگرافی/)
console.log('Sprunggelenk Persian parity PASS: visible copy, nested labels/tables/cards, key stability guidance, and case alt are localized.')
