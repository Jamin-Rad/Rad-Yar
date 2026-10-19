import { LessonInProgressGate } from '@/components/InProgressBanner'
import LearningAccessGate from '@/components/LearningAccessGate'
import Navbar from '@/components/Navbar'

export default function TechnikLayout({ children }) {
  return <><Navbar /><LearningAccessGate><LessonInProgressGate>{children}</LessonInProgressGate></LearningAccessGate></>
}
