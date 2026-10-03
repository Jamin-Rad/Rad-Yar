'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { MEDICATION_CATEGORIES, findMedicationById, searchMedicationCatalog } from '@/lib/medicationCatalog'
import {
  ROUTINE_BY_VALUE,
  ROUTINE_OPTIONS,
  evaluateTimingByLocalTime,
  legacyDoseLogKey,
  normalizeMedicationSchedules,
  scheduleLogKey,
  scheduleToleranceMinutes,
  timeToMinutes,
} from '@/lib/medicationSchedule'
import styles from './page.module.css'

const STORAGE_KEY = 'andarun-medications-cache-v1'
const PROFILE = { id: 'benjamin', name: 'بنیامین', initials: 'ب‌ز' }
const EVERY_DAY = [0, 1, 2, 3, 4, 5, 6]
const EMPTY_STATE = { version: 3, profiles: [PROFILE], activeProfileId: PROFILE.id, medicines: [], doseLogs: {} }

function pad(value) { return String(value).padStart(2, '0') }
function dateKey(date) { return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` }
function dateFromKey(value) { const [year, month, day] = value.split('-').map(Number); return new Date(year, month - 1, day) }
function shiftDate(value, amount) { const next = dateFromKey(value); next.setDate(next.getDate() + amount); return dateKey(next) }

function formatPersianDate(value, withPrefix = false) {
  const text = new Intl.DateTimeFormat('fa-IR', { weekday: 'long', day: 'numeric', month: 'long' }).format(dateFromKey(value))
  return withPrefix ? `امروز، ${text}` : text
}

function formatWeekRange(start, end) {
  const formatter = new Intl.DateTimeFormat('fa-IR', { day: 'numeric', month: 'long' })
  return `${formatter.format(dateFromKey(start))} تا ${formatter.format(dateFromKey(end))}`
}

function toPersianNumber(value) { return new Intl.NumberFormat('fa-IR', { useGrouping: false }).format(value) }
function formatTime(value) {
  if (!value) return ''
  const [hour, minute] = value.split(':').map(Number)
  return `${toPersianNumber(hour).padStart(2, '۰')}:${toPersianNumber(minute).padStart(2, '۰')}`
}
function localTime(date) { return `${pad(date.getHours())}:${pad(date.getMinutes())}` }

function createSchedule(type = 'exact', routine = '') {
  const id = globalThis.crypto?.randomUUID?.() || `schedule-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
  const routineValue = type === 'routine' && ROUTINE_BY_VALUE[routine] ? routine : ''
  return { id, type, routine: routineValue, time: routineValue ? ROUTINE_BY_VALUE[routineValue].defaultTime : '08:00' }
}

function addMinutes(time, minutes) {
  const total = ((timeToMinutes(time) || 0) + minutes) % 1440
  return `${pad(Math.floor(total / 60))}:${pad(total % 60)}`
}

function generateExactSchedules(count, firstTime, current = []) {
  const safeCount = Math.min(4, Math.max(1, Number(count) || 1))
  const step = safeCount === 1 ? 0 : Math.round(720 / (safeCount - 1))
  return Array.from({ length: safeCount }, (_, index) => ({
    ...(current[index] || createSchedule('exact')),
    type: 'exact',
    routine: '',
    time: index === 0 ? firstTime : addMinutes(firstTime, step * index),
  }))
}

function normalizeMedicine(medicine) {
  return {
    ...medicine,
    dose: medicine?.dose || medicine?.amount || 'دوز ثبت نشده',
    category: medicine?.category || 'other',
    drugCatalogId: medicine?.drugCatalogId || '',
    genericNameFa: medicine?.genericNameFa || medicine?.name || '',
    genericNameEn: medicine?.genericNameEn || '',
    schedules: normalizeMedicationSchedules(medicine),
    weekdays: Array.isArray(medicine?.weekdays) && medicine.weekdays.length ? medicine.weekdays : EVERY_DAY,
  }
}

function medicineDraft(medicine) {
  if (medicine) {
    const normalized = normalizeMedicine(medicine)
    return { ...normalized, schedules: normalized.schedules.map(schedule => ({ ...schedule })), weekdays: [...normalized.weekdays] }
  }
  return {
    id: '', profileId: PROFILE.id, name: '', dose: '', category: 'other',
    drugCatalogId: '', genericNameFa: '', genericNameEn: '', schedules: [createSchedule('exact')], weekdays: EVERY_DAY,
  }
}

function normalizeState(value) {
  if (!value || typeof value !== 'object') return EMPTY_STATE
  return {
    ...EMPTY_STATE,
    ...value,
    version: 3,
    medicines: Array.isArray(value.medicines) ? value.medicines.map(normalizeMedicine) : [],
    doseLogs: value.doseLogs && typeof value.doseLogs === 'object' ? value.doseLogs : {},
  }
}

function getDoseLog(doseLogs, date, medicineId, schedule) {
  return doseLogs[scheduleLogKey(date, medicineId, schedule)] || doseLogs[legacyDoseLogKey(date, medicineId, schedule)] || null
}

function timingStatusForLog(schedule, log) {
  if (!log) return null
  if (['onTime', 'early', 'late'].includes(log.timingStatus)) return log.timingStatus
  const takenTime = log.takenLocalTime || (log.takenAt ? localTime(new Date(log.takenAt)) : '')
  return evaluateTimingByLocalTime(schedule, takenTime).timingStatus
}

function medicineStartDate(medicine) {
  if (!medicine?.createdAt) return null
  const createdAt = new Date(medicine.createdAt)
  return Number.isNaN(createdAt.getTime()) ? null : dateKey(createdAt)
}

function buildWeekSummary(data, today, clock) {
  const todayDate = dateFromKey(today)
  const daysSinceSaturday = (todayDate.getDay() - 6 + 7) % 7
  const start = shiftDate(today, -daysSinceSaturday)
  const end = shiftDate(start, 6)
  const nowMinutes = (clock.getHours() * 60) + clock.getMinutes()
  const medicineStats = new Map()
  let totalDue = 0
  let completed = 0
  let onTime = 0

  const days = Array.from({ length: 7 }, (_, index) => {
    const key = shiftDate(start, index)
    const date = dateFromKey(key)
    const scheduledDoses = data.medicines
      .filter(medicine => {
        const startsOn = medicineStartDate(medicine)
        return medicine.profileId === PROFILE.id && medicine.weekdays.includes(date.getDay()) && (!startsOn || key >= startsOn)
      })
      .flatMap(medicine => medicine.schedules.map(schedule => ({ medicine, schedule })))
    let dayDue = 0
    let dayCompleted = 0

    scheduledDoses.forEach(({ medicine, schedule }) => {
      const log = getDoseLog(data.doseLogs, key, medicine.id, schedule)
      const due = Boolean(log) || key < today || (key === today && (timeToMinutes(schedule.time) + scheduleToleranceMinutes(schedule)) <= nowMinutes)
      if (!due) return
      dayDue += 1
      totalDue += 1
      const stats = medicineStats.get(medicine.id) || { medicine, due: 0, completed: 0, onTime: 0 }
      stats.due += 1
      if (log) {
        dayCompleted += 1
        completed += 1
        stats.completed += 1
        if (timingStatusForLog(schedule, log) === 'onTime') { onTime += 1; stats.onTime += 1 }
      }
      medicineStats.set(medicine.id, stats)
    })

    return {
      key,
      label: new Intl.DateTimeFormat('fa-IR', { weekday: 'narrow' }).format(date),
      dayNumber: new Intl.DateTimeFormat('fa-IR', { day: 'numeric' }).format(date),
      complete: dayDue > 0 && dayCompleted === dayDue,
      partial: dayCompleted > 0 && dayCompleted < dayDue,
      missed: dayDue > 0 && dayCompleted === 0,
      future: key > today || (key === today && dayDue === 0),
      empty: scheduledDoses.length === 0,
    }
  })

  const irregular = [...medicineStats.values()].find(stats => {
    if (stats.due < 3) return false
    const completionRate = stats.completed / stats.due
    const punctualityRate = stats.completed ? stats.onTime / stats.completed : 0
    return completionRate < 0.75 || punctualityRate < 0.6
  })

  let message = 'آفرین، این هفته همه‌چی طبق برنامه بوده!'
  let tone = 'success'
  if (irregular) {
    message = `حواست باشد «${irregular.medicine.name}» را این هفته نامنظم مصرف کرده‌ای.`
    tone = 'warning'
  } else if (totalDue > 0 && completed < totalDue) {
    message = `${toPersianNumber(totalDue - completed)} نوبت ثبت‌نشده داری؛ هنوز می‌توانی ادامهٔ هفته را منظم‌تر پیش ببری.`
    tone = 'warning'
  } else if (completed > 0 && onTime < Math.ceil(completed * 0.8)) {
    message = 'نوبت‌های موعدرسیده ثبت شده‌اند؛ ساعت مصرف کمی منظم‌تر شود بهتر است.'
    tone = 'neutral'
  }

  return { start, end, days, totalDue, completed, percentage: totalDue ? Math.round((completed / totalDue) * 100) : 100, message, tone }
}

function routineIconName(value) {
  if (value === 'fasting') return 'sunrise'
  if (value === 'bedtime') return 'moon'
  return 'meal'
}

function doseGroupLabel(schedule) {
  if (schedule.type === 'routine') return ROUTINE_BY_VALUE[schedule.routine]?.label || 'وعده یا روتین'
  return `ساعت ${formatTime(schedule.time)}`
}

function buildDoseGroups(doses) {
  const groups = new Map()
  doses.forEach(dose => {
    const key = dose.schedule.type === 'routine' ? `routine:${dose.schedule.routine}` : `time:${dose.schedule.time}`
    const group = groups.get(key) || {
      key,
      label: doseGroupLabel(dose.schedule),
      time: dose.schedule.time,
      icon: dose.schedule.type === 'routine' ? routineIconName(dose.schedule.routine) : 'clock',
      doses: [],
    }
    group.doses.push(dose)
    groups.set(key, group)
  })
  return [...groups.values()].sort((a, b) => a.time.localeCompare(b.time))
}

function Icon({ name, size = 24 }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }
  if (name === 'plus') return <svg {...common}><path d="M12 5v14M5 12h14" /></svg>
  if (name === 'check') return <svg {...common}><path d="m5 12 4 4L19 6" /></svg>
  if (name === 'close') return <svg {...common}><path d="M6 6l12 12M18 6 6 18" /></svg>
  if (name === 'edit') return <svg {...common}><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" /></svg>
  if (name === 'trash') return <svg {...common}><path d="M4 7h16M9 7V4h6v3M7 7l1 13h8l1-13M10 11v5M14 11v5" /></svg>
  if (name === 'clock') return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
  if (name === 'pill') return <svg {...common}><path d="M8.1 19.4a5 5 0 0 1-3.5-8.5l6.3-6.3a5 5 0 0 1 7.1 7.1L11.7 18a5 5 0 0 1-3.6 1.4Z" /><path d="m8.2 7.3 8.5 8.5" /></svg>
  if (name === 'home') return <svg {...common}><path d="m3 11 9-8 9 8" /><path d="M5 10v10h14V10M9 20v-6h6v6" /></svg>
  if (name === 'meal') return <svg {...common}><path d="M7 3v8M4 3v5a3 3 0 0 0 6 0V3M7 11v10M16 3v18M16 3c3 2 4 6 4 9h-4" /></svg>
  if (name === 'sunrise') return <svg {...common}><path d="M4 18h16M6 14a6 6 0 0 1 12 0M12 3v3M4.9 7.2l2.1 2.1M19.1 7.2 17 9.3" /></svg>
  if (name === 'moon') return <svg {...common}><path d="M20 15.2A8.5 8.5 0 0 1 8.8 4a8.5 8.5 0 1 0 11.2 11.2Z" /></svg>
  if (name === 'search') return <svg {...common}><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>
  if (name === 'chevron') return <svg {...common}><path d="m8 10 4 4 4-4" /></svg>
  return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 8h.01M11 12h1v4h1" /></svg>
}

function MedicationTile({ dose, log, onToggle, onEdit, busy }) {
  const taken = Boolean(log)
  const timingStatus = timingStatusForLog(dose.schedule, log)
  const timingLabel = timingStatus === 'onTime' ? 'به‌موقع' : timingStatus === 'early' ? 'زودتر از بازه' : timingStatus === 'late' ? 'دیرتر از بازه' : ''
  return (
    <article className={`${styles.medicationTile} ${taken ? styles.medicationTileTaken : ''}`}>
      <button className={styles.tileToggle} type="button" disabled={busy} aria-pressed={taken} aria-label={`${dose.medicine.name}، ${dose.medicine.dose}${taken ? `، ثبت شده${timingLabel ? `، ${timingLabel}` : ''}` : '، برای ثبت مصرف لمس کن'}`} onClick={() => onToggle(dose, !taken)}>
        <span className={styles.tileCheck}>{taken ? <Icon name="check" size={20} /> : null}</span>
        <strong>{dose.medicine.name}</strong>
        <small>{dose.medicine.dose}</small>
      </button>
      <button className={styles.tileEdit} type="button" onClick={() => onEdit(dose.medicine)} aria-label={`ویرایش ${dose.medicine.name}`}><Icon name="edit" size={15} /></button>
    </article>
  )
}

function ExactTimingEditor({ schedules, onChange }) {
  const [showFrequency, setShowFrequency] = useState(schedules.length > 2)
  const exactSchedules = schedules.length ? schedules : [createSchedule('exact')]
  const firstTime = exactSchedules[0].time

  function setCount(count) {
    onChange(generateExactSchedules(count, firstTime, exactSchedules))
    if (count > 2) setShowFrequency(true)
  }
  function updateTime(index, time) { onChange(exactSchedules.map((schedule, itemIndex) => itemIndex === index ? { ...schedule, time } : schedule)) }

  return (
    <div className={styles.expandedTiming}>
      <label className={styles.timeField}><span>ساعت اول</span><div><Icon name="clock" size={19} /><input dir="ltr" type="time" value={firstTime} onChange={event => onChange(generateExactSchedules(exactSchedules.length, event.target.value, exactSchedules))} /></div></label>
      <div className={styles.timingActions}>
        <button type="button" className={exactSchedules.length === 2 ? styles.timingActionActive : ''} onClick={() => setCount(2)}><Icon name="plus" size={18} /> ساعت دوم</button>
        <button type="button" className={exactSchedules.length > 2 ? styles.timingActionActive : ''} onClick={() => setShowFrequency(value => !value)}>چند بار در روز <Icon name="chevron" size={18} /></button>
      </div>
      {showFrequency ? <div className={styles.frequencyChoices}>{[1, 2, 3, 4].map(count => <button key={count} type="button" className={exactSchedules.length === count ? styles.frequencyChoiceActive : ''} onClick={() => setCount(count)}>{toPersianNumber(count)} بار</button>)}</div> : null}
      {exactSchedules.length > 1 ? (
        <div className={styles.generatedTimes}>
          <div className={styles.generatedTimesHead}><strong>ساعت‌های مصرف</strong><span>خودکار تنظیم شد؛ قابل ویرایش است</span></div>
          <div className={styles.generatedTimeGrid}>{exactSchedules.map((schedule, index) => <label key={schedule.id}><span>نوبت {toPersianNumber(index + 1)}</span><input dir="ltr" type="time" value={schedule.time} onChange={event => updateTime(index, event.target.value)} /></label>)}</div>
        </div>
      ) : null}
    </div>
  )
}

function RoutineTimingEditor({ schedules, onChange }) {
  const routineSchedules = schedules.filter(schedule => schedule.type === 'routine')
  function toggleRoutine(option) {
    const existing = routineSchedules.find(schedule => schedule.routine === option.value)
    if (existing) {
      if (routineSchedules.length === 1) return
      onChange(routineSchedules.filter(schedule => schedule.id !== existing.id))
    } else onChange([...routineSchedules, createSchedule('routine', option.value)])
  }
  function updateTime(id, time) { onChange(routineSchedules.map(schedule => schedule.id === id ? { ...schedule, time } : schedule)) }
  return (
    <div className={styles.expandedTiming}>
      <div className={styles.routineChoices}>{ROUTINE_OPTIONS.map(option => {
        const selected = routineSchedules.some(schedule => schedule.routine === option.value)
        return <button key={option.value} type="button" className={selected ? styles.routineChoiceActive : ''} aria-pressed={selected} onClick={() => toggleRoutine(option)}><Icon name={routineIconName(option.value)} size={20} /><span>{option.label}</span></button>
      })}</div>
      <div className={styles.routineTimes}>{routineSchedules.map(schedule => <label key={schedule.id}><span>{ROUTINE_BY_VALUE[schedule.routine]?.label}</span><input dir="ltr" type="time" value={schedule.time} onChange={event => updateTime(schedule.id, event.target.value)} /></label>)}</div>
    </div>
  )
}

function TimingEditor({ schedules, onChange }) {
  const routineMode = schedules.length > 0 && schedules.every(schedule => schedule.type === 'routine')
  return (
    <div className={styles.timingEditor}>
      <section className={`${styles.timingSection} ${!routineMode ? styles.timingSectionOpen : ''}`}>
        <button className={styles.timingSectionButton} type="button" aria-expanded={!routineMode} onClick={() => routineMode && onChange([createSchedule('exact')])}><span><Icon name="clock" size={21} /><strong>ساعت دقیق</strong></span><Icon name="chevron" size={20} /></button>
        {!routineMode ? <ExactTimingEditor schedules={schedules} onChange={onChange} /> : null}
      </section>
      <section className={`${styles.timingSection} ${routineMode ? styles.timingSectionOpen : ''}`}>
        <button className={styles.timingSectionButton} type="button" aria-expanded={routineMode} onClick={() => !routineMode && onChange([createSchedule('routine', 'breakfast')])}>
          <span><Icon name="meal" size={21} /><span><strong>وعده یا روتین</strong><small>ناشتا، صبحانه، ناهار، شام یا قبل از خواب</small></span></span><Icon name="chevron" size={20} />
        </button>
        {routineMode ? <RoutineTimingEditor schedules={schedules} onChange={onChange} /> : null}
      </section>
    </div>
  )
}

function MedicineModal({ medicine, onClose, onSave, onDelete, saving }) {
  const [draft, setDraft] = useState(() => medicineDraft(medicine))
  const [error, setError] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const titleRef = useRef(null)
  const selectedDrug = findMedicationById(draft.drugCatalogId)
  const suggestions = useMemo(() => searchMedicationCatalog(draft.name), [draft.name])

  useEffect(() => {
    titleRef.current?.focus()
    const closeOnEscape = event => event.key === 'Escape' && onClose()
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [onClose])

  function update(field, value) { setDraft(current => ({ ...current, [field]: value })) }
  function updateName(value) {
    const stillSelected = selectedDrug && (value === selectedDrug.fa || value === selectedDrug.en)
    setDraft(current => ({ ...current, name: value, ...(stillSelected ? {} : { drugCatalogId: '', genericNameFa: '', genericNameEn: '', category: 'other' }) }))
    setSearchOpen(true)
  }
  function selectDrug(drug) {
    setDraft(current => ({ ...current, name: drug.fa, dose: drug.doses[0] || current.dose, drugCatalogId: drug.id, genericNameFa: drug.fa, genericNameEn: drug.en, category: drug.category }))
    setSearchOpen(false)
  }
  function submit(event) {
    event.preventDefault()
    if (!draft.name.trim()) return setError('نام دارو را وارد کن.')
    if (!draft.dose.trim()) return setError('دوز دارو را وارد کن.')
    if (!draft.schedules.length || draft.schedules.some(schedule => !schedule.time)) return setError('حداقل یک زمان معتبر لازم است.')
    setError('')
    onSave(draft)
  }

  return (
    <div className={styles.modalBackdrop} role="presentation" onMouseDown={event => event.target === event.currentTarget && onClose()}>
      <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="medicine-modal-title" dir="rtl">
        <div className={styles.sheetHandle} aria-hidden="true" />
        <div className={styles.modalHead}><div><h2 id="medicine-modal-title">{medicine ? 'ویرایش دارو' : 'افزودن دارو'}</h2><p>نام، دوز و زمان مصرف را ثبت کن.</p></div><button className={styles.iconButton} type="button" onClick={onClose} aria-label="بستن"><Icon name="close" /></button></div>
        <form onSubmit={submit} className={styles.form}>
          <label className={styles.field}>
            <span>نام دارو</span>
            <div className={styles.drugSearch}>
              <Icon name="search" size={21} />
              <input ref={titleRef} role="combobox" aria-expanded={searchOpen && suggestions.length > 0} aria-controls="drug-suggestions" autoComplete="off" value={draft.name} onFocus={() => setSearchOpen(true)} onChange={event => updateName(event.target.value)} placeholder="نام فارسی یا انگلیسی" maxLength={100} />
              {draft.name ? <button type="button" onClick={() => updateName('')} aria-label="پاک‌کردن نام"><Icon name="close" size={17} /></button> : null}
              {searchOpen && suggestions.length ? (
                <div className={styles.drugSuggestions} id="drug-suggestions" role="listbox">{suggestions.map(drug => (
                  <button key={drug.id} type="button" role="option" aria-selected={drug.id === draft.drugCatalogId} onMouseDown={event => event.preventDefault()} onClick={() => selectDrug(drug)}><span><strong>{drug.fa}</strong><small lang="en" dir="ltr">{drug.en}</small></span><em>{MEDICATION_CATEGORIES[drug.category]?.fa}</em></button>
                ))}</div>
              ) : null}
            </div>
            {draft.name && !selectedDrug && searchOpen && !suggestions.length ? <small className={styles.freeEntryHint}>در بانک پیدا نشد؛ همین نام به‌صورت دستی ذخیره می‌شود.</small> : null}
          </label>
          <fieldset className={styles.fieldset}>
            <legend>دوز</legend>
            {selectedDrug ? <div className={styles.doseChoices}>{selectedDrug.doses.map(dose => <button key={dose} type="button" className={draft.dose === dose ? styles.doseChoiceActive : ''} aria-pressed={draft.dose === dose} onClick={() => update('dose', dose)}>{dose}</button>)}</div> : null}
            <input className={styles.doseInput} value={draft.dose} onChange={event => update('dose', event.target.value)} placeholder={selectedDrug ? 'یا دوز دلخواه' : 'مثلاً ۵۰ میلی‌گرم'} maxLength={80} />
            {selectedDrug ? <p className={styles.categoryNote}>دسته: {MEDICATION_CATEGORIES[selectedDrug.category]?.fa}</p> : null}
          </fieldset>
          <fieldset className={styles.fieldset}><legend>زمان مصرف</legend><TimingEditor schedules={draft.schedules} onChange={value => update('schedules', value)} /></fieldset>
          {error ? <p className={styles.formError} role="alert">{error}</p> : null}
          <div className={styles.formActions}>
            <button className={styles.saveButton} type="submit" disabled={saving}>{saving ? 'در حال ذخیره…' : 'ذخیره دارو'}</button>
            <button className={styles.cancelButton} type="button" onClick={onClose}>انصراف</button>
            {medicine ? <button className={styles.deleteButton} type="button" onClick={() => onDelete(medicine)} disabled={saving}><Icon name="trash" size={18} /> حذف</button> : null}
          </div>
        </form>
      </section>
    </div>
  )
}

export default function MedicationPage() {
  const [clock, setClock] = useState(() => new Date())
  const [data, setData] = useState(EMPTY_STATE)
  const [loading, setLoading] = useState(true)
  const [offline, setOffline] = useState(false)
  const [modal, setModal] = useState(null)
  const [saving, setSaving] = useState(false)
  const [busyDose, setBusyDose] = useState('')
  const [toast, setToast] = useState('')
  const today = dateKey(clock)

  useEffect(() => { const timer = window.setInterval(() => setClock(new Date()), 60_000); return () => window.clearInterval(timer) }, [])
  useEffect(() => {
    let ignore = false
    async function load() {
      try {
        const response = await fetch('/api/andarun/medications', { cache: 'no-store' })
        if (!response.ok) throw new Error('server unavailable')
        const next = normalizeState(await response.json())
        if (!ignore) { setData(next); localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) }
      } catch {
        const cached = localStorage.getItem(STORAGE_KEY)
        if (!ignore && cached) { try { setData(normalizeState(JSON.parse(cached))) } catch { /* keep empty state */ } }
        if (!ignore) setOffline(true)
      } finally { if (!ignore) setLoading(false) }
    }
    load()
    return () => { ignore = true }
  }, [])
  useEffect(() => { if (!loading) localStorage.setItem(STORAGE_KEY, JSON.stringify(data)) }, [data, loading])
  useEffect(() => { if (!toast) return undefined; const timer = window.setTimeout(() => setToast(''), 3200); return () => window.clearTimeout(timer) }, [toast])

  const doses = useMemo(() => {
    const weekday = dateFromKey(today).getDay()
    return data.medicines
      .filter(medicine => medicine.profileId === PROFILE.id && medicine.weekdays.includes(weekday))
      .flatMap(medicine => medicine.schedules.map(schedule => ({ medicine, schedule, key: scheduleLogKey(today, medicine.id, schedule) })))
      .sort((a, b) => a.schedule.time.localeCompare(b.schedule.time))
  }, [data.medicines, today])
  const groups = useMemo(() => buildDoseGroups(doses), [doses])
  const takenCount = doses.reduce((count, dose) => count + (getDoseLog(data.doseLogs, today, dose.medicine.id, dose.schedule) ? 1 : 0), 0)
  const week = useMemo(() => buildWeekSummary(data, today, clock), [clock, data, today])

  async function postAction(payload, fallbackState) {
    if (offline) return fallbackState
    const response = await fetch('/api/andarun/medications', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    const result = await response.json()
    if (!response.ok) throw new Error(result.error || 'ذخیره انجام نشد.')
    return normalizeState(result)
  }

  async function saveMedicine(draft) {
    setSaving(true)
    const medicine = normalizeMedicine({ ...draft, id: draft.id || crypto.randomUUID(), createdAt: draft.createdAt || new Date().toISOString() })
    const optimistic = { ...data, version: 3, medicines: [medicine, ...data.medicines.filter(item => item.id !== medicine.id)] }
    try {
      const next = await postAction({ action: 'saveMedicine', medicine }, optimistic)
      setData(next); setModal(null); setToast(draft.id ? 'تغییرات ذخیره شد.' : 'دارو به برنامه اضافه شد.')
    } catch (error) { setToast(error.message) } finally { setSaving(false) }
  }

  async function deleteMedicine(medicine) {
    if (!window.confirm(`«${medicine.name}» از برنامه حذف شود؟`)) return
    setSaving(true)
    const doseLogs = Object.fromEntries(Object.entries(data.doseLogs).filter(([, entry]) => entry.medicineId !== medicine.id))
    const optimistic = { ...data, medicines: data.medicines.filter(item => item.id !== medicine.id), doseLogs }
    try {
      const next = await postAction({ action: 'deleteMedicine', id: medicine.id }, optimistic)
      setData(next); setModal(null); setToast('دارو از برنامه حذف شد.')
    } catch (error) { setToast(error.message) } finally { setSaving(false) }
  }

  async function toggleDose(dose, taken) {
    const previous = data
    const doseLogs = { ...data.doseLogs }
    const key = scheduleLogKey(today, dose.medicine.id, dose.schedule)
    const oldKey = legacyDoseLogKey(today, dose.medicine.id, dose.schedule)
    const takenAt = new Date()
    const takenLocalTime = localTime(takenAt)
    const timing = evaluateTimingByLocalTime(dose.schedule, takenLocalTime)
    if (taken) {
      doseLogs[key] = { medicineId: dose.medicine.id, profileId: PROFILE.id, date: today, time: dose.schedule.time, scheduleId: dose.schedule.id, takenAt: takenAt.toISOString(), takenLocalTime, ...timing }
      if (oldKey !== key) delete doseLogs[oldKey]
    } else { delete doseLogs[key]; delete doseLogs[oldKey] }
    const optimistic = { ...data, doseLogs }
    setData(optimistic); setBusyDose(key)
    try {
      const next = await postAction({ action: 'toggleDose', medicineId: dose.medicine.id, scheduleId: dose.schedule.id, date: today, time: dose.schedule.time, taken, takenLocalTime }, optimistic)
      setData(next)
      if (!taken) setToast('ثبت این نوبت برداشته شد.')
      else if (timing.timingStatus === 'onTime') setToast('آفرین، این نوبت به‌موقع ثبت شد.')
      else if (timing.timingStatus === 'early') setToast('ثبت شد؛ این نوبت کمی زودتر مصرف شده.')
      else setToast('ثبت شد؛ این نوبت کمی دیرتر مصرف شده.')
    } catch (error) { setData(previous); setToast(error.message) } finally { setBusyDose('') }
  }

  return (
    <main className={styles.page} dir="rtl">
      <header className={styles.topbar}>
        <Link className={styles.brand} href="/andarun/medikamente" aria-label="داروی من"><span className={styles.brandMark} aria-hidden="true"><span /><span /></span><strong>داروی من</strong></Link>
        <div className={styles.topbarActions}><Link className={styles.homeLink} href="/andarun"><Icon name="home" size={20} /> اندرون</Link><span className={styles.avatar} aria-label="پروفایل بنیامین">{PROFILE.initials}</span></div>
      </header>
      <div className={styles.shell}>
        {offline ? <div className={styles.offlineNotice}>حالت آفلاین؛ تغییرات فعلاً روی همین دستگاه نگه‌داری می‌شود.</div> : null}
        <section className={styles.summary} aria-labelledby="greeting-title"><div className={styles.summaryCopy}><h1 id="greeting-title">سلام {PROFILE.name}</h1><p>{formatPersianDate(today, true)}</p></div><button className={styles.addButton} type="button" onClick={() => setModal({ type: 'new' })}><Icon name="plus" size={22} /> افزودن دارو</button></section>
        <div className={styles.dashboard}>
          <section className={styles.schedule} aria-labelledby="schedule-title">
            <div className={styles.scheduleHead}><div><h2 id="schedule-title">برنامه امروز</h2><p>برای ثبت مصرف، روی دارو بزن.</p></div><span>{doses.length ? `${toPersianNumber(takenCount)} از ${toPersianNumber(doses.length)}` : 'بدون نوبت'}</span></div>
            {loading ? <div className={styles.loadingList} aria-label="در حال بارگذاری"><span /><span /></div> : groups.length ? (
              <div className={styles.doseGroups}>{groups.map(group => (
                <section className={styles.doseGroup} key={group.key}><h3><Icon name={group.icon} size={20} />{group.label}</h3><div className={styles.doseGrid}>{group.doses.map(dose => <MedicationTile key={dose.key} dose={dose} log={getDoseLog(data.doseLogs, today, dose.medicine.id, dose.schedule)} busy={busyDose === dose.key} onToggle={toggleDose} onEdit={medicine => setModal({ type: 'edit', medicine })} />)}</div></section>
              ))}</div>
            ) : <div className={styles.emptyState}><span><Icon name="pill" size={29} /></span><div><h3>{data.medicines.length ? 'امروز نوبت دارویی نداری' : 'برنامهٔ امروز هنوز خالی است'}</h3><p>{data.medicines.length ? 'داروی امروزت تمام شده است.' : 'از جعبهٔ پایین صفحه اولین دارویت را اضافه کن.'}</p></div></div>}
          </section>
          <aside className={styles.aside}><section className={styles.weekCard} aria-labelledby="week-title">
            <div className={styles.weekHead}><div><h2 id="week-title">این هفته</h2><p>{formatWeekRange(week.start, week.end)}</p></div><strong>{toPersianNumber(week.percentage)}٪</strong></div>
            <div className={styles.weekProgress} aria-label={`${week.percentage} درصد`}><span style={{ width: `${week.percentage}%` }} /></div>
            <p className={`${styles.weekMessage} ${week.tone === 'warning' ? styles.weekMessage_warning : week.tone === 'neutral' ? styles.weekMessage_neutral : ''}`}>{week.message}</p>
            <div className={styles.weekDays}>{week.days.map(day => <div key={day.key}><small>{day.label}</small><span className={`${day.complete ? styles.dayComplete : ''} ${day.partial ? styles.dayPartial : ''} ${day.missed ? styles.dayMissed : ''} ${day.future ? styles.dayFuture : ''} ${day.empty ? styles.dayEmpty : ''}`}>{day.complete ? <Icon name="check" size={15} /> : day.dayNumber}</span></div>)}</div>
          </section></aside>
        </div>
        <section className={styles.mobileAddSection} aria-label="افزودن دارو"><button type="button" onClick={() => setModal({ type: 'new' })}><span><Icon name="plus" size={32} /></span><strong>افزودن دارو</strong><small>داروی تازه ثبت کن</small></button></section>
      </div>
      {modal ? <MedicineModal medicine={modal.type === 'edit' ? modal.medicine : null} onClose={() => setModal(null)} onSave={saveMedicine} onDelete={deleteMedicine} saving={saving} /> : null}
      {toast ? <div className={styles.toast} role="status">{toast}</div> : null}
    </main>
  )
}
