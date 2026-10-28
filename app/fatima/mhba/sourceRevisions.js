// Offset-only repairs for two PDF extraction artifacts; keep personal marks attached.
export const SOURCE_REVISION=2;
export const sourceEdits=[{"blockId": "original-5-9", "start": 1807, "remove": 2, "insert": ""}, {"blockId": "original-5-15", "start": 1646, "remove": 0, "insert": "-"}];
export function rebaseSourceAnnotation(mark,edit){
 const from=edit.start,to=from+edit.remove,delta=edit.insert.length-edit.remove;
 const map=(offset,side)=>{
  if(edit.remove===0)return offset>from||offset===from&&side==='start'?offset+delta:offset;
  if(offset<=from)return offset;
  if(offset>=to)return offset+delta;
  return from;
 };
 const start=map(mark.start,'start'),end=map(mark.end,'end');
 let text=mark.text;
 if(typeof text==='string'){
  if(edit.remove===0&&from>mark.start&&from<mark.end){const at=from-mark.start;text=text.slice(0,at)+edit.insert+text.slice(at);}
  else if(edit.remove>0&&from<mark.end&&to>mark.start){const a=Math.max(0,from-mark.start),b=Math.min(text.length,to-mark.start);text=text.slice(0,a)+edit.insert+text.slice(b);}
 }
 return {...mark,start,end,text,sourceRevision:SOURCE_REVISION};
}
export function migrateSourceAnnotations(notebook){
 if(!Array.isArray(notebook?.highlights))return notebook;
 let changed=false;
 const highlights=notebook.highlights.flatMap(mark=>{
  const edit=sourceEdits.find(e=>mark.lessonId===5&&mark.blockId===e.blockId);
  if(!edit||mark.sourceRevision>=SOURCE_REVISION)return [mark];
  changed=true;const repaired=rebaseSourceAnnotation(mark,edit);
  return repaired.end>repaired.start&&repaired.text?.trim()?[repaired]:[];
 });
 return changed?{...notebook,highlights}:notebook;
}
