import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function UebenLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
