import { getContentStatus } from '../data/lessonStatus'

// Filter actual lessons first, then retain their topic containers.
export function filterLessonTopics(topics, contentFilter, learningFilter, readArticles) {
  return topics.flatMap(topic => {
    const sub = topic.sub
      ? filterLessonTopics(topic.sub, contentFilter, learningFilter, readArticles)
      : null
    const status = getContentStatus(topic)
    const learned = (readArticles[topic.id] || 0) >= 1
    const matchesContent = contentFilter === 'all' || status === contentFilter
    const matchesLearning = learningFilter === 'all' || (
      !!topic.link && (learningFilter === 'read' ? learned : !learned)
    )
    const matchesSelf = (!!topic.link || !topic.sub?.length) && matchesContent && matchesLearning

    if (!matchesSelf && !sub?.length) return []
    return [{ ...topic, ...(topic.sub ? { sub } : {}), ...(!matchesSelf ? { link: undefined } : {}) }]
  })
}
