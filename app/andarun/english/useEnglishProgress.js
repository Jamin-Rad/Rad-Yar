'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { emptyState, readState, mergeState, STORAGE_KEY, LEGACY_STORAGE_KEY } from './courseEngine'

const equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b)
export default function useEnglishProgress() {
 const [state,setState]=useState(emptyState)
 const [loaded,setLoaded]=useState(false)
 const [syncStatus,setSyncStatus]=useState('loading')
 const [storageWarning,setStorageWarning]=useState('')
 const current=useRef(state),busy=useRef(false),active=useRef(false),needsSync=useRef(false)
 const update=useCallback(fn=>{
   const next=typeof fn==='function'?fn(current.current):fn
   if(equal(next,current.current))return
   current.current=next;setState(next);setSyncStatus('pending');if(busy.current)needsSync.current=true
 },[])
 const sync=useCallback(async()=>{
   if(busy.current||!active.current)return
   busy.current=true;setSyncStatus('saving')
   try {
     const response=await fetch('/api/andarun/english',{cache:'no-store',signal:AbortSignal.timeout(10000)})
     if(!response.ok)throw Error('Read failed')
     let remote=await response.json()
     for(let retry=0;retry<3;retry++){
       const merged=mergeState(current.current,remote.state)
       if(!active.current)return
       if(!equal(merged,current.current))update(merged)
       if(equal(merged,readState(remote.state))){setSyncStatus('saved');return}
       const saved=await fetch('/api/andarun/english',{
         method:'PUT',headers:{'Content-Type':'application/json'},signal:AbortSignal.timeout(10000),
         body:JSON.stringify({state:merged,revision:remote.revision})
       })
       const payload=await saved.json()
       if(saved.status===409){remote=payload;continue}
       if(!saved.ok)throw Error('Save failed')
       if(!active.current)return
       // Edits made while the request was in flight remain in the next sync.
       const combined=mergeState(current.current,payload.state)
       if(!equal(combined,current.current))update(combined)
       setSyncStatus(equal(combined,readState(payload.state))?'saved':'pending')
       return
     }
     throw Error('Conflict retry required')
   }catch{if(active.current)setSyncStatus('offline')}
   finally{busy.current=false;if(needsSync.current&&active.current){needsSync.current=false;setTimeout(sync,150)}}
 },[update])
 useEffect(()=>{
   active.current=true
   try {
     const raw=localStorage.getItem(STORAGE_KEY)||localStorage.getItem(LEGACY_STORAGE_KEY)
     if(raw)update(readState(JSON.parse(raw)))
   }catch{setStorageWarning('Local progress could not be read. Checking your online copy.')}
   setLoaded(true)
   const timer=setTimeout(sync,0),interval=setInterval(sync,30000)
   const focus=()=>{if(document.visibilityState==='visible')sync()}
   window.addEventListener('online',sync);document.addEventListener('visibilitychange',focus);window.addEventListener('focus',sync)
   return ()=>{active.current=false;clearTimeout(timer);clearInterval(interval);window.removeEventListener('online',sync);window.removeEventListener('focus',sync);document.removeEventListener('visibilitychange',focus)}
 },[sync,update])
 useEffect(()=>{
   if(!loaded)return
   try {localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}
   catch{setStorageWarning('Local storage is unavailable. Please check your online save status.')}
   const timer=setTimeout(sync,700)
   return ()=>clearTimeout(timer)
 },[state,loaded,sync])
 return {state,update,loaded,syncStatus,storageWarning,sync}
}
