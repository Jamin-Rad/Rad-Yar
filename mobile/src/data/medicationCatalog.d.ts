export type MedicationGuidance = {
  text: string
  caution?: string
  suggestedRoutine?: 'fasting' | 'breakfast' | 'lunch' | 'afternoonSnack' | 'dinner' | 'bedtime'
  sourceUrl?: string
}

export type CatalogMedication = {
  id: string
  fa: string
  en: string
  aliases?: string[]
  category: string
  doses: string[]
  defaultFrequency?: 'weekly'
  guidance?: MedicationGuidance
}

export const MEDICATION_CATALOG: CatalogMedication[]
export const MEDICATION_CATEGORIES: Record<string, { fa: string; en: string }>
export function findMedicationById(id?: string): CatalogMedication | null
export function normalizeDrugSearch(value: unknown): string
export function searchMedicationCatalog(query: string, limit?: number): CatalogMedication[]
