import React from 'react';

export default function StudyNotes({notes=[],compact=false}){
 if(!notes.length)return null;
 return <aside className="study-checked-notes" aria-label="توضیح‌های بررسی‌شده">{notes.map(note=>{
  const body=<><p lang="de" dir="ltr">{note.de}</p><p lang="fa" dir="rtl">{note.fa}</p>{note.sources.length?<nav aria-label="منبع توضیح">{note.sources.map(source=><a key={source.url} href={source.url} target="_blank" rel="noreferrer" dir="auto">{source.title} ↗</a>)}</nav>:null}</>;
  return compact?<details className="study-checked-note" key={note.id}><summary>توضیح بررسی‌شده: {note.title}</summary>{body}</details>:<section className="study-checked-note" key={note.id}><h4>توضیح اصلاحی · {note.title}</h4>{body}</section>;
 })}</aside>;
}
