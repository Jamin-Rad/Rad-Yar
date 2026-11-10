import { MOCK_TESTS, WORD_CHALLENGE, isTypedAnswerCorrect } from './mobinEnglish'

const banks = Object.fromEntries([['word-challenge', WORD_CHALLENGE], ...MOCK_TESTS.map(t => [t.id, t.questions])])
const time = value => Number.isFinite(Date.parse(value)) ? new Date(value).toISOString() : null
export function normalizeEnglishHistory(input) {
  const out = {}
  for (const [mode, questions] of Object.entries(banks)) {
    const value = input?.[mode]
    if (!value || typeof value !== 'object' || Array.isArray(value)) continue
    const entry = { completed: Boolean(value.completed || value.date), best: Math.min(questions.length, Math.max(0, Number(value.best) || 0)), last: Math.min(questions.length, Math.max(0, Number(value.last) || 0)), date: time(value.date), updatedAt: time(value.updatedAt), missedIds: questions.filter(q => Array.isArray(value.missedIds) && value.missedIds.includes(q.id)).map(q => q.id) }
    if (value.run && Array.isArray(value.run.results)) {
      const run = value.run
      const reviewOnly = Boolean(run.reviewOnly)
      const list = reviewOnly ? questions.filter(q => Array.isArray(run.questionIds) && run.questionIds.includes(q.id)) : questions
      const results = []
      for (let i = 0; i < Math.min(run.results.length, list.length); i++) {
        const r = run.results[i], q = list[i]
        if (!r || r.id !== q.id || (mode === 'word-challenge' ? !Number.isInteger(r.chosen) || r.chosen < 0 || r.chosen > 3 : typeof r.chosen !== 'string' || r.chosen.length > 500)) break
        results.push({ id: q.id, chosen: r.chosen, correct: mode === 'word-challenge' ? r.chosen === q.correct : isTypedAnswerCorrect(q, r.chosen) })
      }
      entry.run = { id: typeof run.id === 'string' ? run.id.slice(0, 100) : `legacy-${mode}`, startedAt: time(run.startedAt), results, index: Number.isInteger(run.index) ? Math.max(0, Math.min(run.index, results.length)) : results.length, reviewOnly, questionIds: reviewOnly ? list.map(q => q.id) : [] }
    }
    out[mode] = entry
  }
  return out
}

// A delayed response or stale device cannot rewind the same run. An explicitly
// started newer run can replace it; progress in other test modes is retained.
export function mergeEnglishHistory(left, right) {
  const a = normalizeEnglishHistory(left), b = normalizeEnglishHistory(right), out = {}
  for (const mode of Object.keys(banks)) {
    const x = a[mode], y = b[mode]
    if (!x || !y) { if (x || y) out[mode] = x || y; continue }
    const newer = (y.updatedAt || y.date || '') > (x.updatedAt || x.date || '') ? y : x
    let run = x.run || y.run
    if (x.run && y.run) {
      if (x.run.id === y.run.id) {
        const delta = y.run.results.length - x.run.results.length || y.run.index - x.run.index
        run = delta > 0 ? y.run : delta < 0 ? x.run : newer.run
      } else run = (y.run.startedAt || '') > (x.run.startedAt || '') ? y.run : x.run
    }
    const summary = (y.date || '') === (x.date || '') ? newer : (y.date || '') > (x.date || '') ? y : x
    out[mode] = { ...summary, updatedAt: newer.updatedAt, completed: x.completed || y.completed, best: Math.max(x.best, y.best), ...(run ? { run } : {}) }
  }
  return out
}

export function stampEnglishHistory(previous, updated, now = new Date().toISOString()) {
  const next = normalizeEnglishHistory(updated)
  for (const mode of Object.keys(next)) {
    if (JSON.stringify(previous[mode]) === JSON.stringify(updated[mode])) continue
    next[mode].updatedAt = now
    if (next[mode].run && !updated[mode].run.id) {
      // Keep legacy partial runs compatible across devices during migration.
      next[mode].run.id = previous[mode]?.run?.id || `legacy-${mode}`
    }
  }
  return next
}
