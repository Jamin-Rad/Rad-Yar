import { NextResponse } from 'next/server'
import { requireAndarunSession } from '@/lib/andarunPasswordAuth'
import { requireFatimaSession } from '@/lib/fatimaPasswordAuth'

const AI_PROVIDER = (process.env.DEUTSCH_AI_PROVIDER || 'openai').toLowerCase()
const OPENAI_MODEL = process.env.OPENAI_DEUTSCH_MODEL || 'gpt-5.4-mini'
const DEEPSEEK_MODEL = process.env.DEEPSEEK_DEUTSCH_MODEL || 'deepseek-v4-flash'
const DEUTSCH_AI_MAX_OUTPUT_TOKENS = Number(process.env.DEUTSCH_AI_MAX_OUTPUT_TOKENS || 1800)
const DEUTSCH_AI_TEMPERATURE = Number(process.env.DEUTSCH_AI_TEMPERATURE || 0.2)
const MAX_TEXT_LENGTH = 5000

function cleanText(value) {
  return typeof value === 'string' ? value.trim().slice(0, MAX_TEXT_LENGTH) : ''
}

function extractJson(value) {
  if (!value) return null
  const start = value.indexOf('{')
  const end = value.lastIndexOf('}')
  if (start < 0 || end < start) return null
  try {
    return JSON.parse(value.slice(start, end + 1))
  } catch {
    return null
  }
}

function getPrompt({ task, text }) {
  return `Aufgabe: ${task}

Korrigiere den folgenden Deutschtext. Gib JSON in dieser Form zurück:
{
  "corrected": "vollständig korrigierte Version",
  "summary": "kurze Rückmeldung auf Deutsch",
  "mistakes": [
    {
      "wrong": "Originalfehler",
      "correct": "Korrektur",
      "reason": "kurze Erklärung auf Deutsch",
      "cardFront": "Lückensatz oder Frage für Wiederholung",
      "cardBack": "richtige Antwort"
    }
  ],
  "betterPhrases": ["natürliche Alternative 1", "natürliche Alternative 2"]
}

Maximal 8 wichtigste Fehler auswählen. Keine erfundenen Fehler.

Text:
${text}`
}

function parseOpenAIResponse(data) {
  return data.output_text
    || data.output?.flatMap(item => item.content || []).map(part => part.text || '').join('\n')
    || ''
}

function parseDeepSeekResponse(data) {
  return data.choices?.[0]?.message?.content || ''
}

async function callOpenAI(prompt) {
  if (!process.env.OPENAI_API_KEY) {
    return { error: 'OPENAI_API_KEY is not configured.', status: 503 }
  }

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      input: [
        {
          role: 'system',
          content: 'Du bist ein strenger, aber freundlicher Deutschlehrer. Antworte ausschließlich als JSON ohne Markdown.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_output_tokens: DEUTSCH_AI_MAX_OUTPUT_TOKENS,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text().catch(() => '')
    console.error('[andarun-deutsch-correct] OpenAI failed', response.status, errorText)
    return { error: 'KI-Korrektur ist gerade nicht verfügbar.', status: 503 }
  }

  const data = await response.json()
  return { output: parseOpenAIResponse(data) }
}

async function callDeepSeek(prompt) {
  if (!process.env.DEEPSEEK_API_KEY) {
    return { error: 'DEEPSEEK_API_KEY is not configured.', status: 503 }
  }

  const response = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: DEEPSEEK_MODEL,
      messages: [
        {
          role: 'system',
          content: 'Du bist ein strenger, aber freundlicher Deutschlehrer. Antworte ausschließlich als gültiges JSON ohne Markdown.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      thinking: { type: 'disabled' },
      temperature: DEUTSCH_AI_TEMPERATURE,
      max_tokens: DEUTSCH_AI_MAX_OUTPUT_TOKENS,
      response_format: { type: 'json_object' },
      stream: false,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text().catch(() => '')
    console.error('[andarun-deutsch-correct] DeepSeek failed', response.status, errorText)
    return { error: 'KI-Korrektur ist gerade nicht verfügbar.', status: 503 }
  }

  const data = await response.json()
  return { output: parseDeepSeekResponse(data) }
}

async function callAiProvider(prompt) {
  if (AI_PROVIDER === 'deepseek') return callDeepSeek(prompt)
  if (AI_PROVIDER === 'openai') return callOpenAI(prompt)
  return { error: `Unsupported DEUTSCH_AI_PROVIDER: ${AI_PROVIDER}`, status: 500 }
}

export async function POST(request) {
  const andarun = await requireAndarunSession()
  const identity = andarun.error ? await requireFatimaSession() : andarun
  if (identity.error) return NextResponse.json({ error: identity.error }, { status: identity.status })

  let body = {}
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const text = cleanText(body.text)
  const task = cleanText(body.task || 'Freier Schreibtext')
  if (!text) return NextResponse.json({ error: 'Text is required.' }, { status: 400 })

  const result = await callAiProvider(getPrompt({ task, text }))
  if (result.error) return NextResponse.json({ error: result.error }, { status: result.status || 503 })

  const output = result.output || ''
  const parsed = extractJson(output)

  return NextResponse.json({
    result: parsed || {
      corrected: output,
      summary: 'Die KI-Antwort konnte nicht strukturiert gelesen werden.',
      mistakes: [],
      betterPhrases: [],
    },
  })
}
