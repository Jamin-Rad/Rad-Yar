'use client'
import { useState } from 'react'
import { tradingViewEmbedUrl, tradingViewSymbol, tradingViewUrl } from '@/lib/investments/tradingview.mjs'
import styles from './investments.module.css'

export default function TradingViewChart({ position, onConnect }) {
  const [symbol, setSymbol] = useState(position.tradingViewSymbol || '')
  const [editing, setEditing] = useState(!position.tradingViewSymbol)
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const connected = position.tradingViewSymbol
  function submit(event) {
    event.preventDefault()
    try {
      const next = tradingViewSymbol(symbol)
      if (!next) throw Error('نماد بورس و دارایی لازم است.')
      onConnect(next); setEditing(false); setShow(true); setError('')
    } catch (err) { setError(err.message) }
  }
  return <section className={styles.panel} aria-labelledby="tradingview-title">
    <div className={styles.panelHead}><div><h2 id="tradingview-title">نمودار TradingView</h2><p>کندل، بازه زمانی و ابزار تحلیل نمودار</p></div>{connected && <div className={styles.buttonRow}><a className={styles.outlineButton} href={tradingViewUrl(connected)} target="_blank" rel="noopener noreferrer">باز کردن در TradingView ↗</a><button type="button" className={styles.textButton} onClick={() => setEditing(v => !v)}>تغییر نماد نمودار</button></div>}</div>
    {editing && <form onSubmit={submit} className={styles.marketConnection}><label className={styles.field}>نماد دقیق همراه بورس در TradingView<input dir="ltr" value={symbol} onChange={e => setSymbol(e.target.value)} maxLength={76} placeholder="NASDAQ:AAPL" required autoCapitalize="characters" /><small>نماد را از صفحه همان ابزار در TradingView بردار؛ نماد Yahoo خودکار تبدیل نمی‌شود.</small></label><label className={styles.checkbox}><input type="checkbox" required />ابزار، کلاس سهم، بورس و ارز این نمودار را تطبیق داده‌ام.</label><button type="submit" className={styles.primaryButton}>ذخیره نماد و نمایش نمودار</button>{error && <p className={styles.error} role="alert">{error}</p>}</form>}
    {connected && <><p className={styles.marketSource}>نماد نمودار: <bdi>{connected}</bdi> · داده TradingView ممکن است با منبع محاسبات سبد متفاوت یا با تأخیر باشد.</p>{show ? <><iframe key={connected} className={styles.tradingViewFrame} title={`TradingView chart: ${connected}`} src={tradingViewEmbedUrl(connected)} sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox" referrerPolicy="no-referrer" /><p className={styles.footnote}>اگر نمودار این بازار در ویجت در دسترس نیست، از «باز کردن در TradingView» استفاده کن.</p></> : <button type="button" className={styles.secondaryButton} onClick={() => setShow(true)}>نمایش نمودار تعاملی</button>}</>}
    <p className={styles.footnote}>ویجت با داده عمومی نماد باز می‌شود؛ تعداد دارایی و مبالغ حساب ارسال نمی‌شوند. برای استفاده از حساب شخصی و چیدمان‌های ذخیره‌شده‌ات، نمودار را در سایت TradingView باز کن.</p>
  </section>
}
