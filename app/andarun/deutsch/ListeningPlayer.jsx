'use client'

import { useEffect, useRef, useState } from 'react'
import recordings from '@/data/deutschRecordings.json'
import styles from './audio.module.css'

const sources = new Map(recordings.map(recording => [recording.text, recording.src]))
export function recordingSource(section) { return sources.get(section?.text) || section?.audioUrl }
const clock = seconds => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`

function PlayIcon({ playing }) {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{playing ? <><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></> : <path d="M8 4.8a1 1 0 0 1 1.5-.86l11 7.2a1 1 0 0 1 0 1.72l-11 7.2A1 1 0 0 1 8 19.2z" />}</svg>
}
export default function ListeningPlayer({ listening, onProgress }) {
  const audioRef = useRef(null)
  const listened = useRef(new Set())
  const lastTime = useRef(null)
  const [error, setError] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [position, setPosition] = useState(0)
  const src = recordingSource(listening)
  useEffect(() => {
    const pauseOther = event => { if (event.detail !== audioRef.current) audioRef.current?.pause() }
    window.addEventListener('deutsch-audio-play', pauseOther)
    return () => window.removeEventListener('deutsch-audio-play', pauseOther)
  }, [])
  function seek(seconds) {
    const audio = audioRef.current
    if (audio && Number.isFinite(audio.duration)) audio.currentTime = Math.max(0, Math.min(audio.duration, seconds))
  }
  async function toggle() {
    const audio = audioRef.current
    if (!audio) return
    if (!audio.paused) { audio.pause(); return }
    try { setError(false); await audio.play() } catch { setError(true) }
  }
  if (!src) return <p className={styles.missing} role="status">Für diesen Text fehlt noch die Audiodatei.</p>
  return <div className={styles.player} role="group" aria-label={listening.title || 'Text anhören'}>
    <audio ref={audioRef} src={src} preload="metadata" onLoadedMetadata={event => setDuration(Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : 0)} onTimeUpdate={event => {
      const audio = event.currentTarget
      setPosition(audio.currentTime)
      const previous = lastTime.current
      // Count only seconds actually played; seeking to the end earns no progress.
      if (!audio.paused && previous !== null && audio.currentTime > previous && audio.currentTime - previous < 2) {
        for (let second = Math.floor(previous); second < Math.floor(audio.currentTime); second++) listened.current.add(second)
        if (Number.isFinite(audio.duration) && audio.duration > 0) onProgress?.(Math.min(1, Math.floor(listened.current.size / audio.duration * 20) / 20))
      }
      lastTime.current = audio.currentTime
    }} onSeeking={() => { lastTime.current = null }} onPlay={() => { setPlaying(true); window.dispatchEvent(new CustomEvent('deutsch-audio-play', { detail: audioRef.current })) }} onPause={() => setPlaying(false)} onEnded={event => {
      setPlaying(false)
      if (listened.current.size >= event.currentTarget.duration - 2) onProgress?.(1)
    }} onError={() => setError(true)} />
    <div className={styles.main}>
      <button type="button" className={styles.play} onClick={toggle} aria-label={playing ? 'Audio pausieren' : 'Audio abspielen'}><PlayIcon playing={playing} /></button>
      <div className={styles.timeline}>
        <div className={styles.caption}><span>{listening.title || 'Text anhören'}</span><span>{clock(position)} <span aria-hidden="true">/</span> {clock(duration)}</span></div>
        <input type="range" min="0" max={duration || 0} step="0.1" value={Math.min(position, duration)} onChange={event => seek(Number(event.target.value))} disabled={!duration} aria-label="Wiedergabeposition" aria-valuetext={`${clock(position)} von ${clock(duration)}`} />
      </div>
    </div>
    <div className={styles.controls}>
      <div className={styles.skipGroup}>{[-10, -5, 5, 10].map(seconds => <button type="button" key={seconds} disabled={!duration} onClick={() => seek((audioRef.current?.currentTime || 0) + seconds)} aria-label={`${Math.abs(seconds)} Sekunden ${seconds < 0 ? 'zurück' : 'vor'}`}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={seconds > 0 ? { transform: 'scaleX(-1)' } : undefined}><path d="M3 9h5V4M3 9a9 9 0 1 1 0 8" /></svg>{Math.abs(seconds)}s</button>)}</div>
      <label className={styles.speed}>Tempo<select aria-label="Wiedergabegeschwindigkeit" defaultValue="1" onChange={event => { if (audioRef.current) audioRef.current.playbackRate = Number(event.target.value) }}>{[0.75, 1, 1.25, 1.5].map(rate => <option key={rate} value={rate}>{rate}×</option>)}</select></label>
    </div>
    {error && <p className={styles.error} role="alert">Die Audiodatei konnte nicht geladen werden. Bitte versuche es erneut.</p>}
  </div>
}
