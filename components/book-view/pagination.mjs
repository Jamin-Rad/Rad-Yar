// Geometry is independent of lesson IDs, languages and content length.
export function pageForRect(rect, origin, stride, rtl = false) {
  if (!(stride > 0)) return 0
  return Math.max(0, Math.floor(((rtl ? origin.right - rect.right : rect.left - origin.left) + 1) / stride))
}
export function spreadStart(page, spread, total) {
  const last = Math.max(0, Math.ceil(total / spread) - 1) * spread
  return Math.min(last, Math.max(0, Math.floor(page / spread) * spread))
}
export function mappedQuestions(questions, ids, limit = 3) {
  if (!Array.isArray(ids) || !Array.isArray(questions)) return []
  const byId = new Map(questions.map(question => [question.id, question]))
  return [...new Set(ids)].map(id => byId.get(id)).filter(question => question
    && typeof question.question === 'string' && question.options?.length
    && question.options.some(option => option.id === question.correct)
    && typeof question.explanation === 'string').slice(0, Math.min(3, Math.max(0, limit)))
}
