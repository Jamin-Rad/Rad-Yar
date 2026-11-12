'use client'
import { useId, useRef, useState } from 'react'
import { tradingViewEmbedUrl, tradingViewSymbol, tradingViewUrl } from '@/lib/investments/tradingview.mjs'
import styles from './investments.module.css'

export default function TradingViewChart({ position, onConnect }) {
  const [symbol, setSymbol] = useState(position.tradingViewSymbol || '')
  const [editing, setEditing] = useState(!position.tradingViewSymbol)
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [invalidField, setInvalidField] = useState('')
  const [reload, setReload] = useState(0)
  const symbolInput = useRef(null)
  const confirmationInput = useRef(null)
  const helpId = useId()
  const errorId = useId()
  const connected = position.tradingViewSymbol
  function clearError() {
    setError('')
    setInvalidField('')
  }

  function submit(event) {
    event.preventDefault()
    let next
    try {
      next = tradingViewSymbol(symbol)
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
    <div className={styles.panelHead}><div><h2 id="tradingview-title">نمودار TradingView</h2><p>کندل، میانگین متحرک و RSI</p></div>{connected && <div className={styles.buttonRow}><a className={styles.outlineButton} href={tradingViewUrl(connected)} target="_blank" rel="noopener noreferrer">باز کردن در TradingView ↗</a><button type="button" className={styles.textButton} onClick={()=>{setShow(true);setReload(v=>v+1)}}>بارگذاری دوباره نمودار</button><button type="button" className={styles.textButton} onClick={() => setEditing(v => !v)}>تغییر نماد نمودار</button></div>}</div>
    {editing && <form noValidate onSubmit={submit} className={styles.marketConnection}>
      <label className={styles.field}>نماد دقیق این دارایی در TradingView
        <input ref={symbolInput} dir="ltr" value={symbol} onChange={event => { setSymbol(event.target.value); clearError() }} maxLength={76} placeholder="EXCHANGE:SYMBOL" required autoCapitalize="characters" aria-invalid={invalidField === 'symbol'} aria-describedby={invalidField === 'symbol' ? `${helpId} ${errorId}` : helpId}/>
        <small id={helpId}>نماد و بورس را از صفحهٔ همین دارایی در TradingView بردار. <bdi>NASDAQ:AAPL</bdi> فقط نمونهٔ نماد اپل است.</small>
      </label>
      <label className={styles.checkbox}>
        <input ref={confirmationInput} type="checkbox" required onChange={clearError} aria-invalid={invalidField === 'confirmation'} aria-describedby={invalidField === 'confirmation' ? errorId : undefined}/>
        بررسی کردم که دارایی، کلاس سهم، بورس و ارز با این نمودار مطابقت دارند.
      </label>
      {error && <p id={errorId} className={styles.error} role="alert">{error}</p>}
      <button type="submit" className={styles.primaryButton}>ذخیره نماد و نمایش نمودار</button>
    </form>}
    {connected && <><p className={styles.marketSource}>نماد نمودار: <bdi>{connected}</bdi> · داده TradingView ممکن است با منبع محاسبات سبد متفاوت یا با تأخیر باشد.</p>{show ? <><iframe key={`${connected}:${reload}`} className={styles.tradingViewFrame} title={`TradingView chart: ${connected}`} src={tradingViewEmbedUrl(connected)} sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox" referrerPolicy="no-referrer" /><p className={styles.footnote}>اگر نمودار این بازار در ویجت در دسترس نیست، از «باز کردن در TradingView» استفاده کن.</p></> : <button type="button" className={styles.secondaryButton} onClick={() => setShow(true)}>نمایش نمودار تعاملی</button>}</>}
    <p className={styles.footnote}>ویجت با داده عمومی نماد باز می‌شود؛ تعداد دارایی و مبالغ حساب ارسال نمی‌شوند. برای استفاده از حساب شخصی و چیدمان‌های ذخیره‌شده‌ات، نمودار را در سایت TradingView باز کن.</p>
  </section>
}
