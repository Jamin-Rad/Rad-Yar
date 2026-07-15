'use client'

import Link from 'next/link'
import { ClerkLoaded, ClerkLoading, useUser } from '@clerk/nextjs'
import styles from './Navbar.module.css'

const ADMIN_EMAIL = 'dr.benjaminzia@gmail.com'

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

function GridIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  )
}

function AndarunIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3 3 9l9 6 9-6-9-6Z"/>
      <path d="m3 15 9 6 9-6"/>
      <path d="m3 12 9 6 9-6"/>
    </svg>
  )
}

function AdminPortalLinks() {
  return (
    <div className={styles.adminPortals} aria-label="Admin Bereiche">
      <Link href="/andarun" className={styles.portalAndarun}>
        <AndarunIcon />
        Andarun
      </Link>
      <Link href="/admin" className={styles.portalAdmin}>
        <GridIcon />
        Admin-Bereich
      </Link>
    </div>
  )
}

function LoadedNavActions({ lang, signInLabel }) {
  const { user, isSignedIn } = useUser()
  const greeting = getGreeting(lang)
  const displayName = user?.firstName || user?.username || user?.emailAddresses?.[0]?.emailAddress?.split('@')[0]
  const initials = (displayName?.[0] || '?').toUpperCase()
  const isAdmin = user?.primaryEmailAddress?.emailAddress === ADMIN_EMAIL

  if (!isSignedIn) {
    return <Link href="/sign-in" className={styles.signInBtn}>{signInLabel}</Link>
  }

  return (
    <>
      {isAdmin && <AdminPortalLinks />}
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
    </>
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
