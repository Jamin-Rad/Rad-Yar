import { auth, clerkClient, currentUser } from '@clerk/nextjs/server'

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
  const clerkUserIds = [userId]

  if (email) {
    try {
      const client = await clerkClient()
      const { data } = await client.users.getUserList({ emailAddress: [email], limit: 20 })
      for (const user of data || []) clerkUserIds.push(user.id)
    } catch {}
  }

  const lookupIds = [...new Set([ownerId, ...clerkUserIds])]

  return { userId, email, ownerId, lookupIds }
}
