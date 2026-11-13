import { Suspense } from 'react'
import RechnerClient from '@/components/rechner/RechnerClient'

export const metadata = {
  title: 'Radiologische Rechner | RadYar',
  description: 'Alle radiologischen Rechner an einem Ort: PSA-Dichte, PI-RADS, Kaiser Score, Fleischner, Boston, Volumina und mehr.',
  alternates: { canonical: '/rechner' },
}
export default function RechnerPage() {
  return <Suspense fallback={<main aria-busy="true" style={{ minHeight: '100svh' }}/>}>
    <RechnerClient/>
  </Suspense>
}
