'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ACCOUNT_DEFINITIONS } from '@/lib/investments/family.mjs'
import { number } from '@/lib/investments/portfolio.mjs'
import Icon from './InvestmentIcon'
import styles from './InvestmentNavigation.module.css'

const PRIMARY=[['accounts','نمای کلی','overview'],['ledger','تراکنش‌ها','transfer'],['weekly','مرور هفتگی','calendar']]
const ANALYSIS=[['journal','دفتر تصمیم‌ها','journal'],['report','گزارش برای ChatGPT','chat']]
export default function InvestmentNavigation({section,accountId,dueCount=0,onNavigate,onAccount}) {
  const [open,setOpen]=useState(false),panel=useRef(null),trigger=useRef(null)
  useEffect(()=>{
    const desktop=window.matchMedia('(min-width:1001px)')
    const resize=()=>{if(desktop.matches)setOpen(false)}
    desktop.addEventListener('change',resize)
    return ()=>desktop.removeEventListener('change',resize)
  },[])
  useEffect(()=>{
    if(!open)return
    const previous=document.activeElement,overflow=document.body.style.overflow
    document.body.style.overflow='hidden'
    const focusable=()=>[...panel.current.querySelectorAll('a[href],button:not([disabled])')].filter(el=>el.getClientRects().length)
    focusable()[0]?.focus()
    function keys(event){
      if(event.key==='Escape'){event.preventDefault();setOpen(false)}
      if(event.key==='Tab'){
        const items=focusable(),first=items[0],last=items.at(-1)
        if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus()}
        else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus()}
      }
    }
    document.addEventListener('keydown',keys)
    return ()=>{document.body.style.overflow=overflow;document.removeEventListener('keydown',keys);if(previous?.isConnected)previous.focus()}
  },[open])
  function go(key){setOpen(false);onNavigate(key)}
  function account(id){setOpen(false);onAccount(id)}
  function item([key,label,icon]){
    const active=section===key||section==='decision'&&key==='journal'
    return <button type="button" key={key} aria-current={active?'page':undefined} className={`${styles.item} ${active?styles.active:''}`} onClick={()=>go(key)}><Icon name={icon} size={19}/><span>{label}</span>{key==='weekly'&&dueCount>0&&<small className={styles.badge}>{number(dueCount)}</small>}</button>
  }
  return <>
    <div className={styles.mobileHeader}><span className={styles.mobileBrand}><Icon name="wallet" size={21}/>سرمایه</span><button ref={trigger} type="button" aria-expanded={open} aria-controls="investment-navigation" onClick={()=>setOpen(true)}><Icon name="menu" size={21}/>منو</button></div>
    {open&&<button type="button" tabIndex={-1} aria-label="بستن منوی سرمایه" className={styles.overlay} onClick={()=>setOpen(false)}/>}
    <aside ref={panel} id="investment-navigation" aria-label="منوی سرمایه" role={open?'dialog':undefined} aria-modal={open?'true':undefined} className={`${styles.sidebar} ${open?styles.open:''}`}>
      <div className={styles.brandRow}><Link href="/andarun/investments" className={styles.brand} onClick={event=>{if(!event.metaKey&&!event.ctrlKey){event.preventDefault();go('accounts')}}}><span className={styles.brandMark}><Icon name="wallet" size={24}/></span><span><strong>سرمایه</strong><small>حساب‌های خانواده</small></span></Link><button type="button" className={styles.close} aria-label="بستن منو" onClick={()=>setOpen(false)}><Icon name="close" size={20}/></button></div>
      <nav className={styles.group} aria-label="دسترسی‌های اصلی">{PRIMARY.map(item)}</nav>
      <nav className={styles.group} aria-label="حساب‌های خانواده"><h2>حساب‌ها <span lang="en">Trade Republic</span></h2>{ACCOUNT_DEFINITIONS.map(definition=>{
        const active=['account','asset'].includes(section)&&accountId===definition.id
        return <button type="button" key={definition.id} aria-current={active?'page':undefined} className={`${styles.item} ${styles.account} ${active?styles.active:''}`} onClick={()=>account(definition.id)}><span className={styles.avatar} style={{'--avatar-color':definition.color}}>{definition.initials}</span><span>{definition.owner}</span></button>
      })}</nav>
      <nav className={styles.group} aria-label="تحلیل و تصمیم"><h2>تحلیل و تصمیم</h2>{ANALYSIS.map(item)}</nav>
      <nav className={styles.group} aria-label="معاملات کوتاه‌مدت"><button type="button" aria-current={section==='trades'?'page':undefined} className={`${styles.item} ${section==='trades'?styles.active:''}`} onClick={()=>go('trades')}><span className={styles.xtb} lang="en">XTB</span><span>معاملات <bdi lang="en">XTB</bdi></span></button></nav>
      <div className={styles.utilities}>{item(['data','داده و پشتیبان','source'])}<Link href="/andarun" className={`${styles.item} ${styles.back}`}><Icon name="arrow" size={18}/><span>بازگشت به Andarun</span></Link></div>
    </aside>
  </>
}
