// Resolve the actual selected option, retaining legacy checks with one rationale.
export function lessonCheckFeedback(check, picked) {
  if (picked === null || picked === undefined) return null
  if (check.optionFeedback?.[picked] != null) return check.optionFeedback[picked]
  if (picked === check.answer) return check.explanation
  return check.wrongFeedback?.[picked]
    ?? check.wrongExplanations?.[String.fromCharCode(65 + picked)]
    ?? check.explanation
}
