import assert from 'node:assert/strict'
import { AVM_LESSON, AVM_QUESTIONS, AVM_FLASHCARDS } from '../data/avm.js'

assert.deepEqual(AVM_LESSON.pdfSourcePages, [37, 38])
assert.equal(AVM_LESSON.sections.length, 8)
assert.equal(AVM_QUESTIONS.de.length, 12)
assert.equal(AVM_FLASHCARDS.length, 15)

for (const section of ['grundlagen', 'klinik', 'spetzler', 'bildgebung', 'fall', 'differenzial', 'management', 'takehome']) {
  assert.ok(AVM_LESSON[section].title.de && AVM_LESSON[section].title.en && AVM_LESSON[section].title.fa, `${section} title translations`)
}
for (const lang of ['de', 'en', 'fa']) {
  assert.equal(AVM_QUESTIONS[lang].length, AVM_QUESTIONS.de.length, `${lang} MCQ count`)
  const positions = new Set()
  for (const [i, question] of AVM_QUESTIONS[lang].entries()) {
    assert.ok(question.question && question.explanation, `${lang} MCQ ${i + 1}`)
    assert.equal(question.options.length, 4, `${lang} MCQ ${i + 1} option count`)
    assert.ok(question.options.some(option => option.id === question.correct), `${lang} MCQ ${i + 1} answer id`)
    positions.add(question.correct)
    assert.equal(new Set(question.options.map(option => option.text)).size, 4, `${lang} MCQ ${i + 1} unique options`)
  }
  assert.ok(positions.size >= 3, `${lang} MCQ answer positions vary`)
}
for (const card of AVM_FLASHCARDS) {
  for (const [field, value] of Object.entries({ front: card.front, answer: card.answer, explanation: card.explanation })) {
    assert.ok(value.de && value.en && value.fa, `${card.id} ${field} translations`)
  }
}

const caseText = JSON.stringify(AVM_LESSON.fall)
assert.match(caseText, /cannot be reliably|nicht zuverlässig|با اطمینان مشخص نیست/)
assert.doesNotMatch(caseText, /Grade I|Grad I|ideal surgical candidate|OP-Kandidat/i)
assert.doesNotMatch(JSON.stringify([...AVM_QUESTIONS.de, ...AVM_FLASHCARDS]), /6–18|~80%|~80 %|OP empfohlen|pathognomonisch|pathognomonic/i)
assert.match(AVM_LESSON.spetzler.key.de, /keine eigenständige Therapieempfehlung/)

console.log('AVM pp.37–38 focused checks passed')
