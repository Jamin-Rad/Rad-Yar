'use client'
import {useCallback,useEffect,useRef,useState} from 'react'
export default function useTransactionLedger(enabled){
 const [data,setData]=useState({transactions:[],imports:[]}),[loading,setLoading]=useState(false),[error,setError]=useState(''),[loaded,setLoaded]=useState(false)
 const alive=useRef(false),pending=useRef(null)
 useEffect(()=>{alive.current=true;return()=>{alive.current=false}},[])
 const reload=useCallback(()=>{
  if(pending.current)return pending.current
  const task=(async()=>{
   if(alive.current){setLoading(true);setError('')}
   try{
    const response=await fetch('/api/andarun/investments/ledger',{cache:'no-store'})
    const result=await response.json();if(!response.ok)throw Error(result.error||'تراکنش‌ها دریافت نشدند.')
    if(alive.current){setData(result);setLoaded(true)}
    return result
   }catch(err){if(alive.current)setError(err.message);return null}
   finally{pending.current=null;if(alive.current)setLoading(false)}
  })()
  pending.current=task;return task
 },[])
 useEffect(()=>{if(enabled)reload()},[enabled,reload])
 return {...data,loading,error,loaded,reload}
}
