import { redirect } from 'next/navigation'
import { hasMobinSession } from '@/lib/mobinAuth'
import MathExamClient from './MathExamClient'

export const metadata = {
  title: 'Matheprüfung | Mobin',
  description: '28 Aufgaben zu rationalen Zahlen für Klasse 6: einzeln üben, eine Probeprüfung lösen und Fehler verstehen.',
  robots: { index: false, follow: false },
}

export default async function MathepruefungPage() {
  if (!(await hasMobinSession())) redirect('/mobin/login')
  return <MathExamClient />
}
