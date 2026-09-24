import { getAndarunPwaMetadata, getAndarunViewport } from '@/lib/andarunWebApps'

export const metadata = {
  ...getAndarunPwaMetadata('andarun'),
  title: 'Andarun | Dein persönlicher Raum',
  description: 'Dein persönlicher Raum für Alltag, Gesundheit, Lernen und Finanzen.',
}
export const viewport = getAndarunViewport('andarun')

export default function AndarunLayout({ children }) {
  return children
}
