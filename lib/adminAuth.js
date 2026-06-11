import { auth, clerkClient } from '@clerk/nextjs/server'

export const ADMIN_EMAIL = 'dr.benjaminzia@gmail.com'

// Prüft, ob der angemeldete User der Admin ist.
// Gibt entweder { client, userId } oder { error, status } zurück.
export async function requireAdmin() {
  const { userId } = await auth()
  if (!userId) {
    return { error: 'Nicht angemeldet', status: 401 }
  }

  const client = await clerkClient()
  const requestingUser = await client.users.getUser(userId)
  const email = requestingUser.emailAddresses?.[0]?.emailAddress

  if (email !== ADMIN_EMAIL) {
    return { error: 'Keine Berechtigung', status: 403 }
  }

  return { client, userId }
}
