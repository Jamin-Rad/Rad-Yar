import { cacheGet, cacheSet, localId } from './database'
import type {
  Medication,
  MedicationDoseLog,
  MedicationRoutine,
  MedicationSchedule,
  MedicationState,
  ProfileSettings,
} from '../types'

const MEDICATIONS_KEY = 'medications-v2'
const PROFILE_KEY = 'profile-settings-v1'

export const EMPTY_MEDICATION_STATE: MedicationState = { medicines: [], logs: [] }
export const DEFAULT_PROFILE_SETTINGS: ProfileSettings = { personName: 'بنیامین', largeText: false, highContrast: false }
export const EVERY_DAY = [0, 1, 2, 3, 4, 5, 6]

export const WEEKDAYS = [
  { value: 6, label: 'شنبه', short: 'ش' },
  { value: 0, label: 'یکشنبه', short: 'ی' },
  { value: 1, label: 'دوشنبه', short: 'د' },
  { value: 2, label: 'سه‌شنبه', short: 'س' },
  { value: 3, label: 'چهارشنبه', short: 'چ' },
  { value: 4, label: 'پنج‌شنبه', short: 'پ' },
  { value: 5, label: 'جمعه', short: 'ج' },
] as const

export const ROUTINES: Array<{ value: MedicationRoutine; label: string; short: string; time: string; icon: string }> = [
  { value: 'fasting', label: 'ناشتا، صبح زود', short: 'ناشتا', time: '06:30', icon: 'weather-sunset-up' },
  { value: 'breakfast', label: 'همراه صبحانه', short: 'صبحانه', time: '08:00', icon: 'coffee-outline' },
  { value: 'lunch', label: 'همراه ناهار', short: 'ناهار', time: '13:00', icon: 'silverware-fork-knife' },
  { value: 'afternoonSnack', label: 'همراه میان‌وعده عصر', short: 'میان‌وعده عصر', time: '16:30', icon: 'food-apple-outline' },
  { value: 'dinner', label: 'همراه شام', short: 'شام', time: '20:00', icon: 'food-turkey' },
  { value: 'bedtime', label: 'قبل از خواب', short: 'خواب', time: '22:30', icon: 'weather-night' },
]

export function routineByValue(value?: MedicationRoutine) {
  return ROUTINES.find(item => item.value === value)
}

export function newSchedule(type: 'exact' | 'routine' = 'exact', routine: MedicationRoutine = 'breakfast'): MedicationSchedule {
  const option = routineByValue(routine)
  return {
    id: localId('schedule'),
    type,
    routine: type === 'routine' ? routine : undefined,
    time: type === 'routine' ? option?.time || '08:00' : '08:00',
  }
}

export function newMedication(): Medication {
  const now = new Date().toISOString()
  return {
    id: localId('medicine'),
    name: '',
    dose: '',
    category: 'other',
    frequency: 'daily',
    weekdays: [...EVERY_DAY],
    doseByWeekday: {},
    schedules: [newSchedule()],
    createdAt: now,
    updatedAt: now,
  }
}

function normalizeState(value: MedicationState): MedicationState {
  return {
    medicines: Array.isArray(value?.medicines) ? value.medicines.map(medicine => ({
      ...medicine,
      frequency: medicine.frequency === 'weekly' || medicine.weekdays?.length < 7 ? 'weekly' : 'daily',
      weekdays: Array.isArray(medicine.weekdays) && medicine.weekdays.length ? [...new Set(medicine.weekdays)] : [...EVERY_DAY],
      doseByWeekday: medicine.doseByWeekday || {},
      schedules: Array.isArray(medicine.schedules) && medicine.schedules.length ? medicine.schedules : [newSchedule()],
    })) : [],
    logs: Array.isArray(value?.logs) ? value.logs : [],
  }
}

export async function loadMedicationState() {
  return normalizeState(await cacheGet<MedicationState>(MEDICATIONS_KEY, EMPTY_MEDICATION_STATE))
}

export async function saveMedicine(medicine: Medication) {
  const state = await loadMedicationState()
  const next = {
    ...state,
    medicines: [{ ...medicine, updatedAt: new Date().toISOString() }, ...state.medicines.filter(item => item.id !== medicine.id)],
  }
  await cacheSet(MEDICATIONS_KEY, next)
  return next
}

export async function deleteMedicine(id: string) {
  const state = await loadMedicationState()
  const next = {
    medicines: state.medicines.filter(item => item.id !== id),
    logs: state.logs.filter(item => item.medicineId !== id),
  }
  await cacheSet(MEDICATIONS_KEY, next)
  return next
}

export function localDateKey(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function minutes(time: string) {
  const [hour, minute] = time.split(':').map(Number)
  return (hour * 60) + minute
}

function timingStatus(schedule: MedicationSchedule, takenAt: string): MedicationDoseLog['timingStatus'] {
  let delta = minutes(takenAt) - minutes(schedule.time)
  if (delta > 720) delta -= 1440
  if (delta < -720) delta += 1440
  const tolerance = schedule.type === 'routine' ? 90 : 45
  return Math.abs(delta) <= tolerance ? 'onTime' : delta < 0 ? 'early' : 'late'
}

export async function toggleDose(medicine: Medication, schedule: MedicationSchedule, date = new Date()) {
  const state = await loadMedicationState()
  const dateKey = localDateKey(date)
  const id = `${dateKey}:${medicine.id}:${schedule.id}`
  const existing = state.logs.some(log => log.id === id)
  const now = new Date()
  const takenAt = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
  const dose = medicine.doseByWeekday[String(date.getDay())] || medicine.dose
  const log: MedicationDoseLog = {
    id,
    medicineId: medicine.id,
    date: dateKey,
    scheduleId: schedule.id,
    scheduledTime: schedule.time,
    takenAt,
    timingStatus: timingStatus(schedule, takenAt),
    dose,
  }
  const next = { ...state, logs: existing ? state.logs.filter(item => item.id !== id) : [log, ...state.logs] }
  await cacheSet(MEDICATIONS_KEY, next)
  return next
}

export async function loadProfileSettings() {
  return cacheGet<ProfileSettings>(PROFILE_KEY, DEFAULT_PROFILE_SETTINGS)
}

export async function saveProfileSettings(settings: ProfileSettings) {
  const next = { ...DEFAULT_PROFILE_SETTINGS, ...settings, personName: settings.personName.trim() || DEFAULT_PROFILE_SETTINGS.personName }
  await cacheSet(PROFILE_KEY, next)
  return next
}
