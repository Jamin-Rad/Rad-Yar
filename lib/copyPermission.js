export const COPY_ALLOWED_EMAILS = new Set([
  'dr.benjamin.zia@gmail.com',
  'dr.hamedzia@outlook.de',
])

export function hasCopyAllowedEmail(emailAddresses) {
  return !!emailAddresses?.some(
    entry => COPY_ALLOWED_EMAILS.has(entry.emailAddress?.toLowerCase())
  )
}
