import { canonicalEmail, canonicalUserEmail } from '@/lib/emailIdentity'

const DEFAULT_ALLOWED_EMAILS = ['dr.benjamin.zia@gmail.com']

export function getAndarunAllowedEmails() {
  const configured = (process.env.ANDARUN_ALLOWED_EMAILS || '')
    .split(',')
    .map(email => canonicalEmail(email))
    .filter(Boolean)

  return new Set([
    ...DEFAULT_ALLOWED_EMAILS.map(email => canonicalEmail(email)),
    ...configured,
  ])
}

export function isAndarunUser(user) {
  const email = canonicalUserEmail(user)
  return !!email && getAndarunAllowedEmails().has(email)
}
