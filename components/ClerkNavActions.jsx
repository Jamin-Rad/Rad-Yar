'use client'

import Link from 'next/link'
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs'
import styles from './Navbar.module.css'

function getGreeting(lang) {
  const h = new Date().getHours()
  if (lang === 'fa') {
    if (h >= 5 && h < 12) return 'صبح بخیر'
    if (h >= 12 && h < 18) return 'روز بخیر'
    return 'شب بخیر'
  }
  if (lang === 'en') {
    if (h >= 5 && h < 12) return 'Good morning'
    if (h >= 12 && h < 18) return 'Good afternoon'
    return 'Good evening'
  }
  if (h >= 5 && h < 12) return 'Guten Morgen'
  if (h >= 12 && h < 18) return 'Guten Tag'
  return 'Guten Abend'
}

export default function ClerkNavActions({ lang = 'de' }) {
  const { user } = useUser()

  const signInLabel = lang === 'fa' ? 'ورود' : lang === 'en' ? 'Sign in' : 'Anmelden'
  const greeting = getGreeting(lang)
  const displayName = user?.firstName || user?.username || user?.emailAddresses?.[0]?.emailAddress?.split('@')[0]
  const initials = (displayName?.[0] || '?').toUpperCase()

  return (
    <>
      <SignedOut>
        <Link href="/sign-in" className={styles.signInBtn}>{signInLabel}</Link>
      </SignedOut>

      <SignedIn>
        <Link href="/profil" className={styles.profileLink}>
          {user?.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img className={styles.profileAvatar} src={user.imageUrl} alt="" />
          ) : (
            <span className={styles.profileAvatarFallback}>{initials}</span>
          )}
          <span className={styles.profileCopy}>
            <span className={styles.greeting}>{greeting}</span>
            <strong className={styles.profileName}>{displayName}</strong>
          </span>
        </Link>
      </SignedIn>
    </>
  )
}
