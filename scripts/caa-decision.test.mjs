import test from 'node:test'
import assert from 'node:assert/strict'
import { CAA_DECISION_EXAMS, CAA_PRUEFUNG_CASES, decisionOutcome } from '../data/caaStoryCases.mjs'
import { existsSync } from 'node:fs'

for (const [id, questions] of Object.entries(CAA_DECISION_EXAMS)) {
  test(`${id}: four-choice decisions are complete in all three languages`, () => {
    assert.equal(questions.length, id==='caa-radiopaedia-147140'?4:6)
    assert.equal(new Set(questions.map(q => q.id)).size, questions.length)
    assert.deepEqual(new Set(questions.map(q => q.domain)), new Set(id==='caa-radiopaedia-147140'?['observation','interpretation','diagnosis']:['observation','investigation','interpretation','diagnosis']))
    for (const question of questions) {
      for (const entry of [question]) {
        assert(entry)
        assert.equal(entry.options.length, 4)
        assert.equal(new Set(entry.options.map(option => option.id)).size,entry.options.length)
        assert(entry.options.some(option => option.id === entry.correct))
        for(const lang of ['de','en','fa']) {
          assert(entry.prompt[lang]?.trim())
          assert(entry.explanation[lang]?.trim())
          for (const option of entry.options) assert(option.text[lang]?.trim())
        }
      }
    }
  })
  test(`${id}: wrong and missing answers cannot receive independent credit`, () => {
    for(const question of questions) {
      const wrong = question.options.find(option => option.id !== question.correct).id
      assert.equal(decisionOutcome(question,question.correct),'independent')
      assert.equal(decisionOutcome(question,wrong),'missed')
      assert.equal(decisionOutcome(question,wrong,question.correct),'missed')
      assert.equal(decisionOutcome(question,undefined),'unanswered')
      assert.equal(decisionOutcome(question,'not-an-option',question.correct),'unanswered')
      assert.equal(decisionOutcome(question,question.correct,'not-an-option'),'independent')
    }
  })
}

test('Only the two requested source cases are active and media belong to their patient', () => {
  assert.deepEqual(CAA_PRUEFUNG_CASES.map(item=>item.id),['caa-radiopaedia-40475','caa-radiopaedia-147140'])
  for(const item of CAA_PRUEFUNG_CASES) {
    const rid=item.id.split('-').at(-1)
    assert(item.source.startsWith('https://radiopaedia.org/cases/'))
    assert(item.credit.includes(rid))
    assert.deepEqual(item.decisionExam.map(question=>question.stage),Array.from({length:item.stages.length},(_,i)=>i))
    for(const stage of item.stages) for(const image of [stage,...(stage.additionalImages||[])].filter(image=>image.image)) {
      assert(image.image.includes('/'+rid+'-'))
      assert(existsSync(new URL('../public'+image.image,import.meta.url)))
      for(const lang of ['de','en','fa']) assert(image.imageCaption[lang])
    }
  }
})

// Guard the specific cross-step spoilers found during the editorial walkthrough.
// Answer options may introduce a differential at its own decision step.
test('Future complications and diagnoses are not disclosed by earlier teaching text',()=>{
  const [bleeding,inflammation]=CAA_PRUEFUNG_CASES
  for(const lang of ['de','en','fa']) {
    assert.doesNotMatch(bleeding.decisionExam[0].explanation[lang],/hydro[cz]|هیدروسفالی|ventri[kc]|بطن/iu,'Initial test-choice feedback must not reveal the next CT answer')
    const beforeMRI=[bleeding.title[lang],...bleeding.stages.slice(0,3).map(s=>s.narrative[lang]),...bleeding.decisionExam.slice(0,3).map(q=>q.explanation[lang])].join(' ')
    assert.doesNotMatch(beforeMRI,/CAA|amyloid|آمیلوئید|sideros|hemosider|hämosider|هموسیدر/iu,'The haemorrhagic pattern is interpreted only after MRI is available')
    for(const stage of bleeding.stages.slice(0,5)) assert.doesNotMatch(stage.narrative[lang],/β|CD3|CD20|Gewebeprobe|tissue sample|نمونهٔ بافت/iu,'Tissue findings belong to the final stage')
    const beforeIntegration=[...inflammation.stages.slice(0,3).map(s=>s.narrative[lang]),...inflammation.decisionExam.slice(0,3).map(q=>q.explanation[lang])].join(' ')
    assert.doesNotMatch(beforeIntegration,/CAA[- ]ri|amyloid|آمیلوئید|ödematös.entzünd|oedematous.inflamm|ادماتو.التهابی|enhancement|leptomeninge|لپتومننژیال|کورتیکواستروئید|corticosteroid|Kortikosteroid/iu,'Observation feedback must not reveal diagnostic integration, contrast or treatment')
  }
})

test('CAA-ri asks four image-based questions without clinical-tempo or treatment detours',()=>{
  const item=CAA_PRUEFUNG_CASES.find(c=>c.id==='caa-radiopaedia-147140')
  assert.deepEqual(item.decisionExam.map(q=>q.id),['flair-morphology','diffusion-pattern','swi-morphology','diagnose'])
  assert.deepEqual(item.decisionExam.map(q=>q.domain),['observation','interpretation','observation','diagnosis'])
  for(const stage of item.stages)assert(stage.series.length>0,'Every radiology question must provide its images')
  assert.equal(item.stages.length,4)
})
