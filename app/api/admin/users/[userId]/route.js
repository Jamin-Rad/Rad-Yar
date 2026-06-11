import { NextResponse } from 'next/server'
import { requireAdmin, hasAdminEmail } from '@/lib/adminAuth'

export async function PATCH(request, { params }) {
  try {
    const admin = await requireAdmin()
    if (admin.error) {
      return NextResponse.json({ error: admin.error }, { status: admin.status })
    }
    const { client } = admin
    const { userId } = await params
    const { action } = await request.json()

    const target = await client.users.getUser(userId)
    if (hasAdminEmail(target.emailAddresses)) {
      return NextResponse.json({ error: 'Admin-Account kann nicht bearbeitet werden' }, { status: 400 })
    }

    let updated
    if (action === 'ban') updated = await client.users.banUser(userId)
    else if (action === 'unban') updated = await client.users.unbanUser(userId)
    else return NextResponse.json({ error: 'Unbekannte Aktion' }, { status: 400 })

    return NextResponse.json({ banned: updated.banned, locked: updated.locked })
  } catch (err) {
    console.error('Admin API Fehler:', err)
    return NextResponse.json({ error: 'Server-Fehler' }, { status: 500 })
  }
}

export async function DELETE(_request, { params }) {
  try {
    const admin = await requireAdmin()
    if (admin.error) {
      return NextResponse.json({ error: admin.error }, { status: admin.status })
    }
    const { client } = admin
    const { userId } = await params

    const target = await client.users.getUser(userId)
    if (hasAdminEmail(target.emailAddresses)) {
      return NextResponse.json({ error: 'Admin-Account kann nicht gelöscht werden' }, { status: 400 })
    }

    await client.users.deleteUser(userId)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Admin API Fehler:', err)
    return NextResponse.json({ error: 'Server-Fehler' }, { status: 500 })
  }
}
