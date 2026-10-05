import { NextResponse } from 'next/server'
import { requireAndarunSession } from '@/lib/andarunPasswordAuth'
import { requireMamanSession } from '@/lib/mamanAuth'
import { MEDICATION_CATEGORIES, findMedicationById } from '@/lib/medicationCatalog'
import { isSupabaseAdminConfigured, supabaseAdmin } from '@/lib/supabase/server'
import {
  evaluateTimingByLocalTime,
  isValidScheduleTime,
  legacyDoseLogKey,
  normalizeMedicationSchedules,
  scheduleLogKey,
} from '@/lib/medicationSchedule'

const STATE_ID = 'andarun:medications:v1'
const DEFAULT_PROFILE = { id: 'benjamin', name: 'بنیامین', initials: 'ب‌ز' }
const MAMAN_STATE_ID = 'maman:medications:v1'
const MAMAN_PROFILE = { id: 'maman', name: 'Maman', initials: 'M' }
const EMPTY_STATE = {
  version: 4,
  profiles: [DEFAULT_PROFILE],
  activeProfileId: DEFAULT_PROFILE.id,
  medicines: [],
  doseLogs: {},
}

function unavailable() {
  return NextResponse.json({ error: 'فضای ذخیره‌سازی دارو در دسترس نیست.' }, { status: 503 })
}

function cleanText(value, maxLength = 160) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

function cleanTime(value) {
  return isValidScheduleTime(value) ? value : ''
}

function cleanDate(value) {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : ''
}

function cleanMedicine(value, { enforceCatalogDoses = false, defaultProfile = DEFAULT_PROFILE } = {}) {
  const weekdays = Array.isArray(value?.weekdays)
    ? [...new Set(value.weekdays.map(Number).filter(day => day >= 0 && day <= 6))].sort()
    : []
  const schedules = normalizeMedicationSchedules(value)
    .map(schedule => ({
      ...schedule,
      id: cleanText(schedule.id, 80) || crypto.randomUUID(),
      time: cleanTime(schedule.time),
    }))
    .filter(schedule => schedule.time)
  const catalogDrug = findMedicationById(cleanText(value?.drugCatalogId, 80))
  const requestedDose = cleanText(value?.dose || value?.amount, 80) || 'دوز ثبت نشده'
  const dose = enforceCatalogDoses && catalogDrug && !catalogDrug.doses.includes(requestedDose)
    ? catalogDrug.doses[0]
    : requestedDose
  const doseByWeekday = value?.doseByWeekday && typeof value.doseByWeekday === 'object'
    ? Object.fromEntries(Object.entries(value.doseByWeekday).flatMap(([day, rawDose]) => {
      const dayNumber = Number(day)
      const cleanedDose = cleanText(rawDose, 80)
      if (!Number.isInteger(dayNumber) || dayNumber < 0 || dayNumber > 6 || !cleanedDose) return []
      if (weekdays.length && !weekdays.includes(dayNumber)) return []
      if (enforceCatalogDoses && catalogDrug && !catalogDrug.doses.includes(cleanedDose)) return [[day, dose]]
      return [[day, cleanedDose]]
    }))
    : {}

  return {
    id: cleanText(value?.id, 80) || crypto.randomUUID(),
    profileId: defaultProfile.id,
    name: cleanText(value?.name, 100),
    dose,
    drugCatalogId: cleanText(value?.drugCatalogId, 80),
    genericNameFa: cleanText(value?.genericNameFa || value?.name, 100),
    genericNameEn: cleanText(value?.genericNameEn, 100),
    category: Object.hasOwn(MEDICATION_CATEGORIES, value?.category) ? value.category : 'other',
    schedules: schedules.length ? schedules.slice(0, 8) : normalizeMedicationSchedules({ times: ['08:00'] }),
    frequency: value?.frequency === 'weekly' || weekdays.length < 7 ? 'weekly' : 'daily',
    weekdays: weekdays.length ? weekdays : [0, 1, 2, 3, 4, 5, 6],
    doseByWeekday,
    createdAt: cleanText(value?.createdAt, 40) || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

function normalizeState(value, defaultProfile = DEFAULT_PROFILE) {
  const fallback = { ...EMPTY_STATE, profiles: [defaultProfile], activeProfileId: defaultProfile.id }
  const source = value && typeof value === 'object' ? value : fallback
  const medicines = Array.isArray(source.medicines)
    ? source.medicines.map(item => cleanMedicine(item, { defaultProfile })).filter(item => item.name)
    : []
  const doseLogs = source.doseLogs && typeof source.doseLogs === 'object'
    ? Object.fromEntries(Object.entries(source.doseLogs).filter(([key, entry]) => (
      typeof key === 'string'
      && key.length <= 220
      && entry
      && typeof entry === 'object'
      && cleanDate(entry.date)
      && cleanTime(entry.time)
    )))
    : {}

  return {
    version: 4,
    profiles: [defaultProfile],
    activeProfileId: defaultProfile.id,
    medicines,
    doseLogs,
  }
}

async function readState(stateId = STATE_ID, defaultProfile = DEFAULT_PROFILE) {
  const { data, error } = await supabaseAdmin
    .from('admin_budget_state')
    .select('store')
    .eq('id', stateId)
    .maybeSingle()

  if (error) throw error
  return normalizeState(data?.store, defaultProfile)
}

async function writeState(state, stateId = STATE_ID, defaultProfile = DEFAULT_PROFILE) {
  const store = normalizeState(state, defaultProfile)
  const payload = { id: stateId, store, updated_at: new Date().toISOString() }
  let result = await supabaseAdmin
    .from('admin_budget_state')
    .upsert(payload, { onConflict: 'id' })
    .select('store')
    .single()

  if (result.error && /updated_at|schema cache|PGRST204/i.test(`${result.error.message} ${result.error.details}`)) {
    result = await supabaseAdmin
      .from('admin_budget_state')
      .upsert({ id: stateId, store }, { onConflict: 'id' })
      .select('store')
      .single()
  }

  if (result.error) throw result.error
  return normalizeState(result.data?.store || store, defaultProfile)
}

async function requireAccess(request) {
  const isMaman = request.nextUrl.pathname.startsWith('/api/maman/')
  const identity = isMaman ? await requireMamanSession() : await requireAndarunSession()
  if (identity.error) {
    return NextResponse.json({ error: identity.error }, { status: identity.status })
  }
  if (!isSupabaseAdminConfigured || !supabaseAdmin) return unavailable()
  return isMaman
    ? { stateId: MAMAN_STATE_ID, defaultProfile: MAMAN_PROFILE }
    : { stateId: STATE_ID, defaultProfile: DEFAULT_PROFILE }
}

export async function GET(request) {
  const access = await requireAccess(request)
  if (access instanceof Response) return access

  try {
    return NextResponse.json(await readState(access.stateId, access.defaultProfile))
  } catch (error) {
    console.error('[andarun-medications] GET failed', error)
    return NextResponse.json({ error: error.message }, { status: 503 })
  }
}

export async function POST(request) {
  const access = await requireAccess(request)
  if (access instanceof Response) return access

  let body = {}
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'درخواست معتبر نیست.' }, { status: 400 })
  }

  try {
    const state = await readState(access.stateId, access.defaultProfile)

    if (body.action === 'saveMedicine') {
      if (body.medicine?.frequency === 'weekly') {
        const selectedDays = Array.isArray(body.medicine?.weekdays)
          ? body.medicine.weekdays.map(Number).filter(day => day >= 0 && day <= 6)
          : []
        if (!selectedDays.length) return NextResponse.json({ error: 'حداقل یک روز مصرف را انتخاب کن.' }, { status: 400 })
      }
      const medicine = cleanMedicine(body.medicine, { enforceCatalogDoses: true, defaultProfile: access.defaultProfile })
      if (!medicine.name) return NextResponse.json({ error: 'نام دارو را وارد کن.' }, { status: 400 })
      const existing = state.medicines.find(item => item.id === medicine.id)
      if (existing) medicine.createdAt = existing.createdAt
      return NextResponse.json(await writeState({
        ...state,
        medicines: [medicine, ...state.medicines.filter(item => item.id !== medicine.id)],
      }, access.stateId, access.defaultProfile))
    }

    if (body.action === 'deleteMedicine') {
      const id = cleanText(body.id, 80)
      if (!id) return NextResponse.json({ error: 'شناسه دارو لازم است.' }, { status: 400 })
      const doseLogs = Object.fromEntries(
        Object.entries(state.doseLogs).filter(([, entry]) => entry.medicineId !== id),
      )
      return NextResponse.json(await writeState({
        ...state,
        medicines: state.medicines.filter(item => item.id !== id),
        doseLogs,
      }, access.stateId, access.defaultProfile))
    }

    if (body.action === 'toggleDose') {
      const medicineId = cleanText(body.medicineId, 80)
      const date = cleanDate(body.date)
      const time = cleanTime(body.time)
      const medicine = state.medicines.find(item => item.id === medicineId)
      const scheduleId = cleanText(body.scheduleId, 80)
      const schedule = medicine?.schedules.find(item => item.id === scheduleId)
        || medicine?.schedules.find(item => item.time === time)
      if (!medicine || !schedule || !date || !time) {
        return NextResponse.json({ error: 'نوبت دارو معتبر نیست.' }, { status: 400 })
      }
      const key = scheduleLogKey(date, medicineId, schedule)
      const oldKey = legacyDoseLogKey(date, medicineId, schedule)
      const doseLogs = { ...state.doseLogs }
      if (body.taken) {
        const takenLocalTime = cleanTime(body.takenLocalTime) || schedule.time
        const timing = evaluateTimingByLocalTime(schedule, takenLocalTime)
        const [year, month, day] = date.split('-').map(Number)
        const weekday = new Date(year, month - 1, day, 12).getDay()
        doseLogs[key] = {
          medicineId,
          profileId: medicine.profileId,
          date,
          time: schedule.time,
          dose: medicine.doseByWeekday?.[weekday] || medicine.dose,
          scheduleId: schedule.id,
          takenAt: new Date().toISOString(),
          takenLocalTime,
          ...timing,
        }
        if (oldKey !== key) delete doseLogs[oldKey]
      } else {
        delete doseLogs[key]
        delete doseLogs[oldKey]
      }
      return NextResponse.json(await writeState({ ...state, doseLogs }, access.stateId, access.defaultProfile))
    }

    return NextResponse.json({ error: 'عملیات ناشناخته است.' }, { status: 400 })
  } catch (error) {
    console.error('[andarun-medications] POST failed', error)
    return NextResponse.json({ error: error.message }, { status: 503 })
  }
}
