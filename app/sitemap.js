import { canonicalSite, lessonPreviewPaths } from '@/lib/lessonPreviews'

export default function sitemap() {
  return ['/', ...lessonPreviewPaths()].map(path => ({ url: new URL(path, canonicalSite).href }))
}
