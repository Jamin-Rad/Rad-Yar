import { LanguageProvider } from '@/providers/LanguageProvider'
import Navbar from '@/components/Navbar'
import HomeGlass from '@/components/HomeGlass'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <LanguageProvider>
      <Navbar />
      <HomeGlass />
      <Footer />
    </LanguageProvider>
  )
}
