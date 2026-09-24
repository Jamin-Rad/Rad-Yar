import { getAndarunPwaMetadata, getAndarunViewport } from '@/lib/andarunWebApps'
export const metadata = getAndarunPwaMetadata('gefangene')
export const viewport = getAndarunViewport('gefangene')
export default function Layout({ children }) { return children }
