import { LanguageProvider } from '@/providers/LanguageProvider'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import TwoPillars from '@/components/TwoPillars'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <LanguageProvider>
      <Navbar />
      <Hero />
      <TwoPillars />
      <Footer />
    </LanguageProvider>
  )
}
