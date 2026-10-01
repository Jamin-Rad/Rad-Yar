import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LearningAccessGate from '@/components/LearningAccessGate'

export default function McqLayout({ children }) {
  return (
    <>
      <Navbar />
      <LearningAccessGate checkLessonStatus={false}>{children}</LearningAccessGate>
      <Footer />
    </>
  )
}
