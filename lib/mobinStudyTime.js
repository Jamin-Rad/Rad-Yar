export const STUDY_STORAGE_KEY = 'mobin_study_sessions_v1'
export const STUDY_SECTIONS = {
  english: 'English',
  math: 'Matheprüfung',
  kangaroo: 'Känguru',
  preparation: 'Prüfungsvorbereitung',
}

export function studySectionFromPath(pathname = '') {
  if (typeof pathname !== 'string') return null
  if (pathname.startsWith('/mobin/english')) return 'english'
  if (pathname.startsWith('/mobin/mathepruefung')) return 'math'
  if (pathname.startsWith('/mobin/kaenguru')) return 'kangaroo'
  if (pathname.startsWith('/mobin/pruefungsvorbereitung')) return 'preparation'
  return null
}

export function berlinStudyDay(date = new Date()) {
  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Berlin', year: 'numeric', month: '2-digit', day: '2-digit' }).format(date)
}

export function validStudySession(value) {
  return Boolean(value && typeof value.id === 'string' && /^study-time:\d{4}-\d{2}-\d{2}:[0-9a-f-]{36}$/.test(value.id)
    && STUDY_SECTIONS[value.section] && /^\d{4}-\d{2}-\d{2}$/.test(value.day)
    && value.id.startsWith(`study-time:${value.day}:`)
    && Number.isInteger(value.seconds) && value.seconds >= 0 && value.seconds <= 86400)
}

export function mergeStudySessions(remote = [], local = []) {
  const byId = new Map()
  for (const session of [...remote, ...local]) {
    if (!validStudySession(session)) continue
    const old = byId.get(session.id)
    if (!old || session.seconds > old.seconds) byId.set(session.id, session)
  }
  return [...byId.values()]
}

export function studySummary(sessions, days) {
  const totals = Object.fromEntries(days.map(day => [day, { total: 0, sections: Object.fromEntries(Object.keys(STUDY_SECTIONS).map(section => [section, 0])) }]))
  for (const session of mergeStudySessions(sessions)) {
    const day = totals[session.day]
    if (!day) continue
    day.total += session.seconds
    day.sections[session.section] += session.seconds
  }
  return totals
}

export function readLocalStudySessions() {
  try {
    const data = JSON.parse(localStorage.getItem(STUDY_STORAGE_KEY) || '[]')
    return Array.isArray(data) ? data.filter(validStudySession) : []
  } catch { return [] }
}

export function saveLocalStudySession(session) {
  if (!validStudySession(session)) return
  try {
    const sessions = mergeStudySessions(readLocalStudySessions(), [session])
      .filter(item => item.day >= berlinStudyDay(new Date(Date.now() - 90 * 86400000)))
    localStorage.setItem(STUDY_STORAGE_KEY, JSON.stringify(sessions))
    window.dispatchEvent(new Event('mobin-study-time'))
  } catch { /* Private mode can disable browser storage. */ }
}
