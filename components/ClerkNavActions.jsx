'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ClerkLoaded, ClerkLoading, useUser } from '@clerk/nextjs'
import styles from './Navbar.module.css'

const ADMIN_EMAIL = 'dr.benjamin.zia@gmail.com'

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

function LockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  )
}

function ChevronIcon({ open }) {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>
      <path d="M6 9l6 6 6-6"/>
    </svg>
  )
}

function EuroIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 10h12M4 14h12M19.5 9a7.5 7.5 0 1 0 0 6"/>
    </svg>
  )
}

function HeartIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  )
}

function GridIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  )
}

function PrivateZoneMenu() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    function onOutside(e) {
      if (!ref.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onOutside)
    return () => document.removeEventListener('mousedown', onOutside)
  }, [open])

  return (
    <div ref={ref} className={styles.privateZone}>
      <button
        className={styles.privateBtn}
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-label="Privater Bereich öffnen"
      >
        <LockIcon />
        Privat
        <ChevronIcon open={open} />
      </button>
      {open && (
        <div className={styles.privateDropdown} role="menu">
          <Link href="/andarun/finanz" className={styles.privateDropdownLink} onClick={() => setOpen(false)} role="menuitem">
            <EuroIcon />
            Finanzen
          </Link>
          <Link href="/admin/health" className={styles.privateDropdownLink} onClick={() => setOpen(false)} role="menuitem">
            <HeartIcon />
            Gesundheit
          </Link>
          <div className={styles.privateDropdownSep} aria-hidden="true" />
          <Link href="/admin" className={`${styles.privateDropdownLink} ${styles.privateDropdownMuted}`} onClick={() => setOpen(false)} role="menuitem">
            <GridIcon />
            Admin-Dashboard
          </Link>
        </div>
      )}
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
      {isAdmin && <PrivateZoneMenu />}
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
