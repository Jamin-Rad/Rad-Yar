'use client'
import { useEffect, useRef, useState } from 'react'
import styles from './page.module.css'

export default function LessonAudio({ lesson, onActive }) {
 const [status,setStatus]=useState('idle'),[index,setIndex]=useState(0),[rate,setRate]=useState(0.9)
 const [voices,setVoices]=useState([]),[voice,setVoice]=useState(''),[source,setSource]=useState('auto')
 const [message,setMessage]=useState('')
 const playback=useRef({token:0,audio:null,abort:null,utterance:null,remote:true,cache:new Map()})
 const runRef=useRef(null),rateRef=useRef(rate)
 function stop(clear=true) {
   const p=playback.current;p.token++;p.abort?.abort();p.audio?.pause();p.audio=null
   window.speechSynthesis?.cancel()
   if(clear){setStatus('idle');onActive(-1)}
 }
 useEffect(()=>{
   const synth=window.speechSynthesis
   const load=()=>setVoices((synth?.getVoices()||[]).filter(v=>v.lang.startsWith('en')))
   load();synth?.addEventListener('voiceschanged',load)
   return ()=>{synth?.removeEventListener('voiceschanged',load);stop(false);for(const url of playback.current.cache.values())URL.revokeObjectURL(url)}
   // The player is mounted separately for each lesson.
   // eslint-disable-next-line react-hooks/exhaustive-deps
 },[])
 async function run(i) {
   stop(false)
   const p=playback.current,token=p.token
   setIndex(i);onActive(i);setMessage('');setStatus('loading')
   const ended=()=>{if(p.token!==token)return;if(i+1<lesson.paragraphs.length)runRef.current(i+1);else{setStatus('idle');onActive(-1)}}
   if(source==='auto'&&p.remote){
     try {
       let url=p.cache.get(i)
       if(!url){
         p.abort=new AbortController()
         const response=await fetch('/english/'+lesson.id+'/paragraph-'+(i+1)+'.mp3',{signal:p.abort.signal})
         if(!response.ok)throw Error('Remote unavailable')
         const blob=await response.blob()
         if(p.token!==token)return
         url=URL.createObjectURL(blob);p.cache.set(i,url)
       }
       if(p.token!==token)return
       const audio=new Audio(url);p.audio=audio;audio.playbackRate=rateRef.current
       audio.onended=ended
       audio.onerror=()=>{if(p.token===token){setStatus('idle');setMessage('پخش فایل ممکن نشد؛ صدای مرورگر را انتخاب کن.');onActive(-1)}}
       await audio.play()
       if(p.token===token){setStatus('playing');setMessage('صدای طبیعی آماده')}
       return
     }catch(error){
       if(p.token!==token||error.name==='AbortError')return
       p.remote=false
       setMessage('فایل صوتی در دسترس نیست؛ پخش با صدای مرورگر.')
     }
   }
   if(!window.speechSynthesis||!window.SpeechSynthesisUtterance){setStatus('idle');onActive(-1);setMessage('این مرورگر پخش گفتار را پشتیبانی نمی‌کند.');return}
   const utterance=new SpeechSynthesisUtterance(lesson.paragraphs[i].replaceAll('**',''))
   utterance.lang='en-GB';utterance.rate=rateRef.current
   const selected=voices.find(v=>v.voiceURI===voice)||voices.find(v=>v.lang==='en-GB')||voices[0]
   if(selected)utterance.voice=selected
   p.utterance=utterance;utterance.onend=ended
   utterance.onerror=event=>{if(p.token===token&&event.error!=='interrupted'&&event.error!=='canceled'){setStatus('idle');onActive(-1);setMessage('پخش مرورگر انجام نشد؛ یک صدای انگلیسی دیگر را امتحان کن.')}}
   window.speechSynthesis.speak(utterance);setStatus('playing')
   if(source==='browser')setMessage('صدای مرورگر')
 }
 runRef.current=run
 function toggle(){
   const p=playback.current
   if(status==='playing'){if(p.audio)p.audio.pause();else window.speechSynthesis?.pause();setStatus('paused')}
   else if(status==='paused'){
     if(p.audio)p.audio.play().then(()=>setStatus('playing')).catch(()=>{setStatus('idle');setMessage('برای پخش دوباره دکمهٔ شروع را بزن.')})
     else {window.speechSynthesis?.resume();setStatus('playing')}
   }else run(index)
 }
 return <section className={styles.audioPlayer} aria-label="پخش متن درس">
   <div className={styles.actions}>
     <button className={styles.primary} onClick={toggle} disabled={status==='loading'}>{status==='playing'?'مکث':status==='paused'?'ادامهٔ پخش':status==='loading'?'آماده‌سازی صدا…':'پخش متن'}</button>
     <button className={styles.secondary} onClick={()=>stop()}>توقف</button>
     <button className={styles.secondary} onClick={()=>run(index)}>تکرار بند</button>
   </div>
   <div className={styles.audioSettings}>
     <label>بند متن<select aria-label="بند متن" value={index} onChange={e=>{stop();setIndex(Number(e.target.value))}}>{lesson.paragraphs.map((_,i)=><option key={i} value={i}>بند {i+1}</option>)}</select></label>
     <label>سرعت<select aria-label="سرعت" value={rate} onChange={e=>{const value=Number(e.target.value);setRate(value);rateRef.current=value;if(playback.current.audio)playback.current.audio.playbackRate=value;else stop()}}>{[0.75,0.9,1,1.15].map(r=><option key={r} value={r}>{r}×</option>)}</select></label>
     <label>نوع صدا<select aria-label="نوع صدا" value={source} onChange={e=>{stop();setSource(e.target.value)}}><option value="auto">صدای طبیعی با جایگزین مرورگر</option><option value="browser">صدای مرورگر</option></select></label>
     {source==='browser'&&voices.length?<label>صدای انگلیسی<select aria-label="صدای انگلیسی" value={voice} onChange={e=>{stop();setVoice(e.target.value)}}><option value="">انتخاب خودکار</option>{voices.map(v=><option key={v.voiceURI} value={v.voiceURI}>{v.name}</option>)}</select></label>:null}
   </div>
   <p className={styles.muted} role="status">{message||'پخش بندبه‌بند؛ بند فعال در متن مشخص می‌شود.'}</p>
 </section>
}
