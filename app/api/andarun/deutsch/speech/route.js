import { NextResponse } from 'next/server'
import { requireAndarunSession } from '@/lib/andarunPasswordAuth'

const TTS_MODEL = process.env.OPENAI_DEUTSCH_TTS_MODEL || 'tts-1-hd'
const TTS_VOICE = process.env.OPENAI_DEUTSCH_TTS_VOICE || 'nova'

export async function POST(request) {
  const identity = await requireAndarunSession()
  if (identity.error) return NextResponse.json({ error: identity.error }, { status: identity.status })
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: 'Die KI-Stimme ist nicht konfiguriert.' }, { status: 503 })
  }

  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 400 })
  }

  const text = typeof body?.text === 'string' ? body.text.trim() : ''
  if (!text || text.length > 6000) {
    return NextResponse.json({ error: 'Der Hörtext fehlt oder ist zu lang.' }, { status: 400 })
  }

  try {
    const response = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: TTS_MODEL,
        voice: TTS_VOICE,
        input: text,
        response_format: 'mp3',
        speed: 0.95,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('[andarun-deutsch-speech] OpenAI failed', response.status, errorText)
      return NextResponse.json({ error: 'Die KI-Stimme ist gerade nicht verfügbar.' }, { status: 502 })
    }

    return new Response(await response.arrayBuffer(), {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'private, max-age=3600',
      },
    })
  } catch (error) {
    console.error('[andarun-deutsch-speech] request failed', error)
    return NextResponse.json({ error: 'Die KI-Stimme ist gerade nicht verfügbar.' }, { status: 503 })
  }
}
