'use client'

import Link from 'next/link'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import styles from './FamilyPortalMenu.module.css'

const PAGES = [
  { href: '/mobin', label: 'Mobin' },
  { href: '/fatima', label: 'Fatima' },
  { href: '/mobina', label: 'Mobina' },
]

export default function FamilyPortalMenu({ children, className, active }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const [menuLeft, setMenuLeft] = useState(0)
  useLayoutEffect(() => {
    if (!open) return undefined
    const align = () => {
      const rect = rootRef.current?.getBoundingClientRect()
      if (rect) setMenuLeft(Math.max(8, Math.min(rect.left, window.innerWidth - 188)) - rect.left)
    }
    align()
    window.addEventListener('resize', align)
    return () => window.removeEventListener('resize', align)
  }, [open])
  useEffect(() => {
    if (!open) return undefined
    const closeOutside = event => { if (!rootRef.current?.contains(event.target)) setOpen(false) }
    document.addEventListener('pointerdown', closeOutside)
    return () => document.removeEventListener('pointerdown', closeOutside)
  }, [open])
  return (
    <div ref={rootRef} className={styles.root} dir="ltr"
      onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false) }}
      onKeyDown={event => {
        if (event.key === 'Escape') { rootRef.current?.querySelector('button')?.focus(); setOpen(false) }
      }}>
      <Link href="/andarun" target="_blank" rel="noopener noreferrer" className={className} aria-current={active ? 'page' : undefined}>{children}</Link>
      <button type="button" className={styles.toggle} aria-label="Familienseiten auswählen" aria-expanded={open} onClick={() => setOpen(true)}>
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m4 6 4 4 4-4"/></svg>
      </button>
      {open ? <nav className={styles.menu} style={{left: menuLeft}} aria-label="Familienseiten">
        {PAGES.map(page => <Link key={page.href} href={page.href} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>{page.label}</Link>)}
      </nav> : null}
    </div>
  )
}
