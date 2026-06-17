'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { hasCopyAllowedEmail } from '@/lib/copyPermission'

export default function AdminCopyMode() {
  const { isLoaded, user } = useUser()
  const [canCopy, setCanCopy] = useState(false)

  useEffect(() => {
    let active = true

    if (!isLoaded) return () => {
      active = false
    }

    setCanCopy(hasCopyAllowedEmail(user?.emailAddresses))

    fetch('/api/copy-permission', { cache: 'no-store' })
      .then(response => response.json())
      .then(data => {
        if (active) setCanCopy(!!data.canCopy)
      })
      .catch(() => {
        if (active) setCanCopy(hasCopyAllowedEmail(user?.emailAddresses))
      })

    return () => {
      active = false
    }
  }, [isLoaded, user?.id, user?.emailAddresses])

  useEffect(() => {
    document.documentElement.classList.toggle('admin-copy-enabled', canCopy)

    function blockRestrictedCopy(event) {
      if (canCopy) return
      event.preventDefault()
      window.getSelection?.()?.removeAllRanges()
    }

    document.addEventListener('copy', blockRestrictedCopy)
    document.addEventListener('cut', blockRestrictedCopy)
    document.addEventListener('selectstart', blockRestrictedCopy)

    return () => {
      document.removeEventListener('copy', blockRestrictedCopy)
      document.removeEventListener('cut', blockRestrictedCopy)
      document.removeEventListener('selectstart', blockRestrictedCopy)
      document.documentElement.classList.remove('admin-copy-enabled')
    }
  }, [canCopy])

  return null
}
