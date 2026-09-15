import crypto from 'crypto'
import { cookies } from 'next/headers'
import { safeEqual } from '@/lib/adminAuth'
import { getAndarunSessionSecret } from '@/lib/andarunPasswordAuth'

export const PRISONER_AID_COOKIE = 'prisoner_aid_session'

function expectedToken() {
  const secret = getAndarunSessionSecret()
  if (!secret) return ''
  return crypto.createHmac('sha256', secret).update('prisoner-aid:zia:v1').digest('base64url')
}

export function validPrisonerAidPassword(password) {
  return typeof password === 'string' && safeEqual(password.trim().toLowerCase(), 'zia')
}

export function createPrisonerAidSession() {
  return expectedToken()
}

export async function hasPrisonerAidSession() {
  const token = (await cookies()).get(PRISONER_AID_COOKIE)?.value || ''
  const expected = expectedToken()
  return Boolean(token && expected && safeEqual(token, expected))
}

export async function requirePrisonerAidSession() {
  return await hasPrisonerAidSession()
    ? {} : { error: 'ورود به صفحهٔ کمک به زندانیان لازم است.', status: 403 }
}
