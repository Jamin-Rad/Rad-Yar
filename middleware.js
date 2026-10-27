import { clerkMiddleware } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { familyCookiesAllowAccess } from './lib/familySession'

const MOBIN_COOKIE = 'mobin_session'

// Der Middleware-Header stellt den aktuellen Pfad für serverseitige
// Lernzugriffs-Gates bereit. Öffentliche Rechner bleiben davon ausgenommen.
// /mobin/* accepts the member session or the authenticated Jaminova owner.
export default clerkMiddleware(async (auth, request) => {
  const { pathname } = request.nextUrl

  if ((pathname === '/mobin' || pathname.startsWith('/mobin/')) && !pathname.startsWith('/mobin/login')) {
    const secret = process.env.MOBIN_SESSION_SECRET || process.env.ADMIN_SESSION_SECRET
    const ownerSecret = process.env.ANDARUN_SESSION_SECRET || process.env.ADMIN_SESSION_SECRET

    if (!familyCookiesAllowAccess(request.cookies, MOBIN_COOKIE, secret, ownerSecret)) {
      const loginUrl = new URL('/mobin/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-radyar-pathname', pathname)
  return NextResponse.next({ request: { headers: requestHeaders } })
})

export const config = {
  matcher: [
    // Public standalone tools and self-managed learning pages bypass Clerk middleware entirely.
    // Also skip Next.js internals and all static files.
    '/((?!(?:kaiser-score|fleischner|node-rads|khk-vortestwahrscheinlichkeit|digitda|exam|andarun|mobin/kaenguru)(?:/|$)|api/(?:digitda|personal-calendar|andarun|mobin/kaenguru)(?:/|$)|_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|wav|mp3|m4a|ogg|aac|flac|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/api/((?!(?:digitda|personal-calendar|andarun|mobin/kaenguru)(?:/|$)).*)',
    '/trpc(.*)',
  ],
}
