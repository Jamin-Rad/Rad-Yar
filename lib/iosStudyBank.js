import { getWrongAnswerExplanation } from '../utils/answerFeedback'
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

export function lessonPaths() {
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

export function studyInventory({ includeBundledTopics = false } = {}) {
  const topics = new Map()
  const paths = lessonPaths()
  for (const { id, title } of [...FLASHCARD_TOPICS, ...MCQ_TOPIC_GROUPS.flatMap(group => group.topics)]) {
    if (topics.has(id)) continue
    const lessonPath = paths.get(id) || getLessonLinkForFlashcard(`/flashcards/${id}`)
    topics.set(id, { id, title, lessonPath: lessonPath || undefined })
  }

  const completedTopics = new Set([...topics.values()].filter(topic =>
    topic.lessonPath && getLessonStatus(topic.lessonPath.split(/[?#]/)[0]) === 'complete'
  ).map(topic => topic.id))

  const cards = FLASHCARDS.filter(card => completedTopics.has(card.topicId))
  const availableTopicIDs = includeBundledTopics ? new Set(topics.keys()) : getAvailableQuestionTopicIds()
  const questions = QUESTION_BANK.de.flatMap(({ id, tags }) => {
    const topicIds = tags.filter(tag => availableTopicIDs.has(tag) && completedTopics.has(tag))
    return topicIds.length ? [{ id, topicIds }] : []
  })
  return { topics: [...topics.values()].filter(topic => completedTopics.has(topic.id)), cards, questions, paths }
}

export function buildStudyBank(options = {}) {
  const { topics, cards: availableCards, questions: availableQuestions } = studyInventory(options)
  const topicIDs = new Set(topics.map(topic => topic.id))
  const localized = value => typeof value === 'string' ? { fa: value, de: value, en: value } : value
  const cards = availableCards.map(({ id, topicId, front, answer, back, explanation, diagram }) => ({
    id, topicId, front: localized(front), answer: localized(answer ?? back),
    explanation: localized(explanation), diagram: localized(diagram),
  }))
  const ids = availableQuestions.map(question => question.id)
  const localizedBanks = Object.fromEntries(
    ['fa', 'de', 'en'].map(language => [language, getQuestionsForIds(ids, language)]),
  )
  const questions = availableQuestions.map(({ id, topicIds }, index) => ({
    id,
    topicIds,
    versions: Object.fromEntries(Object.entries(localizedBanks).map(([language, bank]) => {
      const item = bank[index]
      const { question, options, correct, explanation } = item
      if (!options.some(option => option.id === correct)) {
        throw new Error(`Invalid correct option for ${id} (${language})`)
      }
      const wrongExplanations = Object.fromEntries(options
        .filter(option => option.id !== correct)
        .map(option => [option.id, getWrongAnswerExplanation(item, option.id, language)]))
      return [language, { question, options, correct, explanation, wrongExplanations }]
    })),
  }))

  for (const item of cards) {
    if (!topicIDs.has(item.topicId)) throw new Error(`Missing topic for ${item.id}`)
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
    topics,
    cards,
    questions,
  }
}
