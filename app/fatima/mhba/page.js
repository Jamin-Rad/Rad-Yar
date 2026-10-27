import { redirect } from 'next/navigation'
import { hasFatimaSession } from '@/lib/fatimaPasswordAuth'
import MhbaClient from './MhbaClient'
import './mhba.css'

export const metadata = {
  title: 'MHBA | Fatima',
  description: 'دفتر مطالعهٔ شخصی فاطمه؛ درس‌های MHBA، هایلایت، مرور و تمرین امتحان.',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function MhbaPage() {
  if (!(await hasFatimaSession())) redirect('/fatima/login')
  return <MhbaClient />
}
