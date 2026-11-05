'use client'
import { useEffect, useMemo, useCallback } from 'react'
import { realizedProfit } from '@/lib/investments/realized-profit.mjs'
import { todayBerlin } from '@/lib/investments/family.mjs'
import { profitRange, periodPlan, periodProfit, periodInstruments, openPeriodPlan } from '@/lib/investments/period-profit.mjs'

export default function usePeriodProfit(accounts, ledger, marketData, selection, enabled) {
  const today = todayBerlin()
  const range = useMemo(()=>profitRange(selection,today),[selection,today])
  const plan = useMemo(()=>openPeriodPlan(periodPlan(accounts||[],ledger?.loaded?ledger.transactions:null,range)),[accounts,ledger?.loaded,ledger?.transactions,range])
  const instruments = useMemo(()=>periodInstruments(plan,today),[plan,today])
  const keys = JSON.stringify(instruments)
  const loadHistory = useCallback((manual = false)=>{
    if (selection.scope==='realized' || !enabled || !marketData?.load || !range || range.error) return
    let active = true, index = 0
    const rows = JSON.parse(keys)
    async function worker() {
      while (active && index<rows.length) {
        const row = rows[index++]
        await marketData.load('ISIN:'+row.isin,row.name,manual,true,row.historyDates)
      }
    }
    Promise.all(Array.from({length:Math.min(3,rows.length)},worker))
    return ()=>{active=false}
  },[keys,range,enabled,marketData?.load,selection.scope])
  useEffect(()=>loadHistory(),[loadHistory])
  // A previous retry must not make later range changes fetch automatically.
  const reload = useCallback(()=>{ loadHistory(true) },[loadHistory])
  const result = useMemo(()=>{const value=periodProfit(plan,marketData?.markets,Date.now(),today);return value?{...value,scope:'open'}:null},[plan,marketData?.markets,today])
  const loading = instruments.some(i=>marketData?.loading?.['ISIN:'+i.isin])
  const realized=useMemo(()=>realizedProfit(accounts||[],ledger?.loaded?ledger.transactions:null,Date.now(),today,range),[accounts,ledger?.loaded,ledger?.transactions,today,range])
  return {range,result,realized,loading,reload}
}
