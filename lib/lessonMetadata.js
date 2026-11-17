import { headers } from 'next/headers'
import { canonicalSite, getLessonPreview } from '@/lib/lessonPreviews'

export async function generateLessonMetadata() {
  const pathname = (await headers()).get('x-radyar-pathname')
  const preview = getLessonPreview(pathname)
  if (!preview) return {}
  const canonical = new URL(pathname, canonicalSite).href
  const title = preview.title.de
  const description = preview.excerpt?.de
  return {
    title: title + ' | RadYar',
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, ...(preview.image ? { images: [preview.image] } : {}) },
  }
}
