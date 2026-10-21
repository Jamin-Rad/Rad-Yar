import { getAndarunPwaMetadata, getAndarunViewport } from '@/lib/andarunWebApps'
export const metadata = getAndarunPwaMetadata('english')
export const viewport = getAndarunViewport('english')
export default function Layout({ children }) { return children }
