'use client'

import { useCallback, useEffect, useState } from 'react'

// Run after React has committed the newly opened chapter and closed the old one.
// A new request also realigns an already-selected chapter; rapid clicks cancel stale work.
export function useLessonSectionScroll() {
  const [request, setRequest] = useState(null)
  const scrollToSection = useCallback(id => {
    setRequest(previous => ({ id, sequence: (previous?.sequence || 0) + 1 }))
  }, [])

  useEffect(() => {
    if (!request) return
    let secondFrame
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => {
        const section = document.getElementById(request.id)
        const main = section?.closest('main')
        if (!section || !main) return
        main.style.setProperty('--lesson-scroll-room', '0px')
        const navbar = document.querySelector('[data-radyar-navbar]')
        const navbarBottom = navbar?.getBoundingClientRect().bottom || 64
        const margin = parseFloat(getComputedStyle(section).scrollMarginTop) || 90
        const offset = Math.max(margin, navbarBottom + 12)
        const top = Math.max(0, window.scrollY + section.getBoundingClientRect().top - offset)
        const available = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
        // Short final chapters still need enough room to place their header below the navbar.
        main.style.setProperty('--lesson-scroll-room', Math.ceil(Math.max(0, top - available)) + 'px')
        window.scrollTo({ top, behavior: 'instant' })
      })
    })
    return () => {
      cancelAnimationFrame(firstFrame)
      if (secondFrame !== undefined) cancelAnimationFrame(secondFrame)
    }
  }, [request])

  return scrollToSection
}
