// ─── Supabase Browser-Client ───────────────────────────────────────
// Nutzt den ÖFFENTLICHEN "publishable/anon" Key – sicher im Browser.
// Verwendung: import { supabase } from '@/lib/supabase/client'
//
// Dieser Client darf NUR lesend auf öffentliche Inhalte zugreifen
// (Fachgebiete, Kapitel, Themen, Fragen, Flashcards – siehe RLS-Policies).
// Schreibvorgänge auf Nutzer-Daten laufen über Server-Routen (server.js).

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

if (!isSupabaseConfigured) {
  // Kein harter Crash beim Build – aber deutliche Warnung in der Konsole.
  console.warn(
    '[supabase] NEXT_PUBLIC_SUPABASE_URL oder NEXT_PUBLIC_SUPABASE_ANON_KEY fehlt. ' +
    'Prüfe deine .env.local-Datei.'
  )
}

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false }, // Auth läuft über Clerk, nicht über Supabase Auth
    })
  : null
