import { clerkMiddleware } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const MOBIN_COOKIE = 'mobin_session'

// Der Middleware-Header stellt den aktuellen Pfad für serverseitige
// Lernzugriffs-Gates bereit. Öffentliche Rechner bleiben davon ausgenommen.
// /mobin/* erfordert zusätzlich ein gültiges Mobin-Session-Cookie.
export default clerkMiddleware(async (auth, request) => {
  const { pathname } = request.nextUrl

  if ((pathname === '/mobin' || pathname.startsWith('/mobin/')) && !pathname.startsWith('/mobin/login')) {
    const token = request.cookies.get(MOBIN_COOKIE)?.value
    const secret = process.env.MOBIN_SESSION_SECRET

    if (!secret || !token || token !== secret) {
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
    // Öffentliche Standalone-Rechner umgehen Clerk vollständig.
    // Also skip Next.js internals and all static files.
    '/((?!(?:kaiser-score|khk-vortestwahrscheinlichkeit)(?:/|$)|_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
