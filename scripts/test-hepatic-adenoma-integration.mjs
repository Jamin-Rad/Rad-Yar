import assert from 'node:assert/strict'
import fs from 'node:fs'
import { QUESTION_BANK } from '../data/questions.js'
import { FLASHCARD_TOPICS, getCardsByTopic } from '../data/flashcards.js'
import { CURRICULUM, getLessonLinkForFlashcard } from '../data/curriculum.js'

const route = '/abdomen/leber/adenom'
const topicId = 'leberadenom'
const definitions = [
  'hepatic-adenoma-hbp',
  'hepatic-adenoma-opposed-phase',
  'hepatic-adenoma-dynamic-ct',
  'hepatic-adenoma-caveat',
]
const topic = CURRICULUM.flatMap(subject => subject.kapitel).flatMap(chapter => chapter.themen).find(item => item.id === topicId)
assert.ok(topic, 'existing leberadenom curriculum topic exists')
assert.equal(topic.link, route)
assert.equal(topic.flashcardLink, '/flashcards/leberadenom?from=%2Fabdomen%2Fleber%2Fadenom')
assert.equal(topic.mcqLink, '/ueben/quiz?fach=abdomen&n=4&themen=leberadenom&from=%2Fabdomen%2Fleber%2Fadenom')
assert.equal(getLessonLinkForFlashcard(topic.flashcardLink), route)
assert.ok(FLASHCARD_TOPICS.some(item => item.id === topicId))
assert.equal(getCardsByTopic(topicId).length, 5)

for (const lang of ['de', 'en', 'fa']) {
  const addedDistractors = []
  for (const id of definitions) {
    const question = QUESTION_BANK[lang].find(item => item.id === `${id}-${lang}-01`)
    assert.ok(question, `${id}: registered ${lang} MCQ`)
    assert.ok(question.tags.includes(topicId))
    assert.equal(question.options.length, 4)
    assert.ok(question.options.some(option => option.id === question.correct))
    addedDistractors.push(question.options.find(option => option.id === 'D').text)
  }
  assert.equal(new Set(addedDistractors).size, definitions.length, `${lang}: each HCA MCQ has its own lesson-specific distractor`)
  for (const card of getCardsByTopic(topicId)) assert.ok(card.front[lang] && card.answer[lang] && card.explanation[lang], `${card.id}: complete ${lang} card`)
}
for (const id of ['hepatic-adenoma-opposed-phase', 'hepatic-adenoma-dynamic-ct']) {
  const de = QUESTION_BANK.de.find(item => item.id === `${id}-de-01`)
  const en = QUESTION_BANK.en.find(item => item.id === `${id}-en-01`)
  assert.notEqual(de.explanation, en.explanation, `${id}: German rationale is translated, not copied from English`)
}
const dynamicCtDe = QUESTION_BANK.de.find(item => item.id === 'hepatic-adenoma-dynamic-ct-de-01')
assert.ok(dynamicCtDe.options.some(option => option.id === 'D' && option.text === 'Ein portalvenöses Hypoenhancement ist spezifisch für HCA'))

const routeSource = fs.readFileSync(new URL('../app/abdomen/leber/adenom/page.js', import.meta.url), 'utf8')
assert.match(routeSource, /const lessonReturn = `\/abdomen\/leber\/adenom\$\{lang === 'de' \? '' : `\?lang=\$\{lang\}`\}`/)
assert.match(routeSource, /quizHref=\{`\/ueben\/quiz\?fach=abdomen&n=4&themen=leberadenom&from=\$\{encodeURIComponent\(lessonReturn\)\}&lang=\$\{lang\}`\}/)
assert.match(routeSource, /flashcardsHref=\{`\/flashcards\/leberadenom\?from=\$\{encodeURIComponent\(lessonReturn\)\}&lang=\$\{lang\}`\}/)
for (const lang of ['de', 'en', 'fa']) {
  const lessonReturn = `/abdomen/leber/adenom${lang === 'de' ? '' : `?lang=${lang}`}`
  const quiz = new URL(`/ueben/quiz?fach=abdomen&n=4&themen=leberadenom&from=${encodeURIComponent(lessonReturn)}&lang=${lang}`, 'http://localhost')
  const flashcards = new URL(`/flashcards/leberadenom?from=${encodeURIComponent(lessonReturn)}&lang=${lang}`, 'http://localhost')
  assert.equal(quiz.searchParams.get('from'), lessonReturn, `${lang}: quiz returns to the lesson in the current language`)
  assert.equal(flashcards.searchParams.get('from'), lessonReturn, `${lang}: flashcards return to the lesson in the current language`)
  assert.equal(quiz.searchParams.get('lang'), lang)
  assert.equal(flashcards.searchParams.get('lang'), lang)
}
const focalRoute = fs.readFileSync(new URL('../app/abdomen/leber/fokale-laesionen/page.js', import.meta.url), 'utf8')
assert.ok(focalRoute.includes('title={copy.title}'), 'focal liver comparison uses the defined localized copy object')
const asset = new URL('../public/educational/hepatic-adenoma/source-mri-p17.jpg', import.meta.url)
assert.ok(fs.statSync(asset).size > 20000, 'source MRI figure exists and is non-empty')
const provenance = fs.readFileSync(new URL('../docs/lesson-quality/media-provenance.md', import.meta.url), 'utf8')
assert.ok(provenance.includes('source-mri-p17.jpg'))
assert.ok(provenance.includes('x=225, y=936, width=1200, height=585'))
assert.ok(provenance.includes('user explicitly authorized reuse of figures in the supplied PDFs'))
for (const phrase of [
  'Hepatozelluläres Adenom', 'Hepatocellular adenoma', 'آدنوم هپاتوسلولار',
  'die hepatobiliäre Phase ist auf dieser Bildtafel nicht enthalten.',
  'the hepatobiliary phase is not included in this figure.',
  'فاز هپاتوبیلیاری در این تصویر وجود ندارد.',
  'every 6 months for 2 years, then annually',
  'هر ۶ ماه به‌مدت ۲ سال و سپس سالانه',
  'alle 6 Monate für 2 Jahre, danach jährlich',
  'Definitive treatment should be pursued if size remains ≥5 cm',
  'soll eine definitive Behandlung erfolgen',
  'درمان قطعی باید پیگیری شود',
  'https://doi.org/10.14309/ajg.0000000000002857',
]) assert.ok(routeSource.includes(phrase), `HCA source, scope and localized route content include: ${phrase}`)
for (const phrase of [
  'sofern keine bildgebenden Malignitätsmerkmale vorliegen und kein β-Catenin-aktivierter Subtyp bekannt ist',
  'when there are no imaging features concerning for malignancy and no known β-catenin-activated subtype',
  'در نبود نشانهٔ تصویری بدخیمی و زیرگروه شناخته‌شدهٔ فعال‌شده با β-catenin',
  'β-Catenin-mutierte Adenome sollen unabhängig von der Größe reseziert werden',
  'β-catenin-mutated adenomas should be resected regardless of size',
  'آدنوم‌های جهش‌یافتهٔ β-catenin باید مستقل از اندازه برداشته شوند',
  'resection should be considered for men regardless of size',
  'Resektion unabhängig von der Größe erwogen werden',
  'برای مردان نیز رزکسیون مستقل از اندازه باید مدنظر باشد',
  'high-risk features for rupture',
  'hohem Rupturrisiko soll die Läsion behandelt werden',
  'has high-risk features for rupture, it should be treated',
  'ویژگی‌های پرخطر پارگی، ضایعه باید درمان شود',
]) assert.ok(routeSource.includes(phrase), `ACG 2024 management caveat is localized: ${phrase}`)
for (const phrase of [
  'Zusammenhang von Dauer und Dosis der Hormonexposition',
  'correlating with hormone-exposure duration and dose',
  'ارتباط مدت و دوز مواجههٔ هورمونی',
]) assert.ok(routeSource.includes(phrase), `PDF risk association is preserved without quantitative overstatement: ${phrase}`)

const diagramSource = fs.readFileSync(new URL('../components/ClinicalPatternDiagram.jsx', import.meta.url), 'utf8')
assert.match(routeSource, /diagram="hepatic-adenoma"/, 'HCA lesson uses the topic-specific diagram')
assert.match(diagramSource, /<circle cx="87" cy="48" r="13" fill=\{PALETTE\.plum\}/, 'HBP lesion is visibly lower signal than the liver background')
for (const phrase of ['hepatic-adenoma', 'usually a relatively low-signal focus', 'meist relativ signalarmes Areal', 'معمولاً کانون با سیگنال نسبی پایین']) {
  assert.ok(diagramSource.includes(phrase) || routeSource.includes(phrase), `HCA diagram has localized purpose and accessibility text: ${phrase}`)
}
for (const phrase of ['Follow the right-lobe lesion across T1 in-/out-of-phase and dynamic T1 images', 'Verfolgen Sie die Läsion im rechten Leberlappen über T1 In-/Out-of-phase', 'ضایعهٔ لوب راست کبد را در تصاویر T1 in-/out-of-phase']) {
  assert.ok(routeSource.includes(phrase), `HCA source figure has localized viewing guidance: ${phrase}`)
}

console.log('Hepatic adenoma integration PASS: exact curriculum route, four localized MCQs, five localized flashcards, source figure/provenance and language coverage.')
