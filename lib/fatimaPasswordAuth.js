import { cookies } from 'next/headers'
import { safeEqual } from '@/lib/adminAuth'

export const FATIMA_COOKIE = 'fatima_session'
export const FATIMA_OWNER_ID = 'private:fatima'
export const SHARED_ANDARUN_OWNER_ID = 'email:dr.benjaminzia@gmail.com'

export function getFatimaPassword() {
  return process.env.FATIMA_PASSWORD || ''
}

export function getFatimaSessionSecret() {
  return process.env.FATIMA_SESSION_SECRET || process.env.ANDARUN_SESSION_SECRET || process.env.ADMIN_SESSION_SECRET || ''
}

export async function hasFatimaSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get(FATIMA_COOKIE)?.value
  const expected = getFatimaSessionSecret()

  return !!expected && !!token && safeEqual(token, expected)
}

export async function requireFatimaSession() {
  const allowed = await hasFatimaSession()
  if (!allowed) return { error: 'Not allowed for Fatima', status: 403 }
  return { ownerId: FATIMA_OWNER_ID }
}
