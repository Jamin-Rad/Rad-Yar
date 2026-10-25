import { requireAndarunSession } from '@/lib/andarunPasswordAuth'
import { supabaseAdmin, isSupabaseAdminConfigured } from '@/lib/supabase/server'
import { makeEnglishStorage } from '@/lib/englishStorage'
import { createEnglishHandlers } from '@/lib/englishApi'

export const dynamic='force-dynamic'
export const {GET,PUT}=createEnglishHandlers(requireAndarunSession,makeEnglishStorage(supabaseAdmin,isSupabaseAdminConfigured&&Boolean(supabaseAdmin)))
