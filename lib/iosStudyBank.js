import { getLessonStatus } from '../data/lessonStatus'
import { CURRICULUM, getLessonLinkForFlashcard } from '../data/curriculum'
import { FLASHCARDS, FLASHCARD_TOPICS } from '../data/flashcards'
import { MCQ_TOPIC_GROUPS, QUESTION_BANK, getAvailableQuestionTopicIds, getQuestionsForIds } from '../data/questions'

const contrastSections = {
  'km-jod-typen': 'roentgen#arten',
  'km-jod-reaktionen': 'roentgen#reaktionen',
  'km-gastrointestinal': 'roentgen#gastrointestinal',
  'km-schilddruese': 'roentgen#schilddruese',
  'km-gadolinium': 'mrt#gadolinium',
  'km-gadolinium-retention-nsf': 'mrt#retention',
  'km-buscopan': 'mrt#buscopan',
  'km-niereninsuffizienz': 'nierenfunktion',
  'km-schwangerschaft-stillzeit': 'schwangerschaft',
}

function lessonPaths() {
  const lessons = CURRICULUM.flatMap(subject => subject.kapitel.flatMap(chapter =>
    chapter.themen.flatMap(topic => [topic, ...(topic.sub || [])])))
  const paths = new Map()
  for (const lesson of lessons) {
    if (!lesson.link) continue
    const flashcardId = lesson.flashcardLink?.split('?')[0].match(/^\/flashcards\/([^/]+)$/)?.[1]
    const query = new URLSearchParams(lesson.mcqLink?.split('?')[1])
    for (const id of [lesson.id, flashcardId, ...(query.get('themen') || '').split(',')]) {
      if (id && !paths.has(id)) paths.set(id, lesson.link)
    }
  }
  for (const [id, section] of Object.entries(contrastSections)) {
    paths.set(id, `/technik/kontrastmittel/${section}`)
  }
  return paths
}

export function buildStudyBank({ includeBundledTopics = false } = {}) {
  const topics = new Map()
  const paths = lessonPaths()
  for (const { id, title } of [...FLASHCARD_TOPICS, ...MCQ_TOPIC_GROUPS.flatMap(group => group.topics)]) {
    if (topics.has(id)) continue
    const lessonPath = paths.get(id) || getLessonLinkForFlashcard(`/flashcards/${id}`)
    topics.set(id, { id, title, lessonPath: lessonPath || undefined })
  }

  const localized = value => typeof value === 'string' ? { fa: value, de: value, en: value } : value

  const completedTopics = new Set([...topics.values()].filter(topic =>
    topic.lessonPath && getLessonStatus(topic.lessonPath.split(/[?#]/)[0]) === 'complete'
  ).map(topic => topic.id))

  const cards = FLASHCARDS.filter(card => completedTopics.has(card.topicId)).map(({ id, topicId, front, answer, back, explanation, diagram }) => ({
    id, topicId, front: localized(front), answer: localized(answer ?? back),
    explanation: localized(explanation), diagram: localized(diagram),
  }))
  const availableTopicIDs = includeBundledTopics ? new Set(topics.keys()) : getAvailableQuestionTopicIds()
  const availableQuestions = QUESTION_BANK.de.filter(question => question.tags.some(tag => availableTopicIDs.has(tag) && completedTopics.has(tag)))
  const ids = availableQuestions.map(question => question.id)
  const localizedBanks = Object.fromEntries(
    ['fa', 'de', 'en'].map(language => [language, getQuestionsForIds(ids, language)]),
  )
  const questions = availableQuestions.map(({ id, tags }, index) => ({
    id,
    topicIds: tags.filter(tag => availableTopicIDs.has(tag) && completedTopics.has(tag)),
    versions: Object.fromEntries(Object.entries(localizedBanks).map(([language, bank]) => {
      const { question, options, correct, explanation } = bank[index]
      if (!options.some(option => option.id === correct)) {
        throw new Error(`Invalid correct option for ${id} (${language})`)
      }
      return [language, { question, options, correct, explanation }]
    })),
  }))

  for (const item of cards) {
    if (!topics.has(item.topicId)) throw new Error(`Missing topic for ${item.id}`)
    for (const language of ['fa', 'de', 'en']) {
      if (!item.front[language]?.trim() || !item.answer[language]?.trim()) {
        throw new Error(`Missing card text for ${item.id} (${language})`)
      }
    }
  }
  for (const question of questions) {
    if (!question.topicIds.length) throw new Error(`Missing topic for ${question.id}`)
  }

  return {
    schemaVersion: 1,
    completedLessonsOnly: true,
    topics: [...topics.values()].filter(topic => completedTopics.has(topic.id)),
    cards,
    questions,
  }
}
