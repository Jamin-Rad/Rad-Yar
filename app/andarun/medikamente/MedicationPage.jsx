'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import styles from './page.module.css'

const STORAGE_KEY = 'andarun-medications-cache-v1'
const PROFILE = { id: 'benjamin', name: 'بنیامین', initials: 'ب‌ز' }
const EMPTY_STATE = {
  version: 1,
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
  const date = dateFromKey(value)
  const text = new Intl.DateTimeFormat('fa-IR', {
    weekday: 'long', day: 'numeric', month: 'long',
  }).format(date)
  return withPrefix ? `امروز، ${text}` : text
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

function medicineDraft(medicine) {
  return medicine ? {
    ...medicine,
    times: [...medicine.times],
    weekdays: [...medicine.weekdays],
  } : {
    id: '', profileId: PROFILE.id, name: '', amount: '۱ عدد', note: '',
    times: ['08:00'], weekdays: [0, 1, 2, 3, 4, 5, 6], color: 'green',
  }
}

function normalizeState(value) {
  if (!value || typeof value !== 'object') return EMPTY_STATE
  return {
    ...EMPTY_STATE,
    ...value,
    medicines: Array.isArray(value.medicines) ? value.medicines : [],
    doseLogs: value.doseLogs && typeof value.doseLogs === 'object' ? value.doseLogs : {},
  }
}

function Icon({ name, size = 24 }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }
  if (name === 'plus') return <svg {...common}><path d="M12 5v14M5 12h14" /></svg>
  if (name === 'check') return <svg {...common}><path d="m5 12 4 4L19 6" /></svg>
  if (name === 'back') return <svg {...common}><path d="m15 18-6-6 6-6" /></svg>
  if (name === 'forward') return <svg {...common}><path d="m9 18 6-6-6-6" /></svg>
  if (name === 'close') return <svg {...common}><path d="M6 6l12 12M18 6 6 18" /></svg>
  if (name === 'edit') return <svg {...common}><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" /></svg>
  if (name === 'trash') return <svg {...common}><path d="M4 7h16M9 7V4h6v3M7 7l1 13h8l1-13M10 11v5M14 11v5" /></svg>
  if (name === 'clock') return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
  if (name === 'pill') return <svg {...common}><path d="M8.1 19.4a5 5 0 0 1-3.5-8.5l6.3-6.3a5 5 0 0 1 7.1 7.1L11.7 18a5 5 0 0 1-3.6 1.4Z" /><path d="m8.2 7.3 8.5 8.5" /></svg>
  if (name === 'home') return <svg {...common}><path d="m3 11 9-8 9 8" /><path d="M5 10v10h14V10M9 20v-6h6v6" /></svg>
  return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 8h.01M11 12h1v4h1" /></svg>
}

function DoseRow({ dose, taken, onToggle, onEdit, busy }) {
  return (
    <article className={`${styles.doseRow} ${taken ? styles.doseTaken : ''}`}>
      <div className={`${styles.doseMarker} ${styles[dose.medicine.color]}`}>
        {taken ? <Icon name="check" size={21} /> : <Icon name="clock" size={21} />}
      </div>
      <time className={styles.doseTime} dateTime={dose.time}>{formatTime(dose.time)}</time>
      <div className={styles.doseCopy}>
        <h3>{dose.medicine.name}</h3>
        <p>{dose.medicine.amount}{dose.medicine.note ? `، ${dose.medicine.note}` : ''}</p>
      </div>
      <button className={styles.editButton} type="button" onClick={() => onEdit(dose.medicine)} aria-label={`ویرایش ${dose.medicine.name}`}>
        <Icon name="edit" size={19} />
      </button>
      <button
        className={`${styles.takenButton} ${taken ? styles.takenButtonDone : ''}`}
        type="button"
        disabled={busy}
        aria-pressed={taken}
        onClick={() => onToggle(dose, !taken)}
      >
        <Icon name="check" size={20} />
        {taken ? 'خوردم' : 'خوردم'}
      </button>
    </article>
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

  function toggleWeekday(day) {
    const next = draft.weekdays.includes(day)
      ? draft.weekdays.filter(item => item !== day)
      : [...draft.weekdays, day]
    update('weekdays', next)
  }

  function submit(event) {
    event.preventDefault()
    if (!draft.name.trim()) return setError('نام دارو را وارد کن.')
    if (!draft.times.length || draft.times.some(time => !time)) return setError('حداقل یک زمان مصرف لازم است.')
    if (!draft.weekdays.length) return setError('حداقل یک روز را انتخاب کن.')
    setError('')
    onSave(draft)
  }

  return (
    <div className={styles.modalBackdrop} role="presentation" onMouseDown={event => event.target === event.currentTarget && onClose()}>
      <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="medicine-modal-title" dir="rtl">
        <div className={styles.modalHead}>
          <div>
            <h2 id="medicine-modal-title">{medicine ? 'ویرایش دارو' : 'افزودن دارو'}</h2>
            <p>برنامه مصرف را وارد کن</p>
          </div>
          <button className={styles.iconButton} type="button" onClick={onClose} aria-label="بستن">
            <Icon name="close" />
          </button>
        </div>

        <form onSubmit={submit} className={styles.form}>
          <label className={styles.field}>
            <span>نام دارو</span>
            <div className={styles.inputWrap}>
              <Icon name="pill" size={21} />
              <input ref={titleRef} value={draft.name} onChange={event => update('name', event.target.value)} placeholder="مثلاً متفورمین ۵۰۰" maxLength={100} />
            </div>
          </label>

          <div className={styles.fieldGrid}>
            <label className={styles.field}>
              <span>مقدار</span>
              <input value={draft.amount} onChange={event => update('amount', event.target.value)} placeholder="۱ عدد" maxLength={80} />
            </label>
            <label className={styles.field}>
              <span>توضیح کوتاه</span>
              <input value={draft.note} onChange={event => update('note', event.target.value)} placeholder="مثلاً بعد از صبحانه" maxLength={180} />
            </label>
          </div>

          <fieldset className={styles.fieldset}>
            <legend>زمان مصرف</legend>
            <div className={styles.timeList}>
              {draft.times.map((time, index) => (
                <div className={styles.timeRow} key={`${index}-${time}`}>
                  <Icon name="clock" size={21} />
                  <input dir="ltr" type="time" value={time} onChange={event => update('times', draft.times.map((item, itemIndex) => itemIndex === index ? event.target.value : item))} />
                  {draft.times.length > 1 ? (
                    <button type="button" onClick={() => update('times', draft.times.filter((_, itemIndex) => itemIndex !== index))} aria-label="حذف این زمان">
                      <Icon name="close" size={18} />
                    </button>
                  ) : null}
                </div>
              ))}
              {draft.times.length < 8 ? (
                <button className={styles.addTime} type="button" onClick={() => update('times', [...draft.times, '20:00'])}>
                  <Icon name="plus" size={18} /> زمان دیگر
                </button>
              ) : null}
            </div>
          </fieldset>

          <fieldset className={styles.fieldset}>
            <legend>روزهای مصرف</legend>
            <div className={styles.weekdayPicker}>
              {WEEKDAY_OPTIONS.map(day => {
                const selected = draft.weekdays.includes(day.value)
                return (
                  <button key={day.value} type="button" className={selected ? styles.weekdaySelected : ''} aria-pressed={selected} title={day.full} onClick={() => toggleWeekday(day.value)}>
                    {selected ? <Icon name="check" size={17} /> : null}<span>{day.short}</span>
                  </button>
                )
              })}
            </div>
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
            {medicine ? (
              <button className={styles.deleteButton} type="button" onClick={() => onDelete(medicine)} disabled={saving}>
                <Icon name="trash" size={19} /> حذف
              </button>
            ) : null}
          </div>
        </form>
      </section>
    </div>
  )
}

export default function MedicationPage() {
  const today = useMemo(() => dateKey(new Date()), [])
  const [selectedDate, setSelectedDate] = useState(today)
  const [data, setData] = useState(EMPTY_STATE)
  const [loading, setLoading] = useState(true)
  const [offline, setOffline] = useState(false)
  const [modal, setModal] = useState(null)
  const [saving, setSaving] = useState(false)
  const [busyDose, setBusyDose] = useState('')
  const [toast, setToast] = useState('')

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
    const timer = window.setTimeout(() => setToast(''), 2600)
    return () => window.clearTimeout(timer)
  }, [toast])

  const doses = useMemo(() => {
    const weekday = dateFromKey(selectedDate).getDay()
    return data.medicines
      .filter(medicine => medicine.profileId === PROFILE.id && medicine.weekdays.includes(weekday))
      .flatMap(medicine => medicine.times.map(time => ({ medicine, time, key: `${selectedDate}:${medicine.id}:${time}` })))
      .sort((a, b) => a.time.localeCompare(b.time))
  }, [data.medicines, selectedDate])

  const takenCount = doses.reduce((count, dose) => count + (data.doseLogs[dose.key] ? 1 : 0), 0)
  const progress = doses.length ? Math.round((takenCount / doses.length) * 100) : 0

  const week = useMemo(() => {
    const days = []
    let total = 0
    let taken = 0
    for (let index = 6; index >= 0; index -= 1) {
      const key = shiftDate(today, -index)
      const date = dateFromKey(key)
      const scheduled = data.medicines.flatMap(medicine => medicine.weekdays.includes(date.getDay())
        ? medicine.times.map(time => `${key}:${medicine.id}:${time}`)
        : [])
      const completed = scheduled.filter(item => data.doseLogs[item]).length
      total += scheduled.length
      taken += completed
      days.push({
        key,
        label: new Intl.DateTimeFormat('fa-IR', { weekday: 'narrow' }).format(date),
        complete: scheduled.length > 0 && completed === scheduled.length,
        partial: completed > 0 && completed < scheduled.length,
        empty: scheduled.length === 0,
      })
    }
    return { days, percentage: total ? Math.round((taken / total) * 100) : 0 }
  }, [data.doseLogs, data.medicines, today])

  const tomorrowDoses = useMemo(() => {
    const tomorrow = shiftDate(today, 1)
    const weekday = dateFromKey(tomorrow).getDay()
    return data.medicines
      .filter(medicine => medicine.weekdays.includes(weekday))
      .flatMap(medicine => medicine.times.map(time => ({ medicine, time })))
      .sort((a, b) => a.time.localeCompare(b.time))
      .slice(0, 3)
  }, [data.medicines, today])

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
    const medicine = { ...draft, id: draft.id || crypto.randomUUID() }
    const optimistic = { ...data, medicines: [medicine, ...data.medicines.filter(item => item.id !== medicine.id)] }
    try {
      const next = await postAction({ action: 'saveMedicine', medicine }, optimistic)
      setData(next)
      setModal(null)
      setToast(draft.id ? 'تغییرات ذخیره شد.' : 'دارو به برنامه اضافه شد.')
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
    if (taken) {
      doseLogs[dose.key] = { medicineId: dose.medicine.id, profileId: PROFILE.id, date: selectedDate, time: dose.time, takenAt: new Date().toISOString() }
    } else {
      delete doseLogs[dose.key]
    }
    const optimistic = { ...data, doseLogs }
    setData(optimistic)
    setBusyDose(dose.key)
    try {
      const next = await postAction({ action: 'toggleDose', medicineId: dose.medicine.id, date: selectedDate, time: dose.time, taken }, optimistic)
      setData(next)
      setToast(taken ? 'آفرین، این نوبت ثبت شد.' : 'ثبت این نوبت برداشته شد.')
    } catch (error) {
      setData(previous)
      setToast(error.message)
    } finally {
      setBusyDose('')
    }
  }

  const isToday = selectedDate === today

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
          <button className={styles.addButton} type="button" onClick={() => setModal({ type: 'new' })}>
            <Icon name="plus" size={24} /> افزودن دارو
          </button>
          <div className={styles.summaryArt} aria-hidden="true">
            <Image src="/andarun/medikamente/health-still-life.png" alt="" fill sizes="(max-width: 700px) 0px, 300px" priority />
          </div>
        </section>

        <div className={styles.dashboard}>
          <section className={styles.schedule} aria-labelledby="schedule-title">
            <div className={styles.scheduleHead}>
              <div>
                <h2 id="schedule-title">{isToday ? 'برنامه امروز' : formatPersianDate(selectedDate)}</h2>
              </div>
              <div className={styles.dateNav}>
                <button type="button" onClick={() => setSelectedDate(value => shiftDate(value, -1))} aria-label="روز قبل"><Icon name="forward" size={20} /></button>
                {!isToday ? <button className={styles.todayButton} type="button" onClick={() => setSelectedDate(today)}>امروز</button> : null}
                <button type="button" onClick={() => setSelectedDate(value => shiftDate(value, 1))} aria-label="روز بعد"><Icon name="back" size={20} /></button>
              </div>
            </div>

            <div className={styles.progressBlock}>
              <div className={styles.progressCopy}>
                <strong>{doses.length ? `${toPersianNumber(takenCount)} از ${toPersianNumber(doses.length)} نوبت انجام شده` : 'هنوز نوبتی در برنامه نیست'}</strong>
                <span>{progress === 100 && doses.length ? 'برنامه امروز کامل شد؛ عالی بود.' : 'هر نوبت را بعد از مصرف ثبت کن.'}</span>
              </div>
              <div className={styles.progressRing} style={{ '--progress': `${progress * 3.6}deg` }}><span>{toPersianNumber(progress)}٪</span></div>
            </div>

            {loading ? (
              <div className={styles.loadingList} aria-label="در حال بارگذاری"><span /><span /><span /></div>
            ) : doses.length ? (
              <div className={styles.doseList}>
                {doses.map(dose => (
                  <DoseRow
                    key={dose.key}
                    dose={dose}
                    taken={Boolean(data.doseLogs[dose.key])}
                    busy={busyDose === dose.key}
                    onToggle={toggleDose}
                    onEdit={medicine => setModal({ type: 'edit', medicine })}
                  />
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <span className={styles.emptyIcon}><Icon name="pill" size={34} /></span>
                <div>
                  <h3>{data.medicines.length ? 'برای این روز دارویی نداری' : 'اولین دارویت را اضافه کن'}</h3>
                  <p>{data.medicines.length ? 'یک روز سبک و آرام در پیش داری.' : 'نام، زمان و روزهای مصرف را وارد کن؛ بقیه‌اش فقط یک لمس است.'}</p>
                </div>
                {!data.medicines.length ? <button type="button" onClick={() => setModal({ type: 'new' })}>افزودن اولین دارو</button> : null}
              </div>
            )}
          </section>

          <aside className={styles.aside}>
            <section className={styles.weekCard} aria-labelledby="week-title">
              <div className={styles.weekHead}>
                <div><p>این هفته</p><h2 id="week-title">{toPersianNumber(week.percentage)}٪</h2></div>
                <div className={styles.miniChart} aria-hidden="true">
                  {[35, 56, 48, 76, 62, 91].map((height, index) => <span key={index} style={{ height: `${height}%` }} />)}
                </div>
              </div>
              <p className={styles.weekCaption}>{data.medicines.length ? 'پایبندی به برنامه مصرف' : 'با ثبت نوبت‌ها، روند هفتگی اینجا دیده می‌شود.'}</p>
              <div className={styles.weekDays}>
                {week.days.map(day => (
                  <div key={day.key}>
                    <span className={`${day.complete ? styles.dayComplete : ''} ${day.partial ? styles.dayPartial : ''} ${day.empty ? styles.dayEmpty : ''}`}>
                      {day.complete ? <Icon name="check" size={16} /> : null}
                    </span>
                    <small>{day.label}</small>
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.tomorrowCard} aria-labelledby="tomorrow-title">
              <div className={styles.tomorrowHead}>
                <div><p>یک نگاه جلوتر</p><h2 id="tomorrow-title">فردا</h2></div>
                <button type="button" onClick={() => setSelectedDate(shiftDate(today, 1))}>دیدن برنامه</button>
              </div>
              {tomorrowDoses.length ? (
                <div className={styles.tomorrowList}>
                  {tomorrowDoses.map(item => (
                    <div key={`${item.medicine.id}-${item.time}`}>
                      <span className={`${styles.smallMarker} ${styles[item.medicine.color]}`}><Icon name="pill" size={17} /></span>
                      <strong>{item.medicine.name}</strong>
                      <time>{formatTime(item.time)}</time>
                    </div>
                  ))}
                </div>
              ) : <p className={styles.tomorrowEmpty}>برای فردا نوبتی ثبت نشده است.</p>}
            </section>

            <blockquote className={styles.quote}>قدم‌های کوچک، سلامتی بزرگ می‌سازند.</blockquote>
          </aside>
        </div>
      </div>

      {modal ? (
        <MedicineModal
          medicine={modal.type === 'edit' ? modal.medicine : null}
          onClose={() => setModal(null)}
          onSave={saveMedicine}
          onDelete={deleteMedicine}
          saving={saving}
        />
      ) : null}
      {toast ? <div className={styles.toast} role="status">{toast}</div> : null}
    </main>
  )
}
