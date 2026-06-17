import { notFound } from 'next/navigation'
import ReferenceDetailPage from '@/components/ReferenceDetailPage'
import { REFERENCE_COPY, getReferenceKindFromSlug } from '@/data/referenceSheets'

export function generateStaticParams() {
  return [
    { slug: 'messwerte' },
    { slug: 'klassifikationen' },
  ]
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const kind = getReferenceKindFromSlug(slug)
  if (!kind) return {}

  const title = REFERENCE_COPY.de.sections[kind].title
  return {
    title: `${title} | RadYar`,
    description: REFERENCE_COPY.de.sections[kind].desc,
  }
}

export default async function ReferenzenPage({ params }) {
  const { slug } = await params
  const kind = getReferenceKindFromSlug(slug)
  if (!kind) notFound()

  return <ReferenceDetailPage kind={kind} />
}
