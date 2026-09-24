'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { formatWorkHours, summarizeTimerModalities } from './findingTimerSummary'
import styles from './page.module.css'

const NAME = 'Hamed Zia'
const WEEKDAYS_LONG = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']
const MONTHS = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']
const MODALITIES = ['Röntgen', 'CT', 'MRT']
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
  { id: 'F', label: 'Fortbildung', short: 'Fortbildung' },
  { id: 'TZ', label: 'Teilzeitarbeit', short: 'Teilzeit' },
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
  return shift?.model === 'U' || shift?.model === 'K' || shift?.model === 'F' || shift?.model === 'TZ'
}

function absenceLabel(model) {
  if (model === 'K') return 'Krank'
  if (model === 'F') return 'Fortbildung'
  if (model === 'TZ') return 'Teilzeitarbeit'
  return 'Urlaub'
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
  if (type === 'F') return { duty: 'Fortbildung', plannedStart: '', plannedEnd: '' }
  if (type === 'TZ') return { duty: 'Teilzeitarbeit', plannedStart: '', plannedEnd: '' }
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

function timerCreatedAfterNightCutoff(timer) {
  const created = timer?.createdAt ? new Date(timer.createdAt) : null
  return created && !Number.isNaN(created.getTime()) && created.getHours() >= 21
}

function findingTimerServiceDate(nowMs, shifts, findingTimers) {
  const now = new Date(nowMs)
  const currentDate = dateValue(now)
  const hour = now.getHours()

  if (hour >= 21) return currentDate
  if (hour >= 12) return currentDate

  const previousDate = previousDateValue(currentDate)
  const previousWasNightShift = shifts.some(shift => shift.date === previousDate && isNightShift(shift))
  const previousHasNightTimers = findingTimers.some(timer => timer.date === previousDate && timerCreatedAfterNightCutoff(timer))

  return previousWasNightShift || previousHasNightTimers ? previousDate : currentDate
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

function timerEditForm(timer) {
  const totalSeconds = Math.max(0, Math.round(Number(timer?.durationMs || 0) / 1000))
  return {
    date: timer?.date || todayValue(),
    modality: MODALITIES.includes(timer?.modality) ? timer.modality : 'Röntgen',
    count: String(Math.max(1, Number(timer?.count) || 1)),
    minutes: String(Math.floor(totalSeconds / 60)),
    seconds: String(totalSeconds % 60),
  }
}

export default function WorkPage({ showHomeLink = true, view = 'all' }) {
  const showShifts = view !== 'findings'
  const showFindings = view !== 'shifts'
  const [month, setMonth] = useState(monthValue())
  const [shifts, setShifts] = useState([])
  const [findingTimers, setFindingTimers] = useState([])
  const [selectedDate, setSelectedDate] = useState(todayValue())
  const [shiftForm, setShiftForm] = useState(emptyShift(todayValue()))
  const [rangeEndDate, setRangeEndDate] = useState(todayValue())
  const [timerForm, setTimerForm] = useState(EMPTY_TIMER_FORM)
  const [timerElapsed, setTimerElapsed] = useState(0)
  const [timerStartedAt, setTimerStartedAt] = useState(null)
  const [timerNow, setTimerNow] = useState(Date.now())
  const [timerAddedMessage, setTimerAddedMessage] = useState('')
  const [timerHistoryOpen, setTimerHistoryOpen] = useState(false)
  const [timerDayModal, setTimerDayModal] = useState(null)
  const [editingTimerId, setEditingTimerId] = useState(null)
  const [timerEdit, setTimerEdit] = useState(null)
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
  async function loadAll() {
    setLoading(true)
    try {
      const data = await apiRequest('/')
      const loadedShifts = (data.shifts || []).map(normalizeShift)
      setShifts(loadedShifts)
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
      assignment: isAbsenceShift({ model }) ? '' : prev.assignment,
    }))
  }

  async function saveShift(event) {
    event.preventDefault()
    try {
      const isAbsence = isAbsenceShift(shiftForm)
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
  const activeTimerDate = findingTimerServiceDate(timerNow, shifts, findingTimers)
  const todayTimers = useMemo(
    () => findingTimers.filter(timer => timer.date === activeTimerDate),
    [findingTimers, activeTimerDate],
  )
  const timerStats = useMemo(() => summarizeTimerModalities(todayTimers, MODALITIES), [todayTimers])
  const todayWorkMs = timerStats.reduce((sum, stat) => sum + stat.totalMs, 0)
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
    const cursor = parseDate(activeTimerDate)
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
  }, [findingTimers, activeTimerDate])
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
    const previousElapsed = timerElapsed
    const previousForm = timerForm
    const durationMs = timerElapsed + (timerStartedAt ? now - timerStartedAt : 0)
    if (durationMs < 1000) {
      setMessage('Timer ist noch zu kurz.')
      return
    }
    setTimerElapsed(0)
    setTimerStartedAt(null)
    setTimerNow(now)
    setTimerForm(prev => ({ ...prev, count: 1 }))
    setMessage('Befundzeit wird gespeichert...')
    try {
      const timer = {
        ...timerForm,
        id: `finding-timer-${now}`,
        count: timerCount,
        date: findingTimerServiceDate(now, shifts, findingTimers),
        examArea: '',
        durationMs,
        createdAt: new Date(now).toISOString(),
      }
      const data = await apiRequest('/', 'POST', { type: 'findingTimer', timer })
      setFindingTimers(data.findingTimers || [])
      setMessage('Befundzeit gespeichert.')
    } catch (error) {
      setTimerElapsed(durationMs || previousElapsed)
      setTimerStartedAt(null)
      setTimerNow(now)
      setTimerForm(previousForm)
      setMessage(error.message)
    }
  }

  async function deleteFindingTimer(id) {
    try {
      const data = await apiRequest(`/?type=findingTimer&id=${encodeURIComponent(id)}`, 'DELETE')
      setFindingTimers(data.findingTimers || [])
      if (editingTimerId === id) {
        setEditingTimerId(null)
        setTimerEdit(null)
      }
    } catch (error) {
      setMessage(error.message)
    }
  }

  function startEditFindingTimer(timer) {
    setEditingTimerId(timer.id)
    setTimerEdit(timerEditForm(timer))
  }

  function cancelEditFindingTimer() {
    setEditingTimerId(null)
    setTimerEdit(null)
  }

  function adjustTimerEdit(field, delta, min, max = Infinity) {
    setTimerEdit(prev => {
      if (!prev) return prev
      const current = Number(prev[field])
      const next = Math.min(max, Math.max(min, (Number.isFinite(current) ? current : min) + delta))
      return { ...prev, [field]: String(next) }
    })
  }

  async function saveEditedFindingTimer(timer) {
    if (!timerEdit) return
    const minutes = Number(timerEdit.minutes)
    const seconds = Number(timerEdit.seconds)
    const count = Number(timerEdit.count)
    const durationMs = ((Number.isFinite(minutes) ? minutes : 0) * 60 + (Number.isFinite(seconds) ? seconds : 0)) * 1000
    if (!timerEdit.date || !timerEdit.modality || durationMs < 1000 || !Number.isFinite(count) || count < 1) {
      setMessage('Bitte Dauer, Datum, Modalität und Befundzahl korrekt ausfüllen.')
      return
    }
    try {
      const data = await apiRequest('/', 'POST', {
        type: 'findingTimer',
        timer: {
          ...timer,
          date: timerEdit.date,
          modality: timerEdit.modality,
          count,
          durationMs,
        },
      })
      setFindingTimers(data.findingTimers || [])
      setEditingTimerId(null)
      setTimerEdit(null)
      setMessage('Befundzeit aktualisiert.')
    } catch (error) {
      setMessage(error.message)
    }
  }

  function printMonth() {
    window.print()
  }

  return (
    <main className={`${styles.page} ${showFindings && !showShifts ? styles.findingsPage : ''}`}>
      <header className={styles.header}>
        {showHomeLink ? <Link href="/andarun" className={styles.back}>← Andarun</Link> : <span />}
        <div>
          <span className={styles.kicker}>{showFindings && !showShifts ? 'Befunde' : 'Dienstplanung'}</span>
          <h1>{showFindings && !showShifts ? 'Befunde' : 'Dienstzeiten'}</h1>
        </div>
        {showShifts ? <button className={styles.printBtn} type="button" onClick={printMonth}>PDF drucken</button> : (
          <nav className={styles.findingsTabs} aria-label="Befunde Bereiche">
            <span className={styles.findingsTabActive} aria-current="page">Befundtimer</span>
            <Link className={styles.findingsTab} href="/andarun/befunde/kontrolle">Befundkontrolle <span aria-hidden="true">↗</span></Link>
          </nav>
        )}
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
              const hasPartTime = absences.some(absence => absence.model === 'TZ')
              const isNight = isNightShift(shift)
              const isWeekendDayShift = shift?.model === 'BD' && (day.weekday === 0 || day.weekday === 6)
              const isFree = isWeekendFree || isPostNightFree || hasPartTime
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
                          className={
                            absence.model === 'K'
                              ? styles.absenceSick
                              : absence.model === 'F'
                                ? styles.absenceTraining
                                : absence.model === 'TZ'
                                  ? styles.absencePartTime
                                  : styles.absenceVacation
                          }
                          key={absence.id}
                        >
                          {absenceLabel(absence.model)}
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

          {isAbsenceShift(shiftForm) && (
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

          {!isAbsenceShift(shiftForm) && (
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
                  {absenceLabel(absence.model)} ×
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
                  <span className={styles.iconPlay} aria-hidden="true" /><span>Start</span>
                </button>
                <button type="button" onClick={pauseFindingTimer} disabled={!timerRunning} aria-label="Timer halten">
                  <span className={styles.iconPause} aria-hidden="true" /><span>Pause</span>
                </button>
                <button type="button" onClick={resetFindingTimer} disabled={!timerDisplayMs} aria-label="Timer zurücksetzen">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5" /></svg><span>Reset</span>
                </button>
                <button type="button" onClick={finishFindingTimer} disabled={!timerDisplayMs} aria-label="Befundzeit speichern">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h13l3 3v13H4zM8 4v6h8V4M8 20v-7h8v7" /></svg><span>Speichern</span>
                </button>
              </div>
            </div>

            <div className={styles.timerStatsCard}>
              <button className={styles.timerStatsHeader} type="button" onClick={() => setTimerHistoryOpen(true)}>
                <span className={styles.timerStatsDate}><span className={styles.kicker}>Diensttag {shortDateLabel(activeTimerDate)}</span><strong>Arbeitszeit: {formatWorkHours(todayWorkMs)}</strong></span>
                <em>Befundzeiten ansehen</em>
              </button>
              <div className={styles.timerStatsGrid}>
                {timerStats.map(stat => (
                  <button type="button" key={stat.modality} onClick={() => setTimerDayModal(stat.modality)}>
                    <strong>{stat.modality}</strong>
                    <span>{stat.count} Befund{stat.count === 1 ? '' : 'e'}</span>
                    <span className={styles.timerStatTimes}><em>Ø {stat.avg ? formatTimerDuration(stat.avg) : '--:--'}</em><small>Gesamt {formatTimerDuration(stat.totalMs)}</small></span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

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
                  <span className={styles.kicker}>Diensttag {shortDateLabel(activeTimerDate)}</span>
                  <h3 id="timer-day-title">{timerDayModal} Befunde</h3>
                </div>
                <button type="button" onClick={() => setTimerDayModal(null)} aria-label="Fenster schließen">×</button>
              </div>
              <div className={styles.timerDayList}>
                {timerDayItems.map(timer => (
                  <div className={styles.timerDayItem} key={timer.id}>
                    <div className={styles.timerDayRow}>
                      <strong>{formatTimerDuration(timer.durationMs)}</strong>
                      <span>×{Number(timer.count) || 1}</span>
                      <em>{formatTimerDuration(Number(timer.durationMs || 0) / (Number(timer.count) || 1))} Ø</em>
                      <small>{new Date(timer.createdAt || `${timer.date}T12:00:00`).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}</small>
                      <div className={styles.timerDayActions}>
                        <button type="button" onClick={() => startEditFindingTimer(timer)}>Bearbeiten</button>
                        <button type="button" onClick={() => deleteFindingTimer(timer.id)}>Löschen</button>
                      </div>
                    </div>
                    {editingTimerId === timer.id && timerEdit && (
                      <div className={styles.timerEditPanel}>
                        <label>Modalität
                          <select value={timerEdit.modality} onChange={event => setTimerEdit(prev => ({ ...prev, modality: event.target.value }))}>
                            {MODALITIES.map(modality => <option key={modality}>{modality}</option>)}
                          </select>
                        </label>
                        <label>Datum
                          <input type="date" value={timerEdit.date} onChange={event => setTimerEdit(prev => ({ ...prev, date: event.target.value }))} />
                        </label>
                        <div className={styles.timerEditStepper}>
                          <span>Minuten</span>
                          <button type="button" onClick={() => adjustTimerEdit('minutes', -1, 0)} aria-label="Eine Minute weniger">−</button>
                          <strong>{timerEdit.minutes}</strong>
                          <button type="button" onClick={() => adjustTimerEdit('minutes', 1, 0)} aria-label="Eine Minute mehr">+</button>
                        </div>
                        <div className={styles.timerEditStepper}>
                          <span>Sekunden</span>
                          <button type="button" onClick={() => adjustTimerEdit('seconds', -5, 0, 59)} aria-label="Fünf Sekunden weniger">−</button>
                          <strong>{String(timerEdit.seconds).padStart(2, '0')}</strong>
                          <button type="button" onClick={() => adjustTimerEdit('seconds', 5, 0, 59)} aria-label="Fünf Sekunden mehr">+</button>
                        </div>
                        <div className={styles.timerEditStepper}>
                          <span>Befunde</span>
                          <button type="button" onClick={() => adjustTimerEdit('count', -1, 1, 20)} aria-label="Ein Befund weniger">−</button>
                          <strong>×{timerEdit.count}</strong>
                          <button type="button" onClick={() => adjustTimerEdit('count', 1, 1, 20)} aria-label="Ein Befund mehr">+</button>
                        </div>
                        <div className={styles.timerEditActions}>
                          <button type="button" onClick={() => saveEditedFindingTimer(timer)}>Speichern</button>
                          <button type="button" onClick={cancelEditFindingTimer}>Abbrechen</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {!timerDayItems.length && <p>Noch keine {timerDayModal}-Befunde für diesen Diensttag.</p>}
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
