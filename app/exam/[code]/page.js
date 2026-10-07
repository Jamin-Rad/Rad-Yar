import Navbar from '@/components/Navbar'
import ExamClient from './ExamClient'

export const metadata = {
  title: 'امتحان آنلاین | RadYar',
  description: 'شرکت در امتحان آنلاین RadYar',
  robots: { index: false, follow: false },
}

export default async function ExamPage({ params }) {
  const { code } = await params
  return (
    <>
      <Navbar />
      <ExamClient code={code} />
    </>
  )
}
