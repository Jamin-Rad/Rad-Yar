import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const source = await readFile(new URL('../utils/monthlyFinanceSummary.js', import.meta.url), 'utf8')
const { monthlyFinanceSummary: summarize } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`)
const entry = (type, amount, extra = {}) => ({ type, amount, ...extra })
const normal = summarize([entry('income', 3000), entry('expense', 600, { generatedRecurring: true }), entry('expense', 300)])
assert.equal(normal.remaining, 2100)
assert.equal(normal.fixed, 600)
assert.equal(normal.current, 300)
assert.equal(normal.usedPercent, 30)
assert.equal(normal.fixedShare + normal.currentShare + normal.remainingShare, 1)

const over = summarize([entry('income', 1000), entry('expense', 600, { generatedRecurring: true }), entry('expense', 900)])
assert.equal(over.remaining, -500)
assert.equal(over.usedPercent, 150)
assert.equal(over.remainingShare, 0)
assert.equal(over.fixedShare + over.currentShare, 1)

const noIncome = summarize([entry('expense', 500, { generatedRecurring: true }), entry('expense', 100)])
assert.equal(noIncome.usedPercent, null)
assert.equal(noIncome.remaining, -600)
assert.equal(noIncome.fixedShare + noIncome.currentShare, 1)
assert.deepEqual(summarize(), { income:0, expenses:0, fixed:0, current:0, remaining:0, usedPercent:null, fixedShare:0, currentShare:0, remainingShare:0 })
assert.equal(summarize([entry('income', '2000'), entry('expense', '42.5')]).remaining, 1957.5)
assert.equal(summarize([entry('expense', 25, { recurringId: 'legacy-tag-only' })]).fixed, 0)
console.log('Monthly finance summary passed: fixed/current split, remaining income, overspending, empty months, missing income and string amounts.')
