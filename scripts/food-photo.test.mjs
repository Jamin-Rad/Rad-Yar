import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { normalizePhotoMeal, normalizePhotoMealList, photoMealTotals, scalePhotoItem, alignPhotoRange } from '../utils/foodPhotoMeals.js'
import { buildFoodPhotoRequest, createFoodPhotoHandlers, foodPhotoConfiguration, validateFoodPhotoInput } from '../lib/foodPhotoAi.js'
import { foodCaloriesForRecord } from '../utils/healthCalories.js'
import { todayNutrition } from '../utils/andarunToday.js'

const image = 'data:image/jpeg;base64,/9j/2Q=='
const meal = { id: 'photo-test-1', title: 'Reis mit Hähnchen', items: [
  { name: 'Reis', g: 200, kcal: 260, protein: 5.2, carbs: 56, fat: .6, sugar: .2 },
  { name: 'Hähnchen', g: 100, kcal: 165, protein: 31, carbs: 0, fat: 3.6, sugar: 0 },
], kcalMin: 350, kcalMax: 550, confidence: 'low', assumptions: ['Gewicht und Ölmenge sind geschätzt.'], confirmed: true }
const env = { FOOD_PHOTO_AI_ENABLED: 'true', OPENAI_API_KEY: 'test-key-never-used', FOOD_PHOTO_MODEL: 'gpt-4.1-mini' }
const url = 'https://www.rad-yar.com/api/andarun/health/food-photo'
const request = (body = { image, description: 'halbe Portion', consent: true }, origin = 'https://www.rad-yar.com') => new Request(url, { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: origin }, body: JSON.stringify(body) })
const identity = async () => ({ ownerId: 'private:test' })
const providerResponse = extra => Response.json({ status: 'completed', output: [{ content: [{ type: 'output_text', text: JSON.stringify({ ...meal, isFood: true, ...extra }) }] }] })

test('stored estimates require explicit confirmation and retain only allowed numerical/text fields', () => {
  const normalized = normalizePhotoMeal({ ...meal, image, description: 'private context', profile: { weight: 80 }, items: meal.items.map(item => ({ ...item, photo: image })) }, true)
  assert.equal(normalized.confirmed, true)
  assert.equal(JSON.stringify(normalized).includes('base64'), false)
  assert.equal('profile' in normalized, false)
  assert.equal('description' in normalized, false)
  assert.throws(() => normalizePhotoMeal({ ...meal, confirmed: false }, true))
  assert.throws(() => normalizePhotoMealList([{ ...meal, id: undefined }]))
  assert.throws(() => normalizePhotoMealList([meal, meal]))
})

test('nonfinite, negative, impossible macros and malformed calorie ranges cannot be confirmed', () => {
  for (const mutation of [{ g: 0 }, { g: .001 }, { kcal: -1 }, { protein: NaN }, { fat: Infinity }, { sugar: 100 }, { protein: 900 }]) {
    assert.throws(() => normalizePhotoMeal({ ...meal, items: [{ ...meal.items[0], ...mutation }] }))
  }
  assert.throws(() => normalizePhotoMeal({ ...meal, kcalMin: 600 }))
  assert.throws(() => normalizePhotoMeal({ ...meal, title: image }))
})

test('half portion and editable amounts consistently rescale nutrients and calorie interval', () => {
  const half = alignPhotoRange(meal, meal.items.map(item => scalePhotoItem(item, item.g / 2)))
  assert.equal(half.items[0].g, 100)
  assert.equal(half.items[0].carbs, 28)
  assert.equal(half.kcalMin, 175)
  assert.equal(half.kcalMax, 275)
  assert.equal(photoMealTotals([{ ...half, confirmed: true }]).kcal, 213)
  assert.equal(photoMealTotals([{ ...meal, confirmed: false }]).kcal, 0)
})

test('confirmed photo meals count once in health, history and the Jaminova daily dashboard', () => {
  const record = { date: '2026-10-13', foods: [{ id: 'rice', g: 100 }], manual_kcal: 10, photo_meals: [meal] }
  const foods = [{ id: 'rice', kcalPer100g: 130, portionG: 100 }]
  assert.equal(foodCaloriesForRecord(record, foods).eatenKcal, 565)
  assert.equal(todayNutrition({ records: [record] }, record.date, foods).eatenKcal, 565)
  assert.equal(photoMealTotals([meal]).protein, 36.2)
  assert.equal(photoMealTotals([meal]).carbs, 56)
  assert.equal(todayNutrition({ records: [{ ...record, photo_meals: [{ ...meal, confirmed: false }] }] }, record.date, foods).complete, false)
})

test('owner-approved feature still requires a server key and respects the explicit kill switch', () => {
  assert.equal(foodPhotoConfiguration({}).enabled, false)
  assert.equal(foodPhotoConfiguration({ OPENAI_API_KEY: 'test' }).enabled, true)
  assert.equal(foodPhotoConfiguration({ OPENAI_API_KEY: 'test', FOOD_PHOTO_AI_ENABLED: 'false' }).enabled, false)
  assert.equal(foodPhotoConfiguration({ FOOD_PHOTO_AI_ENABLED: 'true' }).enabled, false)
  assert.equal(foodPhotoConfiguration(env).enabled, true)
  assert.equal('OPENAI_API_KEY' in foodPhotoConfiguration(env), false)
})

test('provider request uses inline image, store=false and no profile, tools, file upload or conversation', () => {
  const body = buildFoodPhotoRequest(image, 'rice', env.FOOD_PHOTO_MODEL)
  assert.equal(body.store, false)
  assert.equal(body.text.format.type, 'json_schema')
  assert.equal(body.text.format.strict, true)
  assert.equal(body.input[1].content[1].image_url, image)
  for (const key of ['tools', 'conversation', 'previous_response_id', 'background', 'metadata']) assert.equal(key in body, false)
})

test('image input rejects missing consent, remote URLs, nonimages and oversized descriptions', () => {
  assert.equal(validateFoodPhotoInput({ image, consent: true }).description, '')
  for (const body of [{ image, consent: false }, { image: 'https://example.com/meal.jpg', consent: true }, { image: 'data:image/svg+xml;base64,AAAA', consent: true }, { image: 'data:image/jpeg;base64,AAAA', consent: true }, { image, description: 'x'.repeat(501), consent: true }]) assert.throws(() => validateFoodPhotoInput(body))
})

test('authentication, origin, disabled feature and consent failures do not call the AI provider', async () => {
  let calls = 0
  const fetcher = async () => { calls++; return providerResponse() }
  const unauthorized = createFoodPhotoHandlers(async () => ({ error: 'Not allowed', status: 403 }), { env, fetcher })
  assert.equal((await unauthorized.GET()).status, 403)
  assert.equal((await unauthorized.POST(request())).status, 403)
  const disabled = createFoodPhotoHandlers(identity, { env: { OPENAI_API_KEY: 'test', FOOD_PHOTO_AI_ENABLED: 'false' }, fetcher })
  assert.equal((await disabled.POST(request())).status, 503)
  const handlers = createFoodPhotoHandlers(identity, { env, fetcher })
  assert.equal((await handlers.POST(request(undefined, 'https://evil.example'))).status, 403)
  assert.equal((await handlers.POST(request({ image, consent: false }))).status, 400)
  assert.equal(calls, 0)
})

test('body-size limits apply even when content-length is absent', async () => {
  const handlers = createFoodPhotoHandlers(identity, { env, fetcher: () => assert.fail('No provider call allowed') })
  const result = await handlers.POST(request({ image: 'x'.repeat(1900000), consent: true }))
  assert.equal(result.status, 400)
})

test('successful analysis returns an unconfirmed preview and never writes records', async () => {
  let sent
  const handlers = createFoodPhotoHandlers(identity, { env, allowAttempt: () => true, fetcher: async (target, options) => {
    assert.equal(target, 'https://api.openai.com/v1/responses')
    sent = JSON.parse(options.body)
    return providerResponse()
  } })
  const response = await handlers.POST(request({ image, consent: true, weight: 80, healthHistory: 'must not be sent' }))
  assert.equal(response.status, 200)
  assert.match(response.headers.get('cache-control'), /no-store/)
  const data = await response.json()
  assert.equal(data.estimate.confirmed, false)
  assert.equal(JSON.stringify(data).includes('base64'), false)
  assert.equal(JSON.stringify(sent).includes('healthHistory'), false)
  assert.equal(JSON.stringify(sent).includes('must not be sent'), false)
})

test('rate limiting, provider errors, refusals, truncated output and nonfood do not produce saveable estimates', async () => {
  const limited = createFoodPhotoHandlers(identity, { env, allowAttempt: () => false, fetcher: () => assert.fail() })
  assert.equal((await limited.POST(request())).status, 429)
  for (const [provider, status] of [
    [() => Response.json({ error: 'private provider detail' }, { status: 429 }), 503],
    [() => Response.json({ status: 'incomplete' }), 502],
    [() => Response.json({ output: [{ content: [{ type: 'refusal', refusal: 'private' }] }] }), 422],
    [() => providerResponse({ items: [{ name: 'food', g: 100, kcal: -5 }] }), 502],
  ]) {
    const handlers = createFoodPhotoHandlers(identity, { env, allowAttempt: () => true, fetcher: provider })
    const response = await handlers.POST(request())
    assert.equal(response.status, status)
    const text = await response.text()
    assert.equal(text.includes('private provider detail'), false)
    assert.equal(text.includes('base64'), false)
  }
  const nonfood = createFoodPhotoHandlers(identity, { env, allowAttempt: () => true, fetcher: () => providerResponse({ isFood: false, items: [] }) })
  assert.equal((await (await nonfood.POST(request())).json()).isFood, false)
})

test('abort is passed to the provider and produces no estimate', async () => {
  const controller = new AbortController()
  const req = new Request(url, { method: 'POST', headers: { Origin: 'https://www.rad-yar.com', 'Content-Type': 'application/json' }, body: JSON.stringify({ image, consent: true }), signal: controller.signal })
  const handlers = createFoodPhotoHandlers(identity, { env, allowAttempt: () => true, fetcher: async (_, options) => {
    controller.abort()
    assert.equal(options.signal.aborted, true)
    throw new DOMException('Aborted', 'AbortError')
  } })
  assert.equal((await handlers.POST(req)).status, 504)
})

test('record save strips photo payloads and legacy clients retain existing confirmed meals', () => {
  const source = readFileSync(new URL('../lib/privateHealthApi.js', import.meta.url), 'utf8')
  assert.match(source, /normalizePhotoMealList\(body.photo_meals\)/)
  assert.match(source, /photoMeals \?\? state.records.find/)
  const component = readFileSync(new URL('../app/admin/health/FoodPhotoEstimator.jsx', import.meta.url), 'utf8')
  assert.doesNotMatch(component, /localStorage|sessionStorage|\/records|\/foods/)
  assert.match(component, /await onConfirm\(validMeal\)/)
  assert.match(component, /controllerRef.current\?\.abort\(\)/)
  const preparation = readFileSync(new URL('../utils/prepareFoodPhoto.js', import.meta.url), 'utf8')
  assert.match(preparation, /toDataURL\('image\/jpeg'/)
  assert.match(preparation, /URL.revokeObjectURL/)
})
