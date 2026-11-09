import { Suspense } from 'react'
import RechnerClient from '@/components/rechner/RechnerClient'

export const metadata = {
  title: 'Radiologische Rechner | RadYar',
  description: 'Alle radiologischen Rechner an einem Ort: PSA-Dichte, PI-RADS, Kaiser Score, Fleischner, Boston, Volumina und mehr.',
  alternates: { canonical: '/rechner' },
}
export default function RechnerPage() {
  return <Suspense fallback={<main style={{ padding: 40 }}>RadYar · Rechner</main>}><RechnerClient/></Suspense>
}
