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
  const anatomie = REF_DATA.anatomie.map(item => ({ topicId: 'anatomie', itemId: item.id }))
  return [...klassifikationen, ...anatomie]
}

export default async function Page({ params }) {
  const { topicId, itemId } = await params
  const topic = topicId === 'anatomie'
    ? {
        id: 'anatomie',
        color: '#8b5cf6',
        name: {
          de: 'Befundrelevante Anatomie',
          en: 'Relevant anatomy',
          fa: 'آناتومی مرتبط با گزارش',
        },
        items: REF_DATA.anatomie,
      }
    : REF_DATA.klassifikationen.find(t => t.id === topicId)
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
