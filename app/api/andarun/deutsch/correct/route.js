import { NextResponse } from 'next/server'
import { requireAndarunSession } from '@/lib/andarunPasswordAuth'
import { requireFatimaSession } from '@/lib/fatimaPasswordAuth'

const MODEL = process.env.OPENAI_DEUTSCH_MODEL || 'gpt-5.4-mini'
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

export async function POST(request) {
  const andarun = await requireAndarunSession()
  const identity = andarun.error ? await requireFatimaSession() : andarun
  if (identity.error) return NextResponse.json({ error: identity.error }, { status: identity.status })
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: 'OPENAI_API_KEY is not configured.' }, { status: 503 })
  }

  let body = {}
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const text = cleanText(body.text)
  const task = cleanText(body.task || 'Freier Schreibtext')
  if (!text) return NextResponse.json({ error: 'Text is required.' }, { status: 400 })

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      input: [
        {
          role: 'system',
          content: 'Du bist ein strenger, aber freundlicher Deutschlehrer. Antworte ausschließlich als JSON ohne Markdown.',
        },
        {
          role: 'user',
          content: `Aufgabe: ${task}

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
${text}`,
        },
      ],
      max_output_tokens: 1800,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text().catch(() => '')
    console.error('[andarun-deutsch-correct] OpenAI failed', response.status, errorText)
    return NextResponse.json({ error: 'KI-Korrektur ist gerade nicht verfügbar.' }, { status: 503 })
  }

  const data = await response.json()
  const output = data.output_text
    || data.output?.flatMap(item => item.content || []).map(part => part.text || '').join('\n')
    || ''
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
