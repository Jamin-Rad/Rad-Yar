export function canonicalAssessmentId(id) {
  return typeof id === 'string' ? id.replace(/-(?:en|fa)(?=-|$)/, '-de') : id
}
