'use client'

import { useRef, useState } from 'react'
import recordings from '@/data/deutschRecordings.json'
import styles from './page.module.css'

export default function ListeningPlayer({ listening }) {
  const audioRef = useRef(null)
  const [error, setError] = useState(false)
  const [ready, setReady] = useState(false)
  const src = listening.audioUrl || recordings.find(recording => recording.text === listening.text)?.src

  function seek(seconds) {
    const audio = audioRef.current
    if (audio && Number.isFinite(audio.duration)) {
      audio.currentTime = Math.max(0, Math.min(audio.duration, audio.currentTime + seconds))
    }
  }

  if (!src) return <p role="status">Für diese Lektion fehlt noch die Audiodatei.</p>

  return (
    <div className={styles.recordingPlayer}>
      <audio ref={audioRef} src={src} controls preload="metadata" aria-label={listening.title || 'Hörtext'} onLoadedMetadata={() => setReady(true)} onError={() => setError(true)} />
      <div className={styles.audioControls}>
        {[-10, -5, 5, 10].map(seconds => (
          <button type="button" className={styles.skipBtn} disabled={!ready || error} key={seconds} onClick={() => seek(seconds)} aria-label={`${Math.abs(seconds)} Sekunden ${seconds < 0 ? 'zurück' : 'vor'}`}>
            {seconds < 0 ? '↶' : '↷'} {Math.abs(seconds)} Sek.
          </button>
        ))}
        <label className={styles.playbackRate}>Tempo
          <select defaultValue="1" onChange={event => { if (audioRef.current) audioRef.current.playbackRate = Number(event.target.value) }}>
            {[0.75, 1, 1.25, 1.5].map(rate => <option key={rate} value={rate}>{rate}×</option>)}
          </select>
        </label>
      </div>
      {error && <p role="alert">Die Audiodatei konnte nicht geladen werden. Bitte versuche es erneut.</p>}
    </div>
  )
}
