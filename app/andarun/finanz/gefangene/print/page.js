import { redirect } from 'next/navigation'
import { hasPrisonerAidSession } from '@/lib/prisonerAidAuth'
import PrisonerAidPrintPage from './PrisonerAidPrintPage'

export const metadata = { title: 'گزارش PDF | کمک به زندانیان', robots: { index: false, follow: false } }
export const dynamic = 'force-dynamic'

const allowedTypes = new Set(['overview', 'prisoners', 'recipients', 'donations', 'prisoner', 'recipient'])

export default async function Page({ searchParams }) {
  if (!(await hasPrisonerAidSession())) redirect('/andarun/finanz/gefangene/login')
  const params = await searchParams
  const type = allowedTypes.has(params?.type) ? params.type : 'overview'
  const id = typeof params?.id === 'string' ? params.id.slice(0, 100) : ''
  return <PrisonerAidPrintPage type={type} id={id} autoPrint={params?.auto === '1'} />
}
