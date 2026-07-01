import { cookies } from 'next/headers'
import { clerkClient } from '@clerk/nextjs/server'
import crypto from 'crypto'
import { hasCanonicalEmail } from '@/lib/emailIdentity'

export const ADMIN_COOKIE = 'admin_session'

// Dein persönlicher Account — wird in der User-Liste als "Admin" markiert
// und kann nicht gesperrt/gelöscht werden. Hat nichts mit dem Admin-Login zu tun.
export const ADMIN_EMAIL = 'dr.benjamin.zia@gmail.com'

export function hasAdminEmail(emailAddresses) {
  return hasCanonicalEmail(emailAddresses, ADMIN_EMAIL)
}

// Konstante-Zeit-Vergleich, um Timing-Angriffe auf das Passwort/Token zu vermeiden.
export function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  if (bufA.length !== bufB.length) return false
  return crypto.timingSafeEqual(bufA, bufB)
}

// Prüft, ob die aktuelle Anfrage ein gültiges Admin-Session-Cookie hat.
// Gibt entweder { client } oder { error, status } zurück.
export async function requireAdmin() {
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_COOKIE)?.value
  const expected = process.env.ADMIN_SESSION_SECRET

  if (!expected || !token || !safeEqual(token, expected)) {
    return { error: 'Keine Berechtigung', status: 403 }
  }

  const client = await clerkClient()
  return { client }
}
