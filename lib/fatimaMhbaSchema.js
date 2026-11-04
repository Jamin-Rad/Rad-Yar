// Full source and translations are read from the authenticated private bucket.
// Fail closed rather than publish a partially translated study notebook.
export function validateFatimaMhbaMaterials(materials) {
  for (const [id, pages] of [[1,45],[2,48],[4,53],[5,46],[6,48],[7,41],[8,48],[9,44],[10,43]]) {
    const lesson = materials?.[id];
    if (!lesson || !Array.isArray(lesson.pages) || lesson.pages.length !== pages || !Array.isArray(lesson.questions) || lesson.questions.length !== 10) throw new Error('Incomplete private study material');
    const present = value => typeof value === 'string' && value.trim().length > 0;
    if (!lesson.pages.every((page,index) => page.number === index+1 && present(page.text) && present(page.fa))) throw new Error('Incomplete bilingual source pages');
    const requiredTables = {4:['table-4-1','table-4-2','table-4-3'],5:['table-5-1','table-5-2'],6:['table-6-1','table-6-2','table-6-3','table-6-4','figure-6-3','figure-6-4'],7:['table-7-1','table-7-2','table-7-3','table-7-4','table-7-5','table-7-6','table-7-7','table-7-question','table-7-answer'],8:['table-8-1','table-8-2','figure-8-1','figure-8-4','figure-8-9','figure-8-10','table-8-answer-5'],9:["table-9-1", "table-9-2", "table-9-3", "table-9-4", "table-9-5", "figure-9-1", "figure-9-2", "figure-9-3", "figure-9-4", "figure-9-5", "figure-9-6", "table-9-answer-7"],10:["figure-10-1", "figure-10-2", "table-10-1", "table-10-2", "table-10-7", "table-10-8", "table-10-9", "table-10-question", "figure-10-5", "table-10-answer-3", "table-10-answer-4", "table-10-answer-7", "table-10-answer-10", "table-10-6"]}[id] || [];
    for (const tableId of requiredTables) {
      const table = lesson.tables?.[tableId];
      if (!Array.isArray(table?.head) || table.head.length < 2 || !table.head.every(present) || !Array.isArray(table.rows) || !table.rows.length || !table.rows.every(row => Array.isArray(row) && row.length === table.head.length && row.every(present))) throw new Error('Incomplete bilingual source table');
    }
    if (!lesson.questions.every((question,index) => question.id === `${id}.${index+1}` && question.official === true && ['text','fa','officialAnswer','officialAnswerFa'].every(key => present(question[key])))) throw new Error('Incomplete bilingual official questions');
  }
  return materials;
}
