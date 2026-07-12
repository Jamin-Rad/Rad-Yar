import { redirect } from 'next/navigation'
import { hasAndarunSession } from '@/lib/andarunPasswordAuth'
import AndarunLanding from './AndarunLanding'

export const metadata = {
  title: 'Andarun',
  description: 'Privater Bereich',
  robots: {
    index: false,
    follow: false,
  },
}

export const dynamic = 'force-dynamic'

export default async function AndarunPage() {
  if (!(await hasAndarunSession())) redirect('/andarun/login')

  return <AndarunLanding />
}
