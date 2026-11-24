'use client'

import { useEffect, useState } from 'react'
import { berlinStudyDay, readLocalLegacyMathSessions, readLocalStudySessions } from '@/lib/mobinStudyTime'
import { refreshMobinStudyTime } from '@/lib/mobinStudyTimeSync'

export function useMobinStudyTime() {
  const [local, setLocal] = useState({ sessions: [], mathSessions: [] })
  const [remote, setRemote] = useState(null)
  const [status, setStatus] = useState('loading')
  const [today, setToday] = useState('')

  useEffect(() => {
    let active = true
    function readLocal() {
      setToday(berlinStudyDay())
      setLocal({ sessions: readLocalStudySessions(), mathSessions: readLocalLegacyMathSessions() })
    }
    async function refresh() {
      readLocal()
      try {
        const data = await refreshMobinStudyTime()
        if (!active) return
        setRemote(data)
        setStatus(data.localOnly ? 'local' : 'ready')
      } catch {
        if (active) setStatus('local')
      }
    }
    refresh()
    window.addEventListener('focus', refresh)
    window.addEventListener('online', refresh)
    window.addEventListener('storage', readLocal)
    window.addEventListener('mobin-study-time', readLocal)
    return () => {
      active = false
      window.removeEventListener('focus', refresh)
      window.removeEventListener('online', refresh)
      window.removeEventListener('storage', readLocal)
      window.removeEventListener('mobin-study-time', readLocal)
    }
  }, [])
  return { local, remote, status, today }
}
