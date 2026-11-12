import { berlinStudyDay } from './mobinStudyTime.js'

const timeFormat = new Intl.DateTimeFormat('de-DE', { timeZone: 'Europe/Berlin', hour: '2-digit', minute: '2-digit' })

function dateTime(value) {
  const match = /^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})\d{2}(Z)?)?$/.exec(value || '')
  if (!match) return null
  const [, year, month, day, hours, minutes, utc] = match
  const date = year + '-' + month + '-' + day
  if (!hours) return { day: date, time: '' }
  if (!utc) return { day: date, time: hours + ':' + minutes }
  const instant = new Date(date + 'T' + hours + ':' + minutes + ':00Z')
  return Number.isNaN(+instant) ? null : { day: berlinStudyDay(instant), time: timeFormat.format(instant) }
}

export function parseUntisCalendar(raw) {
  if (!raw.trimStart().startsWith('BEGIN:VCALENDAR')) throw new Error('Ungültiger iCal-Kalender.')
  const rows = raw.replace(/\r?\n[ \t]/g, '').split(/\r?\n/)
  const events = []
  let fields = null
  for (const line of rows) {
    if (line === 'BEGIN:VEVENT') { fields = {}; continue }
    if (!fields) continue
    if (line === 'END:VEVENT') {
      const start = dateTime(fields.DTSTART)
      const end = dateTime(fields.DTEND)
      const title = (fields.SUMMARY || 'Unterricht').replace(/\\[nN]/g, ' ').replace(/\\([,;\\])/g, '$1').slice(0, 160)
      if (start) events.push({ ...start, end: end?.time || '', title, cancelled: fields.STATUS === 'CANCELLED' })
      fields = null
      if (events.length >= 1500) break
    } else {
      const index = line.indexOf(':')
      if (index >= 0) fields[line.slice(0, index).split(';')[0]] = line.slice(index + 1)
    }
  }
  return events.sort((a, b) => (a.day + a.time).localeCompare(b.day + b.time))
}
