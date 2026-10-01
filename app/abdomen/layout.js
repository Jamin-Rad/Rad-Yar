import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { LessonInProgressGate } from '@/components/InProgressBanner'
import LearningAccessGate from '@/components/LearningAccessGate'

export default function AbdomenLayout({ children }) {
  return (
    <>
      <Navbar />
      <LearningAccessGate><LessonInProgressGate>{children}</LessonInProgressGate></LearningAccessGate>
      <Footer />
    </>
  )
}
