// Presentation flags and reviewed ID mappings only. No lesson or question copy.
// A future lesson opts in here and wraps its existing live content in BookView.
export const BOOK_VIEW_PILOTS = new Set(['caa'])
export const BOOK_QUESTION_MAPPINGS = {
  caa: {
    grundlagen: ['caa-01'], // Lobar distribution / affected vessels.
    klinik: ['caa-04'], // Existing TFNE clinical question.
    'mrt-diagnostik': ['caa-02', 'caa-03', 'caa-05'], // Boston, cSS, PVS.
    differenzial: ['caa-16', 'caa-17'], // Existing RCVS / cavernoma cases.
  },
}
export function questionIdsForSection(lessonId, sectionId, lang) {
  if (!BOOK_VIEW_PILOTS.has(lessonId)) return []
  return (BOOK_QUESTION_MAPPINGS[lessonId]?.[sectionId] || []).map(id => `${lessonId}-${lang}-${id}`)
}
