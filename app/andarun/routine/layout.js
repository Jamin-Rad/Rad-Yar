import { getAndarunPwaMetadata, getAndarunViewport } from '@/lib/andarunWebApps'
export const metadata = getAndarunPwaMetadata('routine')
export const viewport = getAndarunViewport('routine')
export default function Layout({ children }) { return children }
