'use client'
import { useEffect, useId, useRef, useState } from 'react'
import { tradingViewEmbedUrl, tradingViewSymbol, tradingViewUrl } from '@/lib/investments/tradingview.mjs'
import styles from './investments.module.css'

export default function TradingViewChart({ position, onConnect }) {
  const [symbol, setSymbol] = useState(position.tradingViewSymbol || null)
  const [lookup, setLookup] = useState(null)
  const [showAllResults, setShowAllResults] = useState(false)
  const [editing, setEditing] = useState(false)
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [invalidField, setInvalidField] = useState('')
  const [reload, setReload] = useState(0)
  const symbolInput = useRef(null)
  const confirmationInput = useRef(null)
  const request = useRef(null)
  const helpId = useId()
  const errorId = useId()
  const connected = position.tradingViewSymbol
  const { isin, name } = position
  const results = lookup?.results || []
  const visibleResults = showAllResults ? results : results.slice(0, 6)
  const selectedSymbol = symbol ?? (isin && results.length === 1 ? results[0].symbol : '')

  useEffect(() => () => request.current?.abort(), [])

  async function openChart(selectListing = false) {
    if (connected && !selectListing) {
      setShow(true)
      return
    }
    if (request.current) return
    if (selectListing && lookup?.results) {
      setEditing(true)
      return
    }
    if (!isin && !name) {
      setEditing(true)
      return
    }
    const controller = new AbortController()
    request.current = controller
    setLookup({ loading: true })
    setEditing(true)
    const params = new URLSearchParams(isin ? { isin } : { name })
    try {
      const response = await fetch(`/api/andarun/investments/tradingview?${params}`, { signal: controller.signal })
      const data = await response.json()
      if (!response.ok || !Array.isArray(data.results)) throw Error('جست‌وجو انجام نشد.')
      if (controller.signal.aborted) return
      setLookup({ results: data.results })
      // Only an ISIN match can be opened without manual confirmation.
      const match = isin && !selectListing && data.results[0]
      if (match) {
        onConnect(match.symbol)
        setSymbol(match.symbol)
        setEditing(false)
        setShow(true)
      }
    } catch {
      if (!controller.signal.aborted) setLookup({ failed: true })
    } finally {
      request.current = null
    }
  }

  function clearError() {
    setError('')
    setInvalidField('')
  }

  function chooseSymbol(value) {
    setSymbol(value)
    if (confirmationInput.current) confirmationInput.current.checked = false
    clearError()
  }

  function submit(event) {
    event.preventDefault()
    let next
    try {
      next = tradingViewSymbol(selectedSymbol)
      if (!next) throw Error('نماد واقعی این دارایی را همراه با نام بورس وارد کن.')
    } catch (err) {
      setError(err.message)
      setInvalidField('symbol')
      symbolInput.current?.focus()
      return
    }
    if (!confirmationInput.current?.checked) {
      setError('بعد از بررسی نماد و بورس، تیک تطبیق را بزن.')
      setInvalidField('confirmation')
      confirmationInput.current?.focus()
      return
    }
    clearError()
    try {
      onConnect(next)
      setSymbol(next)
      setEditing(false)
      setShow(true)
    } catch (err) {
      setError(err.message)
    }
  }
  return <section className={styles.panel} aria-labelledby="tradingview-title">
    <div className={styles.panelHead}><div><h2 id="tradingview-title">نمودار TradingView</h2><p>کندل، میانگین متحرک و RSI</p></div>{connected && <div className={styles.buttonRow}><a className={styles.outlineButton} href={tradingViewUrl(connected)} target="_blank" rel="noopener noreferrer">باز کردن در TradingView ↗</a>{show && <button type="button" className={styles.textButton} onClick={() => setReload(v=>v+1)}>بارگذاری دوباره نمودار</button>}<button type="button" className={styles.textButton} onClick={() => editing ? setEditing(false) : openChart(true)}>تغییر نماد نمودار</button></div>}</div>
    {!show && !editing && <button type="button" className={styles.secondaryButton} onClick={() => openChart()}>نمایش نمودار</button>}
    {editing && <form noValidate onSubmit={submit} className={styles.marketConnection}>
      {lookup?.loading && <p role="status">در حال جست‌وجوی نماد این دارایی در TradingView…</p>}
      {lookup?.failed && <p role="status">جست‌وجوی TradingView فعلاً در دسترس نیست. <button type="button" className={styles.textButton} onClick={() => openChart(Boolean(connected))}>جست‌وجوی دوباره</button></p>}
      {lookup?.results && !results.length && <p role="status">نمادی برای این دارایی پیدا نشد. می‌توانی نماد را دستی وارد کنی.</p>}
      {results.length > 0 && <>
        <p className={styles.footnote}>{isin ? 'نمادهای دارای ISIN یکسان. بورس و ارز مورد نظر را بررسی کن.' : 'پیشنهادها بر اساس نام دارایی‌اند. کلاس سهم، بورس و ارز را بررسی کن.'}</p>
        <div className={styles.instrumentResults}>
          {visibleResults.map(result => <button key={result.symbol} type="button" aria-pressed={selectedSymbol === result.symbol} className={selectedSymbol === result.symbol ? styles.selectedTrade : ''} onClick={() => chooseSymbol(result.symbol)}>
            <strong><bdi>{result.symbol}</bdi> · <bdi>{result.name}</bdi></strong>
            <small><bdi>{result.exchange}{result.currency && ` · ${result.currency}`}</bdi></small>
          </button>)}
        </div>
        {results.length > 6 && <button type="button" className={styles.textButton} aria-expanded={showAllResults} onClick={() => setShowAllResults(value => !value)}>{showAllResults ? 'نمایش گزینه‌های کمتر' : 'نمایش همهٔ بورس‌ها'}</button>}
      </>}
      <label className={styles.field}>نماد دقیق این دارایی در TradingView
        <input ref={symbolInput} dir="ltr" value={selectedSymbol} onChange={event => chooseSymbol(event.target.value)} maxLength={76} placeholder="EXCHANGE:SYMBOL" required autoCapitalize="characters" aria-invalid={invalidField === 'symbol'} aria-describedby={invalidField === 'symbol' ? `${helpId} ${errorId}` : helpId}/>
        <small id={helpId}>یکی از پیشنهادها را انتخاب کن یا نماد را همراه با نام بورس وارد کن.</small>
      </label>
      <label className={styles.checkbox}>
        <input ref={confirmationInput} type="checkbox" required onChange={clearError} aria-invalid={invalidField === 'confirmation'} aria-describedby={invalidField === 'confirmation' ? errorId : undefined}/>
        بررسی کردم که دارایی، کلاس سهم، بورس و ارز با این نمودار مطابقت دارند.
      </label>
      {error && <p id={errorId} className={styles.error} role="alert">{error}</p>}
      <button type="submit" className={styles.primaryButton} disabled={lookup?.loading}>ذخیره نماد و نمایش نمودار</button>
    </form>}
    {connected && <><p className={styles.marketSource}>نماد نمودار: <bdi>{connected}</bdi> · داده TradingView ممکن است با منبع محاسبات سبد متفاوت یا با تأخیر باشد.</p>{show && <><iframe key={`${connected}:${reload}`} className={styles.tradingViewFrame} title={`TradingView chart: ${connected}`} src={tradingViewEmbedUrl(connected)} sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox" referrerPolicy="no-referrer" /><p className={styles.footnote}>اگر نمودار این بازار در ویجت در دسترس نیست، از «باز کردن در TradingView» استفاده کن.</p></>}</>}
    <p className={styles.footnote}>ویجت با داده عمومی نماد باز می‌شود؛ تعداد دارایی و مبالغ حساب ارسال نمی‌شوند. برای استفاده از حساب شخصی و چیدمان‌های ذخیره‌شده‌ات، نمودار را در سایت TradingView باز کن.</p>
  </section>
}
