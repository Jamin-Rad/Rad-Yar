'use client'
import { accountBalance, balanceCsv } from '@/lib/investments/balances.mjs'
import { money, number } from '@/lib/investments/portfolio.mjs'
import styles from './investments.module.css'

export default function AccountBalancePanel({ account, ledger, markets, onDetails }) {
  const balance = accountBalance(account, ledger?.loaded ? ledger.transactions : null, markets)
  const cash = balance.cash, cashValue = cash.balanceCents ?? cash.estimatedCents
  function exportBalance() {
    const url = URL.createObjectURL(new Blob(['\uFEFF'+balanceCsv(balance)], {type:'text/csv;charset=utf-8'}))
    const link = document.createElement('a');link.href=url;link.download=`account-balance-${account.id}.csv`;link.click();URL.revokeObjectURL(url)
  }
  return <section className={styles.balancePanel} aria-label={`موجودی حساب ${account.owner}`}>
    <div className={styles.panelHead}><div><h2>موجودی حساب {account.owner}</h2><p>پول نقد + تعداد سهم × قیمت مرجع یورویی</p></div><button type="button" className={styles.secondaryButton} onClick={exportBalance} disabled={!ledger?.loaded}>خروجی CSV موجودی</button></div>
    <div className={styles.balanceGrid}>
      <div><span>{balance.unknownQuantityCount?'برآورد ارزش اوراق با تعداد ثبت‌شده':'ارزش دارایی‌ها با قیمت بازار'}</span><strong><bdi>{money(balance.securitiesCents ?? balance.estimatedSecuritiesCents)}</bdi></strong><small>{number(balance.pricedCount)} از {number(account.positions.length)} دارایی دارای قیمت معتبر{balance.unknownQuantityCount ? ` · ${number(balance.unknownQuantityCount)} تعداد نیازمند تطبیق` : ''}</small>{balance.estimatedSecuritiesCents==null&&balance.partialValueCents!=null&&<small>جمع بخش دارای قیمت: <bdi>{money(balance.partialValueCents)}</bdi></small>}</div>
      <div><span>{cash.balanceCents!=null?'مانده نقد محاسبه‌شده':'برآورد مانده نقد'}</span><strong><bdi>{money(cashValue)}</bdi></strong><small>{!ledger?.loaded?'در حال دریافت تراکنش‌ها…':cash.status==='confirmed-checkpoint'?`مبنای نقد واقعی: ${new Date(cash.checkpoint.asOf).toLocaleString('de-DE',{timeZone:'Europe/Berlin'})}`:cash.status==='confirmed-opening'?`افتتاحیه ${money(cash.openingCents)} قبل از ${cash.openingDate}`:cash.status==='zero-opening-estimate'?'با فرض افتتاحیه صفر؛ هنوز تأیید نشده':'مانده ابتدای فایل یا نقد واقعی فعلی لازم است'}</small>{cash.movementCents!=null&&<small>{cash.checkpoint?'تغییر نقد پس از مبنا':'خالص تغییر نقد فایل'}: <bdi>{money(cash.movementCents)}</bdi></small>}<button type="button" className={styles.textButton} onClick={onDetails}>تعیین مبنای نقد</button></div>
      <div><span>{balance.equityEstimated?'برآورد ارزش کل حساب':'ارزش کل حساب با قیمت مرجع'}</span><strong><bdi>{money(balance.equityCents ?? balance.estimatedEquityCents)}</bdi></strong><small>{balance.estimatedEquityCents==null?'تا تکمیل قیمت و مبنای نقد، جمع کامل ساخته نمی‌شود.':balance.unknownQuantityCount?'شامل تعدادهای ثبت‌شده‌ای است که هنوز تطبیق داده نشده‌اند.':'ارزش اوراق + پول نقد؛ سود سرمایه‌گذاری نیست.'}</small></div>
    </div>
    <p className={styles.footnote}>آخرین تراکنش: <bdi>{cash.throughDate || '—'}</bdi> · قدیمی‌ترین قیمت استفاده‌شده: <bdi>{balance.oldestPrice ? new Date(balance.oldestPrice).toLocaleString('de-DE',{timeZone:'Europe/Berlin'}) : '—'}</bdi>. قیمت خرید و مبلغ عکس‌های قدیمی به‌جای قیمت روز استفاده نمی‌شوند.</p>
  </section>
}
