import { auth, currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { ADMIN_EMAIL } from '@/lib/adminAuth'

function clean(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

export async function POST(request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 })
    }

    const user = await currentUser()
    const body = await request.json()
    const type = clean(body.type, 80)
    const subject = clean(body.subject, 120)
    const message = clean(body.message, 3000)
    const page = clean(body.page, 500)

    if (!type || !subject || message.length < 10) {
      return NextResponse.json({ error: 'Ungültige Eingabe' }, { status: 400 })
    }

    const apiKey = process.env.RESEND_API_KEY
    const from = process.env.CONTACT_FROM_EMAIL
    const to = process.env.CONTACT_TO_EMAIL || ADMIN_EMAIL

    if (!apiKey || !from) {
      console.error('Kontaktformular: RESEND_API_KEY oder CONTACT_FROM_EMAIL fehlt.')
      return NextResponse.json({ error: 'E-Mail-Versand nicht konfiguriert' }, { status: 503 })
    }

    const senderEmail = user?.primaryEmailAddress?.emailAddress || user?.emailAddresses?.[0]?.emailAddress || 'Unbekannt'
    const senderName = [user?.firstName, user?.lastName].filter(Boolean).join(' ') || 'RadYar-Nutzer'
    const text = [
      `Kategorie: ${type}`,
      `Von: ${senderName} <${senderEmail}>`,
      `Clerk User-ID: ${userId}`,
      page ? `Seite: ${page}` : null,
      '',
      message,
    ].filter(value => value !== null).join('\n')

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: senderEmail,
        subject: `[RadYar Kontakt] ${type}: ${subject}`,
        text,
      }),
    })

    if (!response.ok) {
      console.error('Kontaktformular: Resend-Fehler', response.status, await response.text())
      return NextResponse.json({ error: 'E-Mail konnte nicht gesendet werden' }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Kontaktformular:', error)
    return NextResponse.json({ error: 'Server-Fehler' }, { status: 500 })
  }
}
