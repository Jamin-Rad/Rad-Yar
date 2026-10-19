import fs from 'node:fs'
import parser from 'next/dist/compiled/babel/parser.js'
import { GEHIRN_PRES_LESSON } from '../data/gehirnPresLesson.js'
import { GEHIRN_BALKENAGENESIE_LESSON } from '../data/gehirnBalkenagenesieLesson.js'
import { GEHIRN_PVL_LESSON } from '../data/gehirnPvlLesson.js'
import { GEHIRN_CJD_MUSTER_LESSON } from '../data/gehirnCjdMusterLesson.js'
import { GEHIRN_DEMENZMUSTER_LESSON } from '../data/gehirnDemenzMusterLesson.js'
import { GEHIRN_PARKINSON_LESSON } from '../data/gehirnParkinsonLesson.js'
import { GEHIRN_CHIARI_LESSON } from '../data/gehirnChiariLesson.js'
import { GEHIRN_NF1_CNS_LESSON } from '../data/gehirnNf1CnsLesson.js'

const { parse } = parser
const errors = []
const languages = ['de', 'en', 'fa']

function checkTree(value, path) {
  if (!value || typeof value !== 'object') return
  if (languages.some(language => Object.hasOwn(value, language))) {
    for (const language of languages) {
      if (typeof value[language] !== 'string' || !value[language].trim()) errors.push(`${path}.${language}: missing translation`)
      if (['de', 'en'].includes(language) && typeof value[language] === 'string' && /[\u0600-\u06FF]/u.test(value[language])) errors.push(`${path}.${language}: Persian script in ${language}`)
    }
    return
  }
  if (Array.isArray(value)) value.forEach((child, index) => checkTree(child, `${path}[${index}]`))
  else Object.entries(value).forEach(([key, child]) => checkTree(child, `${path}.${key}`))
}

for (const [name, lesson] of Object.entries({ GEHIRN_PRES_LESSON, GEHIRN_BALKENAGENESIE_LESSON, GEHIRN_PVL_LESSON, GEHIRN_CJD_MUSTER_LESSON, GEHIRN_DEMENZMUSTER_LESSON, GEHIRN_PARKINSON_LESSON, GEHIRN_CHIARI_LESSON, GEHIRN_NF1_CNS_LESSON })) {
  checkTree(lesson, name)
  if (!lesson.sourcePages?.length) errors.push(`${name}: source page inventory missing`)
  if (!lesson.chapters?.length) errors.push(`${name}: no lesson chapters`)
  if (!lesson.assessment || lesson.assessment.options?.length < 3 || lesson.assessment.correctIndex < 0 || lesson.assessment.correctIndex >= lesson.assessment.options.length) errors.push(`${name}: invalid embedded assessment`)
  if (lesson.assessment && !lesson.assessment.sourcePage && !lesson.assessment.sourcePages?.length) errors.push(`${name}: assessment source pages missing`)
}

for (const file of ['app/gehirn/encephalopathie/pres/page.jsx', 'app/gehirn/anatomie/balkenagenesie/page.jsx', 'app/gehirn/anatomie/pvl/page.jsx', 'app/gehirn/neurodegeneration/cjd/page.jsx', 'app/gehirn/neurodegeneration/demenzmuster/page.jsx', 'app/gehirn/neurodegeneration/parkinson/page.jsx', 'app/gehirn/anatomie/chiari/page.jsx', 'app/gehirn/neurofibromatose/nf1/page.jsx']) {
  try { parse(fs.readFileSync(file, 'utf8'), { sourceType: 'module', plugins: ['jsx'] }) }
  catch (error) { errors.push(`${file}: JSX parse error: ${error.message}`) }
}

if (errors.length) {
  console.error(errors.join('\n'))
  process.exitCode = 1
} else {
  console.log('Gehirn late-page drafts: DE/EN/FA data structure, source trace, assessment schema, and JSX parse passed.')
}
