import { getAndarunPwaMetadata, getAndarunViewport } from '@/lib/andarunWebApps'
export const metadata = getAndarunPwaMetadata('iran')
export const viewport = getAndarunViewport('iran')
export default function Layout({ children }) { return children }
