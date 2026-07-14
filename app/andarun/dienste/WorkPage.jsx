'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import styles from './page.module.css'

const NAME = 'Hamed Zia'
const WEEKDAYS_LONG = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']
const MONTHS = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']
const MODALITIES = ['Röntgen', 'CT', 'MRT']
const CASE_TYPES = [
  { id: 'case', label: 'Relevante Fälle' },
  { id: 'question', label: 'Verlaufskontrolle & Fragen' },
]
const AREA_OPTIONS = {
  CT: ['Schädel', 'HWS', 'Thorax', 'Abdomen', 'BBA', 'Obere Extremität', 'Untere Extremität'],
  Röntgen: [
    'Thorax', 'Abdomen', 'Becken', 'HWS', 'BWS', 'LWS', 'Schulter', 'Clavicula',
    'Oberarm', 'Ellenbogen', 'Unterarm', 'Handgelenk', 'Hand', 'Finger',
    'Hüfte', 'Oberschenkel', 'Knie', 'Unterschenkel', 'OSG', 'Fuß', 'Zehen',
  ],
  MRT: [
    'Kopf', 'Wirbelsäule', 'Herz', 'Prostata', 'Mamma', 'Oberbauch', 'Becken',
    'Sellink', 'Knie', 'Schulter', 'Hand', 'Ellenbogen', 'OSG', 'Sonstiges',
  ],
}
const DAILY_MODALITIES = [
  { id: 'Röntgen', label: 'Röntgen' },
  { id: 'CT', label: 'CT' },
  { id: 'MRT', label: 'MRT' },
]
const SHIFT_TYPES = [
  { id: 'T', label: 'Tagdienst', short: 'T' },
  { id: 'S', label: 'Spätdienst', short: 'S' },
  { id: 'BD', label: 'Tagdienst Freitag/WE/Ft', short: 'BD' },
  { id: 'N', label: 'Nachtdienst', short: 'Nacht' },
  { id: 'U', label: 'Urlaub', short: 'Urlaub' },
  { id: 'K', label: 'Krank', short: 'Krank' },
]

function todayValue() {
  return dateValue(new Date())
}

function monthValue(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

function dateValue(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function parseDate(value) {
  return new Date(`${value}T12:00:00`)
}

function daysForMonth(value) {
  const [year, month] = value.split('-').map(Number)
  const first = new Date(year, month - 1, 1)
  const total = new Date(year, month, 0).getDate()
  const leading = (first.getDay() + 6) % 7
  const days = Array.from({ length: total }, (_, index) => {
    const date = new Date(year, month - 1, index + 1)
    return { date: dateValue(date), day: index + 1, weekday: date.getDay(), current: true }
  })
  return [
    ...Array.from({ length: leading }, (_, index) => ({ id: `empty-${index}`, current: false })),
    ...days,
  ]
}

function monthLabel(value) {
  const [year, month] = value.split('-').map(Number)
  return `${MONTHS[month - 1]} ${year}`
}

function addMonths(value, delta) {
  const [year, month] = value.split('-').map(Number)
  return monthValue(new Date(year, month - 1 + delta, 1))
}

function previousDateValue(value) {
  const date = parseDate(value)
  date.setDate(date.getDate() - 1)
  return dateValue(date)
}

function dateRangeValues(startValue, endValue) {
  const start = parseDate(startValue)
  const end = parseDate(endValue || startValue)
  const from = start <= end ? start : end
  const to = start <= end ? end : start
  const values = []
  const cursor = new Date(from)
  while (cursor <= to) {
    values.push(dateValue(cursor))
    cursor.setDate(cursor.getDate() + 1)
  }
  return values
}

function isNightShift(shift) {
  return shift?.model === 'N' || /^BD[1-4]$/.test(shift?.duty || '')
}

function isAbsenceShift(shift) {
  return shift?.model === 'U' || shift?.model === 'K'
}

function calendarDutyLabel(shift) {
  if (shift?.model === 'N') return 'Nacht'
  return shift?.duty || ''
}

function resolveDuty(dateValueText, type) {
  const date = parseDate(dateValueText)
  const weekday = date.getDay()
  if (type === 'T') return { duty: 'T', plannedStart: '07:30', plannedEnd: '16:00' }
  if (type === 'S') return { duty: 'S', plannedStart: '11:00', plannedEnd: '19:30' }
  if (type === 'BD') return { duty: 'BD', plannedStart: '08:30', plannedEnd: '19:30' }
  if (type === 'N') {
    if (weekday >= 1 && weekday <= 4) return { duty: 'BD1', plannedStart: '11:00', plannedEnd: '08:00' }
    if (weekday === 5) return { duty: 'BD2', plannedStart: '11:00', plannedEnd: '09:00' }
    if (weekday === 6) return { duty: 'BD3', plannedStart: '19:00', plannedEnd: '09:00' }
    return { duty: 'BD4', plannedStart: '19:00', plannedEnd: '08:00' }
  }
  if (type === 'U') return { duty: 'Urlaub', plannedStart: '', plannedEnd: '' }
  if (type === 'K') return { duty: 'Krank', plannedStart: '', plannedEnd: '' }
  return { duty: '', plannedStart: '', plannedEnd: '' }
}

function timeRange(start, end) {
  if (!start && !end) return ''
  return `${start || '--:--'}-${end || '--:--'}`
}

async function apiRequest(path, method = 'GET', body) {
  const response = await fetch(`/api/andarun/work${path}`, {
    method,
    cache: 'no-store',
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.error || 'Speichern fehlgeschlagen.')
  return data
}

function emptyShift(date) {
  const resolved = resolveDuty(date, 'T')
  return {
    id: `shift-${date}`,
    date,
    model: 'T',
    ...resolved,
    actualStart: resolved.plannedStart,
    actualEnd: resolved.plannedEnd,
    assignment: '',
    note: '',
  }
}

function shiftId(date, model) {
  return isAbsenceShift({ model }) ? `absence-${model}-${date}` : `shift-${date}`
}

function normalizeShift(shift) {
  if (!shift?.date) return shift
  return {
    ...emptyShift(shift.date),
    ...shift,
    assignment: shift.assignment || '',
  }
}

function findingMatchesFilter(finding, filter) {
  const diagnosisText = `${finding.diagnosis || ''} ${finding.vd || ''}`.toLowerCase()
  const organText = `${finding.organ || ''} ${finding.examArea || ''} ${finding.exam || ''}`.toLowerCase()
  const diagnosisFilter = filter.diagnosis.trim().toLowerCase()
  const organFilter = filter.organ.trim().toLowerCase()
  return (!filter.modality || finding.modality === filter.modality)
    && (!diagnosisFilter || diagnosisText.includes(diagnosisFilter))
    && (!organFilter || organText.includes(organFilter))
}

function filterFindings(items, filter) {
  return items.filter(item => findingMatchesFilter(item, filter))
}

const EMPTY_FINDING = {
  type: 'case',
  examDate: todayValue(),
  name: '',
  birthDate: '',
  modality: 'Röntgen',
  examArea: AREA_OPTIONS['Röntgen'][0],
  exam: AREA_OPTIONS['Röntgen'][0],
  diagnosis: '',
  vd: '',
  organ: '',
  question: '',
  status: 'offen',
}

const EMPTY_FILTER = {
  modality: '',
  diagnosis: '',
  organ: '',
}

export default function WorkPage({ showHomeLink = true, view = 'all' }) {
  const showShifts = view !== 'findings'
  const showFindings = view !== 'shifts'
  const [month, setMonth] = useState(monthValue())
  const [shifts, setShifts] = useState([])
  const [findings, setFindings] = useState([])
  const [selectedDate, setSelectedDate] = useState(todayValue())
  const [shiftForm, setShiftForm] = useState(emptyShift(todayValue()))
  const [rangeEndDate, setRangeEndDate] = useState(todayValue())
  const [findingForm, setFindingForm] = useState(EMPTY_FINDING)
  const [caseFilter, setCaseFilter] = useState(EMPTY_FILTER)
  const [questionFilter, setQuestionFilter] = useState(EMPTY_FILTER)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAll()
  }, [])

  const shiftsByDate = useMemo(
    () => new Map(shifts.filter(shift => !isAbsenceShift(shift)).map(shift => [shift.date, shift])),
    [shifts],
  )
  const absencesByDate = useMemo(() => {
    const grouped = new Map()
    shifts.filter(isAbsenceShift).forEach(absence => {
      grouped.set(absence.date, [...(grouped.get(absence.date) || []), absence])
    })
    return grouped
  }, [shifts])
  const monthDays = useMemo(() => daysForMonth(month), [month])
  const monthShifts = useMemo(
    () => shifts.filter(shift => shift.date?.startsWith(month)).sort((a, b) => a.date.localeCompare(b.date)),
    [shifts, month],
  )
  const normalizedFindings = useMemo(
    () => findings.map(finding => ({ type: 'case', diagnosis: '', name: '', ...finding })),
    [findings],
  )
  const relevantCases = useMemo(
    () => filterFindings(normalizedFindings.filter(finding => finding.type !== 'question'), caseFilter),
    [normalizedFindings, caseFilter],
  )
  const followupQuestions = useMemo(
    () => filterFindings(normalizedFindings.filter(finding => finding.type === 'question'), questionFilter),
    [normalizedFindings, questionFilter],
  )

  async function loadAll() {
    setLoading(true)
    try {
      const data = await apiRequest('/')
      const loadedShifts = (data.shifts || []).map(normalizeShift)
      setShifts(loadedShifts)
      setFindings(data.findings || [])
      const existing = loadedShifts.find(item => item.date === selectedDate && !isAbsenceShift(item))
        || loadedShifts.find(item => item.date === selectedDate)
      setShiftForm(existing || emptyShift(selectedDate))
      setMessage('')
    } catch (error) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  function selectDate(date) {
    setSelectedDate(date)
    setRangeEndDate(date)
    const existing = shiftsByDate.get(date) || absencesByDate.get(date)?.[0]
    setShiftForm(existing ? normalizeShift(existing) : emptyShift(date))
  }

  function updateShiftModel(model) {
    const resolved = resolveDuty(shiftForm.date, model)
    const existing = isAbsenceShift({ model })
      ? absencesByDate.get(shiftForm.date)?.find(item => item.model === model)
      : shiftsByDate.get(shiftForm.date)
    setShiftForm(prev => ({
      ...prev,
      ...(existing || {}),
      id: shiftId(prev.date, model),
      model,
      ...resolved,
      actualStart: resolved.plannedStart,
      actualEnd: resolved.plannedEnd,
      assignment: model === 'U' || model === 'K' ? '' : prev.assignment,
    }))
  }

  async function saveShift(event) {
    event.preventDefault()
    try {
      const isAbsence = shiftForm.model === 'U' || shiftForm.model === 'K'
      const payload = isAbsence
        ? {
            type: 'shiftRange',
            shifts: dateRangeValues(shiftForm.date, rangeEndDate).map(date => {
              const resolved = resolveDuty(date, shiftForm.model)
              return {
                ...shiftForm,
                id: shiftId(date, shiftForm.model),
                date,
                ...resolved,
                actualStart: '',
                actualEnd: '',
                assignment: '',
              }
            }),
          }
        : { type: 'shift', shift: shiftForm }
      const data = await apiRequest('/', 'POST', payload)
      setShifts((data.shifts || []).map(normalizeShift))
      setMessage(isAbsence ? 'Zeitraum gespeichert.' : 'Dienst gespeichert.')
    } catch (error) {
      setMessage(error.message)
    }
  }

  async function deleteShift(id) {
    try {
      const data = await apiRequest(`/?type=shift&id=${encodeURIComponent(id)}`, 'DELETE')
      setShifts((data.shifts || []).map(normalizeShift))
      const remaining = (data.shifts || []).map(normalizeShift)
      setShiftForm(remaining.find(item => item.date === selectedDate && !isAbsenceShift(item)) || emptyShift(selectedDate))
    } catch (error) {
      setMessage(error.message)
    }
  }

  async function saveFinding(event) {
    event.preventDefault()
    try {
      const finding = {
        ...findingForm,
        id: findingForm.id || `finding-${Date.now()}`,
      }
      const data = await apiRequest('/', 'POST', { type: 'finding', finding })
      setFindings(data.findings || [])
      setFindingForm(EMPTY_FINDING)
      setMessage('Befund gespeichert.')
    } catch (error) {
      setMessage(error.message)
    }
  }

  async function deleteFinding(id) {
    try {
      const data = await apiRequest(`/?type=finding&id=${encodeURIComponent(id)}`, 'DELETE')
      setFindings(data.findings || [])
    } catch (error) {
      setMessage(error.message)
    }
  }

  function printMonth() {
    window.print()
  }

  function updateFindingModality(modality) {
    const nextArea = AREA_OPTIONS[modality]?.[0] || ''
    setFindingForm(prev => ({
      ...prev,
      modality,
      examArea: nextArea,
      exam: nextArea,
    }))
  }

  function renderFilterControls(filter, setFilter) {
    return (
      <div className={styles.findingFilters}>
        <label>Modalität
          <select value={filter.modality} onChange={event => setFilter(prev => ({ ...prev, modality: event.target.value }))}>
            <option value="">Alle</option>
            {MODALITIES.map(modality => <option key={modality}>{modality}</option>)}
          </select>
        </label>
        <label>Diagnose / VD
          <input value={filter.diagnosis} onChange={event => setFilter(prev => ({ ...prev, diagnosis: event.target.value }))} />
        </label>
        <label>Organ / Gebiet
          <input value={filter.organ} onChange={event => setFilter(prev => ({ ...prev, organ: event.target.value }))} />
        </label>
      </div>
    )
  }

  function renderFindingList(items, emptyText) {
    return (
      <div className={styles.findingTable}>
        <div className={styles.findingHead}>
          <span>Datum</span><span>Name</span><span>Geb.</span><span>Modalität</span><span>Gebiet</span><span>Diagnose / VD</span><span>Frage</span><span />
        </div>
        {items.map(finding => (
          <div className={styles.findingRow} key={finding.id}>
            <span>{finding.examDate}</span>
            <span>{finding.name || '—'}</span>
            <span>{finding.birthDate || '—'}</span>
            <span>{finding.modality}</span>
            <span>{finding.examArea || finding.organ || finding.exam || '—'}</span>
            <span>{finding.type === 'question' ? finding.vd || '—' : finding.diagnosis || finding.vd || '—'}</span>
            <span>{finding.question || '—'}</span>
            <button type="button" onClick={() => deleteFinding(finding.id)}>×</button>
          </div>
        ))}
        {!items.length && !loading && <div className={styles.emptyTable}>{emptyText}</div>}
      </div>
    )
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        {showHomeLink ? <Link href="/andarun" className={styles.back}>← Andarun</Link> : <span />}
        <div>
          <span className={styles.kicker}>{showFindings && !showShifts ? 'Befunde' : 'Dienstplanung'}</span>
          <h1>{showFindings && !showShifts ? 'Befunde speichern' : 'Dienstzeiten'}</h1>
        </div>
        {showShifts ? <button className={styles.printBtn} type="button" onClick={printMonth}>PDF drucken</button> : <span />}
      </header>

      {message && <div className={styles.message}>{message}</div>}

      {showShifts && <section className={styles.shell}>
        <div className={styles.calendarPanel}>
          <div className={styles.monthBar}>
            <button type="button" onClick={() => setMonth(addMonths(month, -1))}>‹</button>
            <strong>{monthLabel(month)}</strong>
            <button type="button" onClick={() => setMonth(addMonths(month, 1))}>›</button>
          </div>

          <div className={styles.weekHeader}>
            {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map(day => <span key={day}>{day}</span>)}
          </div>
          <div className={styles.calendarGrid}>
            {monthDays.map((day, index) => {
              if (!day.current) return <div className={styles.emptyDay} key={day.id || index} />
              const shift = shiftsByDate.get(day.date)
              const absences = absencesByDate.get(day.date) || []
              const previousShift = shiftsByDate.get(previousDateValue(day.date))
              const isWeekendFree = !shift && (day.weekday === 0 || day.weekday === 6)
              const isPostNightFree = !shift && day.weekday >= 1 && day.weekday <= 5 && isNightShift(previousShift)
              const isNight = isNightShift(shift)
              const isWeekendDayShift = shift?.model === 'BD' && (day.weekday === 0 || day.weekday === 6)
              const isFree = isWeekendFree || isPostNightFree
              const active = day.date === selectedDate
              const isToday = day.date === todayValue()
              return (
                <button
                  className={`${styles.dayCell} ${active ? styles.dayActive : ''} ${shift ? styles.dayHasShift : ''} ${isNight ? styles.dayNightShift : ''} ${isWeekendDayShift ? styles.dayWeekendShift : ''} ${isFree ? styles.dayFree : ''} ${isToday ? styles.dayToday : ''}`}
                  type="button"
                  key={day.date}
                  onClick={() => selectDate(day.date)}
                  aria-current={isToday ? 'date' : undefined}
                >
                  <span className={styles.dayNumber}>{day.day}</span>
                  {shift && <strong>{calendarDutyLabel(shift)}</strong>}
                  {shift && <small>{timeRange(shift.actualStart || shift.plannedStart, shift.actualEnd || shift.plannedEnd)}</small>}
                  {shift?.assignment && <em>{shift.assignment}</em>}
                  {absences.length > 0 && (
                    <span className={styles.absenceBadges}>
                      {absences.map(absence => (
                        <b
                          className={absence.model === 'K' ? styles.absenceSick : styles.absenceVacation}
                          key={absence.id}
                        >
                          {absence.model === 'K' ? 'Krank' : 'Urlaub'}
                        </b>
                      ))}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        <form className={styles.shiftEditor} onSubmit={saveShift}>
          <div className={styles.cardHead}>
            <span>{WEEKDAYS_LONG[parseDate(shiftForm.date).getDay()]}</span>
            <h2>{new Date(`${shiftForm.date}T12:00:00`).toLocaleDateString('de-DE')}</h2>
          </div>

          <div className={styles.segmented}>
            {SHIFT_TYPES.map(type => (
              <button
                key={type.id}
                type="button"
                className={shiftForm.model === type.id ? styles.segmentActive : styles.segment}
                onClick={() => updateShiftModel(type.id)}
              >
                {type.short}
              </button>
            ))}
          </div>

          <div className={styles.dutyPreview}>
            <strong>{shiftForm.duty || '—'}</strong>
            <span>{timeRange(shiftForm.plannedStart, shiftForm.plannedEnd)}</span>
          </div>

          {(shiftForm.model === 'U' || shiftForm.model === 'K') && (
            <div className={styles.formGrid}>
              <label>Ab
                <input
                  type="date"
                  value={shiftForm.date}
                  onChange={event => {
                    const nextDate = event.target.value
                    const resolved = resolveDuty(nextDate, shiftForm.model)
                    setSelectedDate(nextDate)
                    setShiftForm(prev => ({ ...prev, date: nextDate, id: shiftId(nextDate, prev.model), ...resolved }))
                    if (rangeEndDate < nextDate) setRangeEndDate(nextDate)
                  }}
                />
              </label>
              <label>Bis
                <input type="date" value={rangeEndDate} onChange={event => setRangeEndDate(event.target.value)} />
              </label>
            </div>
          )}

          {shiftForm.model !== 'U' && shiftForm.model !== 'K' && (
            <>
              <div className={styles.formGrid}>
                <label>Von
                  <input type="time" value={shiftForm.actualStart} onChange={event => setShiftForm(prev => ({ ...prev, actualStart: event.target.value }))} />
                </label>
                <label>Bis
                  <input type="time" value={shiftForm.actualEnd} onChange={event => setShiftForm(prev => ({ ...prev, actualEnd: event.target.value }))} />
                </label>
              </div>
              <div className={styles.assignmentPicker}>
                {DAILY_MODALITIES.map(item => (
                  <button
                    key={item.id}
                    type="button"
                    className={shiftForm.assignment === item.id ? styles.assignmentActive : styles.assignmentBtn}
                    onClick={() => setShiftForm(prev => ({ ...prev, assignment: prev.assignment === item.id ? '' : item.id }))}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </>
          )}
          <label className={styles.fullLabel}>Notiz
            <input value={shiftForm.note} onChange={event => setShiftForm(prev => ({ ...prev, note: event.target.value }))} />
          </label>
          {(absencesByDate.get(selectedDate) || []).length > 0 && (
            <div className={styles.savedAbsences}>
              <span>Zusätzlich gespeichert</span>
              {(absencesByDate.get(selectedDate) || []).map(absence => (
                <button type="button" key={absence.id} onClick={() => deleteShift(absence.id)}>
                  {absence.model === 'K' ? 'Krank' : 'Urlaub'} ×
                </button>
              ))}
            </div>
          )}
          <div className={styles.actions}>
            <button type="submit">Speichern</button>
            {shifts.some(item => item.id === shiftForm.id) && (
              <button type="button" className={styles.ghostBtn} onClick={() => deleteShift(shiftForm.id || shiftForm.date)}>Löschen</button>
            )}
          </div>
        </form>
      </section>}

      {showFindings && <section className={styles.findings}>
        <div className={styles.sectionTitle}>
          <span className={styles.kicker}>Befunde</span>
          <h2>Relevante Fälle & Fragen</h2>
        </div>
        <form className={styles.findingForm} onSubmit={saveFinding}>
          <div className={styles.caseTypePicker}>
            {CASE_TYPES.map(type => (
              <label className={findingForm.type === type.id ? styles.caseTypeActive : styles.caseType} key={type.id}>
                <input
                  type="radio"
                  name="findingType"
                  checked={findingForm.type === type.id}
                  onChange={() => setFindingForm(prev => ({ ...prev, type: type.id }))}
                />
                {type.label}
              </label>
            ))}
          </div>
          <label>Tag der Untersuchung
            <input type="date" value={findingForm.examDate} onChange={event => setFindingForm(prev => ({ ...prev, examDate: event.target.value }))} />
          </label>
          <label>Name
            <input value={findingForm.name} onChange={event => setFindingForm(prev => ({ ...prev, name: event.target.value }))} />
          </label>
          <label>Geburtsdatum
            <input type="date" value={findingForm.birthDate} onChange={event => setFindingForm(prev => ({ ...prev, birthDate: event.target.value }))} />
          </label>
          <label>Modalität
            <select value={findingForm.modality} onChange={event => updateFindingModality(event.target.value)}>
              {MODALITIES.map(modality => <option key={modality}>{modality}</option>)}
            </select>
          </label>
          <label>Gebiet
            <select
              value={findingForm.examArea}
              onChange={event => setFindingForm(prev => ({ ...prev, examArea: event.target.value, exam: event.target.value }))}
            >
              {(AREA_OPTIONS[findingForm.modality] || []).map(area => <option key={area}>{area}</option>)}
            </select>
          </label>
          <label>Untersuchung
            <input value={findingForm.exam} onChange={event => setFindingForm(prev => ({ ...prev, exam: event.target.value }))} />
          </label>
          {findingForm.type === 'case' ? (
            <label>Diagnose
              <input value={findingForm.diagnosis} onChange={event => setFindingForm(prev => ({ ...prev, diagnosis: event.target.value }))} />
            </label>
          ) : (
            <label>Verdachtsdiagnose
              <input value={findingForm.vd} onChange={event => setFindingForm(prev => ({ ...prev, vd: event.target.value }))} />
            </label>
          )}
          <label>Organ
            <input value={findingForm.organ} onChange={event => setFindingForm(prev => ({ ...prev, organ: event.target.value }))} />
          </label>
          <label className={styles.questionField}>Frage
            <input value={findingForm.question} onChange={event => setFindingForm(prev => ({ ...prev, question: event.target.value }))} />
          </label>
          <button type="submit">Eintrag speichern</button>
        </form>

        <div className={styles.findingLists}>
          <article className={styles.findingBox}>
            <div className={styles.listHead}>
              <h3>Relevante Fälle</h3>
              <span>{relevantCases.length}</span>
            </div>
            {renderFilterControls(caseFilter, setCaseFilter)}
            {renderFindingList(relevantCases, 'Noch keine relevanten Fälle gespeichert.')}
          </article>
          <article className={styles.findingBox}>
            <div className={styles.listHead}>
              <h3>Verlaufskontrolle & Fragen</h3>
              <span>{followupQuestions.length}</span>
            </div>
            {renderFilterControls(questionFilter, setQuestionFilter)}
            {renderFindingList(followupQuestions, 'Noch keine Verlaufskontrollen oder Fragen gespeichert.')}
          </article>
        </div>
      </section>}

      <section className={styles.printSheet} aria-hidden="true">
        <div className={styles.printTop}>
          <h1>Dienstmodell</h1>
          <div><strong>{NAME}</strong><span>{monthLabel(month)}</span></div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Wochentag</th>
              <th>Datum</th>
              <th>Dienst</th>
              <th>Arbeitszeit von bis</th>
            </tr>
          </thead>
          <tbody>
            {monthShifts.map(shift => {
              const date = parseDate(shift.date)
              return (
                <tr key={shift.id}>
                  <td>{WEEKDAYS_LONG[date.getDay()]}</td>
                  <td>{date.toLocaleDateString('de-DE')}</td>
                  <td>{shift.duty}</td>
                  <td>{timeRange(shift.actualStart || shift.plannedStart, shift.actualEnd || shift.plannedEnd)}</td>
                </tr>
              )
            })}
            {!monthShifts.length && (
              <tr><td colSpan="4">Keine Dienste eingetragen</td></tr>
            )}
          </tbody>
        </table>
        <div className={styles.signatures}>
          <div><span>Datum</span><strong /></div>
          <div><span>Unterschrift Mitarbeiter</span><strong /></div>
          <div><span>Unterschrift Vorgesetzter</span><strong /></div>
        </div>
      </section>
    </main>
  )
}
