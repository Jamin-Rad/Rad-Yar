'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './page.module.css'

const normalize = value => value.toLowerCase().replace(/ي/g, 'ی').replace(/ك/g, 'ک').replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)).replace(/[\u200c\s]+/g, ' ').trim()
const comparisonRows = [
  ['تولد', p => p.birth], ['شهر', p => p.city], ['قد / وزن', p => `${p.height} سانتی‌متر / ${p.weight} کیلوگرم`],
  ['تحصیلات', p => p.sections['مشخصات فردی']['تحصیلات']], ['سابقه', p => p.history],
  ['فرزندآوری', p => p.children], ['معیارهای همسر', p => Object.entries(p.sections['معیارهای همسر']).map(([k, v]) => `${k}: ${v}`).join('؛ ')],
  ['ازدواج و جابه‌جایی', p => Object.entries(p.sections['ازدواج و آینده']).map(([k, v]) => `${k}: ${v}`).join('؛ ')],
]

export default function Matchmaking({ profiles }) {
  const [query, setQuery] = useState('')
  const [gender, setGender] = useState('همه')
  const [city, setCity] = useState('همه')
  const [children, setChildren] = useState('همه')
  const [selected, setSelected] = useState([])
  const filtered = profiles.filter(p => (gender === 'همه' || p.gender === gender) && (city === 'همه' || p.city === city) && (children === 'همه' || p.children === children) && normalize(JSON.stringify(p)).includes(normalize(query)))
  const compared = profiles.filter(p => selected.includes(p.id))
  function toggle(id) { setSelected(previous => previous.includes(id) ? previous.filter(item => item !== id) : previous.length < 3 ? [...previous, id] : previous) }
  function reset() { setQuery(''); setGender('همه'); setCity('همه'); setChildren('همه') }

  return <main className={styles.shell} dir="rtl" lang="fa">
    <div className={styles.container}>
      <nav className={styles.top}><Link href="/fatima">← صفحهٔ فاطمه</Link><span>دفتر خصوصی آشنایی</span></nav>
      <header className={styles.hero}>
        <div><span className={styles.eyebrow}>برای یک آشنایی آگاهانه</span><h1>آدم‌ها، کنار هم<span>دفتر همسریابی فاطمه</span></h1><p>یک نگاه کوتاه به هر فرد؛ جزئیات و معیارها، درست همان‌جا که به آن‌ها نیاز داری.</p></div>
        <div className={styles.counts}><strong>۶<small>پرونده</small></strong><span>۳ آقا<br />۳ خانم</span></div>
      </header>
      <section className={styles.filters} aria-label="جست‌وجو و فیلتر پرونده‌ها">
        <label className={styles.search}>جست‌وجو<input type="search" placeholder="کد، شهر، رشته یا ویژگی…" value={query} onChange={e => setQuery(e.target.value)} /></label>
        <label>پرونده<select value={gender} onChange={e => setGender(e.target.value)}>{['همه', 'آقا', 'خانم'].map(v => <option key={v}>{v}</option>)}</select></label>
        <label>محل سکونت<select value={city} onChange={e => setCity(e.target.value)}>{['همه', ...new Set(profiles.map(p => p.city))].map(v => <option key={v}>{v}</option>)}</select></label>
        <label>تمایل به فرزند<select value={children} onChange={e => setChildren(e.target.value)}>{['همه', 'بله', 'خیر', 'با توافق'].map(v => <option key={v}>{v}</option>)}</select></label>
      </section>
      <div className={styles.results}><p role="status">{filtered.length.toLocaleString('fa-IR')} پرونده نمایش داده می‌شود</p><button onClick={reset}>پاک‌کردن فیلترها</button></div>
      <p className={styles.note}>نام و اطلاعات تماس در فرم‌ها ارائه نشده است. کدها صرفاً برای شناسایی پرونده‌اند. برای مقایسه، حداکثر سه پرونده را انتخاب کن.</p>
      {filtered.length === 0 && <div className={styles.empty}><h2>پرونده‌ای پیدا نشد</h2><p>عبارت جست‌وجو یا فیلترها را تغییر بده.</p><button onClick={reset}>نمایش همهٔ پرونده‌ها</button></div>}
      <div className={styles.grid}>{filtered.map(p => <article key={p.id} className={styles.card}>
        <div className={styles.cardTop}><span className={p.gender === 'خانم' ? styles.woman : styles.man}>{p.gender} · <bdi>{p.id}</bdi></span><label className={styles.compareCheck}><input type="checkbox" checked={selected.includes(p.id)} disabled={selected.length === 3 && !selected.includes(p.id)} onChange={() => toggle(p.id)} />مقایسه</label></div>
        <h2>{p.title}</h2><p className={styles.location}>{p.city} <span>·</span> {p.birth}</p>
        <dl className={styles.facts}><div><dt>قد</dt><dd>{p.height}<small> سانتی‌متر</small></dd></div><div><dt>وزن</dt><dd>{p.weight}<small> کیلوگرم</small></dd></div><div><dt>فرزندآوری</dt><dd>{p.children}</dd></div></dl>
        <p className={styles.history}>{p.history}</p>
        <p className={styles.criteria}>{Object.entries(p.sections['معیارهای همسر']).slice(0, 2).map(([k,v]) => `${k}: ${v}`).join(' • ')}</p>
        <details className={styles.details}><summary>مشاهدهٔ پروندهٔ کامل</summary><div className={styles.detailBody}>{Object.entries(p.sections).map(([title, fields]) => <section key={title}><h3>{title}</h3><dl>{Object.entries(fields).map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></section>)}<aside><strong>برای تکمیل پرونده</strong><p>{p.missing}</p></aside></div></details>
      </article>)}</div>
      {compared.length > 0 && <section className={styles.comparison} aria-label="مقایسه پرونده‌های انتخاب‌شده"><div className={styles.results}><h2>کنار هم ببین</h2><button onClick={() => setSelected([])}>پاک‌کردن انتخاب‌ها</button></div><p>مقایسهٔ اطلاعات ثبت‌شده؛ بدون امتیازدهی یا پیشنهاد خودکار. {compared.length === 1 ? 'یک یا دو پروندهٔ دیگر انتخاب کن.' : ''}</p><div className={styles.tableScroll} tabIndex={0} role="region" aria-label="جدول مقایسه؛ قابل پیمایش افقی"><table><thead><tr><th scope="col">مشخصات</th>{compared.map(p => <th scope="col" key={p.id}>{p.gender} <bdi>{p.id}</bdi><br />{p.title}<button aria-label={`حذف ${p.id} از مقایسه`} onClick={() => toggle(p.id)}>حذف</button></th>)}</tr></thead><tbody>{comparisonRows.map(([label, read]) => <tr key={label}><th scope="row">{label}</th>{compared.map(p => <td key={p.id}>{read(p)}</td>)}</tr>)}</tbody></table></div></section>}
      <footer className={styles.footer}>اطلاعات خوداظهاریِ شش فرم ارسالی · تاریخ تکمیل فرم‌ها نامشخص است.<br />«ذکر نشده» به معنی پاسخ منفی نیست. اطلاعات نسبی و وضعیت‌های اقامت باید پیش از معرفی دوباره تأیید شوند.</footer>
    </div>
  </main>
}
