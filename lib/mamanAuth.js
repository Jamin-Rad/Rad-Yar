import crypto from 'crypto'
import { cookies, headers } from 'next/headers'
import { safeEqual } from '@/lib/adminAuth'
import { getAndarunSessionSecret } from '@/lib/andarunPasswordAuth'

export const MAMAN_USERNAME = 'Maman'
export const MAMAN_COOKIE = 'maman_session'

const MAMAN_SCOPE = 'maman-medications'

function sessionSecret() {
  return process.env.MAMAN_SESSION_SECRET || getAndarunSessionSecret()
}

function sign(payload, secret) {
  return crypto.createHmac('sha256', secret).update(payload).digest('base64url')
}

export function isMamanUsername(value) {
  return typeof value === 'string' && value.trim().toLocaleLowerCase('en-US') === MAMAN_USERNAME.toLocaleLowerCase('en-US')
}

export function createMamanToken(maxAgeSeconds = 60 * 60 * 24 * 365) {
  const secret = sessionSecret()
  if (!secret) return ''
  const payload = Buffer.from(JSON.stringify({
    scope: MAMAN_SCOPE,
    username: MAMAN_USERNAME,
    exp: Math.floor(Date.now() / 1000) + maxAgeSeconds,
  })).toString('base64url')
  return `${payload}.${sign(payload, secret)}`
}

export function verifyMamanToken(token) {
  const secret = sessionSecret()
  if (!secret || typeof token !== 'string') return false
  const [payload, signature, extra] = token.split('.')
  if (!payload || !signature || extra || !safeEqual(signature, sign(payload, secret))) return false
  try {
    const value = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))
    return value?.scope === MAMAN_SCOPE
      && isMamanUsername(value?.username)
      && Number(value?.exp) > Math.floor(Date.now() / 1000)
  } catch {
    return false
  }
}

export async function hasMamanSession() {
  const cookieStore = await cookies()
  if (verifyMamanToken(cookieStore.get(MAMAN_COOKIE)?.value || '')) return true
  const headerStore = await headers()
  return verifyMamanToken(headerStore.get('x-maman-token') || '')
}

export async function requireMamanSession() {
  if (!(await hasMamanSession())) return { error: 'ورود Maman لازم است.', status: 403 }
  return { username: MAMAN_USERNAME, ownerId: 'profile:maman' }
}
