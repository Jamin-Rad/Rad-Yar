'use client'
import {useState} from 'react'
import {JournalDialog} from './TradeDialogs'
import styles from './investments.module.css'
export default function MarketEventDialog({accountId,position,onClose,onSave}){
 const [error,setError]=useState('')
 function submit(event){event.preventDefault();const form=new FormData(event.currentTarget);try{onSave({id:crypto.randomUUID(),accountId,positionId:position.id,title:String(form.get('title')),date:form.get('date'),url:String(form.get('url')||''),done:false})}catch(err){setError(err.message)}}
 return <JournalDialog title="رویداد مهم دارایی" description={`${position.name} · تاریخ و منبع را از اطلاعیه رسمی یا بررسی خودت ثبت کن.`} onClose={onClose} onSubmit={submit} error={error}><label className={styles.field}>عنوان<input name="title" required maxLength={160}/></label><label className={styles.field}>تاریخ<input name="date" type="date" required dir="ltr"/></label><label className={styles.field}>لینک منبع، اختیاری<input name="url" type="url" dir="ltr" placeholder="https://"/></label></JournalDialog>
}
