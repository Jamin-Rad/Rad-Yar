import { getAndarunPwaMetadata, getAndarunViewport } from '@/lib/andarunWebApps'
export const metadata = getAndarunPwaMetadata('gesundheit')
export const viewport = getAndarunViewport('gesundheit')
export default function Layout({ children }) { return children }
