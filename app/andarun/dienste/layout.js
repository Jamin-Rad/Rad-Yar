import { getAndarunPwaMetadata, getAndarunViewport } from '@/lib/andarunWebApps'
export const metadata = getAndarunPwaMetadata('dienste')
export const viewport = getAndarunViewport('dienste')
export default function Layout({ children }) { return children }
