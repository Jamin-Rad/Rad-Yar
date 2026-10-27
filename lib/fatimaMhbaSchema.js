// Full source and translations are read from the authenticated private bucket.
// Fail closed rather than publish a partially translated study notebook.
export function validateFatimaMhbaMaterials(materials) {
  for (const [id, pages] of [[1,45],[2,48]]) {
    const lesson = materials?.[id];
    if (!lesson || !Array.isArray(lesson.pages) || lesson.pages.length !== pages || !Array.isArray(lesson.questions) || lesson.questions.length !== 10) throw new Error('Incomplete private study material');
    const present = value => typeof value === 'string' && value.trim().length > 0;
    if (!lesson.pages.every((page,index) => page.number === index+1 && present(page.text) && present(page.fa))) throw new Error('Incomplete bilingual source pages');
    if (!lesson.questions.every((question,index) => question.id === `${id}.${index+1}` && question.official === true && ['text','fa','officialAnswer','officialAnswerFa'].every(key => present(question[key])))) throw new Error('Incomplete bilingual official questions');
  }
  return materials;
}
