import { cookies } from 'next/headers'
import { safeEqual } from '@/lib/adminAuth'

export const MOBIN_COOKIE = 'mobin_session'

export function getMobinPassword() {
  return process.env.MOBIN_PASSWORD || ''
}

export function getMobinSessionSecret() {
  return process.env.MOBIN_SESSION_SECRET || process.env.ADMIN_SESSION_SECRET || ''
}

export async function hasMobinSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get(MOBIN_COOKIE)?.value
  const expected = getMobinSessionSecret()
  return !!expected && !!token && safeEqual(token, expected)
}
