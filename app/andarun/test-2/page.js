import { redirect } from 'next/navigation'
import { hasAndarunSession } from '@/lib/andarunPasswordAuth'
import Navbar from '@/components/Navbar'
import TestTwoLesson from './TestTwoLesson'

export const metadata = {
  title: 'Test 2 · Lernseiten | Andarun',
  description: 'Ein neuer Entwurf für klare, interaktive RadYar-Lektionen.',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function TestTwoPage() {
  if (!(await hasAndarunSession())) redirect('/andarun/login?next=/andarun/test-2')
  return <><Navbar /><TestTwoLesson /></>
}
