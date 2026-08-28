import { redirect } from 'next/navigation'
import { hasDigitDASession } from '@/lib/digitdaAuth'
import DigitDALogin from './DigitDALogin'

export const metadata = { title: 'DigitDA · ورود', robots: { index: false, follow: false } }
export const dynamic = 'force-dynamic'

export default async function DigitDALoginPage() {
  if (await hasDigitDASession()) redirect('/digitda')
  return <DigitDALogin />
}
