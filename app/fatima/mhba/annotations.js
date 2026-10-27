export function addAnnotation(highlights, next) {
  if (!next || !Number.isInteger(next.start) || !Number.isInteger(next.end) || next.end <= next.start || !next.text?.trim()) return highlights;
  const same = h => h.lessonId === next.lessonId && h.blockId === next.blockId && (h.tool || 'highlight') === next.tool;
  const touching = highlights.filter(h => same(h) && next.start < h.end && next.end > h.start);
  if (touching.some(h => h.start === next.start && h.end === next.end && (h.color || 'yellow') === next.color)) return highlights;
  // Keep existing notes/review cards when recoloring or extending a selection.
  const preserved = touching.find(h => h.note || h.reviewEnabled) || touching[0];
  const start = Math.min(next.start, ...touching.map(h => h.start));
  const end = Math.max(next.end, ...touching.map(h => h.end));
  const merged = {...preserved, ...next, start, end, text: next.sourceText.slice(start, end), id: preserved?.id || next.id, note: preserved?.note || '', created: preserved?.created || next.created};
  delete merged.sourceText;
  return [...highlights.filter(h => !touching.includes(h)), merged];
}

export function annotationRuns(text, blockId, highlights = [], offset = 0, sourceLength = text.length + offset) {
  const annotations = highlights.filter(h => h.blockId === blockId && Number.isInteger(h.start) && Number.isInteger(h.end) && h.start >= 0 && h.end <= sourceLength && h.end > h.start && h.start < offset+text.length && h.end > offset).map(h=>({...h,start:Math.max(0,h.start-offset),end:Math.min(text.length,h.end-offset)}));
  const boundaries = [...new Set([0, text.length, ...annotations.flatMap(h => [h.start, h.end])])].sort((a,b)=>a-b);
  return boundaries.slice(0,-1).map((start,i)=>({start,end:boundaries[i+1],text:text.slice(start,boundaries[i+1]),annotations:annotations.filter(h=>h.start<=start&&h.end>=boundaries[i+1])}));
}

export function glossaryEntries(vocabulary = []) {
  const entries = new Map();
  vocabulary.forEach(([term, meaning]) => term.split('|').forEach(variant => {
    const clean = variant.replace(/^(der|die|das|ein|eine)\s+/i,'').trim();
    if(clean.length>2) entries.set(clean.toLocaleLowerCase('de'), {term:clean,meaning});
  }));
  return [...entries.values()].sort((a,b)=>b.term.length-a.term.length);
}

export function glossaryParts(text, vocabulary = []) {
  const entries = glossaryEntries(vocabulary);
  if(!entries.length) return [{text}];
  const escape = s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const regex = new RegExp(`(?<![\\p{L}\\p{N}])(${entries.map(x=>escape(x.term)).join('|')})(?![\\p{L}\\p{N}])`,'giu');
  const meanings = new Map(entries.map(x=>[x.term.toLocaleLowerCase('de'),x.meaning]));
  const parts=[]; let end=0;
  for(const match of text.matchAll(regex)){
    if(match.index>end)parts.push({text:text.slice(end,match.index)});
    parts.push({text:match[0],meaning:meanings.get(match[0].toLocaleLowerCase('de'))});
    end=match.index+match[0].length;
  }
  if(end<text.length)parts.push({text:text.slice(end)});
  return parts;
}

export function eraseAnnotations(highlights,selection){
 const {lessonId,blockId,start,end,sourceText}=selection;
 if(!Number.isInteger(start)||!Number.isInteger(end)||end<=start)return highlights;
 return highlights.flatMap(h=>{
  if(h.lessonId!==lessonId||h.blockId!==blockId||h.end<=start||h.start>=end)return [h];
  const fragments=[];
  if(h.start<start)fragments.push({...h,end:start,text:sourceText.slice(h.start,start)});
  if(h.end>end)fragments.push({...h,id:fragments.length?`${h.id}-after-${end}`:h.id,start:end,text:sourceText.slice(end,h.end)});
  return fragments;
 });
}
