import { redirect } from 'next/navigation'
import { hasAndarunSession } from '@/lib/andarunPasswordAuth'
import FindingCollectionPage from './FindingCollectionPage'

export const metadata = {
  title: 'Fallsammlung · Jaminova',
  description: 'Interessante Befunde und Befundkontrollen zum späteren Wiederansehen sammeln.',
  robots: { index: false, follow: false },
}
export const dynamic = 'force-dynamic'
export default async function Page() {
  if (!(await hasAndarunSession())) redirect('/andarun/login?next=/andarun/befunde')
  return <FindingCollectionPage />
}
