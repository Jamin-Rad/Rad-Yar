import { redirect } from 'next/navigation'
import { hasAndarunSession } from '@/lib/andarunPasswordAuth'
import InteressanteBefundePage from './InteressanteBefundePage'

export const metadata = {
  title: 'Interessante Befunde · Jaminova',
  description: 'Interessante und wichtige radiologische Fälle als Wissensarchiv sammeln',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function Page() {
  if (!(await hasAndarunSession())) redirect('/andarun/login')
  return <><InteressanteBefundePage /></>
}
