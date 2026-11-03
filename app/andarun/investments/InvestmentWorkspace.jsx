'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ACCOUNT_DEFINITIONS, reviewQueue } from '@/lib/investments/family.mjs'
import { number } from '@/lib/investments/portfolio.mjs'
import useFamilyPortfolio from './useFamilyPortfolio'
import useMarketData from './useMarketData'
import usePeriodProfit from './usePeriodProfit'
import useTransactionLedger from './useTransactionLedger'
import LedgerWorkspace from './LedgerWorkspace'
import EntryDialog from './EntryDialog'
import {CashPlanDialog} from './CashPlans'
import useVisitChanges from './useVisitChanges'
import VisitChanges from './VisitChanges'
import MarketRefresh from './MarketRefresh'
import AssetProfile from './AssetProfile'
import DecisionWorkspace, { DecisionDialog } from './DecisionWorkspace'
import HoldingsImportDialog from './HoldingsImportDialog'
import MarketEventDialog from './MarketEventDialog'
import FamilyOverview from './FamilyOverview'
import AccountWorkspace from './AccountWorkspace'
import TradeWorkspace from './TradeWorkspace'
import WeeklyReview from './WeeklyReview'
import FamilyReport from './FamilyReport'
import PositionDialog from './PositionDialog'
import { ExecutionDialog, TradeReviewDialog } from './TradeDialogs'
import { SnapshotDialog, AccountDetailsDialog, BackupDialog } from './AccountDialogs'
import { DecisionJournal, DataWorkspace } from './WorkspaceExtras'
import Icon from './InvestmentIcon'
import styles from './investments.module.css'

const SECTIONS = [['accounts', 'نمای کلی', 'overview'], ['ledger', 'تراکنش‌ها', 'source'], ['weekly', 'مرور هفتگی', 'calendar'], ['journal', 'دفتر تصمیم‌ها', 'journal'], ['report', 'گزارش برای ChatGPT', 'report']]

export function download(content, name, type) {
  const url = URL.createObjectURL(new Blob([content], { type: `${type};charset=utf-8` }))
  const anchor = document.createElement('a')
  anchor.href = url; anchor.download = name; document.body.appendChild(anchor); anchor.click(); anchor.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export default function InvestmentWorkspace() {
  const [section, setSection] = useState('accounts')
  const [profitSelection, setProfitSelection] = useState({mode:'current'})
  const [ledgerAccountId, setLedgerAccountId] = useState('all')
  const [ledgerView, setLedgerView] = useState('transactions')
  const [accountId, setAccountId] = useState('self')
  const [tradeId, setTradeId] = useState(null)
  const [createTrade, setCreateTrade] = useState(false)
  const [dialog, setDialog] = useState(null)
  const [toast, setToast] = useState('')
  const [reportAccountId, setReportAccountId] = useState(null)
  const [reportPositionId, setReportPositionId] = useState(null)
  const [positionId, setPositionId] = useState(null)
  const [decisionId, setDecisionId] = useState(null)
  const store = useFamilyPortfolio(setToast)
  const state = store.state
  const ledger = useTransactionLedger(!!state)
  useEffect(()=>{if(ledger.loaded&&store.cloud&&!store.offline&&!store.conflict)store.synchronizeLedger(ledger.transactions)},[ledger.loaded,ledger.transactions,store.cloud,store.offline,store.conflict])
  const marketData = useMarketData(state)
  const profitPeriod = usePeriodProfit(state?.accounts,ledger,marketData,profitSelection,!!state?.settings?.isinPricesEnabled && ['accounts','account'].includes(section))
  const visit = useVisitChanges(state, marketData.markets)
  const account = state?.accounts.find(a => a.id === accountId)
  const trade = state?.trades.find(t => t.id === tradeId)
  const position = account?.positions.find(p => p.id === positionId)
  const decision = state?.decisions.find(d => d.id === decisionId)
  useEffect(() => { if (!toast) return; const timer = setTimeout(() => setToast(''), 5500); return () => clearTimeout(timer) }, [toast])

  function navigate(next) { setSection(next); window.scrollTo({ top: 0, behavior: 'instant' }) }
  function openLedger(id = 'all', view = 'transactions') { setLedgerAccountId(id); setLedgerView(view); navigate('ledger') }
  function newEntry(id=accountId,kind='BUY',amount='',plan=null){setDialog({kind:'entry',accountId:id,entryKind:kind,amount,plan})}
  function editCashPlan(plan=null,id=accountId){setDialog({kind:'cashPlan',plan,accountId:id})}
  function postCashPlan(plan){newEntry(plan.accountId,'DEPOSIT',(plan.amountCents/100).toFixed(2),plan)}
  function enableIsinPrices() {
    if (window.confirm('برای دریافت قیمت، فقط شناسه عمومی ISIN ابزارهای سبد به Onvista ارسال می‌شود؛ نام صاحبان حساب، تعداد و مبالغ ارسال نمی‌شوند. دریافت خودکار فعال شود؟')) store.change({...state,settings:{...state.settings,isinPricesEnabled:true}})
  }
  function openAccount(id, add = false) { setAccountId(id); navigate('account'); if (add) setDialog({ kind: 'position', accountId: id, position: null }) }
  function newTrade() { setTradeId(null); setCreateTrade(true); navigate('trades') }
  function openTrade(id) { setTradeId(id); setCreateTrade(false); navigate('trades') }
  function openReport(id = null, asset = null) { setReportAccountId(id); setReportPositionId(asset); navigate('report') }
  function openAsset(owner, asset) { setAccountId(owner); setPositionId(asset); navigate('asset') }
  function openDecision(id) { setDecisionId(id); navigate('decision') }
  function newDecision(owner = accountId, asset = null) { setDialog({ kind: 'decision', accountId: owner, positionId: asset }) }
  function savePosition(position) {
    store.changeAccount(dialog.accountId, current => ({ ...current, positions: current.positions.some(p => p.id === position.id) ? current.positions.map(p => p.id === position.id ? position : p) : [...current.positions, position] }))
    setDialog(null); setToast('دارایی در حساب خودش ثبت شد.')
  }
  function addTrade(value) {
    store.change({ ...state, trades: [...state.trades, value] })
    setTradeId(value.id); setCreateTrade(false); setToast('برنامه اولیه ثبت شد؛ اجرا و بازبینی را جدا به آن اضافه کن.')
  }
  function addJournalRecord(field, value) {
    store.change({ ...state, trades: state.trades.map(t => t.id === tradeId ? { ...t, [field]: [...t[field], value] } : t) })
    setDialog(null); setToast(field === 'reviews' ? 'بازبینی به سابقه تصمیم اضافه شد.' : 'سابقه اجرای واقعی ثبت شد.')
  }
  const title = section === 'asset' ? 'پرونده دارایی' : section === 'decision' ? 'پرونده تصمیم' : section === 'account' ? `حساب ${account?.owner || ''}` : section === 'trades' ? 'معاملات XTB' : section === 'data' ? 'داده و پشتیبان' : section === 'accounts' ? 'نمای کلی سرمایه' : SECTIONS.find(([key]) => key === section)?.[1]
  const subtitle = section === 'asset' ? `${account?.owner || ''} · ${position?.name || ''}` : section === 'accounts' ? 'حساب‌های خانواده · Trade Republic' : section === 'account' ? 'Trade Republic · EUR' : section === 'trades' ? 'برنامه، اجرا، بازبینی' : section === 'report' ? 'بسته انتخابی برای گفت‌وگو در حساب شخصی‌ات' : 'سابقه روشن برای تصمیم‌های بعدی'
  const due = state ? reviewQueue(state) : []

  return <main id="investment-workspace" className={`${styles.workspace} ${section==='accounts'?styles.overviewMode:''}`} dir="rtl" lang="fa">
    <aside className={styles.sidebar} aria-label="ناوبری سرمایه"><Link href="/andarun/investments" className={styles.brand}>سرمایه<span lang="en">FAMILY & TRADING</span></Link>
      <nav className={styles.navigation}>{SECTIONS.map(([key, label, icon]) => <button type="button" key={key} aria-current={section === key ? 'page' : undefined} className={section === key ? styles.navActive : ''} onClick={() => key === 'report' ? openReport() : key === 'ledger' ? openLedger() : navigate(key)}><Icon name={icon} size={19} /><span>{label}</span>{key === 'weekly' && due.length > 0 && <small>{number(due.length)}</small>}</button>)}{section==='accounts' && <button type="button" className={styles.mobileTrading} onClick={() => navigate('trades')}><Icon name="trading" size={19}/><span>معاملات XTB</span></button>}</nav>
      <div className={styles.sidebarAccounts}><p>حساب‌های خانواده</p>{ACCOUNT_DEFINITIONS.map(definition => <button type="button" key={definition.id} className={['account','asset'].includes(section) && accountId === definition.id ? styles.accountNavActive : ''} onClick={() => openAccount(definition.id)}><span style={{ '--account-color': definition.color }}>{definition.initials}</span>{definition.owner}</button>)}</div>
      <button type="button" className={`${styles.xtbNav} ${section === 'trades' ? styles.navActive : ''}`} onClick={() => navigate('trades')}><Icon name="trading" size={20} /><span>معاملات <bdi lang="en">XTB</bdi></span><Icon name="arrow" size={15} /></button>
      <div className={styles.sidebarBottom}><button type="button" className={styles.dataLink} onClick={() => navigate('data')}><Icon name="source" size={15} />داده و پشتیبان</button><Link href="/andarun" className={styles.backLink}><Icon name="arrow" size={16} />بازگشت به Andarun</Link></div>
    </aside>
    <div className={styles.content}><header className={styles.header}><div><h1>{title}</h1><p>{subtitle}</p></div><div className={styles.headerActions}>{state && <>{section==='accounts'?<button type="button" className={styles.primaryButton} onClick={()=>newEntry('self')}><Icon name="plus" size={17}/>ثبت تراکنش</button>:section === 'trades' ? <button type="button" className={styles.primaryButton} onClick={newTrade}><Icon name="plus" size={16} />ثبت برنامه معامله</button> : <button type="button" className={styles.outlineButton} onClick={() => download(JSON.stringify(state, null, 2), 'family-investment-backup.json', 'application/json')}><Icon name="download" size={15} />خروجی پشتیبان</button>}{store.dirty && <button type="button" className={styles.secondaryButton} disabled={store.saving || store.conflict} onClick={store.save}>{store.saving ? 'در حال ذخیره…' : 'ذخیره تغییرات'}</button>}</>}</div></header>
      {!state ? <section className={styles.loading} role="status"><Icon name={store.error ? 'warning' : 'wallet'} size={35} /><h2>{store.error || 'در حال بارگذاری حساب‌های خصوصی…'}</h2>{store.error && <Link href="/andarun/login" className={styles.primaryButton}>ورود به Andarun</Link>}</section> : <>
        {store.offline && <section className={styles.conflictNotice} role="status"><p>{store.error || 'نسخه ذخیره‌شده مرورگر نمایش داده می‌شود؛ اتصال سرور در حال بررسی است.'}</p><button type="button" className={styles.secondaryButton} onClick={() => window.location.reload()}>بررسی دوباره اتصال</button></section>}
        {store.conflict && <section className={styles.conflictNotice} role="alert"><p>نسخه سرور با پیش‌نویس این مرورگر متفاوت است. ابتدا از تغییراتت پشتیبان بگیر.</p><button type="button" className={styles.secondaryButton} onClick={() => download(JSON.stringify(state, null, 2), 'family-local-draft.json', 'application/json')}>دانلود پیش‌نویس</button><button type="button" className={styles.secondaryButton} onClick={() => { if (window.confirm('پس از پشتیبان، پیش‌نویس مرورگر کنار گذاشته و نسخه سرور بارگذاری شود؟')) store.discardDraft() }}>بارگذاری نسخه سرور</button></section>}
        {section!=='accounts'&&<MarketRefresh marketData={marketData} state={state} />}
        {section==='weekly' && <VisitChanges state={state} markets={marketData.markets} visit={visit} onAsset={openAsset} onWeekly={() => navigate('weekly')} />}
        {section === 'ledger' && <LedgerWorkspace state={state} onPlan={editCashPlan} onPostPlan={postCashPlan} onEntry={newEntry} key={`${ledgerAccountId}:${ledgerView}`} ledger={ledger} initialAccount={ledgerAccountId} initialView={ledgerView} download={download} notify={setToast}/>}
        {section === 'accounts' && <FamilyOverview profitSelection={profitSelection} onProfitSelection={setProfitSelection} profitPeriod={profitPeriod} onEnablePrices={enableIsinPrices} marketData={marketData} ledger={ledger} onLedger={openLedger} state={state} onAccount={openAccount} />}
        {section === 'account' && <AccountWorkspace profitSelection={profitSelection} onProfitSelection={setProfitSelection} profitPeriod={profitPeriod} cashPlans={state.settings.cashPlans} onPlan={editCashPlan} onPostPlan={postCashPlan} onEntry={newEntry} key={accountId} account={account} ledger={ledger} onLedger={() => openLedger(accountId)} markets={marketData.markets} onEdit={position => setDialog({ kind: 'position', accountId, position })} onAdd={() => setDialog({ kind: 'position', accountId, position: null })} onDetails={() => setDialog({ kind: 'details', accountId })} onSnapshot={() => setDialog({ kind: 'snapshot', accountId })} onReport={() => openReport(accountId)} onOpen={p => openAsset(accountId,p.id)} onImport={() => setDialog({kind:'csv',accountId})} />}
        {section === 'trades' && <TradeWorkspace trades={state.trades} settings={state.settings} onSettings={settings => store.change({...state,settings})} dueCount={due.length} selectedId={tradeId} onSelect={setTradeId} createOpen={createTrade} onCreateOpen={setCreateTrade} onCreate={addTrade} onExecution={kind => setDialog({ kind: 'execution', executionKind: kind })} onReview={() => setDialog({ kind: 'review' })} />}
        {section === 'journal' && <DecisionJournal state={state} onSelect={openTrade} onDecision={openDecision} onNew={() => newDecision()} onNewTrade={newTrade} />}
        {section === 'decision' && decision && <DecisionWorkspace decision={decision} state={state} onAsset={openAsset} onReview={() => setDialog({kind:'decisionReview'})} onReport={() => openReport(decision.accountId,decision.positionId)} />}
        {section === 'asset' && <AssetProfile key={`${accountId}:${positionId}`} account={account} position={position} state={state} marketData={marketData} onEdit={p => setDialog({kind:'position',accountId,position:p})} onConnect={symbol => store.changeAccount(accountId,a=>({...a,positions:a.positions.map(p=>p.id===positionId?{...p,marketSymbol:symbol,marketConfirmed:true}:p)}))} onChartConnect={symbol => store.changeAccount(accountId,a=>({...a,positions:a.positions.map(p=>p.id===positionId?{...p,tradingViewSymbol:symbol}:p)}))} onDecision={() => newDecision(accountId,positionId)} onOpenDecision={openDecision} onEvent={() => setDialog({kind:'event'})} onReport={() => openReport(accountId,positionId)} />}
        {section === 'weekly' && <WeeklyReview state={state} marketData={marketData} onTrade={openTrade} onDecision={openDecision} onAsset={openAsset} onAccount={openAccount} onNewTrade={newTrade} onReport={() => openReport()} onEventDone={id=>store.change({...state,events:state.events.map(e=>e.id===id?{...e,done:true}:e)})} />}
        {section === 'report' && <FamilyReport key={`${reportAccountId || 'all'}:${reportPositionId || 'all'}`} state={state} initialAccountId={reportAccountId} initialPositionId={reportPositionId} markets={marketData.markets} download={download} notify={setToast} />}
        {section === 'data' && <DataWorkspace onLedger={() => openLedger()} state={state} store={store} onAccount={openAccount} onBackup={() => setDialog({ kind: 'backup' })} download={download} />}
        <footer className={styles.footer}><button type="button" onClick={() => navigate('data')}><span className={store.cloud ? styles.onlineDot : styles.localDot} />{store.storageError ? 'ذخیره مرورگر مشکل دارد؛ پشتیبان بگیر' : store.saving ? 'در حال ذخیره خودکار…' : store.dirty && store.cloud ? 'نسخه مرورگر محفوظ؛ در انتظار سرور' : store.cloud ? 'ذخیره خصوصی در سرور' : 'ذخیره محلی مرورگر'}</button>{section === 'accounts' && <Link href="/andarun" className={styles.mobileBack}>بازگشت به Andarun</Link>}</footer>
      </>}
    </div>
    {dialog?.kind === 'cashPlan' && <CashPlanDialog plan={dialog.plan} accountId={dialog.accountId} onClose={()=>setDialog(null)} onSave={plan=>{store.change({...state,settings:{...state.settings,cashPlans:[...state.settings.cashPlans.filter(p=>p.id!==plan.id),plan]}});setDialog(null);setToast('برنامه واریز ذخیره شد.')}}/>}
    {dialog?.kind === 'entry' && <EntryDialog state={state} ledger={ledger} initialAccount={dialog.accountId} initialKind={dialog.entryKind} initialAmount={dialog.amount} plan={dialog.plan} onClose={()=>setDialog(null)} onSaved={async result=>{setDialog(null);setToast(result.added?'تراکنش ثبت شد.':'این تراکنش قبلاً ثبت شده است.');const fresh=await ledger.reload();if(fresh)store.synchronizeLedger(fresh.transactions)}}/>}
    {dialog?.kind === 'csv' && <HoldingsImportDialog account={state.accounts.find(a=>a.id===dialog.accountId)} onClose={()=>setDialog(null)} download={download} onSave={next=>{store.changeAccount(dialog.accountId,()=>next);setDialog(null);setToast('دارایی‌های CSV در همین حساب ثبت شدند.')}} />}
    {dialog?.kind === 'event' && position && <MarketEventDialog accountId={accountId} position={position} onClose={()=>setDialog(null)} onSave={event=>{store.change({...state,events:[...state.events,event]});setDialog(null);setToast('رویداد در مرور هفتگی قرار گرفت.')}} />}
    {dialog?.kind === 'decision' && <DecisionDialog state={state} accountId={dialog.accountId} positionId={dialog.positionId} onClose={()=>setDialog(null)} onSave={value=>{store.change({...state,decisions:[...state.decisions,value]});setDialog(null);openDecision(value.id);setToast('تصمیم اولیه ثبت شد.')}} />}
    {dialog?.kind === 'decisionReview' && decision && <TradeReviewDialog investment trade={decision} onClose={()=>setDialog(null)} onSave={value=>{store.change({...state,decisions:state.decisions.map(d=>d.id===decisionId?{...d,reviews:[...d.reviews,value]}:d)});setDialog(null);setToast('بازبینی به پرونده تصمیم اضافه شد.')}} />}
    {dialog?.kind === 'position' && <PositionDialog account={state.accounts.find(a => a.id === dialog.accountId)} position={dialog.position} onClose={() => setDialog(null)} onSave={savePosition} onDelete={id => { store.changeAccount(dialog.accountId, a => ({ ...a, positions: a.positions.filter(p => p.id !== id) })); setDialog(null); setToast('دارایی از همین حساب حذف شد؛ ثبت‌های تاریخی حفظ شدند.') }} />}
    {dialog?.kind === 'snapshot' && <SnapshotDialog account={account} onClose={() => setDialog(null)} onSave={snapshot => { store.changeAccount(accountId, a => ({ ...a, snapshotDate: snapshot.asOf, positions: a.positions.map(p=>({...p,asOf:snapshot.asOf})), snapshots: [...a.snapshots, snapshot] })); setDialog(null); setToast('وضعیت تاریخ‌دار حساب ثبت شد.') }} />}
    {dialog?.kind === 'details' && <AccountDetailsDialog firstDate={ledger.transactions.filter(t=>t.accountId===account.id).map(t=>t.date).sort()[0]} account={account} onClose={() => setDialog(null)} onSave={next => { store.changeAccount(accountId, () => next); setDialog(null); setToast('مشخصات همین حساب به‌روز شد.') }} />}
    {dialog?.kind === 'execution' && trade && <ExecutionDialog trade={trade} kind={dialog.executionKind} onClose={() => setDialog(null)} onSave={event => addJournalRecord('executions', event)} />}
    {dialog?.kind === 'review' && trade && <TradeReviewDialog trade={trade} onClose={() => setDialog(null)} onSave={event => addJournalRecord('reviews', event)} />}
    {dialog?.kind === 'backup' && <BackupDialog state={state} onClose={() => setDialog(null)} download={download} onImport={next => { store.change(next); setDialog(null); setToast('پشتیبان با حفظ سابقه وارد شد.') }} />}
    {toast && <div className={styles.toast} role="status"><span>{toast}</span><button type="button" className={styles.iconButton} aria-label="بستن پیام" onClick={() => setToast('')}><Icon name="close" size={15} /></button></div>}
  </main>
}
