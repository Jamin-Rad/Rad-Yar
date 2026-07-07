import { clerkMiddleware } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const MOBIN_COOKIE = 'mobin_session'

// Alle Routen sind öffentlich erreichbar.
// Clerk ist nur aktiv wenn User angemeldet ist → dann werden Features freigeschaltet.
// Keine Route ist "protected" — Flashcards und MCQs sind ohne Login nutzbar.
// Ausnahme: /mobin/* erfordert ein gültiges Mobin-Session-Cookie.
export default clerkMiddleware(async (auth, request) => {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/mobin') && !pathname.startsWith('/mobin/login')) {
    const token = request.cookies.get(MOBIN_COOKIE)?.value
    const secret = process.env.MOBIN_SESSION_SECRET

    if (!secret || !token || token !== secret) {
      const loginUrl = new URL('/mobin/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
