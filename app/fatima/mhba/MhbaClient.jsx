'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

// The notebook uses browser-local annotations and hash navigation.
// Mount it only in the browser to preserve saved state without hydration drift.
const MhbaApp = dynamic(() => import('./MhbaApp'), {
  ssr: false,
  loading: () => (
    <div className="mhba-scope" lang="fa" dir="rtl" role="status" style={{ padding: 32 }}>
      در حال باز کردن دفتر مطالعه…
    </div>
  ),
})

export default function MhbaClient() {
  const [materials, setMaterials] = useState(null)
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    setError('')
    fetch('/api/fatima/mhba/materials', { signal: controller.signal, cache: 'no-store' })
      .then(async response => {
        if (response.status === 403) {
          window.location.assign('/fatima/login')
          return null
        }
        if (!response.ok) throw new Error('دریافت جزوه‌ها ممکن نشد.')
        return response.json()
      })
      .then(value => { if (value) setMaterials(value) })
      .catch(reason => { if (reason.name !== 'AbortError') setError(reason.message) })
    return () => controller.abort()
  }, [attempt])

  if (materials) return <MhbaApp materials={materials} />
  return (
    <div className="mhba-scope" lang="fa" dir="rtl" style={{ padding: 32 }}>
      <p role={error ? 'alert' : 'status'}>{error || 'در حال باز کردن دفتر مطالعه…'}</p>
      {error && <button className="outline" onClick={() => setAttempt(value => value + 1)}>تلاش دوباره</button>}
      <p><a href="/fatima">بازگشت به صفحهٔ فاطمه</a></p>
    </div>
  )
}
