// Full source and translations are read from the authenticated private bucket.
// Fail closed rather than publish a partially translated study notebook.
export function validateFatimaMhbaMaterials(materials) {
  for (const [id, pages] of [[1,45],[2,48],[4,53],[5,46]]) {
    const lesson = materials?.[id];
    if (!lesson || !Array.isArray(lesson.pages) || lesson.pages.length !== pages || !Array.isArray(lesson.questions) || lesson.questions.length !== 10) throw new Error('Incomplete private study material');
    const present = value => typeof value === 'string' && value.trim().length > 0;
    if (!lesson.pages.every((page,index) => page.number === index+1 && present(page.text) && present(page.fa))) throw new Error('Incomplete bilingual source pages');
    if (id === 4 || id === 5) for (const tableId of id === 4 ? ['table-4-1','table-4-2','table-4-3'] : ['table-5-1','table-5-2']) {
      const table = lesson.tables?.[tableId];
      if (!Array.isArray(table?.head) || table.head.length < 2 || !table.head.every(present) || !Array.isArray(table.rows) || !table.rows.length || !table.rows.every(row => Array.isArray(row) && row.length === table.head.length && row.every(present))) throw new Error('Incomplete bilingual source table');
    }
    if (!lesson.questions.every((question,index) => question.id === `${id}.${index+1}` && question.official === true && ['text','fa','officialAnswer','officialAnswerFa'].every(key => present(question[key])))) throw new Error('Incomplete bilingual official questions');
  }
  return materials;
}
