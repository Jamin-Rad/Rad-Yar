export function canonicalEmail(value) {
  if (typeof value !== 'string') return ''
  const email = value.trim().toLowerCase()
  const at = email.lastIndexOf('@')
  if (at <= 0) return email

  let local = email.slice(0, at)
  let domain = email.slice(at + 1)

  if (domain === 'googlemail.com') domain = 'gmail.com'
  if (domain === 'gmail.com') {
    local = local.split('+')[0].replaceAll('.', '')
  }

  return `${local}@${domain}`
}

export function primaryEmailFromUser(user) {
  const primary = user?.emailAddresses?.find(email => email.id === user.primaryEmailAddressId)
  return primary?.emailAddress || user?.primaryEmailAddress?.emailAddress || user?.emailAddresses?.[0]?.emailAddress || ''
}

export function canonicalUserEmail(user) {
  return canonicalEmail(primaryEmailFromUser(user))
}

export function hasCanonicalEmail(emailAddresses, expectedEmail) {
  const expected = canonicalEmail(expectedEmail)
  return !!expected && !!emailAddresses?.some(entry => canonicalEmail(entry.emailAddress) === expected)
}

