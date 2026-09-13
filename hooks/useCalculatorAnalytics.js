'use client'

import { useCallback, useEffect, useRef } from 'react'
import { PRIVACY_CHOICE_EVENT } from '@/components/LegalNotice'
import { trackCalculatorEvent } from '@/utils/calculatorAnalytics'

export function useCalculatorAnalytics(tool) {
  const viewed = useRef(false)
  const started = useRef(false)
  const completed = useRef(false)

  const track = useCallback(event => trackCalculatorEvent(tool, event), [tool])
  const start = useCallback(() => {
    if (!started.current && track('start')) started.current = true
  }, [track])
  const complete = useCallback(() => {
    if (!completed.current && track('complete')) completed.current = true
  }, [track])
  const restart = useCallback(() => {
    track('restart')
    started.current = false
    completed.current = false
  }, [track])

  useEffect(() => {
    const recordView = () => {
      if (!viewed.current && track('view')) viewed.current = true
    }
    recordView()
    window.addEventListener(PRIVACY_CHOICE_EVENT, recordView)
    return () => window.removeEventListener(PRIVACY_CHOICE_EVENT, recordView)
  }, [track])

  return { track, start, complete, restart }
}
