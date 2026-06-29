import { clerkMiddleware } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Alle Routen sind öffentlich erreichbar.
// Clerk ist nur aktiv wenn User angemeldet ist → dann werden Features freigeschaltet.
// Keine Route ist "protected" — Flashcards und MCQs sind ohne Login nutzbar.
const publicMiddleware = clerkMiddleware()

export default function middleware(request, event) {
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next()
  }

  return publicMiddleware(request, event)
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
