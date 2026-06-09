import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function AbdomenLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
