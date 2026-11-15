import { rounds } from './questions'

export const modes = Object.keys(rounds)
export const resultsKey = 'mobin-latin-endungen-results-v1'
export const draftKey = (mode) => 'mobin-latin-endungen-draft-v1:' + mode

const uuid = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i
const record = (value) => value && typeof value === 'object' && !Array.isArray(value)
const validTime = (value) => Number.isSafeInteger(value) && value >= 0 && value <= 8.64e15
const validIndex = (index, total) => Number.isInteger(index) && index >= 0 && index < total

export function validResult(result) {
  if (!record(result) || !modes.includes(result.mode) || rounds[result.mode].kind === 'training'
    || typeof result.id !== 'string' || !uuid.test(result.id) || !validTime(result.date)) return false
  const total = rounds[result.mode].questions.length
  const unanswered = result.unanswered ?? 0
  return Array.isArray(result.mistakes) && new Set(result.mistakes).size === result.mistakes.length
    && result.mistakes.every((index) => validIndex(index, total))
    && Number.isInteger(unanswered) && unanswered >= 0 && unanswered + result.mistakes.length <= total
}

export function validDraft(mode, entry) {
  if (!modes.includes(mode) || !record(entry) || !validTime(entry.modifiedAt)) return false
  if (entry.draft === null) return true
  const draft = entry.draft
  const total = rounds[mode].questions.length
  const validKey = (key) => /^\d+$/.test(key) && validIndex(Number(key), total)
  return record(draft) && validIndex(draft.index, total) && record(draft.answers) && record(draft.checked)
    && Object.entries(draft.answers).every(([key, value]) => validKey(key) && typeof value === 'string' && value.length <= 240)
    && Object.entries(draft.checked).every(([key, value]) => validKey(key) && value === true && draft.answers[key]?.trim())
}
