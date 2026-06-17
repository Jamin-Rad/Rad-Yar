import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { hasCopyAllowedEmail } from '@/lib/copyPermission'

export async function GET() {
  const user = await currentUser()
  const canCopy = hasCopyAllowedEmail(user?.emailAddresses)

  return NextResponse.json({ canCopy })
}
