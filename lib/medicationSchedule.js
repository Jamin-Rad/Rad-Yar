export const ROUTINE_OPTIONS = [
  { value: 'fasting', label: 'ناشتا، صبح زود', shortLabel: 'ناشتا', defaultTime: '06:30', toleranceMinutes: 60 },
  { value: 'breakfast', label: 'همراه صبحانه', shortLabel: 'صبحانه', defaultTime: '08:00', toleranceMinutes: 90 },
  { value: 'lunch', label: 'همراه ناهار', shortLabel: 'ناهار', defaultTime: '13:00', toleranceMinutes: 90 },
  { value: 'dinner', label: 'همراه شام', shortLabel: 'شام', defaultTime: '20:00', toleranceMinutes: 90 },
]

export const ROUTINE_BY_VALUE = Object.fromEntries(ROUTINE_OPTIONS.map(option => [option.value, option]))

export function isValidScheduleTime(value) {
  return typeof value === 'string' && /^([01]\d|2[0-3]):[0-5]\d$/.test(value)
}

export function legacyScheduleId(time, index = 0) {
  return `legacy-${String(time || '0800').replace(':', '')}-${index}`
}

export function normalizeMedicationSchedules(medicine) {
  const source = Array.isArray(medicine?.schedules) && medicine.schedules.length
    ? medicine.schedules
    : (Array.isArray(medicine?.times) ? medicine.times : ['08:00']).map((time, index) => ({
      id: legacyScheduleId(time, index),
      type: 'exact',
      time,
    }))

  return source.slice(0, 8).map((schedule, index) => {
    const type = schedule?.type === 'routine' ? 'routine' : 'exact'
    const routine = ROUTINE_BY_VALUE[schedule?.routine] ? schedule.routine : 'breakfast'
    const fallbackTime = type === 'routine' ? ROUTINE_BY_VALUE[routine].defaultTime : '08:00'
    const time = isValidScheduleTime(schedule?.time) ? schedule.time : fallbackTime
    return {
      id: typeof schedule?.id === 'string' && schedule.id.trim()
        ? schedule.id.trim().slice(0, 80)
        : legacyScheduleId(time, index),
      type,
      routine: type === 'routine' ? routine : '',
      time,
    }
  })
}

export function scheduleToleranceMinutes(schedule) {
  if (schedule?.type !== 'routine') return 45
  return ROUTINE_BY_VALUE[schedule.routine]?.toleranceMinutes || 90
}

export function timeToMinutes(value) {
  if (!isValidScheduleTime(value)) return null
  const [hour, minute] = value.split(':').map(Number)
  return (hour * 60) + minute
}

export function evaluateTimingByLocalTime(schedule, actualTime) {
  const scheduledMinutes = timeToMinutes(schedule?.time)
  const actualMinutes = timeToMinutes(actualTime)
  if (scheduledMinutes === null || actualMinutes === null) {
    return { timingStatus: 'unknown', timingDeltaMinutes: null }
  }

  let delta = actualMinutes - scheduledMinutes
  if (delta > 720) delta -= 1440
  if (delta < -720) delta += 1440

  const tolerance = scheduleToleranceMinutes(schedule)
  const timingStatus = Math.abs(delta) <= tolerance ? 'onTime' : delta < 0 ? 'early' : 'late'
  return { timingStatus, timingDeltaMinutes: delta }
}

export function scheduleLogKey(date, medicineId, schedule) {
  return `${date}:${medicineId}:${schedule.id}`
}

export function legacyDoseLogKey(date, medicineId, schedule) {
  return `${date}:${medicineId}:${schedule.time}`
}
