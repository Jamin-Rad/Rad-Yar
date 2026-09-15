import { redirect } from 'next/navigation'
import { hasPrisonerAidSession } from '@/lib/prisonerAidAuth'
import PrisonerAidPage from '../PrisonerAidPage'

export const metadata = { title: 'ویرایش | کمک به زندانیان', robots: { index: false, follow: false } }
export const dynamic = 'force-dynamic'

export default async function Page({ searchParams }) {
  if (!(await hasPrisonerAidSession())) redirect('/andarun/finanz/gefangene/login?next=/andarun/finanz/gefangene/edit')
  const params = await searchParams
  return <PrisonerAidPage mode="edit"
    initialRecipientId={typeof params?.recipient === 'string' ? params.recipient : ''}
    initialPrisonerId={typeof params?.prisoner === 'string' ? params.prisoner : ''} />
}
