const escape=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const persian=s=>s.replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[Number(d)]);
function startOf(pages,id,language){
 if(id==='intro')return {page:1,offset:0};
 const pattern=id==='literatur'?(language==='de'?/^Literaturverzeichnis\s*:/m:/^فهرست منابع/m):id==='fragen'?(language==='de'?/^Kontrollfragen\s*:/m:/^سؤال‌های کنترلیِ خود جزوه/m):new RegExp(`^${escape(language==='de'?id:persian(id))}\\.?\\s`,'m');
 for(const page of pages){
  if(page.number<3)continue; // exclude the table of contents
  const text=language==='de'?page.text:page.fa;
  const match=text?.match(pattern);
  if(match)return {page:page.number,offset:match.index};
 }
 throw new Error(`Missing ${language} source chapter ${id}`);
}

export function createSourceChapters(pages,specs){
 const starts=specs.map(c=>({de:startOf(pages,c.sourceId||c.id,'de'),fa:startOf(pages,c.sourceId||c.id,'fa')}));
 return specs.map((spec,i)=>{
  const start=starts[i];const next=starts[i+1];
  if(start.de.page!==start.fa.page||next&&next.de.page!==next.fa.page)throw new Error('Bilingual chapter/page mismatch');
  const chunks=[];
  const last=next?.de.page||pages.length;
  for(let number=start.de.page;number<=last;number++){
   const original=pages[number-1];
   const deStart=number===start.de.page?start.de.offset:0;
   const faStart=number===start.fa.page?start.fa.offset:0;
   const deEnd=next&&number===next.de.page?next.de.offset:original.text.length;
   const faEnd=next&&number===next.fa.page?next.fa.offset:original.fa.length;
   const text=original.text.slice(deStart,deEnd);const fa=original.fa.slice(faStart,faEnd);
   if(text.trim()||fa.trim())chunks.push({key:`${spec.id}:${number}`,chapterId:spec.id,page:number,deStart,deEnd,faStart,faEnd,text,fa});
  }
  if(!chunks.length)throw new Error('Empty study chapter');
  return {...spec,start:chunks[0].page,end:chunks.at(-1).page,chunks};
 });
}

export function findSourceChunk(chunks,page=3,chapterId,offset,language='de'){
 const exact=chunks.findIndex(c=>c.page===page&&c.chapterId===chapterId);
 if(exact>=0)return exact;
 if(Number.isInteger(offset)){
  const match=chunks.findIndex(c=>c.page===page&&offset>=c[language+'Start']&&offset<c[language+'End']);
  if(match>=0)return match;
 }
 const candidates=chunks.map((c,i)=>({...c,index:i})).filter(c=>c.page===page);
 return candidates.at(-1)?.index||0;
}
