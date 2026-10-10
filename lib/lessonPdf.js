export const LESSON_PDF_EXPORT_EVENT = 'radyar:lesson-pdf-export'
export const LESSON_PDF_STATE_EVENT = 'radyar:lesson-pdf-state'
export const LESSON_PDF_STATE_REQUEST_EVENT = 'radyar:lesson-pdf-state-request'

const LESSON_PREFIXES = [
  '/abdomen/', '/gehirn/', '/lunge/', '/mamma/bildgebung/',
  '/msk/', '/technik/', '/thorax/', '/wirbelsaeule/',
]

export function isLessonPdfPath(pathname) {
  if (!pathname || pathname.includes('/rechner') || pathname.endsWith('/mcq')) return false
  return LESSON_PREFIXES.some(prefix => pathname.startsWith(prefix))
}
