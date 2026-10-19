const fs = require('node:fs')
const path = require('node:path')

const root = path.resolve(__dirname, '..')
const routes = [
  ['app/thorax/tuberkulose-muster/page.js', 'thorax-tuberculosis'],
  ['app/thorax/roentgen-thorax-systematik/page.js', 'thorax-chest-xray'],
  ['app/thorax/fremdkoerperaspiration/page.js', 'thorax-foreign-body'],
]

for (const [relative, lessonId] of routes) {
  const source = fs.readFileSync(path.join(root, relative), 'utf8')
  for (const locale of ['de', 'en', 'fa']) {
    const match = source.match(new RegExp(`\\b${locale}:\\s*\\{([\\s\\S]*?)(?=,\\s*(?:en|fa):\\s*\\{|\\nexport default)`))
    if (!match || !/summary\s*:\s*\[/.test(match[1])) {
      throw new Error(`${lessonId}: missing route-specific ${locale} take-home summary`)
    }
    const summary = match[1].match(/summary\s*:\s*\[([\s\S]*?)\]/)?.[1] ?? ''
    const itemCount = (summary.match(/'[^']*'|"[^"]*"/g) ?? []).length
    if (itemCount < 3) throw new Error(`${lessonId}: ${locale} summary needs at least three specific rules`)
  }
  if (!source.includes('summary={c.summary}')) throw new Error(`${lessonId}: summary is not passed to the shared shell`)
}

const diagram = fs.readFileSync(path.join(root, 'components/ClinicalPatternDiagram.jsx'), 'utf8')
for (const group of ['tb', 'cyst', 'foreignBody']) {
  for (const locale of ['de', 'en', 'fa']) {
    if (!new RegExp(`${locale}:\\s*\\{[^}]*\\b${group}:`).test(diagram)) {
      throw new Error(`ClinicalPatternDiagram: missing ${locale} label for ${group}`)
    }
  }
}
for (const locale of ['de', 'en', 'fa']) {
  if (!new RegExp(`${locale}:\\s*'[^']+'`).test(diagram)) {
    throw new Error(`ClinicalPatternDiagram: missing explicit ${locale} fallback label`)
  }
}

console.log('Thorax route summary and key diagram-localization checks passed (structural only).')
