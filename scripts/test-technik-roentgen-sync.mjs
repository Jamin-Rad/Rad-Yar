import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { QUESTION_BANK } from '../data/questions.js'
import { FLASHCARD_TOPICS, FLASHCARDS } from '../data/flashcards.js'
import { TECHNIK_GRUNDLAGEN } from '../data/technikGrundlagenLesson.js'

const topics = ['roentgenanlage-roehre', 'roentgenstrahlung-spektrum', 'roentgen-wechselwirkung-materie', 'roentgen-bildentstehung-detektor']
for (const lang of ['de', 'en', 'fa']) {
  for (const topic of topics) {
    const questions = QUESTION_BANK[lang].filter(question => question.tags.includes(topic))
    const expectedCount = ['roentgenanlage-roehre', 'roentgen-wechselwirkung-materie', 'roentgen-bildentstehung-detektor'].includes(topic) ? 2 : 1
    assert.equal(questions.length, expectedCount, `${lang}: ${topic} must have ${expectedCount} linked MCQ(s)`)
    for (const question of questions) {
      assert.equal(question.options.length, 4)
      assert.ok(question.options.some(option => option.id === question.correct))
      assert.ok(question.explanation)
    }
    if (topic === 'roentgen-bildentstehung-detektor') {
      assert.ok(questions.some(question => question.id === `roentgen-detektor-${lang}-02`), `${lang}: detector metrics MCQ must be linked`)
    }
    if (topic === 'roentgenanlage-roehre') {
      const heel = questions.find(question => question.id === `roentgenanlage-roehre-${lang}-02`)
      assert.ok(heel, `${lang}: heel-effect transfer MCQ must be linked`)
      assert.match(heel.explanation, /Kathodenseite|cathode side|سمت کاتد/)
    }
  }
}
const cards = FLASHCARDS.filter(card => card.topicId === 'roentgenanlage-roehre')
assert.equal(cards.length, 8, 'Röntgen foundations deck should include three interaction cards and one image-quality card')
for (const id of ['roentgenanlage-roehre-05-photoelectric', 'roentgenanlage-roehre-06-compton', 'roentgenanlage-roehre-07-coherent', 'roentgenanlage-roehre-08-mtf-dqe']) {
  const card = cards.find(item => item.id === id)
  assert.ok(card, `Mechanism flashcard ${id} should be in the linked deck`)
  for (const lang of ['de', 'en', 'fa']) assert.ok(card.front[lang] && card.answer[lang] && card.explanation[lang], `${lang}: ${id} needs a localized front, answer and explanation`)
}
assert.ok(FLASHCARD_TOPICS.some(topic => topic.id === 'roentgenanlage-roehre'))

const [lesson, curriculum, page] = await Promise.all([
  readFile(new URL('../data/technikGrundlagenLesson.js', import.meta.url), 'utf8'),
  readFile(new URL('../data/curriculum.js', import.meta.url), 'utf8'),
  readFile(new URL('../app/technik/grundlagen/StandardPage.jsx', import.meta.url), 'utf8'),
])
const kEdgeSection = TECHNIK_GRUNDLAGEN.sections.find(section => section.id === 'wechselwirkung')
const kEdgeVisual = kEdgeSection.visuals.find(visual => visual.src.endsWith('mammography-k-edge.svg'))
assert.ok(kEdgeVisual, 'K-edge teaching visual should be linked in the interaction section')
const legendPhrases = {
  de: ['blaue durchgezogene Kurve', 'orange gestrichelte Kurve', 'violette Senkrechte'],
  en: ['solid blue', 'dashed orange', 'purple vertical line'],
  fa: ['خط پیوستهٔ آبی', 'خط‌چین نارنجی', 'خط عمودی بنفش'],
}
for (const lang of ['de', 'en', 'fa']) {
  assert.ok(kEdgeVisual.alt[lang] && kEdgeVisual.caption[lang], `${lang}: K-edge visual needs localized alt and caption`)
  for (const phrase of legendPhrases[lang]) assert.ok(kEdgeVisual.caption[lang].includes(phrase), `${lang}: K-edge caption must map visual marks to their meaning`)
}
const kEdgeSvg = await readFile(new URL('../public/technik/grundlagen/mammography-k-edge.svg', import.meta.url), 'utf8')
assert.ok(!/<(?:text|title|desc)\b/i.test(kEdgeSvg), 'K-edge graphic must stay language-neutral and use localized lesson alt/caption')
assert.match(kEdgeSvg, /694 28[0-9]/, 'Filtered schematic must retain residual fluence beyond the K-edge')
const spectrumVisual = TECHNIK_GRUNDLAGEN.sections.find(section => section.id === 'roehre').visuals.find(visual => visual.src.endsWith('xray-spectrum.svg'))
const spectrumSvg = await readFile(new URL('../public/technik/grundlagen/xray-spectrum.svg', import.meta.url), 'utf8')
const textNodes = svg => [...svg.matchAll(/<text\b[^>]*>([^<]*)<\/text>/gi)].map(match => match[1].trim())
assert.ok(textNodes(spectrumSvg).every(text => ['E (keV)', 'Φ_rel', '1', '2', '3'].includes(text)), 'Spectrum graphic must use language-neutral symbols and a localized legend')
for (const lang of ['de', 'en', 'fa']) {
  assert.ok(spectrumVisual.alt[lang] && spectrumVisual.caption[lang], `${lang}: spectrum visual needs localized alt and caption`)
  const curveNumbers = lang === 'fa' ? ['۱', '۲', '۳'] : ['1', '2', '3']
  for (const token of curveNumbers) assert.ok(spectrumVisual.caption[lang].includes(token), `${lang}: spectrum caption must map all three curves`)
}
const detectorVisual = TECHNIK_GRUNDLAGEN.sections.find(section => section.id === 'detektor').visuals.find(visual => visual.src.endsWith('detector-chain.svg'))
const detectorSvg = await readFile(new URL('../public/technik/grundlagen/detector-chain.svg', import.meta.url), 'utf8')
assert.ok(textNodes(detectorSvg).every(text => ['1', '2', '3', 'X', 'P', 'L', 'hν', 'q', 'S → R → E', 'X → hν → q', 'X → q'].includes(text)), 'Detector-chain graphic must use language-neutral symbols and a localized legend')
for (const lang of ['de', 'en', 'fa']) {
  assert.ok(detectorVisual.alt[lang] && detectorVisual.caption[lang], `${lang}: detector-chain visual needs localized alt and caption`)
  assert.match(detectorVisual.alt[lang], /Film-Folie ist nicht abgebildet|Film-screen is not shown|فیلم-اسکرین در شکل نمایش داده نشده/)
}
const interactionSvg = await readFile(new URL('../public/technik/grundlagen/xray-interactions.svg', import.meta.url), 'utf8')
assert.match(interactionSvg, /hν′ &lt; hν/, 'Compton schematic must visibly distinguish the lower-energy outgoing photon')
assert.doesNotMatch(interactionSvg, />(?:absorbed|scattered)</, 'Interaction visual should not expose untranslated English labels')
for (const lang of ['de', 'en', 'fa']) {
  const question = QUESTION_BANK[lang].find(item => item.id === `roentgen-wechselwirkung-${lang}-02`)
  assert.ok(question, `${lang}: localized interaction mechanism MCQ must be registered`)
  assert.match(question.explanation, /Compton|کامپتون/)
}
assert.match(page, /Photoeffekt oder Compton\?|photoelectric effect or Compton\?|اثر فوتوالکتریک یا کامپتون\?/)
assert.match(page, /what does detector type tell you about dose\?|Was sagt der Detektortyp über die Dosis\?|نوع آشکارساز دربارهٔ دوز چه می‌گوید/)
assert.match(lesson, /Halbwertschicht \(HVL\)/)
assert.match(lesson, /Modulationsübertragungsfunktion \(MTF\)/)
assert.match(lesson, /geometrische Unschärfe/)
assert.match(lesson, /geometric unsharpness/)
assert.match(lesson, /محوشدگی هندسی/)
assert.match(lesson, /AAPM Task Group 150/)
for (const content of ['Kathode und Elektronenfokus', 'Tatsächlicher, thermischer und optischer Brennfleck', 'Anode: fest oder rotierend', 'Vakuumhülle und Schutzgehäuse', 'Wovon hängt die Abschwächung ab?', 'K-Kantenfilter in der Mammographie', 'Computed Radiography (CR)', 'DR direkt']) assert.ok(lesson.includes(content), `Source-led lesson detail missing: ${content}`)
for (const asset of ['xray-tube.svg', 'heel-effect.svg', 'xray-interactions.svg', 'mammography-k-edge.svg', 'detector-chain.svg']) assert.ok(lesson.includes(asset), `Teaching diagram missing: ${asset}`)
assert.ok(page.includes('RetrievalCheck kind="roehre"') && page.includes('RetrievalCheck kind="wechselwirkung"') && page.includes('RetrievalCheck kind="detektor"'), 'Each updated chapter must include an inline knowledge check')
assert.ok(curriculum.includes("mcqLink: '/ueben/quiz?fach=technik&n=2&themen=roentgenanlage-roehre'") && curriculum.includes("flashcardLink: '/flashcards/roentgenanlage-roehre'"), 'Curriculum links should target both registered tube questions and the card deck')
assert.match(page, /roentgen-wechselwirkung-materie[\s\S]*?Acht Lernkarten öffnen/)

console.log('Technik Röntgen sync passed: four source-linked topic IDs, DE/EN/FA checks, 8 cards and chapter visuals.')
