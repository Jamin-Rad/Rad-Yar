import { supabaseAdmin } from '@/lib/supabase/server'

export const FATIMA_MHBA_BUCKET = 'fatima-mhba'
export const FATIMA_MHBA_FILES = new Set([
  'Text_01_Wirtschaften_2026.pdf',
  'Text_01_Loesungen_Kontrollfragen_2026.pdf',
  'Text_02_Vertraege_2026.pdf',
  'Text_02_Loesungen_Kontrollfragen_2026.pdf',
])

// Callers must verify the existing Fatima session before requesting material.
// The bucket is private: neither originals nor extracted pages enter public Git.
export async function downloadFatimaMhbaMaterial(file) {
  if (!supabaseAdmin) throw new Error('Private material storage is unavailable')
  const { data, error } = await supabaseAdmin.storage.from(FATIMA_MHBA_BUCKET).download(file)
  if (error) throw new Error('Private material could not be loaded')
  return data
}
