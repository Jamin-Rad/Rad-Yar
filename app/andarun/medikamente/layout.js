import { getAndarunPwaMetadata, getAndarunViewport } from '@/lib/andarunWebApps'

export const metadata = getAndarunPwaMetadata('medikamente')
export const viewport = getAndarunViewport('medikamente')

export default function Layout({ children }) {
  return children
}
