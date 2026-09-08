'use client'

import { useEffect, useState } from 'react'

function installLearningAccordion() {
  if (window.__radYarLearningAccordionInstalled) return
  window.__radYarLearningAccordionInstalled = true

  let preferredId = null
  let initialized = false
  let scheduled = false
  const sectionHeaders = () => [...document.querySelectorAll('main section[id] > button[aria-expanded]')]
  const reconcile = () => {
    scheduled = false
    const headers = sectionHeaders()
    if (!headers.length) return
    if (!initialized) {
      initialized = true
      preferredId = headers[0].parentElement?.id || null
    }
    const expanded = headers.filter(button => button.getAttribute('aria-expanded') === 'true')
    let target = preferredId ? headers.find(button => button.parentElement?.id === preferredId) : expanded[0]
    if (preferredId && target?.getAttribute('aria-expanded') !== 'true') target.click()
    if (!target && expanded.length) target = expanded[0]
    expanded.forEach(button => { if (button !== target) button.click() })
  }
  const schedule = () => {
    if (scheduled) return
    scheduled = true
    window.setTimeout(reconcile, 0)
  }

  document.addEventListener('click', event => {
    const header = event.target.closest?.('main section[id] > button[aria-expanded]')
    if (header) {
      if (event.isTrusted) preferredId = header.getAttribute('aria-expanded') === 'true' ? null : header.parentElement?.id
      schedule()
      return
    }
    const sidebarButton = event.target.closest?.('main aside button')
    if (!sidebarButton) return
    const sidebarButtons = [...sidebarButton.closest('aside').querySelectorAll('button')]
    const sections = [...document.querySelectorAll('main section[id]')]
    const target = sections[sidebarButtons.indexOf(sidebarButton)]
    if (target) {
      preferredId = target.id
      schedule()
    }
  }, true)

  new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['aria-expanded'] })
  schedule()
}

export function useMobileLearningLayout(query = '(max-width: 760px)') {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    installLearningAccordion()
    const mediaQuery = window.matchMedia(query)
    const update = () => setIsMobile(mediaQuery.matches)
    update()
    mediaQuery.addEventListener?.('change', update)
    return () => mediaQuery.removeEventListener?.('change', update)
  }, [query])

  return isMobile
}
