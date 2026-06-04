import { notFound } from 'next/navigation'
import { KontrastmittelTopicPage } from '../KontrastmittelShared'
import { getTopicBySlug } from '../kontrastmittelContent'

export default function Page() {
  const topic = getTopicBySlug('nebenwirkung-jodhaltiger-km')
  if (!topic) notFound()
  return <KontrastmittelTopicPage topic={topic} />
}
