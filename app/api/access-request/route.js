import { auth, clerkClient, currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { ADMIN_EMAIL } from '@/lib/adminAuth'
import { canonicalUserEmail } from '@/lib/emailIdentity'
import { getLessonStatus, normalizeLessonPath } from '@/data/lessonStatus'
import {
  PROMO_MONTHS,
  RENEWAL_MONTHS,
  getLearningAccess,
  getProRequestKind,
  hasEarlyAccess,
  hasFullAccess,
  isSubscriptionActive,
} from '@/utils/subscription'

function clean(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

async function sendAdminEmail({ user, userId, subject, lines }) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.CONTACT_FROM_EMAIL
  const to = process.env.CONTACT_TO_EMAIL || ADMIN_EMAIL
  if (!apiKey || !from) {
    console.error('Zugriffsanfrage: RESEND_API_KEY oder CONTACT_FROM_EMAIL fehlt.')
    return false
  }

  const senderEmail = user?.primaryEmailAddress?.emailAddress || user?.emailAddresses?.[0]?.emailAddress || 'Unbekannt'
  const senderName = [user?.firstName, user?.lastName].filter(Boolean).join(' ') || 'RadYar-Nutzer'
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: senderEmail,
      subject,
      text: [
        `Von: ${senderName} <${senderEmail}>`,
        `Clerk User-ID: ${userId}`,
        '',
        ...lines,
      ].join('\n'),
    }),
  })

  if (!response.ok) {
    console.error('Zugriffsanfrage: Resend-Fehler', response.status, await response.text())
    return false
  }
  return true
}

async function updateSameEmailUsers(client, user, learningAccess) {
  const email = canonicalUserEmail(user)
  let targets = [user]
  if (email) {
    const { data } = await client.users.getUserList({ limit: 200 })
    const matching = (data || []).filter(candidate => canonicalUserEmail(candidate) === email)
    if (matching.length) targets = matching
  }

  await Promise.all(targets.map(target => client.users.updateUser(target.id, {
    publicMetadata: { ...target.publicMetadata, learningAccess },
  })))
}

export async function POST(request) {
  try {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 })

    const user = await currentUser()
    if (!user) return NextResponse.json({ error: 'Nutzer nicht gefunden' }, { status: 404 })

    const body = await request.json()
    const type = clean(body.type, 40)
    const client = await clerkClient()
    const access = getLearningAccess(user)
    const now = new Date().toISOString()

    if (type === 'pro') {
      if (isSubscriptionActive(user)) {
        return NextResponse.json({ error: 'Das Pro-Abonnement ist bereits aktiv.' }, { status: 409 })
      }
      const kind = getProRequestKind(user)
      const months = kind === 'welcome' ? PROMO_MONTHS : RENEWAL_MONTHS
      if (access.proRequest?.status === 'pending' && access.proRequest?.kind === kind) {
        return NextResponse.json({ ok: true, duplicate: true, request: access.proRequest })
      }

      const proRequest = { status: 'pending', kind, months, requestedAt: now }
      const learningAccess = {
        earlyAccessPaths: access.earlyAccessPaths,
        earlyAccessRequests: access.earlyAccessRequests,
        proRequest,
      }
      await updateSameEmailUsers(client, user, learningAccess)
      const emailSent = await sendAdminEmail({
        user,
        userId,
        subject: kind === 'welcome'
          ? `[RadYar] Neue ${months}-Monate-Pro-Anfrage`
          : `[RadYar] Neue ${months}-Monate-Verlängerungsanfrage`,
        lines: [
          kind === 'welcome' ? 'Art: Willkommensangebot' : 'Art: Verlängerung',
          `Gewünschte Laufzeit: ${months} Monate`,
          'Die Anfrage kann im Admin-Dashboard bestätigt oder abgelehnt werden.',
        ],
      })
      return NextResponse.json({ ok: true, emailSent, request: proRequest })
    }

    if (type === 'early_access') {
      if (!hasFullAccess(user)) {
        return NextResponse.json({ error: 'Für Frühzugriff ist ein aktiver Pro-Zugang erforderlich.' }, { status: 403 })
      }
      const pathname = normalizeLessonPath(clean(body.pathname, 500).split('?')[0])
      const title = clean(body.title, 180)
      if (!pathname || getLessonStatus(pathname) !== 'in_progress') {
        return NextResponse.json({ error: 'Diese Seite ist nicht für Frühzugriff vorgesehen.' }, { status: 400 })
      }
      if (hasEarlyAccess(user, pathname)) {
        return NextResponse.json({ ok: true, alreadyGranted: true })
      }
      const existing = access.earlyAccessRequests[pathname]
      if (existing?.status === 'pending') {
        return NextResponse.json({ ok: true, duplicate: true, request: existing })
      }

      const earlyRequest = { status: 'pending', requestedAt: now, title: title || pathname }
      const learningAccess = {
        earlyAccessPaths: access.earlyAccessPaths,
        proRequest: access.proRequest,
        earlyAccessRequests: { ...access.earlyAccessRequests, [pathname]: earlyRequest },
      }
      await updateSameEmailUsers(client, user, learningAccess)
      const emailSent = await sendAdminEmail({
        user,
        userId,
        subject: '[RadYar] Anfrage auf Frühzugriff',
        lines: [
          `Lektion: ${title || pathname}`,
          `Pfad: ${pathname}`,
          'Die Anfrage kann im Admin-Dashboard bestätigt oder abgelehnt werden.',
        ],
      })
      return NextResponse.json({ ok: true, emailSent, request: earlyRequest })
    }

    return NextResponse.json({ error: 'Unbekannte Anfrage' }, { status: 400 })
  } catch (error) {
    console.error('Zugriffsanfrage:', error)
    return NextResponse.json({ error: 'Server-Fehler' }, { status: 500 })
  }
}
