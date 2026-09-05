import { LessonInProgressGate } from '@/components/InProgressBanner'

export default function TechnikLayout({ children }) {
  return <LessonInProgressGate>{children}</LessonInProgressGate>
}
