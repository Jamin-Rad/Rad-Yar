import { getAndarunPwaMetadata, getAndarunViewport } from '@/lib/andarunWebApps'
export const metadata = getAndarunPwaMetadata('urlaub')
export const viewport = getAndarunViewport('urlaub')
export default function Layout({ children }) { return children }
