import assert from 'node:assert/strict'
import fs from 'node:fs'
import { QUESTION_BANK } from '../data/questions.js'
import { FLASHCARD_TOPICS, getCardsByTopic } from '../data/flashcards.js'
import { CURRICULUM, getLessonLinkForFlashcard } from '../data/curriculum.js'
import { ADRENAL_LESSON_CHECK } from '../data/abdomenAdrenalLessonMaterials.js'

const definitions = [
  { id: 'nebennieren-inzidentalom', route: '/abdomen/nebenniere/raumforderungen', cards: 5, questions: ['abdomen-adrenal-masses'] },
  { id: 'nebennierenadenom', route: '/abdomen/nebenniere/raumforderungen', cards: 5, questions: ['abdomen-adrenal-masses', 'adrenal-adenoma-microscopic-fat'] },
  { id: 'phaeochromozytom', route: '/abdomen/nebenniere/raumforderungen', cards: 5, questions: ['adrenal-pheochromocytoma-washout'] },
  { id: 'myelolipom', route: '/abdomen/nebenniere/raumforderungen', cards: 5, questions: ['adrenal-myelolipoma-macroscopic-fat'] },
  { id: 'neuroblastom-nebenniere', route: '/abdomen/nebenniere/raumforderungen', cards: 5, questions: ['adrenal-neuroblastoma-origin'] },
]
const topics = CURRICULUM.flatMap(subject => subject.kapitel).flatMap(chapter => chapter.themen)

assert.ok(FLASHCARD_TOPICS.some(topic => topic.id === 'nebennierenraumforderungen'))
assert.equal(getCardsByTopic('nebennierenraumforderungen').length, 5)
for (const item of definitions) {
  const topic = topics.find(candidate => candidate.id === item.id)
  assert.ok(topic, `${item.id}: curriculum topic exists`)
  assert.equal(topic.link, item.route)
  assert.equal(topic.flashcardLink, '/flashcards/nebennierenraumforderungen')
  assert.equal(getLessonLinkForFlashcard(topic.flashcardLink), item.route)
  assert.ok(topic.mcqLink?.includes(`themen=${item.id}`), `${item.id}: exact quiz topic link`)
  for (const lang of ['de', 'en', 'fa']) {
    for (const id of item.questions) {
      const question = QUESTION_BANK[lang].find(candidate => candidate.id === `${id}-${lang}-01`)
      assert.ok(question, `${id}: registered ${lang} question`)
      assert.ok(question.tags.includes(item.id), `${id}: tagged ${item.id}`)
      assert.equal(question.options.length, 4)
      assert.ok(question.options.some(option => option.id === question.correct))
    }
  }
}
for (const card of getCardsByTopic('nebennierenraumforderungen')) {
  for (const lang of ['de', 'en', 'fa']) assert.ok(card.front[lang] && card.answer[lang] && card.explanation[lang], `${card.id}: complete ${lang} copy`)
}
const lessonRoute = fs.readFileSync(new URL('../app/abdomen/nebenniere/raumforderungen/page.js', import.meta.url), 'utf8')
const mediaProvenance = fs.readFileSync(new URL('../docs/lesson-quality/media-provenance.md', import.meta.url), 'utf8')
for (const [asset, page] of [
  ['adenoma-washout.jpg', 'Physical p.59 (printed p.58)'],
  ['myelolipoma-native.jpg', 'Physical p.61 (printed p.60)'],
  ['myelolipoma-postcontrast.jpg', 'Physical p.61 (printed p.60)'],
  ['pheochromocytoma-four-phase.jpg', 'Physical p.63 (printed p.62)'],
  ['neuroblastoma-mri-pair.jpg', 'Physical p.64 (printed p.63)'],
]) {
  assert.ok(mediaProvenance.includes(asset), `asset provenance records ${asset}`)
  assert.ok(mediaProvenance.includes(page), `${asset}: provenance records ${page}`)
}
assert.ok(mediaProvenance.includes('identified in the inspected source file.'))
const adrenalQuestionIds = new Set(['abdomen-adrenal-masses', 'adrenal-adenoma-microscopic-fat', 'adrenal-myelolipoma-macroscopic-fat', 'adrenal-pheochromocytoma-washout', 'adrenal-neuroblastoma-origin'])
const adrenalAssessmentText = ['de', 'en', 'fa'].map(lang => {
  const questions = QUESTION_BANK[lang].filter(question => adrenalQuestionIds.has(question.id.replace(/-\w{2}-01$/, '')))
  const cards = getCardsByTopic('nebennierenraumforderungen').flatMap(card => [card.front[lang], card.answer[lang], card.explanation[lang]])
  const check = [ADRENAL_LESSON_CHECK.question[lang], ...ADRENAL_LESSON_CHECK.options.map(option => option[lang]), ADRENAL_LESSON_CHECK.explanation[lang]]
  const allText = [...questions.flatMap(question => [question.question, ...question.options.map(option => option.text), question.explanation]), ...cards, ...check].join(' ')
  const neuroCard = getCardsByTopic('nebennierenraumforderungen').find(card => card.id.endsWith('-neuroblastoma-localisation'))
  assert.ok(neuroCard, `${lang}: neuroblastoma localization card exists`)
  if (lang === 'de') assert.match(neuroCard.explanation[lang], /sichtbare Abgrenzung mit Verdrängung der Niere.*Gefäßummauerung ist nicht gleichbedeutend mit Gefäßwandinvasion/s)
  if (lang === 'en') assert.match(neuroCard.explanation[lang], /visible plane with kidney displacement.*Vascular encasement is not the same as vessel-wall invasion/s)
  if (lang === 'fa') assert.match(neuroCard.explanation[lang], /مرز قابل مشاهده همراه با جابه‌جایی کلیه.*احاطه عروق به‌معنای تهاجم به دیواره عروق نیست/s)
  const pheoId = `adrenal-pheochromocytoma-washout-${lang}-01`
  const pheoQuestion = questions.find(question => question.id === pheoId)
  assert.ok(pheoQuestion, `${lang}: pheochromocytoma washout MCQ is registered`)
  assert.match(`${pheoQuestion.options.map(option => option.text).join(' ')} ${pheoQuestion.explanation}`, /washout|فئوکروموسیتوم/i)
  const myeloQuestion = questions.find(question => question.id === `adrenal-myelolipoma-macroscopic-fat-${lang}-01`)
  assert.ok(myeloQuestion, `${lang}: myelolipoma MCQ is registered`)
  assert.ok(myeloQuestion.tags.includes('myelolipom'), `${lang}: myelolipoma MCQ uses the exact topic tag`)
  assert.equal(myeloQuestion.options.find(option => option.id === myeloQuestion.correct)?.text, myeloQuestion.options[0].text, `${lang}: correct myelolipoma answer is macroscopic fat plus fat-sat pattern`)
  const myeloCard = getCardsByTopic('nebennierenraumforderungen').find(card => card.id.endsWith('-myelolipoma-macroscopic-fat'))
  assert.ok(myeloCard, `${lang}: myelolipoma flashcard exists`)
  if (lang === 'de') assert.match(myeloCard.explanation[lang], /hämatopoetisches Gewebe/)
  if (lang === 'en') assert.match(myeloCard.explanation[lang], /haematopoietic tissue/)
  if (lang === 'fa') assert.match(myeloCard.explanation[lang], /بافت خون‌ساز/)
  if (lang === 'de') assert.match(allText, /Washout allein schließt ein Phäochromozytom nicht sicher aus/)
  if (lang === 'en') assert.match(allText, /Washout alone does not reliably exclude pheochromocytoma/)
  if (lang === 'fa') assert.match(allText, /Washout به‌تنهایی فئوکروموسیتوم را با اطمینان رد نمی‌کند/)
  return allText
}).join(' ')
assert.doesNotMatch(adrenalAssessmentText, /(?:<\s*4|4\s*[–-]\s*6|>\s*6)\s*cm|2\s*%|6\s*%|25\s*%|(?:absolute|relatives?|relative)\s+washout[^.]{0,60}(?:60|40)\s*%|100\s*%\s*(?:specificity|Spezifität)|(?:50\s*%\s*(?:sensitivity|Sensitivität))|10\s*%|10%-Regel|10% rule|110\s*[–-]\s*120\s*HU|(?:one|a) third|ein Drittel|یک سوم/i, 'legacy incidentaloma/pheochromocytoma source rules, washout cutoffs and performance statistics must not leak into learner assessments')
for (const phrase of [
  'unabhängig von der Größe keine weitere Bildgebung',
  'irrespective of size',
  'مستقل از اندازه',
]) assert.ok(lessonRoute.includes(phrase), `current ESE/ENSAT rule is explicit in localized lesson copy: ${phrase}`)
for (const phrase of [
  'Meist isointens bis leicht hypointens zum Leberparenchym.',
  'Usually isointense to slightly hypointense relative to liver parenchyma.',
  'معمولاً نسبت به پارانشیم کبد هم‌سیگنال تا کمی کم‌سیگنال.',
  'hämatopoetische Weichteilanteile intermediär',
  'haematopoietic soft-tissue components are intermediate in signal',
  'اجزای بافت نرم خون‌ساز سیگنال میانی دارند',
  'hypervaskuläre Metastasen ähnlich aussehen können',
  'hypervascular metastases can have a similar appearance',
  'متاستاز پرعروق نیز ممکن است ظاهر مشابهی داشته باشد',
  'Verkalkungen als möglichen CT-Befund',
  'calcification as a possible CT finding',
  'PDF کلسیفیکاسیون را به‌عنوان یافته احتمالی CT ذکر می‌کند',
  'Eine sichtbare Abgrenzung zur Niere mit Verdrängung stützt einen extrarenalen Ursprung',
  'A visible plane from the kidney with displacement supports an extra-renal origin',
  'وجود مرز قابل مشاهده با کلیه همراه با جابه‌جایی آن از منشأ خارج‌کلیوی حمایت می‌کند',
  'die Ummauerung allein beweist keine Invasion der Gefäßwand',
  'encasement alone does not prove vessel-wall invasion',
  'احاطه عروق به‌تنهایی تهاجم به دیواره عروق را ثابت نمی‌کند',
  'Die Quelle benennt die MRT-Sequenzen nicht',
  'The source does not identify the MRI sequences',
  'منبع توالی‌های MRI را مشخص نمی‌کند',
  'Nebennierenzysten sind selten und können auch ohne soliden Anteil neoplastisch sein',
  'adrenal cysts are rare and may be neoplastic even without a solid component',
  'کیست آدرنال نادر است و حتی بدون جزء جامد ممکن است نئوپلاستیک باشد',
]) assert.ok(lessonRoute.includes(phrase), `PDF p.60–64 source-derived localized content present: ${phrase}`)
for (const phrase of [
  'Bildgebung allein bestimmt keine hormonelle Aktivität',
  'Imaging alone does not establish hormonal activity',
  'تصویربرداری به‌تنهایی فعالیت هورمونی را مشخص نمی‌کند',
  'Endocrine Society PPGL guideline, 2014',
  'https://academic.oup.com/jcem/article/99/6/1915/2537399',
  "lang === 'fa' ? 'منبع راهنمای PPGL'",
  "lang === 'en' ? 'PPGL guideline source'",
  "'PPGL-Leitlinie'",
]) assert.ok(lessonRoute.includes(phrase), `Adrenal clinical-scope caveat present: ${phrase}`)
console.log('Adrenal assessments PASS: exact curriculum links, localized MCQ retrieval and five localized flashcards.')
