'use client'

import { AuthenticateWithRedirectCallback } from '@clerk/nextjs'

// Diese Seite fängt den Redirect von Google/Apple ab
// und schließt den OAuth-Flow ab.
export default function SSOCallback() {
  return (
    <AuthenticateWithRedirectCallback
      signInFallbackRedirectUrl="/"
      signUpFallbackRedirectUrl="/"
    />
  )
}
