import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function CasesLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
