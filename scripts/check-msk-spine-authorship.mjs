import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { DOMParser } from '@xmldom/xmldom'
import { SPINE_DEGENERATIVE_LESSON } from '../data/spineDegenerative.js'
import { SPINE_INFECTION_LESSON } from '../data/spineInfection.js'
import { CURRICULUM } from '../data/curriculum.js'
import { SPINE_INFLAMMATORY_STRUCTURAL_LESSON } from '../data/spineInflammatoryStructural.js'
import { MSK_BONE_AGGRESSIVENESS_LESSON } from '../data/mskBoneAggressiveness.js'
import { SOURCE_LESSON_UI } from '../data/sourceLessonUi.js'
import { MSK_SPINE_LESSON_QUESTION_DRAFTS, MSK_SPINE_LESSON_FLASHCARD_DRAFTS } from '../data/mskSpineLessonAssessmentDrafts.js'
import { AK_LUXATION_LESSON, AK_LUXATION_QUESTIONS, AK_LUXATION_FLASHCARDS } from '../data/ak-luxation.js'

const lessons = [SPINE_DEGENERATIVE_LESSON, SPINE_INFECTION_LESSON, SPINE_INFLAMMATORY_STRUCTURAL_LESSON, MSK_BONE_AGGRESSIVENESS_LESSON]
const problems = []
const walk = (value, path, lessonId) => {
  if (Array.isArray(value)) return value.forEach((item, index) => walk(item, `${path}[${index}]`, lessonId))
  if (!value || typeof value !== 'object') return
  if ('de' in value || 'en' in value || 'fa' in value) {
    for (const lang of ['de', 'en', 'fa']) if (!(lang in value) || value[lang] == null || value[lang] === '') problems.push(`${lessonId}: missing ${lang} at ${path}`)
    return
  }
  for (const [key, item] of Object.entries(value)) walk(item, `${path}.${key}`, lessonId)
}

for (const lesson of lessons) {
  walk(lesson.title, 'title', lesson.id)
  walk(lesson.alt, 'alt', lesson.id)
  if (lesson.media) walk(lesson.media, 'media', lesson.id)
  walk(lesson.intro, 'intro', lesson.id)
  walk(lesson.chapters, 'chapters', lesson.id)
  walk(lesson.takeHome, 'takeHome', lesson.id)
  walk(lesson.notice, 'notice', lesson.id)
  walk(lesson.case, 'case', lesson.id)
  walk(lesson.references, 'references', lesson.id)
  assert.ok(lesson.chapters.length >= 2, `${lesson.id} should have substantive chapters`)
  for (const chapter of lesson.chapters) {
    assert.ok(chapter.source?.de && chapter.source?.en && chapter.source?.fa, `${lesson.id}/${chapter.id} source label must be localized`)
    assert.ok(chapter.rows?.length, `${lesson.id}/${chapter.id} has no teaching content`)
  }
}
for (const key of Object.keys(SOURCE_LESSON_UI.de)) {
  for (const lang of ['en', 'fa']) assert.ok(SOURCE_LESSON_UI[lang]?.[key], `lesson UI missing ${lang}.${key}`)
}

assert.deepEqual(SPINE_DEGENERATIVE_LESSON.chapters.map(({ id }) => id), ['modic', 'disk', 'facet', 'stenosis'])
assert.deepEqual(SPINE_INFLAMMATORY_STRUCTURAL_LESSON.chapters.map(({ id }) => id), ['ankylosing-clinical-context', 'ankylosing-structural', 'ankylosing-mri', 'ankylosing-complications', 'scheuermann'])
const axspaClinical = SPINE_INFLAMMATORY_STRUCTURAL_LESSON.chapters.find(({ id }) => id === 'ankylosing-clinical-context')
assert.ok(axspaClinical.rows.some(([label, value]) => label.de === 'Alter und Geschlecht' && value.de.includes('M:F 3:1') && value.en.includes('not exclusion rules') && value.fa.includes('معیار رد نیست')))
assert.ok(axspaClinical.rows.some(([label, value]) => label.de === 'HLA-B27' && value.de.includes('Ein negatives HLA-B27 schließt SpA nicht aus') && value.en.includes('does not exclude') && value.fa.includes('رد نمی‌کند')))
assert.ok(axspaClinical.title.de && axspaClinical.title.en && axspaClinical.title.fa)
const axspaStructural = SPINE_INFLAMMATORY_STRUCTURAL_LESSON.chapters.find(({ id }) => id === 'ankylosing-structural')
assert.ok(axspaStructural.visual?.src === '/educational/axial-spondyloarthritis-rid54155-p12.png')
assert.ok(axspaStructural.rows.some(([label, value]) => label.de === 'Weitere Zeichen' && value.en.includes('paired lines from ossified facet-joint capsules') && value.fa.includes('کپسول مفاصل فاست')))
assert.ok(axspaStructural.rows.some(([label, value]) => label.de === 'Andersson-Läsion' && value.en.includes('stress-/fracture-related pseudoarthrosis') && value.fa.includes('شکستگی و عفونت')))
assert.ok(SPINE_INFLAMMATORY_STRUCTURAL_LESSON.chapters.find(({ id }) => id === 'ankylosing-mri').note.fa.includes('جایگزین تشخیص بالینی نمی‌شوند'))
const axspaLedger = await readFile('docs/lesson-quality/axspa-wirbelsaeule-p11-p12.md', 'utf8')
assert.match(axspaLedger, /physische Seiten 11–12, gedruckte Seiten 10–11/)
assert.match(axspaLedger, /rID 54155/)
assert.match(axspaLedger, /negative MRI does not exclude axSpA/i)
const axspaAsset = JSON.parse(await readFile('public/educational/axial-spondyloarthritis-rid54155-p12.provenance.json', 'utf8'))
assert.equal(axspaAsset.diagnosticUse, true)
assert.match(axspaAsset.rightsBasis, /explicitly authorized/i)
const scheuermann = SPINE_INFLAMMATORY_STRUCTURAL_LESSON.chapters.find(({ id }) => id === 'scheuermann')
assert.ok(scheuermann.rows.find(([label]) => label.de === 'Sørensen-Kriterium')?.[1].de.includes('mindestens drei benachbarten Wirbeln'))
assert.ok(scheuermann.visual?.src === '/educational/scheuermann-wirbelsaeule-p13.png')
assert.ok(SPINE_INFLAMMATORY_STRUCTURAL_LESSON.source.includes('S. 11–13'))
assert.ok(SPINE_INFLAMMATORY_STRUCTURAL_LESSON.intro.text.de.includes('weder ein einzelner klinischer Hinweis'))
assert.ok(SPINE_INFLAMMATORY_STRUCTURAL_LESSON.alt.de.includes('keine Sakroiliakalgelenk-Anatomie'))
assert.ok(!SPINE_INFLAMMATORY_STRUCTURAL_LESSON.alt.de.includes('Sakroiliakalgelenk,'), 'schematic alt text must match the drawn vertebral schematic')
const stenosis = SPINE_DEGENERATIVE_LESSON.chapters.find(({ id }) => id === 'stenosis')
assert.match(stenosis.rows[0][1].de, /PDF-Orientierungswerte.*14–17 mm.*10–14 mm.*<10 mm.*Keine universell konsentierten MRI-Grenzwerte/)
assert.match(stenosis.rows[1][1].en, /PDF reference values.*15–25 mm.*10–12 mm.*<10 mm.*<75 mm².*no single value establishes a clinical syndrome/)
assert.match(stenosis.note.de, /quantitative Kriterien und Messdefinitionen haben nur begrenzten Konsens.*anatomische Einengung zeigen.*nicht gleichbedeutend mit einem klinischen Stenose-Syndrom/)
assert.match(stenosis.note.en, /limited consensus.*show anatomic narrowing.*not equivalent to a clinical stenosis syndrome/)
assert.match(stenosis.note.fa, /توافق محدودی دارند.*تنگی آناتومیک را نشان دهد.*با سندرم بالینی تنگی یکسان نیست/)
assert.match(stenosis.extraRows[0][1].de, /Myelopathie/)
assert.match(stenosis.extraRows[1][1].de, /Cauda-equina-Wurzeln/)
assert.match(stenosis.extraRows[1][1].fa, /دم‌اسبی/)
assert.match(stenosis.signalRows[0][1].de, /kein verlässlicher Beleg/)
assert.match(stenosis.signalRows[1][1].en, /419 MRI examinations/)
assert.match(stenosis.signalRows[1][1].de, /T1-Hypointensität war mäßig \(κ=.31\).*T2-Hyperintensität war sie substantiell \(κ=.60\)/)
assert.match(stenosis.signalRows[1][1].en, /fair for T1 hypointensity \(κ=.31\).*substantial for T2 hyperintensity \(κ=.60\)/)
assert.match(stenosis.signalRows[1][1].fa, /T1.*متوسط.*κ=.31.*T2.*قابل‌توجه.*κ=.60/)
assert.match(stenosis.signalRows[2][1].fa, /برتری کلی DWI/)
const stenosisQuestions = MSK_SPINE_LESSON_QUESTION_DRAFTS.filter(({ id }) => id.startsWith('degenerative-wirbelsaeule-'))
assert.deepEqual(stenosisQuestions.map(({ id }) => id), ['degenerative-wirbelsaeule-cord-vs-cauda-01', 'degenerative-wirbelsaeule-signal-prognosis-02'])
const stenosisCards = MSK_SPINE_LESSON_FLASHCARD_DRAFTS.filter(({ id }) => id.startsWith('degenerative-wirbelsaeule-'))
assert.deepEqual(stenosisCards.map(({ id }) => id), ['degenerative-wirbelsaeule-localization', 'degenerative-wirbelsaeule-prognosis-signal'])
const signalAssessment = stenosisQuestions.find(({ id }) => id.endsWith('signal-prognosis-02'))
assert.match(signalAssessment.explanation.de, /keine individuelle Prognose.*nicht binär/)
assert.match(signalAssessment.explanation.en, /not an individual prognosis.*not be treated as binary/)
assert.match(signalAssessment.explanation.fa, /پیش‌آگهی فردی نیست.*نباید دوگانه/)
const signalCard = stenosisCards.find(({ id }) => id === 'degenerative-wirbelsaeule-prognosis-signal')
for (const lang of ['de', 'en', 'fa']) assert.ok(signalCard.answer[lang] && signalCard.explanation[lang], `stenosis signal card must remain populated in ${lang}`)
const stenosisLedger = await readFile('docs/lesson-quality/spinalkanalstenose-wirbelsaeule-p8.md', 'utf8')
assert.match(stenosisLedger, /physische PDF-Seite 8, gedruckte Seite 7/)
assert.match(stenosisLedger, /Neuroforamenstenose.*nicht abgedeckt/)
assert.match(stenosisLedger, /fokussierte Delta-Review PASS \(SRC\/EDU\/LNG\/ASM\/VIS\/REV\)/)
const infectionText = JSON.stringify(SPINE_INFECTION_LESSON)
assert.ok(SPINE_INFECTION_LESSON.source.includes('PDF S. 14–15'))
assert.ok(SPINE_INFECTION_LESSON.chapters[0].rows.some(([, text]) => text.de.includes('kleinen Kindern') && text.en.includes('young children') && text.fa.includes('کودکان خردسال')), 'infection lesson must distinguish adult and young-child distribution in all languages')
assert.ok(SPINE_INFECTION_LESSON.notice.de.includes('gilt für Erwachsene') && SPINE_INFECTION_LESSON.notice.fa.includes('برای بزرگسالان است'), 'adult IDSA scope must be explicit')
assert.ok(SPINE_INFECTION_LESSON.chapters[1].note.de.includes('Quellenkonflikt') && SPINE_INFECTION_LESSON.chapters[1].note.fa.includes('تعارض منبع'), 'source conflict on early TB/no destruction must be dispositioned in all languages')
const topics = []
const findTopics = value => {
  if (Array.isArray(value)) return value.forEach(findTopics)
  if (!value || typeof value !== 'object') return
  if (value.id && ['spondylodiszitis', 'wirbelsaeulentuberkulose', 'paravertebraler-abszess', 'epiduraler-abszess'].includes(value.id)) topics.push(value)
  Object.values(value).forEach(findTopics)
}
findTopics(CURRICULUM)
for (const id of ['spondylodiszitis', 'wirbelsaeulentuberkulose', 'paravertebraler-abszess', 'epiduraler-abszess']) {
  const topic = topics.find(item => item.id === id)
  assert.ok(topic?.link?.startsWith('/wirbelsaeule/infektion'), `${id} must link to the infection lesson`)
  assert.equal(topic.inProgress, true, `${id} must remain in progress`)
}
for (const term of ['Tuberkulose', 'Neoplasie', 'Erosive Osteochondrose', 'Ankylosierende Spondylitis', 'Andersson']) assert.ok(infectionText.includes(term), `infection lesson missing ${term}`)
for (const lesson of lessons) assert.ok(lesson.heroImage || lesson.id === 'degenerative-wirbelsaeule', `${lesson.id} missing explanatory visual`)

const assessmentDrafts = [...MSK_SPINE_LESSON_QUESTION_DRAFTS, ...MSK_SPINE_LESSON_FLASHCARD_DRAFTS]
const assessmentIds = assessmentDrafts.map(item => item.id)
assert.equal(new Set(assessmentIds).size, assessmentIds.length, 'assessment IDs must be unique')
for (const item of assessmentDrafts) {
  walk(item, `assessment.${item.id}`, 'assessment')
  assert.ok(item.source || item.topicId, `${item.id} needs a source or topic ID`)
}

// Focused source reconciliation for the existing AC-joint lesson against
// MSK.pdf pp. 12–13. Keep weighted views conditional and source-qualified.
walk(AK_LUXATION_LESSON, 'akLuxation', 'ak-luxation')
walk(AK_LUXATION_QUESTIONS, 'akLuxation.questions', 'ak-luxation')
walk(AK_LUXATION_FLASHCARDS, 'akLuxation.flashcards', 'ak-luxation')
const akText = JSON.stringify({ lesson: AK_LUXATION_LESSON, questions: AK_LUXATION_QUESTIONS, flashcards: AK_LUXATION_FLASHCARDS })
assert.ok(akText.includes('10–15 kg'), 'AK lesson should preserve the PDF-described weighted-view technique as source data')
assert.ok(akText.includes('Nordin et al.') && akText.includes('10.1177/0284185120939270'), 'AK lesson must correctly attribute the 2020-online/2021-issue weighted-view study to Nordin et al.')
assert.ok(akText.includes('Ibrahim et al. (2015') && akText.includes('10.1016/j.injury.2015.06.028'), 'AK lesson should document the conflicting Ibrahim 2015 study')
assert.ok(akText.includes('independent normative reference is still pending') && akText.includes('منبع هنجاری مستقل آن در انتظار بررسی است'), '11–13 mm must remain explicitly marked pending independent normative sourcing')
assert.doesNotMatch(akText, /Ibrahim et al\. 2020|ابراهیم و همکاران، ۲۰۲۰/, 'weighted-view DOI must not be attributed to Ibrahim')
for (const obsolete of [/Goldstandard/i, /Stressaufnahmen sind wichtig.*Typ III.*V/i, /important for differentiating type III from V/i, /تفاوت نوع III و V.*ضروری/i]) {
  assert.doesNotMatch(akText, obsolete, `obsolete categorical weighted-view claim: ${obsolete}`)
}
for (const lang of ['de', 'en', 'fa']) {
  const weightedQuestion = AK_LUXATION_QUESTIONS[lang].find(({ id }) => id === `ak-lux-belastung-1-${lang}`)
  assert.ok(weightedQuestion, `missing selective weighted-view question in ${lang}`)
  const correctText = weightedQuestion.options.find(({ id }) => id === weightedQuestion.correct)?.text
  assert.ok(correctText, `weighted-view question has no correct answer in ${lang}`)
  assert.match(correctText, /specific|konkret|مشخص/i, `weighted-view answer must be conditional in ${lang}`)
  assert.match(correctText, /routine|Routine|روتین/i, `weighted-view answer must reject routine use in ${lang}`)
}
for (const item of MSK_SPINE_LESSON_QUESTION_DRAFTS) {
  assert.equal(item.options.length, 3, `${item.id} should provide three options`)
  assert.ok(['A', 'B', 'C'].includes(item.correct), `${item.id} correct answer key is invalid`)
  assert.ok(item.explanation, `${item.id} missing explanatory feedback`)
}

// Existing pediatric-fracture assessment bank must not retain absolute CT or
// surgery claims that contradict its revised source-qualified lesson wording.
const pediatricModule = await import('../data/frakturen-kindesalter.js')
const pediatricAssessmentText = JSON.stringify(pediatricModule)
for (const obsolete of [/always CT/i, /immer CT/i, /surgery if >\s*2\s*mm/i, /OP-pflichtig.*>\s*2\s*mm/i, /require surgery if >\s*2\s*mm/i, /Operationsindikation >\s*2\s*mm/i, /OP-pflichtig wenn disloziert/i, /OP-pflichtig bei Dislokation/i, /surgery if displaced/i, /surgery when displaced/i, /جراحی در صورت جابجایی/i]) {
  assert.doesNotMatch(pediatricAssessmentText, obsolete, `obsolete pediatric assessment claim: ${obsolete}`)
}
assert.ok(pediatricAssessmentText.includes('10.2106/JBJS.19.01170'), 'pediatric assessment revisions should cite the primary outcome study')
for (const obsolete of [/CT ist .*essenziell/i, /CT is essential/i, /CT .*ضروری است/]) {
  assert.doesNotMatch(pediatricAssessmentText, obsolete, `obsolete universal CT claim: ${obsolete}`)
}
for (const lang of ['de', 'en', 'fa']) {
  const triplaneQuestion = pediatricModule.FRAKTUR_KINDER_QUESTIONS[lang].find(({ id }) => id === `fk-triplane-1-${lang}`)
  assert.ok(triplaneQuestion, `missing triplane MCQ in ${lang}`)
  const correctOption = triplaneQuestion.options.find(({ id }) => id === triplaneQuestion.correct)?.text ?? triplaneQuestion.options[1]
  assert.match(correctOption, /when radiographs|wenn Röntgen|اگر رادیوگرافی/i, `conditional CT criterion missing from ${lang} correct option`)
  assert.match(correctOption, /planning|Behandlungsplanung|برنامه‌ریزی/i, `planning context missing from ${lang} correct option`)
}

for (const file of ['public/educational/spine-degenerative-schematic.svg', 'public/educational/spine-infection-schematic.svg', 'public/educational/spine-inflammatory-structural-schematic.svg', 'public/educational/msk-bone-aggressiveness.svg']) {
  const svg = await readFile(file, 'utf8')
  assert.ok(svg.trimStart().startsWith('<svg'), `${file} is not an SVG document`)
  assert.ok(!/<text\b/.test(svg), `${file} contains untranslated text labels`)
  assert.ok(svg.trimEnd().endsWith('</svg>'), `${file} has no closing SVG tag`)
  const errors = []
  const document = new DOMParser({ onError: (level, message) => errors.push(`${level}: ${message}`) }).parseFromString(svg, 'image/svg+xml')
  assert.equal(document.documentElement?.nodeName, 'svg', `${file} did not parse as SVG XML`)
  assert.deepEqual(errors, [], `${file} XML parse errors: ${errors.join('; ')}`)
}
const infectionProvenance = JSON.parse(await readFile('public/educational/spine-infection-schematic.provenance.json', 'utf8'))
assert.equal(infectionProvenance.diagnosticUse, false)
assert.ok(infectionProvenance.diagnosticCaseStatus.includes('unresolved'))
const ledger = await readFile('docs/lesson-quality/msk-wirbelsaeule-lesson-progress.md', 'utf8')
assert.match(ledger, /VIS, offen für alle drei Lektionen/)
assert.match(ledger, /frame-verifizierte diagnostische Fallserie/)
assert.deepEqual(problems, [], problems.join('\n'))
console.log(`MSK/spine authoring checks passed: ${lessons.length} lessons, ${MSK_SPINE_LESSON_QUESTION_DRAFTS.length} MCQ drafts, ${MSK_SPINE_LESSON_FLASHCARD_DRAFTS.length} flashcard drafts; DE/EN/FA fields, case/reference/UI parity, chapter caveats, SVG XML, and explicit VIS blockers.`)
