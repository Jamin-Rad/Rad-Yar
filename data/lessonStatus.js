import { CURRICULUM } from './curriculum'

const NON_LESSON_PATH_PREFIXES = [
  '/mamma/rechner',
  '/mamma/bildgebung/mrt/kaiser-score',
]

const COMPLETED_LESSON_PATHS = new Set([
  '/mamma/bildgebung/mammographie/verkalkungen',
  '/msk/knie/meniskus',
  '/thorax/kardio/myokardinfarkt-differentialdiagnosen',
])

function normalizePathname(pathname) {
  if (!pathname || pathname === '/') return pathname || ''
  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
}

export function isLessonInProgress(pathname) {
  return getLessonStatus(pathname) === 'in_progress'
}

function addTopic(statusByPath, topic) {
  if (topic?.link) {
    const pathname = normalizePathname(topic.link.split('?')[0])
    const nextStatus = COMPLETED_LESSON_PATHS.has(pathname) ? 'complete' : 'in_progress'
    // If the same page occurs more than once, the cautious status wins.
    if (statusByPath.get(pathname) !== 'in_progress') statusByPath.set(pathname, nextStatus)
  }
  for (const subtopic of topic?.sub || []) addTopic(statusByPath, subtopic)
}

const lessonStatusByPath = new Map()
for (const fach of CURRICULUM) {
  for (const kapitel of fach.kapitel || []) {
    for (const topic of kapitel.themen || []) addTopic(lessonStatusByPath, topic)
  }
}

export function getContentStatus(topic) {
  const hasPage = !!topic?.link || !!topic?.sub?.some(subtopic => subtopic.link)
  if (!hasPage) return 'planned'
  if (topic?.link) {
    return COMPLETED_LESSON_PATHS.has(normalizePathname(topic.link.split('?')[0])) ? 'complete' : 'in_progress'
  }
  if (topic?.sub?.length) {
    const availableSubtopics = topic.sub.filter(subtopic => subtopic.link)
    if (
      availableSubtopics.length &&
      availableSubtopics.every(subtopic => (
        COMPLETED_LESSON_PATHS.has(normalizePathname(subtopic.link.split('?')[0]))
      ))
    ) return 'complete'
  }
  return 'in_progress'
}

export function getLessonStatus(pathname) {
  const normalizedPathname = normalizePathname(pathname)
  const isNonLesson = NON_LESSON_PATH_PREFIXES.some(prefix => (
    normalizedPathname === prefix || normalizedPathname.startsWith(`${prefix}/`)
  ))
  if (isNonLesson) return 'public'
  // Topic-local quizzes are Pro training surfaces, not unfinished lesson pages.
  if (normalizedPathname.endsWith('/mcq')) return 'complete'
  return lessonStatusByPath.get(normalizedPathname) || 'in_progress'
}

export function normalizeLessonPath(pathname) {
  return normalizePathname(pathname)
}
