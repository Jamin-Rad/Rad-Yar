export type ScreenName =
  | 'home'
  | 'todos'
  | 'events'
  | 'routines'
  | 'work'
  | 'health'
  | 'deutsch'
  | 'findings'
  | 'finance'
  | 'reports'
  | 'medications'
  | 'profile'

export type MedicationFrequency = 'daily' | 'weekly'
export type MedicationTimingType = 'exact' | 'routine'
export type MedicationRoutine = 'fasting' | 'breakfast' | 'lunch' | 'afternoonSnack' | 'dinner' | 'bedtime'

export type MedicationSchedule = {
  id: string
  type: MedicationTimingType
  time: string
  routine?: MedicationRoutine
}

export type Medication = {
  id: string
  name: string
  dose: string
  drugCatalogId?: string
  genericNameEn?: string
  category: string
  frequency: MedicationFrequency
  weekdays: number[]
  doseByWeekday: Record<string, string>
  schedules: MedicationSchedule[]
  createdAt: string
  updatedAt: string
}

export type MedicationDoseLog = {
  id: string
  medicineId: string
  date: string
  scheduleId: string
  scheduledTime: string
  takenAt: string
  timingStatus: 'onTime' | 'early' | 'late'
  dose: string
}

export type MedicationState = {
  medicines: Medication[]
  logs: MedicationDoseLog[]
}

export type ProfileSettings = {
  personName: string
  largeText: boolean
  highContrast: boolean
}

export type TodoItem = {
  id: string
  title: string
  note?: string
  lane: 'urgent' | 'today' | 'watch'
  deadline?: string
  itemType: 'todo' | 'event'
  eventTime?: string
  done: boolean
  createdAt?: string
  updatedAt?: string
  pending?: boolean
}

export type Routine = {
  id: string
  title: string
  unit: string
  dailyTarget: number
  color: string
  pending?: boolean
}

export type RoutineLog = {
  id: string
  routineId: string
  date: string
  amount: number
}

export type RoutinesPayload = { routines: Routine[]; logs: RoutineLog[] }

export type WorkState = {
  shifts: Array<Record<string, unknown> & { id: string; date?: string; model?: string; assignment?: string }>
  findings: Array<Record<string, unknown> & { id: string; examDate?: string; question?: string; diagnosis?: string; status?: string }>
  findingTimers: Array<Record<string, unknown>>
}

export type HealthState = {
  records: Array<Record<string, unknown> & { id: string; date: string; weight?: number; note?: string }>
  customSports: Array<Record<string, unknown>>
  customFoods: Array<Record<string, unknown>>
  deletedSports: string[]
  deletedFoods: string[]
  caloriePlan: Record<string, unknown> | null
}

export type DeutschState = {
  lessons: Array<Record<string, unknown> & { id?: string; title?: string; name?: string }>
  cards: Array<Record<string, unknown>>
  reviews: Array<Record<string, unknown>>
  writings: Array<Record<string, unknown>>
  answers: Record<string, unknown>
}

export type BudgetEntry = {
  id: string
  type: 'income' | 'expense'
  title: string
  amount: number
  category?: string
  date: string
}

export type BudgetPayload = {
  store: Record<string, { budget?: number | string; entries?: BudgetEntry[] }>
  recurring: Array<Record<string, unknown>>
  catBudgets: Record<string, number>
  categories: Array<Record<string, unknown>>
  updatedAt?: string | null
}
