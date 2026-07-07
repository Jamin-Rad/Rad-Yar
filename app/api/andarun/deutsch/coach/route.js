import { NextResponse } from 'next/server'
import { requireAndarunSession } from '@/lib/andarunPasswordAuth'
import { requireFatimaSession } from '@/lib/fatimaPasswordAuth'

const MODEL = process.env.OPENAI_DEUTSCH_MODEL || 'gpt-5.4-mini'
const MAX_TEXT_LENGTH = 4500

function cleanText(value, max = MAX_TEXT_LENGTH) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
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

function cleanLesson(value) {
  const lesson = value && typeof value === 'object' ? value : {}
  return {
    title: cleanText(lesson.title, 160),
    topic: cleanText(lesson.topic, 220),
    level: cleanText(lesson.level, 40),
    readingTitle: cleanText(lesson.reading?.title, 160),
    readingText: cleanText(lesson.reading?.text),
    vocabulary: Array.isArray(lesson.reading?.vocabulary)
      ? lesson.reading.vocabulary.slice(0, 16).map(item => ({
        term: cleanText(item.term, 80),
        de: cleanText(item.de, 220),
        fa: cleanText(item.fa, 120),
        example: cleanText(item.example, 180),
      }))
      : [],
    grammar: Array.isArray(lesson.grammar)
      ? lesson.grammar.slice(0, 8).map(item => ({
        question: cleanText(item.question, 240),
        explanation: cleanText(item.explanation, 360),
      }))
      : [],
    writingPrompt: cleanText(lesson.writing?.prompt, 360),
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

  const lesson = cleanLesson(body.lesson)
  const mode = cleanText(body.mode, 40) || 'explain'
  const question = cleanText(body.question, 1000)

  if (!lesson.readingText && !question) {
    return NextResponse.json({ error: 'Lesson or question is required.' }, { status: 400 })
  }

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
          content: 'Du bist ein freundlicher, präziser Deutsch-Coach für erwachsene Lernende mit Persisch als Muttersprache. Antworte ausschließlich als JSON ohne Markdown.',
        },
        {
          role: 'user',
          content: `Lektion:
${JSON.stringify(lesson, null, 2)}

Modus: ${mode}
Frage oder Wunsch der Lernenden:
${question || 'Erstelle eine hilfreiche Lernhilfe zur aktuellen Lektion.'}

Gib JSON exakt in dieser Form zurück:
{
  "title": "kurzer Titel",
  "answer": "klare Erklärung auf Deutsch, 5-9 kurze Sätze",
  "persianHint": "sehr kurze Hilfe auf Persisch, maximal 2 Sätze",
  "examples": ["2-4 natürliche deutsche Beispielsätze"],
  "miniExercise": {
    "instruction": "kurze Aufgabe",
    "items": [
      { "prompt": "Frage oder Lücke", "answer": "Musterlösung", "explanation": "kurze Erklärung" }
    ]
  },
  "cards": [
    { "front": "Flashcard-Vorderseite", "back": "Rückseite mit Erklärung", "term": "kurzer Kartenname" }
  ]
}

Regeln:
- Wenn Modus "grammar" ist, erkläre Satzstellung, Fälle, Präpositionen oder Nebensätze aus der Lektion.
- Wenn Modus "vocabulary" ist, erkläre Wörter natürlich mit Beispielen und persischer Hilfe.
- Wenn Modus "writing" ist, gib Formulierungen für bessere Schreibtexte.
- Wenn Modus "exercise" ist, erstelle eine Mini-Übung mit genau 4 Items.
- Bleibe beim Niveau ${lesson.level || 'B1/B2'}.
- Keine langen Tabellen.
- Maximal 5 cards.`,
        },
      ],
      max_output_tokens: 1800,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text().catch(() => '')
    console.error('[andarun-deutsch-coach] OpenAI failed', response.status, errorText)
    return NextResponse.json({ error: 'KI-Coach ist gerade nicht verfügbar.' }, { status: 503 })
  }

  const data = await response.json()
  const output = data.output_text
    || data.output?.flatMap(item => item.content || []).map(part => part.text || '').join('\n')
    || ''
  const parsed = extractJson(output)

  return NextResponse.json({
    result: parsed || {
      title: 'KI-Coach',
      answer: output,
      persianHint: '',
      examples: [],
      miniExercise: { instruction: '', items: [] },
      cards: [],
    },
  })
}
