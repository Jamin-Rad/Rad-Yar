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
    const { action, months, promo } = await request.json()

    const target = await client.users.getUser(userId)
    if (hasAdminEmail(target.emailAddresses)) {
      return NextResponse.json({ error: 'Admin-Account kann nicht bearbeitet werden' }, { status: 400 })
    }

    if (action === 'ban' || action === 'unban') {
      const updated = action === 'ban' ? await client.users.banUser(userId) : await client.users.unbanUser(userId)
      return NextResponse.json({ banned: updated.banned, locked: updated.locked })
    }

    if (action === 'setSubscription') {
      const monthsNum = Number(months)
      if (!Number.isFinite(monthsNum) || monthsNum <= 0) {
        return NextResponse.json({ error: 'Ungültige Laufzeit' }, { status: 400 })
      }
      const existing = target.publicMetadata?.subscription || {}
      const until = new Date()
      until.setMonth(until.getMonth() + monthsNum)
      const subscription = {
        status: 'active',
        until: until.toISOString(),
        activatedAt: existing.activatedAt || new Date().toISOString(),
        promo: !!promo || !!existing.promo,
      }
      const updated = await client.users.updateUser(userId, {
        publicMetadata: { ...target.publicMetadata, subscription },
      })
      return NextResponse.json({ subscription: updated.publicMetadata?.subscription ?? subscription })
    }

    if (action === 'clearSubscription') {
      const existing = target.publicMetadata?.subscription || {}
      const subscription = { ...existing, status: 'inactive' }
      const updated = await client.users.updateUser(userId, {
        publicMetadata: { ...target.publicMetadata, subscription },
      })
      return NextResponse.json({ subscription: updated.publicMetadata?.subscription ?? subscription })
    }

    return NextResponse.json({ error: 'Unbekannte Aktion' }, { status: 400 })
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
