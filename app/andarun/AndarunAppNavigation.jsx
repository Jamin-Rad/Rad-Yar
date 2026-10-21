'use client'

import { useEffect } from 'react'
import { isAndarunAppBoundary } from '@/lib/andarunWebApps'

export default function AndarunAppNavigation() {
  useEffect(() => {
    function navigate(event) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const link = event.target.closest?.('a[href]')
      if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self')) return
      const destination = new URL(link.href, window.location.href)
      if (destination.origin !== window.location.origin || !isAndarunAppBoundary(window.location.pathname, destination.pathname)) return

      // Mobile installers can retain the initial document's manifest after SPA
      // navigation. Load a new document when crossing installable app boundaries.
      // Next Link respects defaultPrevented; navigation within a tool stays fast.
      event.preventDefault()
      window.location.assign(destination.href)
    }
    document.addEventListener('click', navigate, true)
    return () => document.removeEventListener('click', navigate, true)
  }, [])
  return null
}
