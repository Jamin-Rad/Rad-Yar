import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function UeberRadyarLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
