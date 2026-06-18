import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function GehirnLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
