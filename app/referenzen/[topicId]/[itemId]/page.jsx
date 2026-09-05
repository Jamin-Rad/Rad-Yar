import { notFound } from 'next/navigation'
import { LanguageProvider } from '@/providers/LanguageProvider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import KlassDetailPage from '@/components/KlassDetailPage'
import { REF_DATA } from '@/data/referenzen'

export async function generateStaticParams() {
  const klassifikationen = REF_DATA.klassifikationen.flatMap(topic =>
    topic.items.map(item => ({ topicId: topic.id, itemId: item.id }))
  )
  return klassifikationen
}

export default async function Page({ params }) {
  const { topicId, itemId } = await params
  if (topicId === 'anatomie') notFound()
  const topic = REF_DATA.klassifikationen.find(t => t.id === topicId)
  const item = topic?.items.find(i => i.id === itemId)
  if (!item) notFound()

  return (
    <LanguageProvider>
      <Navbar />
      <KlassDetailPage topic={topic} item={item} section={topicId === 'anatomie' ? 'anatomie' : 'klassifikationen'} />
      <Footer />
    </LanguageProvider>
  )
}
