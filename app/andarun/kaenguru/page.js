import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Känguru | Mobin',
  description: 'Känguru-Aufgaben für die Klassen 5/6 und 7/8',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function Page() {
  redirect('/mobin/kaenguru')
}
