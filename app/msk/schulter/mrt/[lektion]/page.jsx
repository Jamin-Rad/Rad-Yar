import { notFound } from 'next/navigation'
import { shoulderMriTopics } from '@/data/shoulderMriChapter.mjs'
import { shoulderMriLessons } from '@/data/shoulderMriLessons'
import englishLessons from '@/data/shoulderMriLessons.en'
import persianLessons from '@/data/shoulderMriLessons.fa'
import { shoulderCases } from '@/data/shoulderMriCases'
import caseTranslations from '@/data/shoulderMriCaseTranslations'
import ShoulderLesson from '../ShoulderLesson'

const translatedLessons = { en: englishLessons, fa: persianLessons }

function getLocalizedContent(modules) {
  const german = modules.map(({ index }) => ({ lesson: shoulderMriLessons[index], clinicalCase: shoulderCases[index] }))
  return {
    de: german,
    ...Object.fromEntries(Object.entries(translatedLessons).map(([lang, lessons]) => [
      lang,
      modules.map(({ index }, position) => {
        const { lesson, clinicalCase } = german[position]
        const { sourceTitles, ...translation } = lessons[index]
        const { frames, ...caseText } = caseTranslations[lang][index]
        return {
          lesson: { ...translation, sources: lesson.sources.map(([, url], i) => [sourceTitles[i], url]) },
          clinicalCase: {
            ...clinicalCase,
            ...caseText,
            frames: clinicalCase.frames.map((frame, i) => ({ ...frame, label: frames[i] })),
          },
        }
      }),
    ])),
  }
}

export function generateStaticParams() {
  return shoulderMriTopics.map(({ slug }) => ({ lektion: slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params, searchParams }) {
  const { lektion } = await params
  const requestedLang = (await searchParams)?.lang
  const lang = requestedLang === 'en' || requestedLang === 'fa' ? requestedLang : 'de'
  const topic = shoulderMriTopics.find(({ slug }) => slug === lektion)
  if (!topic) return {}
  return {
    title: topic.title[lang] + ' | RadYar',
    description: (translatedLessons[lang] ?? shoulderMriLessons)[topic.modules[0].index].goal,
  }
}

export default async function ShoulderMriLessonPage({ params }) {
  const { lektion } = await params
  const index = shoulderMriTopics.findIndex(({ slug }) => slug === lektion)
  if (index === -1) notFound()
  return <ShoulderLesson key={lektion} index={index} content={getLocalizedContent(shoulderMriTopics[index].modules)} />
}
