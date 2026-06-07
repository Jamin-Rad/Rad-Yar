'use client'

import Link from 'next/link'
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs'
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
  const profilLabel = lang === 'fa' ? 'پروفایل' : lang === 'en' ? 'Profile' : 'Mein Profil'
  const greeting = getGreeting(lang)

  return (
    <>
      <SignedOut>
        <Link href="/sign-in" className={styles.signInBtn}>{signInLabel}</Link>
      </SignedOut>

      <SignedIn>
        {user?.firstName && (
          <span className={styles.greeting}>
            {greeting}, <strong>{user.firstName}</strong>
          </span>
        )}
        <UserButton afterSignOutUrl="/">
          <UserButton.MenuItems>
            <UserButton.Link
              label={profilLabel}
              labelIcon={<span style={{ fontSize: 14 }}>👤</span>}
              href="/profil"
            />
          </UserButton.MenuItems>
        </UserButton>
      </SignedIn>
    </>
  )
}
