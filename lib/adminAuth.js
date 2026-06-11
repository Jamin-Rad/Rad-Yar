import { auth, clerkClient } from '@clerk/nextjs/server'

export const ADMIN_EMAIL = 'dr.benjaminzia@gmail.com'

// Prüft, ob irgendeine der E-Mail-Adressen eines Clerk-Users der Admin-Adresse
// entspricht (case-insensitive) — unabhängig davon, welche davon "primär" ist.
export function hasAdminEmail(emailAddresses) {
  return !!emailAddresses?.some(
    e => e.emailAddress?.toLowerCase() === ADMIN_EMAIL.toLowerCase()
  )
}

// Prüft, ob der angemeldete User der Admin ist.
// Gibt entweder { client, userId } oder { error, status } zurück.
export async function requireAdmin() {
  const { userId } = await auth()
  if (!userId) {
    return { error: 'Nicht angemeldet', status: 401 }
  }

  const client = await clerkClient()
  const requestingUser = await client.users.getUser(userId)

  if (!hasAdminEmail(requestingUser.emailAddresses)) {
    return { error: 'Keine Berechtigung', status: 403 }
  }

  return { client, userId }
}
