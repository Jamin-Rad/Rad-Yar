import assert from 'node:assert/strict'
import fs from 'node:fs'
import { QUESTION_BANK } from '../data/questions.js'
import { FLASHCARD_TOPICS, getCardsByTopic } from '../data/flashcards.js'
import { CURRICULUM, getLessonLinkForFlashcard } from '../data/curriculum.js'

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
  'کلسیفیکاسیون را نیز به‌عنوان یافته احتمالی CT ذکر می‌کند',
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
