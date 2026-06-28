import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function WirbelsaeuleLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
