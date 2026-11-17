import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import LearningAccessPanel from '@/components/LearningAccessPanel'
import LessonPublicPreview from '@/components/LessonPublicPreview'
import { generateLessonMetadata } from '@/lib/lessonMetadata'
import { getLessonPreview } from '@/lib/lessonPreviews'

export const generateMetadata = generateLessonMetadata

export default async function GuestLessonPage() {
  const pathname = (await headers()).get('x-radyar-pathname')
  const preview = getLessonPreview(pathname)
  if (!preview?.gated) notFound()
  return <>
    <Navbar />
    <LessonPublicPreview preview={preview}>
      <LearningAccessPanel kind="sign_in" pathname={pathname} embedded />
    </LessonPublicPreview>
    <Footer />
  </>
}
