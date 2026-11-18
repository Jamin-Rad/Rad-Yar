import NumberedAnswers from './NumberedAnswers'
import StudyTimeTracker from './StudyTimeTracker'

export default function MobinLayout({ children }) {
  return <><NumberedAnswers /><StudyTimeTracker />{children}</>
}
