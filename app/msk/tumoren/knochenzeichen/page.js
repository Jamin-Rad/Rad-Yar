import SpineSourceLesson from '@/app/wirbelsaeule/degenerative/Lesson'
import { MSK_BONE_AGGRESSIVENESS_LESSON } from '@/data/mskBoneAggressiveness'

const sectionName = { de: 'MSK', en: 'MSK', fa: 'اسکلتی‌عضلانی' }
export default function Page() {
  return <SpineSourceLesson lessonData={MSK_BONE_AGGRESSIVENESS_LESSON} sectionName={sectionName} sectionHref="/lernen/msk" />
}
