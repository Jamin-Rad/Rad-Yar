import { cookies } from 'next/headers'
import { safeEqual } from '@/lib/adminAuth'

export const DIGITDA_COOKIE = 'digitda_session'

export function getDigitDAPassword() {
  return process.env.DIGITDA_PASSWORD || 'Jamin'
}

export function getDigitDASessionSecret() {
  return process.env.DIGITDA_SESSION_SECRET
    || process.env.ANDARUN_SESSION_SECRET
    || 'digitda-private-session-jamin-v1'
}

export async function hasDigitDASession() {
  const cookieStore = await cookies()
  const token = cookieStore.get(DIGITDA_COOKIE)?.value
  return !!token && safeEqual(token, getDigitDASessionSecret())
}

export async function requireDigitDASession() {
  if (!(await hasDigitDASession())) return { error: 'Keine Berechtigung', status: 403 }
  return { ok: true }
}
