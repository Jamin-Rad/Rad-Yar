import { auth } from '@clerk/nextjs/server'
import { clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const ADMIN_EMAIL = 'dr.benjaminzia@gmail.com'

export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 })
    }

    // Prüfen ob anfragender User ein Admin ist
    const client = await clerkClient()
    const requestingUser = await client.users.getUser(userId)
    const email = requestingUser.emailAddresses?.[0]?.emailAddress

    if (email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Keine Berechtigung' }, { status: 403 })
    }

    // Alle User laden
    const { data: users } = await client.users.getUserList({ limit: 200, orderBy: '-created_at' })

    const cleaned = users.map(u => ({
      id: u.id,
      firstName: u.firstName,
      lastName: u.lastName,
      emailAddresses: u.emailAddresses,
      createdAt: u.createdAt,
      lastSignInAt: u.lastSignInAt,
    }))

    return NextResponse.json({ users: cleaned })
  } catch (err) {
    console.error('Admin API Fehler:', err)
    return NextResponse.json({ error: 'Server-Fehler' }, { status: 500 })
  }
}
