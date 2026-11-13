import { Suspense } from 'react'
import RechnerClient from '@/components/rechner/RechnerClient'
import scene from '@/components/HomeScene.module.css'

export const metadata = {
  title: 'Radiologische Rechner | RadYar',
  description: 'Alle radiologischen Rechner an einem Ort: PSA-Dichte, PI-RADS, Kaiser Score, Fleischner, Boston, Volumina und mehr.',
  alternates: { canonical: '/rechner' },
}
export default function RechnerPage() {
  return <Suspense fallback={<main className={scene.background} style={{ minHeight: '100svh', padding: 40, color: '#eefaff' }}>RadYar · Rechner</main>}>
    <RechnerClient/>
  </Suspense>
}
