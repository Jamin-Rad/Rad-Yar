'use client'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { usePersistedSectionProgress } from '@/hooks/usePersistedSectionProgress'
import { HEMANGIOMA_CHAPTERS } from '@/data/haemangiomaLesson'
import HaemangiomaLesson from './LessonContent'
const IDS = HEMANGIOMA_CHAPTERS.filter(chapter=>chapter.id!=='takehome').map(chapter=>chapter.id)
export default function LeberHaemangiomPage() {
  const { lang } = useLanguage()
  const status = useLessonReadStatus('haemangiom')
  const [readSections,setReadSections] = usePersistedSectionProgress('haemangiom',IDS,status.isRead)
  return <HaemangiomaLesson lang={lang} {...status} readSections={readSections} setReadSections={setReadSections}/>
}
