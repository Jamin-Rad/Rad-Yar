import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function LernenLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
