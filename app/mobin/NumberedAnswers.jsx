'use client'

import { useEffect } from 'react'

export default function NumberedAnswers() {
  useEffect(() => {
    function selectAnswer(event) {
      if (event.repeat && event.key === 'Enter' && event.target instanceof Element && event.target.closest('[data-mobin-enter], [data-mobin-option]')) event.preventDefault()
      if (event.defaultPrevented || event.repeat || event.isComposing || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return
      const target = event.target
      if (event.key === 'Enter') {
        if (target instanceof Element && target.closest('textarea, select, [contenteditable]:not([contenteditable="false"])')) return
        const dialog = document.querySelector('dialog[open], [role="dialog"][aria-modal="true"]')
        const actions = (dialog || document).querySelectorAll('[data-mobin-enter]:not([data-mobin-enter="false"])')
        const action = Array.from(actions).find(el => el.getClientRects().length && !el.matches(':disabled') && el.getAttribute('aria-disabled') !== 'true')
        if (!action) return
        const inputForm = target instanceof Element ? target.closest('form') : null
        if (inputForm && action.form !== inputForm) return
        // Let unrelated focused controls retain their normal Enter behavior.
        if (target instanceof Element && target.closest('button, a, summary') && target !== action && !target.closest('[data-mobin-option]')) return
        event.preventDefault()
        action.click()
        return
      }
      if (target instanceof Element && target.closest('textarea, select, input:not([type="radio"]):not([type="checkbox"]), [contenteditable]:not([contenteditable="false"])')) return
      const digits = ['123456789', '۱۲۳۴۵۶۷۸۹', '١٢٣٤٥٦٧٨٩']
      const index = digits.map(set => set.indexOf(event.key)).find(value => value >= 0)
      if (index === undefined) return
      const dialog = document.querySelector('dialog[open], [role="dialog"][aria-modal="true"]')
      const options = (dialog || document).querySelectorAll(`[data-mobin-option="${index + 1}"]`)
      const option = Array.from(options).find(el => el.getClientRects().length && !el.matches(':disabled') && el.getAttribute('aria-disabled') !== 'true')
      if (!option) return
      event.preventDefault()
      option.click()
    }
    window.addEventListener('keydown', selectAnswer, true)
    return () => window.removeEventListener('keydown', selectAnswer, true)
  }, [])
  return null
}
