'use client'

import { useEffect, useState } from 'react'

export function useMobileLearningLayout(query = '(max-width: 760px)') {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    const update = () => setIsMobile(mediaQuery.matches)
    update()
    mediaQuery.addEventListener?.('change', update)
    return () => mediaQuery.removeEventListener?.('change', update)
  }, [query])

  return isMobile
}
