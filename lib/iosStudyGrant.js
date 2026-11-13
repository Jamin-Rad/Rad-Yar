import { createHash, createHmac, timingSafeEqual } from 'node:crypto'

const lifetime = 7 * 24 * 60 * 60 * 1000
export const isChallenge = value => typeof value === 'string' && /^[a-f0-9]{64}$/.test(value)

function sign(payload) {
  const secret = process.env.CLERK_SECRET_KEY
  if (!secret) throw new Error('Missing Clerk configuration')
  return createHmac('sha256', secret).update('radyar-ios-study:v1:').update(payload).digest()
}

export function issueStudyGrant(sessionId, challenge) {
  const expires = Date.now() + lifetime
  const payload = Buffer.from(JSON.stringify({ sessionId, challenge, expires })).toString('base64url')
  return `${payload}.${sign(payload).toString('base64url')}`
}

export function readStudyGrant(grant, verifier) {
  if (!isChallenge(verifier) || typeof grant !== 'string' || grant.length > 1024) return null
  const match = /^([\w-]+)\.([\w-]{43})$/.exec(grant)
  if (!match) return null
  const [, payload, signature] = match
  if (!timingSafeEqual(sign(payload), Buffer.from(signature, 'base64url'))) return null
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))
    const challenge = createHash('sha256').update(verifier).digest('hex')
    if (data.challenge !== challenge || !Number.isFinite(data.expires) || data.expires <= Date.now() ||
        typeof data.sessionId !== 'string' || !data.sessionId.startsWith('sess_')) return null
    return data
  } catch {
    return null
  }
}
