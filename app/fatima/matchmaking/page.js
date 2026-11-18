import { redirect } from 'next/navigation'
import { hasFatimaSession } from '@/lib/fatimaPasswordAuth'
import { getProfiles } from './profiles'
import Matchmaking from './Matchmaking'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'همسریابی | فاطمه', robots: { index: false, follow: false } }

export default async function MatchmakingPage() {
  if (!(await hasFatimaSession())) redirect('/fatima/login')
  const profiles = getProfiles()
  if (!profiles) return <main lang="fa" dir="rtl" style={{ padding: 32 }}><h1>دفتر همسریابی فاطمه</h1><p>پرونده‌ها هنوز روی سرور فعال نشده‌اند.</p><a href="/fatima">بازگشت به صفحهٔ فاطمه</a></main>
  return <Matchmaking profiles={profiles} />
}
