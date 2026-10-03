'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
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
const EMPTY_STATE = {
  version: 2,
  profiles: [PROFILE],
  activeProfileId: PROFILE.id,
  medicines: [],
  doseLogs: {},
}
const WEEKDAY_OPTIONS = [
  { value: 6, short: 'ش', full: 'شنبه' },
  { value: 0, short: 'ی', full: 'یکشنبه' },
  { value: 1, short: 'د', full: 'دوشنبه' },
  { value: 2, short: 'س', full: 'سه‌شنبه' },
  { value: 3, short: 'چ', full: 'چهارشنبه' },
  { value: 4, short: 'پ', full: 'پنجشنبه' },
  { value: 5, short: 'ج', full: 'جمعه' },
]
const COLOR_OPTIONS = [
  { value: 'green', label: 'سبز' },
  { value: 'blue', label: 'آبی' },
  { value: 'apricot', label: 'هلویی' },
]
const EVERY_DAY = [0, 1, 2, 3, 4, 5, 6]

function pad(value) {
  return String(value).padStart(2, '0')
}

function dateKey(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

function dateFromKey(value) {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day)
}

function shiftDate(value, amount) {
  const next = dateFromKey(value)
  next.setDate(next.getDate() + amount)
  return dateKey(next)
}

function formatPersianDate(value, withPrefix = false) {
  const text = new Intl.DateTimeFormat('fa-IR', {
    weekday: 'long', day: 'numeric', month: 'long',
  }).format(dateFromKey(value))
  return withPrefix ? `امروز، ${text}` : text
}

function formatWeekRange(start, end) {
  const formatter = new Intl.DateTimeFormat('fa-IR', { day: 'numeric', month: 'long' })
  return `${formatter.format(dateFromKey(start))} تا ${formatter.format(dateFromKey(end))}`
}

function toPersianNumber(value) {
  return new Intl.NumberFormat('fa-IR', { useGrouping: false }).format(value)
}

function formatTime(value) {
  if (!value) return ''
  const [hour, minute] = value.split(':').map(Number)
  const period = hour < 12 ? 'صبح' : hour < 18 ? 'ظهر' : 'شب'
  const hour12 = hour % 12 || 12
  return `${toPersianNumber(hour12)}:${toPersianNumber(minute).padStart(2, '۰')} ${period}`
}

function localTime(date) {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`
}

function createSchedule(type = 'routine', routine = 'breakfast') {
  const id = globalThis.crypto?.randomUUID?.() || `schedule-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
  return {
    id,
    type,
    routine: type === 'routine' ? routine : '',
    time: type === 'routine' ? ROUTINE_BY_VALUE[routine].defaultTime : '08:00',
  }
}

function normalizeMedicine(medicine) {
  return {
    ...medicine,
    schedules: normalizeMedicationSchedules(medicine),
    weekdays: Array.isArray(medicine?.weekdays) && medicine.weekdays.length ? medicine.weekdays : EVERY_DAY,
  }
}

function medicineDraft(medicine) {
  return medicine ? {
    ...normalizeMedicine(medicine),
    schedules: normalizeMedicationSchedules(medicine).map(schedule => ({ ...schedule })),
    weekdays: [...normalizeMedicine(medicine).weekdays],
  } : {
    id: '', profileId: PROFILE.id, name: '', amount: '۱ عدد', note: '',
    schedules: [createSchedule()], weekdays: EVERY_DAY, color: 'green',
  }
}

function normalizeState(value) {
  if (!value || typeof value !== 'object') return EMPTY_STATE
  return {
    ...EMPTY_STATE,
    ...value,
    version: 2,
    medicines: Array.isArray(value.medicines) ? value.medicines.map(normalizeMedicine) : [],
    doseLogs: value.doseLogs && typeof value.doseLogs === 'object' ? value.doseLogs : {},
  }
}

function getDoseLog(doseLogs, date, medicineId, schedule) {
  return doseLogs[scheduleLogKey(date, medicineId, schedule)]
    || doseLogs[legacyDoseLogKey(date, medicineId, schedule)]
    || null
}

function timingStatusForLog(schedule, log) {
  if (!log) return null
  if (['onTime', 'early', 'late'].includes(log.timingStatus)) return log.timingStatus
  const takenTime = log.takenLocalTime || (log.takenAt ? localTime(new Date(log.takenAt)) : '')
  return evaluateTimingByLocalTime(schedule, takenTime).timingStatus
}

function scheduleDescription(schedule) {
  if (schedule.type === 'routine') {
    return `${ROUTINE_BY_VALUE[schedule.routine]?.label || 'وعده یا روتین'} · ${formatTime(schedule.time)}`
  }
  return `ساعت دقیق · ${formatTime(schedule.time)}`
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
        return medicine.profileId === PROFILE.id
          && medicine.weekdays.includes(date.getDay())
          && (!startsOn || key >= startsOn)
      })
      .flatMap(medicine => medicine.schedules.map(schedule => ({ medicine, schedule })))

    let dayDue = 0
    let dayCompleted = 0
    scheduledDoses.forEach(({ medicine, schedule }) => {
      const log = getDoseLog(data.doseLogs, key, medicine.id, schedule)
      const isPastDay = key < today
      const isDueToday = key === today && (timeToMinutes(schedule.time) + scheduleToleranceMinutes(schedule)) <= nowMinutes
      const due = Boolean(log) || isPastDay || isDueToday
      if (!due) return

      dayDue += 1
      totalDue += 1
      const stats = medicineStats.get(medicine.id) || { medicine, due: 0, completed: 0, onTime: 0 }
      stats.due += 1
      if (log) {
        dayCompleted += 1
        completed += 1
        stats.completed += 1
        if (timingStatusForLog(schedule, log) === 'onTime') {
          onTime += 1
          stats.onTime += 1
        }
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
    message = `حواست باشد «${irregular.medicine.name}» را این هفته نامنظم مصرف کرده‌ای؛ زمان‌های برنامه را دوباره بررسی کن.`
    tone = 'warning'
  } else if (totalDue > 0 && completed < totalDue) {
    message = `${toPersianNumber(totalDue - completed)} نوبت ثبت‌نشده داری؛ هنوز می‌توانی ادامهٔ هفته را منظم‌تر پیش ببری.`
    tone = 'warning'
  } else if (completed > 0 && onTime < Math.ceil(completed * 0.8)) {
    message = 'همهٔ نوبت‌ها ثبت شده‌اند؛ اگر ساعت مصرف ثابت‌تر باشد، برنامه منظم‌تر می‌شود.'
    tone = 'neutral'
  }

  return {
    start,
    end,
    days,
    totalDue,
    completed,
    percentage: totalDue ? Math.round((completed / totalDue) * 100) : 100,
    message,
    tone,
  }
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
  if (name === 'calendar') return <svg {...common}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></svg>
  return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 8h.01M11 12h1v4h1" /></svg>
}

function DoseRow({ dose, log, onToggle, onEdit, busy }) {
  const taken = Boolean(log)
  const timingStatus = timingStatusForLog(dose.schedule, log)
  const timingCopy = timingStatus === 'onTime' ? 'به‌موقع' : timingStatus === 'early' ? 'زودتر از بازه' : timingStatus === 'late' ? 'دیرتر از بازه' : ''

  return (
    <article className={`${styles.doseRow} ${taken ? styles.doseTaken : ''}`}>
      <div className={`${styles.doseMarker} ${styles[dose.medicine.color]}`}>
        {taken ? <Icon name="check" size={21} /> : <Icon name={dose.schedule.type === 'routine' ? 'meal' : 'clock'} size={21} />}
      </div>
      <div className={styles.doseCopy}>
        <h3>{dose.medicine.name}</h3>
        <p>{dose.medicine.amount}{dose.medicine.note ? `، ${dose.medicine.note}` : ''}</p>
        <span className={styles.scheduleDescription}>{scheduleDescription(dose.schedule)}</span>
      </div>
      <button className={styles.editButton} type="button" onClick={() => onEdit(dose.medicine)} aria-label={`ویرایش ${dose.medicine.name}`}>
        <Icon name="edit" size={19} />
      </button>
      <div className={styles.doseAction}>
        {taken && timingCopy ? <span className={`${styles.timingBadge} ${styles[`timing${timingStatus}`]}`}>{timingCopy}</span> : null}
        <button
          className={`${styles.takenButton} ${taken ? styles.takenButtonDone : ''}`}
          type="button"
          disabled={busy}
          aria-pressed={taken}
          onClick={() => onToggle(dose, !taken)}
        >
          <Icon name="check" size={20} />
          {taken ? 'ثبت شد' : 'خوردم'}
        </button>
      </div>
    </article>
  )
}

function ScheduleEditor({ schedules, onChange }) {
  function updateSchedule(id, patch) {
    onChange(schedules.map(schedule => schedule.id === id ? { ...schedule, ...patch } : schedule))
  }

  function setType(schedule, type) {
    if (type === 'routine') {
      const routine = schedule.routine || 'breakfast'
      updateSchedule(schedule.id, { type, routine, time: ROUTINE_BY_VALUE[routine].defaultTime })
    } else {
      updateSchedule(schedule.id, { type, routine: '', time: schedule.time || '08:00' })
    }
  }

  function setRoutine(schedule, routine) {
    updateSchedule(schedule.id, { routine, time: ROUTINE_BY_VALUE[routine].defaultTime })
  }

  return (
    <div className={styles.scheduleEditor}>
      {schedules.map((schedule, index) => (
        <section className={styles.scheduleForm} key={schedule.id} aria-label={`نوبت ${index + 1}`}>
          <div className={styles.scheduleFormHead}>
            <strong>نوبت {toPersianNumber(index + 1)}</strong>
            {schedules.length > 1 ? (
              <button type="button" onClick={() => onChange(schedules.filter(item => item.id !== schedule.id))}>حذف نوبت</button>
            ) : null}
          </div>

          <div className={styles.scheduleTypePicker}>
            <button type="button" className={schedule.type === 'exact' ? styles.optionSelected : ''} aria-pressed={schedule.type === 'exact'} onClick={() => setType(schedule, 'exact')}>
              <Icon name="clock" size={20} /><span><strong>ساعت دقیق</strong><small>مثلاً هر روز ساعت ۸</small></span>
            </button>
            <button type="button" className={schedule.type === 'routine' ? styles.optionSelected : ''} aria-pressed={schedule.type === 'routine'} onClick={() => setType(schedule, 'routine')}>
              <Icon name="meal" size={20} /><span><strong>وعده یا روتین</strong><small>مثل ناشتا یا همراه غذا</small></span>
            </button>
          </div>

          {schedule.type === 'routine' ? (
            <>
              <div className={styles.routineGrid}>
                {ROUTINE_OPTIONS.map(option => (
                  <button key={option.value} type="button" className={schedule.routine === option.value ? styles.routineSelected : ''} aria-pressed={schedule.routine === option.value} onClick={() => setRoutine(schedule, option.value)}>
                    <Icon name={option.value === 'fasting' ? 'sunrise' : 'meal'} size={21} />
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
              <label className={styles.approximateTime}>
                <span>زمان تقریبی</span>
                <div><Icon name="clock" size={20} /><input dir="ltr" type="time" value={schedule.time} onChange={event => updateSchedule(schedule.id, { time: event.target.value })} /></div>
                <small>برای بررسی به‌موقع بودن مصرف؛ این ساعت را مطابق برنامهٔ خودت تنظیم کن.</small>
              </label>
            </>
          ) : (
            <label className={styles.exactTime}>
              <span>ساعت مصرف</span>
              <div><Icon name="clock" size={20} /><input dir="ltr" type="time" value={schedule.time} onChange={event => updateSchedule(schedule.id, { time: event.target.value })} /></div>
              <small>تا ۴۵ دقیقه زودتر یا دیرتر، به‌موقع حساب می‌شود.</small>
            </label>
          )}
        </section>
      ))}
      {schedules.length < 8 ? (
        <button className={styles.addSchedule} type="button" onClick={() => onChange([...schedules, createSchedule('exact')])}>
          <Icon name="plus" size={19} /> نوبت دیگر
        </button>
      ) : null}
    </div>
  )
}

function MedicineModal({ medicine, onClose, onSave, onDelete, saving }) {
  const [draft, setDraft] = useState(() => medicineDraft(medicine))
  const [error, setError] = useState('')
  const titleRef = useRef(null)

  useEffect(() => {
    titleRef.current?.focus()
    const closeOnEscape = event => event.key === 'Escape' && onClose()
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [onClose])

  function update(field, value) {
    setDraft(current => ({ ...current, [field]: value }))
  }

  const frequency = draft.weekdays.length === EVERY_DAY.length ? 'daily' : 'custom'

  function setFrequency(nextFrequency) {
    update('weekdays', nextFrequency === 'daily' ? EVERY_DAY : [new Date().getDay()])
  }

  function toggleWeekday(day) {
    const selected = draft.weekdays.includes(day)
    const next = selected ? draft.weekdays.filter(item => item !== day) : [...draft.weekdays, day]
    update('weekdays', next)
  }

  function submit(event) {
    event.preventDefault()
    if (!draft.name.trim()) return setError('نام دارو را وارد کن.')
    if (!draft.schedules.length || draft.schedules.some(schedule => !schedule.time)) return setError('حداقل یک نوبت با زمان معتبر لازم است.')
    if (!draft.weekdays.length) return setError('حداقل یک روز را انتخاب کن.')
    setError('')
    onSave(draft)
  }

  return (
    <div className={styles.modalBackdrop} role="presentation" onMouseDown={event => event.target === event.currentTarget && onClose()}>
      <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="medicine-modal-title" dir="rtl">
        <div className={styles.sheetHandle} aria-hidden="true" />
        <div className={styles.modalHead}>
          <div>
            <h2 id="medicine-modal-title">{medicine ? 'ویرایش دارو' : 'افزودن دارو'}</h2>
            <p>زمان مصرف را طوری ثبت کن که با روزت هماهنگ باشد.</p>
          </div>
          <button className={styles.iconButton} type="button" onClick={onClose} aria-label="بستن"><Icon name="close" /></button>
        </div>

        <form onSubmit={submit} className={styles.form}>
          <div className={styles.fieldGrid}>
            <label className={styles.field}>
              <span>نام دارو</span>
              <div className={styles.inputWrap}><Icon name="pill" size={21} /><input ref={titleRef} value={draft.name} onChange={event => update('name', event.target.value)} placeholder="مثلاً لووتیروکسین" maxLength={100} /></div>
            </label>
            <label className={styles.field}>
              <span>مقدار</span>
              <input value={draft.amount} onChange={event => update('amount', event.target.value)} placeholder="مثلاً ۱ عدد" maxLength={80} />
            </label>
          </div>

          <label className={styles.field}>
            <span>توضیح کوتاه <small>(اختیاری)</small></span>
            <input value={draft.note} onChange={event => update('note', event.target.value)} placeholder="مثلاً با یک لیوان آب" maxLength={180} />
          </label>

          <fieldset className={styles.fieldset}>
            <legend>نوبت مصرف</legend>
            <ScheduleEditor schedules={draft.schedules} onChange={value => update('schedules', value)} />
          </fieldset>

          <fieldset className={styles.fieldset}>
            <legend>تکرار</legend>
            <div className={styles.frequencyPicker}>
              <button type="button" className={frequency === 'daily' ? styles.frequencySelected : ''} aria-pressed={frequency === 'daily'} onClick={() => setFrequency('daily')}>
                <Icon name="calendar" size={20} /><span><strong>هر روز</strong><small>تمام روزهای هفته</small></span>
              </button>
              <button type="button" className={frequency === 'custom' ? styles.frequencySelected : ''} aria-pressed={frequency === 'custom'} onClick={() => setFrequency('custom')}>
                <Icon name="calendar" size={20} /><span><strong>روزهای مشخص</strong><small>یک یا چند روز در هفته</small></span>
              </button>
            </div>
            {frequency === 'custom' ? (
              <div className={styles.weekdayChoice}>
                <span>روزهای مصرف</span>
                <div className={styles.weekdayPicker}>
                  {WEEKDAY_OPTIONS.map(day => {
                    const selected = draft.weekdays.includes(day.value)
                    return <button key={day.value} type="button" className={selected ? styles.weekdaySelected : ''} aria-pressed={selected} title={day.full} onClick={() => toggleWeekday(day.value)}><span>{day.short}</span></button>
                  })}
                </div>
              </div>
            ) : null}
          </fieldset>

          <fieldset className={styles.fieldset}>
            <legend>رنگ نشانه</legend>
            <div className={styles.colorPicker}>
              {COLOR_OPTIONS.map(color => (
                <button key={color.value} type="button" className={draft.color === color.value ? styles.colorSelected : ''} onClick={() => update('color', color.value)} aria-pressed={draft.color === color.value}>
                  <span className={`${styles.colorDot} ${styles[color.value]}`} />{color.label}
                </button>
              ))}
            </div>
          </fieldset>

          {error ? <p className={styles.formError} role="alert">{error}</p> : null}

          <div className={styles.formActions}>
            <button className={styles.saveButton} type="submit" disabled={saving}>{saving ? 'در حال ذخیره…' : 'ذخیره دارو'}</button>
            <button className={styles.cancelButton} type="button" onClick={onClose}>انصراف</button>
            {medicine ? <button className={styles.deleteButton} type="button" onClick={() => onDelete(medicine)} disabled={saving}><Icon name="trash" size={19} /> حذف</button> : null}
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

  useEffect(() => {
    const timer = window.setInterval(() => setClock(new Date()), 60_000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    let ignore = false
    async function load() {
      try {
        const response = await fetch('/api/andarun/medications', { cache: 'no-store' })
        if (!response.ok) throw new Error('server unavailable')
        const next = normalizeState(await response.json())
        if (!ignore) {
          setData(next)
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        }
      } catch {
        const cached = localStorage.getItem(STORAGE_KEY)
        if (!ignore && cached) {
          try { setData(normalizeState(JSON.parse(cached))) } catch { /* keep empty state */ }
        }
        if (!ignore) setOffline(true)
      } finally {
        if (!ignore) setLoading(false)
      }
    }
    load()
    return () => { ignore = true }
  }, [])

  useEffect(() => {
    if (!loading) localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data, loading])

  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(''), 3200)
    return () => window.clearTimeout(timer)
  }, [toast])

  const doses = useMemo(() => {
    const weekday = dateFromKey(today).getDay()
    return data.medicines
      .filter(medicine => medicine.profileId === PROFILE.id && medicine.weekdays.includes(weekday))
      .flatMap(medicine => medicine.schedules.map(schedule => ({
        medicine,
        schedule,
        key: scheduleLogKey(today, medicine.id, schedule),
      })))
      .sort((a, b) => a.schedule.time.localeCompare(b.schedule.time))
  }, [data.medicines, today])

  const takenCount = doses.reduce((count, dose) => count + (getDoseLog(data.doseLogs, today, dose.medicine.id, dose.schedule) ? 1 : 0), 0)
  const progress = doses.length ? Math.round((takenCount / doses.length) * 100) : 0
  const week = useMemo(() => buildWeekSummary(data, today, clock), [clock, data, today])

  async function postAction(payload, fallbackState) {
    if (offline) return fallbackState
    const response = await fetch('/api/andarun/medications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const result = await response.json()
    if (!response.ok) throw new Error(result.error || 'ذخیره انجام نشد.')
    return normalizeState(result)
  }

  async function saveMedicine(draft) {
    setSaving(true)
    const medicine = normalizeMedicine({
      ...draft,
      id: draft.id || crypto.randomUUID(),
      createdAt: draft.createdAt || new Date().toISOString(),
    })
    const optimistic = { ...data, medicines: [medicine, ...data.medicines.filter(item => item.id !== medicine.id)] }
    try {
      const next = await postAction({ action: 'saveMedicine', medicine }, optimistic)
      setData(next)
      setModal(null)
      setToast(draft.id ? 'تغییرات ذخیره شد.' : 'دارو به برنامهٔ امروز اضافه شد.')
    } catch (error) {
      setToast(error.message)
    } finally {
      setSaving(false)
    }
  }

  async function deleteMedicine(medicine) {
    if (!window.confirm(`«${medicine.name}» از برنامه حذف شود؟`)) return
    setSaving(true)
    const doseLogs = Object.fromEntries(Object.entries(data.doseLogs).filter(([, entry]) => entry.medicineId !== medicine.id))
    const optimistic = { ...data, medicines: data.medicines.filter(item => item.id !== medicine.id), doseLogs }
    try {
      const next = await postAction({ action: 'deleteMedicine', id: medicine.id }, optimistic)
      setData(next)
      setModal(null)
      setToast('دارو از برنامه حذف شد.')
    } catch (error) {
      setToast(error.message)
    } finally {
      setSaving(false)
    }
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
      doseLogs[key] = {
        medicineId: dose.medicine.id,
        profileId: PROFILE.id,
        date: today,
        time: dose.schedule.time,
        scheduleId: dose.schedule.id,
        takenAt: takenAt.toISOString(),
        takenLocalTime,
        ...timing,
      }
      if (oldKey !== key) delete doseLogs[oldKey]
    } else {
      delete doseLogs[key]
      delete doseLogs[oldKey]
    }
    const optimistic = { ...data, doseLogs }
    setData(optimistic)
    setBusyDose(key)
    try {
      const next = await postAction({
        action: 'toggleDose',
        medicineId: dose.medicine.id,
        scheduleId: dose.schedule.id,
        date: today,
        time: dose.schedule.time,
        taken,
        takenLocalTime,
      }, optimistic)
      setData(next)
      if (!taken) setToast('ثبت این نوبت برداشته شد.')
      else if (timing.timingStatus === 'onTime') setToast('آفرین، این نوبت به‌موقع ثبت شد.')
      else if (timing.timingStatus === 'early') setToast('ثبت شد؛ این نوبت زودتر از بازهٔ برنامه مصرف شده.')
      else setToast('ثبت شد؛ این نوبت دیرتر از بازهٔ برنامه مصرف شده.')
    } catch (error) {
      setData(previous)
      setToast(error.message)
    } finally {
      setBusyDose('')
    }
  }

  return (
    <main className={styles.page} dir="rtl">
      <header className={styles.topbar}>
        <Link className={styles.brand} href="/andarun/medikamente" aria-label="داروی من">
          <span className={styles.brandMark} aria-hidden="true"><span /><span /></span>
          <strong>داروی من</strong>
        </Link>
        <div className={styles.topbarActions}>
          <Link className={styles.homeLink} href="/andarun"><Icon name="home" size={20} /> اندرون</Link>
          <span className={styles.avatar} aria-label="پروفایل بنیامین">{PROFILE.initials}</span>
        </div>
      </header>

      <div className={styles.shell}>
        {offline ? <div className={styles.offlineNotice}>حالت آفلاین؛ تغییرات فعلاً روی همین دستگاه نگه‌داری می‌شود.</div> : null}

        <section className={styles.summary} aria-labelledby="greeting-title">
          <div className={styles.summaryCopy}>
            <h1 id="greeting-title">سلام {PROFILE.name}</h1>
            <p>{formatPersianDate(today, true)}</p>
          </div>
          <button className={styles.addButton} type="button" onClick={() => setModal({ type: 'new' })}><Icon name="plus" size={22} /> افزودن دارو</button>
        </section>

        <div className={styles.dashboard}>
          <section className={styles.schedule} aria-labelledby="schedule-title">
            <div className={styles.scheduleHead}>
              <div><h2 id="schedule-title">برنامه امروز</h2><p>فقط نوبت‌های امروز</p></div>
              <span className={styles.todayCount}>{doses.length ? `${toPersianNumber(takenCount)} از ${toPersianNumber(doses.length)}` : 'بدون نوبت'}</span>
            </div>

            <div className={styles.progressTrack} aria-label={`${progress} درصد برنامه امروز انجام شده`}><span style={{ width: `${progress}%` }} /></div>
            <p className={styles.progressMessage}>{progress === 100 && doses.length ? 'برنامه امروز کامل شد؛ عالی بود.' : doses.length ? 'بعد از مصرف، همان نوبت را ثبت کن.' : 'برای امروز هنوز دارویی در برنامه نیست.'}</p>

            {loading ? (
              <div className={styles.loadingList} aria-label="در حال بارگذاری"><span /><span /><span /></div>
            ) : doses.length ? (
              <div className={styles.doseList}>
                {doses.map(dose => (
                  <DoseRow
                    key={dose.key}
                    dose={dose}
                    log={getDoseLog(data.doseLogs, today, dose.medicine.id, dose.schedule)}
                    busy={busyDose === dose.key}
                    onToggle={toggleDose}
                    onEdit={medicine => setModal({ type: 'edit', medicine })}
                  />
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <span className={styles.emptyIcon}><Icon name="pill" size={31} /></span>
                <div><h3>{data.medicines.length ? 'امروز نوبت دارویی نداری' : 'برنامهٔ امروز هنوز خالی است'}</h3><p>{data.medicines.length ? 'روز آرامی داری؛ برنامهٔ هفته همچنان پایین صفحه دیده می‌شود.' : 'اولین دارویت را با ساعت دقیق یا وعدهٔ روزانه ثبت کن.'}</p></div>
              </div>
            )}

            <button className={styles.mobileAddTile} type="button" onClick={() => setModal({ type: 'new' })}>
              <span><Icon name="plus" size={30} /></span><strong>افزودن دارو</strong><small>یک نوبت تازه بساز</small>
            </button>
          </section>

          <aside className={styles.aside}>
            <section className={styles.weekCard} aria-labelledby="week-title">
              <div className={styles.weekHead}>
                <div><h2 id="week-title">این هفته</h2><p>{formatWeekRange(week.start, week.end)}</p></div>
                <strong>{toPersianNumber(week.percentage)}٪</strong>
              </div>
              <div className={`${styles.weekInsight} ${styles[`weekInsight_${week.tone}`]}`}>
                <span><Icon name={week.tone === 'warning' ? 'info' : 'check'} size={19} /></span>
                <p>{week.message}</p>
              </div>
              {week.totalDue ? <p className={styles.weekMeta}>{toPersianNumber(week.completed)} از {toPersianNumber(week.totalDue)} نوبتِ رسیده ثبت شده است.</p> : <p className={styles.weekMeta}>هر وقت دارویی اضافه کنی، نظم مصرفش اینجا بررسی می‌شود.</p>}
              <div className={styles.weekDays}>
                {week.days.map(day => (
                  <div key={day.key}>
                    <small>{day.label}</small>
                    <span className={`${day.complete ? styles.dayComplete : ''} ${day.partial ? styles.dayPartial : ''} ${day.missed ? styles.dayMissed : ''} ${day.future ? styles.dayFuture : ''} ${day.empty ? styles.dayEmpty : ''}`}>
                      {day.complete ? <Icon name="check" size={15} /> : day.dayNumber}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>

      {modal ? <MedicineModal medicine={modal.type === 'edit' ? modal.medicine : null} onClose={() => setModal(null)} onSave={saveMedicine} onDelete={deleteMedicine} saving={saving} /> : null}
      {toast ? <div className={styles.toast} role="status">{toast}</div> : null}
    </main>
  )
}
