export const ROUTINE_LIMITS = {
  malen: 2, anton: 2, sport: 1, fernsehen: 6, lesen: 2, schach: 2,
  tablet: 3, basteln: 2, vorschulbuch: 2, spielzeuge: 2,
}

const uuid = '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}'
export const validId = new RegExp('^' + uuid + '$', 'i')
const version = new RegExp('^(?:' + uuid + '/)?' + uuid + '$', 'i')
export const validDay = day => typeof day === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(day)
export const slot = ({ routine, index }) => routine + ':' + index

export function validStep(step) {
  return step && validDay(step.day) && Object.hasOwn(ROUTINE_LIMITS, step.routine) &&
    Number.isInteger(step.index) && step.index >= 0 && step.index < ROUTINE_LIMITS[step.routine] &&
    typeof step.checked === 'boolean' && typeof step.id === 'string' && validId.test(step.id) &&
    (step.base === null || (typeof step.base === 'string' && version.test(step.base)))
}

export function sanitizeLogs(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  return Object.fromEntries(Object.keys(value).filter(validDay).sort().slice(-730).map(day => [
    day, Object.fromEntries(Object.entries(ROUTINE_LIMITS).map(([routine, count]) => [
      routine, Array.from({ length: count }, (_, index) => Boolean(value[day]?.[routine]?.[index])),
    ])),
  ]))
}

export function withStep(state, step, checked, version) {
  const { day, routine, index } = step
  const daily = state.logs[day]
  const bits = Array.from({ length: ROUTINE_LIMITS[routine] }, (_, i) => i === index ? checked : Boolean(daily?.[routine]?.[i]))
  return {
    logs: { ...state.logs, [day]: { ...daily, [routine]: bits } },
    versions: { ...state.versions, [day]: { ...state.versions[day], [slot(step)]: version } },
  }
}
