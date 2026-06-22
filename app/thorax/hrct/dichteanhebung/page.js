import HrctPatternLesson from '@/components/HrctPatternLesson'
import { HRCT_LESSONS } from '@/data/hrct-muster'

export default function Page() {
  return <HrctPatternLesson lesson={HRCT_LESSONS['hrct-dichteanhebung']} />
}
