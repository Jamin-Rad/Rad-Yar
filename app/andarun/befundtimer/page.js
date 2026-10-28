import { redirect } from 'next/navigation'
import { hasAndarunSession } from '@/lib/andarunPasswordAuth'
import WorkPage from '../dienste/WorkPage'
export const metadata = {
  title: 'Befundtimer · Jaminova',
  description: 'Befundzeiten erfassen und wieder ansehen.',
  robots: { index: false, follow: false },
}
export const dynamic = 'force-dynamic'
export default async function Page() {
  if (!(await hasAndarunSession())) redirect('/andarun/login?next=/andarun/befundtimer')
  return <WorkPage showHomeLink={false} view="findings" />
}
