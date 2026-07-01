// ─── Supabase Server-Client (privilegiert) ─────────────────────────
// Nutzt den GEHEIMEN "service_role/secret" Key – umgeht RLS-Policies.
//
// ⚠️  NUR in Server-Code verwenden (API-Routes, Server Components,
//     Skripte) – NIEMALS in eine Client-Komponente importieren!
//     Der Key darf den Browser nie erreichen.
//
// Verwendung: import { supabaseAdmin } from '@/lib/supabase/server'

import { createClient } from '@supabase/supabase-js'
import { normalizeSupabaseUrl } from './url'

const supabaseUrl = normalizeSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL)
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export const isSupabaseAdminConfigured = Boolean(supabaseUrl && serviceRoleKey)

if (!isSupabaseAdminConfigured) {
  console.warn(
    '[supabase] NEXT_PUBLIC_SUPABASE_URL oder SUPABASE_SERVICE_ROLE_KEY fehlt. ' +
    'Server-seitige Supabase-Zugriffe (Nutzerfortschritt, Content-Import) funktionieren nicht.'
  )
}

export const supabaseAdmin = isSupabaseAdminConfigured
  ? createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  : null
