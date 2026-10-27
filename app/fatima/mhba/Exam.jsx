import React,{useState} from 'react';
import {statements,scoreStatements} from './exam.js';
import {statementTranslations,explanationsDe} from './statementTranslations.js';
import {extraChapterPractice} from './chapterPractice.js';
import {HighlightText,Icon} from './ui.jsx';
export default function Exam({lesson,chapterId,data,patch}){
 const [chapter,setChapter]=useState(()=>lesson.chapters.find(c=>c.id===chapterId&&(c.statementIds.length||extraChapterPractice[`${lesson.id}:${c.id}`]?.length))?.id||'all');
 const selectedChapter=lesson.chapters.find(c=>c.id===chapter);
 const indexes=selectedChapter?selectedChapter.statementIds:statements[lesson.id].map((_,i)=>i);
 const baseItems=indexes.map(index=>({...statements[lesson.id][index],fa:statementTranslations[lesson.id][index],whyDe:explanationsDe[lesson.id][index],sourceIndex:index}));
 const extras=chapter==='all'?Object.entries(extraChapterPractice).filter(([key])=>key.startsWith(lesson.id+':')).flatMap(([,qs])=>qs):extraChapterPractice[`${lesson.id}:${chapter}`]||[];
 const items=[...baseItems,...extras.map((q,i)=>({...q,sourceIndex:`extra-${chapter}-${i}`}))];
 const key=`${lesson.id}:${chapter}`;
 const practice=data.practice?.[key]||{answers:{},submitted:false};
 const update=fn=>patch(p=>({...p,practice:{...p.practice,[key]:fn(p.practice?.[key]||{answers:{},submitted:false})}}));
 const result=scoreStatements(items,practice.answers);
 return <section className="exam chapter-practice"><div className="section-top"><div><h2>صحیح / غلط · Richtig oder falsch</h2><p className="muted">فقط تمرین همین درس یا فصل؛ پاسخ‌ها خودکار ذخیره می‌شوند.</p></div><label>فصل <select aria-label="فصل تمرین صحیح و غلط" value={chapter} onChange={e=>setChapter(e.target.value)}><option value="all">همهٔ فصل‌های این درس</option>{lesson.chapters.filter(c=>c.statementIds.length||extraChapterPractice[`${lesson.id}:${c.id}`]?.length).map(c=><option key={c.id} value={c.id}>{c.fa}</option>)}</select></label></div>
 <p className="small muted">{items.length} گزارهٔ تألیفی · درست ۱+، غلط ۱−، بی‌پاسخ صفر.</p>
 {practice.submitted?<div className="result" role="status"><h3>{result.correct} درست · {result.wrong} غلط · {result.blank} بی‌پاسخ</h3><p>امتیاز تمرینی {result.score} از {items.length}</p><button className="outline" onClick={()=>update(()=>({answers:{},submitted:false}))}>تمرین دوباره</button></div>:null}
 {items.map((q,i)=><article className="statement" key={q.sourceIndex}><div className="statement-title"><span className="number">{String(i+1).padStart(2,'0')}</span><p className="de" lang="de" dir="ltr"><HighlightText text={q.text} blockId={`tf-${lesson.id}-${q.sourceIndex}`} data={data} vocabulary={lesson.vocabulary}/></p></div><p className="translation" lang="fa" dir="rtl">{q.fa}</p><div className="binary" role="group" aria-label={`گزاره ${i+1}`}>{[[true,'Richtig · صحیح'],[false,'Falsch · غلط'],[null,'بی‌پاسخ']].map(([value,label])=><button key={String(value)} disabled={practice.submitted} aria-pressed={(practice.answers[i]??null)===value} className={(practice.answers[i]??null)===value?'chosen':''} onClick={()=>update(p=>({...p,answers:{...p.answers,[i]:value}}))}>{label}</button>)}</div>{practice.submitted?<div className={'tf-answer '+(typeof practice.answers[i]!=='boolean'?'blank':practice.answers[i]===q.answer?'correct':'incorrect')}><b>{q.answer?'Richtig · صحیح':'Falsch · غلط'}</b><p lang="de" dir="ltr" className="de">{q.whyDe}</p><span>{q.why}</span></div>:null}</article>)}
 {!practice.submitted?<div className="exam-finish"><button className="primary" onClick={()=>{update(p=>({...p,submitted:true}));window.scrollTo({top:200,behavior:'smooth'});}}>بررسی پاسخ‌ها <Icon name="check"/></button></div>:null}
 </section>;
}
