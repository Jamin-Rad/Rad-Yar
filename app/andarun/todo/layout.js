import { getAndarunPwaMetadata, getAndarunViewport } from '@/lib/andarunWebApps'
export const metadata = getAndarunPwaMetadata('todo')
export const viewport = getAndarunViewport('todo')
export default function Layout({ children }) { return children }
