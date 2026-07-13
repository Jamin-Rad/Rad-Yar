'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import styles from './page.module.css'

const NAME = 'Hamed Zia'
const WEEKDAYS_LONG = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']
const MONTHS = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']
const MODALITIES = ['Röntgen', 'CT', 'MRT']
const EXAM_AREAS = [
  'Schädel', 'Hals', 'Thorax', 'Abdomen', 'Becken', 'Wirbelsäule',
  'Schulter', 'Ellenbogen', 'Hand', 'Hüfte', 'Knie', 'Sprunggelenk',
  'Gefäße', 'Ganzkörper',
]
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
  return new Date().toISOString().slice(0, 10)
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

function isNightShift(shift) {
  return shift?.model === 'N' || /^BD[1-4]$/.test(shift?.duty || '')
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

function normalizeShift(shift) {
  if (!shift?.date) return shift
  return {
    ...emptyShift(shift.date),
    ...shift,
    assignment: shift.assignment || '',
  }
}

const EMPTY_FINDING = {
  examDate: todayValue(),
  birthDate: '',
  modality: 'Röntgen',
  examArea: 'Thorax',
  exam: 'Thorax',
  vd: '',
  organ: '',
  question: '',
  status: 'offen',
}

export default function WorkPage() {
  const [month, setMonth] = useState(monthValue())
  const [shifts, setShifts] = useState([])
  const [findings, setFindings] = useState([])
  const [selectedDate, setSelectedDate] = useState(todayValue())
  const [shiftForm, setShiftForm] = useState(emptyShift(todayValue()))
  const [findingForm, setFindingForm] = useState(EMPTY_FINDING)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAll()
  }, [])

  const shiftsByDate = useMemo(() => new Map(shifts.map(shift => [shift.date, shift])), [shifts])
  const monthDays = useMemo(() => daysForMonth(month), [month])
  const monthShifts = useMemo(
    () => shifts.filter(shift => shift.date?.startsWith(month)).sort((a, b) => a.date.localeCompare(b.date)),
    [shifts, month],
  )

  async function loadAll() {
    setLoading(true)
    try {
      const data = await apiRequest('/')
      const loadedShifts = (data.shifts || []).map(normalizeShift)
      setShifts(loadedShifts)
      setFindings(data.findings || [])
      const existing = loadedShifts.find(item => item.date === selectedDate)
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
    const existing = shiftsByDate.get(date)
    setShiftForm(existing ? normalizeShift(existing) : emptyShift(date))
  }

  function updateShiftModel(model) {
    const resolved = resolveDuty(shiftForm.date, model)
    setShiftForm(prev => ({
      ...prev,
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
      const data = await apiRequest('/', 'POST', { type: 'shift', shift: shiftForm })
      setShifts((data.shifts || []).map(normalizeShift))
      setMessage('Dienst gespeichert.')
    } catch (error) {
      setMessage(error.message)
    }
  }

  async function deleteShift(id) {
    try {
      const data = await apiRequest(`/?type=shift&id=${encodeURIComponent(id)}`, 'DELETE')
      setShifts((data.shifts || []).map(normalizeShift))
      setShiftForm(emptyShift(selectedDate))
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

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/andarun" className={styles.back}>Andarun</Link>
        <div>
          <span className={styles.kicker}>Dienstplanung</span>
          <h1>Dienste & Befunde</h1>
        </div>
        <button className={styles.printBtn} type="button" onClick={printMonth}>PDF drucken</button>
      </header>

      {message && <div className={styles.message}>{message}</div>}

      <section className={styles.shell}>
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
              const previousShift = shiftsByDate.get(previousDateValue(day.date))
              const isWeekendFree = !shift && (day.weekday === 0 || day.weekday === 6)
              const isPostNightFree = !shift && day.weekday >= 1 && day.weekday <= 5 && isNightShift(previousShift)
              const isFree = isWeekendFree || isPostNightFree
              const active = day.date === selectedDate
              return (
                <button
                  className={`${styles.dayCell} ${active ? styles.dayActive : ''} ${shift ? styles.dayHasShift : ''} ${isFree ? styles.dayFree : ''}`}
                  type="button"
                  key={day.date}
                  onClick={() => selectDate(day.date)}
                >
                  <span>{day.day}</span>
                  {shift && <strong>{shift.duty}</strong>}
                  {shift && <small>{timeRange(shift.actualStart || shift.plannedStart, shift.actualEnd || shift.plannedEnd)}</small>}
                  {shift?.assignment && <em>{shift.assignment}</em>}
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
          <div className={styles.actions}>
            <button type="submit">Speichern</button>
            {shiftsByDate.has(shiftForm.date) && (
              <button type="button" className={styles.ghostBtn} onClick={() => deleteShift(shiftForm.id || shiftForm.date)}>Löschen</button>
            )}
          </div>
        </form>
      </section>

      <section className={styles.findings}>
        <div className={styles.sectionTitle}>
          <span className={styles.kicker}>Befunde</span>
          <h2>Relevante Fälle & Fragen</h2>
        </div>
        <form className={styles.findingForm} onSubmit={saveFinding}>
          <label>Tag
            <input type="date" value={findingForm.examDate} onChange={event => setFindingForm(prev => ({ ...prev, examDate: event.target.value }))} />
          </label>
          <label>Geburtsdatum
            <input type="date" value={findingForm.birthDate} onChange={event => setFindingForm(prev => ({ ...prev, birthDate: event.target.value }))} />
          </label>
          <label>Modalität
            <select value={findingForm.modality} onChange={event => setFindingForm(prev => ({ ...prev, modality: event.target.value }))}>
              {MODALITIES.map(modality => <option key={modality}>{modality}</option>)}
            </select>
          </label>
          <label>Gebiet
            <select
              value={findingForm.examArea}
              onChange={event => setFindingForm(prev => ({ ...prev, examArea: event.target.value, exam: event.target.value }))}
            >
              {EXAM_AREAS.map(area => <option key={area}>{area}</option>)}
            </select>
          </label>
          <label>Untersuchung
            <input value={findingForm.exam} onChange={event => setFindingForm(prev => ({ ...prev, exam: event.target.value }))} />
          </label>
          <label>VD
            <input value={findingForm.vd} onChange={event => setFindingForm(prev => ({ ...prev, vd: event.target.value }))} />
          </label>
          <label>Organ
            <input value={findingForm.organ} onChange={event => setFindingForm(prev => ({ ...prev, organ: event.target.value }))} />
          </label>
          <label className={styles.questionField}>Frage
            <input value={findingForm.question} onChange={event => setFindingForm(prev => ({ ...prev, question: event.target.value }))} />
          </label>
          <button type="submit">Befund speichern</button>
        </form>

        <div className={styles.findingTable}>
          <div className={styles.findingHead}>
            <span>Datum</span><span>Geb.</span><span>Modalität</span><span>Gebiet</span><span>Untersuchung</span><span>VD</span><span>Organ</span><span>Frage</span><span />
          </div>
          {findings.map(finding => (
            <div className={styles.findingRow} key={finding.id}>
              <span>{finding.examDate}</span>
              <span>{finding.birthDate || '—'}</span>
              <span>{finding.modality}</span>
              <span>{finding.examArea || finding.organ || '—'}</span>
              <span>{finding.exam || '—'}</span>
              <span>{finding.vd || '—'}</span>
              <span>{finding.organ || '—'}</span>
              <span>{finding.question || '—'}</span>
              <button type="button" onClick={() => deleteFinding(finding.id)}>×</button>
            </div>
          ))}
          {!findings.length && !loading && <div className={styles.emptyTable}>Noch keine Befunde gespeichert.</div>}
        </div>
      </section>

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
              <th>Einteilung</th>
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
                  <td>{shift.assignment || ''}</td>
                </tr>
              )
            })}
            {!monthShifts.length && (
              <tr><td colSpan="5">Keine Dienste eingetragen</td></tr>
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
