import Navbar from '@/components/Navbar'
import { LessonInProgressGate } from '@/components/InProgressBanner'
import LearningAccessGate from '@/components/LearningAccessGate'

export default function MammaLayout({ children }) {
  return (
    <>
      <Navbar />
      <LearningAccessGate><LessonInProgressGate>{children}</LessonInProgressGate></LearningAccessGate>
    </>
  )
}
