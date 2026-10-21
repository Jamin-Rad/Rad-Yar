import { getAndarunPwaMetadata, getAndarunViewport } from '@/lib/andarunWebApps'
export const metadata = getAndarunPwaMetadata('test')
export const viewport = getAndarunViewport('test')
export default function Layout({ children }) { return children }
