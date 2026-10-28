import { getAndarunPwaMetadata, getAndarunViewport } from '@/lib/andarunWebApps'
export const metadata = getAndarunPwaMetadata('befundtimer')
export const viewport = getAndarunViewport('befundtimer')
export default function Layout({ children }) { return children }
