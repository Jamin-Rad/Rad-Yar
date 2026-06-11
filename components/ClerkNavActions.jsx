'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ClerkLoaded, ClerkLoading, useUser } from '@clerk/nextjs'
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

function LoadedNavActions({ lang, signInLabel }) {
  const { user, isSignedIn } = useUser()
  const greeting = getGreeting(lang)
  const displayName = user?.firstName || user?.username || user?.emailAddresses?.[0]?.emailAddress?.split('@')[0]
  const initials = (displayName?.[0] || '?').toUpperCase()

  if (!isSignedIn) {
    return <Link href="/sign-in" className={styles.signInBtn}>{signInLabel}</Link>
  }

  return (
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
  )
}

function ClerkReady({ onReady }) {
  useEffect(() => {
    onReady?.()
  }, [onReady])
  return null
}

export default function ClerkNavActions({ lang = 'de', onReady }) {
  const signInLabel = lang === 'fa' ? 'ورود' : lang === 'en' ? 'Sign in' : 'Anmelden'

  return (
    <>
      <ClerkLoading>
        <span aria-hidden="true" />
      </ClerkLoading>
      <ClerkLoaded>
        <ClerkReady onReady={onReady} />
        <LoadedNavActions lang={lang} signInLabel={signInLabel} />
      </ClerkLoaded>
    </>
  )
}
