const DATE_VALUE = /^\d{8}$/
const DATE_TIME_VALUE = /^(\d{8})T(\d{4})(\d{2})?Z?$/

function unescapeText(value = '') {
  return value
    .replace(/\\n/gi, '\n')
    .replace(/\\,/g, ',')
    .replace(/\\;/g, ';')
    .replace(/\\\\/g, '\\')
    .trim()
}

function isoDate(compact) {
  return `${compact.slice(0, 4)}-${compact.slice(4, 6)}-${compact.slice(6, 8)}`
}

function berlinParts(date) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Berlin',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)
  return Object.fromEntries(parts.map(part => [part.type, part.value]))
}

function parseDateValue(property, value) {
  if (DATE_VALUE.test(value)) return { date: isoDate(value), time: '', allDay: true }

  const match = value.match(DATE_TIME_VALUE)
  if (!match) return null
  if (value.endsWith('Z')) {
    const parsed = new Date(`${isoDate(match[1])}T${match[2].slice(0, 2)}:${match[2].slice(2)}:${match[3] || '00'}Z`)
    if (Number.isNaN(parsed.getTime())) return null
    const parts = berlinParts(parsed)
    return { date: `${parts.year}-${parts.month}-${parts.day}`, time: `${parts.hour}:${parts.minute}`, allDay: false }
  }

  return {
    date: isoDate(match[1]),
    time: `${match[2].slice(0, 2)}:${match[2].slice(2)}`,
    allDay: /VALUE=DATE(?:;|$)/i.test(property),
  }
}

function previousDate(value) {
  const date = new Date(`${value}T12:00:00Z`)
  date.setUTCDate(date.getUTCDate() - 1)
  return date.toISOString().slice(0, 10)
}

function unfoldLines(source) {
  return source.replace(/\r\n/g, '\n').replace(/\r/g, '\n').replace(/\n[ \t]/g, '').split('\n')
}

function propertyMap(lines) {
  const map = new Map()
  for (const line of lines) {
    const separator = line.indexOf(':')
    if (separator < 0) continue
    const property = line.slice(0, separator)
    const name = property.split(';')[0].toUpperCase()
    if (!map.has(name)) map.set(name, { property, value: line.slice(separator + 1) })
  }
  return map
}

export function parseIcsEvents(source) {
  if (typeof source !== 'string' || !source.includes('BEGIN:VCALENDAR')) {
    throw new Error('Die Datei ist kein gültiger iCalendar-Kalender.')
  }

  const events = []
  let current = null
  for (const line of unfoldLines(source)) {
    if (line.trim().toUpperCase() === 'BEGIN:VEVENT') {
      current = []
      continue
    }
    if (line.trim().toUpperCase() === 'END:VEVENT') {
      if (current) {
        const fields = propertyMap(current)
        const startField = fields.get('DTSTART')
        const endField = fields.get('DTEND')
        const start = startField ? parseDateValue(startField.property, startField.value) : null
        const end = endField ? parseDateValue(endField.property, endField.value) : null
        const title = unescapeText(fields.get('SUMMARY')?.value || '')

        if (start && title) {
          const allDay = start.allDay
          events.push({
            title,
            note: unescapeText(fields.get('DESCRIPTION')?.value || ''),
            location: unescapeText(fields.get('LOCATION')?.value || ''),
            deadline: start.date,
            eventTime: allDay ? '' : start.time,
            endDate: allDay ? (end?.date ? previousDate(end.date) : start.date) : '',
            endTime: allDay ? '' : end?.time || '',
            allDay,
            itemType: 'event',
          })
        }
      }
      current = null
      continue
    }
    if (current) current.push(line)
  }

  if (!events.length) throw new Error('In dieser Datei wurde kein importierbarer Termin gefunden.')
  return events
}
