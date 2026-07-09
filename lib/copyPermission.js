import { canonicalEmail } from '@/lib/emailIdentity'

export const COPY_ALLOWED_EMAILS = new Set([
  canonicalEmail('dr.benjaminzia@gmail.com'),
  canonicalEmail('dr.hamedzia@outlook.de'),
])

export function hasCopyAllowedEmail(emailAddresses) {
  return !!emailAddresses?.some(
    entry => COPY_ALLOWED_EMAILS.has(canonicalEmail(entry.emailAddress))
  )
}
