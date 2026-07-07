import { redirect } from 'next/navigation'
import { hasFatimaSession } from '@/lib/fatimaPasswordAuth'
import FatimaLanding from './FatimaLanding'

export const metadata = {
  title: 'Fatima',
  description: 'Privater Bereich',
  robots: {
    index: false,
    follow: false,
  },
}

export const dynamic = 'force-dynamic'

export default async function FatimaPage() {
  if (!(await hasFatimaSession())) redirect('/fatima/login')

  return <FatimaLanding />
}
