import { notFound } from 'next/navigation'
import { shoulderMriTopics } from '@/data/shoulderMriChapter'
import { shoulderMriLessons } from '@/data/shoulderMriLessons'
import englishLessons from '@/data/shoulderMriLessons.en'
import persianLessons from '@/data/shoulderMriLessons.fa'
import { shoulderCases } from '@/data/shoulderMriCases'
import caseTranslations from '@/data/shoulderMriCaseTranslations'
import ShoulderLesson from '../ShoulderLesson'

const translatedLessons = { en: englishLessons, fa: persianLessons }

function getLocalizedContent(index) {
  const lesson = shoulderMriLessons[index]
  const clinicalCase = shoulderCases[index]
  const result = { de: { lesson, clinicalCase } }
  for (const [lang, lessons] of Object.entries(translatedLessons)) {
    const { sourceTitles, ...translation } = lessons[index]
    const { frames, ...caseText } = caseTranslations[lang][index]
    result[lang] = {
      lesson: {
        ...translation,
        sources: lesson.sources.map(([, url], i) => [sourceTitles[i], url]),
      },
      clinicalCase: {
        ...clinicalCase,
        ...caseText,
        frames: clinicalCase.frames.map((frame, i) => ({ ...frame, label: frames[i] })),
      },
    }
  }
  return result
}

export function generateStaticParams() {
  return shoulderMriTopics.map(({ slug }) => ({ lektion: slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params, searchParams }) {
  const { lektion } = await params
  const requestedLang = (await searchParams)?.lang
  const lang = requestedLang === 'en' || requestedLang === 'fa' ? requestedLang : 'de'
  const index = shoulderMriTopics.findIndex(({ slug }) => slug === lektion)
  if (index === -1) return {}
  return {
    title: shoulderMriTopics[index].title[lang] + ' | RadYar',
    description: (translatedLessons[lang] ?? shoulderMriLessons)[index].goal,
  }
}

export default async function ShoulderMriLessonPage({ params }) {
  const { lektion } = await params
  const index = shoulderMriTopics.findIndex(({ slug }) => slug === lektion)
  if (index === -1) notFound()
  return <ShoulderLesson key={lektion} index={index} content={getLocalizedContent(index)} />
}
