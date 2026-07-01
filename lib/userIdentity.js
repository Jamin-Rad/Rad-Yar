import { auth, currentUser } from '@clerk/nextjs/server'
import { canonicalUserEmail } from '@/lib/emailIdentity'

function normalizedEmail(user) {
  return canonicalUserEmail(user)
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
