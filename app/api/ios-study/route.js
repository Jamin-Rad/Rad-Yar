import { clerkClient } from '@clerk/nextjs/server'
import { createHash } from 'node:crypto'
import { getProAccess, hasFullAccess } from '@/utils/subscription'
import { buildStudyBank } from '@/lib/iosStudyBank'
import { readStudyGrant } from '@/lib/iosStudyGrant'

const headers = { 'Cache-Control': 'private, no-store' }
let snapshot

export async function GET(request) {
  const token = request.headers.get('x-radyar-grant')
  const grant = readStudyGrant(token, request.headers.get('x-radyar-verifier'))
  if (!grant) return Response.json({ error: 'unauthorized' }, { status: 401, headers })

  const clerk = await clerkClient()
  let session
  let user
  try {
    session = await clerk.sessions.getSession(grant.sessionId)
    if (session.status !== 'active') {
      return Response.json({ error: 'unauthorized' }, { status: 401, headers })
    }
    user = await clerk.users.getUser(session.userId)
  } catch (error) {
    if (error.status === 404) return Response.json({ error: 'unauthorized' }, { status: 401, headers })
    throw error
  }
  if (!hasFullAccess(user)) return Response.json({ error: 'access' }, { status: 403, headers })

  const access = getExpiry(user, grant.expires)
  if (!snapshot) {
    const body = JSON.stringify(buildStudyBank())
    snapshot = { body, etag: `"${createHash('sha256').update(body).digest('hex')}"` }
  }
  const responseHeaders = {
    ...headers,
    ETag: snapshot.etag,
    'X-RadYar-Access-Until': String(access),
    'X-RadYar-Account': encodeURIComponent(user.username || user.primaryEmailAddress?.emailAddress || ''),
    'X-RadYar-Account-ID': user.id,
  }
  if (request.headers.get('if-none-match') === snapshot.etag) {
    return new Response(null, { status: 304, headers: responseHeaders })
  }
  return new Response(snapshot.body, {
    headers: { ...responseHeaders, 'Content-Type': 'application/json; charset=utf-8' },
  })
}

function getExpiry(user, grantExpiry) {
  const until = getProAccess(user).until
  return until ? Math.min(grantExpiry, Date.parse(until)) : grantExpiry
}
