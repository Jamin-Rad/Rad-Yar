import { NextResponse } from 'next/server'

const GOOGLE_TTS_VOICE = process.env.GOOGLE_TTS_VOICE || 'de-DE-Wavenet-C'
const GOOGLE_TTS_RATE = Number.parseFloat(process.env.GOOGLE_TTS_RATE || '0.92')

export function createDeutschSpeechPost(requireSession, logLabel) {
  return async function POST(request) {
    const identity = await requireSession()
    if (identity.error) return NextResponse.json({ error: identity.error }, { status: identity.status })

    if (!process.env.GOOGLE_TTS_API_KEY) {
      return NextResponse.json({ error: 'Die Google-Stimme ist nicht konfiguriert.' }, { status: 503 })
    }

    let body
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 400 })
    }

    const text = typeof body?.text === 'string' ? body.text.trim() : ''
    if (!text || text.length > 5000) {
      return NextResponse.json({ error: 'Der Hörtext fehlt oder ist zu lang.' }, { status: 400 })
    }

    try {
      const response = await fetch(
        `https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.GOOGLE_TTS_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            input: { text },
            voice: { languageCode: 'de-DE', name: GOOGLE_TTS_VOICE },
            audioConfig: { audioEncoding: 'MP3', speakingRate: GOOGLE_TTS_RATE },
          }),
        },
      )

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`[${logLabel}] Google TTS failed`, response.status, errorText)
        return NextResponse.json({ error: 'Die Google-Stimme ist gerade nicht verfügbar.' }, { status: 502 })
      }

      const data = await response.json()
      if (!data?.audioContent) {
        console.error(`[${logLabel}] Google TTS returned no audio content`)
        return NextResponse.json({ error: 'Google hat keine Audiodatei zurückgegeben.' }, { status: 502 })
      }

      return new Response(Buffer.from(data.audioContent, 'base64'), {
        headers: {
          'Content-Type': 'audio/mpeg',
          'Cache-Control': 'private, max-age=3600',
        },
      })
    } catch (error) {
      console.error(`[${logLabel}] request failed`, error)
      return NextResponse.json({ error: 'Die Google-Stimme ist gerade nicht verfügbar.' }, { status: 503 })
    }
  }
}
