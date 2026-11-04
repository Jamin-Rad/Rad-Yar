// Versioned offset repairs; course text stays private and saved annotations remain attached.
export const SOURCE_REVISION=3;
const revisedOffsets=[
 [6,"official-answer-6.7",[[0,0,1240]]],
 [6,"official-answer-6.7-fa",[[0,0,847]]],
 [6,"original-6-5-fa",[[1557,1,1],[1554,2,4]]],
 [6,"original-6-7-fa",[[1080,4,3]]],
 [6,"original-6-13-fa",[[1231,0,133],[1214,4,3],[1210,3,4],[1199,4,1],[1196,2,3]]],
 [6,"original-6-14-fa",[[1049,0,32],[1048,0,19],[1045,2,1],[1044,0,15],[1041,1,25],[1039,1,5],[1035,0,7],[1032,2,4],[1030,1,0],[1028,0,56],[1026,0,7],[1025,0,10],[1014,4,1],[1011,2,3]]],
 [6,"original-6-20-fa",[[1280,2,1],[1279,0,3],[1274,1,1],[1269,1,1],[1231,1,0],[1229,1,13],[1228,0,3],[1215,1,1],[1204,1,1]]],
 [6,"original-6-21-fa",[[673,0,15],[665,3,1],[661,3,1],[653,7,0],[645,4,5]]],
 [6,"original-6-24-fa",[[1088,0,1],[1079,2,5],[1077,1,0],[1076,0,5],[1054,4,3],[1050,3,3],[1049,0,2],[1032,0,6],[1030,1,0],[1005,1,1],[990,1,1]]],
 [6,"original-6-33-fa",[[412,3,1],[410,1,9],[402,1,1],[0,4,0]]],
 [6,"original-6-39-fa",[[873,16,1],[856,14,1],[854,0,28],[812,37,0],[803,4,2],[778,24,0],[777,0,8],[762,1,1],[760,0,18],[754,0,1],[751,2,6],[734,13,1],[726,1,4],[707,1,2],[703,3,2],[629,59,0],[628,0,3],[626,0,13],[622,2,17],[612,1,1],[609,2,2],[599,7,0],[573,12,2],[550,17,0],[546,3,4],[535,3,0],[528,5,6],[514,6,1],[511,2,3],[500,3,0],[494,0,1],[482,1,1],[50,4,11],[48,1,4],[44,2,8]]],
 [6,"original-6-40-fa",[[1193,8,1],[1192,0,1],[1191,0,4],[1189,1,2]]],
 [6,"original-6-44-fa",[[1305,0,2],[1300,2,1],[1296,3,2],[1293,2,2],[1292,0,6],[1281,2,2],[1272,1,9],[1270,0,7],[1232,29,0],[1204,22,0],[1200,0,5],[1185,7,2],[1183,0,3],[1181,1,1],[1175,1,2],[1173,1,0],[1168,0,1]]],
 [6,"original-6-45-fa",[[107,12,1],[105,1,1],[73,27,0],[71,1,3],[69,0,16],[48,14,0],[42,5,1],[31,0,8],[26,1,1],[0,14,1]]],
 [6,"original-6-48-fa",[[1115,1,6],[1114,0,3],[1103,3,0],[1095,1,0],[1092,1,0],[1087,4,2],[1085,1,0],[1084,0,1],[1070,3,0],[1061,4,1],[1056,4,4],[1054,0,2],[1050,2,2],[1038,9,1],[1013,2,2],[1011,1,1],[994,13,0],[993,0,2],[976,0,1],[964,10,0],[947,8,0],[944,1,3],[941,1,4],[938,2,1],[906,1,1],[904,1,1],[899,2,4],[898,0,2],[897,0,2],[895,0,12],[891,0,5],[860,4,2],[824,34,0],[815,2,3],[807,0,1],[803,1,1],[801,1,1],[795,3,4],[793,1,4],[783,8,1],[781,1,6],[769,3,0],[753,14,1],[749,3,0],[745,0,5],[717,1,1],[715,1,1],[708,1,1],[696,2,1],[688,3,2],[672,4,2],[656,0,2],[641,13,2],[638,1,1],[618,19,1],[602,12,0],[582,19,1],[580,0,7],[462,101,0],[447,14,0],[446,0,2],[381,63,1],[367,13,0],[354,6,0],[351,1,1],[349,1,0],[346,1,1],[344,1,1],[325,0,166],[305,4,5],[296,1,0],[292,3,0],[285,6,0],[281,3,2],[279,1,1],[277,0,16],[266,2,1],[258,1,1],[256,1,1],[243,5,5],[233,0,12],[221,1,1],[214,1,1],[212,1,1]]],
 [7,"original-7-6-fa",[[237,10,0],[229,7,0],[223,2,7],[221,1,0],[217,3,0],[215,0,1],[214,0,2],[209,4,0],[207,1,4]]],
 [7,"original-7-13-fa",[[1551,1,1],[1545,2,1],[1541,3,1],[1536,1,1],[1532,3,1],[1527,1,1],[991,1,4],[990,0,1],[989,0,6],[987,1,12],[985,1,3],[980,1,1],[978,0,1],[970,1,2],[964,4,3],[962,1,1],[952,2,0],[948,3,1],[947,0,3],[944,0,59],[943,0,6],[897,33,0],[893,1,6],[874,17,0],[832,29,0],[821,9,1],[819,1,1],[817,1,0],[809,4,16],[803,5,0],[790,2,0],[786,3,0],[780,5,0],[777,2,4],[776,0,1],[756,13,0],[750,3,2],[748,1,0],[712,22,2],[708,3,3],[686,20,2],[674,1,0],[631,40,0],[627,3,1],[624,1,5],[622,0,2],[620,1,5],[618,1,11],[609,2,2],[606,2,5],[604,1,1],[584,18,0],[582,1,3],[566,4,0],[555,2,3],[552,1,4],[551,0,1],[534,10,1],[521,8,0],[513,2,0],[512,0,1],[506,3,0],[504,1,3],[496,5,0],[494,1,1],[492,1,0],[485,2,0],[482,2,1],[479,1,4],[469,1,1],[467,0,1],[429,22,0],[422,2,1],[420,1,0],[417,2,1],[400,3,1],[382,7,0],[377,0,1],[368,6,0],[354,0,3],[339,7,0],[328,8,4],[327,0,1],[321,1,0],[308,6,3],[286,3,0],[284,1,6],[272,7,0]]],
 [7,"original-7-21-fa",[[867,0,1],[864,2,2],[863,0,1],[857,0,1]]],
];
export const sourceEdits=[{"blockId":"original-5-9","start":1807,"remove":2,"insert":"","lessonId":5,"revision":2},{"blockId":"original-5-15","start":1646,"remove":0,"insert":"-","lessonId":5,"revision":2},...revisedOffsets.flatMap(([lessonId,blockId,edits])=>edits.map(([start,remove,insertLength])=>({lessonId,blockId,start,remove,insertLength,revision:3})))];
export function rebaseSourceAnnotation(mark,edit){
 const insert=edit.insert||'';const from=edit.start,to=from+edit.remove,delta=(edit.insertLength??insert.length)-edit.remove;
 const map=(offset,side)=>{
  if(edit.remove===0)return offset>from||offset===from&&side==='start'?offset+delta:offset;
  if(offset<=from)return offset;
  if(offset>=to)return offset+delta;
  return side==='end'?from+(edit.insertLength??insert.length):from;
 };
 const start=map(mark.start,'start'),end=map(mark.end,'end');
 let text=mark.text;
 if(typeof text==='string'){
  if(edit.remove===0&&from>mark.start&&from<mark.end){const at=from-mark.start;text=text.slice(0,at)+insert+text.slice(at);}
  else if(edit.remove>0&&from<mark.end&&to>mark.start){const a=Math.max(0,from-mark.start),b=Math.min(text.length,to-mark.start);text=text.slice(0,a)+insert+text.slice(b);}
 }
 return {...mark,start,end,text,sourceRevision:edit.revision||SOURCE_REVISION};
}
export function migrateSourceAnnotations(notebook,lessons){
 if(!Array.isArray(notebook?.highlights))return notebook;
 let changed=false;
 const highlights=notebook.highlights.flatMap(mark=>{
  const edits=sourceEdits.filter(e=>mark.lessonId===e.lessonId&&mark.blockId===e.blockId&&(mark.sourceRevision||0)<e.revision);
  if(!edits.length)return [mark];
  changed=true;let repaired=edits.reduce(rebaseSourceAnnotation,mark);
  const original=mark.blockId.match(/^original-(\d+)-(\d+)(-fa)?$/);
  const answer=mark.blockId.match(/^official-answer-(\d+)\.(\d+)(-fa)?$/);
  const lesson=lessons?.[mark.lessonId];
  const text=original?lesson?.pages[Number(original[2])-1]?.[original[3]?'fa':'text']:answer?lesson?.questions.find(q=>q.id===answer[1]+'.'+answer[2])?.[answer[3]?'officialAnswerFa':'officialAnswer']:undefined;
  if(typeof text==='string')repaired={...repaired,text:text.slice(repaired.start,repaired.end)};
  return repaired.end>repaired.start&&repaired.text?.trim()?[repaired]:mark.note||mark.reviewEnabled?[{...repaired,text:mark.text,sourceDetached:true}]:[];
 });
 return changed?{...notebook,highlights}:notebook;
}
