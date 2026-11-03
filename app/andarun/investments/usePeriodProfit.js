'use client'
import { useEffect, useMemo, useState, useCallback } from 'react'
import { realizedProfit } from '@/lib/investments/realized-profit.mjs'
import { todayBerlin } from '@/lib/investments/family.mjs'
import { profitRange, periodPlan, periodProfit, periodInstruments } from '@/lib/investments/period-profit.mjs'

export default function usePeriodProfit(accounts, ledger, marketData, selection, enabled) {
  const today = todayBerlin()
  const range = useMemo(()=>profitRange(selection,today),[selection,today])
  const plan = useMemo(()=>periodPlan(accounts||[],ledger?.loaded?ledger.transactions:null,range),[accounts,ledger?.loaded,ledger?.transactions,range])
  const instruments = useMemo(()=>periodInstruments(plan,today),[plan,today])
  const keys = JSON.stringify(instruments)
  const [retry, setRetry] = useState(0)
  const reload = useCallback(()=>setRetry(v=>v+1),[])
  useEffect(()=>{
    if (!enabled || !marketData?.load || !range || range.error) return
    let active = true, index = 0
    const rows = JSON.parse(keys)
    async function worker() {
      while (active && index<rows.length) {
        const row = rows[index++]
        await marketData.load('ISIN:'+row.isin,row.name,retry>0,true,row.historyDates)
      }
    }
    Promise.all(Array.from({length:Math.min(3,rows.length)},worker))
    return ()=>{active=false}
  },[keys,range,enabled,marketData?.load,retry])
  const result = useMemo(()=>periodProfit(plan,marketData?.markets,Date.now(),today),[plan,marketData?.markets,today])
  const loading = instruments.some(i=>marketData?.loading?.['ISIN:'+i.isin])
  const realized=useMemo(()=>realizedProfit(accounts||[],ledger?.loaded?ledger.transactions:null,Date.now(),today),[accounts,ledger?.loaded,ledger?.transactions,today])
  return {range,result,realized,loading,reload}
}
