const BERLIN_DAY = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Europe/Berlin', year: 'numeric', month: '2-digit', day: '2-digit',
})

export function berlinDay(value = new Date()) {
  const date = new Date(value)
  if (!Number.isFinite(date.getTime())) return null
  const parts = Object.fromEntries(BERLIN_DAY.formatToParts(date).map(part => [part.type, part.value]))
  return `${parts.year}-${parts.month}-${parts.day}`
}

export function shiftDay(day, offset) {
  const date = new Date(`${day}T12:00:00Z`)
  date.setUTCDate(date.getUTCDate() + offset)
  return date.toISOString().slice(0, 10)
}

function validDay(day) {
  return typeof day === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(day)
    && Number.isFinite(Date.parse(`${day}T12:00:00Z`))
    && new Date(`${day}T12:00:00Z`).toISOString().slice(0, 10) === day
}

export function practiceDays(state) {
  const days = new Set((Array.isArray(state?.practiceDays) ? state.practiceDays : []).filter(validDay))
  for (const attempt of Object.values(state?.attempts || {})) {
    for (const item of Array.isArray(attempt?.history) ? attempt.history : []) {
      if (!item?.at || item.mode === 'teaching') continue
      const day = berlinDay(item.at)
      if (day) days.add(day)
    }
    if (attempt?.lastAnsweredAt) {
      const day = berlinDay(attempt.lastAnsweredAt)
      if (day) days.add(day)
    }
  }
  return [...days].sort()
}

export function streakSummary(state, now = new Date()) {
  const today = berlinDay(now)
  const days = practiceDays(state).filter(day => day <= today)
  const practiced = new Set(days)
  let current = 0
  let cursor = practiced.has(today) ? today : shiftDay(today, -1)
  while (practiced.has(cursor)) {
    current += 1
    cursor = shiftDay(cursor, -1)
  }
  let best = 0
  let run = 0
  days.forEach((day, index) => {
    run = index && day === shiftDay(days[index - 1], 1) ? run + 1 : 1
    best = Math.max(best, run)
  })
  const week = Array.from({ length: 7 }, (_, index) => {
    const day = shiftDay(today, index - 6)
    return { day, active: practiced.has(day), today: day === today }
  })
  return { current, best, total: days.length, practicedToday: practiced.has(today), week }
}
