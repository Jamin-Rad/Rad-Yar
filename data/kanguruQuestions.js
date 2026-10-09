// The official question bank is intentionally kept separate from RadYar's MCQs.
// New PDF sets are added here after their questions, answer key and solutions
// have been checked together.
export const KANGURU_QUESTIONS = []

export const KANGURU_PLANNED_YEARS = [2026]

export const KANGURU_PARTS = ['A', 'B', 'C']

export function questionsForGrade(grade) {
  return KANGURU_QUESTIONS.filter(question => question.grade === Number(grade))
}

export function questionsForExam({ grade, year, part }) {
  return KANGURU_QUESTIONS.filter(question => (
    question.grade === Number(grade)
    && question.year === Number(year)
    && question.part === part
  ))
}
