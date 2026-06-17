import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function ReferenzenLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
