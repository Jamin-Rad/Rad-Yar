import { createHmac, timingSafeEqual } from 'node:crypto'

const MAX_TTL = 86400
export function createArchiveToken(secret, { now = Math.floor(Date.now() / 1000), ttl = 3600 } = {}) {
  if (!secret) throw new Error('Jaminova session secret is not configured.')
  const payload = Buffer.from(JSON.stringify({ scope: 'case-archive', iat: now, exp: now + Math.max(1, Math.min(MAX_TTL, ttl)) })).toString('base64url')
  return `${payload}.${createHmac('sha256', secret).update(payload).digest('base64url')}`
}

export function verifyArchiveToken(token, secret, now = Math.floor(Date.now() / 1000)) {
  if (!secret || typeof token !== 'string' || token.length > 2000) return false
  const [payload, signature, extra] = token.split('.')
  if (!payload || !signature || extra) return false
  const expected = createHmac('sha256', secret).update(payload).digest('base64url')
  const a = Buffer.from(signature), b = Buffer.from(expected)
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false
  try {
    const value = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))
    return value.scope === 'case-archive' && Number.isSafeInteger(value.exp) && Number.isSafeInteger(value.iat) && value.iat <= now + 30 && value.exp > now && value.exp > value.iat && value.exp - value.iat <= MAX_TTL
  } catch { return false }
}
