import { cookies } from 'next/headers'
import { safeEqual } from '@/lib/adminAuth'

export const ANDARUN_COOKIE = 'andarun_session'

export function getAndarunPassword() {
  return process.env.ANDARUN_PASSWORD || process.env.ADMIN_PASSWORD || ''
}

export function getAndarunSessionSecret() {
  return process.env.ANDARUN_SESSION_SECRET || process.env.ADMIN_SESSION_SECRET || ''
}

export async function hasAndarunSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get(ANDARUN_COOKIE)?.value
  const expected = getAndarunSessionSecret()

  return !!expected && !!token && safeEqual(token, expected)
}

export async function requireAndarunSession() {
  const allowed = await hasAndarunSession()
  if (!allowed) return { error: 'Not allowed for Andarun', status: 403 }
  return { ownerId: 'email:dr.benjaminzia@gmail.com' }
}
