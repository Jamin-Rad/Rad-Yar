import { auth, clerkClient, currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

function onboardingState(user) {
  return {
    firstName: user?.firstName || '',
    passwordEnabled: !!user?.passwordEnabled,
    needsNickname: !user?.firstName,
    needsPassword: !user?.passwordEnabled,
    completed: Boolean(user?.firstName && user?.passwordEnabled),
  }
}

export async function GET() {
  const user = await currentUser()
  if (!user) return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 })
  return NextResponse.json(onboardingState(user))
}

export async function PATCH(request) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 })

  let body = {}
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Ungültige Anfrage' }, { status: 400 })
  }

  const nickname = typeof body.nickname === 'string' ? body.nickname.trim() : ''
  const password = typeof body.password === 'string' ? body.password : ''
  const specialty = typeof body.specialty === 'string' ? body.specialty : ''
  const level = typeof body.level === 'string' ? body.level : ''

  const user = await currentUser()
  if (!user) return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 })
  if (!nickname) return NextResponse.json({ error: 'Nickname fehlt' }, { status: 400 })
  if (!user.passwordEnabled && password.length < 8) {
    return NextResponse.json({ error: 'Passwort muss mindestens 8 Zeichen haben' }, { status: 400 })
  }

  const client = await clerkClient()
  const update = {
    firstName: nickname,
    unsafeMetadata: {
      ...(user.unsafeMetadata || {}),
      specialty: specialty || user.unsafeMetadata?.specialty || '',
      level: level || user.unsafeMetadata?.level || '',
      fachrichtung: specialty || user.unsafeMetadata?.fachrichtung || '',
      ausbildungsstufe: level || user.unsafeMetadata?.ausbildungsstufe || '',
      onboardingCompletedAt: new Date().toISOString(),
    },
  }
  if (!user.passwordEnabled) update.password = password

  const updated = await client.users.updateUser(userId, update)
  return NextResponse.json(onboardingState(updated))
}

