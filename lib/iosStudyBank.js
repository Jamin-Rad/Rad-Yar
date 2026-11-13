import { FLASHCARDS, FLASHCARD_TOPICS } from '../data/flashcards'
import { MCQ_TOPIC_GROUPS, QUESTION_BANK, getAvailableQuestionTopicIds, getQuestionsForIds } from '../data/questions'

export function buildStudyBank({ includeBundledTopics = false } = {}) {
  const topics = new Map()
  for (const { id, title } of [...FLASHCARD_TOPICS, ...MCQ_TOPIC_GROUPS.flatMap(group => group.topics)]) {
    if (!topics.has(id)) topics.set(id, { id, title })
  }

  const localized = value => typeof value === 'string' ? { fa: value, de: value, en: value } : value

  const cards = FLASHCARDS.map(({ id, topicId, front, answer, back, explanation, diagram }) => ({
    id, topicId, front: localized(front), answer: localized(answer ?? back),
    explanation: localized(explanation), diagram: localized(diagram),
  }))
  const availableTopicIDs = includeBundledTopics ? new Set(topics.keys()) : getAvailableQuestionTopicIds()
  const availableQuestions = QUESTION_BANK.de.filter(question => question.tags.some(tag => availableTopicIDs.has(tag)))
  const ids = availableQuestions.map(question => question.id)
  const localizedBanks = Object.fromEntries(
    ['fa', 'de', 'en'].map(language => [language, getQuestionsForIds(ids, language)]),
  )
  const questions = availableQuestions.map(({ id, tags }, index) => ({
    id,
    topicIds: tags.filter(tag => availableTopicIDs.has(tag)),
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

  return { schemaVersion: 1, topics: [...topics.values()], cards, questions }
}
