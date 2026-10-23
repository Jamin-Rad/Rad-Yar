import assert from 'node:assert/strict'
import { getCardById } from '../data/flashcards.js'

const card = getCardById('avm-02-shunttypen')
assert.ok(card, 'hepatic shunt pathways card is registered')

for (const language of ['de', 'en', 'fa']) {
  assert.ok(card.front[language].length > 0, `${language}: localized card front exists`)
  assert.ok(card.answer[language].length > 0, `${language}: localized answer exists`)
}

assert.match(card.front.de, /intrahepatischen Shunt-Verbindungen/i)
assert.match(card.front.en, /intrahepatic shunt pathways/i)
assert.match(card.front.fa, /مسیر شانت داخل‌کبدی/)
assert.match(card.answer.de, /keine AV-Fistel/i)
assert.match(card.answer.en, /not an AV fistula/i)
assert.match(card.answer.fa, /فیستول شریانی‌وریدی نیست/)

console.log('Hepatic AVM shunt card scope and DE/EN/FA distinction: PASS')
