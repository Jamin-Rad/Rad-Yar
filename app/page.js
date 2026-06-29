import { LanguageProvider } from '@/providers/LanguageProvider'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import WichtigeReferenzen from '@/components/WichtigeReferenzen'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <LanguageProvider>
      <Navbar />
      <Hero />
      <WichtigeReferenzen mode="modals" />
      <Footer />
    </LanguageProvider>
  )
}
