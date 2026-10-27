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
    assert.ok(item.explanation.includes(item.question.replace('___', item.options[item.answer])))
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
