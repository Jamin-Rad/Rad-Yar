'use client'

import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { usePersistedSectionProgress } from '@/hooks/usePersistedSectionProgress'
import SteatosisLesson from './SteatosisLesson'
import { STEATOSIS_CHAPTERS } from '@/data/steatosisLesson'

const IDS = STEATOSIS_CHAPTERS.filter(chapter => chapter.id !== 'takehome').map(chapter => chapter.id)

export default function HepaticSteatosisPage() {
  const { lang } = useLanguage()
  const status = useLessonReadStatus('hepatische-steatose')
  const [readSections, setReadSections] = usePersistedSectionProgress('hepatische-steatose', IDS, status.isRead)
  return <SteatosisLesson lang={lang} {...status} readSections={readSections} setReadSections={setReadSections} />
}
