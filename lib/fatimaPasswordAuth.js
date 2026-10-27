import { cookies } from 'next/headers'
import { familyCookiesAllowAccess } from '@/lib/familySession'
import { ANDARUN_OWNER_ID, ANDARUN_LEGACY_OWNER_IDS, hasAndarunSession, getAndarunSessionSecret } from '@/lib/andarunPasswordAuth'

export const FATIMA_COOKIE = 'fatima_session'
export const FATIMA_OWNER_ID = 'private:fatima'
export const SHARED_ANDARUN_OWNER_ID = ANDARUN_OWNER_ID
export const SHARED_ANDARUN_LOOKUP_OWNER_IDS = [ANDARUN_OWNER_ID, ...ANDARUN_LEGACY_OWNER_IDS]

export function getFatimaPassword() {
  return process.env.FATIMA_PASSWORD || ''
}

export function getFatimaSessionSecret() {
  return process.env.FATIMA_SESSION_SECRET || process.env.ANDARUN_SESSION_SECRET || process.env.ADMIN_SESSION_SECRET || ''
}

export async function hasFatimaSession() {
  const cookieStore = await cookies()
  if (familyCookiesAllowAccess(cookieStore, FATIMA_COOKIE, getFatimaSessionSecret(), getAndarunSessionSecret())) return true
  return hasAndarunSession()
}

export async function requireFatimaSession() {
  const allowed = await hasFatimaSession()
  if (!allowed) return { error: 'Not allowed for Fatima', status: 403 }
  return { ownerId: FATIMA_OWNER_ID }
}
