import GastroDuodenalLesson from './GastroDuodenalLesson'
import { ABDOMEN_GI_LESSONS } from '@/data/abdomenGiCompletion'

export default function Page() {
  return <GastroDuodenalLesson lesson={ABDOMEN_GI_LESSONS[0]} />
}
