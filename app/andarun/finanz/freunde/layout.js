import { getAndarunPwaMetadata, getAndarunViewport } from '@/lib/andarunWebApps'
export const metadata = getAndarunPwaMetadata('freunde')
export const viewport = getAndarunViewport('freunde')
export default function Layout({ children }) { return children }
