// Runtime imports only the reviewed snapshot, never later authoring packets.
// Lesson UI separately uses routeLinks.json without importing this bank.
import published from './publishedBank.json'
export const qualityQuestions=lang=>published.questions[lang]||published.questions.de
export const qualityCards=published.cards
export const qualityTopics=published.topics
export const qualityCoverage=published.routeCoverage
