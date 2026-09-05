import Navbar from '@/components/Navbar'
import { LessonInProgressGate } from '@/components/InProgressBanner'

export default function MammaLayout({ children }) {
  return (
    <>
      <Navbar />
      <LessonInProgressGate>{children}</LessonInProgressGate>
    </>
  )
}
