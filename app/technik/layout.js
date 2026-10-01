import { LessonInProgressGate } from '@/components/InProgressBanner'
import LearningAccessGate from '@/components/LearningAccessGate'

export default function TechnikLayout({ children }) {
  return <LearningAccessGate><LessonInProgressGate>{children}</LessonInProgressGate></LearningAccessGate>
}
