import Probe from './Probe'
import { hasMobinSession } from '@/lib/mobinAuth'
import { redirect } from 'next/navigation'
export const metadata={title:'Probe-KA · 24. November · Latein'}
export default async function Page(){if(!await hasMobinSession())redirect('/mobin/login');return <Probe/>}
