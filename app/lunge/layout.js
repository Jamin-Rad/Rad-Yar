import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { LessonInProgressGate } from '@/components/InProgressBanner'

export default function LungeLayout({ children }) {
  return (
    <>
      <Navbar />
      <LessonInProgressGate>{children}</LessonInProgressGate>
      <Footer />
    </>
  )
}
