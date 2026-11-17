export { generateLessonMetadata as generateMetadata } from '@/lib/lessonMetadata'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function LowerLimbArteryLayout({ children }) {
  return <><Navbar />{children}<Footer /></>
}
