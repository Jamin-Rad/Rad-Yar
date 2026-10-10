import { redirect } from 'next/navigation'
import { hasAndarunSession } from '@/lib/andarunPasswordAuth'
import AndarunNav from '../../AndarunNav'
import FriendsFinancePage from './FriendsFinancePage'

export const metadata = {
  title: 'حساب‌های مالی دوستان | Andarun',
  description: 'ثبت بدهکاری، بستانکاری و گردش حساب دوستان',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function FriendsFinanceRoute() {
  if (!(await hasAndarunSession())) redirect('/andarun/login?next=/andarun/finanz/freunde')

  return (
    <>
      <AndarunNav />
      <FriendsFinancePage />
    </>
  )
}
