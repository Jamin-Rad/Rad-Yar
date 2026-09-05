// Sobald eine Lektion fertig und fachlich freigegeben ist, ihren Pfad hier
// eintragen. Alle anderen Lektionen gelten automatisch als „in Bearbeitung“.
export const READY_LESSON_PATHS = [
  // Beispiel: '/gehirn/vaskulaer/isch-aemischer-schlaganfall',
]

const readyLessonPaths = new Set(READY_LESSON_PATHS)
const NON_LESSON_PATH_PREFIXES = ['/mamma/rechner']

function normalizePathname(pathname) {
  if (!pathname || pathname === '/') return pathname || ''
  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
}

export function isLessonInProgress(pathname) {
  const normalizedPathname = normalizePathname(pathname)
  const isNonLesson = NON_LESSON_PATH_PREFIXES.some(prefix => (
    normalizedPathname === prefix || normalizedPathname.startsWith(`${prefix}/`)
  ))

  return !isNonLesson && !readyLessonPaths.has(normalizedPathname)
}
