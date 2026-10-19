import fs from 'node:fs'
import assert from 'node:assert/strict'

const lessonPath = new URL('../app/thorax/pulmonale-hypertonie/page.jsx', import.meta.url)
const diagramPath = new URL('../components/PulmonaryHypertensionDiagram.jsx', import.meta.url)
const curriculumPath = new URL('../data/curriculum.js', import.meta.url)
const ledgerPath = new URL('../docs/lesson-quality/thorax-pulmonale-hypertonie-p46-p47.md', import.meta.url)
const source = fs.readFileSync(lessonPath, 'utf8')
const diagram = fs.readFileSync(diagramPath, 'utf8')
const curriculum = fs.readFileSync(curriculumPath, 'utf8')
const ledger = fs.readFileSync(ledgerPath, 'utf8')
const persian = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/

function readLiteralTriples(input) {
  const triples = []
  let from = 0
  while ((from = input.indexOf('L(', from)) !== -1) {
    let start = from + 2
    while (/\s/.test(input[start])) start += 1
    // Ignore the L(de, en, fa) helper declaration; only audit call sites.
    if (input[start] !== "'" && input[start] !== '"' && input[start] !== '`') {
      from = start + 1
      continue
    }
    let depth = 0
    let quote = null
    let escaped = false
    const commas = []
    let end = -1
    for (let i = start; i < input.length; i += 1) {
      const char = input[i]
      if (quote) {
        if (escaped) escaped = false
        else if (char === '\\') escaped = true
        else if (char === quote) quote = null
        continue
      }
      if (char === "'" || char === '"' || char === '`') { quote = char; continue }
      if (char === '(' || char === '[' || char === '{') { depth += 1; continue }
      if (char === ')' || char === ']' || char === '}') {
        if (char === ')' && depth === 0) { end = i; break }
        depth -= 1
        continue
      }
      if (char === ',' && depth === 0) commas.push(i)
    }
    assert.notEqual(end, -1, `Unclosed L() at character ${from}`)
    assert.equal(commas.length, 2, `Expected exactly three language strings in L() at character ${from}`)
    const starts = [start, commas[0] + 1, commas[1] + 1]
    const ends = [commas[0], commas[1], end]
    const values = starts.map((position, index) => {
      const literal = input.slice(position, ends[index]).trim()
      assert.match(literal, /^(['"])[\s\S]*\1$/, `Expected a literal translation at character ${position}`)
      return literal.slice(1, -1).replace(/\\'/g, "'").replace(/\\"/g, '"')
    })
    triples.push(values)
    from = end + 1
  }
  return triples
}

const triples = [...readLiteralTriples(source), ...readLiteralTriples(diagram)]
assert.ok(triples.length >= 55, `Expected complete lesson translations, found ${triples.length}`)
for (const [index, [de, en, fa]] of triples.entries()) {
  assert.ok(!persian.test(de), `L(${index}) German slot contains Persian text: ${de}`)
  assert.ok(!persian.test(en), `L(${index}) English slot contains Persian text: ${en}`)
  assert.ok(persian.test(fa), `L(${index}) Persian slot has no Persian script: ${fa}`)
}

const requireTriple = (de, en, fa, label) => assert.ok(
  triples.some(([actualDe, actualEn, actualFa]) => actualDe.includes(de) && actualEn.includes(en) && actualFa.includes(fa)),
  `Missing aligned DE/EN/FA translation for ${label}`,
)
requireTriple('Pulmonale Hypertonie ist eine hämodynamische Diagnose', 'Pulmonary hypertension is a haemodynamic diagnosis', 'پرفشاری ریوی یک تشخیص همودینامیک است', 'haemodynamic definition')
requireTriple('4 · PH bei Obstruktionen der Pulmonalarterien', '4 · PH associated with pulmonary artery obstructions', '۴ · PH همراه با انسداد شریان‌های ریوی', 'current group 4 label')
requireTriple('CTEPH ist Subgruppe 4.1', 'CTEPH is subtype 4.1', 'CTEPH زیرگروه 4.1', 'group 4.1')
requireTriple('Im p.-a.-Bild', 'On the PA view', 'در نمای PA', 'PA-view signs')
requireTriple('In der Seitenaufnahme', 'On the lateral view', 'در نمای لترال', 'lateral-view signs')
requireTriple('hypertrophierte Bronchialarterien', 'hypertrophied bronchial arteries', 'هیپرتروفی شریان‌های برونشی', 'CTEPH collaterals')

assert.match(source, /PAWP ≤ 15 mmHg/)
assert.match(source, /RV\/LV &gt; 1/)
assert.match(diagram, /Nichtdiagnostisches Lehrschema/)
assert.match(diagram, /شماتیک آموزشیِ غیرتشخیصی/)
assert.match(diagram, /viewBox="0 0 760 330"/)
assert.match(diagram, /label\('Rechtsherzvergrößerung', 'Right-heart enlargement', 'بزرگی قلب راست'\)/)
assert.match(diagram, /x="646" y="76"[^\n]+fontSize="14"/)
assert.match(diagram, /x="380" y="310"/)
assert.match(source, /PDF-Seite 47 setzt die Bildzeichen mit RV\/LV >1 und Septumverlagerung fort/)
assert.match(source, /PDF p\. 47 continues the imaging signs with RV\/LV >1 and septal deviation/)
assert.match(source, /صفحهٔ ۴۷ نشانه‌های تصویری را با RV\/LV >1 و انحراف سپتوم ادامه می‌دهد/)
assert.match(source, /Kovacs G, et al\. Definition, classification and diagnosis/)

const curriculumMatch = curriculum.match(/\{ id: 'pulmonale-hypertonie'[^\n]+/)
assert.ok(curriculumMatch, 'Pulmonary hypertension curriculum topic exists')
assert.match(curriculumMatch[0], /link: '\/thorax\/pulmonale-hypertonie'/)
assert.match(curriculumMatch[0], /tags: \['CT','Rö'\]/, 'No MRI tag without MRI teaching')
assert.doesNotMatch(curriculumMatch[0], /MRT/)

assert.match(ledger, /pp\. 46–47 \(printed pp\. 45–46\)/)
assert.match(ledger, /CTEPH.*4\.1/)
assert.match(ledger, /retrosternal|upturned apex|Retrosternalraum/i)
assert.match(ledger, /Bronchialarterien|bronchial arteries|شریان‌های برونشی/i)
assert.match(ledger, /PA radiograph:[^\n]*upturned apex[\s\S]*lateral radiograph:[^\n]*retrosternal/i)

console.log(`Pulmonary hypertension parity/source audit passed (${triples.length} aligned translation units).`)
