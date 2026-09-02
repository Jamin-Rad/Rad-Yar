import crypto from 'crypto'
import { cookies, headers } from 'next/headers'
import { safeEqual } from '@/lib/adminAuth'

export const ANDARUN_COOKIE = 'andarun_session'
export const ANDARUN_OWNER_ID = 'email:dr.benjamin.zia@gmail.com'
export const ANDARUN_LEGACY_OWNER_IDS = [
  'email:dr.benjaminzia@gmail.com',
  'email:drbenjaminzia@gmail.com',
]

export function getAndarunPassword() {
  return process.env.ANDARUN_PASSWORD || process.env.ADMIN_PASSWORD || ''
}

export function getAndarunSessionSecret() {
  return process.env.ANDARUN_SESSION_SECRET || process.env.ADMIN_SESSION_SECRET || ''
}

const MOBILE_SCOPE = 'andarun-mobile'

function signMobilePayload(payload, secret) {
  return crypto.createHmac('sha256', secret).update(payload).digest('base64url')
}

export function createAndarunMobileToken(maxAgeSeconds = 60 * 60 * 24 * 90) {
  const secret = getAndarunSessionSecret()
  if (!secret) return ''

  const payload = Buffer.from(JSON.stringify({
    scope: MOBILE_SCOPE,
    exp: Math.floor(Date.now() / 1000) + maxAgeSeconds,
  })).toString('base64url')
  return `${payload}.${signMobilePayload(payload, secret)}`
}

export function verifyAndarunMobileToken(token) {
  const secret = getAndarunSessionSecret()
  if (!secret || typeof token !== 'string') return false

  const [payload, signature, extra] = token.split('.')
  if (!payload || !signature || extra) return false
  if (!safeEqual(signature, signMobilePayload(payload, secret))) return false

  try {
    const value = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))
    return value?.scope === MOBILE_SCOPE && Number(value?.exp) > Math.floor(Date.now() / 1000)
  } catch {
    return false
  }
}

export async function hasAndarunSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get(ANDARUN_COOKIE)?.value
  const expected = getAndarunSessionSecret()

  if (expected && token && safeEqual(token, expected)) return true

  const headerStore = await headers()
  const mobileToken = headerStore.get('x-andarun-token') || ''

  return verifyAndarunMobileToken(mobileToken)
}

export async function requireAndarunSession() {
  const allowed = await hasAndarunSession()
  if (!allowed) return { error: 'Not allowed for Andarun', status: 403 }
  return { ownerId: ANDARUN_OWNER_ID, lookupOwnerIds: [ANDARUN_OWNER_ID, ...ANDARUN_LEGACY_OWNER_IDS] }
}
