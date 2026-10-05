import { cacheGet, cacheSet, localId } from './database'
import { requestJson } from './api'
import { queueMutation } from './sync'
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
const REMOTE_ENDPOINT = '/api/maman/medications'
const REMOTE_PROFILE_ID = 'maman'

export const EMPTY_MEDICATION_STATE: MedicationState = { medicines: [], logs: [] }
export const DEFAULT_PROFILE_SETTINGS: ProfileSettings = { personName: 'Maman', largeText: false, highContrast: false }
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

type RemoteMedicationState = {
  medicines?: Array<Medication & { profileId?: string; genericNameFa?: string }>
  doseLogs?: Record<string, {
    medicineId?: string
    date?: string
    time?: string
    scheduleId?: string
    takenAt?: string
    timingStatus?: MedicationDoseLog['timingStatus']
    dose?: string
  }>
}

function fromRemote(value: RemoteMedicationState): MedicationState {
  const medicines = Array.isArray(value?.medicines) ? value.medicines.map(medicine => ({
    ...medicine,
    doseByWeekday: medicine.doseByWeekday || {},
    schedules: Array.isArray(medicine.schedules) ? medicine.schedules : [],
  })) : []
  const logs = Object.entries(value?.doseLogs || {}).flatMap(([id, log]) => {
    if (!log?.medicineId || !log.date || !log.scheduleId || !log.time) return []
    return [{
      id,
      medicineId: log.medicineId,
      date: log.date,
      scheduleId: log.scheduleId,
      scheduledTime: log.time,
      takenAt: log.takenAt || new Date().toISOString(),
      timingStatus: log.timingStatus || 'onTime',
      dose: log.dose || '',
    } satisfies MedicationDoseLog]
  })
  return normalizeState({ medicines, logs })
}

function remoteMedicine(medicine: Medication) {
  return { ...medicine, profileId: REMOTE_PROFILE_ID, genericNameFa: medicine.name }
}

async function saveRemote(payload: unknown, fallback: MedicationState) {
  try {
    const remote = await requestJson<RemoteMedicationState>(REMOTE_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    const next = fromRemote(remote)
    await cacheSet(MEDICATIONS_KEY, next)
    return next
  } catch {
    await queueMutation(REMOTE_ENDPOINT, 'POST', payload)
    return fallback
  }
}

export async function syncMedicationState() {
  const local = await loadMedicationState()
  try {
    let remote = await requestJson<RemoteMedicationState>(REMOTE_ENDPOINT)
    const remoteIsEmpty = !remote.medicines?.length && !Object.keys(remote.doseLogs || {}).length
    if (remoteIsEmpty && (local.medicines.length || local.logs.length)) {
      for (const medicine of local.medicines) {
        remote = await requestJson<RemoteMedicationState>(REMOTE_ENDPOINT, {
          method: 'POST',
          body: JSON.stringify({ action: 'saveMedicine', medicine: remoteMedicine(medicine) }),
        })
      }
      for (const log of local.logs) {
        remote = await requestJson<RemoteMedicationState>(REMOTE_ENDPOINT, {
          method: 'POST',
          body: JSON.stringify({
            action: 'toggleDose',
            medicineId: log.medicineId,
            scheduleId: log.scheduleId,
            date: log.date,
            time: log.scheduledTime,
            taken: true,
            takenLocalTime: log.takenAt ? new Date(log.takenAt).toTimeString().slice(0, 5) : log.scheduledTime,
          }),
        })
      }
    }
    const next = fromRemote(remote)
    await cacheSet(MEDICATIONS_KEY, next)
    return next
  } catch {
    return local
  }
}

export async function saveMedicine(medicine: Medication) {
  const state = await loadMedicationState()
  const next = {
    ...state,
    medicines: [{ ...medicine, updatedAt: new Date().toISOString() }, ...state.medicines.filter(item => item.id !== medicine.id)],
  }
  await cacheSet(MEDICATIONS_KEY, next)
  return saveRemote({ action: 'saveMedicine', medicine: remoteMedicine(medicine) }, next)
}

export async function deleteMedicine(id: string) {
  const state = await loadMedicationState()
  const next = {
    medicines: state.medicines.filter(item => item.id !== id),
    logs: state.logs.filter(item => item.medicineId !== id),
  }
  await cacheSet(MEDICATIONS_KEY, next)
  return saveRemote({ action: 'deleteMedicine', id }, next)
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
  return saveRemote({
    action: 'toggleDose',
    medicineId: medicine.id,
    scheduleId: schedule.id,
    date: dateKey,
    time: schedule.time,
    taken: !existing,
    takenLocalTime: takenAt,
  }, next)
}

export async function loadProfileSettings() {
  return cacheGet<ProfileSettings>(PROFILE_KEY, DEFAULT_PROFILE_SETTINGS)
}

export async function saveProfileSettings(settings: ProfileSettings) {
  const next = { ...DEFAULT_PROFILE_SETTINGS, ...settings, personName: settings.personName.trim() || DEFAULT_PROFILE_SETTINGS.personName }
  await cacheSet(PROFILE_KEY, next)
  return next
}
