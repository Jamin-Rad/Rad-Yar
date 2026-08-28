import { notFound, redirect } from 'next/navigation'
import { hasDigitDASession } from '@/lib/digitdaAuth'
import DigitDAEntryPage from '../DigitDAEntryPage'

const allowedTypes = new Set(['iran', 'germany', 'income'])

export const metadata = { title: 'ثبت تراکنش · DigitDA', robots: { index: false, follow: false } }
export const dynamic = 'force-dynamic'

export default async function DigitDAEntryRoute({ params }) {
  if (!(await hasDigitDASession())) redirect('/digitda/login')
  const { type } = await params
  if (!allowedTypes.has(type)) notFound()
  return <DigitDAEntryPage type={type}/>
}
