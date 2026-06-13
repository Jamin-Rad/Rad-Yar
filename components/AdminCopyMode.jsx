'use client'

import { useEffect } from 'react'

export default function AdminCopyMode() {
  useEffect(() => {
    let active = true
    fetch('/api/admin/session', { cache: 'no-store' })
      .then(response => response.json())
      .then(data => {
        if (active && data.isAdmin) document.documentElement.classList.add('admin-copy-enabled')
      })
      .catch(() => {})

    return () => {
      active = false
      document.documentElement.classList.remove('admin-copy-enabled')
    }
  }, [])

  return null
}
