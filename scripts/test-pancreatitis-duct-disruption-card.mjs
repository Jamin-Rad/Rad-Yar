import assert from 'node:assert/strict'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const require = createRequire(import.meta.url)
const Module = require('node:module')
const swc = require('next/dist/build/swc')
const originalResolve = Module._resolveFilename
Module._resolveFilename = function (request, parent, ...rest) {
  return originalResolve.call(this, request.startsWith('@/') ? path.join(root, request.slice(2)) : request, parent, ...rest)
}
require.extensions['.js'] = (module, filename) => {
  const { code } = swc.transformSync(require('node:fs').readFileSync(filename, 'utf8'), {
    filename,
    jsc: { parser: { syntax: 'ecmascript' } },
    module: { type: 'commonjs' },
  })
  module._compile(code, filename)
}

const { getCardsByTopic } = require(path.join(root, 'data/flashcards.js'))
const card = getCardsByTopic('pankreatitis').find(item => item.id === 'pankreatitis-duct-disruption')
assert.ok(card, 'duct disruption retrieval card is linked to pancreatitis topic')
for (const lang of ['de', 'en', 'fa']) {
  assert.ok(card.front[lang]?.length > 20, `${lang} question exists`)
  assert.ok(card.answer[lang]?.length > 35, `${lang} answer states the duct finding`)
  assert.ok(card.explanation[lang]?.length > 30, `${lang} explanation exists`)
  const terms = {de:['Gangkontinuität','Sekretin-MRCP','Flüssigkeitsaustritt'],en:['duct continuity','Secretin MRCP','fluid leakage'],fa:['پیوستگی مجرا','سکرتین','نشت مایع']}[lang]
  for (const term of terms) assert.ok(card.diagram[lang].includes(term), `${lang} diagram distinguishes continuity from secretin-fluid observation`)
  assert.ok(card.explanation[lang].includes('T2'), `${lang} standard MRCP is fluid-weighted`)
  const caveat = {de:'nicht als Kontrastmittelleck',en:'do not call this a contrast leak',fa:'نشت مادهٔ حاجب در MRCP معمول نیست'}[lang]
  assert.ok(card.explanation[lang].includes(caveat), `${lang} avoids false standard-MRCP contrast-extravasation claim`)
}

console.log('PASS: pancreatic duct disruption/disconnected duct retrieval card has DE/EN/FA content')
