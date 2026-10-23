'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { lesson, categories, questionMap } from './courseContent'
import { STORAGE_KEY, emptyState, readState, startSession, currentQuestion, optionOrder, answer, advance, result } from './courseEngine'
import styles from './page.module.css'

const fa = n => new Intl.NumberFormat('fa-IR').format(n)
const date = n => new Intl.DateTimeFormat('fa-IR', { timeZone: 'Europe/Berlin', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(n)
function Text({ plain = false }) {
  return <div className={styles.reading} lang="en" dir="ltr">{lesson.paragraphs.map((p, i) => <p key={i}>{plain ? p.replaceAll('**', '') : p.split(/(\*\*.*?\*\*)/g).map((part, j) => part.startsWith('**') ? <strong key={j}>{part.slice(2, -2)}</strong> : part)}</p>)}</div>
}
function Icon() {
  return <svg aria-hidden="true" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M24 10C17 6 10 6 5 8v30c6-2 13-2 19 2 6-4 13-4 19-2V8c-5-2-12-2-19 2Zm0 0v30M11 15c3-1 5 0 8 1m-8 7c3-1 5 0 8 1m10-8c3-1 5-2 8-1m-8 9c3-1 5-2 8-1" /></svg>
}
export default function EnglishApp() {
  const [state, setState] = useState(emptyState)
  const [loaded, setLoaded] = useState(false)
  const [screen, setScreen] = useState('lesson')
  const [notice, setNotice] = useState('')
  const [clock, setClock] = useState(0)
  const [speaking, setSpeaking] = useState(false)
  const heading = useRef(null)
  const speech = useRef(null)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const restored = readState(JSON.parse(raw)); setState(restored)
        if (restored.session) setScreen('quiz')
      }
    } catch { setNotice('پیشرفت قبلی خوانده نشد؛ می‌توانی تمرین را شروع کنی.') }
    setClock(Date.now()); setLoaded(true)
    const timer = setInterval(() => setClock(Date.now()), 30000)
    return () => { clearInterval(timer); window.speechSynthesis?.cancel() }
  }, [])
  useEffect(() => {
    if (!loaded) return
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)) }
    catch { setNotice('ذخیره در این مرورگر ممکن نیست؛ با بستن صفحه پیشرفت این نوبت از دست می‌رود.') }
  }, [state, loaded])
  useEffect(() => { if (loaded) heading.current?.focus() }, [screen, state.session?.index, loaded])
  function stopAudio() { window.speechSynthesis?.cancel(); setSpeaking(false) }
  function begin(mode) { stopAudio(); setState(p => startSession(p, mode)); setScreen('quiz') }
  function play() {
    if (speaking) { stopAudio(); return }
    if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) { setNotice('خواندن صوتی در این مرورگر در دسترس نیست.'); return }
    const utterance = new SpeechSynthesisUtterance(lesson.paragraphs.join('\n').replaceAll('**', ''))
    utterance.lang = 'en-GB'; utterance.rate = 0.88
    utterance.onend = () => setSpeaking(false)
    utterance.onerror = () => { setSpeaking(false); setNotice('پخش صوت انجام نشد؛ صدای انگلیسی مرورگر را بررسی کن.') }
    speech.current = utterance; window.speechSynthesis.speak(utterance); setSpeaking(true)
  }
  const session = state.session
  const q = currentQuestion(session)
  const selected = q ? session.answers[q.id] : undefined
  const mistakes = Object.keys(state.mistakes)
  const due = mistakes.filter(id => state.mistakes[id].due <= clock)
  const finished = session && session.index === session.ids.length
  const score = finished ? result(session) : null
  return <main className={styles.app} dir="rtl" lang="fa"><div className={styles.shell}>
    <header className={styles.header}>
      <Link href="/andarun" className={styles.back}>بازگشت به یامینوا</Link>
      <div className={styles.brand} dir="ltr" lang="en"><Icon /><span><strong>English</strong><small>JAMINOVA</small></span></div>
    </header>
    <nav className={styles.nav} aria-label="بخش‌های درس">
      <button aria-current={screen === 'lesson' ? 'page' : undefined} onClick={() => setScreen('lesson')}>درس اول B1</button>
      <button aria-current={screen === 'review' ? 'page' : undefined} onClick={() => { stopAudio(); setScreen('review') }}>مرور اشتباهات {mistakes.length ? `(${fa(mistakes.length)})` : ''}</button>
      {session ? <button aria-current={screen === 'quiz' ? 'page' : undefined} onClick={() => { stopAudio(); setScreen('quiz') }}>{finished ? 'نتیجهٔ آخرین تمرین' : 'ادامهٔ آزمون'}</button> : null}
    </nav>
    {notice ? <p role="status" className={styles.notice}>{notice}</p> : null}
    {!loaded ? <p role="status">در حال آماده‌سازی درس…</p> : screen === 'lesson' ? <>
      <section className={styles.intro}><span className={styles.kicker}>B1 · درس ۱ از مسیر ۲۰ درسی</span><h1 tabIndex={-1} ref={heading}>{lesson.title}</h1><p>آشنایی، صحبت دربارهٔ کار و هماهنگ‌کردن یک گفت‌وگوی کوتاه.</p><p className={styles.muted}>فعلاً فقط درس اول آماده است · حدود ۲۰ تا ۳۰ دقیقه · تمام تمرین‌ها چهارگزینه‌ای</p></section>
      <div className={styles.studyGrid}>
        <article className={styles.paper}><div className={styles.sectionHead}><div><span className={styles.kicker}>۱ · بخوان و گوش بده</span><h2 lang="en" dir="ltr">{lesson.subtitle}</h2></div><button className={styles.secondary} onClick={play}>{speaking ? 'توقف صدا' : 'شنیدن متن'}</button></div><Text /><p className={styles.muted}>عبارت‌های کاربردی و نمونه‌های گرامر بولد شده‌اند. صدا با صدای مصنوعی مرورگر خوانده می‌شود.</p></article>
        <aside className={styles.side}><div className={styles.darkPanel}><span className={styles.kicker}>تمرین امروز</span><h2>بخوان. انتخاب کن. مرور کن.</h2><p>۵ تست درک متن، ۵ واژگان، ۵ گرامر و ۵ پاسخ در مکالمه.</p>{session && !finished ? <button className={styles.lightButton} onClick={() => { stopAudio(); setScreen('quiz') }}>ادامهٔ آزمون ذخیره‌شده</button> : <button className={styles.lightButton} onClick={() => begin('test')}>شروع ۲۰ تست</button>}<p className={styles.fine}>بعد از هر پاسخ، توضیح فارسی می‌بینی. اشتباه‌ها برای تمرین با سؤال تازه ذخیره می‌شوند.</p></div><div className={styles.sideNote}><strong>تمرکز گرامر</strong><p>{lesson.grammar}</p><strong>هدف این درس</strong><p>انتخاب پاسخ طبیعی در آشنایی با همکار و تشخیص کار معمول از وضعیت موقتی.</p></div></aside>
      </div>
      <section className={styles.paper}><span className={styles.kicker}>۲ · عبارت‌های کاربردی</span><h2>۱۰ عبارت برای زندگی و کار</h2><div className={styles.wordGrid}>{lesson.words.map(([term, meaning, example]) => <div className={styles.word} key={term}><strong lang="en" dir="ltr">{term}</strong><span>{meaning}</span><p lang="en" dir="ltr">{example}</p></div>)}</div></section>
      <section className={styles.paper}><span className={styles.kicker}>۳ · گرامر کوتاه</span><h2>{lesson.grammar}</h2><div className={styles.grammarGrid}>{lesson.grammarNotes.map(([title, body, example]) => <div key={title}><h3>{title}</h3><p>{body}</p><p className={styles.example} lang="en" dir="ltr">{example}</p></div>)}</div></section>
      <div className={styles.bottomAction}><p>آماده‌ای؟ توضیح‌ها بعد از انتخاب پاسخ نمایش داده می‌شوند.</p><button className={styles.primary} onClick={() => session && !finished ? setScreen('quiz') : begin('test')}>{session && !finished ? 'ادامهٔ آزمون' : 'شروع آزمون درس اول'}</button></div>
    </> : screen === 'review' ? <>
      <section className={styles.intro}><h1 tabIndex={-1} ref={heading}>مرور اشتباهات</h1><p>همان نکته، با یک سؤال تازه.</p></section>
      <section className={styles.paper}><h2>{mistakes.length ? `${fa(mistakes.length)} نکته برای تثبیت` : 'هنوز اشتباهی برای مرور نداری'}</h2><p>پاسخ غلط وارد این فهرست می‌شود. یک پاسخ درست در مرور، نکته را برای فردا زمان‌بندی می‌کند؛ پاسخ درست در مرور روز بعد آن را از فهرست حذف می‌کند. تمرین زودتر از موعد، مرحله را جلو نمی‌برد.</p><p>{fa(due.length)} نکته آمادهٔ مرور است.</p>{mistakes.length ? <button className={styles.primary} disabled={Boolean(session && !finished)} onClick={() => begin('review')}>شروع مرور چهارگزینه‌ای</button> : <button className={styles.primary} onClick={() => session && !finished ? setScreen('quiz') : begin('test')}>{session && !finished ? 'ادامهٔ آزمون' : 'شروع آزمون درس'}</button>}{session && !finished && mistakes.length ? <p>اول آزمون ذخیره‌شده را تمام کن. <button className={styles.textButton} onClick={() => setScreen('quiz')}>ادامهٔ آزمون</button></p> : null}
      <ul className={styles.reviewList}>{mistakes.map(id => <li key={id}><span>{categories[questionMap[id].category]} · <bdi lang="en">{questionMap[id].variants[0].prompt}</bdi></span><small>{state.mistakes[id].streak ? `مرور بعد: ${date(state.mistakes[id].due)}` : 'نیاز به تمرین'}</small></li>)}</ul></section>
    </> : finished ? <>
      <section className={styles.intro}><h1 tabIndex={-1} ref={heading}>نتیجهٔ {session.mode === 'test' ? 'آزمون درس اول' : 'مرور'}</h1><p>هر سؤال فقط یک بار در نمرهٔ این نوبت حساب شده است.</p></section>
      <section className={styles.paper}><div className={styles.score}><strong>{fa(Math.round(score.correct / score.total * 100))}٪</strong><span>{fa(score.correct)} پاسخ درست از {fa(score.total)}</span></div><div className={styles.results}>{Object.entries(score.rows).map(([key, row]) => <div key={key}><span>{categories[key]}</span><strong>{fa(row.correct)} از {fa(row.total)}</strong></div>)}</div><p>این نمره مربوط به همین تمرین است و سنجش مهارت گفتاری نیست.</p><div className={styles.actions}>{mistakes.length ? <button className={styles.primary} onClick={() => begin('review')}>مرور {fa(mistakes.length)} نکته</button> : null}<button className={styles.secondary} onClick={() => begin('test')}>آزمون دوباره با ترتیب تازه</button><button className={styles.textButton} onClick={() => setScreen('lesson')}>بازگشت به درس</button></div></section>
      <section className={styles.paper}><h2>پاسخ‌ها و توضیح‌ها</h2>{session.ids.map(id => { const item = questionMap[id].variants[session.variant]; return <details className={styles.answerDetail} key={id}><summary><span>{session.answers[id] === item.answer ? 'درست' : 'نیاز به مرور'} · {categories[questionMap[id].category]}</span><span lang="en" dir="ltr">{item.prompt}</span></summary><p lang="en" dir="ltr">Your answer: {item.options[session.answers[id]]}</p><p lang="en" dir="ltr">Correct answer: {item.options[item.answer]}</p><p>{item.explanation}</p></details> })}</section>
    </> : q ? <section className={styles.exercise}>
      <div className={styles.sectionHead}><span>{session.mode === 'test' ? 'آزمون درس اول' : 'مرور اشتباهات'} · {categories[q.category]}</span><button className={styles.textButton} onClick={() => setScreen('lesson')}>بازگشت به درس</button></div>
      <progress value={session.index} max={session.ids.length} aria-label="پیشرفت آزمون" />
      <p className={styles.muted}>سؤال {fa(session.index + 1)} از {fa(session.ids.length)}</p>
      <h1 className={styles.prompt} ref={heading} tabIndex={-1} lang="en" dir="ltr">{q.prompt}</h1>
      <fieldset className={styles.options} disabled={selected !== undefined}><legend className={styles.srOnly}>یک پاسخ انتخاب کن</legend>{optionOrder(session).map((index, pos) => <button data-option={index} key={index} className={`${styles.option} ${selected !== undefined && index === q.answer ? styles.correct : ''} ${selected === index && index !== q.answer ? styles.wrong : ''}`} onClick={() => setState(p => answer(p, index))}><span className={styles.optionNumber}>{fa(pos + 1)}</span><span lang="en" dir="ltr">{q.options[index]}</span>{selected !== undefined && index === q.answer ? <small>پاسخ درست</small> : selected === index ? <small>انتخاب تو</small> : null}</button>)}</fieldset>
      {selected !== undefined ? <div className={styles.feedback} role="status"><strong>{selected === q.answer ? 'درست بود.' : 'این نکته برای مرور ذخیره شد.'}</strong><p>{q.explanation}</p><button className={styles.primary} onClick={() => setState(p => advance(p))}>{session.index + 1 === session.ids.length ? 'دیدن نتیجه' : 'سؤال بعدی'}</button></div> : <p className={styles.muted}>یک گزینه را انتخاب کن؛ پاسخ نهایی می‌شود و توضیح را می‌بینی.</p>}
      <details className={styles.textReference}><summary>دیدن متن درس بدون بولد</summary><Text plain /></details>
    </section> : <button className={styles.primary} onClick={() => setScreen('lesson')}>بازگشت به درس اول</button>}
    <footer className={styles.footer}>پیشرفت و اشتباهات در همین مرورگر ذخیره می‌شوند؛ با پاک‌کردن داده‌های مرورگر از دست می‌روند.</footer>
  </div></main>
}
