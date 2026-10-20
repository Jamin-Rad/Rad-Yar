'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { STORAGE_KEY, assessmentQuestions, writingPrompts, speakingPrompts, emptyProgress, readProgress, getResults, createReport } from './learning'
import CourseApp from './CourseApp'
import { COURSE_STORAGE_KEY, readCourseState, courseReport } from './courseEngine'
import styles from './page.module.css'

const sections = [['course', 'مسیر درس‌ها'], ['review', 'مرور هدفمند'], ['assessment', 'تعیین سطح'], ['speaking', 'مکالمه']]
const fa = value => new Intl.NumberFormat('fa-IR').format(value)
const wordCount = value => value.trim() ? value.trim().split(/\s+/u).length : 0

function Icon({ name = 'arrow' }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {name === 'arrow' ? <path d="M19 12H5m6-6-6 6 6 6" /> : null}
    {name === 'book' ? <><path d="M12 5C8 3 5 3 2 4v15c4-1 7-1 10 1 3-2 6-2 10-1V4c-3-1-6-1-10 1Z" /><path d="M12 5v15" /></> : null}
    {name === 'page' ? <><path d="M5 2h9l5 5v15H5Z M14 2v6h5M9 12h6M9 16h6" /></> : null}
    {name === 'mic' ? <><rect x="9" y="2" width="6" height="13" rx="3" /><path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3M8 22h8" /></> : null}
    {name === 'chat' ? <><path d="M14 14a7 7 0 1 0-9 0l-2 5 6-3a7 7 0 0 0 5-2Z" /><path d="M17 7a7 7 0 0 1 4 11l1 4-5-2a7 7 0 0 1-5-2" /></> : null}
    {name === 'sound' ? <><path d="m11 4-6 5H2v6h3l6 5ZM15 8a6 6 0 0 1 0 8M18 5a10 10 0 0 1 0 14" /></> : null}
  </svg>
}

function Choices({ question, value, onChange, revealed = false, name }) {
  return <fieldset className={styles.choices}>
    <legend className={styles.srOnly}>انتخاب پاسخ</legend>
    {[...question.options, ...(!revealed || value === -1 ? ['نمی‌دانم'] : [])].map((option, i) => {
      const index = i === question.options.length ? -1 : i
      return <label key={index} className={`${styles.choice} ${value === index ? styles.selected : ''} ${revealed && index === question.answer ? styles.correct : ''} ${revealed && value === index && index !== question.answer ? styles.incorrect : ''}`}>
        <input type="radio" name={name} value={index} checked={value === index} disabled={revealed} onChange={() => onChange(index)} />
        <span lang={index === -1 ? 'fa' : 'en'} dir={index === -1 ? 'rtl' : 'ltr'}>{option}</span>
        {revealed && index === question.answer ? <small>پاسخ درست</small> : null}
      </label>
    })}
  </fieldset>
}

function Speaking({ progress, update, speak, notify }) {
  const [promptIndex, setPromptIndex] = useState(0)
  const [status, setStatus] = useState('idle')
  const [seconds, setSeconds] = useState(0)
  const [audioUrl, setAudioUrl] = useState('')
  const [audioType, setAudioType] = useState('audio/webm')
  const [error, setError] = useState('')
  const recorder = useRef(null)
  const stream = useRef(null)
  const audioUrlRef = useRef('')
  const active = useRef(true)
  const prompt = speakingPrompts[promptIndex]

  useEffect(() => {
    active.current = true
    return () => {
      active.current = false
      if (recorder.current?.state === 'recording') recorder.current.stop()
      stream.current?.getTracks().forEach(track => track.stop())
      if (audioUrlRef.current) URL.revokeObjectURL(audioUrlRef.current)
    }
  }, [])

  useEffect(() => {
    if (status !== 'recording') return
    const start = Date.now()
    const timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - start) / 1000)
      setSeconds(elapsed)
      if (elapsed >= 120 && recorder.current?.state === 'recording') recorder.current.stop()
    }, 250)
    return () => clearInterval(timer)
  }, [status])

  async function startRecording() {
    setError('')
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      setError('ضبط صدا در این مرورگر در دسترس نیست. با صدای بلند تمرین کن و نکته‌هایت را پایین بنویس.')
      return
    }
    window.speechSynthesis?.cancel()
    setStatus('requesting')
    try {
      const media = await navigator.mediaDevices.getUserMedia({ audio: true })
      if (!active.current) { media.getTracks().forEach(track => track.stop()); return }
      stream.current = media
      const recording = new MediaRecorder(media)
      recorder.current = recording
      const chunks = []
      recording.ondataavailable = event => { if (event.data.size) chunks.push(event.data) }
      recording.onstop = () => {
        media.getTracks().forEach(track => track.stop())
        if (!active.current) return
        const type = recording.mimeType || 'audio/webm'
        const blob = new Blob(chunks, { type })
        if (audioUrlRef.current) URL.revokeObjectURL(audioUrlRef.current)
        audioUrlRef.current = URL.createObjectURL(blob)
        setAudioUrl(audioUrlRef.current)
        setAudioType(type)
        setStatus('idle')
      }
      recording.onerror = () => {
        media.getTracks().forEach(track => track.stop())
        if (active.current) { setStatus('idle'); setError('ضبط متوقف شد. دوباره امتحان کن یا یادداشت بنویس.') }
      }
      recording.start()
      setSeconds(0)
      setStatus('recording')
    } catch {
      stream.current?.getTracks().forEach(track => track.stop())
      if (active.current) { setStatus('idle'); setError('دسترسی به میکروفن برقرار نشد. اجازهٔ میکروفن را در مرورگر بررسی کن؛ تمرین بدون ضبط هم ممکن است.') }
    }
  }

  function changePrompt() {
    setPromptIndex(i => (i + 1) % speakingPrompts.length)
    if (audioUrlRef.current) URL.revokeObjectURL(audioUrlRef.current)
    audioUrlRef.current = ''
    setAudioUrl('')
    setError('')
    setSeconds(0)
  }

  return <>
    <div className={styles.sectionTitle}><h1>یک دقیقه، با صدای خودت.</h1><p>۳۰ ثانیه فکر کن، حدود یک دقیقه صحبت کن، بعد به صدای خودت گوش بده.</p></div>
    <div className={styles.practiceGrid}>
      <section className={styles.paper} aria-labelledby="speaking-title">
        <div className={styles.between}><span className={styles.muted}>موضوع {fa(promptIndex + 1)} از {fa(speakingPrompts.length)}</span><button className={styles.textButton} disabled={status !== 'idle'} onClick={changePrompt}>موضوع بعدی <Icon /></button></div>
        <h2 id="speaking-title">{prompt.title}</h2>
        <p className={styles.englishPrompt} lang="en" dir="ltr">{prompt.prompt}</p>
        <button className={styles.textButton} disabled={status !== 'idle'} onClick={() => speak(prompt.prompt)}><Icon name="sound" /> شنیدن سؤال</button>
        <div className={styles.helpers}><span>برای شروع جمله:</span>{prompt.helpers.map(text => <span lang="en" dir="ltr" key={text}>{text}</span>)}</div>
        <div className={styles.recorder}>
          <span className={styles.clock} lang="en" dir="ltr">{String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}</span>
          {status === 'recording' ? <button className={styles.stop} onClick={() => recorder.current?.stop()}>توقف ضبط</button> : <button className={styles.primary} disabled={status === 'requesting'} onClick={startRecording}><Icon name="mic" />{status === 'requesting' ? 'در انتظار میکروفن…' : audioUrl ? 'ضبط دوباره' : 'شروع ضبط'}</button>}
          <p className={styles.muted}>حداکثر ۲ دقیقه؛ صدا به سرور فرستاده نمی‌شود.</p>
        </div>
        {error ? <p className={styles.error} role="alert">{error}</p> : null}
        {audioUrl ? <div className={styles.audio}><audio controls src={audioUrl} aria-label="بازپخش تمرین مکالمه" /><a className={styles.textButton} href={audioUrl} download={`jaminova-speaking-${promptIndex + 1}.${audioType.includes('mp4') ? 'm4a' : audioType.includes('ogg') ? 'ogg' : 'webm'}`}>دانلود صدای من</a></div> : null}
        <p className={styles.small}>ضبط فقط تا زمانی که این بخش باز است نگه داشته می‌شود. برای نگه‌داشتن آن، فایل را دانلود کن. این نسخه بازخورد خودکار تلفظ ندارد.</p>
      </section>
      <aside className={styles.paper}>
        <h2>دوباره گوش کن.</h2><p className={styles.muted}>این بررسی را خودت انجام بده:</p>
        <div className={styles.checklist}>{prompt.checks.map((text, i) => <label key={`${promptIndex}-${i}`}><input type="checkbox" checked={(progress.speakingChecks[promptIndex] || []).includes(i)} onChange={event => update(p => ({ ...p, speakingChecks: { ...p.speakingChecks, [promptIndex]: event.target.checked ? [...(p.speakingChecks[promptIndex] || []), i] : (p.speakingChecks[promptIndex] || []).filter(n => n !== i) } }))} />{text}</label>)}</div>
        <label className={styles.field}>کجا گیر کردی؟<textarea lang="en" dir="ltr" rows={5} maxLength={12000} value={progress.speakingNotes[promptIndex] || ''} onChange={event => update(p => ({ ...p, speakingNotes: { ...p.speakingNotes, [promptIndex]: event.target.value } }))} placeholder="Words I needed, sentences I want to improve…" /></label>
        <button className={styles.primary} onClick={() => { update(p => ({ ...p, sessions: [...p.sessions, { prompt: promptIndex, date: new Date().toISOString() }].slice(-100) })); notify('تمرین مکالمه ثبت شد. یادداشت‌ها در گزارش هم می‌آیند.') }}>ثبت تمرین</button>
      </aside>
    </div>
  </>
}

export default function EnglishApp() {
  const [section, setSection] = useState('course')
  const [progress, setProgress] = useState(emptyProgress)
  const [loaded, setLoaded] = useState(false)
  const [storageError, setStorageError] = useState('')
  const [notice, setNotice] = useState('')
  const content = useRef(null)
  const reportUrl = useRef(null)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setProgress(readProgress(JSON.parse(saved)))
    } catch { setStorageError('پیشرفت قبلی خوانده نشد. می‌توانی تمرین کنی و گزارش را دانلود کنی.') }
    setLoaded(true)
    return () => { window.speechSynthesis?.cancel(); if (reportUrl.current) URL.revokeObjectURL(reportUrl.current) }
  }, [])

  useEffect(() => {
    if (!loaded) return
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)) }
    catch { setStorageError('ذخیره در مرورگر ممکن نشد. برای نگه‌داشتن پاسخ‌ها، گزارش را دانلود کن.') }
  }, [progress, loaded])

  useEffect(() => {
    if (!notice) return
    const timer = setTimeout(() => setNotice(''), 6000)
    return () => clearTimeout(timer)
  }, [notice])

  function navigate(next) {
    window.speechSynthesis?.cancel()
    setSection(next)
    setNotice('')
    content.current?.focus({ preventScroll: true })
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  function speak(text) {
    if (!('speechSynthesis' in window)) { setNotice('پخش تلفظ در این مرورگر در دسترس نیست.'); return }
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-GB'
    utterance.rate = 0.9
    const voice = window.speechSynthesis.getVoices().find(v => v.lang === 'en-GB') || window.speechSynthesis.getVoices().find(v => v.lang.startsWith('en'))
    if (voice) utterance.voice = voice
    utterance.onerror = event => { if (!['interrupted', 'canceled'].includes(event.error)) setNotice('پخش تلفظ ممکن نشد؛ صدای انگلیسی دستگاه را بررسی کن.') }
    window.speechSynthesis.speak(utterance)
  }

  function buildReport() {
    let report = createReport(progress)
    try { report += '\n\n' + courseReport(readCourseState(JSON.parse(localStorage.getItem(COURSE_STORAGE_KEY)))) }
    catch { report += '\nCourse progress could not be read from this browser.' }
    return report
  }

  function downloadReport() {
    if (reportUrl.current) URL.revokeObjectURL(reportUrl.current)
    reportUrl.current = URL.createObjectURL(new Blob([buildReport()], { type: 'text/plain;charset=utf-8' }))
    const anchor = document.createElement('a')
    anchor.href = reportUrl.current
    anchor.download = 'jaminova-english-report.txt'
    anchor.click()
    setNotice('گزارش تعیین سطح و پیشرفت دوره آمادهٔ دانلود شد.')
  }

  async function copyReport() {
    try { await navigator.clipboard.writeText(buildReport()); setNotice('گزارش تعیین سطح و پیشرفت دوره کپی شد.') }
    catch { setNotice('کپی در این مرورگر ممکن نشد. از «دانلود گزارش» استفاده کن.') }
  }

  const answered = assessmentQuestions.filter(q => Number.isInteger(progress.answers[q.id])).length
  const results = getResults(progress.answers)
  const assessment = assessmentQuestions[progress.step]

  return <main className={styles.app} lang="fa" dir="rtl">
    <div className={styles.shell}>
      <header className={styles.header}>
        <Link href="/andarun" className={styles.back}>بازگشت به فضای شخصی <span className={styles.flipped}><Icon /></span></Link>
        <button className={styles.brand} onClick={() => navigate('course')} aria-label="Jaminova English، صفحهٔ شروع" lang="en" dir="ltr"><Icon name="chat" /><span><strong>Jaminova</strong><small>ENGLISH</small></span></button>
      </header>
      <nav className={styles.nav} aria-label="بخش‌های آموزش انگلیسی">{sections.map(([key, label]) => <button key={key} aria-current={section === key ? 'page' : undefined} className={section === key ? styles.activeNav : ''} onClick={() => navigate(key)}>{label}</button>)}</nav>
      {storageError ? <p className={styles.error} role="alert">{storageError}</p> : null}
      <p className={styles.notice} role="status" aria-live="polite">{notice}</p>
      <div className={styles.content} ref={content} tabIndex={-1}>
        {!loaded ? <p className={styles.loading} role="status">در حال آماده‌سازی تمرین‌ها…</p> : <>
          {section === 'course' || section === 'review' ? <CourseApp mode={section} diagnostic={progress} speak={speak} /> : null}

          {section === 'assessment' ? <>
            <div className={styles.sectionTitle}><h1>ببینیم از کجا شروع کنیم.</h1><p>این ارزیابی کوتاه تشخیصی است؛ سطح رسمی CEFR و توانایی شنیداری یا گفتاری را تعیین نمی‌کند.</p></div>
            {progress.submittedAt ? <>
              <section className={styles.paper}><div className={styles.between}><h2>نتیجهٔ گرامر و واژگان</h2><span className={styles.muted}>B1 قبلی: به گفتهٔ تو</span></div><div className={styles.scores}>{results.map(r => <div key={r.skill}><strong>{fa(r.correct)} <small>از {fa(r.total)}</small></strong><span>{r.skill === 'grammar' ? 'گرامر' : 'واژگان'}</span></div>)}</div><p>این نمره فقط پاسخ به همین سؤال‌ها را نشان می‌دهد. نوشته‌ها هنوز بررسی نشده‌اند.</p><div className={styles.actions}><button className={styles.primary} onClick={copyReport}>کپی گزارش برای چت</button><button className={styles.secondary} onClick={downloadReport}>دانلود گزارش</button><button className={styles.textButton} onClick={() => setProgress(p => ({ ...p, submittedAt: null, step: 0 }))}>ویرایش پاسخ‌ها</button></div></section>
              <section className={styles.paper}><h2>قدم بعدی تمرین</h2><p className={styles.muted}>موضوع‌های زیر از پاسخ‌های همین آزمون به دست آمده‌اند.</p><ul className={styles.topicList}>{[...new Set(assessmentQuestions.map(q => q.topic))].map(topic => {
                const questions = assessmentQuestions.filter(q => q.topic === topic)
                const correct = questions.filter(q => progress.answers[q.id] === q.answer).length
                return <li key={topic}><strong>{topic}</strong><span>{fa(correct)} از {fa(questions.length)} پاسخ درست؛ {correct === questions.length ? 'در این نمونه خوب پاسخ دادی.' : 'در برنامهٔ مرور قرار بده.'}</span></li>
              })}</ul><div className={styles.actions}><button className={styles.secondary} onClick={() => navigate('course')}>مسیر درس‌ها</button><button className={styles.secondary} onClick={() => navigate('review')}>مرور هدفمند</button></div></section>
              <h2 className={styles.reviewTitle}>مرور پاسخ‌ها</h2>{assessmentQuestions.map((q, i) => <details className={styles.answerDetail} key={q.id}><summary>{fa(i + 1)}. {q.topic}<span>{progress.answers[q.id] === q.answer ? 'درست' : progress.answers[q.id] === -1 ? 'نمی‌دانستم' : 'نیاز به تمرین'}</span></summary><p className={styles.englishPrompt} dir="ltr" lang="en">{q.prompt}</p><p>پاسخ تو: <bdi lang="en">{q.options[progress.answers[q.id]] || 'نمی‌دانم'}</bdi></p><p>پاسخ درست: <bdi lang="en">{q.options[q.answer]}</bdi></p><p className={styles.feedback}>{q.why}</p></details>)}
            </> : <section className={styles.paper}>
              <div className={styles.between}><span className={styles.muted}>{assessment ? `سؤال ${fa(progress.step + 1)} از ${fa(assessmentQuestions.length)}` : 'نوبت نوشتهٔ توست'}</span><span className={styles.muted}>{fa(answered)} پاسخ ثبت‌شده</span></div>
              <progress className={styles.progress} value={answered} max={assessmentQuestions.length} aria-label="پیشرفت پاسخ به سؤال‌های تعیین سطح" />
              {assessment ? <><h2>{assessment.skill === 'grammar' ? 'جمله را کامل کن.' : 'واژه را در موقعیت انتخاب کن.'}</h2><p className={styles.englishPrompt} lang="en" dir="ltr">{assessment.prompt}</p><Choices name={assessment.id} question={assessment} value={progress.answers[assessment.id]} onChange={value => setProgress(p => ({ ...p, answers: { ...p.answers, [assessment.id]: value } }))} /><p className={styles.small}>نمی‌دانی؟ همان گزینه را انتخاب کن؛ حدس زدن اجباری نیست.</p></> : <div className={styles.writing}>{writingPrompts.map(q => <label className={styles.field} key={q.id}><strong>{q.title}</strong><span className={styles.englishPrompt} lang="en" dir="ltr">{q.prompt}</span><span className={styles.muted}>{q.hint}</span><textarea lang="en" dir="ltr" rows={q.id === 'story' ? 7 : 3} maxLength={12000} value={progress.writing[q.id] || ''} onChange={event => setProgress(p => ({ ...p, writing: { ...p.writing, [q.id]: event.target.value } }))} /><span className={styles.small}>{fa(wordCount(progress.writing[q.id] || ''))} کلمه · بررسی نوشته در چت انجام می‌شود.</span></label>)}</div>}
              <div className={styles.actions}>
                {assessment ? <button className={styles.primary} disabled={!Number.isInteger(progress.answers[assessment.id])} onClick={() => setProgress(p => ({ ...p, step: p.step + 1 }))}>بعدی <Icon /></button> : <button className={styles.primary} onClick={() => { setProgress(p => ({ ...p, submittedAt: new Date().toISOString() })); setNotice('نتیجه ثبت شد. برای بازخورد روی نوشته‌ها، گزارش را در چت بفرست.'); window.scrollTo({ top: 0 }) }}>ثبت و دیدن نتیجه</button>}
                <button className={styles.secondary} disabled={progress.step === 0} onClick={() => setProgress(p => ({ ...p, step: p.step - 1 }))}>قبلی</button>
              </div>{!assessment ? <p className={styles.small}>می‌توانی نوشته‌ها را بعداً تکمیل کنی. متن خالی نمرهٔ خودکار نمی‌گیرد.</p> : null}
            </section>}
          </> : null}

          {section === 'speaking' ? <Speaking progress={progress} update={setProgress} speak={speak} notify={setNotice} /> : null}
        </>}
      </div>
      <footer className={styles.footer}><p>پیشرفتت در همین مرورگر ذخیره می‌شود؛ بین دستگاه‌ها همگام نمی‌شود.</p>{loaded ? <div><button onClick={downloadReport}>دانلود گزارش</button><button onClick={copyReport}>کپی برای چت</button></div> : null}</footer>
    </div>
  </main>
}
