import { getAndarunPwaMetadata, getAndarunViewport } from '@/lib/andarunWebApps'
import AndarunNav from './AndarunNav'
import AndarunAppNavigation from './AndarunAppNavigation'

export const metadata = {
  ...getAndarunPwaMetadata('andarun'),
  title: 'Jaminova | Dein persönlicher Raum',
  description: 'Dein persönlicher Raum für Alltag, Gesundheit, Lernen und Finanzen.',
}
export const viewport = getAndarunViewport('andarun')

export default function AndarunLayout({ children }) {
  return <><AndarunAppNavigation /><AndarunNav />{children}</>
}
