import { getAndarunPwaMetadata, getAndarunViewport } from '@/lib/andarunWebApps'
export const metadata = getAndarunPwaMetadata('deutsch')
export const viewport = getAndarunViewport('deutsch')
export default function Layout({ children }) { return children }
