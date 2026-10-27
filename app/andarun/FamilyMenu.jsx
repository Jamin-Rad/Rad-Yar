'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { FAMILY_SPACES } from '@/data/familySpaces'
import styles from './FamilyMenu.module.css'

export default function FamilyMenu() {
  const menu = useRef(null)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (!open) return
    const close = event => {
      const escape = event.type === 'keydown' && event.key === 'Escape'
      if (escape || (event.type === 'pointerdown' && !menu.current?.contains(event.target))) {
        if (menu.current) menu.current.open = false
        if (escape) menu.current?.querySelector('summary')?.focus()
      }
    }
    document.addEventListener('pointerdown', close)
    document.addEventListener('keydown', close)
    return () => { document.removeEventListener('pointerdown', close); document.removeEventListener('keydown', close) }
  }, [open])

  return <details className={styles.menu} ref={menu} onToggle={event => setOpen(event.currentTarget.open)}>
    <summary aria-label="Familie öffnen" aria-controls="family-navigation">
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3" /><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 5a3 3 0 0 1 0 6M17 14a5 5 0 0 1 4 5v2" /></svg>
      <span>Familie</span>
      <svg className={styles.caret} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
    </summary>
    <nav id="family-navigation" className={styles.dropdown} aria-label="Familienbereiche">
      <p>Deine Familie</p>
      {FAMILY_SPACES.map(member => <Link key={member.id} href={member.href} aria-label={`${member.name} öffnen`} onClick={() => { if (menu.current) menu.current.open = false }}>
        <span className={styles.avatar} aria-hidden="true">{member.initials}</span>
        <span className={styles.copy}><strong>{member.name}</strong><small>{member.description}</small></span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg>
      </Link>)}
    </nav>
  </details>
}
