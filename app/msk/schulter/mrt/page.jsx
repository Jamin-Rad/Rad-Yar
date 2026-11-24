import { SHOULDER_MRI_TITLE } from '@/data/shoulderMriChapter.mjs'
import ShoulderOverview from './ShoulderOverview'

const descriptions = {
  de: 'Drei Lektionen zur Schulter-MRT: Schichtplanung und Anatomie, Impingement und Luxation.',
  en: 'Three shoulder MRI lessons on plane prescription and anatomy, impingement and dislocation.',
  fa: 'سه درس ام‌آر‌آی شانه دربارهٔ طراحی برش‌ها و آناتومی، ایمپینجمنت و دررفتگی.',
}

export async function generateMetadata({ searchParams }) {
  const requestedLang = (await searchParams)?.lang
  const lang = requestedLang === 'en' || requestedLang === 'fa' ? requestedLang : 'de'
  return { title: SHOULDER_MRI_TITLE[lang] + ' | RadYar', description: descriptions[lang] }
}

export default function ShoulderMriPage() {
  return <ShoulderOverview />
}
