import { notFound } from 'next/navigation'
import { KontrastmittelTopicPage } from '../KontrastmittelShared'
import { getTopicBySlug } from '../kontrastmittelContent'

export default function Page() {
  const topic = getTopicBySlug('roentgen-kontrastmittel-grundlagen')
  if (!topic) notFound()
  return <KontrastmittelTopicPage topic={topic} />
}
