'use client'

import { useEffect, useState } from 'react'
import { courseLessons, courseUnits, courseQuestionBank, courseQuestionMap, skillLabels } from './courseContent'
import { COURSE_STORAGE_KEY, emptyCourseState, readCourseState, isLessonUnlocked, checkpointUnlocked, nextCourseStep, getDueQuestions, studyLesson, startCourseSession, answerCourseQuestion, advanceCourseSession, optionOrder, getSessionResult } from './courseEngine'
import shared from './page.module.css'
import styles from './course.module.css'

const fa = value => new Intl.NumberFormat('fa-IR').format(value)
const dateLabel = value => new Intl.DateTimeFormat('fa-IR', { timeZone: 'Europe/Berlin', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(value)
const sessionId = () => globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`

function blockingReason(state, lesson) {
  const previous = courseLessons[lesson.number - 2]
  if (!previous) return ''
  if (!state.lessons[previous.id]?.passedAt) return `اول تمرین درس «${previous.title}» را با معیار آمادگی تمام کن.`
  return 'اول مرور ترکیبی فصل قبل را با معیار آمادگی تمام کن.'
}

function SessionScreen({ state, update, leave }) {
  const session = state.session
  const question = courseQuestionMap[session.queue[session.index]]
  const lesson = courseLessons.find(l => l.id === question.lessonId)
  const correction = session.queue.indexOf(question.id) < session.index
  const answered = Object.keys(session.firstAnswers).length
  const title = session.type === 'lesson' ? courseLessons.find(l => l.id === session.targetId)?.title : session.type === 'checkpoint' ? `مرور ترکیبی: ${courseUnits.find(u => u.id === session.targetId)?.title}` : session.type === 'mistakes' ? 'تثبیت اشتباه‌ها' : 'مرورهای موعدرسیده'
  const correct = session.selected === question.answer

  return <section className={`${shared.paper} ${styles.exercise}`} aria-labelledby="exercise-title">
    <div className={shared.between}><span>{title}</span><button className={shared.textButton} onClick={leave}>ذخیره و بازگشت</button></div>
    <div className={styles.exerciseMeta}><span>نوبت {fa(session.index + 1)} از {fa(session.queue.length)}</span><span>{fa(answered)} از {fa(session.base.length)} سؤال اصلی پاسخ داده شده</span></div>
    <progress className={shared.progress} value={answered} max={session.base.length} aria-label="پیشرفت سؤال‌های اصلی این نوبت" />
    <div className={styles.skillLine}><span>{skillLabels[question.skill]}</span><span>{correction ? 'بازگشت به یک اشتباه' : `درس ${fa(lesson.number)}`}</span></div>
    <h1 id="exercise-title" className={styles.exerciseTitle}>{question.skill === 'grammar' ? 'جمله را کامل کن.' : question.skill === 'sentence' ? 'جملهٔ درست را انتخاب کن.' : 'معنی و کاربرد واژه'}</h1>
    <p className={question.lang === 'en' ? shared.englishPrompt : styles.persianPrompt} lang={question.lang} dir={question.lang === 'en' ? 'ltr' : 'rtl'}>{question.prompt}</p>
    {question.context ? <div className={styles.context}><strong lang="en" dir="ltr">{question.term}</strong><p lang="en" dir="ltr">{question.context}</p></div> : null}
    <fieldset className={styles.fourOptions} disabled={session.feedback}>
      <legend className={shared.srOnly}>چهار گزینهٔ پاسخ</legend>
      {optionOrder(question, session).map((index, position) => <button type="button" key={index} data-choice={index} className={`${styles.option} ${session.feedback && index === question.answer ? styles.correctOption : ''} ${session.feedback && index === session.selected && !correct ? styles.wrongOption : ''}`} onClick={() => update(p => answerCourseQuestion(p, index))} aria-label={`${fa(position + 1)}. ${question.options[index]}`}>
        <span className={styles.optionNumber} aria-hidden="true">{fa(position + 1)}</span><span lang={question.optionsLang} dir={question.optionsLang === 'en' ? 'ltr' : 'rtl'}>{question.options[index]}</span>{session.feedback && index === question.answer ? <small>پاسخ درست</small> : null}
      </button>)}
    </fieldset>
    {session.feedback ? <div className={`${shared.feedback} ${!correct ? styles.mistakeFeedback : ''}`} role="status">
      <strong>{correct ? 'درست بود.' : 'این نکته را مرور کنیم.'}</strong><p>{question.explanation}</p>
      {!correct ? <p className={styles.retryNote}>{session.retryScheduled.includes(question.id) && !correction ? 'بعد از چند سؤال دیگر، همین نکته دوباره می‌آید. نمرهٔ نوبت اصلی با این تکرار تغییر نمی‌کند.' : 'این سؤال برای مرور کوتاه دوباره زمان‌بندی شد. با پاسخ درستِ فوری، مرحلهٔ مرور جلو نمی‌رود.'}</p> : null}
      <button className={shared.primary} onClick={() => { update(p => advanceCourseSession(p)); window.scrollTo({ top: 0, behavior: 'instant' }) }}>{session.index === session.queue.length - 1 ? 'دیدن نتیجهٔ این نوبت' : 'سؤال بعدی'}</button>
    </div> : <p className={shared.small}>یک گزینه را انتخاب کن؛ بعد از پاسخ، توضیح را می‌بینی.</p>}
  </section>
}

function Summary({ state, begin, openNext, showMap }) {
  const session = state.session
  const result = getSessionResult(session)
  const gate = session.type === 'lesson' || session.type === 'checkpoint'
  const wrong = session.base.filter(id => session.firstAnswers[id] === false)
  return <>
    <div className={shared.sectionTitle}><h1>{gate ? result.passed ? 'این مرحله را با آمادگی گذراندی.' : 'این مرحله به تمرین بیشتری نیاز دارد.' : 'این نوبت مرور تمام شد.'}</h1><p>نمره از اولین پاسخ به هر سؤال در همین نوبت محاسبه شده است؛ پاسخ‌های تکراری آن را بالا نمی‌برند.</p></div>
    <section className={shared.paper}>
      <div className={styles.summaryScore}><strong>{fa(result.percent)}٪</strong><span>{fa(result.correct)} پاسخ درست از {fa(result.total)} سؤال اصلی</span></div>
      <div className={styles.skillScores}>{result.rows.map(r => <div key={r.skill}><strong>{skillLabels[r.skill]}</strong><span>{fa(r.correct)} از {fa(r.total)}</span></div>)}</div>
      <p className={shared.small}>معیار آمادگی: حداقل ۸۵٪ کل و حداقل ۷۵٪ در هر مهارت. این معیار برای پیشروی در دوره است؛ تسلط ماندگار با مرورهای روزهای بعد دنبال می‌شود.</p>
      <p className={shared.small}>{fa(result.corrections)} سؤالِ اصلاحی به این نوبت اضافه شد. سؤال‌های نیازمند مرور در صف ذخیره شده‌اند.</p>
      <div className={shared.actions}>{gate && result.passed ? <button className={shared.primary} onClick={openNext}>قدم بعدی دوره</button> : <button className={shared.primary} onClick={() => begin(session.type, session.targetId, true)}>{gate ? 'یک نوبت دیگر از همین مرحله' : 'ادامهٔ مرورهای باقی‌مانده'}</button>}<button className={shared.secondary} onClick={showMap}>بازگشت به مسیر</button></div>
    </section>
    {wrong.length ? <section className={shared.paper}><h2>نکته‌هایی که در نوبت اصلی اشتباه شد</h2>{wrong.map(id => {
      const q = courseQuestionMap[id]
      return <details className={shared.answerDetail} key={id}><summary>{skillLabels[q.skill]} · درس {fa(courseLessons.find(l => l.id === q.lessonId).number)}</summary><p lang={q.lang} dir={q.lang === 'en' ? 'ltr' : 'rtl'} className={q.lang === 'en' ? shared.englishPrompt : ''}>{q.prompt}</p><p lang={q.optionsLang} dir={q.optionsLang === 'en' ? 'ltr' : 'rtl'} className={styles.correctAnswer}>{q.options[q.answer]}</p><p>{q.explanation}</p></details>
    })}</section> : null}
  </>
}

export default function CourseApp({ mode = 'course', diagnostic, speak }) {
  const [state, setState] = useState(emptyCourseState)
  const [loaded, setLoaded] = useState(false)
  const [storageError, setStorageError] = useState('')
  const [screen, setScreen] = useState('map')
  const [lessonId, setLessonId] = useState(null)
  const [notice, setNotice] = useState('')
  const [now, setNow] = useState(0)

  useEffect(() => {
    try { const raw = localStorage.getItem(COURSE_STORAGE_KEY); if (raw) setState(readCourseState(JSON.parse(raw))) }
    catch { setStorageError('پیشرفت دوره خوانده نشد؛ ذخیره‌سازی مرورگر را بررسی کن.') }
    setNow(Date.now())
    setLoaded(true)
    const timer = setInterval(() => setNow(Date.now()), 30000)
    return () => clearInterval(timer)
  }, [])
  useEffect(() => {
    if (!loaded) return
    try { localStorage.setItem(COURSE_STORAGE_KEY, JSON.stringify(state)) }
    catch { setStorageError('ذخیرهٔ پیشرفت دوره ممکن نشد؛ فضای ذخیره‌سازی مرورگر را بررسی کن.') }
  }, [state, loaded])
  useEffect(() => { setScreen('map'); setNotice('') }, [mode])

  if (!loaded) return <p role="status" className={shared.loading}>در حال آماده‌سازی مسیر درس‌ها…</p>
  const next = nextCourseStep(state)
  const nextLesson = courseLessons.find(l => l.id === next.id)
  const nextUnit = courseUnits.find(u => u.id === next.id)
  const lesson = courseLessons.find(l => l.id === lessonId)
  const due = getDueQuestions(state, now)
  const mistakes = getDueQuestions(state, now, true)
  const completed = courseLessons.filter(l => state.lessons[l.id]?.passedAt).length
  const upcoming = Object.values(state.cards).filter(card => card.due > now).sort((a, b) => a.due - b.due)[0]
  const weakTargets = diagnostic?.submittedAt ? [
    diagnostic.answers.since !== 1 && 'since-for', diagnostic.answers.gerund !== 1 && 'verb-forms', diagnostic.answers.modal !== 2 && 'necessity', diagnostic.answers.future !== 0 && 'future-perfect', diagnostic.answers.raise !== 2 && 'indirect',
  ].filter(Boolean) : []

  function openLesson(id) { setLessonId(id); setScreen('lesson'); setNotice(''); window.scrollTo({ top: 0, behavior: 'instant' }) }
  function begin(type, targetId = null, replaceComplete = false) {
    const starting = replaceComplete && state.session?.status === 'complete' ? { ...state, session: null } : state
    const updated = startCourseSession(starting, { type, targetId, id: sessionId() })
    if (updated === starting && starting.session?.status !== 'active') { setNotice(type === 'lesson' ? 'ابتدا آموزش این درس و پیش‌نیازهایش را کامل کن.' : 'برای این بخش سؤال آماده‌ای وجود ندارد.'); setScreen('map'); return }
    setState(updated)
    setScreen('session')
    setNotice('')
    window.scrollTo({ top: 0, behavior: 'instant' })
  }
  function openNext() {
    if (next.type === 'lesson') openLesson(next.id)
    else if (next.type === 'checkpoint') begin('checkpoint', next.id, true)
    else { setScreen('map'); setNotice('درس‌ها و مرورهای ترکیبی دوره تکمیل شده‌اند. مرورهای فاصله‌دار را ادامه بده.') }
  }
  function studyAndBegin() {
    const starting = studyLesson(state, lesson.id)
    const updated = startCourseSession(starting, { type: 'lesson', targetId: lesson.id, id: sessionId() })
    setState(updated)
    if (updated.session?.status === 'active') setScreen('session')
    window.scrollTo({ top: 0, behavior: 'instant' })
  }
  const activeBanner = state.session?.status === 'active' ? <aside className={styles.resume}><div><strong>یک نوبت نیمه‌تمام داری.</strong><p>{fa(Object.keys(state.session.firstAnswers).length)} سؤال اصلی پاسخ داده شده؛ می‌توانی از همان‌جا ادامه بدهی.</p></div><div className={shared.actions}><button className={shared.primary} onClick={() => setScreen('session')}>ادامهٔ نوبت</button><button className={shared.textButton} onClick={() => setState(p => ({ ...p, session: null }))}>بستن نوبت؛ پاسخ‌ها می‌مانند</button></div></aside> : null

  return <div className={styles.course}>
    {storageError ? <p className={shared.error} role="alert">{storageError}</p> : null}
    {notice ? <p className={shared.feedback} role="status">{notice}</p> : null}
    {screen === 'session' && state.session ? state.session.status === 'active' ? <SessionScreen state={state} update={setState} leave={() => setScreen('map')} /> : <Summary state={state} begin={begin} openNext={openNext} showMap={() => setScreen('map')} /> : screen === 'lesson' && lesson ? <>
      <button className={shared.textButton} onClick={() => setScreen('map')}>بازگشت به مسیر درس‌ها</button>
      <div className={shared.sectionTitle}><p>درس {fa(lesson.number)} · {courseUnits.find(u => u.id === lesson.unit).title}</p><h1>{lesson.title}</h1><p>{lesson.goal}</p></div>
      {activeBanner}
      <section className={shared.paper}><h2>الگوی اصلی این درس</h2><p className={styles.rule}>{lesson.rule}</p><p className={`${shared.englishPrompt} ${styles.pattern}`} lang="en" dir="ltr">{lesson.pattern}</p>{lesson.note ? <p className={shared.small}>{lesson.note}</p> : null}<div className={styles.examples}>{lesson.examples.map(([en, translation]) => <div key={en}><p lang="en" dir="ltr">{en}</p><span>{translation}</span><button className={shared.textButton} onClick={() => speak(en)} aria-label={`شنیدن جمله: ${en}`}>شنیدن جمله</button></div>)}</div></section>
      <section className={shared.paper}><h2>۴ واژه و عبارت در همین درس</h2><div className={styles.wordList}>{lesson.words.map(word => <div key={word.term}><div className={shared.between}><strong lang="en" dir="ltr">{word.term}</strong><span>{word.meaning}</span></div><p lang="en" dir="ltr">{word.example}</p><button className={shared.textButton} onClick={() => speak(word.example)} aria-label={`شنیدن مثال: ${word.term}`}>شنیدن مثال</button></div>)}</div></section>
      <section className={`${shared.paper} ${styles.lessonStart}`}><h2>حالا ۲۰ تمرین، قدم‌به‌قدم.</h2><p>۶ سؤال گرامر، ۶ سؤال انتخاب جمله و ۸ سؤال واژگان. بعد از هر پاسخ، توضیح را می‌بینی؛ اشتباه‌ها برای تمرین دوباره ذخیره می‌شوند.</p><p className={shared.small}>برای ورود به مرحلهٔ بعد: حداقل ۱۷ پاسخ درست از ۲۰، با حداقل ۵ از ۶ در گرامر، ۵ از ۶ در جمله‌سازی و ۶ از ۸ در واژگان.</p>{isLessonUnlocked(state, lesson.id) ? <button className={shared.primary} disabled={Boolean(state.session?.status === 'active')} onClick={studyAndBegin}>آموزش را خواندم؛ شروع ۲۰ تمرین</button> : <p className={shared.feedback}>{blockingReason(state, lesson)}</p>}</section>
    </> : <>
      <div className={shared.sectionTitle}><h1>{mode === 'review' ? 'مرور، بر اساس پاسخ‌های تو.' : 'مسیر درس‌به‌درس تو'}</h1><p>{mode === 'review' ? 'سؤال‌های موعدرسیده و نکته‌های اشتباه را در نوبت‌های کوتاه تمرین کن.' : 'هر درس: آموزش کوتاه، واژه در جمله، ۲۰ تمرین چهارگزینه‌ای و مرور هدفمند.'}</p></div>
      {activeBanner}
      {mode === 'review' ? <>
        <div className={styles.reviewGrid}><section className={shared.paper}><h2>مرورهای موعدرسیده</h2><strong className={styles.bigCount}>{fa(due.length)}</strong><p>در هر نوبت حداکثر ۲۰ سؤال؛ اشتباه‌ها و مرورهای عقب‌افتاده اولویت دارند.</p><button className={shared.primary} disabled={!due.length || state.session?.status === 'active'} onClick={() => begin('review')}>شروع مرور موعدرسیده</button>{!due.length ? <p className={shared.small}>{upcoming ? `مرور بعدی: ${dateLabel(upcoming.due)}` : 'با شروع درس اول، سؤال‌ها وارد برنامهٔ مرور می‌شوند.'}</p> : null}</section><section className={shared.paper}><h2>نکته‌های در حال تثبیت</h2><strong className={styles.bigCount}>{fa(mistakes.length)}</strong><p>سؤال‌هایی که اشتباه شده‌اند و هنوز مرور فاصله‌دار موفقی نداشته‌اند.</p><button className={shared.secondary} disabled={!mistakes.length || state.session?.status === 'active'} onClick={() => begin('mistakes')}>تمرین اضافهٔ اشتباه‌ها</button><p className={shared.small}>تمرین زودتر از موعد مجاز است؛ مرحلهٔ مرور با آن جلو نمی‌رود.</p></section></div>
        <section className={shared.paper}><h2>برنامهٔ مرور چطور کار می‌کند؟</h2><ol className={styles.method}><li>پاسخ اشتباه: بازگشت به مرور کوتاه، ۱۰ دقیقه بعد.</li><li>پاسخ درست در موعد مرور: فاصله به ۱، ۳، ۷، ۱۴ و سپس ۳۰ روز می‌رسد.</li><li>پاسخ درستِ فوری یا تمرین زودتر از موعد، فاصله را جلو نمی‌برد.</li><li>اشتباه در هر مرحله، همان سؤال را دوباره به مرور کوتاه برمی‌گرداند.</li></ol><p className={shared.small}>این فاصله‌ها قواعد فعلی برنامه‌اند. آمادگی در تست با توانایی مکالمه یکی نیست.</p></section>
        {due.length ? <section className={shared.paper}><h2>چه چیزهایی در صف‌اند؟</h2><ul className={shared.topicList}>{courseLessons.filter(l => due.some(q => q.lessonId === l.id)).map(l => <li key={l.id}><strong>{l.title}</strong><span>{fa(due.filter(q => q.lessonId === l.id).length)} سؤال</span></li>)}</ul></section> : null}
      </> : <>
        <div className={shared.startGrid}><section className={shared.startPanel}><p className={shared.stepLabel}>قدم بعدی تو</p><h2>{nextLesson ? `درس ${fa(nextLesson.number)}: ${nextLesson.title}` : nextUnit ? `مرور ترکیبی: ${nextUnit.title}` : 'ادامهٔ مرورهای فاصله‌دار'}</h2><p>{nextLesson?.goal || (nextUnit ? 'نکته‌های سه درس را کنار هم و بدون راهنمای الگو تمرین کن.' : 'سؤال‌ها بر اساس زمان مرور و پاسخ‌هایت برمی‌گردند.')}</p><button className={shared.whiteButton} onClick={openNext}>{nextLesson ? 'باز کردن درس' : nextUnit ? 'شروع مرور فصل' : 'دیدن مسیر تکمیل‌شده'}</button><p className={shared.panelNote}>{fa(completed)} از {fa(courseLessons.length)} درس آمادهٔ مرحلهٔ بعد</p></section><aside className={`${shared.pathPanel} ${styles.courseOverview}`}><h2>ساختار دوره</h2><div><strong>{fa(courseLessons.length)}</strong><span>درس در ۶ فصل</span></div><div><strong>{fa(courseQuestionBank.length)}</strong><span>تمرین چهارگزینه‌ای</span></div><div><strong>{fa(due.length)}</strong><span>سؤال برای مرورِ موعدرسیده</span></div><p>نوبت‌ها بدون محدودیت قابل تکرارند.</p></aside></div>
        {weakTargets.length ? <p className={styles.diagnosticNote}>با توجه به آزمونت، درس‌های زمان‌ها، شکل فعل بعد از عبارت‌ها و ضرورت، برایت اولویت مرور دارند. مسیر از قالب جمله شروع می‌شود و مرحله‌به‌مرحله به آن‌ها می‌رسد.</p> : null}
        <section className={styles.methodStrip} aria-label="چرخهٔ هر درس"><span>۱. آموزش کوتاه</span><span>۲. تمرین ترکیبی</span><span>۳. اصلاح اشتباه</span><span>۴. مرور در روزهای بعد</span></section>
        {courseUnits.map((unit, index) => <section key={unit.id} className={styles.unit} aria-labelledby={`unit-${unit.id}`}><div className={styles.unitHeading}><span>{fa(index + 1)}</span><div><h2 id={`unit-${unit.id}`}>{unit.title}</h2><p>{unit.description}</p></div></div><div className={styles.lessonList}>{courseLessons.filter(l => l.unit === unit.id).map(l => {
          const entry = state.lessons[l.id]
          const unlocked = isLessonUnlocked(state, l.id)
          return <button key={l.id} className={`${styles.lessonRow} ${!unlocked ? styles.lockedLesson : ''}`} onClick={() => openLesson(l.id)} aria-label={`درس ${fa(l.number)}: ${l.title}`}><span className={styles.lessonNumber}>{fa(l.number)}</span><span className={styles.lessonCopy}><strong>{l.title}</strong><span>{l.goal}</span>{weakTargets.includes(l.id) ? <small>نکتهٔ نیازمند تمرین در تعیین سطح تو</small> : null}</span><span className={styles.lessonStatus}>{entry?.passedAt ? 'آمادهٔ مرحلهٔ بعد' : !unlocked ? 'پیش‌نمایش درس' : entry?.rounds ? 'تمرین بیشتر' : entry?.studiedAt ? 'مطالعه‌شده' : 'شروع درس'}{entry?.rounds ? <small>نوبت آخر: {fa(entry.lastScore)}٪</small> : null}</span></button>
        })}</div><div className={styles.checkpoint}><div><strong>مرور ترکیبی فصل</strong><p>۱۸ سؤال از سه درس · حداقل ۸۵٪ کل و ۷۵٪ در هر مهارت</p></div><button className={shared.secondary} disabled={!checkpointUnlocked(state, unit.id) || state.session?.status === 'active'} onClick={() => begin('checkpoint', unit.id)}>{state.checkpoints[unit.id]?.passedAt ? 'مرور دوبارهٔ فصل' : 'شروع مرور فصل'}</button></div></section>)}
      </>}
    </>}
  </div>
}
