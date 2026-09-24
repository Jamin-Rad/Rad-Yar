import { getAndarunPwaMetadata, getAndarunViewport } from '@/lib/andarunWebApps'
export const metadata = getAndarunPwaMetadata('termine')
export const viewport = getAndarunViewport('termine')
export default function Layout({ children }) { return children }
