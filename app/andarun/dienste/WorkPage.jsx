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

function shortDateLabel(value) {
  const date = parseDate(value)
  return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' })
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
  const diagnosisFilter = filter.diagnosis.trim().toLowerCase()
  return (!filter.modality || finding.modality === filter.modality)
    && (!diagnosisFilter || diagnosisText.includes(diagnosisFilter))
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
  diagnosis: '',
  vd: '',
  status: 'offen',
}

const EMPTY_FILTER = {
  modality: '',
  diagnosis: '',
}

const TIMER_EXTRA_INCREMENT_MINUTES = 5
const TIMER_TARGET_MINUTES = {
  Röntgen: 3,
  CT: 10,
  MRT: 15,
}

const EMPTY_TIMER_FORM = {
  modality: 'Röntgen',
  count: 1,
}

function formatTimerDuration(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000))
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  const mm = String(minutes).padStart(2, '0')
  const ss = String(seconds).padStart(2, '0')
  return hours > 0 ? `${hours}:${mm}:${ss}` : `${mm}:${ss}`
}

export default function WorkPage({ showHomeLink = true, view = 'all' }) {
  const showShifts = view !== 'findings'
  const showFindings = view !== 'shifts'
  const [month, setMonth] = useState(monthValue())
  const [shifts, setShifts] = useState([])
  const [findings, setFindings] = useState([])
  const [findingTimers, setFindingTimers] = useState([])
  const [selectedDate, setSelectedDate] = useState(todayValue())
  const [shiftForm, setShiftForm] = useState(emptyShift(todayValue()))
  const [rangeEndDate, setRangeEndDate] = useState(todayValue())
  const [findingForm, setFindingForm] = useState(EMPTY_FINDING)
  const [activeFindingType, setActiveFindingType] = useState('case')
  const [findingModalType, setFindingModalType] = useState(null)
  const [caseFilter, setCaseFilter] = useState(EMPTY_FILTER)
  const [questionFilter, setQuestionFilter] = useState(EMPTY_FILTER)
  const [timerForm, setTimerForm] = useState(EMPTY_TIMER_FORM)
  const [timerElapsed, setTimerElapsed] = useState(0)
  const [timerStartedAt, setTimerStartedAt] = useState(null)
  const [timerNow, setTimerNow] = useState(Date.now())
  const [timerAddedMessage, setTimerAddedMessage] = useState('')
  const [timerHistoryOpen, setTimerHistoryOpen] = useState(false)
  const [timerDayModal, setTimerDayModal] = useState(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAll()
  }, [])

  useEffect(() => {
    if (!timerStartedAt) return undefined
    const id = window.setInterval(() => setTimerNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [timerStartedAt])

  useEffect(() => {
    if (!timerAddedMessage) return undefined
    const id = window.setTimeout(() => setTimerAddedMessage(''), 2200)
    return () => window.clearTimeout(id)
  }, [timerAddedMessage])

  useEffect(() => {
    if (!timerStartedAt || !navigator?.wakeLock) return undefined
    let wakeLock = null
    let cancelled = false

    async function requestWakeLock() {
      try {
        wakeLock = await navigator.wakeLock.request('screen')
        if (cancelled) {
          await wakeLock.release()
          wakeLock = null
        }
      } catch {
        wakeLock = null
      }
    }

    function restoreWakeLock() {
      if (document.visibilityState === 'visible' && !wakeLock) requestWakeLock()
    }

    requestWakeLock()
    document.addEventListener('visibilitychange', restoreWakeLock)

    return () => {
      cancelled = true
      document.removeEventListener('visibilitychange', restoreWakeLock)
      if (wakeLock) {
        wakeLock.release().catch(() => {})
        wakeLock = null
      }
    }
  }, [timerStartedAt])

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
  const printMonthRows = useMemo(
    () => daysForMonth(month)
      .filter(day => day.current)
      .map(day => ({
        date: day.date,
        shift: shiftsByDate.get(day.date) || absencesByDate.get(day.date)?.[0] || null,
      })),
    [month, shiftsByDate, absencesByDate],
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
      setFindingTimers(data.findingTimers || [])
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
      setActiveFindingType(finding.type)
      setFindingModalType(null)
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

  const timerDisplayMs = timerElapsed + (timerStartedAt ? timerNow - timerStartedAt : 0)
  const timerRunning = Boolean(timerStartedAt)
  const timerBaseTargetMinutes = TIMER_TARGET_MINUTES[timerForm.modality] || TIMER_EXTRA_INCREMENT_MINUTES
  const timerCount = Math.max(1, Number(timerForm.count) || 1)
  const timerTargetMinutes = timerBaseTargetMinutes * timerCount
  const timerSegmentMs = timerTargetMinutes * 60 * 1000
  const timerExtraSegmentMs = TIMER_EXTRA_INCREMENT_MINUTES * 60 * 1000
  const timerOverTarget = timerDisplayMs > timerSegmentMs
  const timerExtraMs = Math.max(0, timerDisplayMs - timerSegmentMs)
  const timerExtraBlocks = timerExtraMs > 0 ? Math.ceil(timerExtraMs / timerExtraSegmentMs) : 0
  const timerExtraMinutes = timerExtraBlocks * TIMER_EXTRA_INCREMENT_MINUTES
  const timerNormalProgress = timerDisplayMs > 0 ? Math.min(timerDisplayMs / timerSegmentMs, 1) : 0
  const timerExtraProgress = timerExtraMs > 0
    ? ((timerExtraMs % timerExtraSegmentMs) || timerExtraSegmentMs) / timerExtraSegmentMs
    : 0
  const timerDialProgress = timerOverTarget ? timerExtraProgress : timerNormalProgress
  const todayTimers = useMemo(
    () => findingTimers.filter(timer => timer.date === todayValue()),
    [findingTimers],
  )
  const timerStats = useMemo(() => MODALITIES.map(modality => {
    const items = todayTimers.filter(timer => timer.modality === modality)
    const count = items.reduce((sum, timer) => sum + (Number(timer.count) || 1), 0)
    const avg = count
      ? Math.round(items.reduce((sum, timer) => sum + Number(timer.durationMs || 0), 0) / count)
      : 0
    return { modality, count, avg }
  }), [todayTimers])
  const timerHistoryDays = useMemo(() => {
    const grouped = new Map()
    findingTimers.forEach(timer => {
      const date = timer.date || ''
      if (!date) return
      const modality = MODALITIES.includes(timer.modality) ? timer.modality : 'Röntgen'
      const count = Number(timer.count) || 1
      const current = grouped.get(date) || {
        date,
        count: 0,
        totalMs: 0,
        modalities: Object.fromEntries(MODALITIES.map(item => [item, 0])),
      }
      current.count += count
      current.totalMs += Number(timer.durationMs || 0)
      current.modalities[modality] += count
      grouped.set(date, current)
    })
    const cursor = parseDate(todayValue())
    cursor.setDate(cursor.getDate() - 13)
    return Array.from({ length: 14 }, () => {
      const date = dateValue(cursor)
      const day = grouped.get(date) || {
        date,
        count: 0,
        totalMs: 0,
        modalities: Object.fromEntries(MODALITIES.map(item => [item, 0])),
      }
      cursor.setDate(cursor.getDate() + 1)
      return { ...day, avg: day.count ? Math.round(day.totalMs / day.count) : 0 }
    })
  }, [findingTimers])
  const timerHistoryTotals = useMemo(() => {
    const count = timerHistoryDays.reduce((sum, day) => sum + day.count, 0)
    const totalMs = timerHistoryDays.reduce((sum, day) => sum + day.totalMs, 0)
    const activeDays = timerHistoryDays.filter(day => day.count > 0).length
    const busiestDay = timerHistoryDays.reduce((best, day) => (day.count > best.count ? day : best), { count: 0 })
    return {
      count,
      totalMs,
      activeDays,
      avg: count ? Math.round(totalMs / count) : 0,
      busiestDay,
    }
  }, [timerHistoryDays])
  const maxHistoryCount = Math.max(1, ...timerHistoryDays.map(day => day.count))
  const maxHistoryAvg = Math.max(1, ...timerHistoryDays.map(day => day.avg))
  const timerHistoryHasData = timerHistoryTotals.count > 0
  const timerDayItems = timerDayModal
    ? todayTimers.filter(timer => timer.modality === timerDayModal)
    : []

  function updateTimerModality(modality) {
    setTimerForm(prev => ({ ...prev, modality }))
  }

  function updateTimerCount(delta) {
    const shouldShowAddedMessage = delta > 0 && timerCount < 20
    setTimerForm(prev => ({
      ...prev,
      count: Math.min(20, Math.max(1, (Number(prev.count) || 1) + delta)),
    }))
    if (shouldShowAddedMessage) setTimerAddedMessage(`+${timerBaseTargetMinutes} Minuten Zielzeit hinzugefügt`)
  }

  function startFindingTimer() {
    if (timerRunning) return
    setTimerNow(Date.now())
    setTimerStartedAt(Date.now())
  }

  function pauseFindingTimer() {
    if (!timerStartedAt) return
    const now = Date.now()
    setTimerElapsed(prev => prev + (now - timerStartedAt))
    setTimerStartedAt(null)
    setTimerNow(now)
  }

  function resetFindingTimer() {
    setTimerElapsed(0)
    setTimerStartedAt(null)
    setTimerNow(Date.now())
  }

  async function finishFindingTimer() {
    const now = Date.now()
    const durationMs = timerElapsed + (timerStartedAt ? now - timerStartedAt : 0)
    if (durationMs < 1000) {
      setMessage('Timer ist noch zu kurz.')
      return
    }
    try {
      const timer = {
        ...timerForm,
        id: `finding-timer-${now}`,
        count: timerCount,
        date: todayValue(),
        examArea: '',
        durationMs,
        createdAt: new Date(now).toISOString(),
      }
      const data = await apiRequest('/', 'POST', { type: 'findingTimer', timer })
      setFindingTimers(data.findingTimers || [])
      setTimerElapsed(0)
      setTimerStartedAt(null)
      setTimerNow(now)
      setTimerForm(prev => ({ ...prev, count: 1 }))
      setMessage('Befundzeit gespeichert.')
    } catch (error) {
      setMessage(error.message)
    }
  }

  async function deleteFindingTimer(id) {
    try {
      const data = await apiRequest(`/?type=findingTimer&id=${encodeURIComponent(id)}`, 'DELETE')
      setFindingTimers(data.findingTimers || [])
    } catch (error) {
      setMessage(error.message)
    }
  }

  function printMonth() {
    window.print()
  }

  function openFindingModal(type) {
    setFindingModalType(type)
    setFindingForm({ ...EMPTY_FINDING, type })
  }

  function closeFindingModal() {
    setFindingModalType(null)
    setFindingForm(EMPTY_FINDING)
  }

  function updateFindingModality(modality) {
    const nextArea = AREA_OPTIONS[modality]?.[0] || ''
    setFindingForm(prev => ({
      ...prev,
      modality,
      examArea: nextArea,
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
      </div>
    )
  }

  function renderFindingForm() {
    return (
      <form className={styles.findingForm} onSubmit={saveFinding}>
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
            onChange={event => setFindingForm(prev => ({ ...prev, examArea: event.target.value }))}
          >
            {(AREA_OPTIONS[findingForm.modality] || []).map(area => <option key={area}>{area}</option>)}
          </select>
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
        <button type="submit">Eintrag speichern</button>
      </form>
    )
  }

  function renderFindingList(items, emptyText) {
    return (
      <div className={styles.findingTable}>
        <div className={styles.findingHead}>
          <span>Datum</span><span>Name</span><span>Geb.</span><span>Modalität</span><span>Gebiet</span><span>Diagnose / VD</span><span />
        </div>
        {items.map(finding => (
          <div className={styles.findingRow} key={finding.id}>
            <span>{finding.examDate}</span>
            <span>{finding.name || '—'}</span>
            <span>{finding.birthDate || '—'}</span>
            <span>{finding.modality}</span>
            <span>{finding.examArea || '—'}</span>
            <span>{finding.type === 'question' ? finding.vd || '—' : finding.diagnosis || finding.vd || '—'}</span>
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
          <h1>{showFindings && !showShifts ? 'Befunde' : 'Dienstzeiten'}</h1>
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
        <div className={styles.timerHero}>
          <div className={styles.sectionTitle}>
            <div>
              <span className={styles.kicker}>Befundtimer</span>
              <h2>Befundtimer</h2>
            </div>
          </div>
          <div className={styles.timerHeroGrid}>
            <div className={styles.timerDialCard}>
              <div
                className={[
                  timerRunning ? styles.timerDialRunning : styles.timerDial,
                  timerOverTarget ? styles.timerDialOverdue : '',
                ].filter(Boolean).join(' ')}
                style={{ '--progress': `${timerDialProgress * 360}deg` }}
              >
                <div>
                  <strong>{formatTimerDuration(timerDisplayMs)}</strong>
                  <span>{timerOverTarget ? `+${timerExtraMinutes} min extra` : `${timerTargetMinutes} min Ziel`}</span>
                </div>
              </div>
              <div className={styles.timerModalityPills}>
                {MODALITIES.map(modality => (
                  <button
                    key={modality}
                    type="button"
                    className={timerForm.modality === modality ? styles.timerModalityActive : styles.timerModality}
                    onClick={() => updateTimerModality(modality)}
                  >
                    {modality}
                  </button>
                ))}
              </div>
              <div className={styles.timerCountControl}>
                <span>{timerBaseTargetMinutes} min / Befund</span>
                <div>
                  <button type="button" onClick={() => updateTimerCount(-1)} disabled={timerCount <= 1} aria-label="Ein Befund weniger">−</button>
                  <strong>×{timerCount}</strong>
                  <button type="button" onClick={() => updateTimerCount(1)} aria-label="Ein Befund mehr">+</button>
                </div>
                {timerAddedMessage && <em>{timerAddedMessage}</em>}
              </div>
              <div className={styles.timerIconButtons}>
                <button type="button" onClick={startFindingTimer} disabled={timerRunning} aria-label="Timer starten">
                  <span className={styles.iconPlay} />
                </button>
                <button type="button" onClick={pauseFindingTimer} disabled={!timerRunning} aria-label="Timer halten">
                  <span className={styles.iconPause} />
                </button>
                <button type="button" onClick={finishFindingTimer} disabled={!timerDisplayMs} aria-label="Timer beenden und speichern">
                  <span className={styles.iconStop} />
                </button>
              </div>
            </div>

            <div className={styles.timerStatsCard}>
              <button className={styles.timerStatsHeader} type="button" onClick={() => setTimerHistoryOpen(true)}>
                <span className={styles.kicker}>Heute</span>
                <em>Befundzeiten ansehen</em>
              </button>
              <div className={styles.timerStatsGrid}>
                {timerStats.map(stat => (
                  <button type="button" key={stat.modality} onClick={() => setTimerDayModal(stat.modality)}>
                    <strong>{stat.modality}</strong>
                    <span>{stat.count} Befund{stat.count === 1 ? '' : 'e'}</span>
                    <em>{stat.avg ? formatTimerDuration(stat.avg) : '--:--'} Ø</em>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.controlPanel}>
          <div className={styles.sectionTitle}>
            <div>
              <span className={styles.kicker}>Befundkontrolle</span>
              <h2>Befundkontrolle</h2>
            </div>
          </div>

          <div className={styles.findingTopGrid}>
            <div className={styles.findingTypeCards}>
              {CASE_TYPES.map(type => {
                const count = type.id === 'case'
                  ? normalizedFindings.filter(finding => finding.type !== 'question').length
                  : normalizedFindings.filter(finding => finding.type === 'question').length
                return (
                  <article className={activeFindingType === type.id ? styles.findingTypeCardActive : styles.findingTypeCard} key={type.id}>
                    <div>
                      <span>{count} gespeichert</span>
                      <h3>{type.label}</h3>
                    </div>
                    <div className={styles.findingTypeActions}>
                      <button type="button" onClick={() => openFindingModal(type.id)}>Eintrag erfassen</button>
                      <button type="button" onClick={() => setActiveFindingType(type.id)}>Gespeicherte anzeigen</button>
                    </div>
                  </article>
                )
              })}
            </div>

          </div>

          <div className={styles.findingBox}>
            <div className={styles.listHead}>
              <h3>{CASE_TYPES.find(type => type.id === activeFindingType)?.label}</h3>
              <span>{activeFindingType === 'case' ? relevantCases.length : followupQuestions.length}</span>
            </div>
            {activeFindingType === 'case' ? (
              <>
                {renderFilterControls(caseFilter, setCaseFilter)}
                {renderFindingList(relevantCases, 'Noch keine relevanten Fälle gespeichert.')}
              </>
            ) : (
              <>
                {renderFilterControls(questionFilter, setQuestionFilter)}
                {renderFindingList(followupQuestions, 'Noch keine Verlaufskontrollen oder Fragen gespeichert.')}
              </>
            )}
          </div>
        </div>

        {findingModalType && (
          <div className={styles.modalBackdrop} role="presentation" onMouseDown={closeFindingModal}>
            <div
              className={styles.findingModal}
              role="dialog"
              aria-modal="true"
              aria-labelledby="finding-modal-title"
              onMouseDown={event => event.stopPropagation()}
            >
              <div className={styles.modalHead}>
                <div>
                  <span className={styles.kicker}>Neuer Eintrag</span>
                  <h3 id="finding-modal-title">{CASE_TYPES.find(type => type.id === findingModalType)?.label}</h3>
                </div>
                <button type="button" onClick={closeFindingModal} aria-label="Fenster schließen">×</button>
              </div>
              {renderFindingForm()}
            </div>
          </div>
        )}

        {timerHistoryOpen && (
          <div className={styles.modalBackdrop} role="presentation" onMouseDown={() => setTimerHistoryOpen(false)}>
            <div
              className={styles.timerHistoryModal}
              role="dialog"
              aria-modal="true"
              aria-labelledby="timer-history-title"
              onMouseDown={event => event.stopPropagation()}
            >
              <div className={styles.modalHead}>
                <div>
                  <span className={styles.kicker}>Verlauf</span>
                  <h3 id="timer-history-title">Befundtimer Verlauf</h3>
                </div>
                <button type="button" onClick={() => setTimerHistoryOpen(false)} aria-label="Fenster schließen">×</button>
              </div>
              <div className={styles.timerHistorySummary}>
                <div><span>Befunde</span><strong>{timerHistoryTotals.count}</strong></div>
                <div><span>Ø pro Befund</span><strong>{timerHistoryTotals.avg ? formatTimerDuration(timerHistoryTotals.avg) : '--:--'}</strong></div>
                <div><span>Aktive Tage</span><strong>{timerHistoryTotals.activeDays}</strong></div>
                <div><span>Stärkster Tag</span><strong>{timerHistoryTotals.busiestDay?.count ? `${shortDateLabel(timerHistoryTotals.busiestDay.date)} · ${timerHistoryTotals.busiestDay.count}` : '—'}</strong></div>
              </div>
              <div className={styles.timerHistoryLegend}>
                <span><i /> Befunde/Tag</span>
                <span><b /> Ø Zeit/Befund</span>
              </div>
              <div className={styles.timerHistoryChart} aria-label="Befundtimer Verlauf der letzten 14 Tage">
                <div className={styles.timerHistoryAxis}>
                  <span>{maxHistoryCount}</span>
                  <span>{Math.ceil(maxHistoryCount / 2)}</span>
                  <span>0</span>
                </div>
                <div className={styles.timerHistoryPlot}>
                  {timerHistoryDays.map(day => {
                    const countHeight = day.count ? Math.max(10, (day.count / maxHistoryCount) * 100) : 0
                    const avgPosition = day.avg ? Math.max(8, (day.avg / maxHistoryAvg) * 100) : 0
                    return (
                      <div className={styles.timerHistoryDay} key={day.date} title={`${shortDateLabel(day.date)}: ${day.count} Befunde, Ø ${day.avg ? formatTimerDuration(day.avg) : '--:--'}`}>
                        <div className={styles.timerHistoryBars}>
                          <span style={{ height: `${countHeight}%` }} />
                          {day.avg > 0 && <em style={{ bottom: `${avgPosition}%` }}>{formatTimerDuration(day.avg)}</em>}
                        </div>
                        <strong>{day.count}</strong>
                        <small>{shortDateLabel(day.date)}</small>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className={styles.timerHistoryTable}>
                <div className={styles.timerHistoryTableHead}>
                  <span>Datum</span><span>Befunde</span><span>Ø</span><span>Gesamt</span><span>Rö</span><span>CT</span><span>MRT</span>
                </div>
                {timerHistoryDays.filter(day => day.count > 0).map(day => (
                  <div className={styles.timerHistoryTableRow} key={`row-${day.date}`}>
                    <span>{shortDateLabel(day.date)}</span>
                    <strong>{day.count}</strong>
                    <em>{formatTimerDuration(day.avg)}</em>
                    <em>{formatTimerDuration(day.totalMs)}</em>
                    <span>{day.modalities['Röntgen']}</span>
                    <span>{day.modalities.CT}</span>
                    <span>{day.modalities.MRT}</span>
                  </div>
                ))}
                {!timerHistoryHasData && <p>Noch kein Verlauf gespeichert.</p>}
              </div>
            </div>
          </div>
        )}

        {timerDayModal && (
          <div className={styles.modalBackdrop} role="presentation" onMouseDown={() => setTimerDayModal(null)}>
            <div
              className={styles.timerHistoryModal}
              role="dialog"
              aria-modal="true"
              aria-labelledby="timer-day-title"
              onMouseDown={event => event.stopPropagation()}
            >
              <div className={styles.modalHead}>
                <div>
                  <span className={styles.kicker}>Heute</span>
                  <h3 id="timer-day-title">{timerDayModal} Befunde</h3>
                </div>
                <button type="button" onClick={() => setTimerDayModal(null)} aria-label="Fenster schließen">×</button>
              </div>
              <div className={styles.timerDayList}>
                {timerDayItems.map(timer => (
                  <div className={styles.timerDayRow} key={timer.id}>
                    <strong>{formatTimerDuration(timer.durationMs)}</strong>
                    <span>×{Number(timer.count) || 1}</span>
                    <em>{formatTimerDuration(Number(timer.durationMs || 0) / (Number(timer.count) || 1))} Ø</em>
                    <small>{new Date(timer.createdAt || `${timer.date}T12:00:00`).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}</small>
                    <button type="button" onClick={() => deleteFindingTimer(timer.id)}>Löschen</button>
                  </div>
                ))}
                {!timerDayItems.length && <p>Noch keine {timerDayModal}-Befunde heute.</p>}
              </div>
            </div>
          </div>
        )}
      </section>}

      <section className={styles.printSheet} aria-hidden="true">
        <div className={styles.printTop}>
          <h1>Dienstzeiten</h1>
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
            {printMonthRows.map(({ date: dateValueText, shift }) => {
              const date = parseDate(dateValueText)
              return (
                <tr key={dateValueText}>
                  <td>{WEEKDAYS_LONG[date.getDay()]}</td>
                  <td>{date.toLocaleDateString('de-DE')}</td>
                  <td>{shift?.duty || ''}</td>
                  <td>{shift ? timeRange(shift.actualStart || shift.plannedStart, shift.actualEnd || shift.plannedEnd) : ''}</td>
                </tr>
              )
            })}
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
