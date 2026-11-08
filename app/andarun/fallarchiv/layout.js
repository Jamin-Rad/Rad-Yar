import { getAndarunPwaMetadata, getAndarunViewport } from '@/lib/andarunWebApps'

export const metadata = getAndarunPwaMetadata('fallarchiv')
export const viewport = getAndarunViewport('fallarchiv')

export default function Layout({ children }) { return children }
