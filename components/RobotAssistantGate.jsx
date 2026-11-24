'use client'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { useUser } from '@clerk/nextjs'

const RobotAssistant = dynamic(() => import('./RobotAssistant'), { ssr: false })

export default function RobotAssistantGate() {
  const pathname = usePathname()
  const { user, isLoaded, isSignedIn } = useUser()
  const hiddenRoute = (
    pathname?.startsWith('/admin')
    || pathname?.startsWith('/exam')
    || pathname?.startsWith('/andarun')
    || pathname === '/fatima'
    || pathname?.startsWith('/fatima/')
    || pathname?.startsWith('/mobin')
    || pathname?.startsWith('/rechner')
    || pathname?.startsWith('/prostata-psa')
    || pathname?.startsWith('/pi-rads')
    || pathname?.startsWith('/node-rads')
    || pathname?.startsWith('/kaiser-score')
    || pathname?.startsWith('/fleischner')
    || pathname?.startsWith('/khk-vortestwahrscheinlichkeit')
  )
  if (hiddenRoute || !isLoaded || !isSignedIn || !user?.id) return null
  return <RobotAssistant key={user.id} user={user} />
}
