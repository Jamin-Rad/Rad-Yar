import { getAndarunPwaMetadata, getAndarunViewport } from '@/lib/andarunWebApps'
export const metadata = getAndarunPwaMetadata('finanzen')
export const viewport = getAndarunViewport('finanzen')
export default function Layout({ children }) { return children }
