export const MODALITIES = ['Röntgen', 'CT', 'MRT']
export const TARGET_MINUTES = { Röntgen: 3, CT: 10, MRT: 15 }
const berlin = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Berlin', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hourCycle: 'h23' })
export function berlinParts(value) {
  return Object.fromEntries(berlin.formatToParts(new Date(value)).map(part => [part.type, part.value]))
}
export function dateValue(value = Date.now()) {
  const p = berlinParts(value)
  return `${p.year}-${p.month}-${p.day}`
}
export function addDays(value, delta) {
  const date = new Date(`${value}T12:00:00Z`)
  date.setUTCDate(date.getUTCDate() + delta)
  return date.toISOString().slice(0, 10)
}
export function weekDates(value) {
  const weekday = new Date(`${value}T12:00:00Z`).getUTCDay()
  const monday = addDays(value, -((weekday + 6) % 7))
  return Array.from({ length: 7 }, (_, i) => addDays(monday, i))
}
export function dateLabel(value, options = { day: 'numeric', month: 'long' }) {
  return new Date(`${value}T12:00:00Z`).toLocaleDateString('de-DE', { timeZone: 'Europe/Berlin', ...options })
}
export function isNightShift(shift) { return shift?.model === 'N' || /^BD[1-4]$/.test(shift?.duty || '') }
export function serviceDate(nowMs, shifts, timers) {
  const current = dateValue(nowMs)
  if (Number(berlinParts(nowMs).hour) >= 12) return current
  const previous = addDays(current, -1)
  const night = shifts.some(shift => shift.date === previous && isNightShift(shift))
    || timers.some(timer => timer.date === previous && timer.createdAt && !Number.isNaN(new Date(timer.createdAt).getTime()) && Number(berlinParts(timer.createdAt).hour) >= 21)
  return night ? previous : current
}
const SHIFT_LABELS = { T: 'Tagdienst', S: 'Spätdienst', BD: 'Tagdienst WE/Ft', N: 'Nachtdienst', U: 'Urlaub', K: 'Krank', F: 'Fortbildung', TZ: 'Teilzeit' }
export function shiftsForDate(shifts, date) { return shifts.filter(shift => shift.date === date) }
export function shiftLabel(shift) { return SHIFT_LABELS[shift?.model] || (isNightShift(shift) ? 'Nachtdienst' : shift?.duty) || 'Dienst' }
export function shiftShortLabel(shift) { return ({ T: 'Tag', S: 'Spät', BD: 'Tag WE', N: 'Nacht', U: 'Urlaub', K: 'Krank', F: 'Fortb.', TZ: 'Teilzeit' })[shift?.model] || (isNightShift(shift) ? 'Nacht' : shift?.duty) || 'Dienst' }
export function shiftDescription(shift) {
  const times = [shift.plannedStart, shift.plannedEnd].filter(Boolean).join('–')
  return [shiftLabel(shift), times, shift.assignment].filter(Boolean).join(' · ')
}
export function duration(ms) {
  const seconds = Math.max(0, Math.floor(ms / 1000))
  const h = Math.floor(seconds / 3600)
  const m = String(Math.floor(seconds / 60) % 60).padStart(2, '0')
  const s = String(seconds % 60).padStart(2, '0')
  return h ? `${h}:${m}:${s}` : `${m}:${s}`
}
export function totals(timers) {
  let count = 0, totalMs = 0
  for (const timer of timers) { count += Number(timer.count) || 1; totalMs += Number(timer.durationMs) || 0 }
  return { count, totalMs, avg: count ? totalMs / count : 0 }
}
export function historyRecords(timers, { from = '', to = '', modality = '' } = {}) {
  return timers.filter(timer => (!from || timer.date >= from) && (!to || timer.date <= to) && (!modality || timer.modality === modality))
    .sort((a, b) => (b.date || '').localeCompare(a.date || '') || (b.createdAt || '').localeCompare(a.createdAt || '') || a.id.localeCompare(b.id))
}
export function editForm(timer) {
  const seconds = Math.max(0, Math.round(Number(timer.durationMs) / 1000))
  return { date: timer.date, modality: timer.modality, minutes: String(Math.floor(seconds / 60)), seconds: String(seconds % 60), count: String(timer.count || 1) }
}
export function editedTimer(timer, form) {
  const minutes = Number(form.minutes), seconds = Number(form.seconds), count = Number(form.count)
  const actualDate = new Date(`${form.date}T12:00:00Z`)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(form.date) || Number.isNaN(actualDate.getTime()) || actualDate.toISOString().slice(0, 10) !== form.date
    || !MODALITIES.includes(form.modality) || !/^\d+$/.test(form.minutes) || !/^\d+$/.test(form.seconds)
    || !/^\d+$/.test(form.count) || !Number.isSafeInteger(minutes) || minutes < 0 || !Number.isInteger(seconds) || seconds < 0 || seconds > 59
    || !Number.isInteger(count) || count < 1 || count > 20 || minutes * 60 + seconds < 1 || !Number.isSafeInteger((minutes * 60 + seconds) * 1000)) {
    throw new Error('Bitte ein gültiges Datum, eine Dauer ab 1 Sekunde und 1–20 Befunde eingeben. Sekunden: 0–59.')
  }
  return { ...timer, date: form.date, modality: form.modality, count, durationMs: (minutes * 60 + seconds) * 1000 }
}

export function compareDays(timers, dates) {
  const grouped = new Map()
  for (const timer of timers) {
    if (!grouped.has(timer.date)) grouped.set(timer.date, [])
    grouped.get(timer.date).push(timer)
  }
  return (dates || [...grouped.keys()].sort().reverse()).map(date => {
    const records = grouped.get(date) || []
    return { date, ...totals(records), modalities: MODALITIES.map(modality => ({ modality, ...totals(records.filter(timer => timer.modality === modality)) })) }
  })
}
