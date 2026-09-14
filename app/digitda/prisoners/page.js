import { redirect } from 'next/navigation'
import { hasDigitDASession } from '@/lib/digitdaAuth'
import PrisonerAidPage from './PrisonerAidPage'

export const metadata = {
  title: 'DigitDA · کمک به زندانیان',
  description: 'ثبت و پیگیری کمک‌های مالی برای آزادی زندانیان جرائم غیرعمد',
  robots: { index: false, follow: false },
}
export const dynamic = 'force-dynamic'

export default async function PrisonersPage() {
  if (!(await hasDigitDASession())) redirect('/digitda/login')
  return <PrisonerAidPage />
}
