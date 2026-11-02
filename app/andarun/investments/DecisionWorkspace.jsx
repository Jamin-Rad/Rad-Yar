'use client'
import {useState} from 'react'
import {DECISION_ACTIONS,todayBerlin} from '@/lib/investments/family.mjs'
import {number,signedMoney,money} from '@/lib/investments/portfolio.mjs'
import {JournalDialog} from './TradeDialogs'
import Icon from './InvestmentIcon'
import styles from './investments.module.css'
export function DecisionDialog({state,accountId,positionId,onClose,onSave}){
 const [owner,setOwner]=useState(accountId||state.accounts[0].id),[asset,setAsset]=useState(positionId||''),[error,setError]=useState('')
 const account=state.accounts.find(a=>a.id===owner)
 const position=account.positions.find(p=>p.id===asset)
 function submit(event){event.preventDefault();if(!position){setError('یک دارایی را انتخاب کن.');return}const form=new FormData(event.currentTarget);try{onSave({id:crypto.randomUUID(),accountId:owner,positionId:position.id,name:position.name,action:form.get('action'),rationale:String(form.get('rationale')),invalidation:String(form.get('invalidation')),planDate:todayBerlin(),reviewDate:form.get('reviewDate'),createdAt:new Date().toISOString(),baselineQuantity:position.quantity,baselineValueCents:position.valueCents,baselineDate:position.asOf||account.snapshotDate||null,reviews:[]})}catch(err){setError(err.message)}}
 const week=new Date(Date.now()+7*86400000).toISOString().slice(0,10)
 return <JournalDialog title="تصمیم جدید سرمایه‌گذاری" description="دلیل اولیه حفظ می‌شود؛ نتیجه و بازبینی را بعداً به همان پرونده اضافه کن." onClose={onClose} onSubmit={submit} error={error}>
 <div className={styles.formGrid}><label className={styles.field}>حساب<select value={owner} onChange={e=>{setOwner(e.target.value);setAsset('')}}>{state.accounts.map(a=><option key={a.id} value={a.id}>{a.owner}</option>)}</select></label><label className={styles.field}>دارایی<select required value={asset} onChange={e=>setAsset(e.target.value)}><option value="">انتخاب دارایی</option>{account.positions.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}</select></label></div>
 <label className={styles.field}>تصمیم من<select name="action">{Object.entries(DECISION_ACTIONS).map(([key,label])=><option key={key} value={key}>{label}</option>)}</select></label>
 <label className={styles.field}>دلیل تصمیم<textarea name="rationale" required maxLength={1000} rows={3}/></label><label className={styles.field}>چه چیزی نظرم را تغییر می‌دهد؟<textarea name="invalidation" required maxLength={1000} rows={3}/></label>
 <label className={styles.field}>اولین بازبینی<input type="date" name="reviewDate" defaultValue={week} min={todayBerlin()} required dir="ltr"/><small>بعد از هر مرور می‌توانی موعد یک‌ماهه یا هر تاریخ دیگری تعیین کنی.</small></label>
 {position&&<p className={styles.footnote}>مبنای ثبت: {money(position.valueCents)} · تاریخ ارزش: {position.asOf||account.snapshotDate||'نامشخص؛ برای سنجش بازده قابل اتکا نیست'}</p>}
 </JournalDialog>
}
export function decisionDue(decision){return decision.reviews.length?decision.reviews.at(-1).nextReviewDate:decision.reviewDate}
export default function DecisionWorkspace({decision,state,onReview,onAsset,onReport}){
 const owner=state.accounts.find(a=>a.id===decision.accountId)?.owner
 const verdicts={yes:'بله',no:'خیر',uncertain:'نامشخص'}
 return <div className={styles.sectionStack}><section className={styles.panel}>
 <div className={styles.panelHead}><div><h2 dir="auto">{decision.name}</h2><p>حساب {owner} · {DECISION_ACTIONS[decision.action]}</p></div><Icon name="journal" size={25}/></div>
 <p className={styles.planLocked}><Icon name="lock" size={14}/>فرض اولیه حفظ‌شده · {decision.planDate}</p><div className={styles.thesis}><h3>دلیل اولیه</h3><p>{decision.rationale}</p><h3>شرط تغییر نظر</h3><p>{decision.invalidation}</p></div>
 <p className={styles.footnote}>زمان ثبت واقعی: <bdi>{decision.createdAt}</bdi> · مبنای ارزش: <bdi>{decision.baselineDate||'نامشخص'}</bdi> · {money(decision.baselineValueCents)}</p>
 <div className={styles.buttonRow}><button className={styles.primaryButton} type="button" onClick={onReview}>ثبت بازبینی و پاسخ ChatGPT</button><button className={styles.secondaryButton} type="button" onClick={()=>onAsset(decision.accountId,decision.positionId)}>پرونده دارایی</button><button className={styles.outlineButton} type="button" onClick={onReport}>آماده‌سازی گزارش</button></div>
 </section><section className={styles.panel}><div className={styles.panelHead}><h2>بازبینی‌ها · {number(decision.reviews.length)}</h2><span>موعد بعدی: {decisionDue(decision)||'تعیین نشده'}</span></div>
 {decision.reviews.length? <div className={styles.journalHistory}>{decision.reviews.map(r=><article key={r.id}><div><strong>{r.date}</strong><span>فرض معتبر؟ {verdicts[r.thesisValid]} · پایبندی؟ {verdicts[r.followedPlan]}</span></div><p>{r.note}</p>{(r.actualOutcomeCents!=null||r.noActionOutcomeCents!=null)&&<p>نتیجه واقعی: <bdi>{signedMoney(r.actualOutcomeCents)}</bdi> · سناریوی بدون تغییر: <bdi>{signedMoney(r.noActionOutcomeCents)}</bdi>{r.actualOutcomeCents!=null&&r.noActionOutcomeCents!=null&&<> · تفاوت: <bdi>{signedMoney(r.actualOutcomeCents-r.noActionOutcomeCents)}</bdi></>}</p>}{r.evidence&&<p>مبنای مقایسه: {r.evidence}</p>}{r.chatResponse&&<details><summary>پاسخ ذخیره‌شده ChatGPT</summary><p className={styles.preservedText}>{r.chatResponse}</p></details>}</article>)}</div>:<div className={styles.calmEmpty}><Icon name="review" size={32}/><strong>اولین بازبینی: {decision.reviewDate}</strong><p>در مرور، شواهد موافق و مخالف را ثبت کن؛ سود و زیان و کیفیت تصمیم را جدا بسنج.</p></div>}
 <p className={styles.footnote}>نتیجه واقعی و سناریوی بدون تغییر، مبالغی هستند که خودت با دوره، جریان نقد و هزینه‌های همسان ثبت می‌کنی؛ بازده تضمینی یا محاسبه خودکار نیستند.</p>
 </section></div>
}
