import { clerkMiddleware } from '@clerk/nextjs/server'

// Alle Routen sind öffentlich erreichbar.
// Clerk ist nur aktiv wenn User angemeldet ist → dann werden Features freigeschaltet.
// Keine Route ist "protected" — Flashcards und MCQs sind ohne Login nutzbar.
export default clerkMiddleware()

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
