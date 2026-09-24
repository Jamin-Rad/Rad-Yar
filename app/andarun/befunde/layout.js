import { getAndarunPwaMetadata, getAndarunViewport } from '@/lib/andarunWebApps'
export const metadata = getAndarunPwaMetadata('befunde')
export const viewport = getAndarunViewport('befunde')
export default function Layout({ children }) { return children }
