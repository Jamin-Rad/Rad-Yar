import { LanguageProvider } from '@/providers/LanguageProvider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function ThoraxLayout({ children }) {
  return (
    <LanguageProvider>
      <Navbar />
      {children}
      <Footer />
    </LanguageProvider>
  )
}
