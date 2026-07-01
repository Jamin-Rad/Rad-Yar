import { auth, currentUser } from '@clerk/nextjs/server'

function normalizedEmail(user) {
  const primaryId = user?.primaryEmailAddressId
  const primary = user?.emailAddresses?.find(email => email.id === primaryId)
  const email = primary?.emailAddress || user?.primaryEmailAddress?.emailAddress || user?.emailAddresses?.[0]?.emailAddress
  return typeof email === 'string' ? email.trim().toLowerCase() : ''
}

export async function getSignedInUserIdentity() {
  const { userId } = await auth()
  if (!userId) return null

  let email = ''
  try {
    email = normalizedEmail(await currentUser())
  } catch {}

  const ownerId = email ? `email:${email}` : userId
  const lookupIds = [ownerId]

  return { userId, email, ownerId, lookupIds }
}
