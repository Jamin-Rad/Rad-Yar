import { TECHNIK_GRUNDLAGEN } from '../data/technikGrundlagenLesson.js'
import { GEHIRN_TUMORMUSTER } from '../data/gehirnTumorMusterLesson.js'
import { GEHIRN_INFEKTIONSMUSTER } from '../data/gehirnInfektionsmusterLesson.js'

const errors = []
const visit = (value, path = 'TECHNIK_GRUNDLAGEN') => {
  if (!value || typeof value !== 'object') return
  if (['de', 'en', 'fa'].some(key => Object.hasOwn(value, key))) {
    for (const language of ['de', 'en', 'fa']) {
      if (typeof value[language] !== 'string' || value[language].trim() === '') {
        errors.push(`${path}.${language}: missing translation`)
      }
      if (['de', 'en'].includes(language) && typeof value[language] === 'string' && /[\u0600-\u06FF]/u.test(value[language])) {
        errors.push(`${path}.${language}: Persian script in ${language} text`)
      }
    }
    return
  }
  for (const [key, child] of Object.entries(value)) visit(child, `${path}.${key}`)
}

visit(TECHNIK_GRUNDLAGEN, 'TECHNIK_GRUNDLAGEN')
visit(GEHIRN_TUMORMUSTER, 'GEHIRN_TUMORMUSTER')
visit(GEHIRN_INFEKTIONSMUSTER, 'GEHIRN_INFEKTIONSMUSTER')
if (errors.length) {
  console.error(errors.join('\n'))
  process.exitCode = 1
} else {
  console.log('DE/EN/FA keys and script parity passed.')
}
