import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, statSync } from 'node:fs'
import vm from 'node:vm'
import { getPractice, sentenceOnly } from './practice.js'

const source = readFileSync(new URL('./DeutschPage.jsx', import.meta.url), 'utf8')
const lessons = vm.runInNewContext(`const todayIso=()=> '2026-10-27';${source.slice(source.indexOf('const sampleLesson ='), source.indexOf('const contentPrompt'))};[enrichLessonVocabulary(upgradedSampleLesson), sampleLesson]`)

test('prepared lesson has a contextual vocabulary exercise for each word and 15 grammar exercises', () => {
  const lesson = lessons[0]
  const practice = getPractice(lesson)
  assert.equal(practice.vocabulary.length, lesson.reading.vocabulary.length)
  assert.equal(practice.grammar.length, 15)
  assert.ok(practice.vocabulary.length + practice.grammar.length >= 30)
  for (const item of [...practice.vocabulary, ...practice.grammar]) {
    assert.equal(item.options.length, 4)
    assert.ok(item.question.includes('___'))
    assert.ok(item.answer >= 0 && item.answer < 4)
    assert.doesNotMatch(item.question, /^(Ergänze|Wähle|Was bedeutet|Welche)/)
  }
  for (const item of practice.vocabulary) {
    assert.ok(lesson.reading.vocabulary.some(word => word.term === item.options[item.answer]))
    assert.ok(item.explanation.length > 50)
  }
  assert.equal(new Set(practice.vocabulary.map(item => item.answer)).size, 4)
})

test('existing cloze questions retain their options and answer', () => {
  const imported = { question: 'Sie bleibt ___, obwohl alle aufgeregt sind.', options: ['ruhig', 'spät', 'gestern', 'hier'], answer: 0, explanation: 'Sie ist nicht aufgeregt.' }
  const practice = getPractice({ vocabulary_quiz: [imported], grammar: [] })
  assert.equal(practice.vocabulary[0], imported)
  assert.equal(practice.grammar.length, 15)
})

test('grammar prompt cleanup preserves only the sentence', () => {
  assert.equal(sentenceOnly('Ergänze richtig: „Sie bittet ___ eine Bestätigung.“'), 'Sie bittet ___ eine Bestätigung.')
  assert.equal(sentenceOnly('Wähle die richtige Form: mit ___ Kollegin'), 'mit ___ Kollegin')
})

test('every bundled reading and listening text has an actual non-empty neural audio recording', () => {
  const recordings = JSON.parse(readFileSync(new URL('../../../data/deutschRecordings.json', import.meta.url)))
  for (const section of lessons.flatMap(lesson => [lesson.reading, lesson.listening])) {
    const recording = recordings.find(item => item.text === section.text)
    assert.ok(recording?.src)
    const path = new URL(`../../../public${recording.src}`, import.meta.url)
    const header = readFileSync(path).subarray(0, 12)
    assert.equal(header.toString('ascii', 4, 8), 'ftyp')
    assert.match(recording.src, /\.m4a$/)
    assert.match(recording.voice, /Chirp 3 HD/)
    assert.ok(statSync(path).size > 20_000)
  }
})

test('unreviewed example text never receives arbitrary unrelated distractors',()=>{
 const lesson={id:'custom',reading:{vocabulary:[
  {term:'abwägen',example:'Wir müssen die Folgen sorgfältig abwägen.'},
  {term:'der Antrag',example:'Der Antrag ist vollständig.'},
  {term:'plötzlich',example:'Sie kam plötzlich.'},
  {term:'vertraulich',example:'Das ist vertraulich.'},
 ]}}
 assert.equal(getPractice(lesson).vocabulary.length,0)
 assert.ok(getPractice(lesson,{legacy:true}).vocabulary.length>0)
})

test('reviewed phrases use a fresh context even if the imported example uses another inflection',()=>{
 const practice=getPractice({id:'health',reading:{vocabulary:[{term:'sich eingestehen',example:'Er gestand sich ein, dass er Hilfe braucht.'}]}})
 assert.equal(practice.vocabulary.length,1)
 assert.equal(practice.vocabulary[0].options.length,4)
 assert.equal(practice.vocabulary[0].options[practice.vocabulary[0].answer],'sich eingestehen')
 assert.match(practice.vocabulary[0].question,/Unterstützung braucht/)
})
