'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { QRCodeCanvas } from 'qrcode.react'
import styles from './page.module.css'

const emptyQuestion = () => ({ sourceId: '', sourceLabel: '', prompt: '', options: ['', '', '', ''], correctOptionIndex: 0, points: 1, explanation: '' })
const LANGUAGE_LABELS = Object.freeze({ fa: 'فارسی', en: 'English', de: 'Deutsch' })
const EXAM_DURATION_OPTIONS = Object.freeze([5, 10, 15, 20, 25, 30, 45, 60, 90, 120, 150, 180, 240])
const ACTIVE_DURATION_OPTIONS = Object.freeze([
  { value: 60, label: '۱ ساعت' },
  { value: 120, label: '۲ ساعت' },
  { value: 240, label: '۴ ساعت' },
  { value: 480, label: '۸ ساعت' },
  { value: 720, label: '۱۲ ساعت' },
  { value: 1440, label: '۱ روز' },
  { value: 2880, label: '۲ روز' },
  { value: 4320, label: '۳ روز' },
  { value: 7200, label: '۵ روز' },
  { value: 10080, label: '۷ روز' },
  { value: 20160, label: '۱۴ روز' },
  { value: 43200, label: '۳۰ روز' },
  { value: 86400, label: '۶۰ روز' },
  { value: 129600, label: '۹۰ روز' },
  { value: 259200, label: '۱۸۰ روز' },
  { value: 525600, label: '۱ سال' },
])

function isBlankQuestion(question) {
  return !question?.prompt && question?.options?.every(option => !option)
}

function toDateTimeLocal(date) {
  const offset = date.getTimezoneOffset() * 60 * 1000
  return new Date(date.getTime() - offset).toISOString().slice(0, 16)
}

function createDefaultForm() {
  const scheduledStart = new Date(Date.now() + 60 * 60 * 1000)
  scheduledStart.setMinutes(0, 0, 0)
  return {
    title: '', description: '', organizerName: 'آقای دکتر ضیا', durationMinutes: 30,
    language: 'fa',
    activationMode: 'now', opensAt: toDateTimeLocal(scheduledStart),
    activeDurationMinutes: 10080,
    showResult: true, publishNow: true, questions: [emptyQuestion()],
  }
}

function examDisplayState(exam) {
  if (exam.status === 'closed') return { key: 'closed', label: 'بسته' }
  if (exam.status !== 'published') return { key: 'draft', label: 'پیش‌نویس' }
  const now = Date.now()
  const opensAt = Date.parse(exam.opens_at)
  const closesAt = Date.parse(exam.closes_at)
  if (Number.isFinite(opensAt) && now < opensAt) return { key: 'scheduled', label: 'زمان‌بندی‌شده' }
  if (Number.isFinite(closesAt) && now > closesAt) return { key: 'expired', label: 'پایان‌یافته' }
  return { key: 'published', label: 'فعال' }
}

function formatDate(value) {
  if (!value) return '—'
  return new Intl.DateTimeFormat('fa-IR', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value))
}

function ExamQrCode({ value }) {
  const canvasRef = useRef(null)

  function downloadQrCode() {
    if (!canvasRef.current) return
    const examCode = value.split('/').filter(Boolean).at(-1) || 'exam'
    const downloadLink = document.createElement('a')
    downloadLink.download = `radyar-exam-${examCode}-qr.png`
    downloadLink.href = canvasRef.current.toDataURL('image/png')
    downloadLink.click()
  }

  return (
    <div className={styles.qrBox}>
      <QRCodeCanvas
        ref={canvasRef}
        value={value}
        size={136}
        level="M"
        marginSize={2}
        bgColor="#ffffff"
        fgColor="#14203a"
        aria-label="QR-Code لینک شرکت در امتحان"
        role="img"
      />
      <button type="button" onClick={downloadQrCode}>دانلود QR-Code</button>
    </div>
  )
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
  const [bankLanguage, setBankLanguage] = useState('')
  const [bankLoading, setBankLoading] = useState(false)
  const [bankSearch, setBankSearch] = useState('')
  const [bankTopic, setBankTopic] = useState('all')
  const [selectedBankIds, setSelectedBankIds] = useState([])
  const [form, setForm] = useState(createDefaultForm)
  const bankRequestRef = useRef(0)

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

  const loadQuestionBank = useCallback(async (language = 'fa') => {
    if (bankLoaded && bankLanguage === language) return
    const requestId = bankRequestRef.current + 1
    bankRequestRef.current = requestId
    setBankLoading(true)
    setError('')
    try {
      const data = await readJson(await fetch(`/api/admin/exams?resource=question-bank&language=${encodeURIComponent(language)}`, { cache: 'no-store' }))
      if (bankRequestRef.current !== requestId) return
      const questions = data.questions || []
      const questionById = new Map(questions.map(question => [question.id, question]))
      setQuestionBank(questions)
      setForm(current => ({
        ...current,
        questions: current.questions.map(question => {
          const translated = question.sourceId ? questionById.get(question.sourceId) : null
          return translated ? {
            ...question,
            sourceLabel: translated.topicPath || translated.topic,
            prompt: translated.prompt,
            options: [...translated.options],
            correctOptionIndex: translated.correctOptionIndex,
            explanation: translated.explanation || '',
          } : question
        }),
      }))
      setBankLanguage(language)
      setBankLoaded(true)
    } catch (err) {
      if (bankRequestRef.current === requestId) setError(err.message)
    } finally {
      if (bankRequestRef.current === requestId) setBankLoading(false)
    }
  }, [bankLanguage, bankLoaded])

  const stats = useMemo(() => ({
    total: exams.length,
    active: exams.filter(exam => examDisplayState(exam).key === 'published').length,
    attempts: exams.reduce((sum, exam) => sum + Number(exam.attempt_count || 0), 0),
  }), [exams])

  const bankTopicGroups = useMemo(() => {
    const groups = new Map()
    for (const question of questionBank) {
      const groupTitle = question.parentTopic || 'موضوعات اصلی'
      if (!groups.has(groupTitle)) groups.set(groupTitle, new Map())
      groups.get(groupTitle).set(question.themaId, question.topic)
    }
    return [...groups.entries()]
      .map(([label, topics]) => ({
        label,
        topics: [...topics.entries()]
          .map(([id, title]) => ({ id, title }))
          .sort((a, b) => a.title.localeCompare(b.title, 'fa')),
      }))
      .sort((a, b) => a.label.localeCompare(b.label, 'fa'))
  }, [questionBank])

  const filteredBank = useMemo(() => {
    const query = bankSearch.trim().toLocaleLowerCase('fa')
    const matches = questionBank.filter(question => (
      (bankTopic === 'all' || question.themaId === bankTopic)
      && (!query || `${question.prompt} ${question.topicPath || question.topic}`.toLocaleLowerCase('fa').includes(query))
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
    loadQuestionBank(form.language)
  }

  function changeLanguage(language) {
    setField('language', language)
    setSelectedBankIds([])
    setBankTopic('all')
    setBankLoaded(false)
    loadQuestionBank(language)
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
          sourceLabel: question.topicPath || question.topic,
          prompt: question.prompt,
          options: [...question.options],
          correctOptionIndex: question.correctOptionIndex,
          points: question.points,
          explanation: question.explanation || '',
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
      const opensAt = form.activationMode === 'scheduled'
        ? new Date(form.opensAt).toISOString()
        : undefined
      const data = await readJson(await fetch('/api/admin/exams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, opensAt }),
      }))
      const link = `${window.location.origin}${data.sharePath}`
      setCreatedLink(link)
      setForm(createDefaultForm())
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
  const detailDisplayState = detail?.exam ? examDisplayState(detail.exam) : null
  const detailCanClose = detail?.exam?.status === 'published' && detailDisplayState?.key !== 'expired'

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
            <div><strong>امتحان ساخته شد.</strong><span>این لینک یا QR-Code را برای شرکت‌کنندگان بفرستید.</span></div>
            <div className={styles.shareTools}>
              <div className={styles.shareRow} dir="ltr">
                <input value={createdLink} readOnly aria-label="لینک امتحان" />
                <button type="button" onClick={() => copyLink(createdLink)}>{copied === createdLink ? 'کپی شد ✓' : 'کپی لینک'}</button>
              </div>
              <ExamQrCode value={createdLink} />
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
                  {exams.map(exam => {
                    const displayState = examDisplayState(exam)
                    return <button type="button" className={styles.examCard} key={exam.id} onClick={() => openDetail(exam.id)}>
                      <div className={styles.examCardTop}>
                        <span className={`${styles.status} ${styles[`status_${displayState.key}`]}`}>{displayState.label}</span>
                        <span className={styles.date}>{formatDate(exam.created_at)}</span>
                      </div>
                      <h3>{exam.title}</h3>
                      <p>{exam.description || 'بدون توضیح'}</p>
                      <div className={styles.examMeta}>
                        <span>{LANGUAGE_LABELS[exam.language] || LANGUAGE_LABELS.fa}</span>
                        <span>{exam.duration_minutes.toLocaleString('fa-IR')} دقیقه</span>
                        <strong>{Number(exam.attempt_count || 0).toLocaleString('fa-IR')} نتیجه</strong>
                      </div>
                      <div className={styles.scheduleMeta}><span>شروع: {formatDate(exam.opens_at)}</span><span>پایان: {formatDate(exam.closes_at)}</span></div>
                    </button>
                  })}
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
                <label className={styles.wideField}><span>نام برگزارکننده *</span><input required minLength={2} maxLength={120} value={form.organizerName} onChange={event => setField('organizerName', event.target.value)} placeholder="مثلاً آقای دکتر ضیا" /></label>
                <label><span>زبان آزمون *</span><select value={form.language} onChange={event => changeLanguage(event.target.value)}><option value="fa">فارسی</option><option value="en">English</option><option value="de">Deutsch</option></select></label>
                <label><span>زمان پاسخ‌گویی *</span><select value={form.durationMinutes} onChange={event => setField('durationMinutes', Number(event.target.value))}>{EXAM_DURATION_OPTIONS.map(minutes => <option value={minutes} key={minutes}>{minutes.toLocaleString('fa-IR')} دقیقه</option>)}</select></label>
              </div>
              <div className={styles.availabilityBox}>
                <div className={styles.availabilityHeader}><div><strong>بازه فعال‌بودن لینک</strong><span>این زمان با مدت پاسخ‌گویی هر شرکت‌کننده فرق دارد.</span></div></div>
                <div className={styles.activationChoices}>
                  <label className={form.activationMode === 'now' ? styles.activationChoiceSelected : styles.activationChoice}><input type="radio" name="activationMode" checked={form.activationMode === 'now'} onChange={() => setField('activationMode', 'now')} /><span><strong>فعال از همین حالا</strong><small>لینک بلافاصله قابل استفاده باشد</small></span></label>
                  <label className={form.activationMode === 'scheduled' ? styles.activationChoiceSelected : styles.activationChoice}><input type="radio" name="activationMode" checked={form.activationMode === 'scheduled'} onChange={() => setField('activationMode', 'scheduled')} /><span><strong>فعال‌سازی زمان‌بندی‌شده</strong><small>تاریخ و ساعت شروع را تعیین کنید</small></span></label>
                </div>
                <div className={styles.scheduleFields}>
                  {form.activationMode === 'scheduled' ? <label><span>تاریخ و ساعت شروع *</span><input type="datetime-local" required value={form.opensAt} onChange={event => setField('opensAt', event.target.value)} /></label> : <div className={styles.nowNotice}><strong>شروع</strong><span>بلافاصله پس از ساخت</span></div>}
                  <label><span>مدت فعال‌بودن *</span><select value={form.activeDurationMinutes} onChange={event => setField('activeDurationMinutes', Number(event.target.value))}>{ACTIVE_DURATION_OPTIONS.map(option => <option value={option.value} key={option.value}>{option.label}</option>)}</select></label>
                </div>
              </div>
              <div className={styles.checks}>
                <label><input type="checkbox" checked={form.showResult} onChange={event => setField('showResult', event.target.checked)} /><span>نمره، رتبه و مرور پاسخ‌ها بعد از ارسال نشان داده شود</span></label>
                <label><input type="checkbox" checked={form.publishNow} onChange={event => setField('publishNow', event.target.checked)} /><span>امتحان پس از ساخت منتشر شود و طبق زمان‌بندی بالا فعال باشد</span></label>
              </div>
            </section>

            <section className={styles.formSection}>
              <div className={styles.bankHeader}>
                <div><h3>انتخاب از بانک سؤال رادیار</h3><p>سؤال‌های موجود را جست‌وجو و به امتحان اضافه کنید؛ یا پایین‌تر سؤال جدید بسازید.</p></div>
                <span>{questionBank.length.toLocaleString('fa-IR')} سؤال موجود</span>
              </div>
              <div className={styles.bankToolbar}>
                <label><span>جست‌وجوی سؤال</span><input type="search" value={bankSearch} onChange={event => setBankSearch(event.target.value)} placeholder="مثلاً MRI، خونریزی یا منیسک…" /></label>
                <label><span>موضوع</span><select value={bankTopic} onChange={event => setBankTopic(event.target.value)}><option value="all">همه موضوع‌ها</option>{bankTopicGroups.map(group => <optgroup label={group.label} key={group.label}>{group.topics.map(topic => <option value={topic.id} key={topic.id}>{topic.title}</option>)}</optgroup>)}</select></label>
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
                        <span><strong>{question.prompt}</strong><small>{question.topicPath || question.topic} · {question.options.join(' / ')}</small></span>
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
              <div className={styles.questionsHeader}><div><h3>سؤال‌ها</h3><p>سؤال‌های بانک رادیار ثابت هستند؛ فقط سؤال‌های جدیدی که خودتان می‌سازید قابل ویرایش‌اند.</p></div><span>{form.questions.length.toLocaleString('fa-IR')} سؤال</span></div>
              <div className={styles.questionList}>
                {form.questions.map((question, questionIndex) => (
                  <article className={styles.questionCard} key={questionIndex}>
                    <div className={styles.questionHeader}>
                      <strong>سؤال {Number(questionIndex + 1).toLocaleString('fa-IR')}{question.sourceLabel ? <small>از بانک: {question.sourceLabel}</small> : <small>سؤال جدید</small>}</strong>
                      {form.questions.length > 1 ? <button type="button" onClick={() => removeQuestion(questionIndex)}>حذف سؤال</button> : null}
                    </div>
                    {question.sourceId ? (
                      <div className={styles.importedQuestion} dir={form.language === 'fa' ? 'rtl' : 'ltr'}>
                        <strong>{question.prompt}</strong>
                        <div>{question.options.map((option, optionIndex) => <span className={question.correctOptionIndex === optionIndex ? styles.importedCorrect : ''} key={optionIndex}><b>{String.fromCharCode(65 + optionIndex)}</b>{option}{question.correctOptionIndex === optionIndex ? <i>✓</i> : null}</span>)}</div>
                        {question.explanation ? <p>{question.explanation}</p> : null}
                        <small>متن و پاسخ این سؤال از بانک رادیار دریافت شده و قابل تغییر نیست.</small>
                      </div>
                    ) : (
                      <>
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
                        <label className={styles.promptField}><span>توضیح پاسخ صحیح</span><textarea maxLength={8000} value={question.explanation} onChange={event => updateQuestion(questionIndex, { explanation: event.target.value })} placeholder="بعد از پایان آزمون به شرکت‌کننده نمایش داده می‌شود…" /></label>
                        <label className={styles.points}><span>امتیاز این سؤال</span><input type="number" min="1" max="100" value={question.points} onChange={event => updateQuestion(questionIndex, { points: Number(event.target.value) })} /></label>
                      </>
                    )}
                  </article>
                ))}
              </div>
              <button type="button" className={styles.addQuestion} onClick={() => setForm(current => ({ ...current, questions: [...current.questions, emptyQuestion()] }))}>＋ ساخت سؤال جدید</button>
            </section>

            {error ? <div className={styles.formError} role="alert">{error}</div> : null}
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
                <div className={styles.detailTitle}><div><span className={`${styles.status} ${styles[`status_${detailDisplayState.key}`]}`}>{detailDisplayState.label}</span><h2>{detail.exam.title}</h2><p>{detail.exam.description}</p></div>
                  <button type="button" className={detailCanClose ? styles.dangerButton : styles.primaryButton} disabled={saving} onClick={() => changeStatus(detailCanClose ? 'close' : 'reopen')}>
                    {detailCanClose ? 'بستن امتحان' : 'فعال‌کردن دوباره'}
                  </button>
                </div>
              </div>

              <div className={styles.shareCard}>
                <div><strong>لینک شرکت در امتحان</strong><span>{detail.questions.length.toLocaleString('fa-IR')} سؤال · {detail.exam.duration_minutes.toLocaleString('fa-IR')} دقیقه پاسخ‌گویی</span><span>فعال از {formatDate(detail.exam.opens_at)} تا {formatDate(detail.exam.closes_at)}</span></div>
                <div className={styles.shareTools}>
                  <div className={styles.shareRow} dir="ltr"><input value={shareLink} readOnly aria-label="لینک امتحان" /><Link href={`/exam/${detail.exam.public_code}`} target="_blank">بازکردن</Link><button type="button" onClick={() => copyLink(shareLink)}>{copied === shareLink ? 'کپی شد ✓' : 'کپی'}</button></div>
                  <ExamQrCode value={shareLink} />
                </div>
              </div>

              <div className={styles.resultSummary}>
                <article><span>شرکت‌کننده</span><strong>{detail.attempts.length.toLocaleString('fa-IR')}</strong></article>
                <article><span>میانگین</span><strong>{detail.attempts.length ? `${Math.round(detail.attempts.reduce((sum, item) => sum + Number(item.percentage), 0) / detail.attempts.length).toLocaleString('fa-IR')}٪` : '—'}</strong></article>
                <article><span>بالاترین نمره</span><strong>{detail.attempts.length ? `${Math.max(...detail.attempts.map(item => Number(item.percentage))).toLocaleString('fa-IR')}٪` : '—'}</strong></article>
              </div>

              <section className={styles.panel}>
                <div className={styles.panelHeader}><div><h2>رتبه‌بندی شرکت‌کنندگان</h2><p>فهرست بر اساس درصد نمره مرتب شده است؛ برای دیدن پاسخ‌ها و نظر هر نفر، ردیف را باز کنید.</p></div></div>
                {detail.attempts.length === 0 ? <div className={styles.empty}>هنوز پاسخی ثبت نشده است.</div> : (
                  <div className={styles.resultsList}>
                    {detail.attempts.map(attempt => {
                      const isOpen = expandedAttempt === attempt.id
                      return <article className={styles.attempt} key={attempt.id}>
                        <button type="button" className={styles.attemptRow} onClick={() => setExpandedAttempt(isOpen ? '' : attempt.id)}>
                          <span className={styles.rank}><small>رتبه</small><strong>{Number(attempt.rank).toLocaleString('fa-IR')}</strong></span>
                          <span className={styles.person}><strong>{attempt.participant_name}</strong><small>{attempt.participant_contact || 'بدون راه ارتباطی'}</small></span>
                          <span><small>نمره</small><strong>{attempt.score.toLocaleString('fa-IR')} از {attempt.max_score.toLocaleString('fa-IR')}</strong></span>
                          <span><small>درصد</small><strong>{Number(attempt.percentage).toLocaleString('fa-IR')}٪</strong></span>
                          <span className={styles.submitted}>{formatDate(attempt.submitted_at)}</span>
                          <span aria-hidden="true">{isOpen ? '−' : '+'}</span>
                        </button>
                        {isOpen ? <div className={styles.answerDetails}>
                          {attempt.feedback_rating || attempt.feedback_text ? <div className={styles.attemptFeedback}><strong>نظر شرکت‌کننده</strong><span>{attempt.feedback_rating ? `امتیاز ${Number(attempt.feedback_rating).toLocaleString('fa-IR')} از ۵` : 'بدون امتیاز گزینه‌ای'}</span>{attempt.feedback_text ? <p>{attempt.feedback_text}</p> : null}</div> : null}
                          {detail.questions.map((question, index) => {
                            const selected = attempt.answers?.[question.id]
                            const correct = Number(selected) === Number(question.correct_option_index)
                            return <div className={correct ? styles.answerCorrect : styles.answerWrong} key={question.id}>
                              <strong>{Number(index + 1).toLocaleString('fa-IR')}. {question.prompt}</strong>
                              <span>پاسخ: {selected === null || selected === undefined ? 'بدون پاسخ' : question.options?.[selected]}</span>
                              {!correct ? <span>پاسخ درست: {question.options?.[question.correct_option_index]}</span> : null}
                              {question.explanation ? <p>{question.explanation}</p> : null}
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
