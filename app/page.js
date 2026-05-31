import { LanguageProvider } from '@/providers/LanguageProvider'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import LernPfade from '@/components/LernPfade'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <LanguageProvider>
      <Navbar />
      <Hero />
      <div className="divider" />
      <LernPfade />
      <Footer />
    </LanguageProvider>
  )
}
