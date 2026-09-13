import fs from 'node:fs'
import path from 'node:path'
import parser from 'next/dist/compiled/babel/parser.js'

const { parse } = parser

const ROOTS = ['data', 'app']
const EXTENSIONS = new Set(['.js', '.jsx', '.ts', '.tsx'])
const PERSIAN = /[\u0600-\u06ff]/
const LATIN_WORD = /[A-Za-zÄÖÜäöüß]{3,}/g
const GERMAN_WORD = /\b(?:der|die|das|den|dem|des|und|oder|ohne|mit|bei|für|von|zur|zum|eine|einer|einem|einen|ist|sind|wird|werden|zeigt|typisch|häufig|nicht|immer|zwischen|sowie)\b/i
const TECHNICAL_ONLY = /^(?:BI-RADS|Tree-in-bud|Wash-?out|Follow-?up|Flashcards?|MCQs?|Take home(?: message)?|Spoke-wheel|Swirl sign|Blooming|Black hole|Hot cross bun)$/i
const ACRONYM_LINE = /^(?:[A-Z][A-Z0-9-]*(?:\/[A-Z0-9-]+)?|T\d\*?|b-value|ADC|DWI|MRI|MRT|CT|[·+→|()[\],./–—\- ×<>=%:0-9\s])+$/
const METADATA = /^(?:https?:\/\/|\/[^\s]+\.(?:png|jpe?g|webp|svg|gif)|[^\s]+\.(?:png|jpe?g|webp|svg|gif)$)|(?:Radiopaedia|rID|CC BY|\b(?:Br J Radiol|J Korean Soc Radiol|Instr Course Lect|Fig\.)\b)/i
const KNOWN_EXACT = new Set([
  'Spetzler-Martin I–II', 'Cognard IIa', 'Cognard IIb', 'Cognard III',
  'Lung-RADS', 'Modic III', 'Node-RADS', 'CTSI/Balthazar', 'Patte / Goutallier',
  'Boston v2.0', 'Buscopan', 'ml/min/1.73 m²', 'Cognard I', 'Cognard IV', 'Cognard V',
  'dAVF', 'CDD 1a', 'CDD 2a', 'CDD 2c', 'LCx', 'pc-ASPECTS', 'Modic I', 'Modic II',
  'rtl', 'Dr. Zia', 'B-mode', 'ADC ↑', 'RadYar', 'Scadding I',
  'grading', 'lateral', 'medial', 'acl', 'pcl', 'cases', 'takehome',
  'StatPearls / NCBI Bookshelf – Optic Nerve Sheath Ultrasound',
  'BI-RADS 3: Current and Future Use', 'Ductal Carcinoma In Situ of the Breast',
])
const IGNORED_OBJECT_KEYS = new Set([
  'src', 'url', 'href', 'credit', 'credits', 'source', 'sourceUrl', 'image', 'images', 'id',
  'fach', 'fachId', 'kapitelId', 'topicId', 'slug', 'tags',
])

function filesIn(root) {
  if (!fs.existsSync(root)) return []
  return fs.readdirSync(root, { withFileTypes: true }).flatMap(entry => {
    const target = path.join(root, entry.name)
    if (entry.isDirectory()) return filesIn(target)
    return EXTENSIONS.has(path.extname(entry.name)) ? [target] : []
  })
}

function keyName(node) {
  return node?.name || node?.value || null
}

function literalText(node) {
  if (!node) return null
  if (node.type === 'StringLiteral') return node.value
  if (node.type === 'TemplateLiteral' && node.expressions.length === 0) return node.quasis[0]?.value?.cooked || ''
  return null
}

function collectStrings(node, output, file, source) {
  if (!node || typeof node !== 'object') return
  const value = literalText(node)
  if (value !== null) {
    output.push({ file, line: node.loc?.start.line || 0, text: value, source })
    return
  }
  if (node.type === 'ObjectExpression') {
    node.properties.forEach(property => {
      if (!IGNORED_OBJECT_KEYS.has(keyName(property.key))) collectStrings(property.value, output, file, source)
    })
  } else if (node.type === 'ArrayExpression') {
    node.elements.forEach(element => collectStrings(element, output, file, source))
  }
}

function walk(node, visit, parent = null) {
  if (!node || typeof node !== 'object') return
  visit(node, parent)
  for (const [key, value] of Object.entries(node)) {
    if (key === 'loc' || key === 'start' || key === 'end' || key === 'extra') continue
    if (Array.isArray(value)) value.forEach(child => walk(child, visit, node))
    else if (value && typeof value.type === 'string') walk(value, visit, node)
  }
}

const strings = []
const parseErrors = []
for (const file of ROOTS.flatMap(filesIn)) {
  const code = fs.readFileSync(file, 'utf8')
  let ast
  try {
    ast = parse(code, { sourceType: 'module', plugins: ['jsx', 'typescript'] })
  } catch (error) {
    parseErrors.push(`${file}:${error.loc?.line || 0} ${error.message}`)
    continue
  }
  walk(ast, (node, parent) => {
    if (node.type === 'ObjectProperty' && keyName(node.key) === 'fa') {
      collectStrings(node.value, strings, file, 'fa property')
    }
    if (node.type === 'CallExpression' && ['L', 't'].includes(node.callee?.name) && node.arguments.length >= 3) {
      collectStrings(node.arguments[2], strings, file, `${node.callee.name}() third argument`)
    }
    if (node.type === 'VariableDeclarator' && /^FA(?:_|$)/.test(keyName(node.id) || '')) {
      collectStrings(node.init, strings, file, keyName(node.id))
    }
    // Several flashcard modules store four German, four English and four Persian
    // fields in compact 12-item rows instead of using explicit locale objects.
    if (node.type === 'ArrayExpression' && node.elements.length === 12) {
      const faSlice = node.elements.slice(8)
      if (faSlice.some(element => PERSIAN.test(literalText(element) || ''))) {
        faSlice.forEach(element => collectStrings(element, strings, file, '12-column flashcard row'))
      }
    }
  })
}

const unique = [...new Map(strings.map(item => [`${item.file}:${item.line}:${item.text}`, item])).values()]
const noPersian = unique.filter(item => {
  const text = item.text.trim()
  if (!text || PERSIAN.test(text) || KNOWN_EXACT.has(text) || TECHNICAL_ONLY.test(text) || ACRONYM_LINE.test(text) || METADATA.test(text)) return false
  return (text.match(LATIN_WORD) || []).length >= 1
})
const german = unique.filter(item => PERSIAN.test(item.text) && GERMAN_WORD.test(item.text) && !/(?:Die-Punch|talk and die|\(DIE\))/i.test(item.text))
const latinHeavy = unique.filter(item => {
  if (!PERSIAN.test(item.text) || item.text.length < 30) return false
  const latin = (item.text.match(/[A-Za-zÄÖÜäöüß]/g) || []).length
  const persian = (item.text.match(/[\u0600-\u06ff]/g) || []).length
  return latin > persian * .65
})

const print = (title, rows) => {
  console.log(`\n## ${title} (${rows.length})`)
  rows.forEach(item => console.log(`${item.file}:${item.line}\t${item.text.replace(/\s+/g, ' ')}`))
}

console.log(`Persian strings inspected: ${unique.length}`)
if (parseErrors.length) print('Parse errors', parseErrors.map(text => ({ file: text, line: '', text: '' })))
print('No Persian script', noPersian)
print('Possible German residue', german)
print('Latin-heavy Persian', latinHeavy)
process.exitCode = parseErrors.length || noPersian.length ? 1 : 0
