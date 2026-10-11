import { redirect } from 'next/navigation'
import { hasAndarunSession } from '@/lib/andarunPasswordAuth'
import FriendAccountReport from './FriendAccountReport'

export const metadata = {
  title: 'گزارش گردش حساب | Andarun',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function FriendAccountPrintPage({ searchParams }) {
  if (!(await hasAndarunSession())) redirect('/andarun/login?next=/andarun/finanz/freunde')
  const params = await searchParams
  return <FriendAccountReport accountId={params?.account} autoPrint={params?.print === '1'} />
}
