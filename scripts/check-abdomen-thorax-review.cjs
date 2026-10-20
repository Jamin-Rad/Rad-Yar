const fs = require('node:fs')
const path = require('node:path')

const root = path.resolve(__dirname, '..')
const routes = [
  ['app/abdomen/gi/ileus-volvulus/page.js', 'abdomen-ileus-volvulus'],
  ['app/abdomen/pankreas/zystische-tumoren/page.js', 'abdomen-pancreatic-cysts'],
  ['app/abdomen/leber/fokale-laesionen/page.js', 'abdomen-focal-liver'],
  ['app/abdomen/niere/raumforderungen/page.js', 'abdomen-renal-masses'],
  ['app/abdomen/nebenniere/raumforderungen/page.js', 'abdomen-adrenal-masses'],
  ['app/abdomen/leber/angiomyolipom/page.js', 'abdomen-hepatic-aml'],
  ['app/abdomen/leber/psc-mrcp/page.js', 'abdomen-psc-mrcp'],
  ['app/abdomen/leber/zystische-laesionen/page.js', 'abdomen-cystic-liver-lesions'],
  ['app/abdomen/gi/appendizitis/page.js', 'abdomen-appendizitis'],
  ['app/abdomen/gi/untere-gi-blutung/page.js', 'abdomen-lower-gi-bleeding'],
  ['app/abdomen/gi/kolorektales-karzinom/page.js', 'abdomen-kolorektales-karzinom'],
  ['app/thorax/fremdkoerperaspiration/page.js', 'thorax-foreign-body'],
  ['app/thorax/pneumonie-muster/page.js', 'pneumonie-muster'],
  ['app/thorax/roentgen-thorax-systematik/page.js', 'thorax-chest-xray'],
  ['app/thorax/tuberkulose-muster/page.js', 'thorax-tuberculosis'],
]

let failed = false
for (const [relative, id] of routes) {
  const file = path.join(root, relative)
  const source = fs.readFileSync(file, 'utf8')
  const checks = [
    [source.includes(`lessonId="${id}"`), 'missing shared-shell lesson id'],
    [/\bde\s*:/.test(source) && /\ben\s*:/.test(source) && /\bfa\s*:/.test(source), 'DE/EN/FA locale blocks not all found'],
  ]
  for (const [ok, message] of checks) if (!ok) {
    failed = true
    console.error(`${relative}: ${message}`)
  }
}

const assessment = fs.readFileSync(path.join(root, 'data/abdomenThoraxAssessmentDrafts.js'), 'utf8')
const ids = [...assessment.matchAll(/^\s*'([^']+)': item\(/gm)].map(match => match[1])
for (const [, id] of routes) if (!ids.includes(id)) {
  failed = true
  console.error(`assessment draft missing for ${id}`)
}
const fmdRoute = fs.readFileSync(path.join(root, 'app/abdomen/gefaesse/fmd/page.js'), 'utf8')
const sharedDiagram = fs.readFileSync(path.join(root, 'components/ClinicalPatternDiagram.jsx'), 'utf8')
if (!fmdRoute.includes('diagram="fmd"') || !sharedDiagram.includes("variant === 'fmd'") || !sharedDiagram.includes('multifocal FMD')) {
  failed = true
  console.error('FMD route header must use the dedicated renal-artery pattern diagram')
}

const shell = fs.readFileSync(path.join(root, 'components/LessonReferenceShell.jsx'), 'utf8')
if (!shell.includes("const SECTION_IDS = ['content', 'self-check', 'take-home']")
  || !shell.includes("const CHAPTERS = ['content', 'self-check', 'take-home']")
  || !shell.includes("useState('content')")
  || shell.includes('id="lesson-start"')) {
  failed = true
  console.error('Shared lesson shell must start at its first real chapter and track only rendered chapters')
}

if (failed) process.exit(1)
console.log(`Structure check passed: ${routes.length} scoped routes have shared-shell wiring, locale blocks, and one scoped assessment draft each.`)
console.log('This checks structure and presence only; it does not certify semantic translation equivalence or clinical correctness.')
