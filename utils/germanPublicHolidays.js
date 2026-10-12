const DAY_MS = 24 * 60 * 60 * 1000

function dateValue(year, month, day) {
  return new Date(Date.UTC(year, month - 1, day)).toISOString().slice(0, 10)
}

function shiftDate(date, days) {
  return new Date(Date.parse(`${date}T00:00:00Z`) + days * DAY_MS).toISOString().slice(0, 10)
}

function easterSunday(year) {
  const a = year % 19
  const b = Math.floor(year / 100)
  const c = year % 100
  const d = Math.floor(b / 4)
  const e = b % 4
  const f = Math.floor((b + 8) / 25)
  const g = Math.floor((b - f + 1) / 3)
  const h = (19 * a + b - d - g + 15) % 30
  const i = Math.floor(c / 4)
  const k = c % 4
  const l = (32 + 2 * e + 2 * i - h - k) % 7
  const m = Math.floor((a + 11 * h + 22 * l) / 451)
  const month = Math.floor((h + l - 7 * m + 114) / 31)
  const day = ((h + l - 7 * m + 114) % 31) + 1
  return dateValue(year, month, day)
}

function holiday(id, title, date) {
  return {
    id: `german-public-holiday-${date}-${id}`,
    title,
    date,
    startTime: '',
    endDate: date,
    endTime: '',
    allDay: true,
    note: 'Bundesweiter gesetzlicher Feiertag in Deutschland',
    itemType: 'holiday',
    readOnly: true,
  }
}

function stateHoliday(id, title, date) {
  return {
    ...holiday(id, title, date),
    id: `baden-wuerttemberg-public-holiday-${date}-${id}`,
    note: 'Gesetzlicher Feiertag in Baden-Württemberg',
    region: 'Baden-Württemberg',
  }
}

function schoolHoliday(id, title, date, endDate = date) {
  return {
    id: `baden-wuerttemberg-school-holiday-${date}-${id}`,
    title,
    date,
    startTime: '',
    endDate,
    endTime: '',
    allDay: true,
    note: 'Landesweit veröffentlichte Schulferien in Baden-Württemberg',
    itemType: 'schoolHoliday',
    readOnly: true,
    region: 'Baden-Württemberg',
  }
}

// Source: Kultusministerium Baden-Württemberg, reviewed 2026-10-12.
// School-specific bewegliche Ferientage are intentionally excluded.
const BADEN_WUERTTEMBERG_SCHOOL_HOLIDAYS = [
  schoolHoliday('summer-2026', 'Sommerferien', '2026-07-30', '2026-09-12'),
  schoolHoliday('autumn-2026', 'Herbstferien', '2026-10-26', '2026-10-30'),
  schoolHoliday('reformation-2026', 'Reformationsfest · schulfrei', '2026-10-31'),
  schoolHoliday('christmas-2026', 'Weihnachtsferien', '2026-12-23', '2027-01-09'),
  schoolHoliday('maundy-thursday-2027', 'Gründonnerstag · schulfrei', '2027-03-25'),
  schoolHoliday('easter-2027', 'Osterferien', '2027-03-30', '2027-04-03'),
  schoolHoliday('pentecost-2027', 'Pfingstferien', '2027-05-18', '2027-05-29'),
  schoolHoliday('summer-2027', 'Sommerferien', '2027-07-29', '2027-09-11'),
  schoolHoliday('autumn-2027', 'Herbstferien', '2027-11-02', '2027-11-06'),
  schoolHoliday('christmas-2027', 'Weihnachtsferien', '2027-12-23', '2028-01-08'),
  schoolHoliday('maundy-thursday-2028', 'Gründonnerstag · schulfrei', '2028-04-13'),
  schoolHoliday('easter-2028', 'Osterferien', '2028-04-18', '2028-04-22'),
  schoolHoliday('pentecost-2028', 'Pfingstferien', '2028-06-06', '2028-06-17'),
  schoolHoliday('summer-2028', 'Sommerferien', '2028-07-27', '2028-09-09'),
  schoolHoliday('autumn-2028', 'Herbstferien', '2028-10-30', '2028-11-03'),
  schoolHoliday('christmas-2028', 'Weihnachtsferien', '2028-12-23', '2029-01-05'),
  schoolHoliday('easter-2029', 'Osterferien', '2029-03-26', '2029-04-07'),
  schoolHoliday('pentecost-2029', 'Pfingstferien', '2029-05-22', '2029-06-01'),
  schoolHoliday('summer-2029', 'Sommerferien', '2029-07-26', '2029-09-08'),
  schoolHoliday('autumn-2029', 'Herbstferien', '2029-10-29', '2029-11-02'),
  schoolHoliday('christmas-2029', 'Weihnachtsferien', '2029-12-22', '2030-01-05'),
  schoolHoliday('easter-2030', 'Osterferien', '2030-04-15', '2030-04-26'),
  schoolHoliday('pentecost-2030', 'Pfingstferien', '2030-06-11', '2030-06-21'),
  schoolHoliday('summer-2030', 'Sommerferien', '2030-07-25', '2030-09-07'),
]

export function getGermanPublicHolidays(year) {
  const normalizedYear = Number(year)
  if (!Number.isInteger(normalizedYear) || normalizedYear < 1583 || normalizedYear > 9999) return []

  const easter = easterSunday(normalizedYear)
  return [
    holiday('new-year', 'Neujahr', dateValue(normalizedYear, 1, 1)),
    holiday('good-friday', 'Karfreitag', shiftDate(easter, -2)),
    holiday('easter-monday', 'Ostermontag', shiftDate(easter, 1)),
    holiday('labour-day', 'Tag der Arbeit', dateValue(normalizedYear, 5, 1)),
    holiday('ascension-day', 'Christi Himmelfahrt', shiftDate(easter, 39)),
    holiday('whit-monday', 'Pfingstmontag', shiftDate(easter, 50)),
    holiday('german-unity', 'Tag der Deutschen Einheit', dateValue(normalizedYear, 10, 3)),
    holiday('christmas-day', '1. Weihnachtstag', dateValue(normalizedYear, 12, 25)),
    holiday('boxing-day', '2. Weihnachtstag', dateValue(normalizedYear, 12, 26)),
  ].sort((left, right) => left.date.localeCompare(right.date))
}

export function getBadenWuerttembergPublicHolidays(year) {
  const normalizedYear = Number(year)
  if (!Number.isInteger(normalizedYear) || normalizedYear < 1583 || normalizedYear > 9999) return []

  const easter = easterSunday(normalizedYear)
  return [
    ...getGermanPublicHolidays(normalizedYear),
    stateHoliday('epiphany', 'Heilige Drei Könige', dateValue(normalizedYear, 1, 6)),
    stateHoliday('corpus-christi', 'Fronleichnam', shiftDate(easter, 60)),
    stateHoliday('all-saints', 'Allerheiligen', dateValue(normalizedYear, 11, 1)),
  ].sort((left, right) => left.date.localeCompare(right.date))
}

export function getGermanPublicHolidaysInRange(from, to) {
  const startYear = Number(String(from).slice(0, 4))
  const endYear = Number(String(to).slice(0, 4))
  if (!Number.isInteger(startYear) || !Number.isInteger(endYear) || endYear < startYear) return []

  const holidays = []
  for (let year = startYear; year <= endYear; year += 1) {
    holidays.push(...getGermanPublicHolidays(year))
  }
  return holidays.filter(item => item.date >= from && item.date <= to)
}

export function getBadenWuerttembergSchoolHolidaysInRange(from, to) {
  return BADEN_WUERTTEMBERG_SCHOOL_HOLIDAYS
    .filter(item => item.endDate >= from && item.date <= to)
    .map(item => ({ ...item }))
}

export function getBadenWuerttembergCalendarEntriesInRange(from, to) {
  const startYear = Number(String(from).slice(0, 4))
  const endYear = Number(String(to).slice(0, 4))
  if (!Number.isInteger(startYear) || !Number.isInteger(endYear) || endYear < startYear) return []

  const entries = []
  for (let year = startYear; year <= endYear; year += 1) {
    entries.push(...getBadenWuerttembergPublicHolidays(year).filter(item => item.date >= from && item.date <= to))
  }
  entries.push(...getBadenWuerttembergSchoolHolidaysInRange(from, to))
  return entries.sort((left, right) => left.date.localeCompare(right.date) || left.title.localeCompare(right.title))
}
