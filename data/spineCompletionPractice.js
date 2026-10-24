import { completeExamOptions } from './reviewedExamDistractors'
import { SPINALE_ARACHNOIDITIS_LESSON } from './spinaleArachnoiditisLesson'
import { GUILLAIN_BARRE_SPINE_LESSON } from './guillainBarreSpineLesson'
import { FUNIKULAERE_MYELOSE_LESSON } from './funikulaereMyeloseLesson'
import { SPINALE_TUMOREN_GRUNDLAGEN } from './spinaleTumorenGrundlagen'

// Reuse the source-reviewed local decisions, keeping lessons and practice aligned.
const entries = [
  { lesson: SPINALE_TUMOREN_GRUNDLAGEN, chapter: 'ws-tumoren', source: 'Wirbelsäule.pdf pp21–22; Mohajeri Moghaddam and Bhatt, Insights Imaging 2018;9:511–526, doi:10.1007/s13244-018-0608-3 (anatomical compartments).' },
  { lesson: SPINALE_ARACHNOIDITIS_LESSON, chapter: 'ws-entzuendlich', source: 'Wirbelsäule.pdf pp16–17; Ross et al., AJNR 1987;8:885–892; Parenti et al., doi:10.1016/j.clineuro.2020.105717.' },
  { lesson: GUILLAIN_BARRE_SPINE_LESSON, chapter: 'ws-entzuendlich', source: 'Wirbelsäule.pdf p19; EAN/PNS guideline 2023, PICO5, doi:10.1111/ene.16073.' },
  { lesson: FUNIKULAERE_MYELOSE_LESSON, chapter: 'ws-metabolisch', source: 'Wirbelsäule.pdf pp28–29; Insights Imaging 2018;9:511–526, doi:10.1007/s13244-018-0608-3.' },
]
const RAW_SPINE_COMPLETION_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [lang, entries.map(({ lesson, source }) => {
  const q = lesson.check
  const answer = q.answerIndex ?? q.answer
  const explanation = q.feedback || q.explanation
  return { id: `${lesson.id}-${lang}-source-check`, fach: 'wirbelsaeule', tags: [lesson.id], question: q.prompt[lang], options: q.options.map((text, i) => ({ id: 'ABCD'[i], text: text[lang] })), correct: 'ABCD'[answer], explanation: explanation[lang], wrongExplanations: Object.fromEntries(q.options.flatMap((_, i) => i === answer ? [] : [['ABCD'[i], (q.retry || explanation)[lang]]])), source }
})]))
export const SPINE_COMPLETION_CARDS = entries.map(({ lesson, source }) => ({ id: `${lesson.id}-source-check`, topicId: lesson.id, category: lesson.title, front: lesson.check.prompt, answer: lesson.check.options[lesson.check.answerIndex ?? lesson.check.answer], explanation: lesson.check.feedback || lesson.check.explanation, source }))
export const SPINE_COMPLETION_CARD_TOPICS = entries.map(({ lesson }) => ({ id: lesson.id, href: `/flashcards/${lesson.id}`, title: lesson.title, description: lesson.check.title, icon: '◉', color: '#397c8b' }))
export const SPINE_COMPLETION_TOPIC_GROUPS = entries.map(({ lesson, chapter }) => ({ fachId: 'wirbelsaeule', kapitelId: chapter, title: lesson.title, topics: [{ id: lesson.id, title: lesson.title }] }))

export const SPINE_COMPLETION_QUESTIONS = completeExamOptions(RAW_SPINE_COMPLETION_QUESTIONS)
