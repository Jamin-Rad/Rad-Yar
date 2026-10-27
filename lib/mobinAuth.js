import { cookies } from 'next/headers'
import { familyCookiesAllowAccess } from '@/lib/familySession'
import { hasAndarunSession, getAndarunSessionSecret } from '@/lib/andarunPasswordAuth'

export const MOBIN_COOKIE = 'mobin_session'

export function getMobinPassword() {
  return process.env.MOBIN_PASSWORD || ''
}

export function getMobinSessionSecret() {
  return process.env.MOBIN_SESSION_SECRET || process.env.ADMIN_SESSION_SECRET || ''
}

export async function hasMobinSession() {
  const cookieStore = await cookies()
  if (familyCookiesAllowAccess(cookieStore, MOBIN_COOKIE, getMobinSessionSecret(), getAndarunSessionSecret())) return true
  return hasAndarunSession()
}
