'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import styles from './page.module.css'

const emptyQuestion = () => ({ sourceId: '', sourceLabel: '', prompt: '', options: ['', '', '', ''], correctOptionIndex: 0, points: 1 })

function isBlankQuestion(question) {
  return !question?.prompt && question?.options?.every(option => !option)
}

function statusLabel(status) {
  return status === 'published' ? 'فعال' : status === 'closed' ? 'بسته' : 'پیش‌نویس'
}

function formatDate(value) {
  if (!value) return '—'
  return new Intl.DateTimeFormat('fa-IR', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value))
}

async function readJson(response) {
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.error || 'خطایی رخ داد.')
  return data
}

export default function ExamAdminClient() {
  const [exams, setExams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [view, setView] = useState('list')
  const [detail, setDetail] = useState(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [expandedAttempt, setExpandedAttempt] = useState('')
  const [saving, setSaving] = useState(false)
  const [createdLink, setCreatedLink] = useState('')
  const [copied, setCopied] = useState('')
  const [questionBank, setQuestionBank] = useState([])
  const [bankLoaded, setBankLoaded] = useState(false)
  const [bankLoading, setBankLoading] = useState(false)
  const [bankSearch, setBankSearch] = useState('')
  const [bankTopic, setBankTopic] = useState('all')
  const [selectedBankIds, setSelectedBankIds] = useState([])
  const [form, setForm] = useState({
    title: '', description: '', durationMinutes: 30, passPercent: 60,
    showResult: true, publishNow: true, questions: [emptyQuestion()],
  })

  const loadExams = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await readJson(await fetch('/api/admin/exams', { cache: 'no-store' }))
      setExams(data.exams || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { loadExams() }, [loadExams])

  const loadQuestionBank = useCallback(async () => {
    if (bankLoaded || bankLoading) return
    setBankLoading(true)
    setError('')
    try {
      const data = await readJson(await fetch('/api/admin/exams?resource=question-bank', { cache: 'no-store' }))
      setQuestionBank(data.questions || [])
      setBankLoaded(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setBankLoading(false)
    }
  }, [bankLoaded, bankLoading])

  const stats = useMemo(() => ({
    total: exams.length,
    active: exams.filter(exam => exam.status === 'published').length,
    attempts: exams.reduce((sum, exam) => sum + Number(exam.attempt_count || 0), 0),
  }), [exams])

  const bankTopics = useMemo(() => {
    const topics = new Map()
    for (const question of questionBank) topics.set(question.themaId, question.topic)
    return [...topics.entries()].sort((a, b) => a[1].localeCompare(b[1], 'fa'))
  }, [questionBank])

  const filteredBank = useMemo(() => {
    const query = bankSearch.trim().toLocaleLowerCase('fa')
    const matches = questionBank.filter(question => (
      (bankTopic === 'all' || question.themaId === bankTopic)
      && (!query || `${question.prompt} ${question.topic}`.toLocaleLowerCase('fa').includes(query))
    ))
    return { total: matches.length, items: matches.slice(0, 60) }
  }, [bankSearch, bankTopic, questionBank])

  function setField(field, value) {
    setForm(current => ({ ...current, [field]: value }))
  }

  function updateQuestion(index, patch) {
    setForm(current => ({
      ...current,
      questions: current.questions.map((question, questionIndex) => questionIndex === index
        ? { ...question, ...patch }
        : question),
    }))
  }

  function updateOption(questionIndex, optionIndex, value) {
    setForm(current => ({
      ...current,
      questions: current.questions.map((question, index) => index === questionIndex
        ? { ...question, options: question.options.map((option, currentOption) => currentOption === optionIndex ? value : option) }
        : question),
    }))
  }

  function removeQuestion(index) {
    setForm(current => ({ ...current, questions: current.questions.filter((_, questionIndex) => questionIndex !== index) }))
  }

  function openCreate() {
    setView('create')
    setCreatedLink('')
    setError('')
    loadQuestionBank()
  }

  function toggleBankQuestion(questionId) {
    setSelectedBankIds(current => current.includes(questionId)
      ? current.filter(id => id !== questionId)
      : [...current, questionId])
  }

  function addSelectedBankQuestions() {
    if (!selectedBankIds.length) return
    const selected = new Set(selectedBankIds)
    setForm(current => {
      const existingSourceIds = new Set(current.questions.map(question => question.sourceId).filter(Boolean))
      const imported = questionBank
        .filter(question => selected.has(question.id) && !existingSourceIds.has(question.id))
        .map(question => ({
          sourceId: question.id,
          sourceLabel: question.topic,
          prompt: question.prompt,
          options: [...question.options],
          correctOptionIndex: question.correctOptionIndex,
          points: question.points,
        }))
      const currentQuestions = current.questions.length === 1 && isBlankQuestion(current.questions[0])
        ? []
        : current.questions
      return { ...current, questions: [...currentQuestions, ...imported] }
    })
    setSelectedBankIds([])
  }

  async function submitExam(event) {
    event.preventDefault()
    setSaving(true)
    setError('')
    try {
      const data = await readJson(await fetch('/api/admin/exams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      }))
      const link = `${window.location.origin}${data.sharePath}`
      setCreatedLink(link)
      setForm({
        title: '', description: '', durationMinutes: 30, passPercent: 60,
        showResult: true, publishNow: true, questions: [emptyQuestion()],
      })
      await loadExams()
      setView('list')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  async function openDetail(examId) {
    setView('detail')
    setDetailLoading(true)
    setExpandedAttempt('')
    setError('')
    try {
      const data = await readJson(await fetch(`/api/admin/exams?id=${encodeURIComponent(examId)}`, { cache: 'no-store' }))
      setDetail(data)
    } catch (err) {
      setError(err.message)
      setView('list')
    } finally {
      setDetailLoading(false)
    }
  }

  async function changeStatus(action) {
    if (!detail?.exam) return
    setSaving(true)
    setError('')
    try {
      await readJson(await fetch('/api/admin/exams', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: detail.exam.id, action }),
      }))
      await Promise.all([loadExams(), openDetail(detail.exam.id)])
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  async function copyLink(value) {
    await navigator.clipboard.writeText(value)
    setCopied(value)
    window.setTimeout(() => setCopied(''), 1800)
  }

  const shareLink = detail?.exam && typeof window !== 'undefined'
    ? `${window.location.origin}/exam/${detail.exam.public_code}`
    : ''

  return (
    <main className={styles.page} dir="rtl">
      <div className={styles.shell}>
        <header className={styles.hero}>
          <div>
            <span className={styles.eyebrow}>RADYAR EXAMS</span>
            <h1>مرکز مدیریت امتحان</h1>
            <p>امتحان بسازید، لینک را ارسال کنید و نتیجه‌ها را یک‌جا ببینید.</p>
          </div>
          <button type="button" className={styles.primaryButton} onClick={openCreate}>
            <span aria-hidden="true">＋</span> ساخت امتحان جدید
          </button>
        </header>

        {error ? <div className={styles.error} role="alert">{error}</div> : null}

        {createdLink ? (
          <section className={styles.successCard} aria-live="polite">
            <div><strong>امتحان ساخته شد.</strong><span>این لینک را برای شرکت‌کنندگان بفرستید.</span></div>
            <div className={styles.shareRow} dir="ltr">
              <input value={createdLink} readOnly aria-label="لینک امتحان" />
              <button type="button" onClick={() => copyLink(createdLink)}>{copied === createdLink ? 'کپی شد ✓' : 'کپی لینک'}</button>
            </div>
          </section>
        ) : null}

        {view === 'list' ? (
          <>
            <section className={styles.stats} aria-label="آمار امتحان‌ها">
              <article><span>کل امتحان‌ها</span><strong>{stats.total.toLocaleString('fa-IR')}</strong></article>
              <article><span>امتحان فعال</span><strong>{stats.active.toLocaleString('fa-IR')}</strong></article>
              <article><span>پاسخ ثبت‌شده</span><strong>{stats.attempts.toLocaleString('fa-IR')}</strong></article>
            </section>

            <section className={styles.panel}>
              <div className={styles.panelHeader}>
                <div><h2>امتحان‌های من</h2><p>برای دیدن نمره‌ها روی هر امتحان بزنید.</p></div>
                <button type="button" className={styles.refreshButton} onClick={loadExams} disabled={loading}>به‌روزرسانی</button>
              </div>
              {loading ? <div className={styles.empty}>در حال بارگذاری…</div> : exams.length === 0 ? (
                <div className={styles.empty}><strong>هنوز امتحانی نساخته‌اید.</strong><span>با دکمه «ساخت امتحان جدید» شروع کنید.</span></div>
              ) : (
                <div className={styles.examGrid}>
                  {exams.map(exam => (
                    <button type="button" className={styles.examCard} key={exam.id} onClick={() => openDetail(exam.id)}>
                      <div className={styles.examCardTop}>
                        <span className={`${styles.status} ${styles[`status_${exam.status}`]}`}>{statusLabel(exam.status)}</span>
                        <span className={styles.date}>{formatDate(exam.created_at)}</span>
                      </div>
                      <h3>{exam.title}</h3>
                      <p>{exam.description || 'بدون توضیح'}</p>
                      <div className={styles.examMeta}>
                        <span>{exam.duration_minutes.toLocaleString('fa-IR')} دقیقه</span>
                        <span>حد قبولی {exam.pass_percent.toLocaleString('fa-IR')}٪</span>
                        <strong>{Number(exam.attempt_count || 0).toLocaleString('fa-IR')} نتیجه</strong>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </section>
          </>
        ) : null}

        {view === 'create' ? (
          <form className={styles.builder} onSubmit={submitExam}>
            <div className={styles.builderHeader}>
              <div><span className={styles.step}>مرحله ۱ از ۱</span><h2>ساخت امتحان جدید</h2></div>
              <button type="button" className={styles.textButton} onClick={() => setView('list')}>بازگشت به فهرست</button>
            </div>

            <section className={styles.formSection}>
              <h3>مشخصات امتحان</h3>
              <div className={styles.fieldGrid}>
                <label className={styles.wideField}><span>عنوان امتحان</span><input required minLength={3} maxLength={160} value={form.title} onChange={event => setField('title', event.target.value)} placeholder="مثلاً آزمون مقدماتی رادیولوژی" /></label>
                <label className={styles.wideField}><span>توضیح کوتاه</span><textarea maxLength={3000} value={form.description} onChange={event => setField('description', event.target.value)} placeholder="توضیحات و نکات لازم برای شرکت‌کنندگان" /></label>
                <label><span>زمان امتحان (دقیقه) *</span><input type="number" required min="1" max="240" value={form.durationMinutes} onChange={event => setField('durationMinutes', Number(event.target.value))} /></label>
                <label><span>حد قبولی (درصد)</span><input type="number" min="0" max="100" value={form.passPercent} onChange={event => setField('passPercent', Number(event.target.value))} /></label>
              </div>
              <div className={styles.checks}>
                <label><input type="checkbox" checked={form.showResult} onChange={event => setField('showResult', event.target.checked)} /><span>نمره بعد از ارسال به شرکت‌کننده نشان داده شود</span></label>
                <label><input type="checkbox" checked={form.publishNow} onChange={event => setField('publishNow', event.target.checked)} /><span>بعد از ساخت، امتحان فوراً فعال شود</span></label>
              </div>
            </section>

            <section className={styles.formSection}>
              <div className={styles.bankHeader}>
                <div><h3>انتخاب از بانک سؤال رادیار</h3><p>سؤال‌های موجود را جست‌وجو و به امتحان اضافه کنید؛ یا پایین‌تر سؤال جدید بسازید.</p></div>
                <span>{questionBank.length.toLocaleString('fa-IR')} سؤال موجود</span>
              </div>
              <div className={styles.bankToolbar}>
                <label><span>جست‌وجوی سؤال</span><input type="search" value={bankSearch} onChange={event => setBankSearch(event.target.value)} placeholder="مثلاً MRI، خونریزی یا منیسک…" /></label>
                <label><span>موضوع</span><select value={bankTopic} onChange={event => setBankTopic(event.target.value)}><option value="all">همه موضوع‌ها</option>{bankTopics.map(([id, title]) => <option value={id} key={id}>{title}</option>)}</select></label>
              </div>
              {bankLoading ? <div className={styles.bankEmpty}>در حال بارگذاری بانک سؤال…</div> : questionBank.length === 0 ? (
                <div className={styles.bankEmpty}>سؤالی در بانک پیدا نشد؛ می‌توانید سؤال جدید را به‌صورت دستی بسازید.</div>
              ) : (
                <>
                  <div className={styles.bankList}>
                    {filteredBank.items.map(question => {
                      const checked = selectedBankIds.includes(question.id)
                      return <label className={checked ? styles.bankItemSelected : styles.bankItem} key={question.id}>
                        <input type="checkbox" checked={checked} onChange={() => toggleBankQuestion(question.id)} />
                        <span><strong>{question.prompt}</strong><small>{question.topic} · {question.options.join(' / ')}</small></span>
                      </label>
                    })}
                  </div>
                  <div className={styles.bankActions}>
                    <span>{filteredBank.total.toLocaleString('fa-IR')} نتیجه{filteredBank.total > 60 ? ' · ۶۰ مورد اول نمایش داده شده' : ''}</span>
                    <button type="button" onClick={addSelectedBankQuestions} disabled={!selectedBankIds.length}>افزودن {selectedBankIds.length.toLocaleString('fa-IR')} سؤال انتخاب‌شده</button>
                  </div>
                </>
              )}
            </section>

            <section className={styles.formSection}>
              <div className={styles.questionsHeader}><div><h3>سؤال‌ها</h3><p>گزینه درست را با دایره کنار آن مشخص کنید.</p></div><span>{form.questions.length.toLocaleString('fa-IR')} سؤال</span></div>
              <div className={styles.questionList}>
                {form.questions.map((question, questionIndex) => (
                  <article className={styles.questionCard} key={questionIndex}>
                    <div className={styles.questionHeader}>
                      <strong>سؤال {Number(questionIndex + 1).toLocaleString('fa-IR')}{question.sourceLabel ? <small>از بانک: {question.sourceLabel}</small> : <small>سؤال جدید</small>}</strong>
                      {form.questions.length > 1 ? <button type="button" onClick={() => removeQuestion(questionIndex)}>حذف سؤال</button> : null}
                    </div>
                    <label className={styles.promptField}><span>متن سؤال</span><textarea required minLength={3} maxLength={4000} value={question.prompt} onChange={event => updateQuestion(questionIndex, { prompt: event.target.value })} placeholder="متن سؤال را اینجا بنویسید…" /></label>
                    <div className={styles.options}>
                      {question.options.map((option, optionIndex) => (
                        <label className={question.correctOptionIndex === optionIndex ? styles.correctOption : styles.option} key={optionIndex}>
                          <input type="radio" name={`correct-${questionIndex}`} checked={question.correctOptionIndex === optionIndex} onChange={() => updateQuestion(questionIndex, { correctOptionIndex: optionIndex })} aria-label={`گزینه درست سؤال ${questionIndex + 1}`} />
                          <span>{String.fromCharCode(65 + optionIndex)}</span>
                          <input required maxLength={1200} value={option} onChange={event => updateOption(questionIndex, optionIndex, event.target.value)} placeholder={`گزینه ${Number(optionIndex + 1).toLocaleString('fa-IR')}`} />
                        </label>
                      ))}
                    </div>
                    <label className={styles.points}><span>امتیاز این سؤال</span><input type="number" min="1" max="100" value={question.points} onChange={event => updateQuestion(questionIndex, { points: Number(event.target.value) })} /></label>
                  </article>
                ))}
              </div>
              <button type="button" className={styles.addQuestion} onClick={() => setForm(current => ({ ...current, questions: [...current.questions, emptyQuestion()] }))}>＋ ساخت سؤال جدید</button>
            </section>

            <div className={styles.formActions}>
              <button type="button" className={styles.secondaryButton} onClick={() => setView('list')}>انصراف</button>
              <button type="submit" className={styles.primaryButton} disabled={saving}>{saving ? 'در حال ساخت…' : 'ساخت امتحان و دریافت لینک'}</button>
            </div>
          </form>
        ) : null}

        {view === 'detail' ? (
          detailLoading || !detail ? <div className={styles.panel}><div className={styles.empty}>در حال بارگذاری نتیجه‌ها…</div></div> : (
            <section className={styles.detail}>
              <div className={styles.detailHeader}>
                <button type="button" className={styles.textButton} onClick={() => setView('list')}>→ بازگشت</button>
                <div className={styles.detailTitle}><div><span className={`${styles.status} ${styles[`status_${detail.exam.status}`]}`}>{statusLabel(detail.exam.status)}</span><h2>{detail.exam.title}</h2><p>{detail.exam.description}</p></div>
                  <button type="button" className={detail.exam.status === 'published' ? styles.dangerButton : styles.primaryButton} disabled={saving} onClick={() => changeStatus(detail.exam.status === 'published' ? 'close' : 'reopen')}>
                    {detail.exam.status === 'published' ? 'بستن امتحان' : 'فعال‌کردن امتحان'}
                  </button>
                </div>
              </div>

              <div className={styles.shareCard}>
                <div><strong>لینک شرکت در امتحان</strong><span>{detail.questions.length.toLocaleString('fa-IR')} سؤال · {detail.exam.duration_minutes.toLocaleString('fa-IR')} دقیقه</span></div>
                <div className={styles.shareRow} dir="ltr"><input value={shareLink} readOnly /><Link href={`/exam/${detail.exam.public_code}`} target="_blank">بازکردن</Link><button type="button" onClick={() => copyLink(shareLink)}>{copied === shareLink ? 'کپی شد ✓' : 'کپی'}</button></div>
              </div>

              <div className={styles.resultSummary}>
                <article><span>شرکت‌کننده</span><strong>{detail.attempts.length.toLocaleString('fa-IR')}</strong></article>
                <article><span>قبول‌شده</span><strong>{detail.attempts.filter(item => item.passed).length.toLocaleString('fa-IR')}</strong></article>
                <article><span>میانگین</span><strong>{detail.attempts.length ? `${Math.round(detail.attempts.reduce((sum, item) => sum + Number(item.percentage), 0) / detail.attempts.length).toLocaleString('fa-IR')}٪` : '—'}</strong></article>
              </div>

              <section className={styles.panel}>
                <div className={styles.panelHeader}><div><h2>نتیجه شرکت‌کنندگان</h2><p>برای دیدن پاسخ‌ها، ردیف هر نفر را باز کنید.</p></div></div>
                {detail.attempts.length === 0 ? <div className={styles.empty}>هنوز پاسخی ثبت نشده است.</div> : (
                  <div className={styles.resultsList}>
                    {detail.attempts.map(attempt => {
                      const isOpen = expandedAttempt === attempt.id
                      return <article className={styles.attempt} key={attempt.id}>
                        <button type="button" className={styles.attemptRow} onClick={() => setExpandedAttempt(isOpen ? '' : attempt.id)}>
                          <span className={styles.person}><strong>{attempt.participant_name}</strong><small>{attempt.participant_email || 'بدون ایمیل'}</small></span>
                          <span><small>نمره</small><strong>{attempt.score.toLocaleString('fa-IR')} از {attempt.max_score.toLocaleString('fa-IR')}</strong></span>
                          <span><small>درصد</small><strong>{Number(attempt.percentage).toLocaleString('fa-IR')}٪</strong></span>
                          <span className={attempt.passed ? styles.passed : styles.failed}>{attempt.passed ? 'قبول' : 'رد'}</span>
                          <span className={styles.submitted}>{formatDate(attempt.submitted_at)}</span>
                          <span aria-hidden="true">{isOpen ? '−' : '+'}</span>
                        </button>
                        {isOpen ? <div className={styles.answerDetails}>
                          {detail.questions.map((question, index) => {
                            const selected = attempt.answers?.[question.id]
                            const correct = Number(selected) === Number(question.correct_option_index)
                            return <div className={correct ? styles.answerCorrect : styles.answerWrong} key={question.id}>
                              <strong>{Number(index + 1).toLocaleString('fa-IR')}. {question.prompt}</strong>
                              <span>پاسخ: {selected === null || selected === undefined ? 'بدون پاسخ' : question.options?.[selected]}</span>
                              {!correct ? <span>پاسخ درست: {question.options?.[question.correct_option_index]}</span> : null}
                            </div>
                          })}
                        </div> : null}
                      </article>
                    })}
                  </div>
                )}
              </section>
            </section>
          )
        ) : null}
      </div>
    </main>
  )
}
