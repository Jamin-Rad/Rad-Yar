import { getAndarunPwaMetadata, getAndarunViewport } from '@/lib/andarunWebApps'

export const metadata = getAndarunPwaMetadata('andarun')
export const viewport = getAndarunViewport('andarun')

export default function AndarunLayout({ children }) {
  return children
}
