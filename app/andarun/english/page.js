import { redirect } from 'next/navigation'
import { hasAndarunSession } from '@/lib/andarunPasswordAuth'
import EnglishApp from './EnglishApp'

export const metadata = {
  title: 'Jaminova English',
  description: 'تمرین شخصی واژگان، گرامر و مکالمهٔ انگلیسی',
  robots: { index: false, follow: false },
  alternates: { canonical: '/andarun/english' },
}

export const dynamic = 'force-dynamic'

export default async function EnglishPage() {
  if (!(await hasAndarunSession())) redirect('/andarun/login?next=/andarun/english')
  return <EnglishApp />
}
