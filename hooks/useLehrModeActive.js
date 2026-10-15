'use client'

import { useEffect, useState } from 'react'

const LEHR_MODE_STATE_EVENT = 'radyar:lehr-mode-state'

export function useLehrModeActive() {
  const [active, setActive] = useState(false)

  useEffect(() => {
    const sync = event => setActive(event?.detail?.active ?? document.documentElement.classList.contains('lehr-mode-active'))
    sync()
    window.addEventListener(LEHR_MODE_STATE_EVENT, sync)
    return () => window.removeEventListener(LEHR_MODE_STATE_EVENT, sync)
  }, [])

  return active
}
