import { QUESTION_BANK } from '../data/questions.js'
import { CASE_BANK } from '../data/cases.js'

const LANGUAGES = ['de', 'en', 'fa']
const EXAM_EXPLANATION_LIMIT = 8000
const EXAM_QUESTION_PREFIX = '__RADYAR_EXAM_QUESTION_V2__\n'
const EXAM_QUESTION_SUFFIX = '\n__END_RADYAR_EXAM_QUESTION__\n'
const errors = []

function auditCollection(label, collection) {
  const lengths = LANGUAGES.map(lang => collection[lang]?.length ?? -1)
  if (new Set(lengths).size !== 1) {
    errors.push(`${label}: language lengths differ (${lengths.join(', ')})`)
  }

  for (const lang of LANGUAGES) {
    const items = collection[lang] || []
    const seenIds = new Set()

    items.forEach((item, index) => {
      const where = `${label}.${lang}[${index}] (${item?.id || 'missing id'})`
      if (!item?.id || !String(item.id).trim()) errors.push(`${where}: missing id`)
      if (seenIds.has(item?.id)) errors.push(`${where}: duplicate id`)
      seenIds.add(item?.id)

      if (!item?.question || !String(item.question).trim()) errors.push(`${where}: missing question`)
      if (!Array.isArray(item?.options) || item.options.length !== 4) {
        errors.push(`${where}: expected exactly 4 options`)
        return
      }

      const optionIds = item.options.map(option => option?.id)
      const optionTexts = item.options.map(option => String(option?.text || '').trim())
      if (new Set(optionIds).size !== 4) errors.push(`${where}: option ids are not unique`)
      if (new Set(optionTexts.map(text => text.toLocaleLowerCase(lang))).size !== 4) errors.push(`${where}: option texts are not unique`)
      if (optionTexts.some(text => !text)) errors.push(`${where}: empty option text`)
      if (!optionIds.includes(item.correct)) errors.push(`${where}: correct answer does not exist in options`)
      if (!item?.explanation || !String(item.explanation).trim()) errors.push(`${where}: missing explanation`)

      const wrongExplanations = item?.wrongExplanations && typeof item.wrongExplanations === 'object'
        ? item.wrongExplanations
        : {}
      for (const [optionId, explanation] of Object.entries(wrongExplanations)) {
        if (!optionIds.includes(optionId)) errors.push(`${where}: wrong explanation references missing option ${optionId}`)
        if (optionId === item.correct) errors.push(`${where}: correct option ${optionId} has a wrong explanation`)
        if (!String(explanation || '').trim()) errors.push(`${where}: wrong explanation for ${optionId} is empty`)
      }
      const packedFeedbackLength = EXAM_QUESTION_PREFIX.length
        + JSON.stringify({ media: null, wrongExplanations }).length
        + EXAM_QUESTION_SUFFIX.length
        + String(item.explanation || '').trim().length
      if (packedFeedbackLength > EXAM_EXPLANATION_LIMIT) {
        errors.push(`${where}: lesson feedback is too long for exact exam transfer (${packedFeedbackLength}/${EXAM_EXPLANATION_LIMIT})`)
      }
    })
  }

  return lengths[0]
}

const questionCount = auditCollection('questions', QUESTION_BANK)
const caseCount = auditCollection('cases', CASE_BANK)

if (errors.length) {
  console.error(`MCQ audit failed with ${errors.length} issue(s):`)
  errors.forEach(error => console.error(`- ${error}`))
  process.exit(1)
}

console.log(`MCQ audit passed: ${questionCount} questions and ${caseCount} cases per language; answers and all option-specific explanations are valid for exact exam transfer.`)
