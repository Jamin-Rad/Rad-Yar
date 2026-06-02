import { LanguageProvider } from '@/providers/LanguageProvider'
import Navbar from '@/components/Navbar'

export default function LernenLayout({ children }) {
  return (
    <LanguageProvider>
      <Navbar />
      {children}
    </LanguageProvider>
  )
}
