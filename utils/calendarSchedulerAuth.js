import { createHmac, timingSafeEqual } from 'node:crypto'

const PATH = '/api/andarun/reminders/dispatch'
function equal(actual, expected) {
  const a = Buffer.from(actual || ''), b = Buffer.from(expected)
  return a.length === b.length && timingSafeEqual(a,b)
}
export function calendarSchedulerSignature(secret, timestamp) {
  return createHmac('sha256',secret).update(`GET\n${PATH}\n${timestamp}`).digest('hex')
}
export function calendarSchedulerAuthorization(request, secret, now = Date.now()) {
  if (!secret || request.method !== 'GET' || new URL(request.url).pathname !== PATH) return false
  // Retain direct authenticated diagnostics; never put this bearer in pg_net's queue.
  if (equal(request.headers.get('authorization'), `Bearer ${secret}`)) return 'diagnostic'
  const timestamp = request.headers.get('x-calendar-timestamp') || ''
  const signature = request.headers.get('x-calendar-signature') || ''
  if (!/^\d{10}$/.test(timestamp) || !/^[a-f0-9]{64}$/.test(signature)) return false
  const age = now - Number(timestamp) * 1000
  if (age < -30000 || age > 90000) return false
  return equal(signature, calendarSchedulerSignature(secret,timestamp)) ? 'signed' : false
}
export function calendarSchedulerAuthorized(request, secret, now = Date.now()) {
  return Boolean(calendarSchedulerAuthorization(request,secret,now))
}
