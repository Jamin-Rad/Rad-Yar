import { getAndarunPwaMetadata, getAndarunViewport } from '@/lib/andarunWebApps'
export const metadata = getAndarunPwaMetadata('finanzen')
export const viewport = { ...getAndarunViewport('finanzen'), themeColor: '#272c29' }
export default function Layout({ children }) { return children }
