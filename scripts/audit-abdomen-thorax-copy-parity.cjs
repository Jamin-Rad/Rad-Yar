const fs = require('node:fs')
const path = require('node:path')

const root = path.resolve(__dirname, '..')
const routes = [
  'app/abdomen/gi/ileus-volvulus/page.js',
  'app/abdomen/pankreas/zystische-tumoren/page.js',
  'app/abdomen/leber/fokale-laesionen/page.js',
  'app/abdomen/niere/raumforderungen/page.js',
  'app/abdomen/nebenniere/raumforderungen/page.js',
  'app/abdomen/leber/angiomyolipom/page.js',
  'app/abdomen/leber/psc-mrcp/page.js',
  'app/abdomen/leber/zystische-laesionen/page.js',
  'app/abdomen/leber/fnh/page.js',
  'app/abdomen/gi/appendizitis/page.js',
  'app/abdomen/gi/untere-gi-blutung/page.js',
  'app/abdomen/gi/kolorektales-karzinom/page.js',
  'app/thorax/fremdkoerperaspiration/page.js',
  'app/thorax/pneumonie-muster/page.js',
  'app/thorax/roentgen-thorax-systematik/page.js',
  'app/thorax/tuberkulose-muster/page.js',
]

function balancedBlock(source, open) {
  let depth = 0, quote = null, escaped = false
  for (let i = open; i < source.length; i++) {
    const ch = source[i]
    if (quote) {
      if (escaped) escaped = false
      else if (ch === '\\') escaped = true
      else if (ch === quote) quote = null
      continue
    }
    if (ch === "'" || ch === '"' || ch === '`') { quote = ch; continue }
    if (ch === '{') depth++
    if (ch === '}' && --depth === 0) return source.slice(open + 1, i)
  }
  throw new Error('unclosed object')
}

function topLevelKeys(body) {
  const keys = new Set()
  let depth = 0, quote = null, escaped = false, start = 0
  const chunks = []
  for (let i = 0; i <= body.length; i++) {
    const ch = body[i]
    if (quote) {
      if (escaped) escaped = false
      else if (ch === '\\') escaped = true
      else if (ch === quote) quote = null
      continue
    }
    if (ch === "'" || ch === '"' || ch === '`') { quote = ch; continue }
    if (ch === '{' || ch === '[' || ch === '(') depth++
    else if (ch === '}' || ch === ']' || ch === ')') depth--
    else if ((ch === ',' || i === body.length) && depth === 0) { chunks.push(body.slice(start, i)); start = i + 1 }
  }
  for (const chunk of chunks) {
    const match = chunk.match(/^\s*(?:'([^']+)'|"([^"]+)"|([\w$]+))\s*:/)
    if (match) keys.add(match[1] || match[2] || match[3])
  }
  return keys
}

let errors = 0
for (const relative of routes) {
  const source = fs.readFileSync(path.join(root, relative), 'utf8')
  const anchor = source.search(/const\s+(?:C|COPY|CONTENT)\s*=\s*\{/)
  if (anchor < 0) { console.error(`${relative}: no C/COPY locale object`); errors++; continue }
  const objectOpen = source.indexOf('{', anchor)
  const objectBody = balancedBlock(source, objectOpen)
  const blocks = {}
  let cursor = 0
  for (const lang of ['de', 'en', 'fa']) {
    const match = new RegExp(`(?:^|,)\\s*["']?${lang}["']?\\s*:\\s*\\{`, 'm').exec(objectBody.slice(cursor))
    if (!match) { console.error(`${relative}: missing ${lang} locale`); errors++; continue }
    const open = cursor + match.index + match[0].lastIndexOf('{')
    const body = balancedBlock(objectBody, open)
    blocks[lang] = topLevelKeys(body)
    cursor = open + body.length + 2
  }
  if (Object.keys(blocks).length !== 3) continue
  const base = blocks.de
  for (const lang of ['en', 'fa']) {
    const missing = [...base].filter(key => !blocks[lang].has(key))
    const extra = [...blocks[lang]].filter(key => !base.has(key))
    if (missing.length || extra.length) {
      errors++
      console.error(`${relative}: ${lang} key mismatch; missing=[${missing.join(', ')}], extra=[${extra.join(', ')}]`)
    }
  }
  if (!errors) console.log(`${relative}: locale object keys align (${base.size} top-level units)`)
}

if (errors) process.exit(1)
console.log('Structural semantic-unit parity passed. This does not judge translation quality, clinical accuracy, or diagram text.')
